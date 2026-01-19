'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Settings,
  Save,
  RefreshCw,
  Shield,
  Globe,
  Bell,
  Mail,
  Database,
  Cloud,
  Lock,
  Users,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';

export default function SystemSettings() {
  const [isSaving, setIsSaving] = useState(false);
  const [settings, setSettings] = useState({
    siteName: 'ServicePro',
    siteUrl: 'https://servicepro.com',
    adminEmail: 'admin@servicepro.com',
    supportEmail: 'support@servicepro.com',
    timezone: 'UTC',
    language: 'en',
    maintenanceMode: false,
    registrationEnabled: true,
    emailNotifications: true,
    analyticsEnabled: true,
    backupEnabled: true,
    apiEnabled: true,
  });

  const [apiKey, setApiKey] = useState('sk_prod_xxxxxxxxxxxxxxxxxxxxxxxx');
  const [showApiKey, setShowApiKey] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      alert('Settings saved successfully!');
    }, 1500);
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset all settings?')) {
      alert('Settings reset to defaults');
    }
  };

  const regenerateApiKey = () => {
    const newKey = `sk_prod_${Math.random().toString(36).substr(2, 32)}`;
    setApiKey(newKey);
    alert('API key regenerated!');
  };

  const timezones = [
    'UTC', 'America/New_York', 'America/Chicago', 'America/Denver', 'America/Los_Angeles',
    'Europe/London', 'Europe/Paris', 'Asia/Tokyo', 'Asia/Shanghai', 'Australia/Sydney'
  ];

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'ja', name: 'Japanese' },
    { code: 'zh', name: 'Chinese' },
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-gradient-to-r from-red-500 to-orange-500">
            <Settings className="w-3 h-3 mr-1" />
            System Configuration
          </Badge>
          <h2 className="text-4xl font-bold mb-4">System Settings</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Configure system-wide settings and preferences
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Settings Form */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>System Configuration</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={handleReset} className="border-gray-700">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Reset
                    </Button>
                    <Button onClick={handleSave} disabled={isSaving}>
                      <Save className="w-4 h-4 mr-2" />
                      {isSaving ? 'Saving...' : 'Save Changes'}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="general" className="w-full">
                  <TabsList className="grid grid-cols-4 bg-gray-900 mb-6">
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="security">Security</TabsTrigger>
                    <TabsTrigger value="notifications">Notifications</TabsTrigger>
                    <TabsTrigger value="advanced">Advanced</TabsTrigger>
                  </TabsList>

                  <TabsContent value="general" className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Site Name</label>
                        <Input
                          value={settings.siteName}
                          onChange={(e) => setSettings({...settings, siteName: e.target.value})}
                          className="bg-gray-900 border-gray-700"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Site URL</label>
                        <Input
                          value={settings.siteUrl}
                          onChange={(e) => setSettings({...settings, siteUrl: e.target.value})}
                          className="bg-gray-900 border-gray-700"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Admin Email</label>
                        <Input
                          type="email"
                          value={settings.adminEmail}
                          onChange={(e) => setSettings({...settings, adminEmail: e.target.value})}
                          className="bg-gray-900 border-gray-700"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Support Email</label>
                        <Input
                          type="email"
                          value={settings.supportEmail}
                          onChange={(e) => setSettings({...settings, supportEmail: e.target.value})}
                          className="bg-gray-900 border-gray-700"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Timezone</label>
                        <Select
                          value={settings.timezone}
                          onValueChange={(value) => setSettings({...settings, timezone: value})}
                        >
                          <SelectTrigger className="bg-gray-900 border-gray-700">
                            <Globe className="w-4 h-4 mr-2" />
                            <SelectValue placeholder="Select timezone" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-900 border-gray-700">
                            {timezones.map((tz) => (
                              <SelectItem key={tz} value={tz}>{tz}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Language</label>
                        <Select
                          value={settings.language}
                          onValueChange={(value) => setSettings({...settings, language: value})}
                        >
                          <SelectTrigger className="bg-gray-900 border-gray-700">
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-900 border-gray-700">
                            {languages.map((lang) => (
                              <SelectItem key={lang.code} value={lang.code}>
                                {lang.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="security" className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border border-gray-700 rounded-lg">
                        <div>
                          <p className="font-medium">Two-Factor Authentication</p>
                          <p className="text-sm text-gray-400">Require 2FA for admin access</p>
                        </div>
                        <Switch checked={true} />
                      </div>
                      <div className="flex items-center justify-between p-4 border border-gray-700 rounded-lg">
                        <div>
                          <p className="font-medium">Session Timeout</p>
                          <p className="text-sm text-gray-400">Auto-logout after 30 minutes</p>
                        </div>
                        <Switch checked={true} />
                      </div>
                      <div className="flex items-center justify-between p-4 border border-gray-700 rounded-lg">
                        <div>
                          <p className="font-medium">IP Whitelist</p>
                          <p className="text-sm text-gray-400">Restrict admin access to specific IPs</p>
                        </div>
                        <Switch checked={false} />
                      </div>
                    </div>

                    <div className="space-y-4 pt-6 border-t border-gray-700">
                      <h3 className="font-semibold">API Security</h3>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">API Key</label>
                        <div className="relative">
                          <Input
                            type={showApiKey ? "text" : "password"}
                            value={apiKey}
                            readOnly
                            className="bg-gray-900 border-gray-700 pr-24"
                          />
                          <div className="absolute right-0 top-0 flex">
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="h-full"
                              onClick={() => setShowApiKey(!showApiKey)}
                            >
                              {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </Button>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="h-full"
                              onClick={regenerateApiKey}
                            >
                              <RefreshCw className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="notifications" className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border border-gray-700 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Mail className="w-5 h-5 text-blue-400" />
                          <div>
                            <p className="font-medium">Email Notifications</p>
                            <p className="text-sm text-gray-400">Send email alerts for system events</p>
                          </div>
                        </div>
                        <Switch
                          checked={settings.emailNotifications}
                          onCheckedChange={(checked) => setSettings({...settings, emailNotifications: checked})}
                        />
                      </div>
                      <div className="flex items-center justify-between p-4 border border-gray-700 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Bell className="w-5 h-5 text-yellow-400" />
                          <div>
                            <p className="font-medium">System Alerts</p>
                            <p className="text-sm text-gray-400">Receive alerts for critical issues</p>
                          </div>
                        </div>
                        <Switch checked={true} />
                      </div>
                      <div className="flex items-center justify-between p-4 border border-gray-700 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Users className="w-5 h-5 text-green-400" />
                          <div>
                            <p className="font-medium">User Activity</p>
                            <p className="text-sm text-gray-400">Log and notify about user actions</p>
                          </div>
                        </div>
                        <Switch checked={true} />
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="advanced" className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border border-gray-700 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Cloud className="w-5 h-5 text-purple-400" />
                          <div>
                            <p className="font-medium">Maintenance Mode</p>
                            <p className="text-sm text-gray-400">Take site offline for maintenance</p>
                          </div>
                        </div>
                        <Switch
                          checked={settings.maintenanceMode}
                          onCheckedChange={(checked) => setSettings({...settings, maintenanceMode: checked})}
                        />
                      </div>
                      <div className="flex items-center justify-between p-4 border border-gray-700 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Users className="w-5 h-5 text-blue-400" />
                          <div>
                            <p className="font-medium">User Registration</p>
                            <p className="text-sm text-gray-400">Allow new user registration</p>
                          </div>
                        </div>
                        <Switch
                          checked={settings.registrationEnabled}
                          onCheckedChange={(checked) => setSettings({...settings, registrationEnabled: checked})}
                        />
                      </div>
                      <div className="flex items-center justify-between p-4 border border-gray-700 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Database className="w-5 h-5 text-green-400" />
                          <div>
                            <p className="font-medium">Automated Backups</p>
                            <p className="text-sm text-gray-400">Schedule automatic database backups</p>
                          </div>
                        </div>
                        <Switch
                          checked={settings.backupEnabled}
                          onCheckedChange={(checked) => setSettings({...settings, backupEnabled: checked})}
                        />
                      </div>
                      <div className="flex items-center justify-between p-4 border border-gray-700 rounded-lg">
                        <div className="flex items-center gap-3">
                          <Globe className="w-5 h-5 text-orange-400" />
                          <div>
                            <p className="font-medium">API Access</p>
                            <p className="text-sm text-gray-400">Enable external API access</p>
                          </div>
                        </div>
                        <Switch
                          checked={settings.apiEnabled}
                          onCheckedChange={(checked) => setSettings({...settings, apiEnabled: checked})}
                        />
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Status & Info */}
          <div className="space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                  System Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span>Web Server</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Online</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span>Database</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Healthy</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span>Cache</span>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Optimized</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" />
                      <span>Storage</span>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800">75% Used</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-yellow-400" />
                  Warnings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-yellow-900/30 border border-yellow-800 rounded-lg">
                    <p className="text-sm">Backup scheduled in 2 days</p>
                  </div>
                  <div className="p-3 bg-blue-900/30 border border-blue-800 rounded-lg">
                    <p className="text-sm">Update available for security patch</p>
                  </div>
                  <div className="p-3 bg-green-900/30 border border-green-800 rounded-lg">
                    <p className="text-sm">All systems operational</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start border-gray-700">
                    <Database className="w-4 h-4 mr-2" />
                    Run Backup Now
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-gray-700">
                    <Cloud className="w-4 h-4 mr-2" />
                    Clear Cache
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-gray-700">
                    <Shield className="w-4 h-4 mr-2" />
                    Security Scan
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-gray-700">
                    <Lock className="w-4 h-4 mr-2" />
                    Audit Logs
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}