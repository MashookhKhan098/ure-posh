"use client";

import HeroSection from "./hero-section";
import CoreValuesSection from "./core-values-section";
import TestimonialsSection from "./testimonials-section";
import ContactSection from "./contact-section";
import FAQSection from "./faq-section";
import CTASection from "./cta-section";
import Footer from "./footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <CoreValuesSection />
      <TestimonialsSection />
      <ContactSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  );
}