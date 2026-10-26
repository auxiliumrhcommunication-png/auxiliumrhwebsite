# auxiliumrhwebsite
Ce dépôt distant servira à conserver les informations de la création du site de la compagnie Auxilium RH, toutes les modifications commit et push seront apparentes ici.

## Technologies

React 18 + TypeScript, compilé avec Vite, mis en forme avec Tailwind CSS. Icônes Lucide. Hébergement Firebase Hosting (hébergement seul : pas de base de données ni d'authentification).

## Arborescence

```
index.html                  Point d'entrée Vite (titre, polices, données structurées)
tailwind.config.js          Jetons de la charte (bleu #0C37C7, encre, gris, sémantiques)
public/                     Logo, favicon et illustrations (public/illustrations/)
photos/                     Vos photos originales (voir « Images »)
scripts/design.mjs          npm run design : réglages du skill ui-ux-pro-max
scripts/images.mjs          npm run images : optimisation des photos
scripts/sitemap.mjs         Génère dist/sitemap.xml et dist/robots.txt (lancé par npm run build)
src/
  main.tsx, App.tsx         Démarrage, routes, lien « Aller au contenu », défilement
  index.css                 Boutons, champs, titres, fondu d'entrée de page
  design/                   tokens.json (généré par npm run design) et sa traduction
  hooks/useSeo.ts           Titre, description, adresse canonique, balises de partage par page
  data/                     TOUS LES TEXTES du site
    site.ts                 Coordonnées, WhatsApp, LinkedIn, menu, appels à l'action, mentions légales
    services.ts             Les 6 services (adresses /services/…) et les portes d'entrée « par besoin »
    company.ts              Secteurs, méthode, atouts, engagements
    blog.ts                 Articles et catégories
    proof.ts                Chiffres d'impact et témoignages (réels uniquement)
  components/
    Navbar.tsx              Barre fixe, sous-menu Services, menu mobile
    Hero.tsx, BrandPanel.tsx Ouverture de l'accueil et visuel de marque
    NeedsBar.tsx            Portes d'entrée « Vous souhaitez… »
    ServicesIndex.tsx       Index numéroté des 6 services
    DiagnosticSteps.tsx     Les 4 étapes de l'accompagnement
    ReasonsSection.tsx      Pourquoi Auxilium RH
    LatestPosts.tsx, PostCard.tsx  Articles (masqués tant qu'il n'y en a pas)
    Testimonials.tsx        Témoignages (masqués tant qu'il n'y en a pas)
    ContactActions.tsx      Paire d'appels à l'action « Demander un diagnostic RH » / « Parler à un expert RH »
    CTASection.tsx, Footer.tsx, PageHeader.tsx, Logo.tsx, SlotImage.tsx
  pages/                    Accueil, Services, Service (×6), Secteurs, À propos, Blog, Article,
                            Contact, Mentions légales, Confidentialité, 404
design-system/              Charte graphique (non publiée)
```

## Adresses du site

`/`, `/services`, `/services/recrutement`, `/services/audit-conformite`, `/services/paie-administration`,
`/services/strategie-rh`, `/services/droit-du-travail`, `/services/externalisation`, `/secteurs`, `/a-propos`,
`/blog`, `/blog/<article>`, `/contact`, `/mentions-legales`, `/confidentialite`.
Les anciennes ancres (`/services#paie`…) redirigent vers la page du service. `/contact?motif=Recrutement` pré-remplit le motif.

## À compléter avant la mise en production

Dans `src/data/site.ts` :
- **Mentions légales** (`legal`) : forme juridique, RCCM, NIF, adresse du siège, directeur de la publication. Tant qu'une valeur est entre crochets, les pages légales sont exclues de Google et du plan du site.
- **WhatsApp** (`whatsapp`) : numéro au format international sans « + » (ex. `24162805051`). Vide = liens WhatsApp masqués, le bouton « Parler à un expert RH » appelle le téléphone.
- **LinkedIn** (`linkedin`).

Dans `src/pages/Legal.tsx` : durée de conservation des messages et cadre légal gabonais applicable (à valider par un juriste).

## Modifier le contenu

- **Chiffres d'impact et témoignages** : `src/data/proof.ts`, uniquement des données réelles (témoignages avec accord écrit).
- **Articles** : ajouter un objet à `posts` dans `src/data/blog.ts` (exemple commenté dans le fichier). Catégories disponibles : Recrutement, Conformité, Paie, Stratégie RH, Droit du travail, Guides, Actualités.

## Travailler en local

Il faut Node.js 18 ou plus récent.

```
npm install        # une seule fois (et après chaque changement de dépendances)
npm run dev        # site de développement sur http://localhost:5173
npm run build      # vérifie, compile dans dist/ et génère sitemap.xml + robots.txt
npm run preview    # affiche la version compilée
```

## Réglages de design (skill ui-ux-pro-max)

```
npm run design -- --variance 5 --motion 3 --density 3
npm run build
```

La direction « Clarté institutionnelle » limite volontairement leur effet :
- `--density` : espacement (3 = sections de 96 px) ;
- `--variance` : hero centré (1 à 3) ou en deux colonnes (4 et plus) ;
- `--motion` : durée et amplitude du fondu d'entrée de page (plafonnées à 450 ms / 16 px).

Python 3 est requis. Les animations sont toujours désactivées si le visiteur a demandé à réduire les animations.

## Images

- **Illustrations** : `public/illustrations/`, vectorielles, dans la palette bleue.
- **Photos** : déposer `equipe.jpg`, `recrutement.jpg`, `conformite.jpg` ou `paie.jpg` dans `photos/`, puis `npm run images` et `npm run build`. La photo `equipe` remplace aussi le visuel de marque de l'accueil.

## Formulaire de contact

Le site n'a pas de serveur : le formulaire vérifie les champs, puis ouvre la messagerie du visiteur avec un e-mail pré-rempli (motif, nom, e-mail, téléphone, organisation, besoin). Recevoir les messages sans passer par la messagerie du visiteur nécessitera un service (Formspree, Firebase…) : à décider.

## Mise en ligne (Firebase Hosting)

`firebase.json` publie `dist/`, redirige toutes les adresses vers l'application et ajoute les en-têtes de sécurité (CSP, HSTS, etc.).

Vérifier d'abord sur une adresse de prévisualisation (n'affecte pas le site en ligne) :

```
git pull
npm install
npm run build
firebase hosting:channel:deploy apercu
```

Puis, une fois validé, en production :

```
firebase deploy --only hosting      # doit indiquer « found … files in dist »
```

## Charte graphique

Voir `design-system/auxilium-rh/MASTER.md`.
