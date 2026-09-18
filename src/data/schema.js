// Shared JSON-LD structured data builders.
// Only verified information is included. Do not add ratings, review counts,
// exact street address, coordinates, awards or opening hours unless confirmed.

import { SITE } from './site.js';

export function getOrganizationSchema(siteUrl) {
  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: SITE.name,
    telephone: SITE.phone,
    url: siteUrl,
    address: {
      '@type': 'PostalAddress',
      addressLocality: SITE.city,
      addressRegion: SITE.state,
      addressCountry: 'IN'
    },
    areaServed: SITE.areasServed.map((area) => ({
      '@type': 'Place',
      name: area
    }))
  };
}

export function getWebsiteSchema(siteUrl) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE.name,
    url: siteUrl
  };
}
