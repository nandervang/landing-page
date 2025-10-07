import { useRef, useEffect, useState } from 'react';

interface Word {
  text: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  opacity: number;
  targetOpacity: number;
  size: number;
  scale: number;
  targetScale: number;
  layer: number; // 1 = background, 2 = middle, 3 = foreground
  baseOpacity: number;
  rotation: number;
  rotationSpeed: number;
  velocity: { x: number; y: number };
  phase: number;
  appearTime: number;
  color: number[];
}

// Web3 and development-related words
const developmentWords = [
  'BLOCKCHAIN', 'SMART_CONTRACTS', 'DEFI', 'WEB3',
  'REACT', 'TYPESCRIPT', 'NODE.JS', 'GRAPHQL',
  'MICROSERVICES', 'KUBERNETES', 'AI/ML', 'DOCKER',
  'AWS', 'SOLIDITY', 'NEXTJS', 'TAILWIND', 'ETHEREUM', 'NFT'
];

const createWords = (): Word[] => {
  return developmentWords.map((word, index) => {
    // Assign layers (1=far background, 2=middle, 3=foreground)
    const layer = (index % 3) + 1;
    const layerSpeed = layer === 1 ? 0.3 : layer === 2 ? 0.6 : 1.0;
    const layerSize = layer === 1 ? 0.7 : layer === 2 ? 0.85 : 1.0;
    
    return {
      text: word,
      // Position words only on the sides (left 10% and right 10%, leaving middle 80% clean)
      x: Math.random() < 0.5 
        ? -400 + Math.random() * 200 // Left side: -400 to -200
        : 200 + Math.random() * 200,  // Right side: 200 to 400
      y: (Math.random() - 0.5) * (400 + layer * 50),
      vx: (Math.random() - 0.5) * 0.02 * layerSpeed,
      vy: (Math.random() - 0.5) * 0.02 * layerSpeed,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.02 * layerSpeed, // Faster rotation for spinning effect
      opacity: 0,
      targetOpacity: layer === 1 ? 0.08 + Math.random() * 0.12 : 
                     layer === 2 ? 0.15 + Math.random() * 0.15 : 
                     0.25 + Math.random() * 0.25,
      baseOpacity: layer === 1 ? 0.08 : layer === 2 ? 0.15 : 0.25,
      scale: 0,
      targetScale: (0.8 + Math.random() * 0.6) * layerSize, // Larger scale for bigger text
      size: layer === 1 ? 32 : layer === 2 ? 48 : 64, // Much larger base sizes
      layer,
      color: layer === 1 
        ? [0.15, 0.25, 0.4]  // Subtle blue for background layer
        : layer === 2 
        ? [0.25, 0.4, 0.6]   // Medium blue for middle layer
        : [0.4, 0.6, 0.9],   // Vibrant blue for foreground layer
      velocity: {
        x: (Math.random() - 0.5) * 0.002 * layerSpeed,
        y: (Math.random() - 0.5) * 0.002 * layerSpeed
      },
      phase: Math.random() * Math.PI * 2,
      appearTime: index * 400 + Math.random() * 300 + (3 - layer) * 200 // Background appears first
    };
  });
};

const CanvasBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const words = createWords();
    const startTime = Date.now();
    
    const animate = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      
      // Set canvas size to container dimensions with device pixel ratio for crisp rendering
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      
      // Clear with dark gradient background
      const gradient = ctx.createRadialGradient(
        rect.width / 2, rect.height / 2, 0,
        rect.width / 2, rect.height / 2, Math.max(rect.width, rect.height) * 0.7
      );
      gradient.addColorStop(0, 'rgba(15, 20, 35, 0.95)');
      gradient.addColorStop(1, 'rgba(5, 8, 15, 0.98)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, rect.width, rect.height);
      
      // Update all words physics first
      words.forEach((word) => {
        // Staggered appearance
        if (elapsed > word.appearTime) {
          word.opacity += (word.targetOpacity - word.opacity) * 0.025;
          word.scale += (word.targetScale - word.scale) * 0.025;
        }
        
        // Layer-specific movement speed
        const layerSpeedMultiplier = word.layer === 1 ? 0.3 : word.layer === 2 ? 0.6 : 1.0;
        
        // Update position with layer-based speed
        word.x += word.velocity.x * 40 * layerSpeedMultiplier;
        word.y += word.velocity.y * 40 * layerSpeedMultiplier;
        word.rotation += word.rotationSpeed;
        
        // Boundary constraints - keep words on sides, avoid center 80%
        const centerWidth = rect.width * 0.4; // 40% on each side of center (80% total center exclusion)
        const margin = 50;
        
        // Left side boundaries
        if (word.x < -centerWidth - 100) {
          word.velocity.x = Math.abs(word.velocity.x); // Push right
        } else if (word.x > -centerWidth + margin && word.x < 0) {
          word.velocity.x = -Math.abs(word.velocity.x); // Push left
        }
        
        // Right side boundaries  
        if (word.x > centerWidth + 100) {
          word.velocity.x = -Math.abs(word.velocity.x); // Push left
        } else if (word.x < centerWidth - margin && word.x > 0) {
          word.velocity.x = Math.abs(word.velocity.x); // Push right
        }
        
        // Vertical boundaries
        if (word.y < -rect.height/2 + margin || word.y > rect.height/2 - margin) {
          word.velocity.y *= -0.7;
        }
        
        // Add subtle randomness and damping (less for background layers)
        const randomness = word.layer === 1 ? 0.0004 : word.layer === 2 ? 0.0006 : 0.0008;
        word.velocity.x += (Math.random() - 0.5) * randomness;
        word.velocity.y += (Math.random() - 0.5) * randomness;
        word.velocity.x *= 0.996;
        word.velocity.y *= 0.996;
      });

      // Render words in layer order (background to foreground)
      for (let layer = 1; layer <= 3; layer++) {
        words.filter(word => word.layer === layer).forEach((word) => {
          if (word.opacity > 0.01 && word.scale > 0.01) {
            ctx.save();
            
            // Layer-specific floating effect intensity
            const floatIntensity = layer === 1 ? 0.5 : layer === 2 ? 0.75 : 1.0;
            const timeOffset = elapsed * 0.0008 * floatIntensity;
            const floatX = Math.sin(timeOffset + word.phase) * (10 + layer * 5);
            const floatY = Math.cos(timeOffset * 1.3 + word.phase * 0.7) * (5 + layer * 3);
            
            const x = word.x + rect.width / 2 + floatX;
            const y = word.y + rect.height / 2 + floatY;
            
            ctx.translate(x, y);
            ctx.rotate(word.rotation * (0.5 + layer * 0.2)); // Much more rotation for spinning effect
            ctx.scale(word.scale, word.scale);
            
            const pulse = 0.85 + 0.15 * Math.sin(elapsed * 0.003 + word.phase);
            const alpha = word.opacity * pulse;
            
            // Much larger layer-specific font sizes for full viewport coverage
            const baseFontSize = word.layer === 1 ? 32 : word.layer === 2 ? 48 : 64;
            const fontSize = Math.max(24, baseFontSize + word.scale * 20);
            
            // Set font
            ctx.font = `bold ${fontSize}px "SF Mono", "Monaco", "Inconsolata", "Roboto Mono", monospace`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            
            // Layer-specific glow intensity
            const glowIntensity = word.layer === 1 ? 0.6 : word.layer === 2 ? 0.8 : 1.0;
            const colorR = Math.floor(word.color[0] * 255);
            const colorG = Math.floor(word.color[1] * 255);
            const colorB = Math.floor(word.color[2] * 255);
            
            // Layer-specific glow effects
            const blurAmount = (15 + layer * 10) * glowIntensity;
            
            // Outer glow
            ctx.shadowColor = `rgba(${colorR}, ${colorG}, ${colorB}, ${alpha * 0.3 * glowIntensity})`;
            ctx.shadowBlur = blurAmount * 1.5;
            ctx.fillStyle = `rgba(${colorR}, ${colorG}, ${colorB}, ${alpha * 0.1 * glowIntensity})`;
            ctx.fillText(word.text, 0, 0);
            
            // Middle glow
            ctx.shadowBlur = blurAmount;
            ctx.fillStyle = `rgba(${colorR}, ${colorG}, ${colorB}, ${alpha * 0.3 * glowIntensity})`;
            ctx.fillText(word.text, 0, 0);
            
            // Inner glow
            ctx.shadowBlur = blurAmount * 0.4;
            ctx.fillStyle = `rgba(${colorR}, ${colorG}, ${colorB}, ${alpha * 0.6 * glowIntensity})`;
            ctx.fillText(word.text, 0, 0);
            
            // Core text (brightest for foreground)
            ctx.shadowBlur = 0;
            const coreBrightness = layer * 15;
            ctx.fillStyle = `rgba(${Math.min(255, colorR + coreBrightness)}, ${Math.min(255, colorG + coreBrightness)}, ${Math.min(255, colorB + coreBrightness)}, ${alpha})`;
            ctx.fillText(word.text, 0, 0);
            
            ctx.restore();
          }
        });
      }
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    const handleResize = () => {
      // Canvas resizing is handled in the animation loop
    };
    
    window.addEventListener('resize', handleResize);
    
    // Start animation after a brief delay
    setTimeout(() => {
      setIsVisible(true);
      animate();
    }, 200);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full transition-opacity duration-1000 pointer-events-none ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    />
  );
};

export default CanvasBackground;