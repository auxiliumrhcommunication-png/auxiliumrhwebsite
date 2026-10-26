import { Link } from 'react-router-dom';
import { ArrowRight, Phone } from 'lucide-react';
import { contact } from '../data/site';
import Reveal from './Reveal';

type CTASectionProps = {
  title?: string;
  text?: string;
};

/** Bandeau d'appel à l'action, en bas de chaque page. */
export default function CTASection({
  title = 'Un premier diagnostic RH, sans engagement',
  text = 'Un premier diagnostic peut être proposé gratuitement, selon les modalités de prise en charge du cabinet.',
}: CTASectionProps) {
  return (
    <section className="py-ds-xl lg:py-ds-2xl" aria-labelledby="cta-title">
      <div className="container-site">
        <Reveal className="relative overflow-hidden rounded-3xl bg-brand-600 px-6 py-12 text-white sm:px-12 sm:py-14">
          <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border-[28px] border-white/10" />
          <div className="relative grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div>
              <h2 id="cta-title" className="text-3xl font-extrabold tracking-tight sm:text-4xl">{title}</h2>
              <p className="mt-3 max-w-xl text-lg text-blue-100">{text}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
              <Link to="/contact" className="btn-primary">
                Prendre rendez-vous
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
              <a href={contact.phoneHref} className="btn-outline-light">
                <Phone className="h-5 w-5" aria-hidden="true" />
                {contact.phoneDisplay}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
