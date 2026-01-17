'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Smartphone,
  Download,
  QrCode,
  Apple,
  Play,
  Globe,
  Bell,
  Home,
  Search,
  User,
  Settings,
  BarChart3,
  MessageSquare,
  Calendar,
  FileText
} from 'lucide-react';

const appFeatures = [
  { icon: Bell, title: 'Push Notifications', description: 'Real-time updates' },
  { icon: BarChart3, title: 'Analytics', description: 'Track performance' },
  { icon: MessageSquare, title: 'Chat', description: 'Team communication' },
  { icon: Calendar, title: 'Scheduling', description: 'Meeting management' },
  { icon: FileText, title: 'Documents', description: 'Access files anywhere' },
  { icon: Globe, title: 'Offline Mode', description: 'Work without internet' },
];

const appScreens = [
  { id: 'dashboard', title: 'Dashboard', color: 'from-blue-500 to-purple-500' },
  { id: 'analytics', title: 'Analytics', color: 'from-green-500 to-teal-500' },
  { id: 'chat', title: 'Chat', color: 'from-pink-500 to-rose-500' },
  { id: 'projects', title: 'Projects', color: 'from-orange-500 to-yellow-500' },
];

export default function MobileAppPreview() {
  const [currentScreen, setCurrentScreen] = useState('dashboard');
  const [notifications, setNotifications] = useState(3);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    if (isDownloading && downloadProgress < 100) {
      const timer = setTimeout(() => {
        setDownloadProgress(prev => Math.min(prev + 10, 100));
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [isDownloading, downloadProgress]);

  const startDownload = () => {
    setIsDownloading(true);
    setDownloadProgress(0);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'dashboard':
        return (
          <div className="h-full bg-gradient-to-b from-blue-500 to-purple-600 text-white p-4">
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-bold">Dashboard</h3>
              <Badge className="bg-white/20">Today</Badge>
            </div>
            <div className="space-y-4">
              <div className="bg-white/20 p-4 rounded-xl">
                <p className="text-sm opacity-90">Active Projects</p>
                <p className="text-2xl font-bold">12</p>
              </div>
              <div className="bg-white/20 p-4 rounded-xl">
                <p className="text-sm opacity-90">Team Online</p>
                <p className="text-2xl font-bold">8/12</p>
              </div>
              <div className="grid grid-cols-3 gap-2 mt-8">
                <div className="text-center">
                  <Home className="w-6 h-6 mx-auto mb-1" />
                  <span className="text-xs">Home</span>
                </div>
                <div className="text-center">
                  <Search className="w-6 h-6 mx-auto mb-1" />
                  <span className="text-xs">Search</span>
                </div>
                <div className="text-center">
                  <User className="w-6 h-6 mx-auto mb-1" />
                  <span className="text-xs">Profile</span>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'analytics':
        return (
          <div className="h-full bg-gradient-to-b from-green-500 to-teal-600 text-white p-4">
            <h3 className="font-bold mb-8">Analytics</h3>
            <div className="space-y-6">
              <div className="h-2 bg-white/30 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-white"
                  initial={{ width: 0 }}
                  animate={{ width: '75%' }}
                  transition={{ duration: 1 }}
                />
              </div>
              <div className="h-2 bg-white/30 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-white"
                  initial={{ width: 0 }}
                  animate={{ width: '45%' }}
                  transition={{ duration: 1, delay: 0.2 }}
                />
              </div>
              <div className="h-2 bg-white/30 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-white"
                  initial={{ width: 0 }}
                  animate={{ width: '90%' }}
                  transition={{ duration: 1, delay: 0.4 }}
                />
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="h-full bg-gradient-to-b from-blue-500 to-purple-600 text-white p-4 flex items-center justify-center">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">ServicePro</div>
              <p className="opacity-90">Mobile App</p>
            </div>
          </div>
        );
    }
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-gradient-to-r from-blue-500 to-purple-500">
            <Smartphone className="w-3 h-3 mr-1" />
            Mobile Experience
          </Badge>
          <h2 className="text-4xl font-bold mb-4">Native Mobile App</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Take your work anywhere with our powerful mobile application
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Mobile Device Preview */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* iPhone Frame */}
              <div className="w-80 h-[600px] bg-gray-900 rounded-[3rem] p-2 shadow-2xl">
                {/* Notch */}
                <div className="w-40 h-6 bg-gray-900 rounded-b-2xl mx-auto mb-2"></div>
                
                {/* Screen */}
                <div className="bg-white rounded-[2.5rem] h-full overflow-hidden relative">
                  {/* Status Bar */}
                  <div className="h-6 bg-gradient-to-r from-blue-500 to-purple-500 px-6 flex items-center justify-between text-white text-xs">
                    <span>9:41</span>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 bg-white rounded-full" />
                      <div className="w-3 h-3 bg-white rounded-full" />
                      <div className="w-3 h-3 bg-white rounded-full" />
                    </div>
                  </div>

                  {/* App Content */}
                  <div className="h-[calc(100%-24px)]">
                    {renderScreen()}
                  </div>

                  {/* Home Indicator */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gray-800 rounded-full"></div>
                </div>
              </div>

              {/* Screen Navigation */}
              <div className="flex justify-center gap-4 mt-6">
                {appScreens.map((screen) => (
                  <Button
                    key={screen.id}
                    variant={currentScreen === screen.id ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setCurrentScreen(screen.id)}
                    className="capitalize"
                  >
                    {screen.title}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* App Info & Download */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Mobile App Features</CardTitle>
                <CardDescription>
                  Everything you need on your mobile device
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {appFeatures.map((feature, idx) => (
                    <div key={idx} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                      <feature.icon className="w-6 h-6 mb-2 text-blue-600" />
                      <h4 className="font-semibold mb-1">{feature.title}</h4>
                      <p className="text-sm text-gray-600">{feature.description}</p>
                    </div>
                  ))}
                </div>

                {/* Download Section */}
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3">Download Now</h4>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button className="flex-1">
                        <Apple className="w-5 h-5 mr-2" />
                        App Store
                      </Button>
                      <Button className="flex-1" variant="outline">
                        <Play className="w-5 h-5 mr-2" />
                        Google Play
                      </Button>
                    </div>
                  </div>

                  {/* Download Progress */}
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Download className="w-5 h-5 text-blue-600" />
                        <span className="font-medium">Desktop App</span>
                      </div>
                      <span className="text-sm">{downloadProgress}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${downloadProgress}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                    <Button
                      onClick={startDownload}
                      disabled={isDownloading}
                      className="w-full mt-4"
                    >
                      {isDownloading ? 'Downloading...' : 'Download Desktop App'}
                    </Button>
                  </div>

                  {/* QR Code */}
                  <div className="border rounded-lg p-6 text-center">
                    <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
                      <QrCode className="w-20 h-20 text-gray-700" />
                    </div>
                    <p className="text-sm text-gray-600 mb-2">Scan to download mobile app</p>
                    <p className="text-xs text-gray-500">or visit: app.servicepro.com</p>
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