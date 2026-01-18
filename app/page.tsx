import Navbar from '@/app/components/layout/Navbar';
import AnimatedHero from '@/app/components/hero/AnimatedHero';
 import AIContentStudio from '@/app/components/ai/AIContentStudio';
import RealTimeCollaboration from '@/app/components/collaboration/RealTimeCollaboration';
import MobileAppPreview from '@/app/components/showcase/MobileAppPreview';
import AdvancedAnalytics from '@/app/components/analytics/AdvancedAnalytics';
import InteractiveShowcase from '@/app/components/showcase/InteractiveShowcase';
import AIServiceRecommender from '@/app/components/services/AIServiceRecommender';
import ProjectDashboard from '@/app/components/collaboration/ProjectDashboard';
import SubscriptionManager from '@/app/components/billing/SubscriptionManager';
import Testimonials from '@/app/components/marketing/Testimonials';
import ContactForm from '@/app/components/marketing/ContactForm';
import AIChatWidget from '@/app/components/ai/AIChatWidget';
import Footer from '@/app/components/layout/Footer';

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