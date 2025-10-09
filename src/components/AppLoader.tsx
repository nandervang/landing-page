import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoaderProps {
  onComplete: () => void;
}

const AppLoader = ({ onComplete }: LoaderProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  const loadingSteps = useMemo(() => [
    { text: '$ Setting theme to dark mode...', delay: 200 },
    { text: '✓ Dark mode enabled', delay: 300 },
    { text: '$ Initializing Andervang Consulting app...', delay: 400 },
    { text: '✓ Loading components', delay: 300 },
    { text: '✓ Configuring kanban board', delay: 300 },
    { text: '✓ Setting up client showcase', delay: 300 },
    { text: '✓ Establishing secure connections', delay: 400 },
    { text: '$ Ready to transform your vision...', delay: 300 },
    { text: '✓ Welcome to Andervang Consulting', delay: 500 }
  ], []);

  useEffect(() => {
    // Cursor blinking effect
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    if (currentStep < loadingSteps.length) {
      const baseDelay = loadingSteps[currentStep]?.delay || 300;
      
      // Progressive speed increases based on step
      let speedMultiplier = 1; // Normal speed
      
      switch (currentStep) {
        case 0:
        case 1:
        case 2:
        case 3:
          speedMultiplier = 1; // Normal speed
          break;
        case 4:
          speedMultiplier = 0.6; // 40% faster
          break;
        case 5:
          speedMultiplier = 0.5; // 50% faster
          break;
        case 6:
        case 7:
        case 8:
          speedMultiplier = 0.4; // 60% faster
          break;
        default:
          speedMultiplier = 0.4; // 60% faster for any additional steps
      }
      
      const adjustedDelay = Math.round(baseDelay * speedMultiplier);
      
      const timer = setTimeout(() => {
        setCurrentStep(prev => prev + 1);
      }, adjustedDelay);

      return () => clearTimeout(timer);
    } else {
      // All steps complete, wait a bit then finish
      const finalTimer = setTimeout(() => {
        onComplete();
      }, 800);

      return () => clearTimeout(finalTimer);
    }
  }, [currentStep, loadingSteps, onComplete]);

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 bg-black flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="max-w-2xl w-full mx-4">
          {/* Terminal Window */}
          <motion.div 
            className="bg-gray-900 rounded-lg border border-gray-700 shadow-2xl overflow-hidden"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Terminal Header */}
            <div className="bg-gray-800 px-4 py-3 flex items-center gap-2 border-b border-gray-700">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="flex-1 text-center">
                <span className="text-gray-300 text-sm font-mono">Andervang Consulting - Terminal</span>
              </div>
            </div>

            {/* Terminal Content */}
            <div className="p-6 font-mono text-sm min-h-[300px]">
              <div className="space-y-2">
                <div className="text-emerald-400 mb-4">
                  <span className="text-gray-500">andervang@consulting</span>
                  <span className="text-white">:</span>
                  <span className="text-blue-400">~</span>
                  <span className="text-white">$ </span>
                  <span>./initialize-app.sh</span>
                </div>

                {loadingSteps.slice(0, currentStep).map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`${
                      step.text.startsWith('✓') 
                        ? 'text-emerald-400' 
                        : step.text.startsWith('$')
                          ? 'text-cyan-300'
                          : 'text-gray-300'
                    }`}
                  >
                    {step.text}
                  </motion.div>
                ))}

                {/* Blinking cursor */}
                {currentStep < loadingSteps.length && (
                  <div className="flex items-center">
                    <span className="text-gray-300">
                      {loadingSteps[currentStep]?.text.split('').slice(0, 0).join('')}
                    </span>
                    <motion.span 
                      className={`inline-block w-2 h-4 bg-white ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'}`}
                      animate={{ opacity: showCursor ? 1 : 0 }}
                      transition={{ duration: 0.1 }}
                    />
                  </div>
                )}
              </div>

              {/* Progress indicator */}
              <div className="mt-8">
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span>Progress:</span>
                  <div className="flex-1 bg-gray-800 rounded-full h-1">
                    <motion.div 
                      className="bg-emerald-500 h-1 rounded-full"
                      initial={{ width: '0%' }}
                      animate={{ width: `${(currentStep / loadingSteps.length) * 100}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <span>{Math.round((currentStep / loadingSteps.length) * 100)}%</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Subtle glow effect */}
          <div className="absolute inset-0 -z-10 blur-3xl">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full"></div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AppLoader;