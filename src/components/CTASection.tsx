import { contact } from '../data/site';
import ContactActions from './ContactActions';

type CTASectionProps = {
  title?: string;
  text?: string;
};

/** Bandeau d'appel à l'action sur aplat bleu, en bas des pages. */
export default function CTASection({
  title = 'Faisons le point sur votre fonction RH',
  text = 'Un premier diagnostic RH peut être proposé gratuitement et sans engagement, selon les modalités de prise en charge du cabinet.',
}: CTASectionProps) {
  return (
    <section className="on-dark bg-brand-800 text-white" aria-labelledby="cta-title">
      <div className="container-site grid gap-ds-lg py-ds-2xl lg:grid-cols-[1.4fr_1fr] lg:items-end">
        <div>
          <h2 id="cta-title" className="font-display text-display-md font-semibold text-white">{title}</h2>
          <p className="mt-4 max-w-prose text-lead text-brand-100">{text}</p>
        </div>
        <div className="lg:justify-self-end">
          <ContactActions onDark />
          <p className="mt-4 text-sm text-brand-100">
            Ou écrivez-nous : <a href={`mailto:${contact.email}`} className="font-semibold text-white underline underline-offset-4">{contact.email}</a>
          </p>
        </div>
      </div>
    </section>
  );
}
