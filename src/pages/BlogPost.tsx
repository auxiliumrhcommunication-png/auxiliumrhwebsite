import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Clock } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import PostCard from '../components/PostCard';
import ContactActions from '../components/ContactActions';
import NotFound from './NotFound';
import { posts, readingTime, formatDate, headingId } from '../data/blog';
import { useSeo } from '../hooks/useSeo';

/** Article : en-tête, sommaire (grand écran), contenu à 68 caractères, encadré d'appel à l'action, articles liés. */
export default function BlogPost() {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);
  useSeo({
    title: post?.title ?? 'Page introuvable',
    description: post?.excerpt ?? 'Cette page n\'existe pas.',
    image: post?.cover,
    type: 'article',
    noindex: !post,
  });

  if (!post) return <NotFound />;

  const toc = post.content.filter((b) => b.type === 'h2').map((b) => (b as { text: string }).text);
  const related = posts.filter((p) => p.slug !== post.slug && p.category === post.category).slice(0, 3);

  return (
    <>
      <PageHeader crumbs={[{ label: 'Blog', to: '/blog' }, { label: post.title }]} eyebrow={post.category} title={post.title} lead={post.excerpt}>
        <p className="mt-ds-md flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-ink-600">
          <time dateTime={post.date}>Publié le {formatDate(post.date)}</time>
          <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" aria-hidden="true" />{readingTime(post)} min de lecture</span>
          {post.author && <span>Par {post.author}</span>}
        </p>
      </PageHeader>

      <div className="container-site grid gap-ds-xl py-ds-xl lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-ds-2xl lg:py-ds-2xl">
        <aside className="hidden lg:block">
          {toc.length > 0 && (
            <nav aria-label="Sommaire" className="sticky top-[104px]">
              <p className="eyebrow">Sommaire</p>
              <ol className="space-y-2 border-l border-line">
                {toc.map((t) => (
                  <li key={t}>
                    <a href={`#${headingId(t)}`} className="-ml-px block border-l-2 border-transparent py-1 pl-4 text-sm text-ink-700 hover:border-brand-600 hover:text-brand-600">
                      {t}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          )}
        </aside>

        <article className="min-w-0">
          {post.cover && (
            <img src={post.cover} alt="" width={600} height={400} className="mb-ds-xl aspect-[3/2] w-full max-w-3xl rounded-lg bg-brand-50 object-cover" />
          )}
          <div className="max-w-prose space-y-5 text-body">
            {post.content.map((block, i) => {
              if (block.type === 'h2')
                return <h2 key={i} id={headingId(block.text)} className="title-sm pt-ds-sm">{block.text}</h2>;
              if (block.type === 'list')
                return (
                  <ul key={i} className="list-disc space-y-2 pl-6 marker:text-brand-600">
                    {block.items.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                );
              return <p key={i}>{block.text}</p>;
            })}
          </div>

          <aside aria-labelledby="article-cta" className="mt-ds-xl max-w-prose rounded-lg bg-brand-50 p-ds-lg">
            <h2 id="article-cta" className="title-sm">Cette question se pose dans votre organisation ?</h2>
            <p className="mt-2 text-ink-700">Nos consultants peuvent analyser votre situation et vous proposer une démarche adaptée.</p>
            <ContactActions className="mt-ds-md" />
          </aside>

          <Link to="/blog" className="link-arrow mt-ds-xl">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Tous les articles
          </Link>
        </article>
      </div>

      {related.length > 0 && (
        <section className="section border-t border-line bg-mist" aria-labelledby="lies-title">
          <div className="container-site">
            <h2 id="lies-title" className="title-md mb-ds-xl">À lire aussi</h2>
            <ul className="grid gap-ds-xl md:grid-cols-3">
              {related.map((p) => <li key={p.slug}><PostCard post={p} /></li>)}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
