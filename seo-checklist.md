# SEO & launch recheck list
Issues found so far — recheck all of these at the very end, before/after launch. Tick when confirmed.

## PRIORITY 1 — BIGGEST SEO GAP
- [ ] **The site is not server-side rendered (most important fix).** hosting/index.html is a self-unpacking bundle: the raw HTML Google first downloads contains only an "Unpacking…" loader, the old title ("St Kilda & Balaclava"), no canonical and no page text. Content, titles and schema appear only after ~7.7 MB of JavaScript runs. Google can usually render this, but slower and less reliably; Bing, AI crawlers (ChatGPT, Perplexity) and social previews mostly can't. Fix = developer pre-renders each URL to static HTML (Fiverr brief, scope item 1). *Failed if:* "View page source" on any live URL doesn't show that page's H1, title and canonical.


## Waiting on a decision / fact from you
- [ ] **St Kilda phone mismatch** — site + schema use 0485 071 024; Facebook, Fresha and directories list (03) 9534 4546. Pick one, then update site + every listing. *Failed if:* a search for the shop shows two different numbers a month later.
- [ ] **South Melbourne address format** — site says "Clarendon Centre, 261 Clarendon St"; directories say "Shop 11 / G11, 261 Clarendon St". Decide whether to add "Shop 11" everywhere.
- [ ] **South Melbourne prices** — unconfirmed; St Kilda prices known (see CLAUDE.md).
- [ ] **Services list shows no prices** — add St Kilda prices?
- [ ] **AI Receptionist card** — on South Melbourne pages it dials the shop's main line (9690 1604). Send a separate line if there is one.
- [ ] **Clarendon Centre car park** — free 1.5 hrs? Unconfirmed, left out of copy.

## Listings to update off-site (you)
- [ ] South Melbourne → (03) 9690 1604 on Google Business Profile, Fresha, Facebook, Yelp, Yellow Pages/TrueLocal/Whereis. Remove any 9534 4544.
- [ ] St Kilda → whichever number you choose above, same list.

## Launch tasks
- [ ] **llms.txt** added to hosting/ (Oct 2026). Update it whenever phones, prices, hours or the St Kilda number change. *Failed if:* /llms.txt on the live site shows the home page instead of plain text.
- [x] Removed 15 unused old images from hosting/images (moved to archive/old-hosting-images). Re-upload the cleaned folder.
- [ ] Re-export hosting/index.html from the main file (current one is outdated).
- [ ] Upload index.html, /images, sitemap.xml, robots.txt, _redirects to Netlify.
- [ ] **REMIND USER AT REVIEW:** Submit sitemap in Google Search Console — search.google.com/search-console → pick site (or Add property → URL prefix → HTML tag, send me the meta line to add) → Sitemaps → type `sitemap.xml` → Submit. Needs edwardscissorhandsbarber.com.au pointing at the new Netlify site first. *Failed if:* "Couldn't fetch", or < ~30 pages indexed after 2–4 weeks.
- [ ] Deploy the full hosting folder to **ed-scissorhands-concept** (Deploys tab, not the Projects drop box). Then delete test sites dapper-cupcake-382401 and vocal-rabanadas-569813.

## Verify on the live site
- [ ] **Real 404s** (Oct 2026) — _redirects now lists every page; unknown addresses get hosting/404.html with a true 404 status instead of the home page. Open /st-kilda/servicez and /blah: 404 page shows; open all sitemap pages: they still load. *Failed if:* any real page shows the 404, or Search Console reports "Soft 404". If a new page is added to the site, add it to _redirects too.
- [ ] **www / netlify.app → main domain** (301s added to _redirects, Oct 2026). In Netlify → Domain management, add www as alias and turn on HTTPS (Let's Encrypt). *Failed if:* http://www… or ed-scissorhands-concept.netlify.app doesn't land on https://edwardscissorhandsbarber.com.au.
- [ ] **Per-page meta descriptions + og:title/og:url** (added Oct 2026). Check 3 pages in URL Inspection → View crawled page. *Failed if:* Search Console "Duplicate meta descriptions" or Google shows the home description for /st-kilda/services.
- [ ] **Static HTML has no per-page tags** — titles, descriptions, canonicals are set by JavaScript after load. Google handles this; Facebook/WhatsApp/LinkedIn previews will show the home title/image for every page. *Failed if:* shared links show wrong previews — fix with pre-built pages (see Longer term).
- [ ] **Header Book now "Sheen on cue"** (Oct 2026, replaces 7s wiggle loop). *Failed if:* header-button Fresha bookings don't rise after 3–4 weeks — switch Tweaks → Header — Book now back to "Soft glow".
- [ ] **Real page addresses** (switched from # links, Oct 2026) — open /st-kilda/services, /south-melbourne/about, /barber-balaclava/ directly: right page shows, images load, back button works. *Failed if:* home page shows, or images are broken.
- [ ] **Old # links** — /#/st-kilda/services still opens the right page.
- [ ] **Search Console URL Inspection** on /st-kilda/services. *Failed if:* "Duplicate, Google chose different canonical" or home-page content.
- [ ] **Indexing** after 2–4 weeks. *Failed if:* fewer than ~30 of 39 sitemap pages indexed.
- [ ] **Staff Hub** stays out of Google (noindex). *Failed if:* it appears in a site: search.
- [ ] **Schema** — run both shop pages through Google's Rich Results Test / Schema validator. *Failed if:* errors on HairSalon.
- [ ] **Image sizes / layout shift** — 143 images have no width/height. PageSpeed on home, both shops, one suburb page. *Failed if:* CLS above 0.1.
- [ ] **Core Web Vitals** — LCP < 2.5s, INP < 200ms on mobile. *Failed if:* PageSpeed shows red/amber.
- [ ] **Suburb hero images on mobile** — check sizing after recent photo replacements.

## Longer term (developer)
- [ ] **Backlinks** — claim/clean listings first (GBP both shops, Fresha, Yelp, TrueLocal, Yellow Pages, Hotfrog, Whereis), then local links: Local Business Awards page, Carlisle St / Clarendon Centre traders, Port Phillip business directory, product brands' stockist pages (Uppercut Deluxe, Brosh, Muk), local schools/sports club sponsorships. No paid links or PBNs. *Failed if:* referring domains in Search Console → Links don't grow over 3 months.
- [ ] **index.html is 7.7 MB** (images bundled inside it). Likely to fail the LCP target on mobile. *Failed if:* PageSpeed mobile LCP > 2.5s — fix by serving images from /images instead of bundling them.
- [ ] Site is still one file that builds pages in the browser. Pre-built pages per shop and suburb would index faster and more reliably.

## Parked
- Open-text Q&A (approved copy) saved in archive/QandA section -Oct 2026-.html — re-add only if asked.
- Acknowledgement of Country removed from footer at your request.

- [ ] Fade haircut page (/st-kilda/fade-haircut, /south-melbourne/fade-haircut, added 12 Oct 2026): re-export hosting/index.html so it goes live; confirm skin fade price on the page matches Fresha; check both URLs return 200 (not 404) after deploy. Failed if Search Console shows them as "Duplicate without user-selected canonical" or not indexed after 4 weeks.

## Rendering check (12 Oct 2026)
- [ ] **hosting/index.html is out of date** — exported before the fade pages and First Day guide were added. Re-export before upload. *Failed if:* /st-kilda/fade-haircut shows the home page or 404 on the live site.
- [ ] **Bing Webmaster Tools** — import from Search Console and submit the sitemap (Bing feeds ChatGPT search and Copilot). *Failed if:* Bing shows 0 indexed pages after 4 weeks.
