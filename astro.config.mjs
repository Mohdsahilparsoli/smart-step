import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import node from '@astrojs/node';

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
  // run nodemailer on the server. The Node adapter is what makes that one
  // dynamic route possible — see README.md for how to run/deploy this.
  adapter: node({ mode: 'standalone' }),
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/404')
    })
  ]
});
