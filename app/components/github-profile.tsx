'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Github, 
  Star, 
  GitFork, 
  Calendar,
  MapPin,
  Link as LinkIcon,
  Building2,
  Users,
  Code2,
  TrendingUp,
  Loader2,
  ExternalLink
} from 'lucide-react';
import Image from 'next/image';
import './github-profile.css';

interface GitHubUser {
  login: string;
  name: string;
  avatar_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  location: string | null;
  blog: string | null;
  company: string | null;
  created_at: string;
}

interface Repository {
  id: number;
  name: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  html_url: string;
  homepage: string | null;
  updated_at: string;
  topics: string[];
}

interface GitHubProfileProps {
  username: string;
}

export default function GitHubProfile({ username }: GitHubProfileProps) {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  useEffect(() => {
    const fetchGitHubData = async () => {
      setLoading(true);
      setError(null);

      try {
        console.log('Fetching GitHub data for:', username);
        
        // Fetch user data
        const userResponse = await fetch(`https://api.github.com/users/${username}`);
        console.log('User response status:', userResponse.status);
        
        if (!userResponse.ok) {
          if (userResponse.status === 404) {
            throw new Error('GitHub user not found');
          } else if (userResponse.status === 403) {
            throw new Error('GitHub API rate limit exceeded. Please try again later.');
          } else {
            throw new Error(`GitHub API error: ${userResponse.status}`);
          }
        }
        
        const userData: GitHubUser = await userResponse.json();
        console.log('User data loaded:', userData.login);
        setUser(userData);

        // Fetch repositories
        const reposResponse = await fetch(
          `https://api.github.com/users/${username}/repos?sort=updated&per_page=20&type=all`
        );
        console.log('Repos response status:', reposResponse.status);
        
        if (reposResponse.ok) {
          const reposData: Repository[] = await reposResponse.json();
          console.log('Loaded repos:', reposData.length);
          setRepos(reposData);
        }
      } catch (err) {
        console.error('GitHub fetch error:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch GitHub data');
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, [username]);

  const languages = repos.reduce((acc, repo) => {
    if (repo.language) {
      acc[repo.language] = (acc[repo.language] || 0) + 1;
    }
    return acc;
  }, {} as Record<string, number>);

  const topLanguages = Object.entries(languages)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
  const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  };

  if (loading) {
    return (
      <section className="github-profile-section" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="github-profile-container">
          <div className="github-profile-loading">
            <Loader2 className="github-profile-loading-icon" />
            <p className="github-profile-loading-text">Loading GitHub profile...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error || !user) {
    return (
      <section className="github-profile-section" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="github-profile-container">
          <div className="github-profile-error">
            <p className="github-profile-error-text" style={{ color: '#ef4444' }}>{error || 'Failed to load profile'}</p>
            <button 
              onClick={() => window.location.reload()} 
              style={{ 
                marginTop: '1rem', 
                padding: '0.5rem 1rem', 
                background: '#fff', 
                color: '#000', 
                borderRadius: '0.5rem',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Retry
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="github-profile-section" style={{ background: '#000', color: '#fff', position: 'relative', zIndex: 1 }}>
      <div className="github-profile-container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="github-profile-header"
        >
          <div className="github-profile-avatar-wrapper">
            <Image
              src={user.avatar_url}
              alt={user.name || user.login}
              width={120}
              height={120}
              className="github-profile-avatar"
            />
          </div>
          <div className="github-profile-info">
            <h1 className="github-profile-name">{user.name || user.login}</h1>
            <p className="github-profile-username">@{user.login}</p>
            {user.bio && (
              <p className="github-profile-bio">{user.bio}</p>
            )}
            <div className="github-profile-meta">
              {user.location && (
                <div className="github-profile-meta-item">
                  <MapPin className="github-profile-meta-icon" />
                  <span>{user.location}</span>
                </div>
              )}
              {user.company && (
                <div className="github-profile-meta-item">
                  <Building2 className="github-profile-meta-icon" />
                  <span>{user.company}</span>
                </div>
              )}
              {user.blog && (
                <a
                  href={user.blog}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="github-profile-meta-item github-profile-meta-link"
                >
                  <LinkIcon className="github-profile-meta-icon" />
                  <span>{user.blog.replace(/^https?:\/\//, '')}</span>
                </a>
              )}
              <div className="github-profile-meta-item">
                <Calendar className="github-profile-meta-icon" />
                <span>Joined {formatDate(user.created_at)}</span>
              </div>
            </div>
            <a
              href={`https://github.com/${user.login}`}
              target="_blank"
              rel="noopener noreferrer"
              className="github-profile-external-link"
            >
              View on GitHub
              <ExternalLink className="github-profile-external-link-icon" />
            </a>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="github-profile-stats"
        >
          <div className="github-profile-stat-card">
            <div className="github-profile-stat-icon-wrapper">
              <Code2 className="github-profile-stat-icon" />
            </div>
            <div className="github-profile-stat-content">
              <p className="github-profile-stat-value">{user.public_repos}</p>
              <p className="github-profile-stat-label">Repositories</p>
            </div>
          </div>
          <div className="github-profile-stat-card">
            <div className="github-profile-stat-icon-wrapper">
              <Star className="github-profile-stat-icon" />
            </div>
            <div className="github-profile-stat-content">
              <p className="github-profile-stat-value">{totalStars}</p>
              <p className="github-profile-stat-label">Total Stars</p>
            </div>
          </div>
          <div className="github-profile-stat-card">
            <div className="github-profile-stat-icon-wrapper">
              <GitFork className="github-profile-stat-icon" />
            </div>
            <div className="github-profile-stat-content">
              <p className="github-profile-stat-value">{totalForks}</p>
              <p className="github-profile-stat-label">Total Forks</p>
            </div>
          </div>
          <div className="github-profile-stat-card">
            <div className="github-profile-stat-icon-wrapper">
              <Users className="github-profile-stat-icon" />
            </div>
            <div className="github-profile-stat-content">
              <p className="github-profile-stat-value">{user.followers}</p>
              <p className="github-profile-stat-label">Followers</p>
            </div>
          </div>
          <div className="github-profile-stat-card">
            <div className="github-profile-stat-icon-wrapper">
              <Users className="github-profile-stat-icon" />
            </div>
            <div className="github-profile-stat-content">
              <p className="github-profile-stat-value">{user.following}</p>
              <p className="github-profile-stat-label">Following</p>
            </div>
          </div>
          <div className="github-profile-stat-card">
            <div className="github-profile-stat-icon-wrapper">
              <TrendingUp className="github-profile-stat-icon" />
            </div>
            <div className="github-profile-stat-content">
              <p className="github-profile-stat-value">{topLanguages.length}</p>
              <p className="github-profile-stat-label">Languages</p>
            </div>
          </div>
        </motion.div>

        {/* Top Languages */}
        {topLanguages.length > 0 && (
          <motion.div
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="github-profile-languages"
          >
            <h2 className="github-profile-section-title">Top Languages</h2>
            <div className="github-profile-languages-grid">
              {topLanguages.map(([language, count]) => (
                <div key={language} className="github-profile-language-item">
                  <div className="github-profile-language-dot" />
                  <span className="github-profile-language-name">{language}</span>
                  <span className="github-profile-language-count">{count} repos</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Repositories */}
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="github-profile-repos"
        >
          <h2 className="github-profile-section-title">Repositories</h2>
          <div className="github-profile-repos-grid">
            {repos.map((repo, index) => (
              <motion.div
                key={repo.id}
                initial={{ opacity: 1, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.05 }}
                className="github-profile-repo-card"
              >
                <div className="github-profile-repo-header">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="github-profile-repo-title"
                  >
                    <Github className="github-profile-repo-icon" />
                    <span>{repo.name}</span>
                  </a>
                  {repo.homepage && (
                    <a
                      href={repo.homepage}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="github-profile-repo-link"
                    >
                      <ExternalLink className="github-profile-repo-link-icon" />
                    </a>
                  )}
                </div>
                {repo.description && (
                  <p className="github-profile-repo-description">{repo.description}</p>
                )}
                <div className="github-profile-repo-footer">
                  {repo.language && (
                    <div className="github-profile-repo-meta">
                      <div className="github-profile-repo-language-dot" />
                      <span>{repo.language}</span>
                    </div>
                  )}
                  <div className="github-profile-repo-meta">
                    <Star className="github-profile-repo-meta-icon" />
                    <span>{repo.stargazers_count}</span>
                  </div>
                  <div className="github-profile-repo-meta">
                    <GitFork className="github-profile-repo-meta-icon" />
                    <span>{repo.forks_count}</span>
                  </div>
                  {repo.updated_at && (
                    <div className="github-profile-repo-meta">
                      <span className="github-profile-repo-updated">
                        Updated {formatDate(repo.updated_at)}
                      </span>
                    </div>
                  )}
                </div>
                {repo.topics && repo.topics.length > 0 && (
                  <div className="github-profile-repo-topics">
                    {repo.topics.slice(0, 5).map((topic) => (
                      <span key={topic} className="github-profile-repo-topic">
                        {topic}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

