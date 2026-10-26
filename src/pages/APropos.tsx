import PageHeader from '../components/PageHeader';
import CTASection from '../components/CTASection';
import SlotImage from '../components/SlotImage';
import { commitments } from '../data/company';
import { useSeo } from '../hooks/useSeo';

export default function APropos() {
  useSeo({
    title: 'À propos',
    description:
      'Auxilium RH, cabinet de conseil en ressources humaines basé à Libreville : notre conviction, notre vision et nos engagements envers les employeurs gabonais.',
  });
  return (
    <>
      <PageHeader
        crumbs={[{ label: 'À propos' }]}
        eyebrow="À propos"
        title="L'humain au centre des organisations"
        lead="Basé à Libreville, au Gabon, Auxilium RH est un cabinet spécialisé dans le conseil, l'accompagnement et l'optimisation des pratiques en ressources humaines."
      />

      <section className="section" aria-labelledby="qui-title">
        <div className="container-site grid gap-ds-xl lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-ds-2xl">
          <div className="max-w-prose space-y-5 text-ink-700">
            <h2 id="qui-title" className="title-md text-ink">Qui sommes-nous ?</h2>
            <p className="text-lead">
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
          </div>
          <SlotImage slot="equipe" alt="L'équipe Auxilium RH" className="rounded-lg bg-brand-50" />
        </div>
      </section>

      <section className="bg-brand-800 on-dark" aria-label="Notre conviction">
        <figure className="container-site py-ds-2xl">
          <blockquote className="max-w-4xl font-display text-display-lg font-semibold text-white">
            « La performance durable d'une entreprise passe par une gestion efficace, responsable et structurée de ses ressources
            humaines. »
          </blockquote>
          <figcaption className="mt-ds-md text-sm font-semibold uppercase tracking-[0.08em] text-brand-100">Notre conviction</figcaption>
        </figure>
      </section>

      <section className="section" aria-labelledby="vision-title">
        <div className="container-site grid gap-ds-xl lg:grid-cols-2 lg:gap-ds-2xl">
          <div className="max-w-prose">
            <p className="eyebrow">Notre vision</p>
            <h2 id="vision-title" className="title-md">Faire des RH un levier de performance</h2>
            <div className="mt-ds-md space-y-4 text-ink-700">
              <p>
                Nous croyons qu'une entreprise performante repose autant sur la qualité de son organisation que sur la manière dont
                elle recrute, accompagne et gère ses collaborateurs.
              </p>
              <p>
                Notre mission est d'aider les organisations à faire des ressources humaines un véritable levier de performance, de
                conformité et de développement durable.
              </p>
            </div>
          </div>
          <div>
            <p className="eyebrow">Nos engagements</p>
            <ol className="border-t border-line">
              {commitments.map((c, i) => (
                <li key={c} className="flex gap-ds-md border-b border-line py-ds-md">
                  <span className="font-display text-display-sm font-semibold text-brand-600" aria-hidden="true">{i + 1}</span>
                  <span className="font-semibold text-ink">{c}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <CTASection title="Travaillons ensemble" />
    </>
  );
}
