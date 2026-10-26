import { useEffect, useRef } from 'react';

/**
 * Ajoute la classe `is-visible` à l'élément quand il entre dans l'écran
 * (une seule fois). Le style est défini par `.reveal` dans index.css et
 * est neutralisé si l'utilisateur a demandé à réduire les animations.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!('IntersectionObserver' in window)) {
      el.classList.add('is-visible');
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible');
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}
