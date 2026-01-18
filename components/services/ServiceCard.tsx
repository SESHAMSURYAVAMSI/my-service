'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, ArrowRight, Star, Zap, Clock, Users } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  features: string[];
  price: string;
  period: string;
  popular?: boolean;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  delay?: number;
}

export default function ServiceCard({
  title,
  description,
  features,
  price,
  period,
  popular = false,
  icon: Icon,
  color,
  delay = 0
}: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ y: -5 }}
    >
      <Card className={`h-full border-2 relative ${popular ? 'border-blue-500 shadow-lg' : 'border-gray-200'}`}>
        {popular && (
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-1">
              <Star className="w-3 h-3 mr-1" />
              Most Popular
            </Badge>
          </div>
        )}

        <CardHeader>
          <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center mb-4`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <CardTitle className="text-xl">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex items-baseline">
            <span className="text-3xl font-bold">{price}</span>
            <span className="text-gray-500 ml-2">{period}</span>
          </div>

          <ul className="space-y-3">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4 text-sm text-gray-600 pt-4 border-t">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>24/7 Support</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>Team Access</span>
            </div>
            <div className="flex items-center gap-1">
              <Zap className="w-4 h-4" />
              <span>Fast Setup</span>
            </div>
          </div>
        </CardContent>

        <CardFooter>
          <Button className="w-full" size="lg">
            Get Started
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}