#!/usr/bin/env node
// Optimise les photos du site.
//
// 1. Déposer les photos originales (JPG, PNG ou WebP) dans photos/, nommées d'après
//    l'emplacement qu'elles remplacent :
//      photos/accueil.webp      visuel du hero de l'accueil (portrait, recadré par le haut)
//      photos/equipe.jpg        page À propos : photo RÉELLE de l'équipe uniquement
//      photos/recrutement.webp  page Recrutement
//      photos/conformite.jpg    page Audit et conformité
//      photos/paie.webp         page Paie et administration
//      photos/strategie.webp    page Conseil en organisation et stratégie RH
//    Les détourages (fond transparent) sont conservés : le site les pose sur un aplat bleu clair.
// 2. Lancer : npm run images
//
// Le script produit pour chaque photo des versions AVIF et WebP (800 à 1600 px
// de large) dans public/photos/, et met à jour src/data/photos.json. Le site
// affiche alors la photo à la place de l'illustration correspondante.
// Pour revenir à l'illustration : supprimer la photo de photos/ et relancer.

import { existsSync, mkdirSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, extname, basename, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const srcDir = join(root, 'photos');
const outDir = join(root, 'public/photos');
const manifestPath = join(root, 'src/data/photos.json');
// ratio = hauteur / largeur. Le hero est en portrait recadré par le haut (visage conservé) ;
// les autres sont en 5:4, l'image entière contenue et posée sur le bord bas.
const LANDSCAPE = { ratio: 4 / 5, fit: 'contain', position: 'bottom' };
const SLOT_CONFIG = {
  accueil: { ratio: 5 / 4, fit: 'cover', position: 'top' },
  equipe: { ratio: 4 / 5, fit: 'cover', position: 'attention' },
  recrutement: LANDSCAPE,
  conformite: LANDSCAPE,
  paie: LANDSCAPE,
  strategie: LANDSCAPE,
};
const SLOTS = Object.keys(SLOT_CONFIG);
const TRANSPARENT = { r: 0, g: 0, b: 0, alpha: 0 };
const WIDTHS = [800, 1200, 1600];

mkdirSync(srcDir, { recursive: true });
rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

const files = readdirSync(srcDir).filter((f) => /\.(jpe?g|png|webp)$/i.test(f));
const manifest = {};

for (const file of files) {
  const slot = basename(file, extname(file)).toLowerCase();
  if (!SLOTS.includes(slot)) {
    console.warn(`Ignoré : ${file} (noms possibles : ${SLOTS.join(', ')})`);
    continue;
  }
  const input = sharp(join(srcDir, file)).rotate(); // respecte l'orientation EXIF
  const { width = 0, height = 0 } = await input.metadata();
  const { ratio, fit, position } = SLOT_CONFIG[slot];
  const sources = { avif: [], webp: [] };
  // Pas d'agrandissement : la plus grande version est plafonnée à la largeur d'origine
  const widths = [...new Set(WIDTHS.map((w) => Math.max(WIDTHS[0], Math.min(w, width))))];
  for (const w of widths) {
    const h = Math.round(w * ratio);
    const base = input.clone().resize(w, h, { fit, position, background: TRANSPARENT });
    await base.clone().avif({ quality: 55 }).toFile(join(outDir, `${slot}-${w}.avif`));
    await base.clone().webp({ quality: 78 }).toFile(join(outDir, `${slot}-${w}.webp`));
    sources.avif.push(`/photos/${slot}-${w}.avif ${w}w`);
    sources.webp.push(`/photos/${slot}-${w}.webp ${w}w`);
  }
  manifest[slot] = {
    avif: sources.avif.join(', '),
    webp: sources.webp.join(', '),
    fallback: `/photos/${slot}-${WIDTHS[0]}.webp`,
    width: WIDTHS[0],
    height: Math.round(WIDTHS[0] * ratio),
  };
  console.log(`✓ ${file} → ${slot} (${width}×${height})`);
}

writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
if (!Object.keys(manifest).length) {
  console.log(`Aucune photo dans photos/ : le site utilise les illustrations. Noms possibles : ${SLOTS.join(', ')}.`);
}
if (!existsSync(join(root, 'dist'))) console.log('Relancez `npm run build` pour publier.');
