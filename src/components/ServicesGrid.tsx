import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { services } from '../data/services';
import { layout } from '../design';
import Reveal, { RevealGroup } from './Reveal';

/**
 * Grille des 6 expertises (chaque carte renvoie à son détail).
 * --variance : 1-3 grille régulière ; 4-7 première carte mise en avant ;
 * 8-10 grille « bento » aux tailles variées.
 */
// 4 colonnes : 2×2 + 1 + 1 + 2 + 2 + 2 = 12 cases, sans trou
const bentoSpans = ['lg:col-span-2 lg:row-span-2', '', '', 'lg:col-span-2', 'lg:col-span-2', 'lg:col-span-2'];

export default function ServicesGrid() {
  return (
    <section className="py-ds-2xl lg:py-ds-3xl" aria-labelledby="expertises-title">
      <div className="container-site">
        <Reveal className={`mb-ds-xl flex flex-col justify-between gap-6 lg:flex-row lg:items-end ${layout === 'centered' ? 'items-center text-center lg:flex-col lg:items-center' : ''}`}>
          <div className="max-w-2xl">
            <p className="eyebrow">Nos expertises</p>
            <h2 id="expertises-title" className="section-title">De l'organisation administrative à la stratégie RH</h2>
          </div>
          <Link to="/services" className="btn-outline self-start lg:self-auto">Tous nos services</Link>
        </Reveal>

        <RevealGroup as="ul" className={`grid gap-ds-md sm:grid-cols-2 lg:grid-cols-3 ${layout === 'bold' ? 'lg:grid-cols-4 lg:grid-flow-dense' : ''}`}>
          {services.map((s, i) => {
            const Icon = s.icon;
            // Carte mise en avant : la première en mode équilibré, plusieurs en mode audacieux
            const featured = (layout === 'split' && i === 0) || (layout === 'bold' && (i === 0 || i === 3));
            const span = layout === 'bold' ? bentoSpans[i] : layout === 'split' && i === 0 ? 'lg:col-span-2 lg:row-span-2' : '';
            return (
              <li key={s.id} className={span}>
                <Link
                  to={`/services#${s.id}`}
                  className={`group flex h-full flex-col rounded-2xl border p-ds-md transition duration-200 hover:-translate-y-1 hover:shadow-lift ${
                    featured
                      ? 'border-transparent bg-night-950 text-white hover:bg-night-900'
                      : 'border-slate-200 bg-white shadow-card hover:border-brand-200'
                  }`}
                >
                  <div className="mb-5 flex items-start justify-between">
                    <span
                      className={`inline-flex h-12 w-12 items-center justify-center rounded-xl transition-colors duration-200 ${
                        featured ? 'bg-accent-500 text-night-950' : 'bg-brand-50 text-brand-600 group-hover:bg-brand-600 group-hover:text-white'
                      }`}
                    >
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <ArrowUpRight
                      className={`h-5 w-5 transition duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 ${
                        featured ? 'text-slate-400 group-hover:text-accent-400' : 'text-slate-400 group-hover:text-brand-600'
                      }`}
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className={`mb-2 font-bold ${featured ? 'text-2xl text-white' : 'text-lg text-ink'}`}>{s.title}</h3>
                  <p className={featured ? 'text-slate-300' : 'text-ink-muted'}>{featured ? s.intro : s.short}</p>
                  {featured && i === 0 && (
                    <img src="/illustrations/recrutement.svg" alt="" width={600} height={480} loading="lazy" className="mx-auto mt-6 hidden w-full max-w-sm lg:block" />
                  )}
                  {featured && (
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {s.items.slice(0, 3).map((item) => (
                        <li key={item} className="rounded-full border border-white/15 px-3 py-1 text-sm text-slate-200">
                          {item.replace(/\.$/, '')}
                        </li>
                      ))}
                    </ul>
                  )}
                </Link>
              </li>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
