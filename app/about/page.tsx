import HeroSection from './hero-section'
import MissionVisionSection from './mission-vision-section'
import TaglineSection from './tagline-section'
import ValuesPillarsSection from './values-pillars-section'
import ContactSection from './contact-section'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeroSection />

      {/* Mission & Vision Section */}
      <MissionVisionSection />

      {/* Tagline Section */}
      <TaglineSection />

      {/* Values & Pillars Section */}
      <ValuesPillarsSection />

      {/* Contact Section */}
      <ContactSection />
    </div>
  )
}
