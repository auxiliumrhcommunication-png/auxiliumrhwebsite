import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { posts } from '../data/blog';
import PostCard from './PostCard';

/** Derniers conseils RH (accueil). Masqué tant qu'aucun article n'est publié. */
export default function LatestPosts() {
  if (posts.length === 0) return null;
  const [first, ...rest] = posts;

  return (
    <section className="section border-t border-line" aria-labelledby="conseils-title">
      <div className="container-site">
        <div className="mb-ds-xl flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow">Conseils RH</p>
            <h2 id="conseils-title" className="title-md">Nos derniers articles</h2>
          </div>
          <Link to="/blog" className="link-arrow">Lire nos conseils RH <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
        </div>
        <div className="grid gap-ds-xl lg:grid-cols-[1.4fr_1fr]">
          <PostCard post={first} />
          {rest.length > 0 && (
            <ul className="divide-y divide-line border-y border-line">
              {rest.slice(0, 3).map((p) => (
                <li key={p.slug} className="py-ds-md"><PostCard post={{ ...p, cover: undefined }} /></li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
