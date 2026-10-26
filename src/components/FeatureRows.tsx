import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { services } from '../data/services';
import { layout } from '../design';
import Reveal from './Reveal';
import SlotImage, { type ImageSlot } from './SlotImage';

// Trois expertises mises en avant avec une image, en rangées alternées
// (à la manière des blocs « produit » de Semrush).
const rows: { slot: ImageSlot; serviceId: string; tag: string; title: string; alt: string }[] = [
  {
    slot: 'recrutement',
    serviceId: 'recrutement',
    tag: 'Recrutement',
    title: 'Trouvez les talents qui feront avancer votre entreprise',
    alt: 'Illustration : sélection de candidats, un profil retenu',
  },
  {
    slot: 'conformite',
    serviceId: 'audit',
    tag: 'Audit et conformité',
    title: 'Sécurisez vos pratiques RH avant qu\'elles ne deviennent un risque',
    alt: 'Illustration : liste de contrôle des documents RH et bouclier de conformité',
  },
  {
    slot: 'paie',
    serviceId: 'paie',
    tag: 'Paie et administration',
    title: 'Une paie fiable et des obligations sociales tenues à jour',
    alt: 'Illustration : bulletin de paie, graphique de suivi et calendrier des échéances',
  },
];

export default function FeatureRows() {
  return (
    <section className="bg-white py-ds-2xl lg:py-ds-3xl" aria-labelledby="atouts-metier-title">
      <div className="container-site">
        <Reveal className={`mb-ds-2xl max-w-2xl ${layout === 'centered' ? 'mx-auto text-center' : ''}`}>
          <p className="eyebrow">Comment nous vous aidons</p>
          <h2 id="atouts-metier-title" className="section-title">Des résultats concrets sur vos enjeux RH du quotidien</h2>
        </Reveal>

        <div className="space-y-ds-2xl lg:space-y-ds-3xl">
          {rows.map((row, i) => {
            const service = services.find((s) => s.id === row.serviceId)!;
            const flip = layout !== 'centered' && i % 2 === 1;
            return (
              <div
                key={row.slot}
                className={`grid items-center gap-ds-xl ${layout === 'centered' ? 'mx-auto max-w-3xl' : 'lg:grid-cols-2 lg:gap-ds-2xl'}`}
              >
                <Reveal className={`relative ${flip ? 'lg:order-2' : ''}`}>
                  {layout === 'bold' && (
                    <div aria-hidden="true" className={`absolute -z-0 h-2/3 w-2/3 rounded-3xl bg-accent-100 ${flip ? '-left-6 -top-6' : '-bottom-6 -right-6'}`} />
                  )}
                  <div className="relative">
                    <SlotImage slot={row.slot} alt={row.alt} />
                  </div>
                </Reveal>

                <Reveal delay={0.1} className={layout === 'centered' ? 'text-center' : ''}>
                  <span className="mb-4 inline-flex rounded-full bg-brand-50 px-3 py-1 text-sm font-bold text-brand-700">{row.tag}</span>
                  <h3 className="mb-4 text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">{row.title}</h3>
                  <p className="mb-6 text-lg text-ink-muted">{service.intro}</p>
                  <ul className={`mb-8 space-y-3 ${layout === 'centered' ? 'mx-auto inline-block text-left' : ''}`}>
                    {service.items.slice(0, 4).map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white">
                          <Check className="h-3.5 w-3.5" strokeWidth={3} aria-hidden="true" />
                        </span>
                        <span className="text-ink">{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div>
                    <Link to={`/services#${service.id}`} className="btn-outline">
                      En savoir plus
                      <ArrowRight className="h-5 w-5" aria-hidden="true" />
                    </Link>
                  </div>
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
