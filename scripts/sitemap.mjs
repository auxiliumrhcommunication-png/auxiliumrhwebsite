#!/usr/bin/env node
// Génère dist/sitemap.xml et dist/robots.txt après `vite build`.
// Les adresses viennent des données du site (services, articles) ; les pages
// légales ne sont listées qu'une fois leurs informations complétées.

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (p) =>
  readFileSync(join(root, p), 'utf8')
    .split('\n')
    .filter((l) => !l.trim().startsWith('//')) // ignore les exemples commentés
    .join('\n');

const site = read('src/data/site.ts');
const siteUrl = site.match(/SITE_URL = '([^']+)'/)[1];
const slugs = (src) => [...new Set([...src.matchAll(/slug: '([^']+)'/g)].map((m) => m[1]))];
const legalBlock = site.slice(site.indexOf('export const legal'));
const legalComplete = !/'\[/.test(legalBlock);

const today = new Date().toISOString().slice(0, 10);
const paths = [
  '/', '/services', ...slugs(read('src/data/services.ts')).map((s) => `/services/${s}`),
  '/secteurs', '/a-propos', '/blog', ...slugs(read('src/data/articles.ts')).map((s) => `/blog/${s}`), '/contact',
  ...(legalComplete ? ['/mentions-legales', '/confidentialite'] : []),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((p) => `  <url><loc>${siteUrl}${p}</loc><lastmod>${today}</lastmod></url>`).join('\n')}
</urlset>
`;
writeFileSync(join(root, 'dist/sitemap.xml'), xml);
writeFileSync(join(root, 'dist/robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`);
console.log(`sitemap.xml : ${paths.length} adresses${legalComplete ? '' : ' (pages légales exclues : informations à compléter)'}`);
