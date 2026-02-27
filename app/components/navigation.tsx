'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Github, Home, Menu, X, Wrench } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './navigation.css';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'GitHub', path: '/github', icon: Github },
    { name: 'Tools', path: '/tools', icon: Wrench },
  ];

  return (
    <nav className={`navigation ${scrolled ? 'navigation-scrolled' : ''}`}>
      <div className="navigation-container">
        <Link href="/" className="navigation-logo">
          kura120
        </Link>

        {/* Desktop Navigation */}
        <div className="navigation-desktop">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`navigation-link ${isActive ? 'navigation-link-active' : ''}`}
              >
                <Icon className="navigation-link-icon" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="navigation-mobile-button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="navigation-mobile"
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`navigation-mobile-link ${isActive ? 'navigation-mobile-link-active' : ''}`}
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className="navigation-mobile-link-icon" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

