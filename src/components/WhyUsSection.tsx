import { reasons } from '../data/company';
import Reveal from './Reveal';

/** « Pourquoi choisir Auxilium RH ? » : les 6 atouts du cabinet. */
export default function WhyUsSection() {
  return (
    <section className="py-20 sm:py-24" aria-labelledby="pourquoi-title">
      <div className="container-site grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
        <Reveal>
          <p className="eyebrow">Pourquoi Auxilium RH ?</p>
          <h2 id="pourquoi-title" className="section-title">L'humain au centre des organisations</h2>
          <p className="mt-4 text-lg text-ink-muted">
            La performance durable d'une entreprise passe par une gestion efficace, responsable et structurée de ses
            ressources humaines.
          </p>
        </Reveal>
        <ul className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
          {reasons.map((r, i) => {
            const Icon = r.icon;
            return (
              <Reveal as="li" key={r.title} delay={(i % 2) * 80} className="flex gap-4">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-50 text-accent-700">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="mb-1 font-bold text-ink">{r.title}</h3>
                  <p className="text-ink-muted">{r.text}</p>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
