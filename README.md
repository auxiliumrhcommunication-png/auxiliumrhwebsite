# auxiliumrhwebsite
Ce dépôt distant servira à conserver les informations de la création du site de la compagnie Auxilium RH, toutes les modifications commit et push seront apparentes ici.

## Structure du site

Site vitrine statique (HTML / CSS / JavaScript), sans outil de compilation.

```
index.html          Page principale (accueil, services, approche, à propos, contact)
css/styles.css      Mise en forme (couleurs dans :root en haut du fichier)
js/main.js          Menu mobile et validation du formulaire de contact
assets/favicon.svg  Icône de l'onglet
```

## Voir le site en local

Ouvrir `index.html` dans un navigateur, ou lancer un petit serveur :

```
python3 -m http.server 8000
```

puis aller sur http://localhost:8000.

## À compléter

- Coordonnées réelles (e-mail, téléphone, adresse) dans la section Contact de `index.html`.
- Textes des services et de la présentation, à adapter à l'offre réelle.
- Envoi du formulaire : il ne fait pour l'instant que valider les champs. Pour recevoir les messages, le relier à un service comme Formspree ou Netlify Forms.
- Logo définitif (remplacer le « A » provisoire).

## Mise en ligne (Firebase Hosting)

La configuration est dans `firebase.json` : le site est publié depuis la racine du dépôt (sauf `.claude/`, le README et les fichiers cachés), avec des en-têtes de sécurité (CSP, HSTS, etc.).

1. Créer un projet sur https://console.firebase.google.com (offre gratuite « Spark »).
2. Installer l'outil et se connecter : `npm install -g firebase-tools` puis `firebase login`.
3. Lier le dépôt au projet : `firebase use --add` (crée le fichier `.firebaserc`).
4. Publier : `firebase deploy --only hosting`.

Le site est alors en ligne sur `https://<id-du-projet>.web.app`. Un nom de domaine personnalisé peut être ajouté dans la console Firebase (Hosting → Ajouter un domaine personnalisé).
