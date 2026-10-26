import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin } from 'lucide-react';
import Logo from './Logo';
import { contact, navLinks } from '../data/site';
import { services } from '../data/services';

/** Pied de page : présentation, liens, expertises, coordonnées. */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-night-950 text-slate-300">
      <div className="container-site grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.3fr_1.2fr]">
        <div>
          <Logo onDark />
          <p className="mt-5 max-w-xs text-sm leading-relaxed">
            Le partenaire stratégique de votre capital humain. Cabinet de conseil en ressources humaines basé à Libreville, au Gabon.
          </p>
        </div>

        <nav aria-label="Plan du site">
          <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">Navigation</h2>
          <ul className="space-y-1">
            <li><Link to="/" className="inline-flex min-h-[36px] items-center hover:text-white hover:underline">Accueil</Link></li>
            {navLinks.map((l) => (
              <li key={l.to}><Link to={l.to} className="inline-flex min-h-[36px] items-center hover:text-white hover:underline">{l.label}</Link></li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">Expertises</h2>
          <ul className="space-y-1">
            {services.map((s) => (
              <li key={s.id}>
                <Link to={`/services#${s.id}`} className="inline-flex min-h-[36px] items-center text-sm hover:text-white hover:underline">
                  {s.navLabel}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-white">Contact</h2>
          <ul className="space-y-3">
            <li>
              <a href={`mailto:${contact.email}`} className="inline-flex items-center gap-2.5 hover:text-white hover:underline">
                <Mail className="h-4 w-4 text-accent-400" aria-hidden="true" />{contact.email}
              </a>
            </li>
            <li>
              <a href={contact.phoneHref} className="inline-flex items-center gap-2.5 hover:text-white hover:underline">
                <Phone className="h-4 w-4 text-accent-400" aria-hidden="true" />{contact.phoneDisplay}
              </a>
            </li>
            <li className="inline-flex items-center gap-2.5">
              <MapPin className="h-4 w-4 text-accent-400" aria-hidden="true" />{contact.city}
            </li>
            {contact.linkedin && (
              <li>
                <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 hover:text-white hover:underline">
                  <Linkedin className="h-4 w-4 text-accent-400" aria-hidden="true" />LinkedIn
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-site flex flex-col gap-2 py-6 text-sm sm:flex-row sm:justify-between">
          <p>© {year} Auxilium RH. Tous droits réservés.</p>
          <p>L'humain au centre des organisations.</p>
        </div>
      </div>
    </footer>
  );
}
