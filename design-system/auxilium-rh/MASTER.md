# Charte graphique — Auxilium RH (v2)

> Remplace la v1 « Trust & Authority » (marine + EB Garamond) générée par le skill
> ui-ux-pro-max. La v2 suit la direction demandée par Auxilium RH : site moderne
> « performance & data » inspiré de la landing page de Semrush, aux couleurs du logo.
> Les règles d'accessibilité de la v1 (skill ui-ux-pro-max) restent en vigueur.

Les valeurs ci-dessous sont définies dans `tailwind.config.js` : utiliser les
classes Tailwind (`bg-brand-600`, `text-accent-400`…), jamais de couleurs en dur.

## Réglages (skill ui-ux-pro-max)

Générés par `npm run design -- --variance 7 --motion 7 --density 3` dans `src/design/tokens.json`.
- **Créativité 7** (« Balanced / Modern ») : hero en deux colonnes, carte d'expertise mise en avant. Le skill bascule sur le style « Brutalism » à partir de 8 : il ne convient pas à un cabinet RH.
- **Animations 7** (« Standard », préréglage « Stagger List ») : cascade GSAP opacity 0 / scale 0.92 / y 16 / 400 ms / back.out(1.4), compteurs animés, parallaxe du hero.
- **Espacement 3** (« Spacious ») : échelle 4 / 8 / 24 / 32 / 48 / 64 / 96 px (classes `ds-xs` … `ds-3xl`).

## Couleurs

| Rôle | Classe Tailwind | Valeur | Usage |
|------|-----------------|--------|-------|
| Marque (logo) | `brand-600` | `#0333B3` | Liens, icônes, bandeau d'appel à l'action |
| Bleu nuit | `night-950` / `night-900` | `#040A21` / `#071233` | Hero, en-têtes de pages, chiffres clés, footer |
| Action | `accent-500` | `#FF6B2C` | Boutons principaux (texte `night-950` dessus), mises en avant |
| Action sur fond sombre | `accent-400` | `#FF8A4C` | Mots clés, sur-titres sur bleu nuit |
| Alerte conformité | `accent-50` + `accent-700` | | Badges « À régulariser » |
| Fond | `surface` | `#F8F9FA` | Fond général, alterné avec blanc et bleu nuit |
| Texte | `ink` / `ink-muted` | `#0F172A` / `#475569` | |
| Gris du logo | `steel` | `#7E7F83` | Réservé au logo |

Contraste : le texte blanc sur orange ne passe pas le seuil AA, d'où le texte bleu nuit
sur les boutons orange.

## Typographie

- **Plus Jakarta Sans** (Google Fonts), graisses 400 à 800.
- Titres en 800 (`font-extrabold`), interlettrage resserré (`tracking-tight`).
- Texte courant 16 px minimum, interligne 1,5 à 1,65.

## Composants

- Boutons (`src/index.css`) : `.btn-primary` (orange), `.btn-outline` (bleu), `.btn-outline-light` (sur fond sombre). Hauteur 48 px minimum.
- Cartes : `rounded-2xl`, bordure `slate-200`, ombre `shadow-card`, au survol `-translate-y-1` + `shadow-lift`.
- Icônes : Lucide (`lucide-react`), jamais d'emoji.
- Animations : composants `Reveal` et `RevealGroup` (GSAP + ScrollTrigger), paramètres selon le réglage --motion, désactivées si l'utilisateur réduit les animations.
- Images : illustrations vectorielles `public/illustrations/` (personnages, motif de l'arc du logo), remplaçables par des photos via `npm run images`.

## Accessibilité (héritée de la v1)

- Contraste du texte : 4,5:1 minimum (3:1 pour les grands titres).
- Focus visible : contour orange de 3 px (`:focus-visible`).
- Lien « Aller au contenu », fil d'Ariane sur les pages intérieures.
- Cibles tactiles de 44 px minimum.
- Formulaires : libellés visibles, erreur sous chaque champ (`aria-describedby`), récapitulatif focalisable.

## Contenu

- N'afficher que des chiffres et témoignages réels (voir `src/data/proof.ts`).
- Les sections « Notre impact » et « Témoignages » restent masquées tant qu'elles sont vides.
