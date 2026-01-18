'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  MessageSquare,
  Send,
  Paperclip,
  Smile,
  MoreVertical,
  Search,
  Users,
  Video,
  Phone,
  AtSign,
  Hash,
  Pin,
  Bell,
  BellOff,
  CheckCircle2,
  Clock
} from 'lucide-react';

const channels = [
  { id: 'general', name: 'General', unread: 3, icon: <Hash className="w-4 h-4" /> },
  { id: 'random', name: 'Random', unread: 0, icon: <Hash className="w-4 h-4" /> },
  { id: 'design', name: 'Design', unread: 12, icon: <Hash className="w-4 h-4" /> },
  { id: 'development', name: 'Development', unread: 5, icon: <Hash className="w-4 h-4" /> },
  { id: 'marketing', name: 'Marketing', unread: 0, icon: <Hash className="w-4 h-4" /> },
];

const teamMembers = [
  { id: '1', name: 'Alex Chen', role: 'Designer', status: 'online', avatar: '' },
  { id: '2', name: 'Sam Rivera', role: 'Developer', status: 'online', avatar: '' },
  { id: '3', name: 'Taylor Kim', role: 'Project Manager', status: 'away', avatar: '' },
  { id: '4', name: 'Jordan Lee', role: 'Marketing', status: 'offline', avatar: '' },
  { id: '5', name: 'Casey Smith', role: 'Developer', status: 'online', avatar: '' },
];

const messages = [
  { id: '1', user: 'Alex Chen', content: 'Has anyone reviewed the new designs?', time: '2:30 PM', read: true },
  { id: '2', user: 'Sam Rivera', content: 'I\'ll review them now. The prototype looks great!', time: '2:32 PM', read: true },
  { id: '3', user: 'Taylor Kim', content: 'Let\'s schedule a review meeting tomorrow at 10 AM', time: '2:35 PM', read: true },
  { id: '4', user: 'You', content: 'Sounds good. I\'ve added some notes to the Figma file.', time: '2:40 PM', read: false },
  { id: '5', user: 'Jordan Lee', content: 'Can someone share the latest marketing assets?', time: '2:42 PM', read: false },
];

export default function TeamChat() {
  const [newMessage, setNewMessage] = useState('');
  const [activeChannel, setActiveChannel] = useState('general');
  const [isTyping, setIsTyping] = useState(false);
  const [chatMessages, setChatMessages] = useState(messages);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const message = {
      id: Date.now().toString(),
      user: 'You',
      content: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: false
    };

    setChatMessages([...chatMessages, message]);
    setNewMessage('');
    
    // Simulate reply
    setTimeout(() => {
      const replies = [
        'Thanks for the update!',
        'I\'ll check that right now.',
        'Great work on this!',
        'Can you share more details?',
        'Let me review and get back to you.'
      ];
      
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      const reply = {
        id: (Date.now() + 1).toString(),
        user: teamMembers[Math.floor(Math.random() * teamMembers.length)].name,
        content: randomReply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        read: false
      };
      
      setChatMessages(prev => [...prev, reply]);
    }, 2000);
  };

  const startCall = (type: 'video' | 'audio') => {
    alert(`Starting ${type} call...`);
  };

  const markAllAsRead = () => {
    setChatMessages(prev => prev.map(msg => ({ ...msg, read: true })));
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-gradient-to-r from-blue-500 to-cyan-500">
            <MessageSquare className="w-3 h-3 mr-1" />
            Team Chat
          </Badge>
          <h2 className="text-4xl font-bold mb-4">Real-Time Team Communication</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stay connected with your team through instant messaging, voice, and video calls
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar - Channels & Team */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Hash className="w-5 h-5" />
                  Channels
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {channels.map((channel) => (
                    <Button
                      key={channel.id}
                      variant={activeChannel === channel.id ? 'default' : 'ghost'}
                      className="w-full justify-start"
                      onClick={() => setActiveChannel(channel.id)}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2">
                          {channel.icon}
                          <span>{channel.name}</span>
                        </div>
                        {channel.unread > 0 && (
                          <Badge className="bg-blue-500">{channel.unread}</Badge>
                        )}
                      </div>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Team Members
                </CardTitle>
                <CardDescription>{teamMembers.filter(m => m.status === 'online').length} online</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {teamMembers.map((member) => (
                    <div key={member.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar>
                            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                            member.status === 'online' ? 'bg-green-500' :
                            member.status === 'away' ? 'bg-yellow-500' :
                            'bg-gray-400'
                          }`} />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{member.name}</p>
                          <p className="text-xs text-gray-500">{member.role}</p>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button size="icon" variant="ghost" className="h-8 w-8">
                          <MessageSquare className="w-4 h-4" />
                        </Button>
                        <Button size="icon" variant="ghost" className="h-8 w-8">
                          <Phone className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Chat Area */}
          <div className="lg:col-span-3">
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <MessageSquare className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle>#{channels.find(c => c.id === activeChannel)?.name}</CardTitle>
                      <CardDescription>
                        {teamMembers.filter(m => m.status === 'online').length} members online
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => startCall('audio')}>
                      <Phone className="w-4 h-4 mr-2" />
                      Call
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => startCall('video')}>
                      <Video className="w-4 h-4 mr-2" />
                      Video
                    </Button>
                    <Button variant="outline" size="sm" onClick={markAllAsRead}>
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Mark Read
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Messages */}
                <div className="h-[400px] overflow-y-auto p-4 bg-gray-50 rounded-lg mb-4">
                  <AnimatePresence>
                    {chatMessages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={`mb-4 ${message.user === 'You' ? 'text-right' : ''}`}
                      >
                        <div className="flex items-start gap-2 mb-1">
                          {message.user !== 'You' && (
                            <Avatar className="w-6 h-6">
                              <AvatarFallback className="text-xs">
                                {message.user.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                          )}
                          <div className={`inline-block max-w-[70%] p-3 rounded-2xl ${
                            message.user === 'You'
                              ? 'bg-blue-600 text-white rounded-br-none'
                              : 'bg-white text-gray-800 shadow-sm rounded-bl-none'
                          }`}>
                            {message.content}
                          </div>
                          {message.user === 'You' && (
                            <Avatar className="w-6 h-6">
                              <AvatarFallback className="text-xs bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                                You
                              </AvatarFallback>
                            </Avatar>
                          )}
                        </div>
                        <div className="text-xs text-gray-500 flex items-center gap-2">
                          {message.user} • {message.time}
                          {!message.read && message.user === 'You' && (
                            <Clock className="w-3 h-3" />
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  
                  {isTyping && (
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-75" />
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-150" />
                      </div>
                      <span className="text-sm text-gray-500">Someone is typing...</span>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      placeholder={`Message #${channels.find(c => c.id === activeChannel)?.name}`}
                      className="flex-1"
                    />
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon">
                        <Paperclip className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Smile className="w-4 h-4" />
                      </Button>
                      <Button onClick={sendMessage}>
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-4">
                      <span>Press Enter to send</span>
                      <span>Shift + Enter for new line</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      <AtSign className="w-4 h-4 mr-2" />
                      Mention someone
                    </Button>
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