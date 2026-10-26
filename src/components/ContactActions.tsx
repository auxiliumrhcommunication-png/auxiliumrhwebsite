import { Link } from 'react-router-dom';
import { Phone, MessageCircle } from 'lucide-react';
import { contact, primaryCta, secondaryCta, whatsappHref } from '../data/site';

type ContactActionsProps = {
  /** Sur fond bleu (bandeau, pied de page) */
  onDark?: boolean;
  className?: string;
};

/**
 * Paire d'appels à l'action utilisée partout :
 * principal « Demander un diagnostic RH », secondaire « Parler à un expert RH »
 * (WhatsApp si le numéro est renseigné, sinon téléphone).
 */
export default function ContactActions({ onDark = false, className = '' }: ContactActionsProps) {
  const wa = whatsappHref();
  const SecondaryIcon = wa ? MessageCircle : Phone;
  return (
    <div className={`flex flex-col gap-3 sm:flex-row ${className}`}>
      <Link to={primaryCta.to} className={onDark ? 'btn-on-dark' : 'btn-primary'}>
        {primaryCta.label}
      </Link>
      <a
        href={wa || contact.phoneHref}
        {...(wa ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        className={onDark ? 'btn-outline-on-dark' : 'btn-secondary'}
      >
        <SecondaryIcon className="h-5 w-5" aria-hidden="true" />
        {secondaryCta.label}
        <span className="sr-only">{wa ? ' sur WhatsApp' : ` au ${contact.phoneDisplay}`}</span>
      </a>
    </div>
  );
}
