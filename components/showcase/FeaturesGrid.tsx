'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Zap,
  Shield,
  Lock,
  Globe,
  Users,
  Cloud,
  Code,
  BarChart3,
  Smartphone,
  Database,
  Cpu,
  Settings,
  CheckCircle2
} from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Optimized for speed with instant load times',
    color: 'from-yellow-500 to-orange-500'
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Bank-level security with encryption',
    color: 'from-green-500 to-emerald-500'
  },
  {
    icon: Lock,
    title: 'Privacy First',
    description: 'Your data stays yours, always',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Globe,
    title: 'Global Scale',
    description: 'Servers in 50+ countries worldwide',
    color: 'from-purple-500 to-pink-500'
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Real-time editing and communication',
    color: 'from-indigo-500 to-blue-500'
  },
  {
    icon: Cloud,
    title: 'Cloud Native',
    description: 'Built for the cloud from day one',
    color: 'from-gray-500 to-blue-500'
  },
  {
    icon: Code,
    title: 'Developer Friendly',
    description: 'Clean APIs and comprehensive docs',
    color: 'from-red-500 to-pink-500'
  },
  {
    icon: BarChart3,
    title: 'Advanced Analytics',
    description: 'Real-time insights and reporting',
    color: 'from-teal-500 to-green-500'
  },
  {
    icon: Smartphone,
    title: 'Mobile Optimized',
    description: 'Perfect experience on any device',
    color: 'from-violet-500 to-purple-500'
  },
  {
    icon: Database,
    title: 'Scalable Infrastructure',
    description: 'Grows with your business needs',
    color: 'from-orange-500 to-red-500'
  },
  {
    icon: Cpu,
    title: 'AI Powered',
    description: 'Smart features with machine learning',
    color: 'from-pink-500 to-rose-500'
  },
  {
    icon: Settings,
    title: 'Customizable',
    description: 'Tailor everything to your needs',
    color: 'from-cyan-500 to-blue-500'
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100
    }
  }
};

export default function FeaturesGrid() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-gradient-to-r from-blue-500 to-purple-500">
            <CheckCircle2 className="w-3 h-3 mr-1" />
            Feature Complete
          </Badge>
          <h2 className="text-4xl font-bold mb-4">Everything You Need</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A comprehensive suite of features designed to power your business
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {features.map((feature, idx) => (
            <motion.div key={idx} variants={itemVariants}>
              <Card className="h-full border hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 pt-12 border-t"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">99.9%</div>
              <div className="text-gray-600">Uptime SLA</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">50+</div>
              <div className="text-gray-600">Countries</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">10M+</div>
              <div className="text-gray-600">Users</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">24/7</div>
              <div className="text-gray-600">Support</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}