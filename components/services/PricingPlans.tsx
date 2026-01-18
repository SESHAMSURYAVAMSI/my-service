'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { CheckCircle2, XCircle, Zap, Users, Globe, Shield, Clock, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

const plans = [
  {
    name: 'Starter',
    description: 'Perfect for small teams',
    monthlyPrice: 29,
    yearlyPrice: 290,
    features: [
      { text: 'Up to 5 projects', included: true },
      { text: 'Basic analytics', included: true },
      { text: 'Email support', included: true },
      { text: '1 team member', included: true },
      { text: '100GB storage', included: true },
      { text: 'API access', included: false },
      { text: 'Priority support', included: false },
      { text: 'Custom domain', included: false },
    ],
    buttonText: 'Get Started',
    popular: false,
    icon: Zap,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    name: 'Professional',
    description: 'For growing businesses',
    monthlyPrice: 79,
    yearlyPrice: 790,
    features: [
      { text: 'Unlimited projects', included: true },
      { text: 'Advanced analytics', included: true },
      { text: 'Priority support', included: true },
      { text: '10 team members', included: true },
      { text: '1TB storage', included: true },
      { text: 'API access', included: true },
      { text: 'Custom integrations', included: false },
      { text: 'Custom domain', included: true },
    ],
    buttonText: 'Try Free for 14 Days',
    popular: true,
    icon: Users,
    color: 'from-purple-500 to-pink-500'
  },
  {
    name: 'Enterprise',
    description: 'For large organizations',
    monthlyPrice: 199,
    yearlyPrice: 1990,
    features: [
      { text: 'Unlimited everything', included: true },
      { text: 'Enterprise analytics', included: true },
      { text: '24/7 phone support', included: true },
      { text: 'Unlimited team members', included: true },
      { text: 'Unlimited storage', included: true },
      { text: 'Advanced API', included: true },
      { text: 'Custom integrations', included: true },
      { text: 'SLA guarantee', included: true },
    ],
    buttonText: 'Contact Sales',
    popular: false,
    icon: Globe,
    color: 'from-orange-500 to-red-500'
  },
];

export default function PricingPlans() {
  const [isYearly, setIsYearly] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState('Professional');

  const handlePlanSelect = (planName: string) => {
    setSelectedPlan(planName);
    // In production, this would redirect to checkout
    alert(`Selected plan: ${planName}`);
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-gradient-to-r from-blue-500 to-purple-500">
            <Star className="w-3 h-3 mr-1" />
            Simple Pricing
          </Badge>
          <h2 className="text-4xl font-bold mb-4">Choose Your Perfect Plan</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Start with a free trial. No credit card required. Upgrade, downgrade, or cancel anytime.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center mb-12">
          <div className="bg-gray-100 rounded-full p-1 flex items-center">
            <span className={`px-6 py-2 rounded-full ${!isYearly ? 'bg-white shadow' : ''}`}>
              Monthly
            </span>
            <Switch
              checked={isYearly}
              onCheckedChange={setIsYearly}
              className="mx-4 data-[state=checked]:bg-green-500"
            />
            <div className="flex items-center gap-2">
              <span className={`px-6 py-2 rounded-full ${isYearly ? 'bg-white shadow' : ''}`}>
                Yearly
              </span>
              <Badge className="bg-green-100 text-green-800">
                Save 20%
              </Badge>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
            const period = isYearly ? '/year' : '/month';

            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}

                <Card className={cn(
                  "h-full border-2 transition-all hover:shadow-xl",
                  selectedPlan === plan.name ? 'border-blue-500' : 'border-gray-200',
                  plan.popular ? 'shadow-lg' : ''
                )}>
                  <CardHeader className="text-center">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${plan.color} flex items-center justify-center`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                    
                    <div className="mt-6">
                      <div className="flex items-baseline justify-center">
                        <span className="text-5xl font-bold">${price}</span>
                        <span className="text-gray-500 ml-2">{period}</span>
                      </div>
                      {isYearly && (
                        <p className="text-sm text-gray-500 mt-2">
                          ${plan.monthlyPrice}/month billed annually
                        </p>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent>
                    <ul className="space-y-3">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center">
                          {feature.included ? (
                            <CheckCircle2 className="w-5 h-5 text-green-500 mr-3" />
                          ) : (
                            <XCircle className="w-5 h-5 text-gray-300 mr-3" />
                          )}
                          <span className={feature.included ? 'text-gray-800' : 'text-gray-400'}>
                            {feature.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>

                  <CardFooter>
                    <Button
                      onClick={() => handlePlanSelect(plan.name)}
                      className={cn(
                        "w-full",
                        plan.popular 
                          ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90" 
                          : "bg-gradient-to-r from-blue-600 to-cyan-600 hover:opacity-90"
                      )}
                    >
                      {plan.buttonText}
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Additional Info */}
        <div className="mt-16 pt-12 border-t">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Security First</h3>
              <p className="text-gray-600 text-sm">Enterprise-grade security with 99.9% uptime SLA</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600 text-sm">Round-the-clock support via chat, email, and phone</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                <Zap className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Easy Migration</h3>
              <p className="text-gray-600 text-sm">Free migration assistance from your current provider</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}