'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TrendingUp, TrendingDown, Users, DollarSign, Eye, MousePointer } from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const trafficData = [
  { month: 'Jan', visitors: 4000, conversions: 2400 },
  { month: 'Feb', visitors: 3000, conversions: 1398 },
  { month: 'Mar', visitors: 9800, conversions: 2000 },
  { month: 'Apr', visitors: 3908, conversions: 2780 },
  { month: 'May', visitors: 4800, conversions: 1890 },
  { month: 'Jun', visitors: 3800, conversions: 2390 },
  { month: 'Jul', visitors: 4300, conversions: 3490 },
];

const sourceData = [
  { name: 'Organic', value: 400, color: '#3B82F6' },
  { name: 'Direct', value: 300, color: '#10B981' },
  { name: 'Social', value: 300, color: '#8B5CF6' },
  { name: 'Email', value: 200, color: '#F59E0B' },
];

const metrics = [
  {
    title: 'Total Revenue',
    value: '$45,231.89',
    change: '+20.1%',
    trend: 'up',
    icon: DollarSign,
  },
  {
    title: 'Active Users',
    value: '2,350',
    change: '+180.1%',
    trend: 'up',
    icon: Users,
  },
  {
    title: 'Page Views',
    value: '12,234',
    change: '+19%',
    trend: 'up',
    icon: Eye,
  },
  {
    title: 'Conversion Rate',
    value: '3.2%',
    change: '-2.1%',
    trend: 'down',
    icon: MousePointer,
  },
];

export default function AnalyticsDashboard() {
  const [realtimeUsers, setRealtimeUsers] = useState(235);

  useEffect(() => {
    const interval = setInterval(() => {
      setRealtimeUsers(prev => prev + Math.floor(Math.random() * 5) - 2);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold">Analytics Dashboard</h2>
            <p className="text-gray-600">Real-time insights and performance metrics</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-green-600 border-green-600">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse mr-2" />
              {realtimeUsers} Live Users
            </Badge>
            <Button variant="outline">Export Data</Button>
            <Button>Customize Dashboard</Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full md:w-auto grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="traffic">Traffic</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {metrics.map((metric, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                    <metric.icon className="h-4 w-4 text-gray-500" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{metric.value}</div>
                    <div className="flex items-center text-xs">
                      {metric.trend === 'up' ? (
                        <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
                      ) : (
                        <TrendingDown className="mr-1 h-4 w-4 text-red-500" />
                      )}
                      <span className={metric.trend === 'up' ? 'text-green-500' : 'text-red-500'}>
                        {metric.change}
                      </span>
                      <span className="text-gray-500 ml-1">from last month</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Charts */}
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Traffic Overview</CardTitle>
                  <CardDescription>Monthly visitors and conversions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={trafficData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="visitors" stroke="#3B82F6" strokeWidth={2} />
                        <Line type="monotone" dataKey="conversions" stroke="#10B981" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Traffic Sources</CardTitle>
                  <CardDescription>Where your visitors come from</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={sourceData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={(entry) => `${entry.name}: ${entry.value}`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {sourceData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Performance Bars */}
            <Card>
              <CardHeader>
                <CardTitle>Campaign Performance</CardTitle>
                <CardDescription>Current campaign metrics and progress</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: 'Email Campaign', value: 85, color: 'bg-blue-500' },
                  { label: 'Social Media Ads', value: 70, color: 'bg-purple-500' },
                  { label: 'SEO Optimization', value: 90, color: 'bg-green-500' },
                  { label: 'Content Marketing', value: 60, color: 'bg-yellow-500' },
                ].map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between">
                      <span>{item.label}</span>
                      <span className="font-medium">{item.value}%</span>
                    </div>
                    <Progress value={item.value} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}