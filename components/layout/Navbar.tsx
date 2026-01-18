'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, Phone, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { motion, AnimatePresence } from 'framer-motion';

const services = [
  { name: 'Web Development', href: '/services/web' },
  { name: 'Digital Marketing', href: '/services/marketing' },
  { name: 'UI/UX Design', href: '/services/design' },
  { name: 'SEO Optimization', href: '/services/seo' },
  { name: 'E-commerce Solutions', href: '/services/ecommerce' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ServicePro
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link href="/" className="font-medium hover:text-blue-600 transition-colors">
              Home
            </Link>
            
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center font-medium hover:text-blue-600 transition-colors">
                Services <ChevronDown className="ml-1 w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                {services.map((service) => (
                  <DropdownMenuItem key={service.name} asChild>
                    <Link href={service.href}>{service.name}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/portfolio" className="font-medium hover:text-blue-600 transition-colors">
              Portfolio
            </Link>
            <Link href="/pricing" className="font-medium hover:text-blue-600 transition-colors">
              Pricing
            </Link>
            <Link href="/about" className="font-medium hover:text-blue-600 transition-colors">
              About
            </Link>
          </div>

          {/* Right side buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input placeholder="Search..." className="pl-10 w-40" />
            </div>
            <Button variant="ghost" className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>Contact</span>
            </Button>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90">
              Get Started
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-md text-gray-700"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden mt-4 bg-white rounded-lg shadow-xl overflow-hidden"
            >
              <div className="px-4 py-6 space-y-4">
                <Link href="/" className="block py-2 font-medium">
                  Home
                </Link>
                <div>
                  <h3 className="font-medium mb-2">Services</h3>
                  <div className="pl-4 space-y-2">
                    {services.map((service) => (
                      <Link key={service.name} href={service.href} className="block py-1 text-gray-600">
                        {service.name}
                      </Link>
                    ))}
                  </div>
                </div>
                <Link href="/portfolio" className="block py-2 font-medium">
                  Portfolio
                </Link>
                <Link href="/pricing" className="block py-2 font-medium">
                  Pricing
                </Link>
                <Link href="/about" className="block py-2 font-medium">
                  About
                </Link>
                <div className="pt-4 border-t">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600">
                    Get Started
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}