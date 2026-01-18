'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Button } from '@/app/components/ui/button';
import { Progress } from '@/app/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/app/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { Calendar } from '@/app/components/ui/calendar';
import {
  Users,
  Clock,
  MessageSquare,
  FileText,
  CheckCircle,
  AlertCircle,
  Play,
  Pause,
  Edit,
  Download,
  Share2,
  MoreVertical,
  Circle,
  Activity
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/app/components/ui/dropdown-menu';

type ProjectStatus = 'active' | 'completed' | 'on-hold' | 'planning';

interface Project {
  id: string;
  name: string;
  status: ProjectStatus;
  progress: number;
  dueDate: Date;
  team: { name: string; avatar: string; role: string }[];
  lastActivity: string;
}

interface Task {
  id: string;
  title: string;
  assignee: string;
  dueDate: Date;
  status: 'todo' | 'in-progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high';
}

export default function ProjectDashboard() {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      name: 'Website Redesign',
      status: 'active',
      progress: 75,
      dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
      team: [
        { name: 'Alex Chen', avatar: '/avatars/alex.jpg', role: 'Designer' },
        { name: 'Sam Rivera', avatar: '/avatars/sam.jpg', role: 'Developer' },
        { name: 'Taylor Kim', avatar: '/avatars/taylor.jpg', role: 'PM' },
      ],
      lastActivity: '2 hours ago'
    },
    {
      id: '2',
      name: 'Mobile App Development',
      status: 'active',
      progress: 45,
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      team: [
        { name: 'Jordan Lee', avatar: '/avatars/jordan.jpg', role: 'Developer' },
        { name: 'Casey Smith', avatar: '/avatars/casey.jpg', role: 'Designer' },
      ],
      lastActivity: 'Yesterday'
    },
    {
      id: '3',
      name: 'SEO Optimization',
      status: 'completed',
      progress: 100,
      dueDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      team: [
        { name: 'Morgan Wells', avatar: '/avatars/morgan.jpg', role: 'SEO Specialist' },
      ],
      lastActivity: '1 week ago'
    }
  ]);

  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', title: 'Design Homepage', assignee: 'Alex Chen', dueDate: new Date(), status: 'done', priority: 'high' },
    { id: '2', title: 'Implement API', assignee: 'Sam Rivera', dueDate: new Date(), status: 'in-progress', priority: 'high' },
    { id: '3', title: 'Write Documentation', assignee: 'Taylor Kim', dueDate: new Date(), status: 'todo', priority: 'medium' },
    { id: '4', title: 'Test Mobile Responsive', assignee: 'Jordan Lee', dueDate: new Date(), status: 'review', priority: 'medium' },
  ]);

  const [time, setTime] = useState(new Date());
  const [activeUsers, setActiveUsers] = useState(12);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    const userInterval = setInterval(() => {
      setActiveUsers(prev => prev + Math.floor(Math.random() * 3) - 1);
    }, 5000);
    return () => {
      clearInterval(timer);
      clearInterval(userInterval);
    };
  }, []);

  const getStatusColor = (status: ProjectStatus) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'on-hold': return 'bg-yellow-100 text-yellow-800';
      case 'planning': return 'bg-gray-100 text-gray-800';
    }
  };

  const getTaskStatusIcon = (status: Task['status']) => {
    switch (status) {
      case 'todo': return <Circle className="w-4 h-4 text-gray-400" />;
      case 'in-progress': return <Play className="w-4 h-4 text-blue-500" />;
      case 'review': return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case 'done': return <CheckCircle className="w-4 h-4 text-green-500" />;
    }
  };

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
    }
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h2 className="text-3xl font-bold">Project Dashboard</h2>
            <p className="text-gray-600">Real-time collaboration and project tracking</p>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="flex items-center gap-2">
              <Activity className="w-3 h-3" />
              <span>{activeUsers} Active Users</span>
            </Badge>
            <Button>
              <Share2 className="w-4 h-4 mr-2" />
              Share Dashboard
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Stats Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600">Active Projects</p>
                  <p className="text-2xl font-bold">8</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Tasks Completed</p>
                  <p className="text-2xl font-bold">142</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Team Members</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
              </div>
              <div className="pt-4 border-t">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Overall Progress</span>
                  <span className="font-semibold">68%</span>
                </div>
                <Progress value={68} />
              </div>
            </CardContent>
          </Card>

          {/* Live Time & Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Live Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-6">
                <div className="text-3xl font-mono font-bold mb-2">
                  {time.toLocaleTimeString()}
                </div>
                <p className="text-sm text-gray-600">Current time in your timezone</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-blue-500" />
                    <span className="text-sm">Active Discussions</span>
                  </div>
                  <Badge>5</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Files Updated Today</span>
                  </div>
                  <Badge>12</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-purple-500" />
                    <span className="text-sm">Team Online</span>
                  </div>
                  <Badge variant="outline">8/12</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Deadlines */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Deadlines</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)}
                className="rounded-md border"
              />
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between p-2 bg-yellow-50 rounded">
                  <div>
                    <p className="font-medium">Client Review</p>
                    <p className="text-sm text-gray-600">Tomorrow, 2:00 PM</p>
                  </div>
                  <Badge variant="outline">High</Badge>
                </div>
                <div className="flex items-center justify-between p-2 bg-blue-50 rounded">
                  <div>
                    <p className="font-medium">Sprint Planning</p>
                    <p className="text-sm text-gray-600">In 3 days</p>
                  </div>
                  <Badge variant="outline">Medium</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="projects" className="space-y-6">
          <TabsList>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
            <TabsTrigger value="files">Files</TabsTrigger>
          </TabsList>

          <TabsContent value="projects">
            <div className="grid gap-6">
              {projects.map((project) => (
                <Card key={project.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-xl font-semibold">{project.name}</h3>
                          <Badge className={getStatusColor(project.status)}>
                            {project.status.toUpperCase()}
                          </Badge>
                        </div>
                        <div className="mb-4">
                          <div className="flex justify-between text-sm mb-1">
                            <span>Progress</span>
                            <span>{project.progress}%</span>
                          </div>
                          <Progress value={project.progress} />
                        </div>
                        <div className="flex items-center gap-6 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>Due: {project.dueDate.toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MessageSquare className="w-4 h-4" />
                            <span>Last activity: {project.lastActivity}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-3">
                        <div className="flex -space-x-2">
                          {project.team.map((member, idx) => (
                            <Avatar key={idx} className="border-2 border-white">
                              <AvatarFallback>
                                {member.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button size="sm" variant="ghost">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem>
                                <Play className="w-4 h-4 mr-2" />
                                Start
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Pause className="w-4 h-4 mr-2" />
                                Pause
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Download className="w-4 h-4 mr-2" />
                                Export
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tasks">
            <Card>
              <CardHeader>
                <CardTitle>Task Board</CardTitle>
                <CardDescription>Drag and drop tasks between columns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {['todo', 'in-progress', 'review', 'done'].map((status) => (
                    <div key={status} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold capitalize">{status.replace('-', ' ')}</h3>
                        <Badge variant="outline">
                          {tasks.filter(t => t.status === status).length}
                        </Badge>
                      </div>
                      <div className="space-y-3">
                        {tasks
                          .filter(task => task.status === status)
                          .map(task => (
                            <div
                              key={task.id}
                              className="bg-white p-3 rounded border hover:shadow transition-shadow"
                              draggable
                            >
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center gap-2">
                                  {getTaskStatusIcon(task.status)}
                                  <span className="font-medium">{task.title}</span>
                                </div>
                                <Badge className={getPriorityColor(task.priority)}>
                                  {task.priority}
                                </Badge>
                              </div>
                              <div className="flex items-center justify-between text-sm text-gray-600">
                                <span>{task.assignee}</span>
                                <span>{task.dueDate.toLocaleDateString()}</span>
                              </div>
                            </div>
                          ))}
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