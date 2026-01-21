import {
  Home,
  BarChart3,
  Users,
  Settings,
  FileText,
  DollarSign,
  MessageSquare,
  Calendar,
  Brain,
  Image,
  Bot,
  Cloud,
  Shield,
  Database,
  Zap
} from 'lucide-react';

export const mainNavigation = [
  {
    title: 'Dashboard',
    href: '/dashboard',
    icon: Home,
    description: 'Overview and analytics',
  },
  {
    title: 'AI Studio',
    href: '/ai-studio',
    icon: Brain,
    description: 'AI tools and automation',
    children: [
      { title: 'Content Studio', href: '/ai-studio/content' },
      { title: 'Image Generator', href: '/ai-studio/images' },
      { title: 'AI Assistant', href: '/ai-studio/assistant' },
    ],
  },
  {
    title: 'Analytics',
    href: '/analytics',
    icon: BarChart3,
    description: 'Reports and insights',
  },
  {
    title: 'Projects',
    href: '/projects',
    icon: FileText,
    description: 'Project management',
  },
  {
    title: 'Team',
    href: '/team',
    icon: Users,
    description: 'Team collaboration',
  },
  {
    title: 'Billing',
    href: '/billing',
    icon: DollarSign,
    description: 'Payments and invoices',
  },
  {
    title: 'Settings',
    href: '/settings',
    icon: Settings,
    description: 'System configuration',
  },
];

export const adminNavigation = [
  {
    title: 'Admin Panel',
    href: '/admin',
    icon: Shield,
    description: 'System administration',
  },
  {
    title: 'User Management',
    href: '/admin/users',
    icon: Users,
    description: 'Manage user accounts',
  },
  {
    title: 'System Settings',
    href: '/admin/settings',
    icon: Settings,
    description: 'Configure system settings',
  },
  {
    title: 'Audit Logs',
    href: '/admin/logs',
    icon: Database,
    description: 'System activity logs',
  },
];

export const marketingPages = [
  { title: 'Home', href: '/' },
  { title: 'Features', href: '/features' },
  { title: 'Pricing', href: '/pricing' },
  { title: 'About', href: '/about' },
  { title: 'Contact', href: '/contact' },
  { title: 'Blog', href: '/blog' },
];

export const footerNavigation = {
  product: [
    { name: 'Features', href: '/features' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'API', href: '/api' },
    { name: 'Documentation', href: '/docs' },
  ],
  company: [
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Careers', href: '/careers' },
    { name: 'Press', href: '/press' },
  ],
  legal: [
    { name: 'Privacy', href: '/privacy' },
    { name: 'Terms', href: '/terms' },
    { name: 'Security', href: '/security' },
    { name: 'Cookies', href: '/cookies' },
  ],
  support: [
    { name: 'Help Center', href: '/help' },
    { name: 'Contact', href: '/contact' },
    { name: 'Status', href: '/status' },
    { name: 'Community', href: '/community' },
  ],
};