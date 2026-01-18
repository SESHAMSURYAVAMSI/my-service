'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Home,
  BarChart3,
  Users,
  Settings,
  FileText,
  DollarSign,
  MessageSquare,
  Calendar,
  Bell,
  HelpCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
  User,
  Shield,
  Database,
  Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';

const menuItems = [
  { icon: Home, label: 'Dashboard', href: '/dashboard', badge: null },
  { icon: BarChart3, label: 'Analytics', href: '/analytics', badge: 'New' },
  { icon: Users, label: 'Team', href: '/team', badge: null },
  { icon: FileText, label: 'Projects', href: '/projects', badge: '5' },
  { icon: MessageSquare, label: 'Messages', href: '/messages', badge: '3' },
  { icon: Calendar, label: 'Calendar', href: '/calendar', badge: null },
  { icon: DollarSign, label: 'Billing', href: '/billing', badge: null },
  { icon: Settings, label: 'Settings', href: '/settings', badge: null },
];

const adminItems = [
  { icon: Shield, label: 'Admin Panel', href: '/admin', badge: null },
  { icon: Database, label: 'Database', href: '/admin/database', badge: null },
  { icon: Users, label: 'User Management', href: '/admin/users', badge: null },
];

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const pathname = usePathname();

  const expanded = isHovered || !isCollapsed;

  return (
    <motion.aside
      initial={{ width: 256 }}
      animate={{ width: expanded ? 256 : 80 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="hidden md:flex flex-col h-screen bg-gradient-to-b from-gray-900 to-black border-r border-gray-800 sticky top-0"
    >
      {/* Logo */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Zap className="w-6 h-6 text-white" />
          </div>
          {expanded && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex-1"
            >
              <h1 className="text-xl font-bold text-white">ServicePro</h1>
              <p className="text-xs text-gray-400">Enterprise Suite</p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-1">
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-2 px-2">
            {expanded ? 'Main Menu' : '•'}
          </p>
          
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start h-12 mb-1",
                    isActive 
                      ? "bg-blue-900/30 text-blue-400 border-l-4 border-blue-500" 
                      : "text-gray-400 hover:text-white hover:bg-gray-800"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  {expanded && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="ml-3 flex-1 text-left"
                    >
                      {item.label}
                    </motion.span>
                  )}
                  {item.badge && expanded && (
                    <span className="ml-auto px-2 py-0.5 text-xs bg-blue-500 text-white rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Button>
              </Link>
            );
          })}
        </div>

        {/* Admin Section */}
        <div className="mt-8">
          <p className="text-xs text-gray-500 uppercase tracking-wider mb-2 px-2">
            {expanded ? 'Administration' : '••'}
          </p>
          
          {adminItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button
                variant="ghost"
                className="w-full justify-start h-12 mb-1 text-gray-400 hover:text-white hover:bg-gray-800"
              >
                <item.icon className="w-5 h-5" />
                {expanded && (
                  <span className="ml-3 flex-1 text-left">
                    {item.label}
                  </span>
                )}
              </Button>
            </Link>
          ))}
        </div>
      </nav>

      {/* User Profile & Collapse Button */}
      <div className="p-4 border-t border-gray-800">
        <Button
          onClick={() => setIsCollapsed(!isCollapsed)}
          variant="ghost"
          size="icon"
          className="absolute -right-3 top-1/2 bg-gray-800 border border-gray-700 hover:bg-gray-700"
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </Button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          
          {expanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex-1"
            >
              <p className="text-sm font-medium text-white">Alex Johnson</p>
              <p className="text-xs text-gray-400">Admin</p>
            </motion.div>
          )}
          
          {expanded && (
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
              <LogOut className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </motion.aside>
  );
}