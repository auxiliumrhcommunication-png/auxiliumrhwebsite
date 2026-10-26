import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';
import { type BlogPost, readingTime, formatDate } from '../data/blog';

type PostCardProps = { post: BlogPost; featured?: boolean; headingLevel?: 'h2' | 'h3' };

/** Article en liste : image 3:2, catégorie, titre éditorial, date et temps de lecture. Sans ombre. */
export default function PostCard({ post, featured = false, headingLevel: H = 'h3' }: PostCardProps) {
  return (
    <article className={`group ${featured ? 'grid gap-ds-lg lg:grid-cols-[1.2fr_1fr] lg:items-center' : ''}`}>
      {post.cover && (
        <Link to={`/blog/${post.slug}`} tabIndex={-1} aria-hidden="true" className="block overflow-hidden rounded-lg bg-brand-50">
          <img src={post.cover} alt="" width={600} height={400} loading="lazy" decoding="async" className="aspect-[3/2] w-full object-cover" />
        </Link>
      )}
      <div className={post.cover && !featured ? 'mt-ds-sm' : ''}>
        <p className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-600">
          <span className="font-semibold uppercase tracking-[0.08em] text-brand-600">{post.category}</span>
          {post.draft && <span className="rounded bg-warn px-2 py-0.5 text-xs font-semibold text-white">Brouillon</span>}
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" aria-hidden="true" />{readingTime(post)} min</span>
        </p>
        <H className={`font-display font-semibold text-ink ${featured ? 'text-display-md' : 'text-display-sm'}`}>
          <Link to={`/blog/${post.slug}`} className="hover:text-brand-700 hover:underline hover:decoration-2 hover:underline-offset-4">
            {post.title}
          </Link>
        </H>
        <p className="mt-2 text-ink-700">{post.excerpt}</p>
      </div>
    </article>
  );
}
