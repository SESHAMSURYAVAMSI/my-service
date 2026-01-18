'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  BarChart3,
  Database,
  Users,
  Cloud,
  Cpu,
  Download,
  Upload,
  Zap,
  AlertCircle,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Info
} from 'lucide-react';

const usageData = {
  storage: { used: 42, total: 100, unit: 'GB', trend: 'up' as const },
  bandwidth: { used: 125, total: 500, unit: 'GB', trend: 'up' as const },
  apiCalls: { used: 12500, total: 50000, unit: 'calls', trend: 'up' as const },
  teamMembers: { used: 3, total: 10, unit: 'members', trend: 'neutral' as const },
  projects: { used: 5, total: 20, unit: 'projects', trend: 'up' as const },
  compute: { used: 35, total: 100, unit: 'hours', trend: 'down' as const },
};

const usageHistory = [
  { month: 'Jan', storage: 35, bandwidth: 80, apiCalls: 8000 },
  { month: 'Feb', storage: 38, bandwidth: 95, apiCalls: 9500 },
  { month: 'Mar', storage: 40, bandwidth: 110, apiCalls: 11000 },
  { month: 'Apr', storage: 42, bandwidth: 125, apiCalls: 12500 },
];

export default function UsageTracker() {
  const [timeRange, setTimeRange] = useState('monthly');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshData = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'neutral') => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4" />;
      case 'down': return <TrendingDown className="w-4 h-4" />;
      default: return null;
    }
  };

  const getTrendColor = (trend: 'up' | 'down' | 'neutral') => {
    switch (trend) {
      case 'up': return 'text-green-600 bg-green-100';
      case 'down': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-gradient-to-r from-blue-500 to-cyan-500">
            <BarChart3 className="w-3 h-3 mr-1" />
            Usage Analytics
          </Badge>
          <h2 className="text-4xl font-bold mb-4">Resource Usage & Limits</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Monitor your resource consumption and stay within plan limits
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Usage Overview */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle>Usage Overview</CardTitle>
                    <CardDescription>Current month usage statistics</CardDescription>
                  </div>
                  <div className="flex items-center gap-3">
                    <Tabs value={timeRange} onValueChange={setTimeRange} className="w-auto">
                      <TabsList>
                        <TabsTrigger value="weekly">Weekly</TabsTrigger>
                        <TabsTrigger value="monthly">Monthly</TabsTrigger>
                        <TabsTrigger value="quarterly">Quarterly</TabsTrigger>
                      </TabsList>
                    </Tabs>
                    <Button variant="outline" size="sm" onClick={refreshData} disabled={isRefreshing}>
                      <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                      Refresh
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                  {Object.entries(usageData).map(([key, data]) => (
                    <Card key={key} className="border">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <div className="p-2 bg-gray-100 rounded-lg">
                              {key === 'storage' && <Database className="w-4 h-4" />}
                              {key === 'bandwidth' && <Cloud className="w-4 h-4" />}
                              {key === 'apiCalls' && <Zap className="w-4 h-4" />}
                              {key === 'teamMembers' && <Users className="w-4 h-4" />}
                              {key === 'projects' && <BarChart3 className="w-4 h-4" />}
                              {key === 'compute' && <Cpu className="w-4 h-4" />}
                            </div>
                            <span className="text-sm font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                          </div>
                          <Badge className={getTrendColor(data.trend)}>
                            {getTrendIcon(data.trend)}
                          </Badge>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Usage</span>
                            <span className="font-medium">
                              {data.used}/{data.total} {data.unit}
                            </span>
                          </div>
                          <Progress value={(data.used / data.total) * 100} />
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>{Math.round((data.used / data.total) * 100)}% used</span>
                            <span>{data.total - data.used} {data.unit} remaining</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Usage History Chart */}
                <div className="border rounded-lg p-6">
                  <h3 className="font-semibold mb-4">Usage History</h3>
                  <div className="h-48 flex items-end gap-2">
                    {usageHistory.map((month, idx) => (
                      <div key={idx} className="flex-1 flex flex-col items-center">
                        <div className="w-full bg-gradient-to-t from-blue-500 to-cyan-500 rounded-t-lg" 
                          style={{ height: `${(month.apiCalls / 15000) * 100}%` }} />
                        <span className="text-xs text-gray-600 mt-2">{month.month}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center gap-6 mt-6 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded"></div>
                      <span>API Calls</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded"></div>
                      <span>Storage</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-purple-500 rounded"></div>
                      <span>Bandwidth</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Alerts & Recommendations */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  Usage Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium mb-1">API Calls Limit</h4>
                        <p className="text-sm text-yellow-700">
                          You've used 75% of your monthly API calls. Consider upgrading to avoid limits.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Info className="w-5 h-5 text-green-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium mb-1">Storage Usage</h4>
                        <p className="text-sm text-green-700">
                          You have 58GB of storage remaining. Good usage pattern detected.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-start gap-3">
                      <TrendingDown className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium mb-1">Compute Hours</h4>
                        <p className="text-sm text-blue-700">
                          Compute usage decreased by 15% this month. Great optimization!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    Download Usage Report
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Upload className="w-4 h-4 mr-2" />
                    Export Data
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    View Detailed Analytics
                  </Button>
                  <Button className="w-full">
                    <Zap className="w-4 h-4 mr-2" />
                    Upgrade Plan
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Plan Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Current Plan</span>
                    <span className="font-medium">Professional</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Billing Cycle</span>
                    <span className="font-medium">Monthly</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Next Billing Date</span>
                    <span className="font-medium">May 15, 2024</span>
                  </div>
                  <div className="pt-4 border-t">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Monthly Cost</span>
                      <span>$79.00</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}