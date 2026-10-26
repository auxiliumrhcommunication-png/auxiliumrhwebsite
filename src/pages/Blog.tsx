import { Link } from 'react-router-dom';
import { ArrowRight, Clock, PenLine } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import CTASection from '../components/CTASection';
import Reveal, { RevealGroup } from '../components/Reveal';
import { posts, readingTime, formatDate } from '../data/blog';
import { contact } from '../data/site';
import { usePageTitle } from '../hooks/usePageTitle';

export default function Blog() {
  usePageTitle('Blog');
  return (
    <>
      <PageHeader
        crumb="Blog"
        eyebrow="Blog"
        title="Conseils et actualités RH"
        lead="Recrutement, paie, conformité sociale et droit du travail au Gabon : les repères pratiques de l'équipe Auxilium RH pour les dirigeants et les responsables RH."
      />

      <section className="py-ds-2xl lg:py-ds-3xl">
        <div className="container-site">
          {posts.length === 0 ? (
            <Reveal className="mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-white p-ds-lg text-center shadow-card">
              <span className="mx-auto mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                <PenLine className="h-7 w-7" aria-hidden="true" />
              </span>
              <h2 className="mb-3 text-2xl font-extrabold text-ink">Nos premiers articles arrivent bientôt</h2>
              <p className="mb-6 text-ink-muted">
                Nous y partagerons des repères concrets sur la gestion du personnel, la paie et les obligations des employeurs.
                En attendant, une question précise ? Écrivez-nous.
              </p>
              <div className="flex flex-col justify-center gap-3 sm:flex-row">
                <Link to="/contact" className="btn-primary">Poser une question</Link>
                {contact.linkedin && (
                  <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="btn-outline">Suivre sur LinkedIn</a>
                )}
              </div>
            </Reveal>
          ) : (
            <RevealGroup as="ul" className="grid gap-ds-md md:grid-cols-2 lg:grid-cols-3">
              {posts.map((p) => (
                <li key={p.slug}>
                  <Link
                    to={`/blog/${p.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card transition duration-200 hover:-translate-y-1 hover:shadow-lift"
                  >
                    {p.cover && <img src={p.cover} alt="" width={600} height={480} loading="lazy" decoding="async" className="aspect-[5/3] w-full bg-brand-50 object-cover" />}
                    <div className="flex flex-1 flex-col p-ds-md">
                      <p className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-subtle">
                        <span className="rounded-full bg-brand-50 px-2.5 py-0.5 font-bold text-brand-700">{p.category}</span>
                        <time dateTime={p.date}>{formatDate(p.date)}</time>
                        <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" aria-hidden="true" />{readingTime(p)} min</span>
                      </p>
                      <h2 className="mb-2 text-xl font-extrabold text-ink group-hover:text-brand-600">{p.title}</h2>
                      <p className="mb-5 text-ink-muted">{p.excerpt}</p>
                      <span className="mt-auto inline-flex items-center gap-1.5 font-bold text-brand-600">
                        Lire l'article <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </RevealGroup>
          )}
        </div>
      </section>

      <CTASection />
    </>
  );
}
