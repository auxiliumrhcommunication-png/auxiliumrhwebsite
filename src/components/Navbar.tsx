import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, CalendarCheck } from 'lucide-react';
import Logo from './Logo';
import { navLinks, primaryCta } from '../data/site';

/** Barre de navigation fixe : logo, liens, bouton d'action, menu mobile. */
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  // Ferme le menu mobile à chaque changement de page
  useEffect(() => setOpen(false), [pathname]);

  // Ombre sous la barre dès qu'on a défilé
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Échap ferme le menu mobile
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `relative inline-flex min-h-[44px] items-center text-[0.95rem] font-semibold transition-colors duration-200 ${
      isActive ? 'text-brand-600' : 'text-ink-muted hover:text-brand-600'
    }`;

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-white/95 backdrop-blur transition-shadow duration-200 ${
        scrolled ? 'border-slate-200 shadow-[0_6px_24px_rgba(15,23,42,0.06)]' : 'border-transparent'
      }`}
    >
      <div className="container-site flex h-[72px] items-center justify-between gap-6">
        <Logo />

        {/* Navigation bureau */}
        <nav aria-label="Navigation principale" className="hidden items-center gap-8 lg:flex">
          {navLinks.map((l) => (
            <NavLink key={l.to} to={l.to} className={linkClass}>
              {({ isActive }) => (
                <>
                  {l.label}
                  {isActive && <span aria-hidden="true" className="absolute inset-x-0 bottom-1 h-0.5 rounded bg-brand-600" />}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link to={primaryCta.to} className="btn-primary hidden !min-h-[44px] !px-5 text-[0.95rem] sm:inline-flex">
            <CalendarCheck className="h-4 w-4" aria-hidden="true" />
            {primaryCta.label}
          </Link>
          <button
            type="button"
            className="inline-flex h-12 w-12 items-center justify-center rounded-lg text-ink hover:bg-slate-100 lg:hidden"
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      <nav
        id="menu-mobile"
        aria-label="Navigation principale"
        hidden={!open}
        className="border-t border-slate-200 bg-white lg:hidden"
      >
        <div className="container-site flex flex-col py-3">
          {navLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `flex min-h-[48px] items-center border-b border-slate-100 font-semibold ${isActive ? 'text-brand-600' : 'text-ink'}`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <Link to={primaryCta.to} className="btn-primary mt-4 w-full">
            <CalendarCheck className="h-5 w-5" aria-hidden="true" />
            Demander un diagnostic RH
          </Link>
        </div>
      </nav>
    </header>
  );
}
