import PageHeader from '../components/PageHeader';
import CTASection from '../components/CTASection';
import { RevealGroup } from '../components/Reveal';
import { sectors } from '../data/company';
import { usePageTitle } from '../hooks/usePageTitle';

export default function Secteurs() {
  usePageTitle("Secteurs d'intervention");
  return (
    <>
      <PageHeader
        crumb="Secteurs"
        eyebrow="À qui s'adressent nos services ?"
        title="Des organisations de toutes tailles"
        lead="Auxilium RH s'adresse aux organisations de toutes tailles, avec une approche adaptée à leur niveau de structuration, à leur secteur d'activité et à leurs enjeux opérationnels."
      />
      <section className="py-ds-2xl lg:py-ds-3xl">
        <RevealGroup as="ul" className="container-site grid gap-ds-md md:grid-cols-2">
          {sectors.map((s) => {
            const Icon = s.icon;
            return (
              <li key={s.title}>
                <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card">
                  <img src={s.image} alt="" width={400} height={260} loading="lazy" decoding="async" className="h-auto w-full" />
                  <div className="p-ds-md">
                    <div className="mb-3 flex items-center gap-3">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <h2 className="text-xl font-extrabold text-ink">{s.title}</h2>
                    </div>
                    <p className="text-ink-muted">{s.text}</p>
                  </div>
                </article>
              </li>
            );
          })}
        </RevealGroup>
      </section>
      <CTASection title="Votre organisation a des besoins spécifiques ?" text="Chaque structure a ses propres contraintes : parlons des vôtres." />
    </>
  );
}
