'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  Search,
  Filter,
  Download,
  Eye,
  User,
  Key,
  Database,
  Settings,
  Shield,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Clock,
  Calendar,
  ArrowUpDown
} from 'lucide-react';

const auditLogs = [
  {
    id: '1',
    timestamp: '2024-01-15 14:30:25',
    user: 'Alex Chen',
    action: 'User Login',
    resource: 'Dashboard',
    ip: '192.168.1.100',
    status: 'success',
    details: 'Successful login from Chrome browser'
  },
  {
    id: '2',
    timestamp: '2024-01-15 14:25:10',
    user: 'Admin',
    action: 'Settings Update',
    resource: 'System Settings',
    ip: '192.168.1.1',
    status: 'success',
    details: 'Updated site name and timezone'
  },
  {
    id: '3',
    timestamp: '2024-01-15 13:45:55',
    user: 'Sam Rivera',
    action: 'File Upload',
    resource: 'Documents',
    ip: '192.168.1.105',
    status: 'success',
    details: 'Uploaded "project_proposal.pdf" (2.4 MB)'
  },
  {
    id: '4',
    timestamp: '2024-01-15 13:20:30',
    user: 'Unknown',
    action: 'Failed Login',
    resource: 'Authentication',
    ip: '203.0.113.25',
    status: 'failed',
    details: 'Invalid credentials attempt'
  },
  {
    id: '5',
    timestamp: '2024-01-15 12:15:45',
    user: 'Taylor Kim',
    action: 'User Creation',
    resource: 'User Management',
    ip: '192.168.1.110',
    status: 'success',
    details: 'Created new user account for "Jordan Lee"'
  },
  {
    id: '6',
    timestamp: '2024-01-15 11:30:20',
    user: 'System',
    action: 'Backup Completed',
    resource: 'Database',
    ip: '127.0.0.1',
    status: 'success',
    details: 'Automated database backup completed'
  },
  {
    id: '7',
    timestamp: '2024-01-15 10:45:15',
    user: 'Morgan Wells',
    action: 'Permission Change',
    resource: 'Access Control',
    ip: '192.168.1.115',
    status: 'success',
    details: 'Updated user permissions for team "Development"'
  },
  {
    id: '8',
    timestamp: '2024-01-15 09:55:40',
    user: 'Unknown',
    action: 'API Request',
    resource: 'API Gateway',
    ip: '198.51.100.25',
    status: 'failed',
    details: 'Invalid API key attempt'
  },
];

const actionTypes = [
  'All Actions',
  'User Login',
  'Settings Update',
  'File Upload',
  'User Management',
  'System Events',
  'Security Events'
];

const statusColors: Record<string, string> = {
  'success': 'bg-green-100 text-green-800',
  'failed': 'bg-red-100 text-red-800',
  'warning': 'bg-yellow-100 text-yellow-800',
  'info': 'bg-blue-100 text-blue-800',
};

const statusIcons: Record<string, React.ReactNode> = {
  'success': <CheckCircle2 className="w-4 h-4" />,
  'failed': <XCircle className="w-4 h-4" />,
  'warning': <AlertCircle className="w-4 h-4" />,
  'info': <Shield className="w-4 h-4" />,
};

const actionIcons: Record<string, React.ReactNode> = {
  'User Login': <Key className="w-4 h-4" />,
  'Settings Update': <Settings className="w-4 h-4" />,
  'File Upload': <Database className="w-4 h-4" />,
  'User Management': <User className="w-4 h-4" />,
  'System Events': <Settings className="w-4 h-4" />,
  'Security Events': <Shield className="w-4 h-4" />,
};

export default function AuditLogs() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAction, setSelectedAction] = useState('All Actions');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [sortBy, setSortBy] = useState<'timestamp' | 'user' | 'action'>('timestamp');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         log.resource.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAction = selectedAction === 'All Actions' || log.action === selectedAction;
    const matchesStatus = selectedStatus === 'all' || log.status === selectedStatus;
    return matchesSearch && matchesAction && matchesStatus;
  }).sort((a, b) => {
    if (sortBy === 'timestamp') {
      return sortOrder === 'asc' 
        ? new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        : new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    }
    if (sortBy === 'user') {
      return sortOrder === 'asc'
        ? a.user.localeCompare(b.user)
        : b.user.localeCompare(a.user);
    }
    return sortOrder === 'asc'
      ? a.action.localeCompare(b.action)
      : b.action.localeCompare(a.action);
  });

  const toggleSort = (column: typeof sortBy) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const exportLogs = () => {
    alert('Exporting audit logs...');
  };

  const clearLogs = () => {
    if (confirm('Are you sure you want to clear all audit logs? This action cannot be undone.')) {
      alert('Audit logs cleared');
    }
  };

  const viewDetails = (log: typeof auditLogs[0]) => {
    alert(`Viewing details for log ${log.id}:\n\n${log.details}`);
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-gradient-to-r from-red-500 to-orange-500">
            <Shield className="w-3 h-3 mr-1" />
            Security Audit
          </Badge>
          <h2 className="text-4xl font-bold mb-4">Audit Logs</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Track and monitor all system activities and security events
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Audit Logs Table */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <CardTitle>System Audit Logs</CardTitle>
                    <CardDescription className="text-gray-400">
                      {filteredLogs.length} logs found
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Search logs..."
                        className="pl-10 w-48 bg-gray-900 border-gray-700"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <Button variant="outline" onClick={exportLogs} className="border-gray-700">
                      <Download className="w-4 h-4 mr-2" />
                      Export
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
                  <div className="flex flex-wrap gap-2">
                    {actionTypes.map((action) => (
                      <Button
                        key={action}
                        variant={selectedAction === action ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedAction(action)}
                        className="border-gray-700"
                      >
                        {action}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Logs Table */}
                <div className="border border-gray-700 rounded-lg overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-gray-700 hover:bg-gray-800">
                        <TableHead className="text-gray-400">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleSort('timestamp')}
                            className="flex items-center gap-1"
                          >
                            <Calendar className="w-4 h-4" />
                            Timestamp
                            <ArrowUpDown className="w-3 h-3" />
                          </Button>
                        </TableHead>
                        <TableHead className="text-gray-400">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleSort('user')}
                            className="flex items-center gap-1"
                          >
                            <User className="w-4 h-4" />
                            User
                            <ArrowUpDown className="w-3 h-3" />
                          </Button>
                        </TableHead>
                        <TableHead className="text-gray-400">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleSort('action')}
                            className="flex items-center gap-1"
                          >
                            Action
                            <ArrowUpDown className="w-3 h-3" />
                          </Button>
                        </TableHead>
                        <TableHead className="text-gray-400">Resource</TableHead>
                        <TableHead className="text-gray-400">Status</TableHead>
                        <TableHead className="text-gray-400 text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredLogs.map((log) => (
                        <TableRow key={log.id} className="border-gray-700 hover:bg-gray-800">
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-gray-400" />
                              <div>
                                <div className="font-medium">{log.timestamp.split(' ')[0]}</div>
                                <div className="text-sm text-gray-400">{log.timestamp.split(' ')[1]}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4 text-gray-400" />
                              <span>{log.user}</span>
                            </div>
                            <div className="text-sm text-gray-400">{log.ip}</div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {actionIcons[log.action] || <Settings className="w-4 h-4" />}
                              <span>{log.action}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-gray-400">{log.resource}</TableCell>
                          <TableCell>
                            <Badge className={`${statusColors[log.status]} flex items-center gap-1`}>
                              {statusIcons[log.status]}
                              {log.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => viewDetails(log)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Bulk Actions */}
                <div className="mt-6 flex justify-between items-center">
                  <div className="text-sm text-gray-400">
                    Showing {filteredLogs.length} of {auditLogs.length} logs
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="border-gray-700">
                      Load More
                    </Button>
                    <Button variant="destructive" size="sm" onClick={clearLogs}>
                      Clear All Logs
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Statistics & Actions */}
          <div className="space-y-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle>Audit Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                      <span>Successful Actions</span>
                    </div>
                    <span className="text-xl font-bold text-green-400">142</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <XCircle className="w-4 h-4 text-red-400" />
                      <span>Failed Actions</span>
                    </div>
                    <span className="text-xl font-bold text-red-400">8</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-yellow-400" />
                      <span>Security Events</span>
                    </div>
                    <span className="text-xl font-bold text-yellow-400">12</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-blue-400" />
                      <span>Unique Users</span>
                    </div>
                    <span className="text-xl font-bold text-blue-400">24</span>
                  </div>
                  <div className="pt-4 border-t border-gray-700">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">Total Logs</span>
                      <span className="text-2xl font-bold">162</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle>Recent Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { message: 'Multiple failed login attempts detected', time: '2 hours ago', level: 'high' },
                    { message: 'User permission changed', time: '4 hours ago', level: 'medium' },
                    { message: 'Database backup completed', time: '6 hours ago', level: 'low' },
                    { message: 'New user registration', time: '1 day ago', level: 'info' },
                  ].map((alert, idx) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-lg ${
                        alert.level === 'high' ? 'bg-red-900/30 border border-red-800' :
                        alert.level === 'medium' ? 'bg-yellow-900/30 border border-yellow-800' :
                        alert.level === 'low' ? 'bg-green-900/30 border border-green-800' :
                        'bg-blue-900/30 border border-blue-800'
                      }`}
                    >
                      <p className="text-sm">{alert.message}</p>
                      <p className="text-xs text-gray-400 mt-1">{alert.time}</p>
                    </div>
                  ))}
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
                    <Shield className="w-4 h-4 mr-2" />
                    Run Security Audit
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-gray-700">
                    <Database className="w-4 h-4 mr-2" />
                    Export All Logs
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-gray-700">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter Settings
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-gray-700">
                    <Settings className="w-4 h-4 mr-2" />
                    Audit Configuration
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