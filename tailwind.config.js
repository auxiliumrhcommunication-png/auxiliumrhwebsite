import { readFileSync } from 'node:fs';

// Espacements générés par `npm run design` (skill ui-ux-pro-max, réglage --density)
const tokens = JSON.parse(readFileSync(new URL('./src/design/tokens.json', import.meta.url), 'utf8'));
const ds = Object.fromEntries(Object.entries(tokens.spacing).map(([k, v]) => [`ds-${k}`, v]));

// Charte « Clarté institutionnelle » : voir design-system/MASTER.md.
// Contrastes sur blanc indiqués en commentaire (WCAG AA : 4,5:1 pour le texte).
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#EEF2FD', // fonds teintés
          100: '#DCE4FB', // bordures sur fond teinté, texte sur brand-800 (10,65:1)
          200: '#B9C8F6', // décoratif uniquement
          600: '#0C37C7', // bleu de marque : boutons, liens (8,80:1)
          700: '#0A2DA3', // survol (10,95:1)
          800: '#08237E', // appui, bandeaux et pied de page (13,53:1)
          900: '#061A5E',
        },
        ink: {
          DEFAULT: '#1A1F2B', // texte principal (16,47:1)
          700: '#414857', // texte secondaire (9,17:1)
          600: '#5A6272', // métadonnées (6,13:1 ; 5,48:1 sur brand-50)
          500: '#6E7584', // bordures de champs, texte sur blanc uniquement (4,62:1)
        },
        line: '#E3E6EC', // filets
        mist: '#F6F7F9', // fond alterné
        ok: '#157347', // 5,87:1
        warn: '#9A5B00', // 5,43:1
        danger: '#B42318', // 6,57:1
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', '"Times New Roman"', 'serif'],
        sans: ['"Source Sans 3"', 'system-ui', '-apple-system', '"Segoe UI"', 'sans-serif'],
      },
      fontSize: {
        // taille, [interligne] : échelle de la charte
        'display-xl': ['clamp(2.5rem, 5vw, 4rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-lg': ['clamp(2.25rem, 4vw, 3.25rem)', { lineHeight: '1.1', letterSpacing: '-0.015em' }],
        'display-md': ['clamp(1.75rem, 3vw, 2.5rem)', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        'display-sm': ['1.375rem', { lineHeight: '1.3' }],
        lead: ['1.25rem', { lineHeight: '1.6' }],
        body: ['1.0625rem', { lineHeight: '1.65' }],
      },
      // p-ds-lg, gap-ds-md, py-ds-3xl… suivent le réglage --density
      spacing: ds,
      maxWidth: {
        site: '1200px',
        wide: '1320px',
        prose: '68ch',
      },
      boxShadow: {
        // Une seule ombre : menus et panneaux superposés
        overlay: '0 8px 24px rgba(26, 31, 43, 0.08)',
      },
      keyframes: {
        enter: {
          from: { opacity: '0', transform: 'translateY(var(--motion-y, 8px))' },
          to: { opacity: '1', transform: 'none' },
        },
      },
      animation: {
        enter: 'enter var(--motion-duration, 300ms) ease-out both',
      },
    },
  },
  plugins: [],
};
