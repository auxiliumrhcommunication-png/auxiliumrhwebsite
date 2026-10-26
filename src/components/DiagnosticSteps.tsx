import { steps } from '../data/company';

type DiagnosticStepsProps = { title?: string; lead?: string };

/** « Comment se déroule un diagnostic » : les 4 étapes de la méthode, en colonnes séparées par des filets. */
export default function DiagnosticSteps({
  title = 'Comment se déroule notre accompagnement',
  lead = 'Chaque organisation possède ses propres contraintes. Notre accompagnement s\'inscrit dans une logique de proximité, d\'analyse et de résultats concrets.',
}: DiagnosticStepsProps) {
  return (
    <section className="section" aria-labelledby="etapes-title">
      <div className="container-site">
        <div className="mb-ds-xl max-w-3xl">
          <p className="eyebrow">Notre approche</p>
          <h2 id="etapes-title" className="title-md">{title}</h2>
          <p className="mt-4 max-w-prose text-lead text-ink-700">{lead}</p>
        </div>
        <ol className="grid gap-ds-lg md:grid-cols-2 lg:grid-cols-4 lg:gap-ds-md">
          {steps.map((s, i) => (
            <li key={s.title} className="border-t-2 border-brand-600 pt-ds-md">
              <span className="font-display text-display-md font-semibold text-brand-600" aria-hidden="true">{i + 1}</span>
              <h3 className="mt-2 text-xl font-semibold text-ink">
                <span className="sr-only">Étape {i + 1} : </span>{s.title}
              </h3>
              <p className="mt-2 text-ink-700">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
