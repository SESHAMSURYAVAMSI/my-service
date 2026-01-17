'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Users,
  Settings,
  Activity,
  Shield,
  Eye,
  EyeOff,
  Edit,
  Trash2,
  MoreVertical,
  UserPlus,
  Download,
  Filter,
  Search
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor' | 'viewer';
  status: 'active' | 'inactive' | 'pending';
  lastLogin: string;
}

interface SystemSetting {
  key: string;
  value: string;
  description: string;
  editable: boolean;
}

export default function AdminPanel() {
  const [users, setUsers] = useState<User[]>([
    { id: '1', name: 'Alex Johnson', email: 'alex@example.com', role: 'admin', status: 'active', lastLogin: '2 hours ago' },
    { id: '2', name: 'Sam Smith', email: 'sam@example.com', role: 'editor', status: 'active', lastLogin: 'Yesterday' },
    { id: '3', name: 'Taylor Brown', email: 'taylor@example.com', role: 'viewer', status: 'pending', lastLogin: 'Never' },
    { id: '4', name: 'Jordan Lee', email: 'jordan@example.com', role: 'editor', status: 'inactive', lastLogin: '1 week ago' },
  ]);

  const [systemSettings, setSystemSettings] = useState<SystemSetting[]>([
    { key: 'maintenance_mode', value: 'false', description: 'Enable maintenance mode', editable: true },
    { key: 'registration_enabled', value: 'true', description: 'Allow new user registration', editable: true },
    { key: 'api_rate_limit', value: '1000', description: 'API requests per hour', editable: true },
    { key: 'site_name', value: 'ServicePro', description: 'Website display name', editable: true },
    { key: 'version', value: '2.5.1', description: 'System version', editable: false },
  ]);

  const [analytics, setAnalytics] = useState({
    totalUsers: 1245,
    activeSessions: 42,
    storageUsed: '1.2TB',
    apiCalls: '12,450'
  });

  const getRoleColor = (role: User['role']) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'editor': return 'bg-blue-100 text-blue-800';
      case 'viewer': return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: User['status']) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
    }
  };

  const toggleUserStatus = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
        : user
    ));
  };

  const updateSetting = (key: string, value: string) => {
    setSystemSettings(settings =>
      settings.map(setting =>
        setting.key === key ? { ...setting, value } : setting
      )
    );
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold">Admin Control Panel</h2>
            <p className="text-gray-400">Manage users, settings, and system analytics</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="border-green-600 text-green-400">
              <Shield className="w-3 h-3 mr-1" />
              Administrator
            </Badge>
            <Button variant="outline" className="text-white border-gray-700">
              <Download className="w-4 h-4 mr-2" />
              Export Logs
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Total Users</p>
                  <p className="text-3xl font-bold">{analytics.totalUsers.toLocaleString()}</p>
                </div>
                <Users className="w-8 h-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Active Sessions</p>
                  <p className="text-3xl font-bold">{analytics.activeSessions}</p>
                </div>
                <Activity className="w-8 h-8 text-green-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Storage Used</p>
                  <p className="text-3xl font-bold">{analytics.storageUsed}</p>
                </div>
                <Settings className="w-8 h-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">API Calls Today</p>
                  <p className="text-3xl font-bold">{analytics.apiCalls}</p>
                </div>
                <Shield className="w-8 h-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="bg-gray-800">
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="settings">System Settings</TabsTrigger>
            <TabsTrigger value="logs">Activity Logs</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="users">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle>User Management</CardTitle>
                    <CardDescription>Manage user accounts and permissions</CardDescription>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input placeholder="Search users..." className="pl-10 bg-gray-900 border-gray-700" />
                    </div>
                    <Button>
                      <UserPlus className="w-4 h-4 mr-2" />
                      Add User
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-700 hover:bg-gray-800">
                      <TableHead className="text-gray-400">User</TableHead>
                      <TableHead className="text-gray-400">Role</TableHead>
                      <TableHead className="text-gray-400">Status</TableHead>
                      <TableHead className="text-gray-400">Last Login</TableHead>
                      <TableHead className="text-gray-400 text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id} className="border-gray-700 hover:bg-gray-750">
                        <TableCell>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-gray-400">{user.email}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getRoleColor(user.role)}>
                            {user.role}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Badge className={getStatusColor(user.status)}>
                              {user.status}
                            </Badge>
                            <Switch
                              checked={user.status === 'active'}
                              onCheckedChange={() => toggleUserStatus(user.id)}
                              className="data-[state=checked]:bg-green-500"
                            />
                          </div>
                        </TableCell>
                        <TableCell className="text-gray-400">{user.lastLogin}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-gray-800 border-gray-700">
                              <DropdownMenuItem className="text-gray-300 hover:bg-gray-700">
                                <Eye className="w-4 h-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-gray-300 hover:bg-gray-700">
                                <Edit className="w-4 h-4 mr-2" />
                                Edit User
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-gray-300 hover:bg-gray-700">
                                {user.status === 'active' ? (
                                  <>
                                    <EyeOff className="w-4 h-4 mr-2" />
                                    Deactivate
                                  </>
                                ) : (
                                  <>
                                    <Eye className="w-4 h-4 mr-2" />
                                    Activate
                                  </>
                                )}
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-300 hover:bg-red-900/20">
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
                <CardDescription>Configure system-wide settings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {systemSettings.map((setting) => (
                    <div key={setting.key} className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 border border-gray-700 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <code className="text-sm bg-gray-900 px-2 py-1 rounded">
                            {setting.key}
                          </code>
                          {!setting.editable && (
                            <Badge variant="outline" className="border-gray-600 text-gray-400">
                              Read-only
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-400">{setting.description}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        {setting.key.includes('_mode') || setting.key.includes('_enabled') ? (
                          <Switch
                            checked={setting.value === 'true'}
                            onCheckedChange={(checked) => 
                              updateSetting(setting.key, checked.toString())
                            }
                            disabled={!setting.editable}
                            className="data-[state=checked]:bg-green-500"
                          />
                        ) : (
                          <Input
                            value={setting.value}
                            onChange={(e) => updateSetting(setting.key, e.target.value)}
                            disabled={!setting.editable}
                            className="bg-gray-900 border-gray-700 w-32"
                          />
                        )}
                        <Button variant="ghost" size="sm" disabled={!setting.editable}>
                          Save
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}