import { MotionConfig } from 'motion/react';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { Hero } from '@/sections/Hero';
import { Story } from '@/sections/Story';
import { Programs } from '@/sections/Programs';
import { WhyUs } from '@/sections/WhyUs';
import { Schedule } from '@/sections/Schedule';
import { Testimonials } from '@/sections/Testimonials';
import { CtaBanner } from '@/sections/CtaBanner';
import { Faq } from '@/sections/Faq';

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <SiteHeader />
      <main>
        <Hero />
        <Story />
        <Programs />
        <WhyUs />
        <Schedule />
        <Testimonials />
        <CtaBanner />
        <Faq />
      </main>
      <SiteFooter />
    </MotionConfig>
  );
}
