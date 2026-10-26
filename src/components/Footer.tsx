import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin, MessageCircle } from 'lucide-react';
import Logo from './Logo';
import { contact, whatsappHref } from '../data/site';
import { services } from '../data/services';

const footerLink = 'inline-flex min-h-[36px] items-center text-brand-100 hover:text-white hover:underline';

/** Pied de page sur aplat bleu : présentation, services, cabinet, coordonnées, liens légaux. */
export default function Footer() {
  const year = new Date().getFullYear();
  const wa = whatsappHref();

  return (
    <footer className="on-dark bg-brand-800 text-brand-100">
      <div className="container-site grid gap-10 py-ds-2xl sm:grid-cols-2 lg:grid-cols-[1.4fr_1.2fr_0.8fr_1.2fr]">
        <div>
          <Logo onDark />
          <p className="mt-6 max-w-xs font-display text-xl text-white">L'humain au centre des organisations.</p>
          <p className="mt-3 max-w-xs text-sm">Cabinet de conseil en ressources humaines à Libreville, au Gabon.</p>
        </div>

        <nav aria-label="Services">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.08em] text-white">Services</h2>
          <ul>
            {services.map((s) => (
              <li key={s.slug}><Link to={`/services/${s.slug}`} className={footerLink}>{s.navLabel}</Link></li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Le cabinet">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.08em] text-white">Le cabinet</h2>
          <ul>
            <li><Link to="/a-propos" className={footerLink}>À propos</Link></li>
            <li><Link to="/secteurs" className={footerLink}>Secteurs</Link></li>
            <li><Link to="/blog" className={footerLink}>Blog</Link></li>
            <li><Link to="/contact" className={footerLink}>Contact</Link></li>
          </ul>
        </nav>

        <div>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.08em] text-white">Contact</h2>
          <ul className="space-y-2">
            <li>
              <a href={`mailto:${contact.email}`} className={`${footerLink} gap-2.5`}>
                <Mail className="h-4 w-4" aria-hidden="true" />{contact.email}
              </a>
            </li>
            <li>
              <a href={contact.phoneHref} className={`${footerLink} gap-2.5`}>
                <Phone className="h-4 w-4" aria-hidden="true" />{contact.phoneDisplay}
              </a>
            </li>
            {wa && (
              <li>
                <a href={wa} target="_blank" rel="noopener noreferrer" className={`${footerLink} gap-2.5`}>
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />WhatsApp
                </a>
              </li>
            )}
            <li className="inline-flex min-h-[36px] items-center gap-2.5">
              <MapPin className="h-4 w-4" aria-hidden="true" />{contact.city}
            </li>
            {contact.linkedin && (
              <li>
                <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className={`${footerLink} gap-2.5`}>
                  <Linkedin className="h-4 w-4" aria-hidden="true" />LinkedIn
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="container-site flex flex-col gap-3 py-6 text-sm sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Auxilium RH. Le partenaire stratégique de votre capital humain.</p>
          <ul className="flex flex-wrap gap-x-6">
            <li><Link to="/mentions-legales" className={footerLink}>Mentions légales</Link></li>
            <li><Link to="/confidentialite" className={footerLink}>Confidentialité</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
