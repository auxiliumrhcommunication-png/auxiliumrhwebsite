import ContactActions from './ContactActions';
import DiagnosticPanel from './DiagnosticPanel';
import SlotImage, { hasPhoto } from './SlotImage';
import { heroLayout } from '../design';

// Preuves factuelles, issues de la présentation du cabinet (aucun chiffre inventé)
const proofs = [
  'Cabinet basé à Libreville',
  '6 domaines d\'expertise RH',
  'De la TPE au grand groupe',
];

/**
 * Ouverture de l'accueil (direction « Éditorial institutionnel ») : promesse,
 * appels à l'action principal et secondaire, preuves factuelles, visuel.
 * Le visuel est l'image « accueil » si elle existe, sinon le contenu du premier diagnostic.
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
          <p className="eyebrow">
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

          <ul className={`mt-ds-xl flex flex-col gap-2 border-t border-line pt-ds-md font-semibold text-ink sm:flex-row sm:flex-wrap sm:gap-x-ds-md ${centered ? 'sm:justify-center' : ''}`}>
            {proofs.map((p) => <li key={p}>{p}</li>)}
          </ul>
        </div>

        <div className={centered ? 'mx-auto w-full max-w-xl' : ''}>
          {hasPhoto('accueil') ? (
            <SlotImage
              slot="accueil"
              priority
              alt="Illustration : conseillère RH au téléphone, un dossier Auxilium RH à la main"
              className="rounded-lg bg-brand-50"
              sizes="(min-width: 1024px) 480px, 100vw"
            />
          ) : (
            <DiagnosticPanel />
          )}
        </div>
      </div>
    </section>
  );
}
