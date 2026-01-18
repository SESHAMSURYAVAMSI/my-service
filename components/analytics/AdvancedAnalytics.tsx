'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import {
  TrendingUp,
  TrendingDown,
  Users,
  Eye,
  MousePointer,
  DollarSign,
  Clock,
  Download,
  Filter,
  Calendar,
  BarChart3,
  PieChart,
  LineChart,
  Target,
  AlertCircle
} from 'lucide-react';

const data = {
  dailyVisitors: [65, 78, 90, 81, 56, 55, 40, 72, 85, 93, 100, 88],
  conversionRate: [2.1, 2.4, 2.7, 3.1, 3.5, 3.2, 2.8, 3.6, 4.1, 4.3, 4.5, 4.2],
  revenue: [1200, 1900, 3000, 5000, 2000, 3000, 4500, 3200, 4800, 5200, 6100, 5800],
  months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
};

const metrics = [
  { title: 'Total Revenue', value: '$45,231', change: '+20.1%', trend: 'up', icon: DollarSign },
  { title: 'Active Users', value: '12,234', change: '+180.1%', trend: 'up', icon: Users },
  { title: 'Conversion Rate', value: '3.2%', change: '+19%', trend: 'up', icon: Target },
  { title: 'Avg. Session', value: '4m 32s', change: '-2.1%', trend: 'down', icon: Clock },
];

const trafficSources = [
  { source: 'Organic Search', value: 4560, change: '+12%', color: 'bg-blue-500' },
  { source: 'Direct', value: 3120, change: '+8%', color: 'bg-green-500' },
  { source: 'Social Media', value: 2780, change: '+23%', color: 'bg-purple-500' },
  { source: 'Email', value: 1890, change: '-3%', color: 'bg-yellow-500' },
  { source: 'Referral', value: 1420, change: '+5%', color: 'bg-pink-500' },
];

export default function AdvancedAnalytics() {
  const [timeRange, setTimeRange] = useState('30d');
  const [activeMetric, setActiveMetric] = useState('revenue');
  const [prediction, setPrediction] = useState(0);

  useEffect(() => {
    // Simulate AI prediction calculation
    const interval = setInterval(() => {
      setPrediction(prev => {
        const change = Math.random() > 0.5 ? 1 : -1;
        return Math.max(0, Math.min(100, prev + change * Math.random() * 2));
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getChartData = () => {
    switch (activeMetric) {
      case 'visitors': return data.dailyVisitors;
      case 'conversion': return data.conversionRate;
      case 'revenue': return data.revenue;
      default: return data.revenue;
    }
  };

  const getMetricLabel = () => {
    switch (activeMetric) {
      case 'visitors': return 'Daily Visitors';
      case 'conversion': return 'Conversion Rate (%)';
      case 'revenue': return 'Revenue ($)';
      default: return 'Revenue ($)';
    }
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold">Advanced Analytics</h2>
            <p className="text-gray-400">AI-powered insights and predictions</p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px] bg-gray-800 border-gray-700">
                <SelectValue placeholder="Select range" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700">
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="border-gray-700">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, idx) => (
            <Card key={idx} className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 bg-gray-900 rounded-lg">
                    <metric.icon className="w-5 h-5 text-blue-400" />
                  </div>
                  <Badge className={
                    metric.trend === 'up'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }>
                    {metric.trend === 'up' ? (
                      <TrendingUp className="w-3 h-3 mr-1" />
                    ) : (
                      <TrendingDown className="w-3 h-3 mr-1" />
                    )}
                    {metric.change}
                  </Badge>
                </div>
                <p className="text-2xl font-bold mb-1">{metric.value}</p>
                <p className="text-sm text-gray-400">{metric.title}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-gray-800">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="traffic">Traffic</TabsTrigger>
            <TabsTrigger value="conversion">Conversion</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Main Chart */}
              <Card className="lg:col-span-2 bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Performance Overview</span>
                    <div className="flex gap-2">
                      <Button
                        variant={activeMetric === 'revenue' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setActiveMetric('revenue')}
                      >
                        Revenue
                      </Button>
                      <Button
                        variant={activeMetric === 'visitors' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setActiveMetric('visitors')}
                      >
                        Visitors
                      </Button>
                      <Button
                        variant={activeMetric === 'conversion' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setActiveMetric('conversion')}
                      >
                        Conversion
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <div className="flex items-end h-64 gap-1 mb-8">
                      {getChartData().map((value, idx) => (
                        <div key={idx} className="flex-1 flex flex-col items-center">
                          <div
                            className="w-full bg-gradient-to-t from-blue-500 to-purple-500 rounded-t-lg transition-all hover:opacity-80"
                            style={{ height: `${(value / Math.max(...getChartData())) * 100}%` }}
                          />
                          <span className="text-xs text-gray-400 mt-2">{data.months[idx]}</span>
                        </div>
                      ))}
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-semibold">{getMetricLabel()}</p>
                      <p className="text-sm text-gray-400">Last 12 months performance</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Traffic Sources */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle>Traffic Sources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {trafficSources.map((source, idx) => (
                      <div key={idx} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">{source.source}</span>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{source.value.toLocaleString()}</span>
                            <Badge
                              variant="outline"
                              className={
                                source.change.startsWith('+')
                                  ? 'border-green-600 text-green-400'
                                  : 'border-red-600 text-red-400'
                              }
                            >
                              {source.change}
                            </Badge>
                          </div>
                        </div>
                        <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${source.color} rounded-full`}
                            style={{ width: `${(source.value / 10000) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* AI Predictions */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    AI Predictions
                  </CardTitle>
                  <CardDescription>Next month revenue forecast</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <div className="text-5xl font-bold mb-2">
                      ${Math.round(5800 + (5800 * prediction) / 100).toLocaleString()}
                    </div>
                    <div className="flex items-center justify-center gap-2 mb-4">
                      <Badge className={
                        prediction > 0
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }>
                        {prediction > 0 ? '+' : ''}{prediction.toFixed(1)}%
                      </Badge>
                      <span className="text-sm text-gray-400">from previous month</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden mb-4">
                      <div
                        className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full"
                        style={{ width: `${Math.abs(prediction)}%` }}
                      />
                    </div>
                    <p className="text-sm text-gray-400">AI model confidence: 92%</p>
                  </div>
                </CardContent>
              </Card>

              {/* Insights & Alerts */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    Insights & Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-900/30 border border-blue-800 rounded-lg">
                      <div className="flex items-start gap-3">
                        <TrendingUp className="w-5 h-5 text-blue-400 mt-0.5" />
                        <div>
                          <p className="font-medium">Conversion rate increasing</p>
                          <p className="text-sm text-blue-300">Social media campaigns showing 23% higher conversion</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-yellow-900/30 border border-yellow-800 rounded-lg">
                      <div className="flex items-start gap-3">
                        <TrendingDown className="w-5 h-5 text-yellow-400 mt-0.5" />
                        <div>
                          <p className="font-medium">Email engagement down</p>
                          <p className="text-sm text-yellow-300">Email open rates decreased by 12% this week</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-green-900/30 border border-green-800 rounded-lg">
                      <div className="flex items-start gap-3">
                        <Target className="w-5 h-5 text-green-400 mt-0.5" />
                        <div>
                          <p className="font-medium">New target achieved</p>
                          <p className="text-sm text-green-300">Monthly revenue target achieved 8 days early</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}