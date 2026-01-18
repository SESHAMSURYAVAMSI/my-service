'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Switch } from '@/app/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Progress } from '@/app/components/ui/progress';
import {
  CreditCard,
  Receipt,
  Download,
  Bell,
  Lock,
  Zap,
  Shield,
  Globe,
  CheckCircle2,
  XCircle,
  RefreshCw
} from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    price: '$29',
    period: '/month',
    features: [
      'Up to 5 projects',
      'Basic analytics',
      'Email support',
      '1 team member',
      '100GB storage'
    ],
    current: true
  },
  {
    name: 'Professional',
    price: '$79',
    period: '/month',
    features: [
      'Unlimited projects',
      'Advanced analytics',
      'Priority support',
      '10 team members',
      '1TB storage',
      'AI features'
    ],
    popular: true
  },
  {
    name: 'Enterprise',
    price: '$299',
    period: '/month',
    features: [
      'Everything in Pro',
      'Custom solutions',
      'Dedicated manager',
      'Unlimited team',
      'Unlimited storage',
      'SLA guarantee',
      'Custom integrations'
    ]
  }
];

const invoices = [
  { id: 'INV-001', date: 'Jan 15, 2024', amount: '$29.00', status: 'paid' },
  { id: 'INV-002', date: 'Feb 15, 2024', amount: '$29.00', status: 'paid' },
  { id: 'INV-003', date: 'Mar 15, 2024', amount: '$29.00', status: 'pending' },
  { id: 'INV-004', date: 'Apr 15, 2024', amount: '$79.00', status: 'upcoming' },
];

const usage = {
  storage: { used: 42, total: 100, unit: 'GB' },
  projects: { used: 3, total: 5 },
  apiCalls: { used: 1250, total: 5000 },
};

export default function SubscriptionManager() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [autoRenew, setAutoRenew] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleUpgrade = (plan: string) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      alert(`Upgrading to ${plan} plan...`);
      setLoading(false);
    }, 1500);
  };

  const downloadInvoice = (id: string) => {
    alert(`Downloading invoice ${id}`);
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Subscription Management</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Manage your plan, billing, and usage in one place
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Current Plan */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Current Plan</CardTitle>
                  <CardDescription>Your active subscription details</CardDescription>
                </div>
                <Badge className="bg-green-100 text-green-800">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  Active
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Zap className="w-4 h-4" />
                    <span>Plan</span>
                  </div>
                  <p className="text-2xl font-bold">Starter</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <CreditCard className="w-4 h-4" />
                    <span>Next Billing</span>
                  </div>
                  <p className="text-2xl font-bold">$29.00</p>
                  <p className="text-sm text-gray-600">on Apr 15, 2024</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Shield className="w-4 h-4" />
                    <span>Status</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <p className="text-lg font-semibold">Active</p>
                  </div>
                </div>
              </div>

              {/* Usage Stats */}
              <div className="mt-8 space-y-6">
                <h3 className="font-semibold">Usage This Month</h3>
                {Object.entries(usage).map(([key, data]) => (
                  <div key={key}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                      <span>{'used' in data ? `${data.used}/${data.total} ${data.unit || ''}` : `${data.used}/${data.total}`}</span>
                    </div>
                    <Progress value={(data.used / data.total) * 100} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Billing Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Billing Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Auto-renew</p>
                  <p className="text-sm text-gray-600">Automatically renew subscription</p>
                </div>
                <Switch checked={autoRenew} onCheckedChange={setAutoRenew} />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-gray-600">Receive billing alerts</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div>
                <p className="font-medium mb-2">Payment Method</p>
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <div className="w-10 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded" />
                  <div>
                    <p className="font-medium">•••• 4242</p>
                    <p className="text-sm text-gray-600">Expires 12/25</p>
                  </div>
                  <Button variant="ghost" size="sm" className="ml-auto">
                    Edit
                  </Button>
                </div>
              </div>

              <Button className="w-full" variant="outline">
                <Globe className="w-4 h-4 mr-2" />
                Update Billing Address
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Pricing Plans */}
        <div className="mb-12">
          <div className="flex items-center justify-center mb-8">
            <Tabs
              value={billingCycle}
              onValueChange={(v: 'monthly' | 'annual') => setBillingCycle(v)}
              className="w-[400px]"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                <TabsTrigger value="annual">
                  Annual <Badge className="ml-2 bg-green-100 text-green-800">Save 20%</Badge>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={
                  plan.popular 
                    ? 'border-2 border-blue-500 shadow-xl relative' 
                    : 'hover:shadow-lg transition-shadow'
                }>
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-gradient-to-r from-blue-500 to-purple-500">
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  {plan.current && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Current Plan
                      </Badge>
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle>{plan.name}</CardTitle>
                    <div className="flex items-baseline">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-gray-600">{plan.period}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <ul className="space-y-3">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className="w-full"
                      variant={plan.popular ? 'default' : 'outline'}
                      disabled={plan.current || loading}
                      onClick={() => handleUpgrade(plan.name)}
                    >
                      {plan.current ? 'Current Plan' : plan.popular ? 'Upgrade Now' : 'Get Started'}
                      {loading && <RefreshCw className="w-4 h-4 ml-2 animate-spin" />}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Invoice History */}
        <Card>
          <CardHeader>
            <CardTitle>Invoice History</CardTitle>
            <CardDescription>Download past invoices and receipts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {invoices.map((invoice) => (
                <div
                  key={invoice.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-gray-100 rounded">
                      <Receipt className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-medium">{invoice.id}</p>
                      <p className="text-sm text-gray-600">{invoice.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="text-lg font-bold">{invoice.amount}</p>
                    <Badge
                      className={
                        invoice.status === 'paid'
                          ? 'bg-green-100 text-green-800'
                          : invoice.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-blue-100 text-blue-800'
                      }
                    >
                      {invoice.status}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => downloadInvoice(invoice.id)}
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}