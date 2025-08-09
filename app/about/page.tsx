import HeroSection from './hero-section'
import MissionVisionSection from './mission-vision-section'
import ImpactSection from './impact-section'
import ContactSection from './contact-section'

const mission = {
  title: 'Mission',
  description: 'Ureposh lifts organizations by nurturing safe, inclusive, and high-performing workplaces through compliance, education, and culture transformation.',
  icon: 'target'
};
const vision = {
  title: 'Vision',
  description: 'To be the world\'s most trusted partner for workplace culture and compliance.',
  icon: 'eye'
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeroSection />

      {/* Mission & Vision Section */}
      <MissionVisionSection mission={mission} vision={vision} />

      {/* Impact & Values Section */}
      <ImpactSection />

      {/* Contact & CTA Section */}
      <ContactSection />
    </div>
  )
}
