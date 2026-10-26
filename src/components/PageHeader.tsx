import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  lead: string;
  /** Libellé de la page dans le fil d'Ariane */
  crumb: string;
  children?: ReactNode;
};

/** Bandeau sombre en haut des pages intérieures, avec fil d'Ariane. */
export default function PageHeader({ eyebrow, title, lead, crumb, children }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden bg-night-950 text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(700px_380px_at_85%_0%,rgba(3,51,179,0.55),transparent_70%)]" />
      <div className="container-site relative py-ds-2xl lg:py-ds-3xl">
        <nav aria-label="Fil d'Ariane" className="mb-6 text-sm text-slate-300">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li><Link to="/" className="underline-offset-4 hover:text-white hover:underline">Accueil</Link></li>
            <li aria-hidden="true"><ChevronRight className="h-4 w-4" /></li>
            <li aria-current="page" className="font-semibold text-white">{crumb}</li>
          </ol>
        </nav>
        <p className="eyebrow text-accent-400">{eyebrow}</p>
        <h1 className="max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl">{title}</h1>
        <p className="mt-5 max-w-2xl text-lg text-slate-300">{lead}</p>
        {children}
      </div>
    </section>
  );
}
