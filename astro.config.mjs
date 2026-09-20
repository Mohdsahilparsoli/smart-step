import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

// IMPORTANT:
// Replace this with the real production domain before deploying.
// This value also drives canonical URLs, Open Graph URLs, the sitemap
// and robots.txt — update it in one place only.
const SITE_URL = process.env.PUBLIC_SITE_URL || 'https://www.smartstepssiddharthvihar.com';

export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'always',
  build: {
    format: 'directory'
  },
  // Every page still builds as static HTML (fast, cheap to host) except
  // /api/contact, which opts out of prerendering (see that file) so it can
  // run nodemailer on the server. The Vercel adapter turns that one route
  // into a Vercel Serverless Function automatically on deploy — see README.md.
  adapter: vercel(),
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404')
    })
  ]
});
