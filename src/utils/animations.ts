// Helper function to check motion preferences
const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Helper functions for animations
export const fadeIn = (element: HTMLElement, delay: number = 0, duration: number = 400): void => {
  if (!element) return;
  
  if (prefersReducedMotion()) {
    // Skip animation for users who prefer reduced motion
    element.style.opacity = '1';
    return;
  }
  
  element.style.opacity = '0';
  element.style.transition = `opacity ${duration}ms ease-in-out ${delay}ms`;
  
  setTimeout(() => {
    element.style.opacity = '1';
  }, 10);
};

export const slideIn = (
  element: HTMLElement, 
  direction: 'left' | 'right' | 'up' | 'down' = 'up', 
  delay: number = 0, 
  duration: number = 400
): void => {
  if (!element) return;
  
  if (prefersReducedMotion()) {
    // Skip animation for users who prefer reduced motion
    element.style.opacity = '1';
    element.style.transform = 'translate(0, 0)';
    return;
  }
  
  const translateValues = {
    left: 'translateX(-30px)',
    right: 'translateX(30px)',
    up: 'translateY(30px)',
    down: 'translateY(-30px)'
  };
  
  element.style.opacity = '0';
  element.style.transform = translateValues[direction];
  element.style.transition = `opacity ${duration}ms ease-out ${delay}ms, transform ${duration}ms ease-out ${delay}ms`;
  
  setTimeout(() => {
    element.style.opacity = '1';
    element.style.transform = 'translate(0, 0)';
  }, 10);
};

export const setupScrollAnimations = (): (() => void) => {
  if (typeof window === 'undefined') return () => {};
  
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('[data-animate]');
    
    elements.forEach((el) => {
      const element = el as HTMLElement;
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      if (rect.top < windowHeight * 0.85) {
        const animationType = element.dataset.animate || 'fade';
        const delay = parseInt(element.dataset.delay || '0', 10);
        
        if (animationType === 'fade') {
          fadeIn(element, delay);
        } else if (animationType.startsWith('slide-')) {
          const direction = animationType.replace('slide-', '') as 'left' | 'right' | 'up' | 'down';
          slideIn(element, direction, delay);
        }
        
        // Remove the attribute so the animation only happens once
        element.removeAttribute('data-animate');
      }
    });
  };
  
  window.addEventListener('scroll', animateOnScroll);
  
  // Initial check on page load
  setTimeout(animateOnScroll, 100);
  
  return () => {
    window.removeEventListener('scroll', animateOnScroll);
  };
};