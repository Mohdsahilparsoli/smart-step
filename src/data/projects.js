// Project / listing data.
// ⚠️ PLACEHOLDER DATA  replace with verified project details before launch.
// Do not publish specifications, prices or amenities that have not been confirmed.
// "isPlaceholder: true" drives a visible "Sample listing" badge in ProjectCard.astro 
// remove that flag once a project's details are confirmed as real and accurate.
// Images are representative stock photography (Unsplash) used as visual placeholders 
// they are not actual photos of these listings. Replace with real project photography
// once available.

export const PROJECT_CATEGORIES = [
  { id: 'residential', label: 'Residential' },
  { id: 'commercial', label: 'Commercial' },
  { id: 'plots', label: 'Plots & Land' }
];

export const PROJECTS = [
  {
    slug: 'sample-residential-apartments-siddhart-vihar',
    name: 'Residential Apartments  Siddhart Vihar',
    location: 'Siddhart Vihar, Ghaziabad',
    type: 'residential',
    typeLabel: 'Residential Apartments',
    status: 'Sample Listing',
    image: 'https://images.unsplash.com/photo-1512845296467-183ccf124347?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Representative photo of a residential apartment building exterior',
    description: 'A residential option in Siddhart Vihar for buyers looking for apartments with everyday connectivity to Ghaziabad and Noida. Contact us for current availability and verified details.',
    isPlaceholder: true
  },
  {
    slug: 'sample-commercial-space-ghaziabad',
    name: 'Commercial Space  Ghaziabad',
    location: 'Ghaziabad',
    type: 'commercial',
    typeLabel: 'Commercial Space',
    status: 'Sample Listing',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Representative photo of a commercial building exterior',
    description: 'A commercial property option suited to retail or office use in Ghaziabad. Reach out to us to confirm current status, layout and pricing.',
    isPlaceholder: true
  },
  {
    slug: 'sample-residential-project-noida',
    name: 'Residential Project  Noida',
    location: 'Noida',
    type: 'residential',
    typeLabel: 'Residential Flats',
    status: 'Sample Listing',
    image: 'https://images.unsplash.com/photo-1521208059781-bcf3fd4d1245?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Representative photo of a residential apartment complex',
    description: 'A residential flats option in Noida for families and investors exploring Delhi NCR. Speak with us for verified project information.',
    isPlaceholder: true
  },
  {
    slug: 'sample-plot-land-ghaziabad',
    name: 'Plot / Land Option  Ghaziabad',
    location: 'Ghaziabad',
    type: 'plots',
    typeLabel: 'Plots & Land',
    status: 'Sample Listing',
    image: 'https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Representative aerial photo of a residential plotted area',
    description: 'A land/plot option for buyers considering a custom build near Ghaziabad. Contact Smart Steps for current availability and documentation status.',
    isPlaceholder: true
  },
  {
    slug: 'sample-commercial-project-delhi-ncr',
    name: 'Commercial Project  Delhi NCR',
    location: 'Delhi NCR',
    type: 'commercial',
    typeLabel: 'Commercial Project',
    status: 'Sample Listing',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Representative photo of a commercial high-rise building',
    description: 'A commercial project option within the wider Delhi NCR region. Get in touch for verified specifications and current status.',
    isPlaceholder: true
  },
  {
    slug: 'sample-residential-plots-noida-extension',
    name: 'Residential Plots  Noida Extension',
    location: 'Noida Extension',
    type: 'plots',
    typeLabel: 'Residential Plots',
    status: 'Sample Listing',
    image: 'https://images.unsplash.com/photo-1628133287836-40bd5453bed1?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Representative photo of a residential plot with a house',
    description: 'A plotted residential option in the Noida Extension belt. Contact us to check current availability and requirements.',
    isPlaceholder: true
  }
];

export function getFeaturedProjects(count = 3) {
  return PROJECTS.slice(0, count);
}

export function getProjectsByType(type) {
  return PROJECTS.filter((p) => p.type === type);
}
