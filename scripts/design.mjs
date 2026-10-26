#!/usr/bin/env node
// Régénère les jetons de design du site à partir du skill ui-ux-pro-max.
//
//   npm run design -- --variance 7 --motion 7 --density 3
//
// --variance 1-10 : créativité de la mise en page (1 centré/sobre … 10 audacieux/asymétrique)
// --motion   1-10 : intensité des animations (1 discret … 10 chorégraphié)
// --density  1-10 : espacement (1 très aéré … 10 dense, type tableau de bord)
// --query "…"     : mots clés envoyés au skill (facultatif)
//
// Un réglage omis reprend sa valeur actuelle (src/design/tokens.json).
// Le résultat est écrit dans src/design/tokens.json, lu par tailwind.config.js
// (espacements) et par l'application (mise en page et animations).
// Relancer ensuite `npm run dev` ou `npm run build`.

import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const tokensPath = join(root, 'src/design/tokens.json');
const skillScript = join(root, '.claude/skills/ui-ux-pro-max/scripts/search.py');
const DEFAULT_QUERY = 'B2B consulting data performance modern bold';

const current = existsSync(tokensPath) ? JSON.parse(readFileSync(tokensPath, 'utf8')) : null;

// Lecture des arguments --variance 7 ou --variance=7
const args = process.argv.slice(2);
const opt = (name) => {
  const i = args.findIndex((a) => a === `--${name}` || a.startsWith(`--${name}=`));
  if (i === -1) return undefined;
  return args[i].includes('=') ? args[i].split('=').slice(1).join('=') : args[i + 1];
};
const dial = (name) => {
  const raw = opt(name) ?? current?.dials?.[name];
  const n = Number(raw ?? 5);
  if (!Number.isInteger(n) || n < 1 || n > 10) {
    console.error(`--${name} doit être un entier entre 1 et 10 (reçu : ${raw})`);
    process.exit(1);
  }
  return n;
};
const variance = dial('variance');
const motion = dial('motion');
const density = dial('density');
const query = opt('query') ?? current?.query ?? DEFAULT_QUERY;

// Python : python3 (Linux/Mac), python ou py -3 (Windows)
const candidates = [['python3'], ['python'], ['py', '-3']];
let result;
for (const [cmd, ...pre] of candidates) {
  result = spawnSync(cmd, [
    ...pre, skillScript, query, '--design-system', '-p', 'Auxilium RH', '--json',
    '--variance', String(variance), '--motion', String(motion), '--density', String(density),
  ], { encoding: 'utf8', cwd: root });
  if (!result.error) break;
}
if (!result || result.error) {
  console.error('Python 3 est introuvable. Installez-le (https://www.python.org/downloads/) puis relancez.');
  process.exit(1);
}
if (result.status !== 0) {
  console.error(result.stderr || result.stdout);
  process.exit(result.status ?? 1);
}

const out = JSON.parse(result.stdout);
const ds = out.design_system ?? out;
const snippet = ds.motion_snippet ?? {};

const tokens = {
  _note: 'Fichier généré par `npm run design` (skill ui-ux-pro-max). Ne pas modifier à la main.',
  query,
  dials: { variance, motion, density },
  labels: {
    variance: ds.dials?.variance_label,
    motion: ds.dials?.motion_label,
    density: ds.dials?.density_label,
  },
  // Style proposé par le skill, à titre indicatif : la palette reste celle du logo (#0333B3).
  skillStyle: ds.style?.name,
  spacing: ds.spacing_scale,
  motionPreset: {
    category: snippet.Category,
    tier: snippet['Intensity Tier'],
    duration: snippet.Duration,
    easing: snippet.Easing,
    snippet: snippet['GSAP Snippet'],
  },
};

writeFileSync(tokensPath, `${JSON.stringify(tokens, null, 2)}\n`);

console.log('Jetons de design mis à jour : src/design/tokens.json');
console.log(`  Créativité  ${variance}/10  ${tokens.labels.variance ?? ''}`);
console.log(`  Animations  ${motion}/10  ${tokens.labels.motion ?? ''}  (${tokens.motionPreset.category ?? '—'})`);
console.log(`  Espacement  ${density}/10  ${tokens.labels.density ?? ''}  (sections : ${tokens.spacing?.['3xl']})`);
if (variance >= 8) {
  console.log(`  Note : à ${variance}/10 le skill propose le style « ${tokens.skillStyle} ». Le site garde sa palette`);
  console.log('         et n\'applique que la mise en page audacieuse (grille bento, hero asymétrique).');
}
console.log('Relancez `npm run dev` ou `npm run build` pour voir le résultat.');
