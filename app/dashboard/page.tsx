import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import AnalyticsDashboard from '@/components/analytics/AnalyticsDashboard';
import ProjectDashboard from '@/components/collaboration/ProjectDashboard';
import MetricsCard from '@/components/analytics/MetricsCard';
import { Zap, Users, Globe, Shield } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-gray-600">Welcome back! Here's what's happening with your projects.</p>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <MetricsCard
              title="Active Projects"
              value="12"
              change={8}
              trend="up"
              icon={<Zap className="w-5 h-5 text-white" />}
              color="blue"
            />
            <MetricsCard
              title="Team Members"
              value="8"
              change={2}
              trend="up"
              icon={<Users className="w-5 h-5 text-white" />}
              color="green"
            />
            <MetricsCard
              title="Completed Tasks"
              value="142"
              change={23}
              trend="up"
              icon={<Globe className="w-5 h-5 text-white" />}
              color="purple"
            />
            <MetricsCard
              title="Upcoming Deadlines"
              value="5"
              change={-1}
              trend="down"
              icon={<Shield className="w-5 h-5 text-white" />}
              color="orange"
            />
          </div>
          
          {/* Main Dashboard Content */}
          <div className="grid lg:grid-cols-2 gap-8">
            <AnalyticsDashboard />
            <ProjectDashboard />
          </div>
        </main>
      </div>
    </div>
  );
}