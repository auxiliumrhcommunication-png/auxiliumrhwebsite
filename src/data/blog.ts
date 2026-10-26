// Blog : types, catégories et utilitaires.
//
// Publier un article : l'ajouter dans src/data/articles.ts (ou y déplacer un
// brouillon de src/data/drafts.ts en mettant sa date de publication), puis `npm run build`.
// Tant qu'aucun article n'est publié, la page Blog affiche « Nos premiers articles arrivent bientôt ».
import { published } from './articles';
import { drafts } from './drafts';

export const categories = ['Recrutement', 'Conformité', 'Paie', 'Stratégie RH', 'Droit du travail', 'Guides', 'Actualités'] as const;

export type BlogBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'list'; items: string[] };

export type BlogPost = {
  /** Adresse de l'article : /blog/<slug> (minuscules, tirets, sans accents) */
  slug: string;
  title: string;
  /** Résumé affiché sur la liste des articles (1 à 2 phrases) */
  excerpt: string;
  /** Date de publication, format AAAA-MM-JJ */
  date: string;
  category: (typeof categories)[number];
  /** Illustration de couverture (public/illustrations/… ou public/photos/…) */
  cover?: string;
  author?: string;
  /** Services liés (slugs de src/data/services.ts) : liens depuis l'article et depuis la page du service */
  services?: string[];
  /** Points à faire vérifier avant publication (affichés uniquement sur les brouillons) */
  verify?: string[];
  /** Ajouté automatiquement aux brouillons en développement */
  draft?: boolean;
  content: BlogBlock[];
};

// Articles publiés (src/data/articles.ts) ; en développement (`npm run dev`) seulement,
// les brouillons (src/data/drafts.ts) sont ajoutés, signalés par un bandeau.
export const posts: BlogPost[] = [
  ...published,
  ...(import.meta.env.DEV ? drafts.map((d) => ({ ...d, draft: true })) : []),
].sort((a, b) => b.date.localeCompare(a.date));

/** Articles liés à un service (lien réciproque contenu ↔ service). */
export const postsForService = (slug: string) => posts.filter((p) => p.services?.includes(slug));

/** Temps de lecture estimé (200 mots par minute). */
export function readingTime(post: BlogPost) {
  const words = post.content
    .flatMap((b) => (b.type === 'list' ? b.items : [b.text]))
    .join(' ')
    .split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

export function formatDate(date: string) {
  return new Date(`${date}T12:00:00`).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
}

/** Identifiant d'ancre d'un intertitre (sommaire de l'article). */
export function headingId(text: string) {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}
