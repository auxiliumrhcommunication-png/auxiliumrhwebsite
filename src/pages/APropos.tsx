import { CheckCircle2 } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import CTASection from '../components/CTASection';
import Reveal from '../components/Reveal';
import SlotImage from '../components/SlotImage';
import { commitments } from '../data/company';
import { usePageTitle } from '../hooks/usePageTitle';

export default function APropos() {
  usePageTitle('À propos');
  return (
    <>
      <PageHeader
        crumb="À propos"
        eyebrow="À propos"
        title="L'humain au centre des organisations"
        lead="Basé à Libreville, au Gabon, Auxilium RH est un cabinet spécialisé dans le conseil, l'accompagnement et l'optimisation des pratiques en ressources humaines."
      />

      <section className="py-ds-2xl lg:py-ds-3xl">
        <div className="container-site grid items-start gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
          <Reveal className="space-y-4 text-lg text-ink-muted">
            <h2 className="section-title mb-6">Qui sommes-nous ?</h2>
            <p>
              Auxilium RH accompagne les entreprises, les institutions, les organisations et les entrepreneurs dans la structuration
              de leur fonction RH, la gestion de leur personnel et l'amélioration de leur performance organisationnelle.
            </p>
            <p>
              Dans un environnement professionnel où la gestion du capital humain, la conformité réglementaire et la performance des
              équipes sont essentielles, nous apportons des solutions adaptées aux réalités et aux besoins de chaque structure.
            </p>
            <p>
              Notre ambition est de permettre à chaque organisation de disposer d'une fonction RH mieux organisée, plus efficace et
              conforme aux exigences applicables, tout en plaçant l'humain au centre de ses priorités.
            </p>
          </Reveal>
          <Reveal delay={0.12}>
            <SlotImage slot="equipe" priority alt="Illustration : trois consultants d'Auxilium RH réunis sous l'arc du logo" className="mb-ds-md rounded-3xl" />
            <figure className="rounded-2xl bg-night-950 p-8 text-white">
              <blockquote className="text-2xl font-bold leading-snug">
                « La performance durable d'une entreprise passe par une gestion efficace, responsable et structurée de ses ressources humaines. »
              </blockquote>
              <figcaption className="mt-6 text-sm font-bold uppercase tracking-wider text-accent-400">Notre conviction</figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-ds-2xl lg:py-ds-3xl">
        <div className="container-site grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <p className="eyebrow">Notre vision</p>
            <h2 className="section-title mb-6">Faire des RH un levier de performance</h2>
            <div className="space-y-4 text-lg text-ink-muted">
              <p>
                Nous croyons qu'une entreprise performante repose autant sur la qualité de son organisation que sur la manière dont
                elle recrute, accompagne et gère ses collaborateurs.
              </p>
              <p>
                Notre mission est d'aider les organisations à faire des ressources humaines un véritable levier de performance, de
                conformité et de développement durable.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="eyebrow">Nos engagements</p>
            <ul className="space-y-3">
              {commitments.map((c) => (
                <li key={c} className="flex gap-3 rounded-xl border border-slate-200 bg-surface p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" aria-hidden="true" />
                  <span className="font-semibold text-ink">{c}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <CTASection title="Travaillons ensemble" text="Un premier diagnostic RH peut être proposé gratuitement, sans engagement." />
    </>
  );
}
