// Fast QR redirects: runs only for the two switchable QR pages, /<shop>/qr-redirect/ (see run_worker_first in wrangler.jsonc).
// The plain /<shop>/qr/ pages never redirect.
// If the scanned code has a "Redirect scans to" link set in the owner QR page, send the visitor
// there straight away from Cloudflare, before any page loads. Otherwise serve the page as normal.
const SB = "https://hwelzuskhputvtkvciuh.supabase.co";
const KEY = "sb_publishable_zBztIm3ZiciEBRFdpn4vqg_Gp-G0F5z"; // public key, already shipped in the site
const OK_URL = /^https:\/\/[^\s"'<>]{4,300}$/i;

async function lookup(shop, spot, ctx) {
  const cache = caches.default;
  const key = new Request(`https://qr-go.cache/${shop}/${spot || "_"}`);
  let hit = await cache.match(key);
  if (!hit) {
    const res = await fetch(`${SB}/rest/v1/rpc/qr_go`, {
      method: "POST",
      headers: { apikey: KEY, authorization: `Bearer ${KEY}`, "content-type": "application/json" },
      body: JSON.stringify({ p_shop: shop, p_spot: spot }),
      signal: AbortSignal.timeout(1500),
    });
    if (!res.ok) return { ok: false, go: null };
    hit = new Response(await res.text(), { headers: { "cache-control": "max-age=10" } });
    ctx.waitUntil(cache.put(key, hit.clone()));
  }
  const v = await hit.json();
  return { ok: true, go: typeof v === "string" && OK_URL.test(v) ? v : null };
}

export default {
  async fetch(req, env, ctx) {
    const url = new URL(req.url);
    const m = url.pathname.match(/^\/(south-melbourne|st-kilda)\/qr-redirect\/?$/);
    if (!m || req.method !== "GET" || url.searchParams.has("nogo")) return env.ASSETS.fetch(req);
    const spot = (url.searchParams.get("s") || "").toLowerCase();
    if (!/^[a-z0-9-]{0,30}$/.test(spot)) return env.ASSETS.fetch(req);

    let r = { ok: false, go: null };
    try { r = await lookup(m[1], spot, ctx); } catch (e) { r = { ok: false, go: null }; }
    const go = r.go;

    if (go) {
      // count the scan in the background; the visitor doesn't wait for it
      ctx.waitUntil(fetch(`${SB}/functions/v1/qr-track`, {
        method: "POST",
        headers: { "content-type": "text/plain", "user-agent": req.headers.get("user-agent") || "", "x-forwarded-for": req.headers.get("cf-connecting-ip") || "" },
        body: JSON.stringify({ shop: m[1], spot, check: true }),
      }).catch(() => {}));
      return new Response(null, { status: 302, headers: { location: go, "cache-control": "no-store" } });
    }

    // no redirect: serve the page. If the lookup worked, tell the page's own check it can skip;
    // if the lookup failed, the page checks again itself.
    const page = await env.ASSETS.fetch(req);
    if (!r.ok || !(page.headers.get("content-type") || "").includes("text/html")) return page;
    return new HTMLRewriter().on("html", { element(e) { e.setAttribute("data-qrc", "1"); } }).transform(page);
  },
};
