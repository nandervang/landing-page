import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    
    if (newIsDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 p-3 bg-card border border-border hover:bg-accent transition-all duration-200 z-50 font-mono text-sm"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <div className="flex items-center gap-2">
          <Sun className="w-4 h-4" />
          <span className="hidden sm:inline">LIGHT</span>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Moon className="w-4 h-4" />
          <span className="hidden sm:inline">DARK</span>
        </div>
      )}
    </button>
  );
};

export default ThemeToggle;