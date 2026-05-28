# HJ Landscaping &amp; Construction — Website

Static marketing site for **HJ Landscaping And Construction PTY LTD** (Torquay, VIC).
Built to the HJ Landscaping Design System. No framework, no build step — plain HTML/CSS/JS, ready for GitHub Pages.

## Pages (clean URLs — no `.html`)
Each page is a folder with an `index.html`, so GitHub Pages serves extension-less URLs.
| URL | File | Purpose |
|---|---|---|
| `/` | `index.html` | Homepage — hero, services, recent builds, before/after, testimonial, lead CTA |
| `/services/` | `services/index.html` | Services hub — landscaping, concreting/retaining, decks, earthmoving (+ `Service` schema) |
| `/projects/` | `projects/index.html` | Filterable project gallery |
| `/about/` | `about/index.html` | Company story, stats, crew |
| `/contact/` | `contact/index.html` | Lead form, NAP, embedded map |
| `/areas/` | `areas/index.html` | Service-area hub linking all localities |
| `/areas/torquay/` | `areas/torquay/index.html` | Torquay landing page (local SEO) |
| `/areas/jan-juc/` | `areas/jan-juc/index.html` | Jan Juc landing page |
| `/areas/geelong/` | `areas/geelong/index.html` | Geelong landing page |
| `/areas/ocean-grove/` | `areas/ocean-grove/index.html` | Ocean Grove landing page |
| `/areas/barwon-heads/` | `areas/barwon-heads/index.html` | Barwon Heads landing page |
| `/areas/surf-coast/` | `areas/surf-coast/index.html` | Surf Coast landing page |
| — | `404.html` | Branded not-found page |

> **Clean URLs:** links use root-relative paths (`/services/`, `/assets/…`). They resolve correctly on GitHub Pages and any web server. Opening files directly via `file://` will break the links — always preview through a local server (below).

## SEO foundations baked in
- Unique `<title>` + meta description per page, geo-targeted to Torquay / Geelong / Surf Coast
- Canonical URLs, Open Graph + Twitter cards, `theme-color`, geo meta tags
- `GeneralContractor` / `LocalBusiness` JSON-LD with real NAP, ABN, geo-coordinates, opening hours, `areaServed`
- `Service`, `ContactPage`, `BreadcrumbList`, `WebSite` structured data
- `sitemap.xml`, `robots.txt`, semantic HTML5 landmarks, descriptive `alt` text, skip link
- Fast: system fonts fallback, font preconnect, lazy-loaded map iframe, no JS framework

## ⚠️ Before go-live — open items
1. **Swap photography.** Every grey hatched `.photoframe` is a placeholder. Replace with real HJ build photos (warm, slightly desaturated, deep shadows per the design brief). Each frame's `aria-label`/`data-label` says what shot goes there. Stock photos hurt trust and local SEO — use real builds only.
2. **Builder licence number.** Footers contain `VBA Reg. [ADD LICENCE #]` — fill in the real Victorian registration number, or remove if not applicable.
3. **Lead form backend.** The form is front-end only (shows a thank-you, sends nothing). Wire to Formspree / Netlify Forms / a mailto handler / your CRM endpoint before launch.
4. **Transparent logo.** `assets/logo-badge.jpg` was cropped from the supplied JPG and sits on white. A transparent PNG/SVG badge and a bone-on-dark version would sharpen the nav/footer mark.
5. **Confirm domain strategy.** This is built for `www.hjlandscapingandconstruction.com.au` (see `CNAME`). If replacing the existing site, set up 301 redirects from old URLs to preserve ranking.
6. **Testimonials/projects** use representative placeholder names and locations — replace with real, attributed client reviews and real project details.

## Paths & URLs — read before deploying
Internal links and assets use **relative paths**, so the site works on *either*
GitHub Pages URL type without changes:
- **User/org site** — `https://<username>.github.io/`
- **Project site** — `https://<username>.github.io/<repo-name>/`

Two things still need your live URL filled in once you know it:
1. **Canonical / Open Graph / sitemap** — every page's `<link rel="canonical">`,
   `og:url`, the JSON-LD `url`/`logo`, and `sitemap.xml` contain the placeholder
   `https://REPLACE-WITH-YOUR-PAGES-URL`. Find-and-replace that string with your real
   Pages URL across all files before (or just after) first deploy. These must be
   absolute — search engines ignore relative canonicals.
2. **`404.html`** uses root-absolute links (`/` and `/contact/`). These are correct
   for a **user/org site**. If you deploy as a **project site**, change them to
   `/<repo-name>/` and `/<repo-name>/contact/`.


## Adding more service-area pages later
Each area page is a self-contained folder under `/areas/`. To add one (e.g. Anglesea):
copy an existing `areas/<slug>/index.html`, rewrite the locality copy (intro, terrain,
projects — keep it genuinely different, not spun), update the title/description/canonical/
schema geo-coordinates, then add it to `areas/index.html` (hub cards), the footer
"Service areas" column, and `sitemap.xml`. Distinct local copy is what makes these rank —
avoid templated duplicate content.

## Deploy to GitHub Pages

```bash
# from inside this folder
git init
git add .
git commit -m "Initial HJ Landscaping & Construction site"

# create the repo (GitHub CLI) — or create it in the web UI and add the remote
gh repo create hj-landscaping-construction --public --source=. --remote=origin --push

# then in the repo: Settings → Pages → Source: deploy from branch `main` / root
```

No custom domain is configured — the site runs on the default GitHub Pages URL.
When you're ready to add `hjlandscapingandconstruction.com.au` later: add a `CNAME`
file containing the domain, then set the DNS records per GitHub's custom-domain guide
and enable "Enforce HTTPS".

## Local preview
Clean URLs need a server (not `file://`):
```bash
python3 -m http.server 8000
# open http://localhost:8000  → /services/ etc. resolve automatically
```

---
Design system: HJ Landscaping Design System (Oswald + Manrope, ink/bone/earth/leaf palette).
Business: ABN 45 666 883 110 · 25 Aquarius Avenue, Torquay VIC 3228 · 0428 947 770.
