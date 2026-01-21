import Navbar from '@/components/layout/Navbar';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import HeroSection from '@/components/hero/HeroSection';
import AnimatedHero from '@/components/hero/AnimatedHero';
import Services from '@/components/services/Services';
import ServiceCard from '@/components/services/ServiceCard';
import PricingPlans from '@/components/services/PricingPlans';
import AIServiceRecommender from '@/components/services/AIServiceRecommender';
import AIContentStudio from '@/components/ai/AIContentStudio';
import AIImageGenerator from '@/components/ai/AIImageGenerator';
import AIAssistant from '@/components/ai/AIAssistant';
import AIChatWidget from '@/components/ai/AIChatWidget';
import InteractiveShowcase from '@/components/showcase/InteractiveShowcase';
import MobileAppPreview from '@/components/showcase/MobileAppPreview';
import DemoSection from '@/components/showcase/DemoSection';
import FeaturesGrid from '@/components/showcase/FeaturesGrid';
import RealTimeCollaboration from '@/components/collaboration/RealTimeCollaboration';
import ProjectDashboard from '@/components/collaboration/ProjectDashboard';
import TeamChat from '@/components/collaboration/TeamChat';
import FileSharing from '@/components/collaboration/FileSharing';
import AnalyticsDashboard from '@/components/analytics/AnalyticsDashboard';
import AdvancedAnalytics from '@/components/analytics/AdvancedAnalytics';
import ReportsViewer from '@/components/analytics/ReportsViewer';
import MetricsCard from '@/components/analytics/MetricsCard';
import SubscriptionManager from '@/components/billing/SubscriptionManager';
import InvoiceList from '@/components/billing/InvoiceList';
import PaymentForm from '@/components/billing/PaymentForm';
import UsageTracker from '@/components/billing/UsageTracker';
import AdminPanel from '@/components/admin/AdminPanel';
import UserManagement from '@/components/admin/UserManagement';
import Testimonials from '@/components/marketing/Testimonials';
import ContactForm from '@/components/marketing/ContactForm';
import Footer from '@/components/layout/Footer';

// Example icons for ServiceCard
import { Zap, Users, Globe, Shield } from 'lucide-react';

export default function Home() {
  const serviceCards = [
    {
      title: 'Web Development',
      description: 'Modern, responsive websites built with cutting-edge technology',
      features: ['Next.js/React', 'Mobile Optimized', 'SEO Friendly', 'Fast Loading'],
      price: '$299',
      period: '/month',
      popular: false,
      icon: Zap,
      color: 'bg-gradient-to-br from-blue-500 to-cyan-500'
    },
    {
      title: 'Digital Marketing',
      description: 'Grow your online presence with data-driven strategies',
      features: ['SEO Optimization', 'Social Media', 'Content Strategy', 'Analytics'],
      price: '$499',
      period: '/month',
      popular: true,
      icon: Users,
      color: 'bg-gradient-to-br from-purple-500 to-pink-500'
    },
    {
      title: 'UI/UX Design',
      description: 'Beautiful, intuitive designs that users love',
      features: ['User Research', 'Wireframing', 'Prototyping', 'Testing'],
      price: '$399',
      period: '/month',
      popular: false,
      icon: Globe,
      color: 'bg-gradient-to-br from-green-500 to-emerald-500'
    },
    {
      title: 'Security & Compliance',
      description: 'Enterprise-grade security for your digital assets',
      features: ['Security Audit', 'Compliance', 'Monitoring', 'Backup'],
      price: '$599',
      period: '/month',
      popular: false,
      icon: Shield,
      color: 'bg-gradient-to-br from-orange-500 to-red-500'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Layout Components */}
      <Navbar />
      <Header />
      
      <div className="flex">
        <Sidebar />
        
        <main className="flex-1">
          {/* Hero Sections */}
          <AnimatedHero />
          <HeroSection />
          
          {/* Showcase Section */}
          <InteractiveShowcase />
          <MobileAppPreview />
          <DemoSection />
          <FeaturesGrid />
          
          {/* Services Section */}
          <section className="py-20 px-4">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">Our Premium Services</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Expert solutions tailored to your business needs
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {serviceCards.map((service, index) => (
                  <ServiceCard
                    key={index}
                    title={service.title}
                    description={service.description}
                    features={service.features}
                    price={service.price}
                    period={service.period}
                    popular={service.popular}
                    icon={service.icon}
                    color={service.color}
                    delay={index * 0.1}
                  />
                ))}
              </div>
            </div>
          </section>
          
          <PricingPlans />
          <AIServiceRecommender />
          
          {/* AI Section */}
          <AIContentStudio />
          <AIImageGenerator />
          <AIAssistant />
          
          {/* Collaboration Section */}
          <RealTimeCollaboration />
          <ProjectDashboard />
          <TeamChat />
          <FileSharing />
          
          {/* Analytics Section */}
          <AnalyticsDashboard />
          <AdvancedAnalytics />
          <ReportsViewer />
          
          {/* Example Metrics Cards */}
          <section className="py-20 px-4">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricsCard
                  title="Monthly Revenue"
                  value="$45,231"
                  change={20.1}
                  trend="up"
                  icon={<Zap className="w-5 h-5 text-white" />}
                  color="blue"
                />
                <MetricsCard
                  title="Active Users"
                  value="12,234"
                  change={180.1}
                  trend="up"
                  icon={<Users className="w-5 h-5 text-white" />}
                  color="green"
                />
                <MetricsCard
                  title="Conversion Rate"
                  value="3.2%"
                  change={-2.1}
                  trend="down"
                  icon={<Globe className="w-5 h-5 text-white" />}
                  color="purple"
                />
                <MetricsCard
                  title="Avg. Session"
                  value="4m 32s"
                  change={19}
                  trend="up"
                  icon={<Shield className="w-5 h-5 text-white" />}
                  color="orange"
                />
              </div>
            </div>
          </section>
          
          {/* Billing Section */}
          <SubscriptionManager />
          <InvoiceList />
          <PaymentForm />
          <UsageTracker />
          
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
  );
}