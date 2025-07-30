import HeroSection from './hero-section'
import MissionVisionSection from './mission-vision-section'
import CoreValuesSection from './core-values-section'
import PeopleSection from './people-section'
import TeamSection from './team-section'
import TestimonialsSection from './testimonials-section'
import CTASection from './cta-section'
import ContactSection from './contact-section'

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Mission & Vision Section */}
      <MissionVisionSection />
      
      {/* Core Values Section */}
      <CoreValuesSection />
      
      {/* People Section */}
      <PeopleSection />
      
      {/* Team Section */}
      <TeamSection />
      
      {/* Testimonials Section */}
      <TestimonialsSection />
      
      {/* CTA Section */}
      <CTASection />
      
      {/* Contact Section */}
      <ContactSection />
    </div>
  )
}
