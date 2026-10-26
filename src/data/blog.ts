// Articles du blog.
//
// Pour publier un article, ajouter un objet à la liste `posts` ci-dessous
// (le plus récent en premier), puis `npm run build`.
// Tant que la liste est vide, la page Blog affiche « Nos premiers articles arrivent bientôt ».

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
  content: BlogBlock[];
};

export const posts: BlogPost[] = [
  // Exemple de structure (à décommenter et adapter) :
  // {
  //   slug: 'preparer-sa-declaration-dts',
  //   title: 'Préparer sa déclaration DTS sereinement',
  //   excerpt: 'Les étapes à anticiper pour une déclaration sans mauvaise surprise.',
  //   date: '2026-11-15',
  //   category: 'Paie',
  //   cover: '/illustrations/paie.svg',
  //   author: 'Auxilium RH',
  //   content: [
  //     { type: 'p', text: 'Introduction…' },
  //     { type: 'h2', text: 'Les documents à réunir' },
  //     { type: 'list', items: ['…', '…'] },
  //   ],
  // },
];

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
