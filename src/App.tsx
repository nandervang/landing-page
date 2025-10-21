import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from './components/Layout';
import { HeroGeometric } from './components/ui/shadcn-io/shape-landing-hero';
import KanbanSection from './components/KanbanSection';
import ClientShowcase from './components/ClientShowcase';
import EnhancedFooter from './components/EnhancedFooter';
import ThemeToggle from './components/ThemeToggle';
import AppLoader from './components/AppLoader';
import { setupScrollAnimations } from './utils/animations';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const cleanup = setupScrollAnimations();
    document.title = 'Andervang Consulting';
    
    // Set dark mode by default during loading
    document.documentElement.classList.add('dark');
    
    // Check if this is the first visit
    const hasVisited = localStorage.getItem('andervang-visited');
    
    if (!hasVisited) {
      // First visit - show loader and keep loading state
      setShowLoader(true);
      setIsLoading(true);
      // Don't mark as visited yet - wait until loader completes
    } else {
      // Not first visit - skip loader entirely
      setShowLoader(false);
      setIsLoading(false);
    }
    
    return cleanup;
  }, []);

  const handleLoadingComplete = () => {
    // Mark as visited only when the loader actually completes
    localStorage.setItem('andervang-visited', 'true');
    setIsLoading(false);
  };

  return (
    <AnimatePresence mode="wait">
      {isLoading && showLoader ? (
        <AppLoader key="loader" onComplete={handleLoadingComplete} />
      ) : (
        <motion.div
          key="app"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Layout>
            <ThemeToggle />
            <HeroGeometric 
              badge="Andervang Consulting"
              title1="Tech Engineers"
              title2="Specialists"
              description="Partner with Andervang Consulting to elevate your digital initiatives. You gain direct access to our team of senior consultants, specialists, and Leading-Edge engineers."
            />
            <KanbanSection />
            <ClientShowcase />
            <EnhancedFooter />
          </Layout>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default App;
