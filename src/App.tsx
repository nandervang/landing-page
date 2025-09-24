import { useEffect } from 'react';
import Layout from './components/Layout';
import { HeroGeometric } from './components/ui/shadcn-io/shape-landing-hero';
import KanbanSection from './components/KanbanSection';
import ClientShowcase from './components/ClientShowcase';
import EnhancedFooter from './components/EnhancedFooter';
import ThemeToggle from './components/ThemeToggle';
import { setupScrollAnimations } from './utils/animations';

function App() {
  useEffect(() => {
    setupScrollAnimations();
    document.title = 'Niklas Andervang';
  }, []);

  return (
    <Layout>
      <ThemeToggle />
      <HeroGeometric 
        badge="Niklas Andervang"
        title1="Developer Engineer"
        title2="& Accessibility Specialist"
        description="Crafting exceptional digital experiences through innovative design and cutting-edge technology, with a focus on accessibility and user experience."
      />
      <KanbanSection />
      <ClientShowcase />
      <EnhancedFooter />
    </Layout>
  );
}

export default App;