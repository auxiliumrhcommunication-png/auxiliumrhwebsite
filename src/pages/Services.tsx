import { Check } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import CTASection from '../components/CTASection';
import Reveal from '../components/Reveal';
import { services } from '../data/services';
import { usePageTitle } from '../hooks/usePageTitle';

export default function Services() {
  usePageTitle('Nos services');
  return (
    <>
      <PageHeader
        crumb="Services"
        eyebrow="Nos domaines d'expertise"
        title="Des services RH complets, de l'administratif au stratégique"
        lead="Auxilium RH intervient sur l'ensemble des problématiques liées à la gestion des ressources humaines, de l'organisation administrative à l'accompagnement stratégique des dirigeants."
      >
        <nav aria-label="Accès rapide aux services" className="mt-8 flex flex-wrap gap-2">
          {services.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="inline-flex min-h-[44px] items-center rounded-full border border-white/20 bg-white/5 px-4 text-sm font-semibold text-slate-100 transition-colors duration-200 hover:border-accent-400 hover:text-white"
            >
              {s.navLabel}
            </a>
          ))}
        </nav>
      </PageHeader>

      <section className="py-16 sm:py-20">
        <div className="container-site space-y-6">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal key={s.id}>
                <article
                  id={s.id}
                  className="grid scroll-mt-24 gap-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-card transition-shadow duration-200 target:border-brand-400 target:shadow-lift sm:p-8 lg:grid-cols-[1fr_1.25fr] lg:gap-12 lg:p-10"
                >
                  <div>
                    <div className="mb-5 flex items-center gap-4">
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-600 text-white">
                        <Icon className="h-6 w-6" aria-hidden="true" />
                      </span>
                      <span className="text-sm font-extrabold tracking-widest text-ink-subtle">{String(i + 1).padStart(2, '0')}</span>
                    </div>
                    <h2 className="mb-3 text-2xl font-extrabold tracking-tight text-ink sm:text-[1.75rem]">{s.title}</h2>
                    <p className="text-ink-muted">{s.intro}</p>
                  </div>
                  <ul className="space-y-3">
                    {s.items.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600">
                          <Check className="h-4 w-4" strokeWidth={3} aria-hidden="true" />
                        </span>
                        <span className="text-ink">{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      <CTASection title="Un besoin précis ou une question ?" text="Parlons de votre organisation : un premier diagnostic RH peut être proposé gratuitement, sans engagement." />
    </>
  );
}
