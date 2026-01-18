'use client';

import { useRef, useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { ZoomIn, RotateCw, Box, Cpu, Shield, Zap, Eye, Download, Star, Target, Layers, Globe } from 'lucide-react';

// We'll use a static 3D scene or fallback to CSS animations if Three.js fails
const ThreeSceneFallback = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative">
        {/* Animated floating cubes with CSS */}
        <div className="relative w-64 h-64">
          {/* Cube 1 */}
          <motion.div
            className="absolute w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl"
            animate={{
              y: [0, -20, 0],
              rotateX: [0, 180, 360],
              rotateY: [0, 180, 360],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{
              left: '20%',
              top: '30%',
            }}
          />
          
          {/* Cube 2 */}
          <motion.div
            className="absolute w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl"
            animate={{
              y: [0, 15, 0],
              rotateX: [0, -180, -360],
              rotateY: [0, -180, -360],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "linear",
              delay: 1
            }}
            style={{
              left: '60%',
              top: '20%',
            }}
          />
          
          {/* Cube 3 */}
          <motion.div
            className="absolute w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg"
            animate={{
              y: [0, -15, 0],
              rotateX: [0, 90, 180, 270, 360],
              rotateY: [0, 90, 180, 270, 360],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
              delay: 2
            }}
            style={{
              left: '40%',
              top: '60%',
            }}
          />
          
          {/* Floating particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              animate={{
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
        
        {/* Center logo/text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
              <Zap className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white">ServicePro 3D</h3>
            <p className="text-gray-300">Interactive Experience</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default function InteractiveShowcase() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const features = [
    { icon: Cpu, title: 'AI Processing', description: 'Real-time AI analysis and processing', color: 'text-blue-400' },
    { icon: Shield, title: 'Secure', description: 'Enterprise-grade security protocols', color: 'text-green-400' },
    { icon: Zap, title: 'Fast', description: 'Lightning-fast performance', color: 'text-yellow-400' },
    { icon: Box, title: 'Scalable', description: 'Grows with your business', color: 'text-purple-400' },
    { icon: Layers, title: 'Modular', description: 'Plug-and-play components', color: 'text-pink-400' },
    { icon: Globe, title: 'Global', description: 'Worldwide coverage', color: 'text-cyan-400' },
  ];

  const specifications = [
    { label: 'Processing Power', value: '64 Cores', unit: 'CPU' },
    { label: 'Memory', value: '256 GB', unit: 'RAM' },
    { label: 'Storage', value: '2 TB', unit: 'NVMe SSD' },
    { label: 'Network', value: '10 Gbps', unit: 'Bandwidth' },
    { label: 'Uptime', value: '99.99%', unit: 'SLA' },
    { label: 'Response Time', value: '< 50ms', unit: 'Latency' },
  ];

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
    
    setRotation({ x: y, y: x });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-900 via-gray-900 to-black text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-4 bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-1.5">
              <Star className="w-3 h-3 mr-1" />
              Interactive 3D
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Interactive Product Showcase
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Explore our platform with immersive 3D visualization and interactive controls
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* 3D Canvas Container */}
          <div className={`${isFullscreen ? 'fixed inset-0 z-50' : ''} relative`}>
            <div 
              ref={containerRef}
              className={`relative rounded-2xl overflow-hidden border-2 border-gray-800 bg-gradient-to-br from-gray-900 via-black to-gray-900 ${
                isFullscreen ? 'h-screen' : 'h-[500px] lg:h-[600px]'
              }`}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
                transition: 'transform 0.1s ease-out',
              }}
            >
              <Suspense fallback={
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-400">Loading 3D Experience...</p>
                  </div>
                </div>
              }>
                <ThreeSceneFallback />
              </Suspense>
              
              {/* Interactive Controls Overlay */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    className="bg-white/10 backdrop-blur-sm hover:bg-white/20 border-white/20"
                    onClick={() => setIsFullscreen(!isFullscreen)}
                  >
                    <ZoomIn className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="bg-white/10 backdrop-blur-sm hover:bg-white/20 border-white/20"
                    onClick={() => setRotation({ x: 0, y: 0 })}
                  >
                    <RotateCw className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="text-sm text-gray-300 bg-black/50 px-3 py-1 rounded-full">
                  Move mouse to rotate • Scroll to zoom
                </div>
              </div>
              
              {/* Performance Indicators */}
              <div className="absolute top-4 right-4 flex gap-3">
                <div className="bg-black/50 backdrop-blur-sm px-3 py-2 rounded-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">144 FPS</span>
                  </div>
                </div>
                <div className="bg-black/50 backdrop-blur-sm px-3 py-2 rounded-lg">
                  <div className="text-sm">
                    <span className="font-medium">GPU: </span>
                    <span className="text-green-400">68%</span>
                  </div>
                </div>
              </div>
            </div>
            
            {isFullscreen && (
              <Button
                className="absolute top-4 left-4 z-10 bg-red-600 hover:bg-red-700"
                onClick={() => setIsFullscreen(false)}
              >
                Exit Fullscreen
              </Button>
            )}
          </div>

          {/* Controls & Information Panel */}
          <div className="space-y-6">
            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Target className="w-6 h-6 text-blue-400" />
                  Product Features
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Interactive exploration of our platform capabilities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid grid-cols-3 bg-gray-900">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="specs">Specifications</TabsTrigger>
                    <TabsTrigger value="tech">Technology</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="space-y-6 mt-6">
                    <div className="grid grid-cols-2 gap-4">
                      {features.map((feature, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          whileHover={{ scale: 1.05 }}
                          className="p-4 bg-gray-900/50 rounded-xl border border-gray-800 hover:border-gray-700 transition-all"
                        >
                          <div className="flex items-start gap-3">
                            <div className={`p-2 rounded-lg bg-gray-800 ${feature.color}`}>
                              <feature.icon className="w-5 h-5" />
                            </div>
                            <div>
                              <h4 className="font-semibold mb-1">{feature.title}</h4>
                              <p className="text-sm text-gray-400">{feature.description}</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    
                    <div className="pt-6 border-t border-gray-700">
                      <h4 className="font-semibold mb-3 text-lg">Interactive Controls</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 p-3 bg-gray-900 rounded-lg">
                            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                            <span className="text-sm">Left Click + Drag</span>
                          </div>
                          <p className="text-xs text-gray-500">Rotate 3D view</p>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 p-3 bg-gray-900 rounded-lg">
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            <span className="text-sm">Scroll Wheel</span>
                          </div>
                          <p className="text-xs text-gray-500">Zoom in/out</p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="specs" className="mt-6">
                    <div className="grid grid-cols-2 gap-4">
                      {specifications.map((spec, idx) => (
                        <div key={idx} className="p-4 bg-gray-900/50 rounded-xl border border-gray-800">
                          <p className="text-sm text-gray-400 mb-1">{spec.label}</p>
                          <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-bold">{spec.value}</span>
                            <span className="text-gray-500">{spec.unit}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="tech" className="mt-6">
                    <div className="space-y-4">
                      <div className="p-4 bg-gradient-to-r from-blue-900/30 to-purple-900/30 rounded-xl border border-blue-800/50">
                        <h4 className="font-semibold mb-2">WebGL & Three.js</h4>
                        <p className="text-sm text-gray-400">
                          Real-time 3D rendering using WebGL 2.0 for immersive experiences
                        </p>
                      </div>
                      <div className="p-4 bg-gradient-to-r from-green-900/30 to-teal-900/30 rounded-xl border border-green-800/50">
                        <h4 className="font-semibold mb-2">React Three Fiber</h4>
                        <p className="text-sm text-gray-400">
                          React renderer for Three.js enabling declarative 3D scenes
                        </p>
                      </div>
                      <div className="p-4 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-xl border border-purple-800/50">
                        <h4 className="font-semibold mb-2">Framer Motion</h4>
                        <p className="text-sm text-gray-400">
                          Advanced animations and interactive controls
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="mt-8 pt-6 border-t border-gray-700">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90">
                      <Download className="w-4 h-4 mr-2" />
                      Download 3D Model
                    </Button>
                    <Button variant="outline" className="border-gray-700 hover:bg-gray-800">
                      View Documentation
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  Live Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>GPU Usage</span>
                      <span className="font-medium">68%</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                        initial={{ width: 0 }}
                        animate={{ width: '68%' }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Render Speed</span>
                      <span className="font-medium">144 FPS</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-green-500 to-teal-500"
                        initial={{ width: 0 }}
                        animate={{ width: '90%' }}
                        transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Memory Usage</span>
                      <span className="font-medium">42%</span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-orange-500 to-red-500"
                        initial={{ width: 0 }}
                        animate={{ width: '42%' }}
                        transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-700">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-blue-400">16ms</div>
                      <div className="text-xs text-gray-400">Frame Time</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-400">99.9%</div>
                      <div className="text-xs text-gray-400">Stability</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-400">4K</div>
                      <div className="text-xs text-gray-400">Resolution</div>
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