import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import ServicesIndex from '../components/ServicesIndex';
import DiagnosticSteps from '../components/DiagnosticSteps';
import CTASection from '../components/CTASection';
import { services } from '../data/services';
import { useSeo } from '../hooks/useSeo';

export default function Services() {
  useSeo({
    title: 'Nos services RH',
    description:
      'Recrutement, audit et conformité RH, administration du personnel et paie, stratégie RH, droit du travail et externalisation : les six domaines d\'intervention d\'Auxilium RH au Gabon.',
  });

  // Anciennes adresses /services#recrutement… : redirection vers la page du service
  const { hash } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const old = services.find((s) => `#${s.id}` === hash || `#${s.slug}` === hash);
    if (old) navigate(`/services/${old.slug}`, { replace: true });
  }, [hash, navigate]);

  return (
    <>
      <PageHeader
        crumbs={[{ label: 'Services' }]}
        eyebrow="Nos services"
        title="Un accompagnement RH complet, de l'administratif au stratégique"
        lead="Auxilium RH intervient sur l'ensemble des problématiques liées à la gestion des ressources humaines, de l'organisation administrative à l'accompagnement stratégique des dirigeants."
      />
      <section className="section" aria-label="Liste des services">
        <div className="container-site">
          <ServicesIndex detail="intro" headingLevel="h2" />
        </div>
      </section>
      <DiagnosticSteps />
      <CTASection />
    </>
  );
}
