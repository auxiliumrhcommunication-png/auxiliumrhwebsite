import { MapPin } from 'lucide-react';
import ContactActions from './ContactActions';
import BrandPanel from './BrandPanel';
import SlotImage, { hasPhoto } from './SlotImage';
import { heroLayout } from '../design';

// Preuves factuelles, issues de la présentation du cabinet (aucun chiffre inventé)
const proofs = [
  'Cabinet basé à Libreville',
  '6 domaines d\'expertise RH',
  'De la TPE au grand groupe',
  'Premier diagnostic sans engagement*',
];

/**
 * Ouverture de l'accueil (direction « Éditorial institutionnel ») : promesse,
 * appels à l'action principal et secondaire, preuves factuelles, visuel.
 * Le visuel est la photo « equipe » si elle existe, sinon le panneau de marque.
 */
export default function Hero() {
  const centered = heroLayout === 'centered';

  return (
    <section className="border-b border-line bg-white" aria-labelledby="hero-title">
      <div
        className={`container-site grid gap-ds-xl py-ds-xl lg:py-ds-2xl ${
          centered ? 'text-center' : 'lg:grid-cols-[1.25fr_1fr] lg:items-center lg:gap-ds-2xl'
        }`}
      >
        <div className={centered ? 'mx-auto max-w-3xl' : ''}>
          <p className={`eyebrow inline-flex items-center gap-2 ${centered ? 'justify-center' : ''}`}>
            <MapPin className="h-4 w-4" aria-hidden="true" />
            Cabinet de conseil en ressources humaines · Gabon
          </p>
          <h1 id="hero-title" className="title-xl">
            Le partenaire stratégique de votre capital humain.
          </h1>
          <p className={`mt-ds-md max-w-prose text-lead text-ink-700 ${centered ? 'mx-auto' : ''}`}>
            Recrutement, audit et conformité, paie et administration du personnel, stratégie RH : Auxilium RH aide les employeurs
            à structurer leur fonction RH et à sécuriser leurs obligations sociales.
          </p>
          <ContactActions className={`mt-ds-lg ${centered ? 'sm:justify-center' : ''}`} />

          <ul className={`mt-ds-xl grid grid-cols-2 gap-x-6 gap-y-3 border-t border-line pt-ds-md text-sm font-semibold text-ink-700 ${centered ? 'text-left' : ''}`}>
            {proofs.map((p) => <li key={p} className="border-l-2 border-brand-600 pl-3">{p}</li>)}
          </ul>
          <p className="mt-3 text-sm text-ink-600">* Selon les modalités de prise en charge du cabinet.</p>
        </div>

        <div className={centered ? 'mx-auto w-full max-w-xl' : ''}>
          {hasPhoto('equipe') ? (
            <SlotImage slot="equipe" priority alt="L'équipe Auxilium RH" className="rounded-lg" />
          ) : (
            <BrandPanel />
          )}
        </div>
      </div>
    </section>
  );
}
