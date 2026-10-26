import Hero from '../components/Hero';
import StatsSection from '../components/StatsSection';
import ServicesGrid from '../components/ServicesGrid';
import FeatureRows from '../components/FeatureRows';
import ApproachSection from '../components/ApproachSection';
import WhyUsSection from '../components/WhyUsSection';
import Testimonials from '../components/Testimonials';
import CTASection from '../components/CTASection';
import { usePageTitle } from '../hooks/usePageTitle';

// Ordre recommandé par le skill ui-ux-pro-max (« Trust & Authority + Conversion ») :
// accroche > preuves > solutions > appel à l'action.
export default function Home() {
  usePageTitle();
  return (
    <>
      <Hero />
      <StatsSection />
      <ServicesGrid />
      <FeatureRows />
      <ApproachSection />
      <WhyUsSection />
      <Testimonials />
      <CTASection />
    </>
  );
}
