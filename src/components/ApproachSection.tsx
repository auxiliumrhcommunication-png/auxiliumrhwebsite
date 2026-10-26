import { steps } from '../data/company';
import Reveal from './Reveal';

/** Les 4 étapes de la méthode Auxilium RH. */
export default function ApproachSection() {
  return (
    <section className="bg-white py-20 sm:py-24" aria-labelledby="approche-title">
      <div className="container-site">
        <Reveal className="mb-12 max-w-2xl">
          <p className="eyebrow">Notre approche</p>
          <h2 id="approche-title" className="section-title">Des solutions adaptées à votre réalité</h2>
          <p className="mt-4 text-lg text-ink-muted">
            Chaque organisation possède ses propres contraintes. Notre accompagnement s'inscrit dans une logique de proximité,
            d'analyse et de résultats concrets.
          </p>
        </Reveal>
        <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 80} className="relative rounded-2xl bg-surface p-6">
              <span className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand-600 text-lg font-extrabold text-white">
                {i + 1}
              </span>
              <h3 className="mb-2 text-lg font-bold text-ink">{s.title}</h3>
              <p className="text-ink-muted">{s.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
