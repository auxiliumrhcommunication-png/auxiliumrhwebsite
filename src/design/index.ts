// Traduit les réglages du skill ui-ux-pro-max (src/design/tokens.json,
// générés par `npm run design`) en choix concrets.
// La direction « Clarté institutionnelle » limite volontairement leur effet :
// - --density : échelle d'espacement (classes ds-*, voir tailwind.config.js) ;
// - --variance : alignement du hero (centré de 1 à 3, deux colonnes au-delà) ;
// - --motion : durée et amplitude du fondu d'entrée de page (plafonnées).
import tokens from './tokens.json';

export const dials = tokens.dials;

export const heroLayout: 'centered' | 'split' = dials.variance <= 3 ? 'centered' : 'split';

const m = Math.min(dials.motion, 10);
/** Fondu d'entrée : 250 ms / 6 px au minimum, 450 ms / 16 px au maximum. */
export const motionStyle = {
  '--ds-motion-duration': `${Math.round(250 + (m - 1) * 22)}ms`,
  '--ds-motion-y': `${Math.round(6 + (m - 1) * 1.1)}px`,
} as React.CSSProperties;
