// Traduit les réglages du skill ui-ux-pro-max (src/design/tokens.json,
// générés par `npm run design`) en choix concrets de mise en page et d'animation.
import tokens from './tokens.json';

export const dials = tokens.dials;

/** --variance : 1-3 centré et sobre, 4-7 équilibré (deux colonnes), 8-10 audacieux (bento, asymétrie). */
export type Layout = 'centered' | 'split' | 'bold';
export const layout: Layout = dials.variance <= 3 ? 'centered' : dials.variance <= 7 ? 'split' : 'bold';

/** --motion : niveau d'animation. */
export type MotionTier = 'subtle' | 'standard' | 'complex';
export const motionTier: MotionTier = dials.motion <= 3 ? 'subtle' : dials.motion <= 7 ? 'standard' : 'complex';

type RevealPreset = { y: number; scale: number; duration: number; ease: string; stagger: number };

/**
 * Paramètres GSAP par niveau, repris des préréglages du skill :
 * - subtle   : « Scroll Reveal / Subtle »   (y 12, 350 ms, power1.out)
 * - standard : « Stagger List / Standard » (y 16, scale 0.92, 400 ms, back.out(1.4), stagger 0.06)
 * - complex  : version plus ample et plus lente du même mouvement
 */
const presets: Record<MotionTier, { section: RevealPreset; grid: RevealPreset }> = {
  subtle: {
    section: { y: 12, scale: 1, duration: 0.35, ease: 'power1.out', stagger: 0.04 },
    grid: { y: 12, scale: 1, duration: 0.35, ease: 'power1.out', stagger: 0.04 },
  },
  standard: {
    section: { y: 24, scale: 1, duration: 0.5, ease: 'power2.out', stagger: 0.08 },
    grid: { y: 16, scale: 0.92, duration: 0.4, ease: 'back.out(1.4)', stagger: 0.06 },
  },
  complex: {
    section: { y: 40, scale: 1, duration: 0.7, ease: 'expo.out', stagger: 0.1 },
    grid: { y: 28, scale: 0.88, duration: 0.55, ease: 'back.out(1.6)', stagger: 0.08 },
  },
};
export const motion = presets[motionTier];

/** Parallaxe du hero et compteurs animés à partir de --motion 6. */
export const parallaxEnabled = dials.motion >= 6;
export const countersEnabled = dials.motion >= 4;
/** Amplitude de la parallaxe (en % de la hauteur de l'élément). */
export const parallaxAmount = dials.motion >= 8 ? 14 : 8;
