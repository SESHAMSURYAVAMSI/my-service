'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Mail, Send, Shield, Users, Zap } from 'lucide-react';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true);
      setIsLoading(false);
      setEmail('');
    }, 1500);
  };

  const benefits = [
    { icon: Zap, text: 'Weekly industry insights' },
    { icon: Shield, text: 'Exclusive security tips' },
    { icon: Users, text: 'Community updates' },
    { icon: CheckCircle2, text: 'No spam, ever' },
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-gradient-to-r from-blue-500 to-purple-500">
            <Mail className="w-3 h-3 mr-1" />
            Newsletter
          </Badge>
          <h2 className="text-4xl font-bold mb-4">Stay Updated</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get the latest insights, tips, and updates delivered to your inbox
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Newsletter Form */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="w-5 h-5" />
                Subscribe to Newsletter
              </CardTitle>
              <CardDescription>
                Join 10,000+ professionals who receive our weekly updates
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isSubscribed ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Successfully Subscribed!</h3>
                  <p className="text-gray-600 mb-6">
                    Thank you for joining our newsletter. Check your inbox for a confirmation email.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setIsSubscribed(false)}
                  >
                    Subscribe Another Email
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-medium">Interests (Optional)</label>
                    <div className="flex flex-wrap gap-2">
                      {['AI', 'Security', 'Development', 'Design', 'Marketing', 'Business'].map(
                        (interest) => (
                          <Badge key={interest} variant="outline" className="cursor-pointer hover:bg-gray-100">
                            {interest}
                          </Badge>
                        )
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <input
                      type="checkbox"
                      id="privacy"
                      defaultChecked
                      className="rounded"
                    />
                    <label htmlFor="privacy">
                      I agree to receive emails and accept the{' '}
                      <a href="#" className="text-blue-600 hover:underline">
                        privacy policy
                      </a>
                    </label>
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? 'Subscribing...' : 'Subscribe Now'}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          {/* Benefits */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>What You'll Get</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {benefits.map((benefit, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <benefit.icon className="w-5 h-5 text-blue-600" />
                      </div>
                      <span className="font-medium">{benefit.text}</span>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Stats */}
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-3xl font-bold text-blue-600">10K+</div>
                    <div className="text-sm text-gray-600">Subscribers</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-purple-600">99%</div>
                    <div className="text-sm text-gray-600">Open Rate</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Testimonial */}
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <p className="text-gray-700 italic">
                    "The insights from this newsletter have been invaluable for our team. 
                    We've implemented several recommendations that improved our workflow significantly."
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full" />
                    <div>
                      <p className="font-medium">Sarah Johnson</p>
                      <p className="text-sm text-gray-600">CTO, TechStart Inc.</p>
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