import { Link, useSearchParams } from 'react-router-dom';
import { PenLine } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import PostCard from '../components/PostCard';
import CTASection from '../components/CTASection';
import ContactActions from '../components/ContactActions';
import { posts, categories } from '../data/blog';
import { useSeo } from '../hooks/useSeo';

export default function Blog() {
  useSeo({
    title: 'Conseils RH',
    description:
      'Recrutement, paie, conformité sociale et droit du travail au Gabon : les repères pratiques du cabinet Auxilium RH pour les dirigeants et les responsables RH.',
  });
  const [params] = useSearchParams();
  const active = params.get('categorie');
  const used = categories.filter((c) => posts.some((p) => p.category === c));
  const list = active ? posts.filter((p) => p.category === active) : posts;
  const [featured, ...rest] = list;

  return (
    <>
      <PageHeader
        crumbs={[{ label: 'Blog' }]}
        eyebrow="Blog"
        title="Conseils RH"
        lead="Recrutement, paie, conformité sociale et droit du travail au Gabon : des repères pratiques pour les dirigeants et les responsables RH."
      >
        {used.length > 1 && (
          <nav aria-label="Catégories" className="mt-ds-lg">
            <ul className="flex flex-wrap gap-2">
              {[null, ...used].map((c) => {
                const selected = (c ?? null) === active;
                return (
                  <li key={c ?? 'tous'}>
                    <Link
                      to={c ? `/blog?categorie=${encodeURIComponent(c)}` : '/blog'}
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
      </PageHeader>

      <section className="section">
        <div className="container-site">
          {!featured ? (
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
              <PostCard post={featured} featured headingLevel="h2" />
              {rest.length > 0 && (
                <ul className="mt-ds-2xl grid gap-ds-xl border-t border-line pt-ds-xl md:grid-cols-2 lg:grid-cols-3">
                  {rest.map((p) => <li key={p.slug}><PostCard post={p} headingLevel="h2" /></li>)}
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
