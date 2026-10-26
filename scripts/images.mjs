#!/usr/bin/env node
// Optimise les photos du site.
//
// 1. Déposer les photos originales (JPG ou PNG) dans photos/, nommées d'après
//    l'emplacement qu'elles remplacent :
//      photos/equipe.jpg        page À propos et accueil (à la place de l'illustration d'équipe)
//      photos/recrutement.jpg   accueil, bloc « Recrutement »
//      photos/conformite.jpg    accueil, bloc « Audit et conformité »
//      photos/paie.jpg          accueil, bloc « Paie et administration »
// 2. Lancer : npm run images
//
// Le script produit pour chaque photo des versions AVIF et WebP (800 et 1600 px
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
const SLOTS = ['equipe', 'recrutement', 'conformite', 'paie'];
const WIDTHS = [800, 1600];

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
  // Recadrage 5:4, comme les illustrations
  const ratio = 4 / 5;
  const sources = { avif: [], webp: [] };
  for (const w of WIDTHS) {
    if (w > width && w !== WIDTHS[0]) continue;
    const h = Math.round(w * ratio);
    const base = input.clone().resize(w, h, { fit: 'cover', position: 'attention' });
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
