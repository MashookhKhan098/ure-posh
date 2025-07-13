"use client";

import HeroSection from "./hero-section";
import PeopleSection from "./people-section";
import CoreValuesSection from "./core-values-section";
import MissionVisionSection from "./mission-vision-section";
import FAQSection from "./faq-section";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <PeopleSection />
      <CoreValuesSection />
      <MissionVisionSection />
      <FAQSection />
    </div>
  );
}