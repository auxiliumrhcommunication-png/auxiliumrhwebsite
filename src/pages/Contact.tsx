import { useRef, useState, type FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Mail, Phone, MapPin, MessageCircle, Send, AlertCircle, CheckCircle2, Info, Copy } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { contact, whatsappHref } from '../data/site';
import { services } from '../data/services';
import { useSeo } from '../hooks/useSeo';

// Le site n'a pas de serveur : à l'envoi, le formulaire ouvre la messagerie
// du visiteur avec un e-mail pré-rempli adressé au cabinet.

type FieldName = 'nom' | 'email' | 'message';
type Values = Record<FieldName | 'entreprise' | 'telephone' | 'motif', string>;

const errorMessages: Record<FieldName, string> = {
  nom: 'Indiquez votre nom.',
  email: 'Indiquez une adresse e-mail valide, par exemple nom@entreprise.ga.',
  message: 'Décrivez votre besoin en quelques lignes.',
};

const motifs = ['Diagnostic RH', ...services.map((s) => s.navLabel), 'Demande de devis', 'Autre demande'];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(name: FieldName, value: string) {
  const v = value.trim();
  if (!v) return false;
  return name === 'email' ? EMAIL_RE.test(v) : true;
}

export default function Contact() {
  useSeo({
    title: 'Contact et diagnostic RH',
    description:
      'Contactez Auxilium RH à Libreville par e-mail ou par téléphone pour un diagnostic RH, un audit, un devis ou un accompagnement en ressources humaines.',
  });
  // /contact?motif=Recrutement pré-remplit le motif
  const [params] = useSearchParams();
  const initialMotif = motifs.includes(params.get('motif') ?? '') ? params.get('motif')! : motifs[0];

  const [values, setValues] = useState<Values>({ nom: '', email: '', telephone: '', entreprise: '', motif: initialMotif, message: '' });
  const [errors, setErrors] = useState<Partial<Record<FieldName, boolean>>>({});
  const [summary, setSummary] = useState<FieldName[]>([]);
  // Message préparé pour la messagerie du visiteur. Le site ne peut pas savoir si l'e-mail
  // a été envoyé : aucun message de réussite n'est affiché pour l'envoi lui-même.
  const [prepared, setPrepared] = useState<{ subject: string; body: string } | null>(null);
  const [copy, setCopy] = useState<'idle' | 'copied' | 'failed'>('idle');
  const summaryRef = useRef<HTMLDivElement>(null);
  const wa = whatsappHref();

  const update = (name: keyof Values, value: string) => {
    setValues((v) => ({ ...v, [name]: value }));
    // Une erreur affichée disparaît dès que le champ devient valide
    if (name in errorMessages && errors[name as FieldName]) {
      setErrors((e) => ({ ...e, [name]: !validate(name as FieldName, value) }));
    }
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
      setPrepared(null);
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }

    const nom = values.nom.trim();
    const entreprise = values.entreprise.trim();
    const telephone = values.telephone.trim();
    const subject = `${values.motif} — ${nom}${entreprise ? ` (${entreprise})` : ''}`;
    const body = [
      values.message.trim(),
      '',
      '—',
      `Motif : ${values.motif}`,
      `Nom : ${nom}`,
      `E-mail : ${values.email.trim()}`,
      ...(telephone ? [`Téléphone : ${telephone}`] : []),
      ...(entreprise ? [`Organisation : ${entreprise}`] : []),
    ].join('\n');

    setPrepared({ subject, body });
    setCopy('idle');
    window.location.href = mailtoHref(subject, body);
  };

  const mailtoHref = (subject: string, body: string) =>
    `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  // Copie du message : la réussite n'est annoncée que si le presse-papiers l'a confirmée
  const copyMessage = async () => {
    if (!prepared) return;
    try {
      await navigator.clipboard.writeText(`${prepared.subject}\n\n${prepared.body}`);
      setCopy('copied');
    } catch {
      setCopy('failed');
    }
  };

  const describedBy = (name: FieldName) => (errors[name] ? `${name}-error` : undefined);
  const fieldError = (name: FieldName) =>
    errors[name] ? (
      <p id={`${name}-error`} className="mt-1.5 flex items-start gap-1.5 text-sm font-semibold text-danger">
        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
        {errorMessages[name]}
      </p>
    ) : null;

  const coords = [
    { icon: Phone, label: 'Téléphone', value: contact.phoneDisplay, href: contact.phoneHref },
    ...(wa ? [{ icon: MessageCircle, label: 'WhatsApp', value: 'Écrire sur WhatsApp', href: wa, external: true }] : []),
    { icon: Mail, label: 'E-mail', value: contact.email, href: `mailto:${contact.email}` },
    { icon: MapPin, label: 'Adresse', value: contact.city },
  ] as { icon: typeof Phone; label: string; value: string; href?: string; external?: boolean }[];

  return (
    <>
      <PageHeader
        crumbs={[{ label: 'Contact' }]}
        eyebrow="Contact"
        title="Demander un diagnostic RH"
        lead="Un besoin de recrutement, un audit, une question de paie ou de conformité ? Décrivez-nous votre situation : un premier diagnostic RH peut être proposé gratuitement et sans engagement, selon les modalités de prise en charge du cabinet."
      />

      <section className="section">
        <div className="container-site grid items-start gap-ds-xl lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-ds-2xl">
          <div>
            <h2 className="title-sm">Parler à un expert RH</h2>
            <p className="mt-2 text-ink-700">Joignez-nous directement :</p>
            <ul className="mt-ds-md border-t border-line">
              {coords.map(({ icon: Icon, label, value, href, external }) => (
                <li key={label} className="flex items-center gap-4 border-b border-line py-4">
                  <Icon className="h-5 w-5 shrink-0 text-brand-600" strokeWidth={1.75} aria-hidden="true" />
                  <div>
                    <p className="text-sm text-ink-600">{label}</p>
                    {href ? (
                      <a
                        href={href}
                        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        className="text-lg font-semibold text-ink underline-offset-4 hover:text-brand-600 hover:underline"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-lg font-semibold text-ink">{value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <form noValidate onSubmit={onSubmit} aria-labelledby="form-title" className="rounded-lg border border-line p-ds-md sm:p-ds-lg">
            <h2 id="form-title" className="title-sm">Écrivez-nous</h2>
            <p className="mt-1 text-sm text-ink-600">Les champs sans mention « facultatif » sont obligatoires.</p>

            {summary.length > 0 && (
              <div
                ref={summaryRef}
                tabIndex={-1}
                role="alert"
                aria-labelledby="error-summary-title"
                className="mt-ds-md rounded border-l-4 border-danger bg-red-50 p-4 focus:outline-none focus:ring-2 focus:ring-danger/40"
              >
                <h3 id="error-summary-title" className="mb-2 font-semibold text-danger">Le formulaire contient des erreurs</h3>
                <ul className="list-disc space-y-1 pl-5">
                  {summary.map((n) => (
                    <li key={n}>
                      <a
                        href={`#${n}`}
                        onClick={(e) => {
                          e.preventDefault();
                          document.getElementById(n)?.focus();
                        }}
                        className="font-semibold text-danger underline"
                      >
                        {errorMessages[n]}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-ds-md grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="motif" className="field-label">Motif de votre demande</label>
                <select id="motif" name="motif" value={values.motif} onChange={(e) => update('motif', e.target.value)} className="field-input">
                  {motifs.map((m) => <option key={m}>{m}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="nom" className="field-label">Nom</label>
                <input id="nom" name="nom" type="text" autoComplete="name" required value={values.nom}
                  onChange={(e) => update('nom', e.target.value)} onBlur={() => onBlur('nom')}
                  aria-invalid={!!errors.nom} aria-describedby={describedBy('nom')} className="field-input" />
                {fieldError('nom')}
              </div>
              <div>
                <label htmlFor="email" className="field-label">E-mail</label>
                <input id="email" name="email" type="email" autoComplete="email" required value={values.email}
                  onChange={(e) => update('email', e.target.value)} onBlur={() => onBlur('email')}
                  aria-invalid={!!errors.email} aria-describedby={describedBy('email')} className="field-input" />
                {fieldError('email')}
              </div>
              <div>
                <label htmlFor="telephone" className="field-label">Téléphone <span className="font-normal text-ink-600">(facultatif)</span></label>
                <input id="telephone" name="telephone" type="tel" autoComplete="tel" value={values.telephone}
                  onChange={(e) => update('telephone', e.target.value)} className="field-input" />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="entreprise" className="field-label">Organisation <span className="font-normal text-ink-600">(facultatif)</span></label>
                <input id="entreprise" name="entreprise" type="text" autoComplete="organization" value={values.entreprise}
                  onChange={(e) => update('entreprise', e.target.value)} className="field-input" />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="message" className="field-label">Votre besoin</label>
                <textarea id="message" name="message" rows={5} required value={values.message}
                  onChange={(e) => update('message', e.target.value)} onBlur={() => onBlur('message')}
                  aria-invalid={!!errors.message} aria-describedby={describedBy('message')}
                  className="field-input min-h-[140px] resize-y" />
                {fieldError('message')}
              </div>
            </div>

            <button type="submit" className="btn-primary mt-ds-md w-full sm:w-auto">
              Envoyer ma demande
              <Send className="h-5 w-5" aria-hidden="true" />
            </button>
            <p className="mt-3 text-sm text-ink-600">
              En cliquant sur « Envoyer ma demande », votre messagerie s'ouvre avec votre message prêt à partir vers {contact.email}.
              Aucune donnée n'est enregistrée par ce site.
            </p>

            <div role="status" aria-live="polite">
              {prepared && (
                <div className="mt-ds-md rounded border-l-4 border-brand-600 bg-brand-50 p-4">
                  <p className="flex items-start gap-2 font-semibold text-ink">
                    <Info className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" aria-hidden="true" />
                    Votre message est prêt dans votre messagerie. Il ne sera transmis qu'une fois que vous l'aurez envoyé depuis
                    celle-ci.
                  </p>
                  <p className="mt-2 text-sm text-ink-700">Votre messagerie ne s'est pas ouverte ?</p>
                  <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                    <a href={mailtoHref(prepared.subject, prepared.body)} className="btn-secondary !min-h-[44px]">
                      <Mail className="h-5 w-5" aria-hidden="true" /> Ouvrir à nouveau ma messagerie
                    </a>
                    <button type="button" onClick={copyMessage} className="btn-secondary !min-h-[44px]">
                      <Copy className="h-5 w-5" aria-hidden="true" /> Copier le message
                    </button>
                  </div>
                  {copy === 'copied' && (
                    <p className="mt-3 flex items-start gap-2 text-sm font-semibold text-ok">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                      Message copié. Collez-le dans un e-mail adressé à {contact.email}.
                    </p>
                  )}
                  {copy === 'failed' && (
                    <div className="mt-3">
                      <p className="flex items-start gap-2 text-sm font-semibold text-danger">
                        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                        La copie automatique n'a pas fonctionné. Sélectionnez le texte ci-dessous et copiez-le :
                      </p>
                      <label htmlFor="message-pret" className="sr-only">Message à copier</label>
                      <textarea id="message-pret" readOnly rows={6} value={`${prepared.subject}\n\n${prepared.body}`} className="field-input mt-2 text-sm" />
                    </div>
                  )}
                </div>
              )}
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
