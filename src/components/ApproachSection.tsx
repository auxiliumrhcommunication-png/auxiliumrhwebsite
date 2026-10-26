import { steps } from '../data/company';
import { layout } from '../design';
import Reveal, { RevealGroup } from './Reveal';

/** Les 4 étapes de la méthode Auxilium RH. */
export default function ApproachSection() {
  return (
    <section className="bg-white py-ds-2xl lg:py-ds-3xl" aria-labelledby="approche-title">
      <div className="container-site">
        <Reveal className={`mb-ds-xl max-w-2xl ${layout === 'centered' ? 'mx-auto text-center' : ''}`}>
          <p className="eyebrow">Notre approche</p>
          <h2 id="approche-title" className="section-title">Des solutions adaptées à votre réalité</h2>
          <p className="mt-4 text-lg text-ink-muted">
            Chaque organisation possède ses propres contraintes. Notre accompagnement s'inscrit dans une logique de proximité,
            d'analyse et de résultats concrets.
          </p>
        </Reveal>
        <RevealGroup as="ol" className="relative grid gap-ds-md md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.title} className="relative rounded-2xl bg-surface p-ds-md">
              <span className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand-600 text-lg font-extrabold text-white">
                {i + 1}
              </span>
              <h3 className="mb-2 text-lg font-bold text-ink">{s.title}</h3>
              <p className="text-ink-muted">{s.text}</p>
            </li>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
