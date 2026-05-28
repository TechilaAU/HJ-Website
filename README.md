# HJ Landscaping &amp; Construction — Website

Static marketing site for **HJ Landscaping And Construction PTY LTD** (Torquay, VIC).
Built to the HJ Landscaping Design System. No framework, no build step — plain HTML/CSS/JS, ready for GitHub Pages.

## Pages
| File | Purpose |
|---|---|
| `index.html` | Homepage — hero, services, recent builds, before/after, testimonial, lead CTA |
| `services.html` | Services hub — landscaping, concreting/retaining, decks, earthmoving (+ `Service` schema) |
| `projects.html` | Filterable project gallery |
| `about.html` | Company story, stats, crew |
| `contact.html` | Lead form, NAP, embedded map |
| `404.html` | Branded not-found page |

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

Custom domain: the `CNAME` file is already set to `www.hjlandscapingandconstruction.com.au`.
At the DNS host, point a CNAME record for `www` to `<your-username>.github.io`, and (optionally) the apex domain to GitHub Pages' A records. Enable "Enforce HTTPS" once the cert provisions.

## Local preview
```bash
python3 -m http.server 8000
# open http://localhost:8000
```

---
Design system: HJ Landscaping Design System (Oswald + Manrope, ink/bone/earth/leaf palette).
Business: ABN 45 666 883 110 · 25 Aquarius Avenue, Torquay VIC 3228 · 0428 947 770.
