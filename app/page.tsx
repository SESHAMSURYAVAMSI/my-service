import Navbar from '@/app/components/Navbar';
import AnimatedHero from '@/app/components/AnimatedHero';
 import AIContentStudio from '@/app/components/AIContentStudio';
import RealTimeCollaboration from '@/app/components/RealTimeCollaboration';
import MobileAppPreview from '@/app/components/MobileAppPreview';
import AdvancedAnalytics from '@/app/components/AdvancedAnalytics';
import InteractiveShowcase from '@/app/components/InteractiveShowcase';
import AIServiceRecommender from '@/app/components/AIServiceRecommender';
import ProjectDashboard from '@/app/components/ProjectDashboard';
import SubscriptionManager from '@/app/components/SubscriptionManager';
import Testimonials from '@/app/components/Testimonials';
import ContactForm from '@/app/components/ContactForm';
import AIChatWidget from '@/app/components/AIChatWidget';
import Footer from '@/app/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <AnimatedHero />
      <InteractiveShowcase />
      <AIContentStudio />
      <RealTimeCollaboration />
      <MobileAppPreview />
      <AdvancedAnalytics />
      <AIServiceRecommender />
      <ProjectDashboard />
      <SubscriptionManager />
      <Testimonials />
      <ContactForm />
      <Footer />
      <AIChatWidget />
    </>
  );
}