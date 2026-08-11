"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeatureSection from "@/components/FeatureSection";
import HowItWorks from "@/components/HowItWorks";
import WaitlistSection from "@/components/WaitlistSection";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import SoundProvider from "@/components/SoundProvider";
import SoundToggle from "@/components/SoundToggle";
import WaitlistProvider from "@/components/WaitlistProvider";
import SuccessOverlay from "@/components/SuccessOverlay";

export default function Home() {
  return (
    <SoundProvider>
      <WaitlistProvider>
        <Navbar />
        <main>
          <Hero />
          <FeatureSection />
          <HowItWorks />
          <WaitlistSection />
          <FinalCTA />
        </main>
        <Footer />
        <SoundToggle />
        <SuccessOverlay />
      </WaitlistProvider>
    </SoundProvider>
  );
}
