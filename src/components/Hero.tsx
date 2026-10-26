import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, BadgeCheck, UserCheck } from 'lucide-react';
import HeroDashboard from './HeroDashboard';
import { gsap, useGSAP, FULL_MOTION } from '../design/gsap';
import { layout, motion, parallaxEnabled, parallaxAmount } from '../design';

/**
 * Ouverture de l'accueil : promesse, double appel à l'action, aperçu du diagnostic.
 * Mise en page selon --variance : centrée (1-3), deux colonnes (4-7), asymétrique (8-10).
 * Entrée animée et parallaxe selon --motion.
 */
export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add(FULL_MOTION, () => {
      // Entrée en cascade : texte puis tableau de bord
      const tl = gsap.timeline({ defaults: { ease: motion.section.ease, duration: motion.section.duration } });
      tl.from('[data-hero-text] > *', { opacity: 0, y: motion.section.y, stagger: motion.section.stagger })
        .from('[data-hero-visual]', { opacity: 0, y: motion.section.y * 1.5, scale: 0.96 }, '-=0.3')
        .from('[data-hero-chip]', { opacity: 0, scale: 0.8, stagger: 0.12, ease: 'back.out(1.7)' }, '-=0.2');

      // Parallaxe : les pastilles flottantes bougent plus vite que le tableau de bord
      if (parallaxEnabled) {
        gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el, i) => {
          gsap.to(el, {
            yPercent: -parallaxAmount * (i + 1),
            ease: 'none',
            scrollTrigger: { trigger: ref.current, start: 'top top', end: 'bottom top', scrub: 0.5 },
          });
        });
      }
    });
  }, { scope: ref });

  const centered = layout === 'centered';
  const bold = layout === 'bold';

  const text = (
    <div data-hero-text className={centered ? 'mx-auto max-w-3xl text-center' : ''}>
      <p className={`mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-sm font-semibold text-slate-200`}>
        <MapPin className="h-4 w-4 text-accent-400" aria-hidden="true" />
        Cabinet de conseil RH · Libreville, Gabon
      </p>
      <h1
        id="hero-title"
        className={`font-extrabold leading-[1.05] tracking-tight ${
          bold ? 'text-5xl sm:text-6xl lg:text-[4.5rem]' : 'text-4xl sm:text-5xl lg:text-[3.6rem]'
        }`}
      >
        Le partenaire stratégique de votre <span className="text-accent-400">capital humain</span>.
      </h1>
      <p className={`mt-6 text-lg leading-relaxed text-slate-300 ${centered ? 'mx-auto max-w-2xl' : 'max-w-xl'}`}>
        Recrutement, paie, audit social et conformité au Code du travail gabonais : Auxilium RH structure votre fonction RH
        pour sécuriser vos obligations et améliorer la performance de vos équipes.
      </p>
      <div className={`mt-9 flex flex-col gap-3 sm:flex-row ${centered ? 'sm:justify-center' : ''}`}>
        <Link to="/contact" className="btn-primary">
          Demander un diagnostic RH
          <ArrowRight className="h-5 w-5" aria-hidden="true" />
        </Link>
        <Link to="/services" className="btn-outline-light">Découvrir nos services</Link>
      </div>
      <p className="mt-5 text-sm text-slate-400">Premier diagnostic sans engagement, selon les modalités du cabinet.</p>
    </div>
  );

  const visual = (
    <div className={`relative ${centered ? 'mx-auto mt-ds-2xl max-w-2xl' : ''} ${bold ? 'lg:-mr-16 lg:mt-16' : ''}`}>
      <div data-hero-visual data-parallax>
        <HeroDashboard />
      </div>
      {/* Pastilles flottantes (décoratives : l'information est déjà dans le tableau) */}
      <div
        data-hero-chip
        data-parallax
        aria-hidden="true"
        className="absolute -bottom-8 -right-3 hidden items-center gap-3 rounded-2xl bg-white px-4 py-3 text-ink shadow-widget sm:flex lg:-right-8"
      >
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
          <BadgeCheck className="h-5 w-5" />
        </span>
        <span>
          <span className="block text-xs font-semibold text-ink-subtle">Immatriculation</span>
          <span className="block text-sm font-extrabold">CNSS à jour</span>
        </span>
      </div>
      <div
        data-hero-chip
        data-parallax
        aria-hidden="true"
        className="absolute -left-4 -top-8 hidden items-center gap-3 rounded-2xl bg-white px-4 py-3 text-ink shadow-widget sm:flex"
      >
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent-50 text-accent-700">
          <UserCheck className="h-5 w-5" />
        </span>
        <span>
          <span className="block text-xs font-semibold text-ink-subtle">Recrutement</span>
          <span className="block text-sm font-extrabold">Profil retenu</span>
        </span>
      </div>
    </div>
  );

  return (
    <section ref={ref} className="relative overflow-hidden bg-night-950 text-white" aria-labelledby="hero-title">
      {/* Fond : halo bleu de marque + grille discrète */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_80%_10%,rgba(3,51,179,0.6),transparent_70%)]" />
        <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)]" />
      </div>

      <div
        className={`container-site relative py-ds-2xl lg:py-ds-3xl ${
          centered ? '' : `grid items-center gap-ds-2xl ${bold ? 'lg:grid-cols-[1.25fr_1fr]' : 'lg:grid-cols-[1.1fr_1fr]'}`
        }`}
      >
        {text}
        {visual}
      </div>
    </section>
  );
}
