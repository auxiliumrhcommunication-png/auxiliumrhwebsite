import { useRef, useState, type FormEvent } from 'react';
import { Mail, Phone, MapPin, Send, AlertCircle, CheckCircle2 } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { contact } from '../data/site';
import { usePageTitle } from '../hooks/usePageTitle';

// Le site n'a pas de serveur : à l'envoi, le formulaire ouvre la messagerie
// du visiteur avec un e-mail pré-rempli adressé au cabinet.

type FieldName = 'nom' | 'email' | 'message';
type Values = Record<FieldName | 'entreprise', string>;

const errorMessages: Record<FieldName, string> = {
  nom: 'Indiquez votre nom.',
  email: 'Indiquez une adresse e-mail valide, par exemple nom@entreprise.ga.',
  message: 'Écrivez votre message.',
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(name: FieldName, value: string) {
  const v = value.trim();
  if (!v) return false;
  return name === 'email' ? EMAIL_RE.test(v) : true;
}

export default function Contact() {
  usePageTitle('Contact');
  const [values, setValues] = useState<Values>({ nom: '', email: '', entreprise: '', message: '' });
  const [errors, setErrors] = useState<Partial<Record<FieldName, boolean>>>({});
  const [summary, setSummary] = useState<FieldName[]>([]);
  const [sent, setSent] = useState(false);
  const summaryRef = useRef<HTMLDivElement>(null);

  const update = (name: keyof Values, value: string) => {
    setValues((v) => ({ ...v, [name]: value }));
    // Une erreur affichée disparaît dès que le champ devient valide
    if (name !== 'entreprise' && errors[name]) setErrors((e) => ({ ...e, [name]: !validate(name, value) }));
  };

  // Vérifie le champ quand on le quitte (s'il a été rempli)
  const onBlur = (name: FieldName) => {
    if (values[name].trim()) setErrors((e) => ({ ...e, [name]: !validate(name, values[name]) }));
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const invalid = (Object.keys(errorMessages) as FieldName[]).filter((n) => !validate(n, values[n]));
    setErrors(Object.fromEntries(invalid.map((n) => [n, true])));
    setSummary(invalid);
    if (invalid.length) {
      setSent(false);
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }

    const nom = values.nom.trim();
    const entreprise = values.entreprise.trim();
    const subject = `Demande de contact — ${nom}${entreprise ? ` (${entreprise})` : ''}`;
    const body = [
      values.message.trim(),
      '',
      '—',
      `Nom : ${nom}`,
      `E-mail : ${values.email.trim()}`,
      ...(entreprise ? [`Entreprise : ${entreprise}`] : []),
    ].join('\n');

    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const inputClass = (name: FieldName | 'entreprise') =>
    `w-full rounded-xl border bg-white px-4 py-3 text-base text-ink transition duration-200 placeholder:text-slate-400 focus:outline-none focus:ring-4 ${
      name !== 'entreprise' && errors[name]
        ? 'border-red-600 focus:ring-red-100'
        : 'border-slate-300 focus:border-brand-600 focus:ring-brand-100'
    }`;

  const fieldError = (name: FieldName) =>
    errors[name] ? (
      <p id={`${name}-error`} className="mt-1.5 flex items-start gap-1.5 text-sm font-semibold text-red-700">
        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
        {errorMessages[name]}
      </p>
    ) : null;

  const coords = [
    { icon: Mail, label: 'E-mail', value: contact.email, href: `mailto:${contact.email}` },
    { icon: Phone, label: 'Téléphone', value: contact.phoneDisplay, href: contact.phoneHref },
    { icon: MapPin, label: 'Adresse', value: contact.city },
  ];

  return (
    <>
      <PageHeader
        crumb="Contact"
        eyebrow="Contact"
        title="Parlons de votre organisation"
        lead="Une question, un besoin de recrutement, un audit ou un accompagnement RH ? Écrivez-nous ou appelez-nous. Un premier diagnostic RH peut être proposé gratuitement, sans engagement."
      />

      <section className="py-16 sm:py-20">
        <div className="container-site grid items-start gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          <div>
            <h2 className="section-title mb-6 !text-3xl">Nos coordonnées</h2>
            <ul className="space-y-4">
              {coords.map(({ icon: Icon, label, value, href }) => (
                <li key={label} className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-card">
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-ink-subtle">{label}</p>
                    {href ? (
                      <a href={href} className="text-lg font-bold text-ink hover:text-brand-600 hover:underline">{value}</a>
                    ) : (
                      <p className="text-lg font-bold text-ink">{value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <form
            noValidate
            onSubmit={onSubmit}
            aria-labelledby="form-title"
            className="space-y-5 rounded-3xl border border-slate-200 bg-white p-6 shadow-lift sm:p-8"
          >
            <h2 id="form-title" className="text-2xl font-extrabold text-ink">Écrivez-nous</h2>

            {summary.length > 0 && (
              <div
                ref={summaryRef}
                tabIndex={-1}
                role="alert"
                aria-labelledby="error-summary-title"
                className="rounded-xl border-2 border-red-600 bg-red-50 p-4 focus:outline-none focus:ring-4 focus:ring-red-200"
              >
                <h3 id="error-summary-title" className="mb-2 font-bold text-red-700">Le formulaire contient des erreurs</h3>
                <ul className="list-disc space-y-1 pl-5">
                  {summary.map((n) => (
                    <li key={n}>
                      <a
                        href={`#${n}`}
                        onClick={(e) => {
                          e.preventDefault();
                          document.getElementById(n)?.focus();
                        }}
                        className="font-semibold text-red-700 underline"
                      >
                        {errorMessages[n]}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div>
              <label htmlFor="nom" className="mb-1.5 block font-bold text-ink">Nom</label>
              <input id="nom" name="nom" type="text" autoComplete="name" required value={values.nom}
                onChange={(e) => update('nom', e.target.value)} onBlur={() => onBlur('nom')}
                aria-invalid={!!errors.nom} aria-describedby={errors.nom ? 'nom-error' : undefined} className={inputClass('nom')} />
              {fieldError('nom')}
            </div>

            <div>
              <label htmlFor="email" className="mb-1.5 block font-bold text-ink">E-mail</label>
              <input id="email" name="email" type="email" autoComplete="email" required value={values.email}
                onChange={(e) => update('email', e.target.value)} onBlur={() => onBlur('email')}
                aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-error' : undefined} className={inputClass('email')} />
              {fieldError('email')}
            </div>

            <div>
              <label htmlFor="entreprise" className="mb-1.5 block font-bold text-ink">
                Entreprise <span className="font-normal text-ink-subtle">(facultatif)</span>
              </label>
              <input id="entreprise" name="entreprise" type="text" autoComplete="organization" value={values.entreprise}
                onChange={(e) => update('entreprise', e.target.value)} className={inputClass('entreprise')} />
            </div>

            <div>
              <label htmlFor="message" className="mb-1.5 block font-bold text-ink">Message</label>
              <textarea id="message" name="message" rows={5} required value={values.message}
                onChange={(e) => update('message', e.target.value)} onBlur={() => onBlur('message')}
                aria-invalid={!!errors.message} aria-describedby={errors.message ? 'message-error' : undefined}
                className={`${inputClass('message')} min-h-[140px] resize-y`} />
              {fieldError('message')}
            </div>

            <button type="submit" className="btn-primary w-full sm:w-auto">
              Envoyer
              <Send className="h-5 w-5" aria-hidden="true" />
            </button>
            <p className="text-sm text-ink-muted">
              En cliquant sur « Envoyer », votre messagerie s'ouvre avec votre message prêt à partir vers {contact.email}.
            </p>

            <p role="status" aria-live="polite">
              {sent && (
                <span className="flex items-start gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-4 font-semibold text-emerald-800">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
                  Votre messagerie devrait s'ouvrir avec votre message : il ne reste qu'à cliquer sur « Envoyer ». Si rien ne
                  s'ouvre, écrivez-nous directement à {contact.email}.
                </span>
              )}
            </p>
          </form>
        </div>
      </section>
    </>
  );
}
