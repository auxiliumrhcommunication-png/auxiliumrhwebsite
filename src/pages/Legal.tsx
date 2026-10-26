import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { contact, legal } from '../data/site';
import { formatDate } from '../data/blog';
import { useSeo } from '../hooks/useSeo';

// Tant qu'une information légale est encore entre crochets (à compléter),
// les pages légales sont exclues de l'indexation par les moteurs de recherche.
const incomplete = Object.values(legal).some((v) => v.includes('['));

function LegalLayout({ title, description, children }: { title: string; description: string; children: ReactNode }) {
  useSeo({ title, description, noindex: incomplete });
  return (
    <>
      <PageHeader crumbs={[{ label: title }]} eyebrow="Informations légales" title={title} />
      <div className="container-site py-ds-xl lg:py-ds-2xl">
        <div className="max-w-prose space-y-ds-lg text-ink-700 [&_h2]:title-sm [&_h2]:mb-3 [&_p+p]:mt-3">
          {children}
          <p className="border-t border-line pt-ds-md text-sm text-ink-600">Dernière mise à jour : {formatDate(legal.lastUpdated)}.</p>
        </div>
      </div>
    </>
  );
}

export function MentionsLegales() {
  return (
    <LegalLayout title="Mentions légales" description="Mentions légales du site Auxilium RH : éditeur, hébergeur, propriété intellectuelle.">
      <section>
        <h2>Éditeur du site</h2>
        <p>
          {legal.companyName}, {legal.legalForm}<br />
          RCCM : {legal.rccm} · NIF : {legal.nif}<br />
          Siège : {legal.address}<br />
          E-mail : <a href={`mailto:${contact.email}`} className="text-brand-600 underline">{contact.email}</a> · Téléphone :{' '}
          <a href={contact.phoneHref} className="text-brand-600 underline">{contact.phoneDisplay}</a>
        </p>
        <p>Directeur de la publication : {legal.publicationDirector}</p>
      </section>
      <section>
        <h2>Hébergement</h2>
        <p>{legal.host}.</p>
      </section>
      <section>
        <h2>Propriété intellectuelle</h2>
        <p>
          Les textes, le logo, les illustrations et la mise en page de ce site sont la propriété d'{legal.companyName}, sauf mention
          contraire. Toute reproduction sans autorisation préalable est interdite.
        </p>
      </section>
      <section>
        <h2>Informations fournies</h2>
        <p>
          Les contenus du site, notamment les conseils publiés, sont fournis à titre d'information générale. Ils ne remplacent pas
          un accompagnement adapté à la situation de chaque organisation.
        </p>
      </section>
      <p>Voir aussi la <Link to="/confidentialite" className="text-brand-600 underline">politique de confidentialité</Link>.</p>
    </LegalLayout>
  );
}

export function Confidentialite() {
  return (
    <LegalLayout title="Politique de confidentialité" description="Données personnelles et confidentialité sur le site Auxilium RH.">
      <section>
        <h2>Données collectées par le site</h2>
        <p>
          Ce site n'enregistre aucune donnée personnelle. Le formulaire de contact ne transmet rien à un serveur : il ouvre votre
          propre messagerie avec un message pré-rempli, que vous choisissez d'envoyer ou non à {contact.email}.
        </p>
        <p>Le site ne dépose pas de cookie et n'utilise pas d'outil de mesure d'audience.</p>
      </section>
      <section>
        <h2>Services tiers</h2>
        <p>
          Les polices de caractères sont chargées depuis Google Fonts : votre navigateur transmet à Google l'adresse IP utilisée pour
          les télécharger. L'hébergement est assuré par Firebase Hosting (Google).
        </p>
      </section>
      <section>
        <h2>Messages que vous nous envoyez</h2>
        <p>
          Les informations contenues dans les messages reçus par e-mail, par téléphone ou par WhatsApp sont utilisées uniquement pour
          répondre à votre demande. Durée de conservation : [à compléter].
        </p>
      </section>
      <section>
        <h2>Vos droits</h2>
        <p>
          Vous pouvez demander l'accès, la rectification ou la suppression des informations vous concernant en écrivant à{' '}
          <a href={`mailto:${contact.email}`} className="text-brand-600 underline">{contact.email}</a>. Cadre légal applicable au
          Gabon : [référence à confirmer par un juriste].
        </p>
      </section>
    </LegalLayout>
  );
}
