import { useRef, type ElementType, type ReactNode } from 'react';
import { gsap, useGSAP, FULL_MOTION } from '../design/gsap';
import { motion } from '../design';

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Décalage en secondes */
  delay?: number;
  as?: ElementType;
  id?: string;
};

/**
 * Fait apparaître un bloc quand il arrive à l'écran (GSAP + ScrollTrigger).
 * Amplitude et vitesse : réglage --motion (src/design). Sans JavaScript ou si
 * l'utilisateur réduit les animations, le contenu est simplement visible.
 */
export function Reveal({ children, className = '', delay = 0, as: Tag = 'div', id }: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(FULL_MOTION, () => {
      gsap.from(ref.current, {
        opacity: 0,
        y: motion.section.y,
        duration: motion.section.duration,
        ease: motion.section.ease,
        delay,
        scrollTrigger: { trigger: ref.current, start: 'top 88%', once: true },
      });
    });
  }, { scope: ref });

  return <Tag ref={ref} id={id} className={className}>{children}</Tag>;
}

type RevealGroupProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
};

/**
 * Apparition en cascade des enfants directs d'une grille : préréglage
 * « Stagger List » du skill (opacity 0, scale 0.92, y 16, back.out, stagger grid auto).
 */
export function RevealGroup({ children, className = '', as: Tag = 'div' }: RevealGroupProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(FULL_MOTION, () => {
      const items = ref.current ? Array.from(ref.current.children) : [];
      gsap.from(items, {
        opacity: 0,
        y: motion.grid.y,
        scale: motion.grid.scale,
        duration: motion.grid.duration,
        ease: motion.grid.ease,
        stagger: { each: motion.grid.stagger, from: 'start', grid: 'auto' },
        scrollTrigger: { trigger: ref.current, start: 'top 85%', once: true },
      });
    });
  }, { scope: ref });

  return <Tag ref={ref} className={className}>{children}</Tag>;
}

export default Reveal;
