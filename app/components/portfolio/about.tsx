
'use client';
import React from 'react';
import { Terminal, Palette, Lock } from 'lucide-react';
import './about.css';

  // Map tech names to SimpleIcons slugs
const simpleIconSlugs: Record<string, string> = {
  'Python': 'python',
  'TypeScript': 'typescript',
  'JavaScript': 'javascript',
  'Lua': 'lua',
  'React': 'react',
  'Next.js': 'nextdotjs',
  'Tailwind CSS': 'tailwindcss',
  'Electron': 'electron',
  'Vite': 'vite',
  'Node.js': 'nodedotjs',
  'FastAPI': 'fastapi',
  'Git': 'git',
  'Ollama': 'ollama',
  'Arduino': 'arduino',
  'SQLite': 'sqlite',
};

export default function About() {
  const techStack = [
    {
      category: 'Languages',
      stack: ['Python', 'TypeScript', 'JavaScript', 'Lua']
    },
    {
      category: 'Frontend',
      stack: ['React', 'Next.js', 'Tailwind CSS', 'Electron', 'Vite']
    },
    {
      category: 'Backend & Tools',
      stack: ['Node.js', 'FastAPI', 'Git', 'Ollama', 'Arduino', 'SQLite']
    }
  ];

  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <div className="about-title">
          <h2>About</h2>
          <p className="about-subtitle">
            I'm a full-stack developer who builds complete web applications from frontend to backend. 
            I work with Next.js and Tailwind CSS for modern UIs, and create custom REST APIs with Node.js, Python, and PHP.
          </p>
          <p className="about-subtitle">
            Beyond web development, I build IoT projects using Arduino connected to web dashboards, 
            design user interfaces, and do penetration testing to secure systems.
          </p>
        </div>

        <div className="about-grid">
          {techStack.map((section) => (
            <div key={section.category} className="about-card">
              <h3 className="about-card-title">{section.category}</h3>
              <div className="about-card-stack">
                {section.stack.map(tech => (
                  <span key={tech} className="about-stack-badge flex items-center gap-2">
                    <img
                      height={18}
                      width={18}
                      src={`https://cdn.simpleicons.org/${simpleIconSlugs[tech]}/white`}
                      alt={tech + ' icon'}
                      style={{ display: 'inline-block', verticalAlign: 'middle' }}
                    />
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
