# auxiliumrhwebsite
Ce dépôt distant servira à conserver les informations de la création du site de la compagnie Auxilium RH, toutes les modifications commit et push seront apparentes ici.

## Technologies

React 18 + TypeScript, compilé avec Vite, mis en forme avec Tailwind CSS. Icônes Lucide. Hébergement Firebase Hosting.

## Arborescence

```
index.html                  Point d'entrée Vite (titre, polices, favicon)
tailwind.config.js          Palette Auxilium RH (brand #0333B3, night, accent orange)
public/                     Logo et favicon, copiés tels quels
src/
  main.tsx                  Démarrage de l'application et du routeur
  App.tsx                   Routes, lien « Aller au contenu », gestion du défilement
  index.css                 Tailwind, boutons, animation d'apparition
  data/                     TOUS LES TEXTES du site
    site.ts                 Coordonnées, LinkedIn, menu
    services.ts             Les 6 domaines d'expertise
    company.ts              Secteurs, méthode, atouts, engagements
    proof.ts                Chiffres clés et témoignages (réels uniquement)
  components/
    Navbar.tsx              Barre de navigation fixe + menu mobile
    Hero.tsx                Ouverture de l'accueil
    HeroDashboard.tsx       Aperçu interactif d'un diagnostic RH (exemple)
    ServicesGrid.tsx        Grille des expertises
    StatsSection.tsx        Chiffres clés
    ApproachSection.tsx     Méthode en 4 étapes
    WhyUsSection.tsx        Pourquoi Auxilium RH
    Testimonials.tsx        Témoignages (masqué tant qu'il n'y en a pas)
    CTASection.tsx          Bandeau d'appel à l'action
    Footer.tsx              Pied de page
    PageHeader.tsx          En-tête des pages intérieures
    Logo.tsx, Reveal.tsx    Logo, apparition au défilement
  pages/                    Accueil, Services, Secteurs, À propos, Contact, 404
design-system/              Charte graphique (non publiée)
```

## Modifier le contenu

Les textes sont dans `src/data/`. Exemples :
- **Lien LinkedIn** : renseigner `linkedin` dans `src/data/site.ts`. Le lien apparaît alors dans le pied de page.
- **Chiffres d'impact** (talents placés, entreprises accompagnées…) : remplir `impactStats` dans `src/data/proof.ts`.
- **Témoignages** : remplir `testimonials` dans `src/data/proof.ts`, uniquement avec l'accord des personnes citées.

## Travailler en local

Il faut Node.js 18 ou plus récent.

```
npm install        # une seule fois (et après chaque changement de dépendances)
npm run dev        # site de développement sur http://localhost:5173
npm run build      # compile le site dans dist/
npm run preview    # affiche la version compilée
```

## Formulaire de contact

Le site n'a pas de serveur : le formulaire vérifie les champs, puis ouvre la messagerie du visiteur avec un e-mail pré-rempli adressé à l'adresse de `src/data/site.ts`. Pour recevoir les messages directement, il faudra brancher un service (Formspree, Firebase…).

## Mise en ligne (Firebase Hosting)

`firebase.json` publie le dossier `dist/` et redirige toutes les adresses (/services, /contact…) vers l'application. Il ajoute aussi les en-têtes de sécurité (CSP, HSTS, etc.).

```
git pull
npm install
npm run build
firebase deploy --only hosting
```

Le site est en ligne sur https://auxilium-rh-database.web.app.

## Charte graphique

Voir `design-system/auxilium-rh/MASTER.md` : couleurs du logo, police Plus Jakarta Sans et règles d'accessibilité.
