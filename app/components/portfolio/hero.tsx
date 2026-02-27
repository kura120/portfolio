'use client';

import React from 'react';
import { ArrowDown } from 'lucide-react';
import Image from 'next/image';
import './hero.css';

export default function Hero() {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero-section">
      {/* Subtle grid background */}
      <div className="hero-grid-bg" />
      
      <div className="hero-container">
        <div className="hero-content-wrapper">
          <div className="hero-text-section">
            {/* Main heading */}
            <div className="hero-heading-section">
              <h1 className="hero-main-heading">
                <span className="hero-heading-italic">kura120</span>
              </h1>
              
              <p className="hero-description">
                Full-stack developer building web apps, IoT systems, and security tools.
              </p>
            </div>

            {/* CTA buttons */}
            <div className="hero-cta-section">
              <button
                onClick={() => scrollToSection('projects')}
                className="hero-cta-primary group"
              >
                <span className="flex items-center gap-2">
                  View Projects
                  <span className="inline-block arrow-icon">
                    →
                  </span>
                </span>
              </button>

              <button
                onClick={() => scrollToSection('contact')}
                className="hero-cta-secondary"
              >
                Contact
              </button>
            </div>
          </div>

          {/* Profile Picture */}
          <div className="hero-profile-wrapper">
            <Image
              src="https://github.com/kura120.png"
              alt="Profile"
              width={320}
              height={320}
              className="hero-profile-image"
            />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => scrollToSection('about')}
        className="hero-scroll-indicator group"
      >
        <ArrowDown className="w-6 h-6" />
      </button>
    </section>
  );
}
