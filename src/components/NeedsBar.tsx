import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { needs } from '../data/services';

/** Portes d'entrée « par besoin », juste sous le hero : de simples liens vers les pages de service. */
export default function NeedsBar() {
  return (
    <section className="bg-mist" aria-labelledby="besoins-title">
      <div className="container-site grid gap-ds-md py-ds-lg lg:grid-cols-[auto_1fr] lg:items-center lg:gap-ds-xl">
        <h2 id="besoins-title" className="font-display text-display-sm font-semibold text-ink">Vous souhaitez…</h2>
        <ul className="grid sm:grid-cols-3 sm:gap-x-ds-lg">
          {needs.map((n) => (
            <li key={n.slug}>
              <Link
                to={`/services/${n.slug}`}
                className="group flex h-full items-start justify-between gap-4 border-t-2 border-line py-ds-sm transition-colors duration-200 hover:border-brand-600"
              >
                <span>
                  <span className="block font-semibold text-brand-600 group-hover:text-brand-700 group-hover:underline group-hover:underline-offset-4">{n.label}</span>
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
