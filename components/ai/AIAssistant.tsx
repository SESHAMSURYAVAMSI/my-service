'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Bot,
  Send,
  Sparkles,
  Brain,
  Code,
  FileText,
  Image as ImageIcon,
  Music,
  Video,
  Copy,
  Download,
  Mic,
  MicOff,
  Volume2,
  Settings,
  Zap,
  Clock
} from 'lucide-react';

const aiCapabilities = [
  { icon: FileText, name: 'Content Writing', description: 'Blogs, emails, social media' },
  { icon: Code, name: 'Code Generation', description: 'Python, JavaScript, SQL' },
  { icon: ImageIcon, name: 'Image Creation', description: 'AI art and graphics' },
  { icon: Music, name: 'Audio Processing', description: 'Transcription, generation' },
  { icon: Video, name: 'Video Scripts', description: 'Storyboards and scripts' },
  { icon: Brain, name: 'Data Analysis', description: 'Insights and reports' },
];

const conversationHistory = [
  { role: 'ai', message: 'Hello! I\'m your AI assistant. How can I help you today?' },
  { role: 'user', message: 'Can you help me write a blog post about AI?' },
  { role: 'ai', message: 'Absolutely! What specific aspect of AI would you like to cover?' },
];

export default function AIAssistant() {
  const [input, setInput] = useState('');
  const [conversation, setConversation] = useState(conversationHistory);
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedCapability, setSelectedCapability] = useState('content');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conversation]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user' as const, message: input };
    setConversation([...conversation, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponses = [
        "I understand your question about that topic. Here's what I think...",
        "Based on the information provided, I would recommend...",
        "That's an excellent question! Let me break it down for you...",
        "I've analyzed your request and here are my suggestions...",
        "Great question! Here's a detailed response based on current knowledge..."
      ];
      
      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      const aiMessage = { role: 'ai' as const, message: randomResponse };
      setConversation(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    // In production, this would start/stop speech recognition
  };

  const clearConversation = () => {
    setConversation([conversationHistory[0]]);
  };

  const copyConversation = () => {
    const text = conversation.map(msg => `${msg.role}: ${msg.message}`).join('\n');
    navigator.clipboard.writeText(text);
  };

  const exportConversation = () => {
    const text = conversation.map(msg => `${msg.role}: ${msg.message}`).join('\n');
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai-conversation-${Date.now()}.txt`;
    a.click();
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-gradient-to-r from-purple-500 to-pink-500">
            <Brain className="w-3 h-3 mr-1" />
            AI Assistant
          </Badge>
          <h2 className="text-4xl font-bold mb-4">Your Personal AI Assistant</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get instant help with writing, coding, analysis, and more
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <Card className="border-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Bot className="w-5 h-5" />
                    AI Assistant Chat
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={clearConversation}>
                      Clear
                    </Button>
                    <Button variant="outline" size="sm" onClick={copyConversation}>
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={exportConversation}>
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <CardDescription>
                  Ask me anything - I can help with writing, coding, analysis, and more
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Conversation */}
                <div className="h-[400px] overflow-y-auto p-4 bg-gray-50 rounded-lg mb-4">
                  {conversation.map((msg, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`mb-4 ${msg.role === 'user' ? 'text-right' : ''}`}
                    >
                      <div className={`inline-block max-w-[80%] p-3 rounded-2xl ${
                        msg.role === 'user'
                          ? 'bg-blue-600 text-white rounded-br-none'
                          : 'bg-white text-gray-800 shadow-sm rounded-bl-none'
                      }`}>
                        {msg.message}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {msg.role === 'ai' ? 'AI Assistant' : 'You'}
                      </div>
                    </motion.div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-75" />
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-150" />
                      <span className="text-sm text-gray-500 ml-2">AI is thinking...</span>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                      placeholder="Type your message here... (Press Enter to send, Shift+Enter for new line)"
                      className="min-h-[80px] flex-1"
                    />
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button onClick={handleSend} disabled={!input.trim()}>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                    <Button variant="outline" onClick={toggleListening}>
                      {isListening ? (
                        <>
                          <MicOff className="w-4 h-4 mr-2" />
                          Stop Listening
                        </>
                      ) : (
                        <>
                          <Mic className="w-4 h-4 mr-2" />
                          Voice Input
                        </>
                      )}
                    </Button>
                    <Button variant="outline">
                      <Volume2 className="w-4 h-4 mr-2" />
                      Read Aloud
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Capabilities & Settings */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  AI Capabilities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={selectedCapability} onValueChange={setSelectedCapability}>
                  <TabsList className="grid grid-cols-2 mb-6">
                    <TabsTrigger value="content">Content</TabsTrigger>
                    <TabsTrigger value="technical">Technical</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="content" className="space-y-4">
                    {aiCapabilities.slice(0, 3).map((cap, idx) => (
                      <Button
                        key={idx}
                        variant="outline"
                        className="w-full justify-start h-auto py-3"
                        onClick={() => alert(`Starting ${cap.name}...`)}
                      >
                        <cap.icon className="w-5 h-5 mr-3" />
                        <div className="text-left">
                          <div className="font-medium">{cap.name}</div>
                          <div className="text-sm text-gray-500">{cap.description}</div>
                        </div>
                      </Button>
                    ))}
                  </TabsContent>

                  <TabsContent value="technical" className="space-y-4">
                    {aiCapabilities.slice(3).map((cap, idx) => (
                      <Button
                        key={idx}
                        variant="outline"
                        className="w-full justify-start h-auto py-3"
                        onClick={() => alert(`Starting ${cap.name}...`)}
                      >
                        <cap.icon className="w-5 h-5 mr-3" />
                        <div className="text-left">
                          <div className="font-medium">{cap.name}</div>
                          <div className="text-sm text-gray-500">{cap.description}</div>
                        </div>
                      </Button>
                    ))}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  AI Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Response Length</span>
                    <Badge>Detailed</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Creativity Level</span>
                    <Badge variant="outline">High</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">AI Model</span>
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500">
                      GPT-4 Turbo
                    </Badge>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <Button variant="outline" className="w-full">
                    <Zap className="w-4 h-4 mr-2" />
                    Optimize Settings
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Recent Tasks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { task: 'Blog post about AI trends', time: '2 hours ago' },
                    { task: 'Code review for React component', time: 'Yesterday' },
                    { task: 'Social media content calendar', time: '2 days ago' },
                  ].map((item, idx) => (
                    <div key={idx} className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                      <div className="font-medium text-sm">{item.task}</div>
                      <div className="text-xs text-gray-500">{item.time}</div>
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