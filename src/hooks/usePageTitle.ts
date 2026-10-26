import { useEffect } from 'react';

const SUFFIX = 'Auxilium RH';

/** Met à jour le titre de l'onglet pour chaque page. */
export function usePageTitle(title?: string) {
  useEffect(() => {
    document.title = title ? `${title} — ${SUFFIX}` : `${SUFFIX} — Conseil RH, recrutement, paie et audit social au Gabon`;
  }, [title]);
}
