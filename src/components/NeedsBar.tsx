import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { needs } from '../data/services';

/** Portes d'entrée « par besoin », juste sous le hero : de simples liens vers les pages de service. */
export default function NeedsBar() {
  return (
    <section className="bg-mist" aria-labelledby="besoins-title">
      <div className="container-site grid gap-ds-md py-ds-lg lg:grid-cols-[auto_1fr] lg:items-center lg:gap-ds-xl">
        <h2 id="besoins-title" className="font-display text-display-sm font-semibold text-ink">Vous souhaitez…</h2>
        <ul className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-3">
          {needs.map((n) => (
            <li key={n.slug} className="bg-white">
              <Link
                to={`/services/${n.slug}`}
                className="group flex h-full items-start justify-between gap-4 p-ds-md transition-colors duration-200 hover:bg-brand-50"
              >
                <span>
                  <span className="block font-semibold text-brand-600 group-hover:text-brand-700">{n.label}</span>
                  <span className="mt-1 block text-sm text-ink-700">{n.text}</span>
                </span>
                <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-brand-600 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
