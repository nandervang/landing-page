import React from 'react';
import { Mail } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Gradient Background - adjusts with dark mode */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-800 to-blue-700 dark:from-emerald-950 dark:via-gray-900 dark:to-gray-950 transition-colors duration-300 z-0"></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 z-10 text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white dark:text-emerald-400 mb-6 tracking-tight transition-colors duration-300">
          <span className="block">Niklas Andervang</span>
          <span className="text-2xl md:text-3xl lg:text-4xl font-light mt-4 inline-block text-white/90 dark:text-emerald-400/90">
            Developer Engineer & Accessibility specialist
          </span>
        </h1>
        
        <div className="mt-12">
          <a 
            href="mailto:niklas@andervang.com"
            className="inline-flex items-center gap-2 bg-white/10 dark:bg-emerald-400/10 text-white dark:text-emerald-400 px-8 py-3 rounded-full font-semibold hover:bg-white/20 dark:hover:bg-emerald-400/20 transition-all duration-300 backdrop-blur-sm"
          >
            <Mail size={20} />
            Get in touch
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;