'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Textarea } from '@/app/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Badge } from '@/app/components/ui/badge';
import { Progress } from '@/app/components/ui/progress';
import { Switch } from '@/app/components/ui/switch';
import { Slider } from '@/app/components/ui/slider';
import { Label } from '@/app/components/ui/label';
import {
  Bot,
  Sparkles,
  Copy,
  Download,
  RefreshCw,
  Zap,
  FileText,
  Image,
  Video,
  Music,
  Code,
  Brain,
  Clock,
  BarChart3,
  Globe,
  Users,
  TrendingUp,
  Target,
  CheckCircle2,
  AlertCircle,
  Send,
  Settings,
  Wand2,
  Hash,
  Type,
  Eye,
  Shield
} from 'lucide-react';

// Add Mail icon
const Mail = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2"/>
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
  </svg>
);

const contentTypes = [
  { id: 'blog', label: 'Blog Post', icon: FileText, color: 'text-blue-500', description: 'Long-form articles and guides' },
  { id: 'social', label: 'Social Media', icon: Users, color: 'text-purple-500', description: 'Posts for social platforms' },
  { id: 'ad', label: 'Ad Copy', icon: TrendingUp, color: 'text-green-500', description: 'Advertising and marketing copy' },
  { id: 'seo', label: 'SEO Meta', icon: Globe, color: 'text-yellow-500', description: 'SEO titles and descriptions' },
  { id: 'email', label: 'Email Campaign', icon: Mail, color: 'text-red-500', description: 'Newsletters and campaigns' },
  { id: 'video', label: 'Video Script', icon: Video, color: 'text-pink-500', description: 'Scripts for videos' },
  { id: 'product', label: 'Product Description', icon: Type, color: 'text-indigo-500', description: 'E-commerce descriptions' },
  { id: 'code', label: 'Code Generation', icon: Code, color: 'text-gray-500', description: 'Generate code snippets' },
];

const toneOptions = [
  { value: 'professional', label: 'Professional', description: 'Formal and business-like' },
  { value: 'casual', label: 'Casual', description: 'Friendly and conversational' },
  { value: 'friendly', label: 'Friendly', description: 'Warm and approachable' },
  { value: 'formal', label: 'Formal', description: 'Highly structured and proper' },
  { value: 'humorous', label: 'Humorous', description: 'Funny and entertaining' },
  { value: 'persuasive', label: 'Persuasive', description: 'Convincing and compelling' },
  { value: 'educational', label: 'Educational', description: 'Informative and instructive' },
  { value: 'inspirational', label: 'Inspirational', description: 'Motivational and uplifting' },
];

const aiModels = [
  { id: 'gpt-4', name: 'GPT-4 Turbo', description: 'Most advanced model', maxTokens: 128000, speed: 'Fast', accuracy: '95%' },
  { id: 'claude-3', name: 'Claude 3', description: 'Best for long content', maxTokens: 200000, speed: 'Medium', accuracy: '96%' },
  { id: 'gemini-pro', name: 'Gemini Pro', description: 'Fast & accurate', maxTokens: 32768, speed: 'Very Fast', accuracy: '94%' },
  { id: 'llama-2', name: 'Llama 2', description: 'Open source', maxTokens: 4096, speed: 'Slow', accuracy: '92%' },
  { id: 'mixtral', name: 'Mixtral 8x7B', description: 'High quality output', maxTokens: 32768, speed: 'Medium', accuracy: '93%' },
];

const templates = [
  { name: 'Blog Post Outline', prompt: 'Create a detailed blog post outline about [topic]' },
  { name: 'Social Media Post', prompt: 'Write a engaging social media post for [platform] about [topic]' },
  { name: 'Product Description', prompt: 'Create a compelling product description for [product]' },
  { name: 'Email Newsletter', prompt: 'Write a weekly email newsletter about [topic]' },
  { name: 'SEO Meta Description', prompt: 'Generate SEO meta description for [page] targeting [keywords]' },
  { name: 'Video Script', prompt: 'Write a video script about [topic] for [duration] minutes' },
];

export default function AIContentStudio() {
  const [prompt, setPrompt] = useState('');
  const [selectedType, setSelectedType] = useState('blog');
  const [tone, setTone] = useState('professional');
  const [length, setLength] = useState(500);
  const [creativity, setCreativity] = useState([7]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState('');
  const [history, setHistory] = useState<any[]>([]);
  const [selectedModel, setSelectedModel] = useState('gpt-4');
  const [autoOptimize, setAutoOptimize] = useState(true);
  const [includeSEO, setIncludeSEO] = useState(true);
  const [includeCTA, setIncludeCTA] = useState(true);
  const [includeKeywords, setIncludeKeywords] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [qualityScore, setQualityScore] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (generatedContent) {
      const words = generatedContent.trim().split(/\s+/).length;
      const chars = generatedContent.length;
      setWordCount(words);
      setCharCount(chars);
      setQualityScore(Math.min(Math.round((words / length) * 100), 100));
    }
  }, [generatedContent, length]);

  const generateContent = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    setGeneratedContent('');
    setIsTyping(true);
    
    // Simulate AI thinking
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Sample responses based on content type
    const responses: Record<string, string[]> = {
      blog: [
        "# The Future of AI in Digital Marketing\n\n",
        "## Introduction\nArtificial Intelligence is revolutionizing the digital marketing landscape at an unprecedented pace...\n\n",
        "## Key Trends in 2024\n1. **Hyper-Personalization**: AI enables real-time personalization at scale.\n2. **Predictive Analytics**: Forecast customer behavior with 95% accuracy.\n3. **Automated Content Creation**: Generate high-quality content in seconds.\n4. **Voice Search Optimization**: Optimize for voice-first interactions.\n5. **Visual Search**: AI-powered image recognition for e-commerce.\n\n",
        "## Implementation Strategies\n- Start with data collection and analysis\n- Implement AI tools gradually\n- Train your team on AI technologies\n- Measure and optimize continuously\n\n",
        "## Case Study: Company X\nIncreased conversion rates by 42% using AI-powered personalization...\n\n",
        "## Conclusion\nThe integration of AI in digital marketing is no longer optional. Businesses that embrace AI will gain a competitive edge...\n"
      ],
      social: [
        "🌟 Exciting News! 🌟\n\n",
        "AI is changing the game in digital marketing! Here's how:\n\n",
        "🔥 Hyper-personalization at scale\n🚀 Predictive analytics with 95% accuracy\n💡 Automated content creation\n🎯 Voice search optimization\n👁️ Visual search capabilities\n\n",
        "Ready to transform your marketing strategy? Let's chat! 👇\n\n",
        "#AI #DigitalMarketing #Innovation #Tech #Marketing"
      ],
      email: [
        "Subject: Transform Your Marketing with AI\n\n",
        "Hi [Name],\n\n",
        "I hope this email finds you well!\n\n",
        "I wanted to share some exciting insights about how AI is revolutionizing digital marketing...\n\n",
        "**Key Benefits:**\n✅ 42% increase in conversion rates\n✅ 65% reduction in content creation time\n✅ 95% accuracy in customer predictions\n✅ 24/7 automated optimization\n\n",
        "**Ready to get started?**\n[Schedule a call] with our experts to discuss how AI can transform your marketing strategy.\n\n",
        "Best regards,\nThe ServicePro Team\n\n",
        "P.S. Limited spots available for our AI strategy workshop next week!"
      ],
      default: [
        "Based on your input, here's the generated content:\n\n",
        "This section demonstrates the power of AI content generation. The system analyzes your requirements and produces high-quality, engaging content tailored to your specific needs.\n\n",
        "**Key Features:**\n- SEO optimized\n- Tone-appropriate\n- Industry-specific\n- Engaging structure\n- Actionable insights\n\n",
        "The content is ready for immediate use or further customization."
      ]
    };

    const selectedResponses = responses[selectedType] || responses.default;
    
    let fullContent = '';
    for (let i = 0; i < selectedResponses.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 300 + Math.random() * 200));
      fullContent += selectedResponses[i];
      setGeneratedContent(fullContent);
    }

    // Add to history
    const newEntry = {
      id: Date.now(),
      prompt,
      type: selectedType,
      content: fullContent,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      model: selectedModel,
      wordCount: fullContent.trim().split(/\s+/).length
    };
    
    setHistory(prev => [newEntry, ...prev.slice(0, 9)]);
    setIsGenerating(false);
    setIsTyping(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedContent);
  };

  const downloadContent = () => {
    const blob = new Blob([generatedContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai-content-${selectedType}-${Date.now()}.txt`;
    a.click();
  };

  const regenerate = () => {
    setGeneratedContent('');
    generateContent();
  };

  const applyTemplate = (templatePrompt: string) => {
    setPrompt(templatePrompt);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const analyzeContent = () => {
    // Simulate content analysis
    const score = Math.floor(Math.random() * 40) + 60;
    const readability = ['Good', 'Excellent', 'Average'][Math.floor(Math.random() * 3)];
    const sentiment = ['Positive', 'Neutral', 'Engaging'][Math.floor(Math.random() * 3)];
    
    alert(`Content Analysis:\n\nQuality Score: ${score}/100\nReadability: ${readliness}\nSentiment: ${sentiment}\nWord Count: ${wordCount}\nSEO Score: ${includeSEO ? '85/100' : 'Not optimized'}`);
  };

  const optimizeContent = () => {
    if (!generatedContent) return;
    
    // Simulate optimization
    const optimized = generatedContent + "\n\n[AI Optimized]\n✓ SEO Enhanced\n✓ Readability Improved\n✓ Keywords Added\n✓ Call-to-Action Included";
    setGeneratedContent(optimized);
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white via-blue-50/50 to-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 px-4 py-1.5 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
            <Brain className="w-3 h-3 mr-1" />
            AI-Powered Studio
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            AI Content Studio
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            Generate high-quality content in seconds with advanced AI models. Perfect for blogs, social media, ads, and more.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Panel - Controls */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="border-2 border-gray-100 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Settings className="w-5 h-5 text-blue-600" />
                  Content Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Content Type Selection */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">Content Type</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {contentTypes.map((type) => (
                      <motion.button
                        key={type.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedType(type.id)}
                        className={`flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all ${
                          selectedType === type.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <type.icon className={`w-5 h-5 mb-2 ${type.color}`} />
                        <span className="text-sm font-medium">{type.label}</span>
                        <span className="text-xs text-gray-500 mt-1">{type.description}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* AI Model Selection */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">AI Model</Label>
                  <Select value={selectedModel} onValueChange={setSelectedModel}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select model" />
                    </SelectTrigger>
                    <SelectContent>
                      {aiModels.map((model) => (
                        <SelectItem key={model.id} value={model.id}>
                          <div className="flex items-start justify-between">
                            <div>
                              <span className="font-medium">{model.name}</span>
                              <p className="text-xs text-gray-500">{model.description}</p>
                            </div>
                            <Badge variant="outline" className="ml-2">
                              {model.maxTokens.toLocaleString()}
                            </Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Tone Selection */}
                <div>
                  <Label className="text-sm font-medium mb-2 block">Tone & Style</Label>
                  <Select value={tone} onValueChange={setTone}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select tone" />
                    </SelectTrigger>
                    <SelectContent>
                      {toneOptions.map((toneOption) => (
                        <SelectItem key={toneOption.value} value={toneOption.value}>
                          <div>
                            <span>{toneOption.label}</span>
                            <p className="text-xs text-gray-500">{toneOption.description}</p>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Length Slider */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Label className="text-sm font-medium">Content Length</Label>
                    <span className="text-sm font-medium">{length} words</span>
                  </div>
                  <Slider
                    value={[length]}
                    onValueChange={(value) => setLength(value[0])}
                    min={100}
                    max={2000}
                    step={50}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Short</span>
                    <span>Medium</span>
                    <span>Long</span>
                  </div>
                </div>

                {/* Creativity Slider */}
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <Label className="text-sm font-medium">Creativity Level</Label>
                    <span className="text-sm font-medium">{creativity[0]}/10</span>
                  </div>
                  <Slider
                    value={creativity}
                    onValueChange={setCreativity}
                    min={1}
                    max={10}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Conservative</span>
                    <span>Balanced</span>
                    <span>Creative</span>
                  </div>
                </div>

                {/* Advanced Options */}
                <div className="space-y-4 pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Auto-Optimize</p>
                      <p className="text-sm text-gray-600">Improve content automatically</p>
                    </div>
                    <Switch checked={autoOptimize} onCheckedChange={setAutoOptimize} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Include SEO</p>
                      <p className="text-sm text-gray-600">Add keywords and meta tags</p>
                    </div>
                    <Switch checked={includeSEO} onCheckedChange={setIncludeSEO} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Add CTA</p>
                      <p className="text-sm text-gray-600">Include call-to-action</p>
                    </div>
                    <Switch checked={includeCTA} onCheckedChange={setIncludeCTA} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Keywords</p>
                      <p className="text-sm text-gray-600">Include target keywords</p>
                    </div>
                    <Switch checked={includeKeywords} onCheckedChange={setIncludeKeywords} />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Templates */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Wand2 className="w-4 h-4" />
                  Quick Templates
                </CardTitle>
                <CardDescription>Get started quickly</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {templates.map((template, idx) => (
                    <Button
                      key={idx}
                      variant="outline"
                      className="w-full justify-start text-left h-auto py-3"
                      onClick={() => applyTemplate(template.prompt)}
                    >
                      <div>
                        <p className="font-medium text-sm">{template.name}</p>
                        <p className="text-xs text-gray-500 truncate">{template.prompt}</p>
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <BarChart3 className="w-4 h-4" />
                  Usage Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Credits Used</span>
                    <span className="font-medium">142/500</span>
                  </div>
                  <Progress value={(142/500)*100} />
                </div>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">24</div>
                    <div className="text-sm text-gray-600">Today</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">1,248</div>
                    <div className="text-sm text-gray-600">Total</div>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Cost Saved</span>
                    <span className="font-bold text-green-600">$8,450</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Generation & Results */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-2 border-gray-100 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Bot className="w-5 h-5 text-purple-600" />
                  Content Generator
                </CardTitle>
                <CardDescription>
                  Describe what you want to create in detail. The more specific, the better!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Textarea
                    ref={textareaRef}
                    placeholder="Example: Write a blog post about AI marketing trends for 2024 targeting small business owners. Include statistics and actionable tips..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="min-h-[120px] text-base"
                    rows={4}
                  />
                  
                  <div className="flex flex-wrap gap-3">
                    <Button 
                      onClick={generateContent} 
                      disabled={isGenerating || !prompt.trim()}
                      className="flex-1 min-w-[140px]"
                    >
                      {isGenerating ? (
                        <>
                          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Zap className="w-4 h-4 mr-2" />
                          Generate Content
                        </>
                      )}
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      onClick={regenerate} 
                      disabled={!generatedContent || isGenerating}
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Regenerate
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      onClick={optimizeContent}
                      disabled={!generatedContent}
                    >
                      <Wand2 className="w-4 h-4 mr-2" />
                      Optimize
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      onClick={analyzeContent}
                      disabled={!generatedContent}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Analyze
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Generated Content */}
            <AnimatePresence>
              {(generatedContent || isGenerating) && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                >
                  <Card className="border-2 border-gray-100 shadow-lg">
                    <CardHeader>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <CardTitle>Generated Content</CardTitle>
                          <CardDescription>
                            {contentTypes.find(t => t.id === selectedType)?.label} • 
                            {toneOptions.find(t => t.value === tone)?.label} • 
                            ~{length} words
                          </CardDescription>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" onClick={copyToClipboard} disabled={!generatedContent}>
                            <Copy className="w-4 h-4 mr-2" />
                            Copy
                          </Button>
                          <Button size="sm" variant="outline" onClick={downloadContent} disabled={!generatedContent}>
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="relative">
                        {isTyping && (
                          <div className="absolute top-4 right-4 flex items-center gap-2">
                            <div className="flex gap-1">
                              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-75" />
                              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-150" />
                            </div>
                            <span className="text-sm text-gray-500">AI is typing...</span>
                          </div>
                        )}
                        
                        <div className="bg-gray-50 p-6 rounded-lg max-h-[400px] overflow-y-auto">
                          {generatedContent ? (
                            <div className="prose prose-lg max-w-none">
                              {generatedContent.split('\n').map((line, idx) => (
                                <p key={idx} className="mb-4 last:mb-0">
                                  {line}
                                </p>
                              ))}
                            </div>
                          ) : isGenerating ? (
                            <div className="text-center py-12">
                              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                              <h3 className="text-lg font-semibold mb-2">Generating Content</h3>
                              <p className="text-gray-600">Our AI is creating high-quality content for you...</p>
                            </div>
                          ) : null}
                        </div>
                        
                        {/* Content Stats */}
                        {generatedContent && (
                          <div className="mt-4 flex flex-wrap gap-4">
                            <Badge variant="outline" className="flex items-center gap-1">
                              <Hash className="w-3 h-3" />
                              {wordCount} words
                            </Badge>
                            <Badge variant="outline" className="flex items-center gap-1">
                              <Type className="w-3 h-3" />
                              {charCount} chars
                            </Badge>
                            <Badge variant="outline" className="flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3 text-green-500" />
                              {qualityScore}% match
                            </Badge>
                            <Badge variant="outline" className="flex items-center gap-1">
                              <Shield className="w-3 h-3 text-blue-500" />
                              {selectedModel.toUpperCase()}
                            </Badge>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Generation History */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Clock className="w-5 h-5" />
                  Recent Generations
                </CardTitle>
                <CardDescription>Your recent AI-generated content</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {history.length > 0 ? (
                    history.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="p-4 border rounded-lg hover:shadow-md transition-all cursor-pointer bg-white"
                        onClick={() => {
                          setPrompt(item.prompt);
                          setSelectedType(item.type);
                          setGeneratedContent(item.content);
                        }}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <p className="font-medium truncate">{item.prompt}</p>
                            <div className="flex items-center gap-2 mt-1 flex-wrap">
                              <Badge variant="outline" className="text-xs">
                                {contentTypes.find(t => t.id === item.type)?.label}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {item.model}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {item.wordCount} words
                              </Badge>
                              <span className="text-xs text-gray-500">
                                {item.timestamp}
                              </span>
                            </div>
                          </div>
                          <Button size="sm" variant="ghost">
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {item.content.substring(0, 150)}...
                        </p>
                      </motion.div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No generation history yet</p>
                      <p className="text-sm mt-1">Generate some content to see it here</p>
                    </div>
                  )}
                </div>
                
                {history.length > 0 && (
                  <div className="mt-6 pt-6 border-t">
                    <Button variant="outline" className="w-full">
                      View All History
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}