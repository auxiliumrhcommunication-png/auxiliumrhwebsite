import { useEffect } from 'react';

/**
 * Ajoute des données structurées (JSON-LD) propres à la page, retirées au changement de page.
 * Passer `null` pour ne rien ajouter. N'y mettre que des informations exactes.
 */
export function useJsonLd(data: Record<string, unknown> | null) {
  const json = data ? JSON.stringify(data) : '';
  useEffect(() => {
    if (!json) return;
    const el = document.createElement('script');
    el.type = 'application/ld+json';
    el.dataset.page = 'true';
    el.textContent = json;
    document.head.appendChild(el);
    return () => el.remove();
  }, [json]);
}
