import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ChevronRight, Clock } from 'lucide-react';
import CTASection from '../components/CTASection';
import NotFound from './NotFound';
import { posts, readingTime, formatDate } from '../data/blog';
import { usePageTitle } from '../hooks/usePageTitle';

export default function BlogPost() {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);
  usePageTitle(post?.title ?? 'Page introuvable');

  if (!post) return <NotFound />;

  return (
    <>
      <article>
        <header className="bg-white py-ds-2xl lg:py-ds-3xl">
          <div className="container-site max-w-3xl">
            <nav aria-label="Fil d'Ariane" className="mb-6 text-sm text-ink-subtle">
              <ol className="flex flex-wrap items-center gap-1.5">
                <li><Link to="/" className="hover:text-brand-600 hover:underline">Accueil</Link></li>
                <li aria-hidden="true"><ChevronRight className="h-4 w-4" /></li>
                <li><Link to="/blog" className="hover:text-brand-600 hover:underline">Blog</Link></li>
                <li aria-hidden="true"><ChevronRight className="h-4 w-4" /></li>
                <li aria-current="page" className="font-semibold text-ink">{post.title}</li>
              </ol>
            </nav>
            <p className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-subtle">
              <span className="rounded-full bg-brand-50 px-2.5 py-0.5 font-bold text-brand-700">{post.category}</span>
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" aria-hidden="true" />{readingTime(post)} min de lecture</span>
              {post.author && <span>Par {post.author}</span>}
            </p>
            <h1 className="text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">{post.title}</h1>
            <p className="mt-5 text-xl text-ink-muted">{post.excerpt}</p>
          </div>
          {post.cover && (
            <div className="container-site mt-ds-xl max-w-4xl">
              <img src={post.cover} alt="" width={600} height={480} className="aspect-[2/1] w-full rounded-3xl bg-brand-50 object-cover" />
            </div>
          )}
        </header>

        <div className="container-site max-w-3xl py-ds-xl">
          <div className="space-y-5 text-lg leading-relaxed text-ink">
            {post.content.map((block, i) => {
              if (block.type === 'h2') return <h2 key={i} className="pt-4 text-2xl font-extrabold text-ink">{block.text}</h2>;
              if (block.type === 'list')
                return (
                  <ul key={i} className="list-disc space-y-2 pl-6 marker:text-brand-600">
                    {block.items.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                );
              return <p key={i}>{block.text}</p>;
            })}
          </div>
          <Link to="/blog" className="btn-outline mt-ds-xl">
            <ArrowLeft className="h-5 w-5" aria-hidden="true" />
            Tous les articles
          </Link>
        </div>
      </article>
      <CTASection />
    </>
  );
}
