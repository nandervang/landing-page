import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';

const ThemeToggle = () => {
  // Initialize theme immediately to prevent flash
  const [isDark, setIsDark] = useState(() => {
    // Check for saved theme preference or default to dark mode
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      const shouldBeDark = savedTheme !== 'light'; // Default to dark unless explicitly light
      
      // Apply theme immediately
      if (shouldBeDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      
      return shouldBeDark;
    }
    return true; // Default to dark for SSR
  });

  useEffect(() => {
    // Ensure theme is applied correctly after mount
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

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