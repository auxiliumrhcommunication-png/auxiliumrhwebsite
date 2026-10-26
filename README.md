# auxiliumrhwebsite
Ce dépôt distant servira à conserver les informations de la création du site de la compagnie Auxilium RH, toutes les modifications commit et push seront apparentes ici.

## Structure du site

Site vitrine statique (HTML / CSS / JavaScript), sans outil de compilation.

```
index.html          Accueil : présentation, domaines d'expertise, approche, atouts
services.html       Détail des 6 domaines d'expertise
secteurs.html       Publics accompagnés (TPE/PME, grandes entreprises, etc.)
a-propos.html       Présentation du cabinet, vision et engagements
contact.html        Coordonnées et formulaire de contact
css/styles.css      Mise en forme (couleurs dans :root en haut du fichier)
js/main.js          Menu mobile et formulaire de contact
assets/favicon.svg  Icône de l'onglet
design-system/      Charte graphique (non publiée sur le site)
```

L'en-tête et le pied de page sont répétés dans chaque page : une modification (menu, coordonnées) doit être reportée dans les 5 fichiers.

## Charte graphique

La charte est décrite dans `design-system/auxilium-rh/MASTER.md`. Elle a été générée avec le skill ui-ux-pro-max (`.claude/skills/ui-ux-pro-max/`), avec le style « Trust & Authority » : bleu marine, bleu d'accent réservé aux actions, polices EB Garamond (titres) et Lato (texte), contraste minimal 4,5:1, navigation au clavier. Les couleurs sont reprises comme variables CSS en haut de `css/styles.css`. Toute nouvelle page doit suivre cette charte.

## Voir le site en local

Ouvrir `index.html` dans un navigateur, ou lancer un petit serveur :

```
python3 -m http.server 8000
```

puis aller sur http://localhost:8000.

## Formulaire de contact

Le site n'a pas de serveur : le formulaire vérifie les champs puis ouvre la messagerie du visiteur avec un e-mail pré-rempli adressé à info@auxiliumrh.ga (adresse définie par l'attribut `data-recipient` du formulaire dans `contact.html`). Pour recevoir les messages sans passer par la messagerie du visiteur, il faudra brancher un service (Formspree, Firebase…).

## À compléter

- Lien vers la page LinkedIn d'Auxilium RH.
- Logo définitif (remplacer le « A » provisoire).
- Page Actualités, quand du contenu sera disponible.

## Mise en ligne (Firebase Hosting)

La configuration est dans `firebase.json` : le site est publié depuis la racine du dépôt (sauf `.claude/`, le README et les fichiers cachés), avec des en-têtes de sécurité (CSP, HSTS, etc.).

1. Créer un projet sur https://console.firebase.google.com (offre gratuite « Spark »).
2. Installer l'outil et se connecter : `npm install -g firebase-tools` puis `firebase login`.
3. Lier le dépôt au projet : `firebase use --add` (crée le fichier `.firebaserc`).
4. Publier : `firebase deploy --only hosting`.

Le site est alors en ligne sur `https://<id-du-projet>.web.app`. Un nom de domaine personnalisé peut être ajouté dans la console Firebase (Hosting → Ajouter un domaine personnalisé).
