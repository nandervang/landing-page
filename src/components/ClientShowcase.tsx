import { useState, useEffect } from "react";
import { Marquee, MarqueeContent, MarqueeItem } from "@/components/ui/shadcn-io/marquee";
import { Play, Pause } from "lucide-react";
import { useMotionPreference } from "@/hooks/useMotionPreference";

interface Client {
  name: string;
  logo: string;
  alt: string;
  website?: string;
}

// Company logos using Slack logo for consistent display
const clients: Client[] = [
  {
    name: "Microsoft",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/slack/slack-original.svg",
    alt: "Microsoft",
    website: "https://microsoft.com"
  },
  {
    name: "Apple",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/slack/slack-original.svg",
    alt: "Apple",
    website: "https://apple.com"
  },
  {
    name: "Google",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/slack/slack-original.svg",
    alt: "Google",
    website: "https://google.com"
  },
  {
    name: "Amazon",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/slack/slack-original.svg",
    alt: "Amazon",
    website: "https://amazon.com"
  },
  {
    name: "Facebook",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/slack/slack-original.svg",
    alt: "Facebook",
    website: "https://facebook.com"
  },
  {
    name: "Netflix",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/slack/slack-original.svg",
    alt: "Netflix",
    website: "https://netflix.com"
  },
  {
    name: "Spotify",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/slack/slack-original.svg",
    alt: "Spotify", 
    website: "https://spotify.com"
  },
  {
    name: "Slack",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/slack/slack-original.svg",
    alt: "Slack",
    website: "https://slack.com"
  },
  {
    name: "Netflix",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/slack/slack-original.svg",
    alt: "Netflix",
    website: "https://netflix.com"
  },
  {
    name: "Spotify",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/slack/slack-original.svg",
    alt: "Spotify", 
    website: "https://spotify.com"
  },
  {
    name: "Slack",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/slack/slack-original.svg",
    alt: "Slack",
    website: "https://slack.com"
  },
  {
    name: "Netflix",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/slack/slack-original.svg",
    alt: "Netflix",
    website: "https://netflix.com"
  },
  {
    name: "Spotify",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/slack/slack-original.svg",
    alt: "Spotify", 
    website: "https://spotify.com"
  },
  {
    name: "Slack",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/slack/slack-original.svg",
    alt: "Slack",
    website: "https://slack.com"
  },
  {
    name: "Netflix",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/slack/slack-original.svg",
    alt: "Netflix",
    website: "https://netflix.com"
  },
  {
    name: "Spotify",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/slack/slack-original.svg",
    alt: "Spotify", 
    website: "https://spotify.com"
  },
  {
    name: "Slack",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/slack/slack-original.svg",
    alt: "Slack",
    website: "https://slack.com"
  }
];

const ClientShowcase = () => {
  const prefersReducedMotion = useMotionPreference();
  const [isPaused, setIsPaused] = useState(false);

  // Auto-pause marquee if user prefers reduced motion
  useEffect(() => {
    if (prefersReducedMotion) {
      setIsPaused(true);
    }
  }, [prefersReducedMotion]);

  return (
    <section className="py-16 bg-gray-50 dark:bg-custom-dark transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Trusted by Industry Leaders
            </h2>
            <button
              onClick={() => setIsPaused(!isPaused)}
              className={`inline-flex items-center justify-center w-8 h-8 rounded-full bg-white dark:bg-custom-dark-lighter shadow-md hover:shadow-lg text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                prefersReducedMotion ? '' : 'transition-shadow duration-200'
              } ${prefersReducedMotion ? 'ring-2 ring-amber-400' : ''}`}
              aria-label={`${isPaused || prefersReducedMotion ? "Enable" : "Disable"} marquee animation${prefersReducedMotion ? ' (currently using scrollbar due to motion preference)' : isPaused ? ' (currently using scrollbar)' : ''}`}
              title={
                prefersReducedMotion 
                  ? "Motion reduced - using horizontal scrollbar. Click to enable animation." 
                  : isPaused 
                    ? "Animation paused - using horizontal scrollbar. Click to enable animation."
                    : "Animation active. Click to pause and show scrollbar."
              }
            >
              {isPaused || prefersReducedMotion ? (
                <Play className="w-4 h-4 ml-0.5" />
              ) : (
                <Pause className="w-4 h-4" />
              )}
            </button>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Leading the Way with Experience and Dedication That Earns Your Trust
          </p>
        </div>
        
        <div className="relative">
          {(isPaused || prefersReducedMotion) ? (
            // Static horizontal scroll version for paused/reduced motion
            <div 
              className="overflow-x-auto py-8 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 hover:scrollbar-thumb-gray-500"
              role="region"
              aria-label="Company logos - scroll horizontally to view all"
            >
              <div className="flex gap-6 w-max px-6">
                {clients.map((client, index) => (
                  <div 
                    key={index}
                    className="flex-shrink-0"
                  >
                    <div 
                      className={`w-24 h-24 rounded-lg border-2 border-gray-200 dark:border-custom-dark bg-white dark:bg-custom-dark-lighter shadow-md flex items-center justify-center p-4 grayscale hover:grayscale-0 hover:border-emerald-300 dark:hover:border-emerald-500 ${
                        prefersReducedMotion ? '' : 'transition-all duration-300'
                      }`}
                      role="img"
                      aria-label={`${client.name} logo`}
                    >
                      <img
                        src={client.logo}
                        alt=""
                        aria-hidden="true"
                        className="w-12 h-12 object-contain"
                        loading="lazy"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            // Animated marquee version
            <Marquee className="relative overflow-hidden py-8">
              <div className="absolute top-0 bottom-0 left-0 z-10 h-full w-24 bg-gradient-to-r from-white dark:from-[rgb(21,22,24)] to-transparent" />
              <div className="absolute top-0 bottom-0 right-0 z-10 h-full w-24 bg-gradient-to-l from-white dark:from-[rgb(21,22,24)] to-transparent" />
              <MarqueeContent 
                pauseOnHover={!isPaused} 
                autoFill 
                play={!isPaused}
                className="[--duration:45s]"
              >
                {clients.map((client, index) => (
                  <MarqueeItem key={index} className="mx-6">
                    <div 
                      className={`w-24 h-24 rounded-lg border-2 border-gray-200 dark:border-custom-dark bg-white dark:bg-custom-dark-lighter shadow-md flex items-center justify-center p-4 grayscale hover:grayscale-0 hover:border-emerald-300 dark:hover:border-emerald-500 ${
                        prefersReducedMotion ? '' : 'transition-all duration-300'
                      }`}
                      role="img"
                      aria-label={`${client.name} logo`}
                    >
                      <img
                        src={client.logo}
                        alt=""
                        aria-hidden="true"
                        className="w-12 h-12 object-contain"
                        loading="lazy"
                      />
                    </div>
                  </MarqueeItem>
                ))}
              </MarqueeContent>
            </Marquee>
          )}
        </div>
        
        <div className="text-center mt-8">
          {(isPaused || prefersReducedMotion) && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
              💡 Scroll horizontally to view all company logos
            </p>
          )}
          <div className="flex items-center justify-center gap-4">
            <div className="relative">
              {/* Animated code block */}
              <div className="bg-gray-800 dark:bg-code-block rounded-lg p-4 font-mono text-sm border border-gray-300 dark:border-gray-600 shadow-lg max-w-md">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="space-y-1">
                  <div className="text-green-400">
                    <span className="text-blue-300">const</span> partnership = <span className="text-orange-300">{`{`}</span>
                  </div>
                  <div className="text-gray-300 pl-4">
                    success: <span className="text-yellow-300">true</span>,
                  </div>
                  <div className="text-gray-300 pl-4">
                    innovation: <span className="text-purple-300">'unlimited'</span>,
                  </div>
                  <div className="text-gray-300 pl-4">
                    nextProject: <span className="text-emerald-300">'yours'</span>
                  </div>
                  <div className="text-green-400">
                    <span className="text-orange-300">{`}`}</span>;
                  </div>
                </div>
                {/* Animated cursor */}
                <span className="inline-block w-2 h-4 bg-white dark:bg-custom-dark-lightest ml-1 animate-pulse"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientShowcase;