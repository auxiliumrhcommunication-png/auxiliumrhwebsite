import { Quote } from 'lucide-react';
import { testimonials } from '../data/proof';
import Reveal, { RevealGroup } from './Reveal';

/**
 * Témoignages clients (preuve sociale).
 * Rien n'est affiché tant que src/data/proof.ts ne contient pas de vrais
 * témoignages, recueillis avec l'accord des personnes citées.
 */
export default function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <section className="py-ds-2xl lg:py-ds-3xl" aria-labelledby="temoignages-title">
      <div className="container-site">
        <Reveal className="mb-ds-xl max-w-2xl">
          <p className="eyebrow">Ils nous font confiance</p>
          <h2 id="temoignages-title" className="section-title">Ce que disent nos clients</h2>
        </Reveal>
        <RevealGroup as="ul" className="grid gap-ds-md md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <li key={t.name}>
              <figure className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
                <Quote className="mb-4 h-8 w-8 text-brand-200" aria-hidden="true" />
                <blockquote className="flex-1 text-ink">« {t.quote} »</blockquote>
                <figcaption className="mt-6 border-t border-slate-100 pt-4">
                  <p className="font-bold text-ink">{t.name}</p>
                  <p className="text-sm text-ink-muted">{t.role}, {t.company}</p>
                </figcaption>
              </figure>
            </li>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
