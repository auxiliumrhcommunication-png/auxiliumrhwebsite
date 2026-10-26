import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Enregistrement unique des plugins GSAP utilisés par le site
gsap.registerPlugin(ScrollTrigger, useGSAP);

/** Requête « l'utilisateur préfère réduire les animations » : on affiche alors l'état final directement. */
export const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';
export const FULL_MOTION = '(prefers-reduced-motion: no-preference)';

export { gsap, ScrollTrigger, useGSAP };
