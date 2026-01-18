'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Users,
  MessageSquare,
  Video,
  Share2,
  Copy,
  CheckCircle2,
  Clock,
  Zap,
  Eye,
  Mic,
  MicOff,
  Send,
  MoreVertical
} from 'lucide-react';

interface Collaborator {
  id: string;
  name: string;
  role: string;
  avatar: string;
  isOnline: boolean;
  isSpeaking: boolean;
}

interface Message {
  id: string;
  user: string;
  content: string;
  timestamp: string;
  isOwn: boolean;
}

export default function RealTimeCollaboration() {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([
    { id: '1', name: 'Alex Chen', role: 'Designer', avatar: '', isOnline: true, isSpeaking: true },
    { id: '2', name: 'Sam Rivera', role: 'Developer', avatar: '', isOnline: true, isSpeaking: false },
    { id: '3', name: 'Taylor Kim', role: 'Project Manager', avatar: '', isOnline: false, isSpeaking: false },
    { id: '4', name: 'Jordan Lee', role: 'Client', avatar: '', isOnline: true, isSpeaking: false },
  ]);

  const [messages, setMessages] = useState<Message[]>([
    { id: '1', user: 'Alex Chen', content: 'I\'ve updated the homepage design', timestamp: '2:30 PM', isOwn: false },
    { id: '2', user: 'You', content: 'Looks great! Can we add more animations?', timestamp: '2:32 PM', isOwn: true },
    { id: '3', user: 'Sam Rivera', content: 'I\'ll implement the animations today', timestamp: '2:33 PM', isOwn: false },
    { id: '4', user: 'Taylor Kim', content: 'Meeting at 3 PM to review progress', timestamp: '2:35 PM', isOwn: false },
  ]);

  const [newMessage, setNewMessage] = useState('');
  const [isVideoCallActive, setIsVideoCallActive] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [roomCode, setRoomCode] = useState('PROJ-ABCD-1234');
  const [cursorPosition, setCursorPosition] = useState({ x: 50, y: 50, userId: 'user1' });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCollaborators(prev => prev.map(collab => ({
        ...collab,
        isSpeaking: collab.isOnline && Math.random() > 0.7
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      user: 'You',
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isOwn: true
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  const copyRoomCode = () => {
    navigator.clipboard.writeText(roomCode);
  };

  const startVideoCall = () => {
    setIsVideoCallActive(true);
    // In production, this would initialize WebRTC
  };

  const toggleAudio = () => {
    setIsAudioMuted(!isAudioMuted);
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-gradient-to-r from-blue-500 to-purple-500">
            <Zap className="w-3 h-3 mr-1" />
            Live Collaboration
          </Badge>
          <h2 className="text-4xl font-bold mb-4">Real-Time Collaboration Suite</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Work together in real-time with video, chat, and shared editing
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Video Call Section */}
          <div className="lg:col-span-2">
            <Card className="border-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Video className="w-5 h-5" />
                    Video Conference
                  </CardTitle>
                  <Badge variant={isVideoCallActive ? 'default' : 'outline'}>
                    {isVideoCallActive ? 'Live Now' : 'Ready'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-gradient-to-br from-gray-900 to-black rounded-lg mb-4 relative overflow-hidden">
                  {/* Main Video Feed */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {isVideoCallActive ? (
                      <div className="text-center">
                        <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                          <Users className="w-12 h-12 text-white" />
                        </div>
                        <p className="text-white text-lg">Video call in progress</p>
                        <p className="text-gray-400">4 participants connected</p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center">
                          <Video className="w-12 h-12 text-gray-400" />
                        </div>
                        <p className="text-white text-lg">Ready to start video call</p>
                        <p className="text-gray-400">Click start to begin</p>
                      </div>
                    )}
                  </div>

                  {/* Participant Thumbnails */}
                  <div className="absolute bottom-4 right-4 flex gap-2">
                    {collaborators.filter(c => c.isOnline).map((collab, idx) => (
                      <div key={collab.id} className="relative">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold">
                            {collab.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        {collab.isSpeaking && (
                          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-center gap-4">
                  <Button
                    onClick={startVideoCall}
                    variant={isVideoCallActive ? 'outline' : 'default'}
                    className="flex-1"
                  >
                    {isVideoCallActive ? 'End Call' : 'Start Video Call'}
                  </Button>
                  <Button
                    onClick={toggleAudio}
                    variant={isAudioMuted ? 'destructive' : 'outline'}
                    size="icon"
                  >
                    {isAudioMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </Button>
                  <Button variant="outline" size="icon">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Collaborators List */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Team Members ({collaborators.filter(c => c.isOnline).length}/{collaborators.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {collaborators.map((collab) => (
                    <div
                      key={collab.id}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar>
                            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                              {collab.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                            collab.isOnline ? 'bg-green-500' : 'bg-gray-400'
                          }`} />
                        </div>
                        <div>
                          <p className="font-medium">{collab.name}</p>
                          <p className="text-sm text-gray-600">{collab.role}</p>
                        </div>
                      </div>
                      {collab.isSpeaking && (
                        <div className="flex gap-1">
                          <div className="w-1 h-4 bg-green-500 animate-pulse" />
                          <div className="w-1 h-4 bg-green-500 animate-pulse delay-75" />
                          <div className="w-1 h-4 bg-green-500 animate-pulse delay-150" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-6 border-t">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium">Room Code</span>
                    <Button variant="ghost" size="sm" onClick={copyRoomCode}>
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </Button>
                  </div>
                  <div className="bg-gray-100 p-3 rounded-lg font-mono text-center">
                    {roomCode}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Chat Section */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Live Chat
              </CardTitle>
              <CardDescription>Real-time messaging with your team</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <div className="h-80 overflow-y-auto p-4 bg-gray-50 rounded-lg mb-4">
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`mb-4 ${message.isOwn ? 'text-right' : ''}`}
                      >
                        <div className="flex items-start gap-2 mb-1">
                          {!message.isOwn && (
                            <Avatar className="w-6 h-6">
                              <AvatarFallback className="text-xs">
                                {message.user.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                          )}
                          <div className={`inline-block max-w-[70%] p-3 rounded-2xl ${
                            message.isOwn
                              ? 'bg-blue-600 text-white rounded-br-none'
                              : 'bg-white text-gray-800 shadow-sm rounded-bl-none'
                          }`}>
                            {message.content}
                          </div>
                          {message.isOwn && (
                            <Avatar className="w-6 h-6">
                              <AvatarFallback className="text-xs bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                                You
                              </AvatarFallback>
                            </Avatar>
                          )}
                        </div>
                        <div className="text-xs text-gray-500">
                          {message.user} • {message.timestamp}
                        </div>
                      </motion.div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>

                  <div className="flex gap-2">
                    <Input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      placeholder="Type your message..."
                      className="flex-1"
                    />
                    <Button onClick={sendMessage}>
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                    <h4 className="font-semibold mb-2">Active Features</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        <span>Real-time chat</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        <span>Video conferencing</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        <span>Screen sharing</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500" />
                        <span>File sharing</span>
                      </li>
                    </ul>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-3">Quick Actions</h4>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start">
                        <Share2 className="w-4 h-4 mr-2" />
                        Share Screen
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Eye className="w-4 h-4 mr-2" />
                        Start Recording
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Clock className="w-4 h-4 mr-2" />
                        Schedule Meeting
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}