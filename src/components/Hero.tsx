import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';
import HeroDashboard from './HeroDashboard';
import Reveal from './Reveal';

/** Section d'ouverture de l'accueil : promesse, double appel à l'action, aperçu du diagnostic. */
export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-night-950 text-white" aria-labelledby="hero-title">
      {/* Fond : halo bleu de marque + grille discrète */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(900px_520px_at_80%_10%,rgba(3,51,179,0.6),transparent_70%)]" />
        <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_75%)]" />
      </div>

      <div className="container-site relative grid items-center gap-14 py-16 sm:py-20 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:py-28">
        <Reveal>
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-sm font-semibold text-slate-200">
            <MapPin className="h-4 w-4 text-accent-400" aria-hidden="true" />
            Cabinet de conseil RH · Libreville, Gabon
          </p>
          <h1 id="hero-title" className="text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.6rem]">
            Le partenaire stratégique de votre{' '}
            <span className="text-accent-400">capital humain</span>.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">
            Recrutement, paie, audit social et conformité au Code du travail gabonais : Auxilium RH structure votre fonction RH
            pour sécuriser vos obligations et améliorer la performance de vos équipes.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link to="/contact" className="btn-primary">
              Demander un diagnostic RH
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
            <Link to="/services" className="btn-outline-light">
              Découvrir nos services
            </Link>
          </div>
          <p className="mt-5 text-sm text-slate-400">Premier diagnostic sans engagement, selon les modalités du cabinet.</p>
        </Reveal>

        <Reveal delay={150}>
          <HeroDashboard />
        </Reveal>
      </div>
    </section>
  );
}
