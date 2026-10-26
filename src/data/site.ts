// Coordonnées, navigation et informations légales : modifier ici, tout le site suit.

/** Adresse publique du site (liens canoniques, plan du site, partage). */
export const SITE_URL = 'https://auxilium-rh-database.web.app';

export const contact = {
  email: 'info@auxiliumrh.ga',
  phoneDisplay: '062 80 50 51',
  phoneHref: 'tel:062805051',
  city: 'Libreville, Gabon',
  // Numéro WhatsApp au format international sans « + » ni espaces (ex. '24162805051').
  // À CONFIRMER : tant qu'il est vide, les liens WhatsApp ne sont pas affichés.
  whatsapp: '',
  // Adresse de la page LinkedIn (ex. 'https://www.linkedin.com/company/...').
  // Tant qu'elle est vide, le lien n'est pas affiché.
  linkedin: '',
};

export const whatsappHref = (text = 'Bonjour, je souhaite parler à un expert RH.') =>
  contact.whatsapp ? `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(text)}` : '';

export const navLinks = [
  { to: '/services', label: 'Services' },
  { to: '/secteurs', label: 'Secteurs' },
  { to: '/a-propos', label: 'À propos' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
];

/** Appel à l'action principal (partout) et secondaire (toujours le même). */
export const primaryCta = { to: '/contact', label: 'Demander un diagnostic RH' };
export const secondaryCta = { label: 'Parler à un expert RH' };

// Informations des mentions légales. Les valeurs entre crochets sont À FOURNIR
// par Auxilium RH avant la mise en production : elles s'affichent telles quelles.
export const legal = {
  companyName: 'Auxilium RH',
  legalForm: '[forme juridique à compléter]',
  rccm: '[numéro RCCM à compléter]',
  nif: '[NIF à compléter]',
  address: '[adresse du siège à compléter], Libreville, Gabon',
  publicationDirector: '[nom du directeur de la publication à compléter]',
  host: 'Firebase Hosting, Google LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043, États-Unis',
  lastUpdated: '2026-10-26',
};
