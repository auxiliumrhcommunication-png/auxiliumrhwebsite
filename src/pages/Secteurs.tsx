import PageHeader from '../components/PageHeader';
import CTASection from '../components/CTASection';
import Reveal from '../components/Reveal';
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
      <section className="py-16 sm:py-20">
        <ul className="container-site grid gap-5 md:grid-cols-2">
          {sectors.map((s, i) => {
            const Icon = s.icon;
            return (
              <Reveal as="li" key={s.title} delay={(i % 2) * 80}>
                <article className="h-full rounded-2xl border border-slate-200 bg-white p-7 shadow-card sm:p-8">
                  <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h2 className="mb-3 text-xl font-extrabold text-ink">{s.title}</h2>
                  <p className="text-ink-muted">{s.text}</p>
                </article>
              </Reveal>
            );
          })}
        </ul>
      </section>
      <CTASection title="Votre organisation a des besoins spécifiques ?" text="Chaque structure a ses propres contraintes : parlons des vôtres." />
    </>
  );
}
