'use client';

import React, { useState, useEffect } from 'react';
import { ExternalLink, Github, Star, GitFork, Loader2 } from 'lucide-react';
import './projects.css';

interface Repo {
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  homepage: string | null;
  html_url: string;
}

interface Project {
  title: string;
  description: string;
  tags: string[];
  link?: string | null;
  github?: string;
  stars?: number;
  forks?: number;
}

export default function Projects() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Auto-load GitHub repos on mount
  useEffect(() => {
    fetchGithubRepos('kura120');
  }, []);

  const fetchGithubRepos = async (username: string) => {
    if (!username.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
      
      if (!response.ok) {
        throw new Error('GitHub user not found');
      }
      
      const data = await response.json() as Repo[];
      setRepos(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch repos');
      setRepos([]);
    } finally {
      setLoading(false);
    }
  };

  // Featured static projects (shown before GitHub repos are loaded)
  const featuredProjects: Project[] = [
    {
      title: 'Featured Project 1',
      description: 'A modern web application built with React and Tailwind CSS',
      tags: ['React', 'Tailwind', 'Node.js'],
      link: '#',
      github: '#'
    },
    {
      title: 'Featured Project 2',
      description: 'E-commerce platform with real-time inventory management',
      tags: ['Next.js', 'TypeScript', 'PostgreSQL'],
      link: '#',
      github: '#'
    },
    {
      title: 'Featured Project 3',
      description: 'Mobile-first design system and component library',
      tags: ['React', 'Storybook', 'CSS'],
      link: '#',
      github: '#'
    }
  ];

  const projectsToShow: Project[] = repos.length > 0 
    ? repos.map(repo => ({
        title: repo.name,
        description: repo.description || 'No description available',
        tags: repo.language ? [repo.language] : [],
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        link: repo.homepage,
        github: repo.html_url
      }))
    : featuredProjects;

  return (
    <section id="projects" className="projects-section">
      <div className="projects-container">
        <div className="projects-header">
          <h2 className="projects-title">
            Selected Work
          </h2>
          
          {/* GitHub Link */}
          <div className="projects-github-link-section">
            <a
              href="https://github.com/kura120"
              target="_blank"
              rel="noopener noreferrer"
              className="projects-github-link"
            >
              <Github className="w-5 h-5" />
              <span className="projects-github-text">@kura120</span>
            </a>
            {loading && <Loader2 className="w-4 h-4 animate-spin text-gray-500" />}
          </div>
        </div>

        <div className="projects-grid">
          {projectsToShow.map((project) => (
            <div
              key={project.title}
              className="projects-card group"
            >
              <div className="projects-card-content">
                <div className="projects-card-header">
                  <h3 className="projects-card-title group-hover:text-gray-300">
                    {project.title}
                  </h3>
                  <div className="projects-card-links">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="projects-card-link"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {project.link && project.link !== '#' && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="projects-card-link"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                <p className="projects-card-description">
                  {project.description}
                </p>

                {project.tags && project.tags.length > 0 && (
                  <div className="projects-tags-container">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="projects-tag"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {(project.stars !== undefined || project.forks !== undefined) && (
                  <div className="projects-stats">
                    {project.stars !== undefined && (
                      <span className="projects-stat-item">
                        <Star className="w-3 h-3" />
                        {project.stars}
                      </span>
                    )}
                    {project.forks !== undefined && (
                      <span className="projects-stat-item">
                        <GitFork className="w-3 h-3" />
                        {project.forks}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

