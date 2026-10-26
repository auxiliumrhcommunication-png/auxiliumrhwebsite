/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Bleu Auxilium RH (logo) : couleur de marque
        brand: {
          50: '#EEF3FF',
          100: '#DCE6FF',
          200: '#B6CBFF',
          300: '#86A6FF',
          400: '#4F78F5',
          500: '#1E4FE0',
          600: '#0333B3', // couleur officielle du logo
          700: '#032A93',
          800: '#062275',
          900: '#071A52',
        },
        // Bleu nuit : sections sombres, header du tableau de bord, footer
        night: {
          800: '#0B1A45',
          900: '#071233',
          950: '#040A21',
        },
        // Orange d'action (boutons, mises en avant, alertes conformité).
        // Texte foncé (night-950) dessus pour garder un contraste AA.
        accent: {
          50: '#FFF4ED',
          100: '#FFE5D3',
          400: '#FF8A4C',
          500: '#FF6B2C',
          600: '#E8541A',
          700: '#B93F10',
        },
        surface: '#F8F9FA',
        ink: {
          DEFAULT: '#0F172A',
          muted: '#475569',
          subtle: '#64748B',
        },
        // Gris du logo
        steel: '#7E7F83',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', '"Segoe UI"', 'sans-serif'],
      },
      maxWidth: {
        site: '1200px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(15, 23, 42, 0.04), 0 4px 16px rgba(15, 23, 42, 0.06)',
        lift: '0 12px 32px rgba(3, 51, 179, 0.14)',
        widget: '0 30px 60px -20px rgba(4, 10, 33, 0.55)',
      },
      keyframes: {
        'fill-bar': {
          from: { transform: 'scaleX(0)' },
          to: { transform: 'scaleX(1)' },
        },
      },
      animation: {
        'fill-bar': 'fill-bar 900ms cubic-bezier(0.22, 1, 0.36, 1) both',
      },
    },
  },
  plugins: [],
};
