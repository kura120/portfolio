'use client';

import React, { useRef, useEffect } from 'react';
import { Terminal, Palette, Lock, Wrench, Code2, Database, Shield, Lightbulb } from 'lucide-react';
import gsap from 'gsap';
import './skills.css';

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !sectionRef.current) return;

    const titleObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.to(titleRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power2.out',
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    if (titleRef.current) {
      titleObserver.observe(titleRef.current);
    }

    const gridObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && gridRef.current) {
            const items = gridRef.current.querySelectorAll('.skill-item');
            gsap.to(items, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.08,
              ease: 'power2.out',
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (gridRef.current) {
      gridObserver.observe(gridRef.current);
    }

    return () => {
      titleObserver.disconnect();
      gridObserver.disconnect();
    };
  }, []);

  const skills = [
    { name: 'Next.js', icon: Code2, category: 'Frontend' },
    { name: 'React', icon: Code2, category: 'Frontend' },
    { name: 'Tailwind CSS', icon: Palette, category: 'Frontend' },
    { name: 'TypeScript', icon: Code2, category: 'Frontend' },
    { name: 'Node.js', icon: Terminal, category: 'Backend' },
    { name: 'Python', icon: Terminal, category: 'Backend' },
    { name: 'PHP', icon: Terminal, category: 'Backend' },
    { name: 'MongoDB', icon: Database, category: 'Backend' },
    { name: 'REST APIs', icon: Database, category: 'Backend' },
    { name: 'Arduino', icon: Lightbulb, category: 'IoT' },
    { name: 'IoT Systems', icon: Lightbulb, category: 'IoT' },
    { name: 'Pentesting', icon: Shield, category: 'Security' },
    { name: 'Cybersecurity', icon: Shield, category: 'Security' },
    { name: 'Git', icon: Wrench, category: 'Tools' },
    { name: 'Figma', icon: Palette, category: 'Tools' },
    { name: 'UI/UX Design', icon: Palette, category: 'Tools' },
  ];

  return (
    <section id="skills" ref={sectionRef} className="skills-section">
      <div className="skills-container">
        <div ref={titleRef} className="skills-title">
          <h2>Skills</h2>
        </div>

        <div ref={gridRef} className="skills-grid">
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <div key={`${skill.name}-${index}`} className="skill-item">
                <div className="skill-icon-wrapper">
                  <Icon className="skill-icon" />
                </div>
                <div className="skill-content">
                  <h3 className="skill-name">{skill.name}</h3>
                  <p className="skill-category">{skill.category}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
