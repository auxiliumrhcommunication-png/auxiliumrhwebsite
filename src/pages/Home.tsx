import Hero from '../components/Hero';
import ServicesGrid from '../components/ServicesGrid';
import StatsSection from '../components/StatsSection';
import ApproachSection from '../components/ApproachSection';
import WhyUsSection from '../components/WhyUsSection';
import Testimonials from '../components/Testimonials';
import CTASection from '../components/CTASection';
import { usePageTitle } from '../hooks/usePageTitle';

export default function Home() {
  usePageTitle();
  return (
    <>
      <Hero />
      <ServicesGrid />
      <StatsSection />
      <ApproachSection />
      <WhyUsSection />
      <Testimonials />
      <CTASection />
    </>
  );
}
