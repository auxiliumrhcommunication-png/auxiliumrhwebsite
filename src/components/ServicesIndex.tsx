import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { services } from '../data/services';

type ServicesIndexProps = {
  /** Résumé court (accueil) ou introduction complète (page Services) */
  detail?: 'short' | 'intro';
  headingLevel?: 'h2' | 'h3';
};

/** Index numéroté 01 à 06 des services, en lignes séparées par des filets. */
export default function ServicesIndex({ detail = 'short', headingLevel: H = 'h3' }: ServicesIndexProps) {
  return (
    <ol className="border-t border-line">
      {services.map((s, i) => {
        const Icon = s.icon;
        return (
          <li key={s.slug} className="border-b border-line">
            <Link
              to={`/services/${s.slug}`}
              className="group grid grid-cols-[auto_1fr_auto] items-start gap-x-ds-md gap-y-2 py-ds-md transition-colors duration-200 hover:bg-brand-50/60 sm:px-2 lg:grid-cols-[4rem_minmax(0,1.1fr)_minmax(0,1.4fr)_auto] lg:items-center"
            >
              <span className="font-display text-display-sm font-semibold text-brand-600" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <H className="flex items-center gap-3 font-display text-display-sm font-semibold text-ink group-hover:text-brand-700">
                <Icon className="hidden h-6 w-6 shrink-0 text-brand-600 sm:block" strokeWidth={1.75} aria-hidden="true" />
                {s.title}
              </H>
              <p className="col-span-3 col-start-1 text-ink-700 sm:col-span-2 sm:col-start-2 lg:col-span-1 lg:col-start-3">
                {detail === 'intro' ? s.intro : s.short}
              </p>
              <ArrowRight
                className="col-start-3 row-start-1 mt-1 h-6 w-6 text-brand-600 transition-transform duration-200 group-hover:translate-x-1 lg:col-start-4 lg:mt-0"
                aria-hidden="true"
              />
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
