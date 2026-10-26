import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SITE_URL } from '../data/site';

const SITE_NAME = 'Auxilium RH';
const DEFAULT_TITLE = 'Auxilium RH — Le partenaire stratégique de votre capital humain';
const DEFAULT_IMAGE = '/logo-auxilium-rh@2x.png';

type SeoOptions = {
  /** Titre de la page (le nom du cabinet est ajouté) ; absent = titre de l'accueil */
  title?: string;
  description: string;
  image?: string;
  type?: 'website' | 'article';
  /** Page à ne pas indexer (404, pages légales incomplètes…) */
  noindex?: boolean;
};

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content;
}

function setCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.rel = 'canonical';
    document.head.appendChild(el);
  }
  el.href = href;
}

/** Titre, description, adresse canonique et balises de partage (Open Graph) de la page. */
export function useSeo({ title, description, image = DEFAULT_IMAGE, type = 'website', noindex = false }: SeoOptions) {
  const { pathname } = useLocation();

  useEffect(() => {
    const fullTitle = title ? `${title} — ${SITE_NAME}` : DEFAULT_TITLE;
    const url = `${SITE_URL}${pathname === '/' ? '/' : pathname.replace(/\/$/, '')}`;
    document.title = fullTitle;
    setMeta('name', 'description', description);
    setMeta('name', 'robots', noindex ? 'noindex, follow' : 'index, follow');
    setCanonical(url);
    setMeta('property', 'og:site_name', SITE_NAME);
    setMeta('property', 'og:locale', 'fr_FR');
    setMeta('property', 'og:type', type);
    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:image', image.startsWith('http') ? image : `${SITE_URL}${image}`);
    setMeta('name', 'twitter:card', 'summary_large_image');
  }, [title, description, image, type, noindex, pathname]);
}
