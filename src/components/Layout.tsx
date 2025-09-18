import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
    
    setIsDark(shouldBeDark);
    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(prevDark => {
      const newDark = !prevDark;
      document.documentElement.classList.toggle('dark', newDark);
      localStorage.setItem('theme', newDark ? 'dark' : 'light');
      return newDark;
    });
  };

  return (
    <div className="relative min-h-screen">
      <button
        onClick={toggleTheme}
        className={`fixed top-6 right-6 z-50 p-2 rounded-full transition-all duration-300 ${
          isDark 
            ? 'bg-emerald-400/10 text-emerald-400 hover:bg-emerald-400/20' 
            : 'bg-white/10 text-white hover:bg-white/20'
        } backdrop-blur-sm`}
        aria-label="Toggle theme"
      >
        {isDark ? <Sun size={20} /> : <Moon size={20} />}
      </button>
      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
};

export default Layout;