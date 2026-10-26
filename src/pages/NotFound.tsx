import { Link } from 'react-router-dom';
import { useSeo } from '../hooks/useSeo';

export default function NotFound() {
  useSeo({ title: 'Page introuvable', description: 'Cette page n\'existe pas ou a été déplacée.', noindex: true });
  return (
    <section className="container-site py-ds-3xl">
      <p className="eyebrow">Erreur 404</p>
      <h1 className="title-lg">Cette page n'existe pas</h1>
      <p className="mt-ds-md max-w-prose text-lead text-ink-700">Elle a peut-être été déplacée. Ces liens peuvent vous aider :</p>
      <ul className="mt-ds-md flex flex-wrap gap-x-ds-lg gap-y-2">
        <li><Link to="/" className="link-arrow">Accueil</Link></li>
        <li><Link to="/services" className="link-arrow">Nos services</Link></li>
        <li><Link to="/contact" className="link-arrow">Contact</Link></li>
      </ul>
    </section>
  );
}
