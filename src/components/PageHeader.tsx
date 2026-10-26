import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export type Crumb = { label: string; to?: string };

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  lead?: string;
  /** Fil d'Ariane après « Accueil » ; le dernier élément est la page courante */
  crumbs: Crumb[];
  children?: ReactNode;
};

/** En-tête éditorial des pages intérieures : fil d'Ariane, sur-titre, titre, chapeau, filet. */
export default function PageHeader({ eyebrow, title, lead, crumbs, children }: PageHeaderProps) {
  return (
    <header className="border-b border-line bg-white">
      <div className="container-site pb-ds-xl pt-ds-lg lg:pb-ds-2xl lg:pt-ds-xl">
        <nav aria-label="Fil d'Ariane" className="mb-ds-lg text-sm text-ink-600">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li><Link to="/" className="inline-flex min-h-[32px] items-center hover:text-brand-600 hover:underline">Accueil</Link></li>
            {crumbs.map((c, i) => (
              <li key={c.label} className="flex items-center gap-1.5">
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
                {c.to && i < crumbs.length - 1 ? (
                  <Link to={c.to} className="inline-flex min-h-[32px] items-center hover:text-brand-600 hover:underline">{c.label}</Link>
                ) : (
                  <span aria-current="page" className="font-semibold text-ink">{c.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="title-lg max-w-4xl">{title}</h1>
        {lead && <p className="mt-6 max-w-prose text-lead text-ink-700">{lead}</p>}
        {children}
      </div>
    </header>
  );
}
