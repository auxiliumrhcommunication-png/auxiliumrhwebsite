import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X, ArrowRight } from 'lucide-react';
import Logo from './Logo';
import { navLinks, primaryCta } from '../data/site';
import { services } from '../data/services';

/** Barre de navigation fixe : logo, sous-menu Services, liens, appel à l'action, menu mobile. */
export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLLIElement>(null);
  const { pathname } = useLocation();

  // Tout refermer à chaque changement de page
  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  // Échap ferme les menus ; un clic à l'extérieur ferme le sous-menu Services
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setServicesOpen(false);
        setMobileOpen(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) setServicesOpen(false);
    };
    window.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, []);

  const inServices = pathname.startsWith('/services');
  const linkClass = (active: boolean) =>
    `relative inline-flex min-h-[44px] items-center gap-1 font-semibold transition-colors duration-200 ${
      active ? 'text-brand-600' : 'text-ink hover:text-brand-600'
    }`;
  const activeBar = <span aria-hidden="true" className="absolute inset-x-0 bottom-1.5 h-0.5 bg-brand-600" />;

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white">
      <div className="container-site flex h-[72px] items-center justify-between gap-6">
        <Logo />

        {/* Navigation bureau */}
        <nav aria-label="Navigation principale" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            <li ref={servicesRef} className="relative">
              <button
                type="button"
                className={linkClass(inServices)}
                aria-expanded={servicesOpen}
                aria-controls="sous-menu-services"
                onClick={() => setServicesOpen((v) => !v)}
              >
                Services
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
                {inServices && activeBar}
              </button>
              <div
                id="sous-menu-services"
                hidden={!servicesOpen}
                className="absolute left-1/2 top-full mt-3 w-[560px] -translate-x-1/2 rounded-lg border border-line bg-white p-4 shadow-overlay"
              >
                <ul className="grid grid-cols-2 gap-1">
                  {services.map((s) => (
                    <li key={s.slug}>
                      <NavLink
                        to={`/services/${s.slug}`}
                        className={({ isActive }) =>
                          `block rounded px-3 py-2.5 transition-colors duration-200 hover:bg-brand-50 ${isActive ? 'bg-brand-50' : ''}`
                        }
                      >
                        <span className="block font-semibold text-ink">{s.navLabel}</span>
                        <span className="block text-sm text-ink-600">{s.title}</span>
                      </NavLink>
                    </li>
                  ))}
                </ul>
                <div className="mt-3 border-t border-line px-3 pt-3">
                  <Link to="/services" className="link-arrow text-sm">
                    Vue d'ensemble des services <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </li>
            {navLinks.filter((l) => l.to !== '/services').map((l) => (
              <li key={l.to}>
                <NavLink to={l.to} className={({ isActive }) => linkClass(isActive)}>
                  {({ isActive }) => (
                    <>
                      {l.label}
                      {isActive && activeBar}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link to={primaryCta.to} className="btn-primary hidden !min-h-[44px] !px-5 sm:inline-flex">
            {primaryCta.label}
          </Link>
          <button
            type="button"
            className="inline-flex h-12 w-12 items-center justify-center rounded-lg text-ink hover:bg-mist lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls="menu-mobile"
            aria-label={mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Menu mobile : panneau sous l'en-tête, hauteur de l'écran */}
      <nav
        id="menu-mobile"
        aria-label="Navigation principale"
        hidden={!mobileOpen}
        className="h-[calc(100dvh-72px)] overflow-y-auto border-t border-line bg-white lg:hidden"
      >
        <div className="container-site py-4">
          <p className="eyebrow mt-2">Services</p>
          <ul className="mb-4 border-b border-line pb-4">
            {services.map((s) => (
              <li key={s.slug}>
                <NavLink
                  to={`/services/${s.slug}`}
                  className={({ isActive }) => `flex min-h-[48px] items-center font-semibold ${isActive ? 'text-brand-600' : 'text-ink'}`}
                >
                  {s.navLabel}
                </NavLink>
              </li>
            ))}
            <li>
              <Link to="/services" className="link-arrow mt-1 min-h-[48px] text-sm">Vue d'ensemble</Link>
            </li>
          </ul>
          <ul>
            {navLinks.filter((l) => l.to !== '/services').map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  className={({ isActive }) =>
                    `flex min-h-[52px] items-center border-b border-line text-lg font-semibold ${isActive ? 'text-brand-600' : 'text-ink'}`
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <Link to={primaryCta.to} className="btn-primary mt-6 w-full">{primaryCta.label}</Link>
        </div>
      </nav>
    </header>
  );
}
