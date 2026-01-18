'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Maximize2,
  Settings,
  Download,
  Share2,
  Eye,
  Code,
  Smartphone,
  Monitor,
  Tablet,
  Zap,
  Clock,
  CheckCircle2
} from 'lucide-react';

const demos = [
  {
    id: 'dashboard',
    title: 'Analytics Dashboard',
    description: 'Real-time data visualization and insights',
    duration: '2:30',
    category: 'Analytics'
  },
  {
    id: 'editor',
    title: 'AI Content Editor',
    description: 'Smart writing assistant with AI suggestions',
    duration: '1:45',
    category: 'Content'
  },
  {
    id: 'collab',
    title: 'Team Collaboration',
    description: 'Real-time editing and communication tools',
    duration: '3:15',
    category: 'Collaboration'
  },
  {
    id: 'mobile',
    title: 'Mobile Experience',
    description: 'Native mobile app functionality',
    duration: '2:00',
    category: 'Mobile'
  },
];

const features = [
  { icon: Zap, title: 'Fast Performance', description: 'Lightning-fast load times' },
  { icon: Eye, title: 'Beautiful UI', description: 'Modern, intuitive interface' },
  { icon: Code, title: 'Clean Code', description: 'Well-structured and documented' },
  { icon: CheckCircle2, title: 'Reliable', description: '99.9% uptime guarantee' },
];

export default function DemoSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [selectedDemo, setSelectedDemo] = useState(demos[0]);
  const [device, setDevice] = useState('desktop');

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    // Simulate playback
    if (!isPlaying) {
      const interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= 150) { // 2:30 in seconds
            clearInterval(interval);
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-gradient-to-r from-green-500 to-teal-500">
            <Play className="w-3 h-3 mr-1" />
            Live Demos
          </Badge>
          <h2 className="text-4xl font-bold mb-4">Interactive Product Demos</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our platform through interactive demonstrations and see it in action
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Demo Player */}
          <div>
            <Card className="border-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{selectedDemo.title}</CardTitle>
                  <Badge variant="outline">{selectedDemo.category}</Badge>
                </div>
                <CardDescription>{selectedDemo.description}</CardDescription>
              </CardHeader>
              <CardContent>
                {/* Device Preview */}
                <div className="relative mb-6">
                  <div className={`relative mx-auto ${
                    device === 'desktop' ? 'w-full' :
                    device === 'tablet' ? 'w-96' :
                    'w-80'
                  }`}>
                    {/* Device Frame */}
                    <div className={`relative ${
                      device === 'desktop' ? 'rounded-lg' :
                      device === 'tablet' ? 'rounded-xl' :
                      'rounded-2xl'
                    } bg-gray-900 p-2`}>
                      {/* Screen */}
                      <div className={`bg-gradient-to-br from-blue-500 to-purple-600 ${
                        device === 'desktop' ? 'h-64' :
                        device === 'tablet' ? 'h-80' :
                        'h-96'
                      } rounded-lg flex items-center justify-center`}>
                        <div className="text-center text-white">
                          <div className="text-3xl font-bold mb-2">{selectedDemo.title}</div>
                          <p className="opacity-90">Interactive Demo</p>
                          {isPlaying && (
                            <div className="mt-4">
                              <div className="text-5xl font-bold animate-pulse">
                                {formatTime(currentTime)}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Device Controls */}
                    <div className="flex justify-center gap-2 mt-4">
                      <Button
                        variant={device === 'mobile' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setDevice('mobile')}
                      >
                        <Smartphone className="w-4 h-4" />
                      </Button>
                      <Button
                        variant={device === 'tablet' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setDevice('tablet')}
                      >
                        <Tablet className="w-4 h-4" />
                      </Button>
                      <Button
                        variant={device === 'desktop' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setDevice('desktop')}
                      >
                        <Monitor className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Player Controls */}
                <div className="space-y-4">
                  {/* Progress Bar */}
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{formatTime(currentTime)}</span>
                      <span>{selectedDemo.duration}</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${(currentTime / 150) * 100}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>

                  {/* Control Buttons */}
                  <div className="flex items-center justify-center gap-4">
                    <Button variant="ghost" size="icon">
                      <SkipBack className="w-5 h-5" />
                    </Button>
                    <Button
                      onClick={handlePlayPause}
                      size="lg"
                      className="w-16 h-16 rounded-full"
                    >
                      {isPlaying ? (
                        <Pause className="w-6 h-6" />
                      ) : (
                        <Play className="w-6 h-6" />
                      )}
                    </Button>
                    <Button variant="ghost" size="icon">
                      <SkipForward className="w-5 h-5" />
                    </Button>
                  </div>

                  {/* Additional Controls */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <Volume2 className="w-5 h-5" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Settings className="w-5 h-5" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                      <Button variant="outline" size="sm">
                        <Share2 className="w-4 h-4 mr-2" />
                        Share
                      </Button>
                      <Button variant="outline" size="sm">
                        <Maximize2 className="w-4 h-4 mr-2" />
                        Fullscreen
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Demo List & Features */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Available Demos</CardTitle>
                <CardDescription>Select a demo to preview</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {demos.map((demo) => (
                    <div
                      key={demo.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${
                        selectedDemo.id === demo.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'hover:border-gray-300 hover:bg-gray-50'
                      }`}
                      onClick={() => {
                        setSelectedDemo(demo);
                        setCurrentTime(0);
                        setIsPlaying(false);
                      }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                            <Play className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{demo.title}</h3>
                            <p className="text-sm text-gray-600">{demo.description}</p>
                          </div>
                        </div>
                        <Badge variant="outline">{demo.duration}</Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Category: {demo.category}</span>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>Duration: {demo.duration}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Key Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {features.map((feature, idx) => (
                    <div key={idx} className="p-4 border rounded-lg text-center">
                      <feature.icon className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                      <h4 className="font-semibold mb-1">{feature.title}</h4>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}