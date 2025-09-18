import React, { useEffect } from 'react';
import Layout from './components/Layout';
import Hero from './components/Hero';
import { setupScrollAnimations } from './utils/animations';

function App() {
  useEffect(() => {
    setupScrollAnimations();
    document.title = 'Niklas Andervang';
  }, []);

  return (
    <Layout>
      <Hero />
    </Layout>
  );
}

export default App;