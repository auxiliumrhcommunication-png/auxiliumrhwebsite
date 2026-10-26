import { Link } from 'react-router-dom';
import { usePageTitle } from '../hooks/usePageTitle';

export default function NotFound() {
  usePageTitle('Page introuvable');
  return (
    <section className="container-site py-24 text-center">
      <p className="eyebrow">Erreur 404</p>
      <h1 className="section-title mb-4">Cette page n'existe pas</h1>
      <p className="mb-8 text-lg text-ink-muted">Elle a peut-être été déplacée. Revenez à l'accueil pour continuer.</p>
      <Link to="/" className="btn-primary">Retour à l'accueil</Link>
    </section>
  );
}
