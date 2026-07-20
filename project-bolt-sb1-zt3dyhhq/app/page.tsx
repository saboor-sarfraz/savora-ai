import { Hero } from '@/components/site/hero';
import { FeaturedItems } from '@/components/site/featured-items';
import { WhyChooseUs } from '@/components/site/why-choose-us';
import { AiAssistantSection } from '@/components/site/ai-assistant-section';
import { StatsBand } from '@/components/site/stats-band';

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBand />
      <FeaturedItems />
      <AiAssistantSection />
      <WhyChooseUs />
    </>
  );
}
