'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Progress } from '@/app/components/ui/progress';
import { Badge } from '@/app/components/ui/badge';
import { Loader2, Sparkles, Target, TrendingUp, Zap, Shield } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const services = {
  starter: {
    name: "Starter Package",
    description: "Perfect for small businesses",
    price: "$299/mo",
    features: ["Basic Website", "SEO Setup", "Email Support", "Monthly Reports"],
    aiScore: 65,
    icon: Target
  },
  growth: {
    name: "Growth Accelerator",
    description: "For scaling businesses",
    price: "$799/mo",
    features: ["Advanced Website", "Full SEO", "Social Media", "24/7 Support", "Analytics Dashboard"],
    aiScore: 85,
    icon: TrendingUp
  },
  enterprise: {
    name: "Enterprise Suite",
    description: "Complete digital transformation",
    price: "$1,999/mo",
    features: ["Custom Development", "AI Integration", "Dedicated Team", "Priority Support", "Advanced Analytics", "Security Suite"],
    aiScore: 95,
    icon: Shield
  },
  custom: {
    name: "AI-Optimized",
    description: "Tailored solution based on your needs",
    price: "Custom",
    features: ["AI-Powered Analytics", "Predictive Modeling", "Automation Tools", "Machine Learning"],
    aiScore: 100,
    icon: Zap
  }
};

const questions = [
  {
    id: 1,
    question: "What's your monthly marketing budget?",
    options: ["Under $500", "$500-$2,000", "$2,000-$5,000", "$5,000+"]
  },
  {
    id: 2,
    question: "What are your primary goals?",
    options: ["Increase Sales", "Brand Awareness", "Lead Generation", "Customer Retention"]
  },
  {
    id: 3,
    question: "What's your team size?",
    options: ["1-5", "6-20", "21-100", "100+"]
  },
  {
    id: 4,
    question: "How tech-savvy is your team?",
    options: ["Beginner", "Intermediate", "Advanced", "Expert"]
  }
];

export default function AIServiceRecommender() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [recommendation, setRecommendation] = useState<keyof typeof services | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { ref, inView } = useInView({ triggerOnce: true });

  const calculateRecommendation = () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const score = Object.values(answers).reduce((acc, ans, idx) => {
        return acc + (idx + 1) * 10;
      }, 0);
      
      let rec: keyof typeof services = 'starter';
      if (score > 80) rec = 'enterprise';
      else if (score > 60) rec = 'growth';
      else if (score > 40) rec = 'starter';
      
      setRecommendation(rec);
      setIsAnalyzing(false);
    }, 2000);
  };

  const handleAnswer = (questionId: number, answer: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      calculateRecommendation();
    }
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setAnswers({});
    setRecommendation(null);
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <Badge className="mb-4 bg-gradient-to-r from-blue-500 to-purple-500">
            <Sparkles className="w-3 h-3 mr-1" />
            AI-Powered
          </Badge>
          <h2 className="text-4xl font-bold mb-4">Find Your Perfect Service Plan</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our AI analyzes your business needs to recommend the optimal service package
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Quiz Section */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Target className="w-4 h-4 text-blue-600" />
                </div>
                Business Assessment
              </CardTitle>
              <CardDescription>
                Answer a few questions to get personalized recommendations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-8">
                <div className="flex justify-between text-sm mb-2">
                  <span>Progress</span>
                  <span>{Math.round((currentStep / questions.length) * 100)}%</span>
                </div>
                <Progress value={(currentStep / questions.length) * 100} />
              </div>

              <AnimatePresence mode="wait">
                {!recommendation ? (
                  <motion.div
                    key="quiz"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <h3 className="text-xl font-semibold mb-6">
                      {questions[currentStep].question}
                    </h3>
                    <div className="space-y-3">
                      {questions[currentStep].options.map((option, idx) => (
                        <Button
                          key={idx}
                          variant="outline"
                          className="w-full justify-start h-auto py-3 px-4 text-left hover:bg-blue-50 hover:border-blue-200"
                          onClick={() => handleAnswer(questions[currentStep].id, option)}
                        >
                          {option}
                        </Button>
                      ))}
                    </div>
                    
                    <div className="flex justify-between mt-8">
                      <Button
                        variant="ghost"
                        onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
                        disabled={currentStep === 0}
                      >
                        Back
                      </Button>
                      <Button
                        onClick={() => {
                          if (currentStep === questions.length - 1) {
                            calculateRecommendation();
                          } else {
                            setCurrentStep(prev => prev + 1);
                          }
                        }}
                        disabled={isAnalyzing}
                      >
                        {currentStep === questions.length - 1 ? 'Get Results' : 'Skip'}
                      </Button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-8"
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="w-12 h-12 animate-spin text-blue-500 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">AI Analyzing Your Business...</h3>
                        <p className="text-gray-600">Our AI is processing your answers to find the perfect match</p>
                      </>
                    ) : null}
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>

          {/* Results Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>AI Recommendation</span>
                  {recommendation && (
                    <Badge className="bg-green-100 text-green-800">
                      {services[recommendation].aiScore}% Match
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <AnimatePresence>
                  {recommendation ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="space-y-6"
                    >
                      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                            {(() => {
                              const Icon = services[recommendation].icon;
                              return <Icon className="w-6 h-6 text-white" />;
                            })()}
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold">{services[recommendation].name}</h3>
                            <p className="text-gray-600">{services[recommendation].description}</p>
                            <p className="text-3xl font-bold mt-2">{services[recommendation].price}</p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-3">Included Features:</h4>
                        <ul className="space-y-2">
                          {services[recommendation].features.map((feature, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-blue-500 rounded-full" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex gap-3">
                        <Button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600">
                          Select This Plan
                        </Button>
                        <Button variant="outline" onClick={resetQuiz}>
                          Retake Quiz
                        </Button>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="text-center py-12 text-gray-500">
                      <Target className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p>Complete the assessment to see your AI-recommended plan</p>
                    </div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>

            {/* All Plans */}
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(services).map(([key, service]) => (
                <Card key={key} className={
                  recommendation === key 
                    ? 'border-2 border-blue-500 shadow-lg' 
                    : 'opacity-80 hover:opacity-100 transition-opacity'
                }>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        recommendation === key 
                          ? 'bg-blue-100' 
                          : 'bg-gray-100'
                      }`}>
                        {(() => {
                          const Icon = service.icon;
                          return <Icon className={`w-4 h-4 ${
                            recommendation === key ? 'text-blue-600' : 'text-gray-600'
                          }`} />;
                        })()}
                      </div>
                      <span className="font-semibold">{service.name}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{service.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-bold">{service.price}</span>
                      <Badge variant="outline" className="text-xs">
                        {service.aiScore}% match
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}