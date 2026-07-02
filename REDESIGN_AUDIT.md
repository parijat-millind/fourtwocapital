# Forty Two Capital — Website Audit & Redesign Report
Date: 2026-07-02 · Scope: full site (index.html, repo) · Live domain: www.fortytwocapital.in

## 1. Executive summary

The site had strong content bones (clear service, case studies, FAQ, multiple contact paths) but was built as a client-side React app compiled in the browser. This made it slow, invisible to search engines, fragile (4 CDN dependencies), and inaccessible on mobile (no menu at all). The redesign replaces it with a zero-framework, single-file static site: same content and functionality, ~90% less JavaScript, server-rendered HTML that Google can index, a coherent design system derived from the brand logo, and a simplified conversion path.

## 2. Critical issues found (P0 — broken or actively harmful)

1. **Entire site rendered client-side via Babel Standalone.** React 18 *development* builds (~1.2 MB uncompressed) + @babel/standalone (~2.5 MB) + Tailwind CDN JIT compiled the whole page in the browser on every visit. Without JS, the page is blank. Search engines and link previews saw an empty `<div id="root">` — an SEO catastrophe for a business that depends on "CIBIL error fix" searches.
2. **No mobile navigation.** Nav links were `hidden md:flex` with no hamburger — mobile users (the majority in this market) had no menu whatsoever.
3. **Visible markdown bug.** Lead magnet copy rendered literally as `**Ultimate Guide to Reading Your Credit Report**` (asterisks on screen).
4. **Fake lead magnet.** The "Download PDF" form was a `setTimeout` simulation — it captured nothing and delivered nothing, then told users to "check your inbox". This destroys trust the moment anyone tries it.
5. **Placeholder legal text in production.** Footer displayed `CIN: [Company Registration Number]`. Privacy Policy, Terms, and RBI Guidelines links were dead (`href="#"`).
6. **Hotlinked third-party trust badges** from img.icons8.com, including `rbi.png` which is not a real icons8 asset (broken image). Trust badges that 404 are worse than none.
7. **Unverifiable claims.** "10,000+ Downloads This Month", "Live Success Metrics", "India's Premier/Leading" — fabricated-sounding claims are a legal and credibility risk for a financial-services firm. Softened or removed.

## 3. High-priority issues (P1)

- **CTA fragmentation.** Primary CTAs sent users off-site to a Google Form while a perfectly good on-site lead form existed. Every context switch loses conversions. Redesign: one primary CTA ("Get My Free Credit Audit") pointing to the on-site form; phone/WhatsApp as secondary.
- **Duplicate content.** Case Studies and Testimonials featured the same three people (Rahul/Sumit/Priya) with the same scores — reads as copy-paste. Merged into one strong "Results" section plus distinct testimonials.
- **Navigation labels didn't match destinations.** "Our Expertise" scrolled to the problem section; "Client Success" scrolled to the process timeline. Fixed with honest labels.
- **Packages had no prices.** Three "Get Started" buttons with no anchoring number increases friction. Kept price-on-request but added clear "who it's for" and a comparison structure; add real prices when ready (recommended).
- **Accessibility failures:** icon-only buttons without labels, 9–10px text throughout, low-contrast text (white/30, slate-400 on dark), no focus states, no skip link, `<i>` tags swapped by JS for icons (nothing for screen readers), FAQ accordion not keyboard/ARIA correct, `max-h-96` clipping long FAQ answers.
- **SEO gaps:** no canonical URL, no og:image, no Twitter card, no robots.txt/sitemap.xml, meta keywords (obsolete), thin Organization schema (no name, phone, address), no FAQ schema.

## 4. Medium issues (P2)

- Design inconsistency: 6 different border radii (lg → [40px]), 4 ad-hoc hex colors bypassing the theme, italic/underline/black-weight styling used decoratively at random, ALL-CAPS heading in one section only.
- Cream + rust + sage palette executed inconsistently — dark navy sections used `text-slate-400` (a Tailwind gray) against brand cream, muddying the look.
- Dev comments shipped to production (lines discussing Framer Motion options).
- Dead code in repo: `index_v2.html`, `update_colors.py`, unused `components/BusinessHero3D.tsx`, unused `assets/*.png` hero images, empty `INSTAGRAM/` dir.
- Duplicate favicon links; `?v=2` cache-busting on all of them.
- `target="_blank"` on `tel:` and `mailto:` links (meaningless, can open blank tabs).
- Google Apps Script endpoint called with `mode: 'no-cors'` — failures are silent; success state shows even if the request failed. (Kept, but now with honest fallback messaging; recommend migrating to a form backend with real responses.)
- WhatsApp widget: permanent pulsing red "notification" dot is a dark pattern; constant shake animation distracts. Toned down.

## 5. What the redesign delivers

**Architecture.** One static `index.html`. No React, no Babel, no Tailwind CDN, no icon CDN. Embedded CSS design system (custom properties), ~15 inline SVG icons, ~120 lines of vanilla JS (mobile menu, accordion, scroll-reveal, form submit, sticky header). Content is real HTML — instantly crawlable, renders without JS, first paint in milliseconds.

**Design system.** Derived from the logo: ink `#16323D` / teal `#244855` (primary), warm paper `#FAF3E7` / cream `#FBE9D0` (surfaces), ember `#E64833` (single accent, used only for CTAs and key highlights), sage `#90AEAD` and copper `#874F41` as supporting tones. Type: Fraunces (display serif, echoes the "42" logotype) + Outfit (UI/body). Consistent 4px spacing scale, two radii (12/20px), one shadow scale, one button system (primary/secondary/ghost), unified card component.

**Conversion path.** One repeated primary CTA → on-site audit form. Sticky header CTA, hero CTA, pricing CTAs, and a mid-page banner all anchor to `#contact`. Phone and WhatsApp always one tap away. Trust strip (RBI-mandated process, CICRA 2005, data confidentiality) with honest inline-SVG badges. Lead magnet now honestly framed as "emailed after you request it" via the same real form endpoint.

**SEO.** Full server-rendered content, canonical, og/twitter tags with og:image, expanded Organization + FinancialService + FAQPage JSON-LD, robots.txt, sitemap.xml, descriptive title/meta, semantic landmarks (header/nav/main/section/footer), single H1, logical H2/H3 hierarchy.

**Accessibility.** WCAG 2.1 AA-checked contrast, minimum 12px text (most 15–16px), skip link, visible focus rings, ARIA-correct accordion and mobile menu, labelled icons/buttons, `prefers-reduced-motion` respected, keyboard operable throughout.

**Performance.** Payload drops from ~4 MB of JS (dev builds) to one ~60 KB HTML file + fonts + logo. No render-blocking third-party scripts except gtag (kept, async). Fonts preconnected with `display=swap`. Animations are CSS-only, GPU-composited, disabled for reduced-motion users.

## 6. Recommendations beyond this redesign

1. Replace the Google Apps Script form endpoint with a backend that returns real success/failure (Formspree, Basin, or your own).
2. Actually produce the CIBIL-reading PDF guide and wire the lead magnet to deliver it.
3. Add real pricing to packages — price anchoring measurably lifts conversion for advisory services.
4. Write real Privacy Policy and Terms pages (legally required for collecting PII in India under DPDP Act 2023).
5. Fill in the real CIN once registered; until then the footer omits it.
6. Collect verifiable Google Reviews and embed them — first-party testimonials carry more weight.
7. Compress `new-logo.png` (22 KB → ~6 KB as optimized PNG or ~3 KB as SVG).

## 7. Files changed

- `index.html` — fully rebuilt (old version preserved in git history; `git log` / `git checkout HEAD~1 -- index.html` to revert)
- `REDESIGN_AUDIT.md` — this report
- `robots.txt`, `sitemap.xml` — added
- Removed: `index_v2.html`, `update_colors.py`, `components/`, `assets/`, `INSTAGRAM/`
