'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  Users,
  Search,
  Filter,
  UserPlus,
  Mail,
  Phone,
  Calendar,
  Shield,
  Eye,
  Edit,
  Trash2,
  MoreVertical,
  CheckCircle2,
  XCircle,
  Clock,
  Ban
} from 'lucide-react';

const users = [
  { id: '1', name: 'Alex Chen', email: 'alex@example.com', role: 'admin', status: 'active', lastLogin: '2 hours ago', joined: 'Jan 15, 2024' },
  { id: '2', name: 'Sam Rivera', email: 'sam@example.com', role: 'editor', status: 'active', lastLogin: 'Yesterday', joined: 'Feb 2, 2024' },
  { id: '3', name: 'Taylor Kim', email: 'taylor@example.com', role: 'viewer', status: 'pending', lastLogin: 'Never', joined: 'Mar 10, 2024' },
  { id: '4', name: 'Jordan Lee', email: 'jordan@example.com', role: 'editor', status: 'inactive', lastLogin: '1 week ago', joined: 'Dec 5, 2023' },
  { id: '5', name: 'Casey Smith', email: 'casey@example.com', role: 'viewer', status: 'active', lastLogin: '5 hours ago', joined: 'Jan 28, 2024' },
  { id: '6', name: 'Morgan Wells', email: 'morgan@example.com', role: 'admin', status: 'active', lastLogin: '3 hours ago', joined: 'Nov 15, 2023' },
  { id: '7', name: 'Riley Park', email: 'riley@example.com', role: 'editor', status: 'suspended', lastLogin: '2 weeks ago', joined: 'Feb 20, 2024' },
  { id: '8', name: 'Jordan Taylor', email: 'jordan.t@example.com', role: 'viewer', status: 'active', lastLogin: '1 day ago', joined: 'Mar 5, 2024' },
];

const roleColors: Record<string, string> = {
  'admin': 'bg-red-100 text-red-800',
  'editor': 'bg-blue-100 text-blue-800',
  'viewer': 'bg-gray-100 text-gray-800',
};

const statusColors: Record<string, string> = {
  'active': 'bg-green-100 text-green-800',
  'inactive': 'bg-gray-100 text-gray-800',
  'pending': 'bg-yellow-100 text-yellow-800',
  'suspended': 'bg-red-100 text-red-800',
};

const statusIcons: Record<string, React.ReactNode> = {
  'active': <CheckCircle2 className="w-4 h-4" />,
  'inactive': <XCircle className="w-4 h-4" />,
  'pending': <Clock className="w-4 h-4" />,
  'suspended': <Ban className="w-4 h-4" />,
};

export default function UserManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleUserSelect = (userId: string) => {
    setSelectedUsers(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const activateUser = (userId: string) => {
    alert(`Activating user ${userId}...`);
  };

  const suspendUser = (userId: string) => {
    alert(`Suspending user ${userId}...`);
  };

  const deleteUser = (userId: string) => {
    alert(`Deleting user ${userId}...`);
  };

  const sendInvite = () => {
    alert('Sending invitation...');
  };

  const exportUsers = () => {
    alert('Exporting users list...');
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-gradient-to-r from-red-500 to-orange-500">
            <Shield className="w-3 h-3 mr-1" />
            Admin Panel
          </Badge>
          <h2 className="text-4xl font-bold mb-4">User Management</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Manage user accounts, permissions, and access levels
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* User List */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle>All Users</CardTitle>
                    <CardDescription className="text-gray-400">
                      {filteredUsers.length} users found
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search users..."
                        className="pl-10 w-48 bg-gray-900 border-gray-700"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <Button onClick={sendInvite}>
                      <UserPlus className="w-4 h-4 mr-2" />
                      Invite User
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Filters */}
                <div className="flex flex-wrap gap-3 mb-6">
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-400">Filter:</span>
                  </div>
                  <Button
                    variant={selectedRole === 'all' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedRole('all')}
                    className="border-gray-700"
                  >
                    All Roles
                  </Button>
                  <Button
                    variant={selectedRole === 'admin' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedRole('admin')}
                    className="border-gray-700"
                  >
                    Admin
                  </Button>
                  <Button
                    variant={selectedRole === 'editor' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedRole('editor')}
                    className="border-gray-700"
                  >
                    Editor
                  </Button>
                  <Button
                    variant={selectedRole === 'viewer' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedRole('viewer')}
                    className="border-gray-700"
                  >
                    Viewer
                  </Button>

                  <div className="ml-4 flex items-center gap-2">
                    <span className="text-sm text-gray-400">Status:</span>
                    <Button
                      variant={selectedStatus === 'all' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedStatus('all')}
                      className="border-gray-700"
                    >
                      All
                    </Button>
                    <Button
                      variant={selectedStatus === 'active' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedStatus('active')}
                      className="border-gray-700"
                    >
                      Active
                    </Button>
                    <Button
                      variant={selectedStatus === 'pending' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedStatus('pending')}
                      className="border-gray-700"
                    >
                      Pending
                    </Button>
                  </div>
                </div>

                {/* Users Table */}
                <div className="border border-gray-700 rounded-lg overflow-hidden">
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
                      {filteredUsers.map((user) => (
                        <TableRow key={user.id} className="border-gray-700 hover:bg-gray-800">
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                                <span className="font-bold text-white">
                                  {user.name.split(' ').map(n => n[0]).join('')}
                                </span>
                              </div>
                              <div>
                                <p className="font-medium">{user.name}</p>
                                <div className="flex items-center gap-2 text-sm text-gray-400">
                                  <Mail className="w-3 h-3" />
                                  <span>{user.email}</span>
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={roleColors[user.role]}>
                              {user.role}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={`${statusColors[user.status]} flex items-center gap-1`}>
                              {statusIcons[user.status]}
                              {user.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-gray-400">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              {user.lastLogin}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => activateUser(user.id)}
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => suspendUser(user.id)}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                                onClick={() => deleteUser(user.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Bulk Actions */}
                {selectedUsers.length > 0 && (
                  <div className="mt-6 p-4 border border-gray-700 rounded-lg flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-400">
                        {selectedUsers.length} users selected
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="border-gray-700">
                        Export Selected
                      </Button>
                      <Button variant="outline" size="sm" className="border-gray-700">
                        Change Role
                      </Button>
                      <Button variant="destructive" size="sm">
                        Delete Selected
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* User Stats & Actions */}
          <div className="space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle>User Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-blue-400" />
                      <span>Total Users</span>
                    </div>
                    <span className="text-2xl font-bold">142</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                      <span>Active Users</span>
                    </div>
                    <span className="text-xl font-bold text-green-400">124</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-yellow-400" />
                      <span>Pending Invites</span>
                    </div>
                    <span className="text-xl font-bold text-yellow-400">8</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <XCircle className="w-4 h-4 text-red-400" />
                      <span>Inactive Users</span>
                    </div>
                    <span className="text-xl font-bold text-red-400">10</span>
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
                    <Mail className="w-4 h-4 mr-2" />
                    Send Bulk Email
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-gray-700">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Bulk Invite
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-gray-700">
                    <Shield className="w-4 h-4 mr-2" />
                    Permission Audit
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-gray-700">
                    <Calendar className="w-4 h-4 mr-2" />
                    Activity Logs
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { action: 'Alex Chen logged in', time: '2 hours ago' },
                    { action: 'New user invitation sent', time: '4 hours ago' },
                    { action: 'Role permissions updated', time: '1 day ago' },
                    { action: 'User account deactivated', time: '2 days ago' },
                  ].map((activity, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                      <div>
                        <p className="text-sm">{activity.action}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
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