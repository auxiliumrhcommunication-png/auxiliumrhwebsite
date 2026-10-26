import { useId, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { PenLine, Search, X } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import PostCard from '../components/PostCard';
import CTASection from '../components/CTASection';
import ContactActions from '../components/ContactActions';
import { posts, categories, type BlogPost } from '../data/blog';
import { useSeo } from '../hooks/useSeo';

/** Texte sans accents ni majuscules, pour une recherche tolérante. */
const fold = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
const haystack = (p: BlogPost) =>
  fold([p.title, p.excerpt, p.category, ...p.content.flatMap((b) => (b.type === 'list' ? b.items : [b.text]))].join(' '));

export default function Blog() {
  useSeo({
    title: 'Conseils RH',
    description:
      'Recrutement, paie, conformité sociale et droit du travail au Gabon : les repères pratiques du cabinet Auxilium RH pour les dirigeants et les responsables RH.',
  });
  const searchId = useId();
  // Catégorie et recherche dans l'adresse (?categorie=…&q=…) : partageables et compatibles avec « précédent »
  const [params, setParams] = useSearchParams();
  const active = params.get('categorie');
  const query = params.get('q') ?? '';
  const used = categories.filter((c) => posts.some((p) => p.category === c));

  const list = useMemo(() => {
    const terms = fold(query).split(/\s+/).filter(Boolean);
    return posts
      .filter((p) => !active || p.category === active)
      .filter((p) => terms.every((t) => haystack(p).includes(t)));
  }, [active, query]);

  const setQuery = (q: string) => {
    const next = new URLSearchParams(params);
    if (q) next.set('q', q); else next.delete('q');
    setParams(next, { replace: true });
  };
  const filtering = Boolean(active || query);
  const [featured, ...rest] = filtering ? [undefined, ...list] : list;

  return (
    <>
      <PageHeader
        crumbs={[{ label: 'Blog' }]}
        eyebrow="Blog"
        title="Conseils RH"
        lead="Recrutement, paie, conformité sociale et droit du travail au Gabon : des repères pratiques pour les dirigeants et les responsables RH."
      >
        {posts.length > 0 && (
          <div className="mt-ds-lg flex flex-col gap-ds-sm lg:flex-row lg:items-center lg:justify-between">
            {used.length > 1 && (
              <nav aria-label="Catégories">
                <ul className="flex flex-wrap gap-2">
                  {[null, ...used].map((c) => {
                    const selected = (c ?? null) === active;
                    const next = new URLSearchParams(params);
                    if (c) next.set('categorie', c); else next.delete('categorie');
                    return (
                      <li key={c ?? 'tous'}>
                        <Link
                          to={`/blog${next.toString() ? `?${next}` : ''}`}
                          aria-current={selected ? 'page' : undefined}
                          className={`inline-flex min-h-[44px] items-center rounded-full border px-4 text-sm font-semibold transition-colors duration-200 ${
                            selected ? 'border-brand-600 bg-brand-600 text-white' : 'border-line text-ink-700 hover:border-brand-600 hover:text-brand-600'
                          }`}
                        >
                          {c ?? 'Tous les articles'}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            )}
            <form role="search" onSubmit={(e) => e.preventDefault()} className="relative w-full lg:max-w-xs">
              <label htmlFor={searchId} className="sr-only">Rechercher un article</label>
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-600" aria-hidden="true" />
              <input
                id={searchId}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher : CNSS, contrat, paie…"
                className="field-input pl-11"
              />
            </form>
          </div>
        )}
      </PageHeader>

      <section className="section" aria-label="Articles">
        <div className="container-site">
          {posts.length === 0 ? (
            <div className="max-w-2xl border-l-2 border-brand-600 pl-ds-lg">
              <PenLine className="mb-ds-sm h-8 w-8 text-brand-600" strokeWidth={1.75} aria-hidden="true" />
              <h2 className="title-md">Nos premiers articles arrivent bientôt</h2>
              <p className="mt-3 text-lead text-ink-700">
                Nous y partagerons des repères concrets sur la gestion du personnel, la paie et les obligations des employeurs.
                En attendant, une question précise ? Parlons-en.
              </p>
              <ContactActions className="mt-ds-md" />
            </div>
          ) : (
            <>
              <p role="status" aria-live="polite" className={filtering ? 'mb-ds-lg text-ink-700' : 'sr-only'}>
                {list.length === 0
                  ? 'Aucun article ne correspond à votre recherche.'
                  : `${list.length} article${list.length > 1 ? 's' : ''}${query ? ` pour « ${query} »` : ''}${active ? ` dans « ${active} »` : ''}`}
              </p>
              {filtering && list.length === 0 && (
                <button type="button" onClick={() => setParams({}, { replace: true })} className="btn-secondary">
                  <X className="h-5 w-5" aria-hidden="true" /> Effacer la recherche
                </button>
              )}
              {featured && (
                <div className="mb-ds-2xl">
                  <p className="eyebrow">À la une</p>
                  <PostCard post={featured} featured headingLevel="h2" />
                </div>
              )}
              {rest.length > 0 && (
                <ul className={`grid gap-ds-xl md:grid-cols-2 lg:grid-cols-3 ${featured ? 'border-t border-line pt-ds-xl' : ''}`}>
                  {rest.map((p) => p && <li key={p.slug}><PostCard post={p} headingLevel="h2" /></li>)}
                </ul>
              )}
            </>
          )}
        </div>
      </section>

      <CTASection />
    </>
  );
}
