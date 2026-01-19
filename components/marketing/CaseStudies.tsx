'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  TrendingUp,
  Users,
  DollarSign,
  Clock,
  BarChart3,
  Target,
  Award,
  ExternalLink,
  Play,
  Download,
  Share2,
  Eye,
  Building,
  Globe,
  Smartphone
} from 'lucide-react';

const caseStudies = [
  {
    id: '1',
    title: 'Enterprise SaaS Transformation',
    company: 'TechCorp Global',
    industry: 'Technology',
    duration: '6 months',
    results: [
      { metric: 'Revenue Growth', value: '142%', icon: TrendingUp },
      { metric: 'User Adoption', value: '89%', icon: Users },
      { metric: 'Cost Reduction', value: '45%', icon: DollarSign },
    ],
    description: 'Transformed legacy systems into modern SaaS platform',
    tags: ['Digital Transformation', 'Cloud Migration', 'SaaS'],
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop',
  },
  {
    id: '2',
    title: 'E-commerce Platform Scaling',
    company: 'ShopFast Inc',
    industry: 'Retail',
    duration: '4 months',
    results: [
      { metric: 'Sales Increase', value: '230%', icon: DollarSign },
      { metric: 'Page Load Time', value: '1.2s', icon: Clock },
      { metric: 'Conversion Rate', value: '18%', icon: TrendingUp },
    ],
    description: 'Scaled e-commerce platform to handle 10x traffic',
    tags: ['E-commerce', 'Performance', 'Scaling'],
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w-800&auto=format&fit=crop',
  },
  {
    id: '3',
    title: 'Mobile App Launch Success',
    company: 'HealthTrack',
    industry: 'Healthcare',
    duration: '3 months',
    results: [
      { metric: 'App Downloads', value: '500K+', icon: Download },
      { metric: 'User Rating', value: '4.8/5', icon: Award },
      { metric: 'Active Users', value: '85%', icon: Users },
    ],
    description: 'Launched healthcare app with exceptional user adoption',
    tags: ['Mobile', 'Healthcare', 'User Experience'],
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w-800&auto=format&fit=crop',
  },
];

const industries = ['All', 'Technology', 'Retail', 'Healthcare', 'Finance', 'Education'];

export default function CaseStudies() {
  const [selectedIndustry, setSelectedIndustry] = useState('All');
  const [selectedCaseStudy, setSelectedCaseStudy] = useState(caseStudies[0]);

  const filteredStudies = selectedIndustry === 'All' 
    ? caseStudies 
    : caseStudies.filter(study => study.industry === selectedIndustry);

  const openCaseStudy = (study: typeof caseStudies[0]) => {
    setSelectedCaseStudy(study);
    // In production, this would open a detailed view
    alert(`Opening case study: ${study.title}`);
  };

  const downloadCaseStudy = (study: typeof caseStudies[0]) => {
    alert(`Downloading case study PDF: ${study.title}`);
  };

  const shareCaseStudy = (study: typeof caseStudies[0]) => {
    alert(`Sharing case study: ${study.title}`);
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-gradient-to-r from-green-500 to-teal-500">
            <BarChart3 className="w-3 h-3 mr-1" />
            Success Stories
          </Badge>
          <h2 className="text-4xl font-bold mb-4">Case Studies</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Real-world results from companies we've helped transform
          </p>
        </div>

        {/* Industry Filter */}
        <div className="flex justify-center mb-12">
          <Tabs value={selectedIndustry} onValueChange={setSelectedIndustry} className="w-full">
            <TabsList className="flex flex-wrap h-auto">
              {industries.map((industry) => (
                <TabsTrigger key={industry} value={industry} className="flex-1 min-w-[100px]">
                  {industry}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Case Studies Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredStudies.map((study, index) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-xl transition-shadow overflow-hidden">
                {/* Image Header */}
                <div className="h-48 bg-gradient-to-br from-blue-500 to-purple-600 relative">
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-white/20 backdrop-blur-sm text-white">
                      {study.industry}
                    </Badge>
                  </div>
                </div>

                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle className="text-xl">{study.title}</CardTitle>
                    <Button variant="ghost" size="icon" onClick={() => openCaseStudy(study)}>
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Building className="w-4 h-4" />
                    <span>{study.company}</span>
                    <Clock className="w-4 h-4 ml-2" />
                    <span>{study.duration}</span>
                  </div>
                </CardHeader>

                <CardContent>
                  <p className="text-gray-700 mb-4">{study.description}</p>
                  
                  {/* Results */}
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    {study.results.map((result, idx) => {
                      const Icon = result.icon;
                      return (
                        <div key={idx} className="text-center">
                          <div className="text-2xl font-bold text-blue-600">{result.value}</div>
                          <div className="text-xs text-gray-600 flex items-center justify-center gap-1">
                            <Icon className="w-3 h-3" />
                            {result.metric}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {study.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>

                <CardFooter className="border-t pt-4">
                  <div className="flex gap-2 w-full">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => openCaseStudy(study)}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => downloadCaseStudy(study)}
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => shareCaseStudy(study)}
                    >
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-16 pt-12 border-t"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
              <div className="text-gray-600">Successful Projects</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">95%</div>
              <div className="text-gray-600">Client Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">$2.5M</div>
              <div className="text-gray-600">Revenue Generated</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">24/7</div>
              <div className="text-gray-600">Support Coverage</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}