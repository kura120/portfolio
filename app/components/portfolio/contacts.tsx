'use client';

import React, { useState, useEffect } from 'react';
import { Mail, Github, Headphones, Circle, Loader2, Cpu, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import './contacts.css';

const DISCORD_USER_ID = '877231123476906035';

interface DiscordActivity {
  name: string;
  type: number;
  state?: string;
  details?: string;
  timestamps?: {
    start?: number;
    end?: number;
  };
  assets?: {
    large_image?: string;
    large_text?: string;
    small_image?: string;
    small_text?: string;
  };
  application_id?: string;
}

interface DiscordData {
  discord_user: {
    username: string;
    discriminator: string;
    avatar: string | null;
    global_name: string | null;
    id: string;
  };
  discord_status: 'online' | 'idle' | 'dnd' | 'offline';
  activities: DiscordActivity[];
  active_on_discord_web: boolean;
  active_on_discord_desktop: boolean;
  active_on_discord_mobile: boolean;
}

interface LanyardResponse {
  success: boolean;
  data: DiscordData;
}

export default function Contact() {
  const [discordData, setDiscordData] = useState<DiscordData | null>(null);
  const [discordLoading, setDiscordLoading] = useState(true);

  // Fetch Discord data
  useEffect(() => {
    let ws: WebSocket | null = null;
    let pollInterval: NodeJS.Timeout | null = null;

    const fetchDiscordData = async () => {
      try {
        const response = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_USER_ID}`);
        const data: LanyardResponse = await response.json();
        
        if (data.success && data.data) {
          setDiscordData(data.data);
        }
      } catch (error) {
        console.error('Failed to fetch Discord data:', error);
      } finally {
        setDiscordLoading(false);
      }
    };

    try {
      ws = new WebSocket('wss://api.lanyard.rest/socket');
      
      ws.onopen = () => {
        ws?.send(JSON.stringify({
          op: 2,
          d: {
            subscribe_to_id: DISCORD_USER_ID
          }
        }));
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.op === 1) {
            ws?.send(JSON.stringify({ op: 3 }));
          } else if (data.t === 'INIT_STATE' || data.t === 'PRESENCE_UPDATE') {
            if (data.d) {
              setDiscordData(data.d);
              setDiscordLoading(false);
            }
          }
        } catch (error) {
          console.error('Failed to parse WebSocket message:', error);
        }
      };

      ws.onerror = () => {
        if (!pollInterval) {
          fetchDiscordData();
          pollInterval = setInterval(fetchDiscordData, 10000);
        }
      };

      ws.onclose = () => {
        if (!pollInterval) {
          fetchDiscordData();
          pollInterval = setInterval(fetchDiscordData, 10000);
        }
      };
    } catch (error) {
      fetchDiscordData();
      pollInterval = setInterval(fetchDiscordData, 10000);
    }

    fetchDiscordData();

    return () => {
      if (ws) ws.close();
      if (pollInterval) clearInterval(pollInterval);
    };
  }, []);


  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <div className="contact-header">
          <h2 className="contact-title">Get in Touch</h2>
          <p className="contact-subtitle">Open for collaborations and opportunities</p>
        </div>

        <div className="contact-grid">
          {/* Discord Card */}
          <div className="contact-card discord-card">
            <div className="contact-card-header">
              <Headphones className="w-5 h-5 text-gray-500" />
              <span className="contact-card-label">Discord</span>
            </div>
            
            {discordLoading ? (
              <div className="contact-loading">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Loading...</span>
              </div>
            ) : discordData ? (
              <>
                <div className="contact-discord-profile">
                  <div className="contact-discord-avatar-wrapper">
                    {discordData.discord_user.avatar && (
                      <Image
                        src={`https://cdn.discordapp.com/avatars/${DISCORD_USER_ID}/${discordData.discord_user.avatar}.png?size=128`}
                        alt={discordData.discord_user.username}
                        width={56}
                        height={56}
                        className="contact-discord-avatar"
                      />
                    )}
                    <div className={`contact-discord-status ${discordData.discord_status}`}>
                      <Circle className="w-3 h-3 fill-current" />
                    </div>
                  </div>
                  
                  <div className="contact-discord-info">
                    <a
                      href="https://discord.com/channels/@me/1051660845672828949"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-discord-name-link"
                    >
                      <h3 className="contact-discord-name">
                        {discordData.discord_user.global_name || discordData.discord_user.username}
                        <ExternalLink className="w-4 h-4 inline" />
                      </h3>
                    </a>
                    <p className="contact-discord-username">@{discordData.discord_user.username}</p>
                  </div>
                </div>

                {discordData.activities && discordData.activities.length > 0 && (
                  <div className="contact-discord-activity">
                    <Cpu className="w-4 h-4 text-gray-500" />
                    <div className="contact-activity-info">
                      <p className="contact-activity-name">{discordData.activities[0].name}</p>
                      {discordData.activities[0].details && (
                        <p className="contact-activity-details">{discordData.activities[0].details}</p>
                      )}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="contact-error">
                <span>Offline</span>
              </div>
            )}
          </div>

          {/* GitHub Card */}
          <div className="contact-card github-card">
            <div className="contact-card-header">
              <Github className="w-5 h-5 text-gray-500" />
              <span className="contact-card-label">GitHub</span>
            </div>
            
            <div className="contact-github-content">
              <a
                href="https://github.com/kura120"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-github-link"
              >
                <h3 className="contact-github-name">
                  kura120
                  <ExternalLink className="w-4 h-4 inline" />
                </h3>
              </a>
              <p className="contact-github-description">
                Check out my projects, contributions, and open-source work.
              </p>
            </div>
          </div>

          {/* Email Card */}
          <div className="contact-card email-card">
            <div className="contact-card-header">
              <Mail className="w-5 h-5 text-gray-500" />
              <span className="contact-card-label">Email</span>
            </div>
            
            <div className="contact-email-content">
              <a
                href="mailto:kur4ise@gmail.com"
                className="contact-email-link"
              >
                <h3 className="contact-email-address">
                  kur4ise@gmail.com
                </h3>
              </a>
              <p className="contact-email-description">
                Feel free to reach out for collaborations, opportunities, or just to say hello.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
