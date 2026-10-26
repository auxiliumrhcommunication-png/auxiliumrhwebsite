import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';

// Points examinés, repris du service « Audit, diagnostic et conformité RH » (src/data/services.ts)
const points = [
  'Vos pratiques RH existantes',
  'Les dossiers individuels des salariés',
  'Les contrats et documents administratifs',
  'Les écarts réglementaires et les priorités d\'action',
];

/**
 * Visuel du hero, en attendant une photo réelle : ce que couvre un premier
 * diagnostic RH. Un contenu utile plutôt qu'un aplat décoratif.
 */
export default function DiagnosticPanel() {
  return (
    <aside aria-labelledby="diagnostic-title" className="on-dark rounded-lg bg-brand-800 p-ds-lg text-white lg:p-ds-xl">
      <p className="eyebrow text-brand-100">Premier diagnostic RH</p>
      <h2 id="diagnostic-title" className="font-display text-display-md font-semibold text-white">
        Ce que nous examinons avec vous
      </h2>
      <ul className="mt-ds-md border-t border-white/20">
        {points.map((p) => (
          <li key={p} className="flex gap-3 border-b border-white/20 py-3">
            <Check className="mt-1 h-5 w-5 shrink-0 text-brand-200" strokeWidth={2} aria-hidden="true" />
            <span>{p}</span>
          </li>
        ))}
      </ul>
      <p className="mt-ds-md text-sm text-brand-100">
        Proposé sans engagement, selon les modalités de prise en charge du cabinet.
      </p>
      <Link
        to="/services/audit-conformite"
        className="mt-ds-md inline-flex items-center gap-1.5 font-semibold text-white underline decoration-white/40 decoration-2 underline-offset-4 hover:decoration-white"
      >
        Le service Audit et conformité <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </aside>
  );
}
