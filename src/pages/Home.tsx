import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Hero from '../components/Hero';
import NeedsBar from '../components/NeedsBar';
import ServicesIndex from '../components/ServicesIndex';
import DiagnosticSteps from '../components/DiagnosticSteps';
import ReasonsSection from '../components/ReasonsSection';
import Testimonials from '../components/Testimonials';
import LatestPosts from '../components/LatestPosts';
import CTASection from '../components/CTASection';
import { useSeo } from '../hooks/useSeo';

// Direction « Éditorial institutionnel » (A) + portes d'entrée par besoin (B).
export default function Home() {
  useSeo({
    description:
      'Cabinet de conseil en ressources humaines à Libreville : recrutement, audit et conformité RH, paie et administration du personnel, stratégie RH, droit du travail et externalisation RH au Gabon.',
  });
  return (
    <>
      <Hero />
      <NeedsBar />
      <section className="section" aria-labelledby="expertises-title">
        <div className="container-site">
          <div className="mb-ds-xl flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <p className="eyebrow">Nos expertises</p>
              <h2 id="expertises-title" className="title-md">De l'organisation administrative à l'accompagnement stratégique</h2>
            </div>
            <Link to="/services" className="link-arrow shrink-0">Découvrir nos services <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
          </div>
          <ServicesIndex />
        </div>
      </section>
      <DiagnosticSteps />
      <ReasonsSection />
      <Testimonials />
      <LatestPosts />
      <CTASection />
    </>
  );
}
