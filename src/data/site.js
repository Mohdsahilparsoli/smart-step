// Central site configuration.
// Update phone, address, socials, and PUBLIC_SITE_URL (astro.config.mjs) here.

export const SITE = {
  name: 'Smart Steps Siddhart Vihar',
  shortName: 'Smart Steps',
  tagline: 'Real Estate & Property Consultant',
  phone: '+91 7669620555',
  phoneDisplay: '+91 76696 20555',
  phoneHref: 'tel:+917669620555',
  whatsappNumber: '917669620555',
  whatsappHref: 'https://wa.me/917669620555',
  location: 'Siddhart Vihar, Ghaziabad, Uttar Pradesh, India',
  city: 'Ghaziabad',
  state: 'Uttar Pradesh',
  country: 'India',
  serviceAreas: ['Ghaziabad', 'Noida', 'Delhi NCR'],
  areasServed: ['Siddhart Vihar', 'Ghaziabad', 'Noida', 'Delhi', 'Delhi NCR'],
  logo: '/images/smart-steps-logo.png',
  logoAlt: 'Smart Steps Siddhart Vihar logo',
  ogImage: '/images/og-image.jpg',
  themeColor: '#063E32'
};

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about-us/' },
  { label: 'Projects', href: '/projects/' },
  { label: 'Contact Us', href: '/contact-us/' }
];

export const WHATSAPP_MESSAGES = {
  general: 'Hi Smart Steps, I would like to know more about property options in Ghaziabad, Noida or Delhi NCR.',
  project: 'Hi Smart Steps, I am interested in one of your listed projects. Could you share more details?',
  contact: 'Hi Smart Steps, I would like to discuss my property requirement.'
};

export function whatsappLink(messageKey = 'general') {
  const text = encodeURIComponent(WHATSAPP_MESSAGES[messageKey] || WHATSAPP_MESSAGES.general);
  return `https://wa.me/${SITE.whatsappNumber}?text=${text}`;
}
