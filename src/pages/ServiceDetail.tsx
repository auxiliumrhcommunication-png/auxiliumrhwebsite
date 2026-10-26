import { Link, NavLink, useParams } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import ContactActions from '../components/ContactActions';
import SlotImage from '../components/SlotImage';
import NotFound from './NotFound';
import { services, serviceBySlug } from '../data/services';
import { steps } from '../data/company';
import { useSeo } from '../hooks/useSeo';

/** Page d'un service : en bref, ce que nous faisons, déroulement, pour qui, appel à l'action. */
export default function ServiceDetail() {
  const { slug } = useParams();
  const service = serviceBySlug(slug);
  const index = services.findIndex((s) => s.slug === slug);

  useSeo({
    title: service?.title ?? 'Page introuvable',
    description: service ? `${service.intro} Auxilium RH, cabinet de conseil RH à Libreville.` : 'Cette page n\'existe pas.',
    noindex: !service,
  });

  if (!service) return <NotFound />;
  const next = services[(index + 1) % services.length];

  return (
    <>
      <PageHeader
        crumbs={[{ label: 'Services', to: '/services' }, { label: service.navLabel }]}
        eyebrow={`Service ${String(index + 1).padStart(2, '0')}`}
        title={service.title}
        lead={service.intro}
      />

      <div className="container-site grid gap-ds-xl py-ds-xl lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-ds-2xl lg:py-ds-2xl">
        {/* Navigation latérale entre services (reste visible au défilement sur grand écran) */}
        <nav aria-label="Nos services" className="order-last lg:order-none">
          <div className="lg:sticky lg:top-[104px]">
            <p className="eyebrow">Nos services</p>
            <ul className="border-t border-line">
              {services.map((s, i) => (
                <li key={s.slug} className="border-b border-line">
                  <NavLink
                    to={`/services/${s.slug}`}
                    className={({ isActive }) =>
                      `flex min-h-[48px] items-center gap-3 py-2 text-[0.95rem] transition-colors duration-200 ${
                        isActive ? 'font-semibold text-brand-600' : 'text-ink-700 hover:text-brand-600'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span className={`font-display ${isActive ? 'text-brand-600' : 'text-ink-600'}`} aria-hidden="true">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        {s.navLabel}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <article className="min-w-0">
          <section aria-labelledby="faisons-title" className="grid gap-ds-lg xl:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] xl:items-start">
            <div>
              <h2 id="faisons-title" className="title-md mb-ds-md">Ce que nous faisons</h2>
              <ul className="border-t border-line">
                {service.items.map((item) => (
                  <li key={item} className="flex gap-3 border-b border-line py-3.5">
                    <Check className="mt-1 h-5 w-5 shrink-0 text-brand-600" strokeWidth={2} aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            {service.image && (
              <SlotImage slot={service.image} alt="" className="rounded-lg bg-brand-50" sizes="(min-width: 1280px) 400px, 100vw" />
            )}
          </section>

          <section aria-labelledby="deroulement-title" className="mt-ds-2xl">
            <h2 id="deroulement-title" className="title-md mb-ds-md">Comment nous travaillons</h2>
            <ol className="grid gap-ds-md sm:grid-cols-2">
              {steps.map((s, i) => (
                <li key={s.title} className="border-t-2 border-brand-600 pt-3">
                  <h3 className="font-semibold text-ink">
                    <span className="mr-2 font-display text-brand-600">{i + 1}.</span>{s.title}
                  </h3>
                  <p className="mt-1 text-ink-700">{s.text}</p>
                </li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="pourqui-title" className="mt-ds-2xl">
            <h2 id="pourqui-title" className="title-md mb-ds-sm">Pour qui</h2>
            <p className="max-w-prose text-ink-700">
              TPE et PME, grandes entreprises et groupes, industries et entreprises de services, entrepreneurs et organisations en
              développement : notre approche s'adapte au niveau de structuration, au secteur et aux enjeux de chaque organisation.
            </p>
            <Link to="/secteurs" className="link-arrow mt-3">Nos secteurs d'intervention <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
          </section>

          <aside aria-labelledby="besoin-title" className="mt-ds-2xl rounded-lg bg-brand-50 p-ds-lg">
            <h2 id="besoin-title" className="title-sm">Un besoin en {service.navLabel.toLowerCase()} ?</h2>
            <p className="mt-2 max-w-prose text-ink-700">
              Décrivez-nous votre situation : nous revenons vers vous pour en parler. Un premier diagnostic RH peut être proposé
              sans engagement.
            </p>
            <ContactActions className="mt-ds-md" />
          </aside>

          <p className="mt-ds-xl border-t border-line pt-ds-md">
            <span className="block text-sm text-ink-600">Service suivant</span>
            <Link to={`/services/${next.slug}`} className="link-arrow mt-1 font-display text-display-sm">
              {next.title} <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
          </p>
        </article>
      </div>
    </>
  );
}
