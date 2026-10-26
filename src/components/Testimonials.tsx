import { testimonials } from '../data/proof';

/**
 * Témoignages clients (preuve sociale).
 * Rien n'est affiché tant que src/data/proof.ts ne contient pas de vrais
 * témoignages, recueillis avec l'accord des personnes citées.
 */
export default function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <section className="section border-t border-line" aria-labelledby="temoignages-title">
      <div className="container-site">
        <p className="eyebrow">Ils nous font confiance</p>
        <h2 id="temoignages-title" className="title-md mb-ds-xl">Ce que disent nos clients</h2>
        <ul className="grid gap-ds-lg md:grid-cols-2">
          {testimonials.map((t) => (
            <li key={t.name} className="border-l-2 border-brand-600 pl-ds-md">
              <figure>
                <blockquote className="font-display text-display-sm text-ink">« {t.quote} »</blockquote>
                <figcaption className="mt-4 text-ink-700">
                  <span className="font-semibold text-ink">{t.name}</span>, {t.role}, {t.company}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
