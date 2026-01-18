import Navbar from '@/components/layout/Navbar'
import Sidebar from '@/components/layout/Sidebar'
import AnimatedHero from '@/components/hero/AnimatedHero'
import HeroSection from '@/components/hero/HeroSection'
import Services from '@/components/services/Services'
import PricingPlans from '@/components/services/PricingPlans'
import AIServiceRecommender from '@/components/services/AIServiceRecommender'
import AIContentStudio from '@/components/ai/AIContentStudio'
import AIImageGenerator from '@/components/ai/AIImageGenerator'
import AIChatWidget from '@/components/ai/AIChatWidget'
import InteractiveShowcase from '@/components/showcase/InteractiveShowcase'
import MobileAppPreview from '@/components/showcase/MobileAppPreview'
import RealTimeCollaboration from '@/components/collaboration/RealTimeCollaboration'
import ProjectDashboard from '@/components/collaboration/ProjectDashboard'
import AnalyticsDashboard from '@/components/analytics/AnalyticsDashboard'
import AdvancedAnalytics from '@/components/analytics/AdvancedAnalytics'
import ReportsViewer from '@/components/analytics/ReportsViewer'
import SubscriptionManager from '@/components/billing/SubscriptionManager'
import InvoiceList from '@/components/billing/InvoiceList'
import AdminPanel from '@/components/admin/AdminPanel'
import Testimonials from '@/components/marketing/Testimonials'
import ContactForm from '@/components/marketing/ContactForm'
import Footer from '@/components/layout/Footer'
import UserManagement from '@/components/admin/UserManagement'

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1">
          <AnimatedHero />
          <HeroSection />
          <InteractiveShowcase />
          <MobileAppPreview />
          
          {/* Services Section */}
          <Services />
          <PricingPlans />
          <AIServiceRecommender />
          
          {/* AI Section */}
          <AIContentStudio />
          <AIImageGenerator />
          
          {/* Collaboration Section */}
          <RealTimeCollaboration />
          <ProjectDashboard />
          
          {/* Analytics Section */}
          <AnalyticsDashboard />
          <AdvancedAnalytics />
          <ReportsViewer />
          
          {/* Billing Section */}
          <SubscriptionManager />
          <InvoiceList />
          
          {/* Admin Section */}
          <AdminPanel />
          <UserManagement />
          
          {/* Marketing Section */}
          <Testimonials />
          <ContactForm />
        </main>
      </div>
      <Footer />
      <AIChatWidget />
    </div>
  )
}