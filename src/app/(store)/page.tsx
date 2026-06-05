import { Hero } from '@/components/home/Hero';
import { Marquee } from '@/components/home/Marquee';
import { FeaturedCollections } from '@/components/home/FeaturedCollections';
import { BestSellers } from '@/components/home/BestSellers';
import { BrandStory } from '@/components/home/BrandStory';
import { WhyChoose } from '@/components/home/WhyChoose';
import { FragrancePyramid } from '@/components/home/FragrancePyramid';
import { Testimonials } from '@/components/home/Testimonials';
import { InstagramFeed } from '@/components/home/InstagramFeed';
import { Newsletter } from '@/components/home/Newsletter';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <FeaturedCollections />
      <BestSellers />
      <BrandStory />
      <WhyChoose />
      <FragrancePyramid />
      <Testimonials />
      <InstagramFeed />
      <Newsletter />
    </>
  );
}
