import type { ReactNode } from 'react';
import { useReveal } from '../hooks/useReveal';

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Décalage en ms, pour faire apparaître une grille en cascade */
  delay?: number;
  as?: 'div' | 'li' | 'article';
};

/** Fait apparaître son contenu en fondu au moment où il arrive à l'écran. */
export default function Reveal({ children, className = '', delay = 0, as: Tag = 'div' }: RevealProps) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <Tag
      ref={ref as never}
      className={`reveal ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
