# Smart Steps Siddhart Vihar — Website

A production-ready Astro JS website for Smart Steps Siddhart Vihar (Real Estate & Property
Consultant, Ghaziabad).

## Getting started

```bash
npm install
cp .env.example .env   # then fill in your real SMTP details (see below)
npm run dev             # local dev server
npm run build            # production build -> ./dist
npm run start             # run the production server (needed for the contact form API)
```

## Important: this is no longer a pure static site

Because the contact form now sends real email through nodemailer, the site has one dynamic
server route: `/api/contact/`. Every other page (`/`, `/about-us/`, `/projects/`,
`/contact-us/`) still builds as plain static HTML for speed and SEO, but the project as a whole
needs a **Node.js server** to run, not just static file hosting (Netlify/Vercel static, GitHub
Pages, S3, etc. won't work out of the box for the contact form).

- `npm run build` produces `dist/client` (static assets/pages) and `dist/server` (the Node
  server that also serves those static pages).
- To run it in production: `node dist/server/entry.mjs` (or `npm start`), then put it behind a
  reverse proxy (Nginx) or a Node host (Render, Railway, a VPS with PM2, etc.).
- Alternatively, if you'd rather keep pure static hosting, swap the contact form for a
  third-party form service (Formspree, Web3Forms, etc.) instead of nodemailer, or deploy
  `/api/contact` separately as a serverless function.

## Contact form email (nodemailer) — set this up before launch

`.env.example` has **dummy placeholder values** — copy it to `.env` and fill in your real SMTP
provider (Gmail with an app password, Zoho Mail, SendGrid, Mailgun, your hosting provider's
SMTP, etc.):

```
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-smtp-username@example.com
SMTP_PASS=your-smtp-password-or-app-password
CONTACT_FROM_EMAIL=no-reply@smartstepssiddharthvihar.com
CONTACT_TO_EMAIL=info@smartstepssiddharthvihar.com
PUBLIC_SITE_URL=https://www.smartstepssiddharthvihar.com
```

Until you fill in real values, submitting the form will show a friendly "couldn't send your
enquiry, please call or WhatsApp us" message instead of crashing — this was tested end-to-end
(including a successful send against a local test SMTP server; the form correctly validates
required fields, sends a formatted email, and shows a success message when SMTP is configured).

The API route lives at `src/pages/api/contact.ts`. It validates name/phone/requirement,
formats a plain-text + HTML email, and sends it with nodemailer. `.env` is git-ignored so your
real credentials are never committed.

## Before you deploy — other things to update

1. **Logo** — `public/images/smart-steps-logo.png` is a placeholder generated to match the
   brand's green + gold palette (no logo file was supplied with the brief). Replace it with the
   real Smart Steps logo, keeping the same filename or updating the path in
   `src/data/site.js` (`SITE.logo`).
2. **Photography** — every photo on the site (hero, about, investment, and all project cards)
   currently comes from Unsplash as a free-license visual placeholder, clearly noted in
   `src/data/projects.js` as representative stock photography, not real photos of these
   listings. Swap in real, licensed photography before launch.
3. **Domain** — set `PUBLIC_SITE_URL` (in `.env` or as a build-time env var) to the real
   production domain before building for deployment. This drives canonical URLs, Open Graph
   URLs, the sitemap and robots.txt.
4. **Project data** — `src/data/projects.js` contains clearly marked sample listings
   (`isPlaceholder: true`). Replace with verified project names, locations, descriptions and
   images, and remove the `isPlaceholder` flag once confirmed.
5. **Testimonials** — the testimonials on the homepage (`src/pages/index.astro`) are sample
   placeholders, visibly labeled "Sample testimonial". Replace with genuine client reviews.
6. **Favicons** — `public/favicon/` contains generated placeholder favicons matching the brand
   colors. Regenerate from the real logo if you'd like a closer match.

## Project structure

```
src/
  components/   Reusable Astro components (Header, Footer, SEO, Hero, Icon, cards, etc.)
  layouts/      BaseLayout.astro — shared <head>, header, footer, WhatsApp button
  pages/        index.astro, about-us.astro, projects.astro, contact-us.astro, robots.txt.ts
                api/contact.ts — nodemailer contact form endpoint (server route)
  data/         site.js (business/contact config), projects.js (listings), schema.js (JSON-LD)
  styles/       global.css (design system: colors, typography, buttons, cards, grid)
public/
  images/       Logo, OG image, and Unsplash placeholder photography (see notes above)
  favicon/      Generated favicon set
```

## Design notes

- All icons across the site (phone, WhatsApp, pin, key, building, etc.) are custom
  stroke-based SVGs from `src/components/Icon.astro` — no emoji are used anywhere.
- Every photo is sourced from Unsplash's free license (no attribution required, commercial use
  allowed) as a placeholder — see the photography note above for swapping in real photos.

## SEO & technical notes

- 4 pages only: `/`, `/about-us/`, `/projects/`, `/contact-us/`, each with a unique title, meta
  description, canonical URL, Open Graph/Twitter tags, and `RealEstateAgent`/`WebSite` JSON-LD.
- `@astrojs/sitemap` generates `sitemap-index.xml` + `sitemap-0.xml` covering exactly the 4
  pages (not the `/api/contact/` route).
- `src/pages/robots.txt.ts` generates `robots.txt`, pointing at the sitemap using the
  configured `PUBLIC_SITE_URL` — no domain is hardcoded.
- Breadcrumb structured data is included on About, Projects and Contact pages.
- No fabricated reviews, prices, addresses, coordinates, years of experience, or client counts
  are included anywhere — all such content is either omitted or clearly marked as a placeholder.
- Images use responsive `width`/`height`, descriptive `alt` text, and `loading="lazy"` below the
  fold; hero images use `fetchpriority="high"` and are not lazy-loaded.
- `prefers-reduced-motion` is respected globally.

## Recent changes in this revision

- Removed all emoji; replaced with custom professional SVG icons.
- Removed the "View Project" button from project cards (kept "Enquire Now" only).
- Replaced placeholder graphics with real Unsplash photography across all 4 pages.
- On the Contact page, removed the "Our Office", Map, "Business Hours" and final
  "Ready to Discuss Your Property Requirement?" sections per request — the Contact page now has
  6 sections instead of 10.
- Wired the enquiry form to a working nodemailer email endpoint (`/api/contact/`), with
  `.env`/`.env.example` holding dummy SMTP values ready for you to fill in.

## Verified in this build

- `npm run build` completes successfully with no errors (static pages + one dynamic API route).
- Every main page has exactly one `<h1>`. Home/About/Projects have exactly 10 sections each;
  Contact intentionally has 6 after the requested removals.
- Sitemap contains exactly the 4 main pages.
- All Call (`tel:+917669620555`) and WhatsApp (`https://wa.me/917669620555`) links resolve
  correctly across all pages, and no emoji remain anywhere in the codebase.
- All images carry `alt`, `width` and `height` attributes.
- The contact form was tested end-to-end against a local test SMTP server: validation errors
  return 400, unreachable/misconfigured SMTP fails gracefully with a friendly message (never a
  crash), and a valid submission with working SMTP successfully delivers a formatted email.
