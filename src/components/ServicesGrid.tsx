import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { services } from '../data/services';
import Reveal from './Reveal';

/** Grille des 6 expertises : chaque carte renvoie au détail sur la page Services. */
export default function ServicesGrid() {
  return (
    <section className="py-20 sm:py-24" aria-labelledby="expertises-title">
      <div className="container-site">
        <Reveal className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="eyebrow">Nos expertises</p>
            <h2 id="expertises-title" className="section-title">De l'organisation administrative à la stratégie RH</h2>
          </div>
          <Link to="/services" className="btn-outline self-start lg:self-auto">Tous nos services</Link>
        </Reveal>

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal as="li" key={s.id} delay={(i % 3) * 80}>
                <Link
                  to={`/services#${s.id}`}
                  className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-card transition duration-200 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lift"
                >
                  <div className="mb-5 flex items-start justify-between">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors duration-200 group-hover:bg-brand-600 group-hover:text-white">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </span>
                    <ArrowUpRight
                      className="h-5 w-5 text-slate-400 transition duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-600"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-ink">{s.title}</h3>
                  <p className="text-ink-muted">{s.short}</p>
                </Link>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
