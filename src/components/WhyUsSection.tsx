import { reasons } from '../data/company';
import { layout } from '../design';
import Reveal, { RevealGroup } from './Reveal';
import SlotImage from './SlotImage';

/** « Pourquoi choisir Auxilium RH ? » : image de l'équipe et les 6 atouts du cabinet. */
export default function WhyUsSection() {
  return (
    <section className="py-ds-2xl lg:py-ds-3xl" aria-labelledby="pourquoi-title">
      <div className={`container-site grid gap-ds-xl ${layout === 'centered' ? '' : 'lg:grid-cols-[1fr_1.3fr] lg:gap-ds-2xl'}`}>
        <Reveal className={layout === 'centered' ? 'mx-auto max-w-2xl text-center' : ''}>
          <p className="eyebrow">Pourquoi Auxilium RH ?</p>
          <h2 id="pourquoi-title" className="section-title">L'humain au centre des organisations</h2>
          <p className="mb-ds-lg mt-4 text-lg text-ink-muted">
            La performance durable d'une entreprise passe par une gestion efficace, responsable et structurée de ses
            ressources humaines.
          </p>
          <SlotImage slot="equipe" alt="Illustration : trois consultants d'Auxilium RH réunis devant un tableau de suivi" className="rounded-3xl" />
        </Reveal>
        <RevealGroup as="ul" className="grid content-center gap-ds-lg sm:grid-cols-2">
          {reasons.map((r) => {
            const Icon = r.icon;
            return (
              <li key={r.title} className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-ds-md shadow-card">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent-50 text-accent-700">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="mb-1 font-bold text-ink">{r.title}</h3>
                  <p className="text-ink-muted">{r.text}</p>
                </div>
              </li>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
