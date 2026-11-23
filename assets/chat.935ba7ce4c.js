/* Website chat (Chatwoot). Loads only when the "chat" switch in Supabase site_settings is on. */
(function () {
  var SB = "https://hwelzuskhputvtkvciuh.supabase.co/rest/v1/site_settings?key=eq.chat&select=value";
  var KEY = "sb_publishable_zBztIm3ZiciEBRFdpn4vqg_Gp-G0F5z";
  var BASE = "https://app.chatwoot.com";
  var TOKEN = "699ZinA4iiwKfrnJjMozhRKo";
  var HIDE = /\/(staff|first-day|qr|brand)(\/|$)/i;
  var loaded = false;

  function hidden() { return HIDE.test(location.pathname); }
  function sync() {
    if (!window.$chatwoot || !window.$chatwoot.toggleBubbleVisibility) return;
    window.$chatwoot.toggleBubbleVisibility(hidden() ? "hide" : "show");
  }
  function load() {
    if (loaded) return; loaded = true;
    var st = document.createElement("style");
    st.textContent = ".has-chat .totop{bottom:calc(92px + env(safe-area-inset-bottom,0px))}";
    document.head.appendChild(st);
    document.documentElement.classList.add("has-chat");
    window.chatwootSettings = { position: "right", type: "standard", launcherTitle: "Chat with us", locale: "en" };
    var s = document.createElement("script");
    s.src = BASE + "/packs/js/sdk.js"; s.async = true;
    s.onload = function () { window.chatwootSDK.run({ websiteToken: TOKEN, baseUrl: BASE }); };
    document.body.appendChild(s);
    window.addEventListener("chatwoot:ready", sync);
  }
  function check() {
    if (hidden()) return;
    fetch(SB, { headers: { apikey: KEY }, cache: "no-store" })
      .then(function (r) { return r.ok ? r.json() : []; })
      .then(function (rows) { if (rows && rows[0] && rows[0].value && rows[0].value.on === true) load(); })
      .catch(function () {});
  }
  /* Follow in-page navigation so the bubble hides on staff and QR pages. */
  var push = history.pushState;
  history.pushState = function () { var r = push.apply(this, arguments); loaded ? sync() : check(); return r; };
  window.addEventListener("popstate", function () { loaded ? sync() : check(); });

  function start() { ("requestIdleCallback" in window) ? requestIdleCallback(check, { timeout: 4000 }) : setTimeout(check, 2500); }
  if (document.readyState === "complete") start(); else window.addEventListener("load", start);
})();
