import PageHeader from '../components/PageHeader';
import CTASection from '../components/CTASection';
import { sectors } from '../data/company';
import { useSeo } from '../hooks/useSeo';

export default function Secteurs() {
  useSeo({
    title: "Secteurs d'intervention",
    description:
      'TPE et PME, grandes entreprises et groupes, industries et entreprises de services, entrepreneurs : Auxilium RH adapte son accompagnement RH à chaque organisation au Gabon.',
  });
  return (
    <>
      <PageHeader
        crumbs={[{ label: 'Secteurs' }]}
        eyebrow="À qui s'adressent nos services"
        title="Des organisations de toutes tailles"
        lead="Auxilium RH s'adresse aux organisations de toutes tailles, avec une approche adaptée à leur niveau de structuration, à leur secteur d'activité et à leurs enjeux opérationnels."
      />
      <section className="section" aria-label="Secteurs">
        <ul className="container-site border-t border-line">
          {sectors.map((s, i) => {
            const Icon = s.icon;
            return (
              <li key={s.title} className="grid gap-ds-md border-b border-line py-ds-lg md:grid-cols-[minmax(0,1fr)_260px] md:items-center md:gap-ds-xl">
                <div className="flex gap-ds-md">
                  <span className="font-display text-display-sm font-semibold text-brand-600" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h2 className="flex items-center gap-3 font-display text-display-sm font-semibold text-ink">
                      <Icon className="h-6 w-6 text-brand-600" strokeWidth={1.75} aria-hidden="true" />
                      {s.title}
                    </h2>
                    <p className="mt-2 max-w-prose text-ink-700">{s.text}</p>
                  </div>
                </div>
                <img src={s.image} alt="" width={400} height={260} loading="lazy" decoding="async" className="hidden w-full rounded-lg md:block" />
              </li>
            );
          })}
        </ul>
      </section>
      <CTASection title="Votre organisation a des besoins spécifiques ?" text="Chaque structure a ses propres contraintes : parlons des vôtres." />
    </>
  );
}
