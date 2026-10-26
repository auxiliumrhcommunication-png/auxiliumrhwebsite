# Charte graphique — Auxilium RH (v3 « Clarté institutionnelle »)

> **Mécanisme des jetons** : les jetons de couleur, de typographie, d'ombre et de mouvement sont
> définis dans `tailwind.config.js` (couche de jetons existante du projet) ; l'échelle d'espacement
> vient de `src/design/tokens.json` (`npm run design`) ; le fondu d'entrée utilise les variables CSS
> `--ds-motion-duration` et `--ds-motion-y` (`src/design/index.ts`, `src/index.css`).
> Composants : aucun composant 21st n'a été utilisé (MCP indisponible dans l'environnement de travail).

> Direction validée par Auxilium RH : **A « Éditorial institutionnel » + B « Par besoin »**
> (portes d'entrée sous le hero, en simples liens). Remplace la v2 (dégradés, tableau de bord,
> orange, bento). Recommandations du skill ui-ux-pro-max utilisées : motif « Trust & Authority
> + Conversion », style « Accessible & Ethical », mouvement « Scroll Reveal / Subtle »,
> réglages `--variance 5 --motion 3 --density 3`.

Positionnement : **cabinet de conseil RH**, pas un logiciel RH. Pas de tableau de bord, pas de
chiffres, références ou témoignages inventés.

## Principes

1. Blanc et bleu dominants ; une seule couleur d'action (le bleu).
2. Typographie éditoriale ; filets fins plutôt que cartes ; peu d'arrondis, une seule ombre.
3. L'anneau ouvert du logo comme unique motif graphique, avec parcimonie.
4. Photos réelles (personnes, lieux de travail au Gabon) dès qu'elles existent ; illustrations en attendant.
5. Mouvement minimal ; tout contenu visible sans JavaScript.

## Couleurs (`tailwind.config.js`)

| Jeton | Valeur | Usage | Contraste sur blanc |
|---|---|---|---|
| `brand-600` | #0C37C7 | Boutons, liens, accents | 8,80:1 |
| `brand-700` | #0A2DA3 | Survol | 10,95:1 |
| `brand-800` | #08237E | Appui, bandeau CTA, pied de page | 13,53:1 |
| `brand-50` / `brand-100` | #EEF2FD / #DCE4FB | Fonds teintés ; `brand-100` = texte sur `brand-800` (10,65:1) | — |
| `ink` | #1A1F2B | Texte principal | 16,47:1 |
| `ink-700` | #414857 | Texte secondaire | 9,17:1 |
| `ink-600` | #5A6272 | Métadonnées (5,48:1 sur `brand-50`) | 6,13:1 |
| `ink-500` | #6E7584 | Bordures de champs ; texte **sur blanc uniquement** | 4,62:1 |
| `line` / `mist` | #E3E6EC / #F6F7F9 | Filets / fond alterné | — |
| `ok` / `warn` / `danger` | #157347 / #9A5B00 / #B42318 | Messages | 5,87 / 5,43 / 6,57:1 |

Le logo (PNG) garde son bleu d'origine (#0333B3), quasi identique à `brand-600`.

## Typographie

- Titres : **Fraunces** 500-600 (`font-display`, classes `title-xl` … `title-sm`).
- Texte : **Source Sans 3** 400 / 600 / 700.
- Échelle : display-xl 40→64 px / 1,05 · display-lg 36→52 / 1,1 · display-md 28→40 / 1,15 ·
  display-sm 22 / 1,3 · lead 20 / 1,6 · body 17 / 1,65 · sur-titre 13 px majuscules +0,08 em.
- Largeurs : texte `max-w-prose` (68 caractères), contenu 1 200 px.

## Espacement et surfaces

- Échelle `ds-*` (réglage `--density 3`) : 4 · 8 · 24 · 32 · 48 · 64 · 96 px. Sections : 48 px (mobile) → 96 px (bureau), classe `section`.
- Arrondis : 0 pour les grands blocs, 4 px champs, 8 px boutons et panneaux, complet pour les étiquettes.
- Bordures 1 px `line`. Ombre unique `shadow-overlay` (menus superposés).

## Icônes

Lucide, trait 1,75, 20 px dans le texte, 24 px en mise en avant, `currentColor` ou `brand-600`. Pas de pastilles autour des icônes.

## Composants

- Boutons (`src/index.css`) : `btn-primary`, `btn-secondary`, `btn-on-dark`, `btn-outline-on-dark`, lien `link-arrow`. Hauteur 48 px.
- Appels à l'action : **principal « Demander un diagnostic RH »**, **secondaire « Parler à un expert RH »** (WhatsApp si renseigné, sinon téléphone) — composant `ContactActions`.
- Navigation : barre blanche 72 px, sous-menu Services (6 services), lien actif souligné, menu mobile plein écran.
- Services : index numéroté 01-06 à filets (`ServicesIndex`) ; page service avec navigation latérale fixe.
- Articles : `PostCard` sans ombre, image 3:2 ; article à 68 caractères avec sommaire et encadré CTA.
- Formulaires : `field-label`, `field-input` ; erreur sous le champ (`aria-describedby`), récapitulatif focalisable.

## Mouvement

- Survols 150-200 ms (couleur, soulignement, flèche qui avance de 4 px).
- Entrée de page : fondu de 0,3 s, 8 px (`--motion 3`, plafonné à 450 ms / 16 px). Pas d'apparition au défilement, pas de parallaxe.
- `prefers-reduced-motion` : aucune animation.

## Accessibilité

WCAG 2.2 AA : texte 4,5:1, éléments d'interface 3:1 ; focus visible (bleu, blanc sur fond bleu) ;
lien d'évitement ; un seul `h1` par page ; cibles ≥ 24 px (44 px pour les commandes principales) ;
`lang="fr"` ; zoom 200 %.

## Adaptation aux écrans

375 px : une colonne, marges 16 px · 768 px : deux colonnes ponctuelles, marges 24 px ·
1024 px : menu bureau, grilles · 1440 px : contenu 1 200 px centré.

## États et retours utilisateur

- **Vide** : jamais de section vide. Témoignages, chiffres d'impact, articles liés et derniers conseils sont masqués tant qu'ils n'ont pas de contenu ; la page Blog affiche « Nos premiers articles arrivent bientôt » avec les appels à l'action.
- **Erreur** : message en `danger` sous le champ concerné + récapitulatif focalisable en haut du formulaire ; recherche sans résultat : message + bouton « Effacer la recherche ».
- **Succès** : affiché **uniquement** quand l'action a réellement réussi (ex. copie confirmée par le presse-papiers). L'ouverture de la messagerie n'est pas un succès d'envoi : état informatif `brand-50` (« Votre message est prêt… »), avec « Ouvrir à nouveau ma messagerie » et « Copier le message ».
- **Chargement** : sans objet (site statique, aucune requête réseau applicative).
- Messages annoncés aux lecteurs d'écran (`role="status"`, `role="alert"`).

## Parcours de contact

1. Appel à l'action « Demander un diagnostic RH » → `/contact` (motif pré-rempli via `?motif=`).
2. Formulaire : motif, nom, e-mail, téléphone (facultatif), organisation (facultatif), besoin.
3. Envoi : ouverture de la messagerie du visiteur (`mailto:`), aucun stockage par le site.
4. « Parler à un expert RH » : WhatsApp si `contact.whatsapp` est renseigné, sinon téléphone (`tel:`).

## Blog et contenus

- Articles publiés : `src/data/articles.ts` ; brouillons : `src/data/drafts.ts` (visibles seulement en `npm run dev`, bandeau « Brouillon » et liste des points à vérifier).
- Liste : article « À la une », filtres par catégorie et recherche (affichés seulement s'il y a des articles), adresse partageable (`?categorie=`, `?q=`).
- Article : sommaire, date, auteur, temps de lecture, « Nos services liés », encadré d'appel à l'action, articles liés de la même catégorie, données structurées `BlogPosting` (articles publiés uniquement).
- Rédaction : aucune référence juridique, taux, délai ou montant sans source vérifiée ; points incertains listés dans `verify`.
