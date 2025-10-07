import { useRef, useEffect, useState } from 'react';

interface Word {
  text: string;
  x: number;
  y: number;
  z: number;
  targetX: number;
  targetY: number;
  targetZ: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  targetOpacity: number;
  scale: number;
  targetScale: number;
  color: [number, number, number];
  velocity: {
    x: number;
    y: number;
    z: number;
  };
  phase: number;
  appearTime: number;
}

// Web3 and development-related words
const developmentWords = [
  'BLOCKCHAIN', 'SMART_CONTRACTS', 'DEFI', 'WEB3',
  'REACT', 'TYPESCRIPT', 'NODE.JS', 'GRAPHQL',
  'MICROSERVICES', 'KUBERNETES'
];

// WebGL shader sources
const vertexShaderSource = `
    precision mediump float;
    
    attribute vec3 a_position;
    attribute float a_opacity;
    attribute float a_scale;
    attribute vec3 a_color;
    
    uniform mat4 u_matrix;
    uniform float u_time;
    
    varying float v_opacity;
    varying vec3 v_color;
    varying vec2 v_uv;
    
    void main() {
      vec3 position = a_position;
      
      // Add subtle floating animation with more dynamic movement
      float timeOffset = a_position.x * 0.02 + a_position.z * 0.01;
      position.y += sin(u_time * 0.0008 + timeOffset) * 0.15;
      position.x += cos(u_time * 0.0012 + timeOffset) * 0.08;
      position.z += sin(u_time * 0.0006 + timeOffset) * 0.05;
      
      gl_Position = u_matrix * vec4(position * a_scale, 1.0);
      gl_PointSize = 100.0 * a_scale;
      
      v_opacity = a_opacity;
      v_color = a_color;
      v_uv = a_position.xy;
    }
  `;

  const fragmentShaderSource = `
    precision mediump float;
    
    uniform float u_time;
    
    varying float v_opacity;
    varying vec3 v_color;
    varying vec2 v_uv;
    
    void main() {
      vec2 center = gl_PointCoord - 0.5;
      float dist = length(center);
      
      // Create a soft circular gradient with glow effect
      float alpha = smoothstep(0.5, 0.0, dist);
      alpha *= v_opacity;
      
      // Add subtle pulsing effect
      float pulse = 0.7 + 0.3 * sin(u_time * 0.002);
      alpha *= pulse;
      
      // Add a subtle outer glow
      float glow = smoothstep(0.7, 0.3, dist) * 0.3;
      alpha = max(alpha, glow * v_opacity * pulse);
      
      gl_FragColor = vec4(v_color, alpha);
    }
  `;

const createShader = (gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null => {
    const shader = gl.createShader(type);
    if (!shader) return null;
    
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error('Shader compile error:', gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
    
    return shader;
};

const createProgram = (gl: WebGLRenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader): WebGLProgram | null => {
    const program = gl.createProgram();
    if (!program) return null;
    
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      gl.deleteProgram(program);
      return null;
    }
    
    return program;
};

const createWords = (): Word[] => {
    return developmentWords.map((word, index) => ({
      text: word,
      x: (Math.random() - 0.5) * 4,
      y: (Math.random() - 0.5) * 3,
      z: (Math.random() - 0.5) * 2,
      targetX: (Math.random() - 0.5) * 4,
      targetY: (Math.random() - 0.5) * 3,
      targetZ: (Math.random() - 0.5) * 2,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.01,
      opacity: 0,
      targetOpacity: 0.3 + Math.random() * 0.4,
      scale: 0,
      targetScale: 0.5 + Math.random() * 0.5,
      color: [
        0.2 + Math.random() * 0.4, // More vibrant colors
        0.3 + Math.random() * 0.4,
        0.7 + Math.random() * 0.3
      ],
      velocity: {
        x: (Math.random() - 0.5) * 0.002,
        y: (Math.random() - 0.5) * 0.002,
        z: (Math.random() - 0.5) * 0.002
      },
      phase: Math.random() * Math.PI * 2,
      appearTime: index * 300 + Math.random() * 200 // Staggered appearance with randomness
    }));
};

const WebGLBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const [isVisible, setIsVisible] = useState(false);


  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Always use Canvas 2D for text rendering reliability
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    console.log('Using Canvas 2D for reliable text rendering');
      
      // Canvas 2D fallback implementation
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      const words = createWords();
      const startTime = Date.now();
      
      const animate2D = () => {
        const currentTime = Date.now();
        const elapsed = currentTime - startTime;
        
        canvas.width = canvas.offsetWidth * window.devicePixelRatio;
        canvas.height = canvas.offsetHeight * window.devicePixelRatio;
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        
        // Clear with dark background
        const gradient = ctx.createRadialGradient(
          canvas.width / 4, canvas.height / 4, 0,
          canvas.width / 4, canvas.height / 4, Math.max(canvas.width, canvas.height)
        );
        gradient.addColorStop(0, 'rgba(20, 25, 40, 0.9)');
        gradient.addColorStop(1, 'rgba(8, 10, 16, 0.95)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw words as text
        words.forEach((word) => {
          if (elapsed > word.appearTime) {
            word.opacity += (word.targetOpacity - word.opacity) * 0.02;
            word.scale += (word.targetScale - word.scale) * 0.02;
          }
          
          // Update position
          word.x += word.velocity.x * 50;
          word.y += word.velocity.y * 50;
          word.rotation += word.rotationSpeed;
          
          // Boundary constraints
          const canvasW = canvas.offsetWidth;
          const canvasH = canvas.offsetHeight;
          if (word.x < 0 || word.x > canvasW) word.velocity.x *= -0.8;
          if (word.y < 0 || word.y > canvasH) word.velocity.y *= -0.8;
          
          // Add randomness
          word.velocity.x += (Math.random() - 0.5) * 0.001;
          word.velocity.y += (Math.random() - 0.5) * 0.001;
          word.velocity.x *= 0.999;
          word.velocity.y *= 0.999;
          
          // Draw text
          if (word.opacity > 0.01) {
            ctx.save();
            ctx.translate(word.x + canvasW / 2, word.y + canvasH / 2);
            ctx.rotate(word.rotation);
            ctx.scale(word.scale, word.scale);
            
            const alpha = word.opacity * (0.8 + 0.2 * Math.sin(elapsed * 0.002));
            ctx.fillStyle = `rgba(${Math.floor(word.color[0] * 255)}, ${Math.floor(word.color[1] * 255)}, ${Math.floor(word.color[2] * 255)}, ${alpha})`;
            ctx.font = `${12 + word.scale * 8}px monospace`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            
            // Add glow effect
            ctx.shadowColor = `rgba(${Math.floor(word.color[0] * 255)}, ${Math.floor(word.color[1] * 255)}, ${Math.floor(word.color[2] * 255)}, ${alpha * 0.5})`;
            ctx.shadowBlur = 10;
            
            ctx.fillText(word.text, 0, 0);
            ctx.restore();
          }
        });
        
        animationFrameRef.current = requestAnimationFrame(animate2D);
      };
      
      const resize2D = () => {
        canvas.width = canvas.offsetWidth * window.devicePixelRatio;
        canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      };
      
      resize2D();
      window.addEventListener('resize', resize2D);
      
      setTimeout(() => {
        setIsVisible(true);
        animate2D();
      }, 100);
      
      return () => {
        window.removeEventListener('resize', resize2D);
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }

    // Create shaders and program
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
    
    if (!vertexShader || !fragmentShader) {
      console.warn('Failed to create shaders, falling back to Canvas 2D');
      // Fall back to Canvas 2D (implementation already above)
      return;
    }
    
    const program = createProgram(gl, vertexShader, fragmentShader);
    if (!program) {
      console.warn('Failed to create WebGL program, falling back to Canvas 2D');
      // Fall back to Canvas 2D (implementation already above)
      return;
    }

    // Get attribute and uniform locations
    const positionLocation = gl.getAttribLocation(program, 'a_position');
    const opacityLocation = gl.getAttribLocation(program, 'a_opacity');
    const scaleLocation = gl.getAttribLocation(program, 'a_scale');
    const colorLocation = gl.getAttribLocation(program, 'a_color');
    const matrixLocation = gl.getUniformLocation(program, 'u_matrix');
    const timeLocation = gl.getUniformLocation(program, 'u_time');

    // Create words
    const words = createWords();
    const startTime = Date.now();

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const createProjectionMatrix = (width: number, height: number) => {
      const aspect = width / height;
      const fov = Math.PI / 4;
      const near = 0.1;
      const far = 100;
      
      const f = Math.tan(Math.PI * 0.5 - 0.5 * fov);
      const rangeInv = 1.0 / (near - far);
      
      return new Float32Array([
        f / aspect, 0, 0, 0,
        0, f, 0, 0,
        0, 0, (near + far) * rangeInv, -1,
        0, 0, near * far * rangeInv * 2, 0
      ]);
    };

    const animate = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;

      // Update words
      words.forEach((word) => {
        // Staggered appearance
        if (elapsed > word.appearTime) {
          word.opacity += (word.targetOpacity - word.opacity) * 0.02;
          word.scale += (word.targetScale - word.scale) * 0.02;
        }

        // Gentle floating movement
        word.x += word.velocity.x;
        word.y += word.velocity.y;
        word.z += word.velocity.z;
        
        // Rotation
        word.rotation += word.rotationSpeed;
        
        // Boundary constraints (soft)
        if (Math.abs(word.x) > 3) word.velocity.x *= -0.8;
        if (Math.abs(word.y) > 2) word.velocity.y *= -0.8;
        if (Math.abs(word.z) > 1.5) word.velocity.z *= -0.8;

        // Add some randomness to movement
        word.velocity.x += (Math.random() - 0.5) * 0.0001;
        word.velocity.y += (Math.random() - 0.5) * 0.0001;
        word.velocity.z += (Math.random() - 0.5) * 0.0001;

        // Damping
        word.velocity.x *= 0.999;
        word.velocity.y *= 0.999;
        word.velocity.z *= 0.999;
      });

      // Prepare data for WebGL
      const positions: number[] = [];
      const opacities: number[] = [];
      const scales: number[] = [];
      const colors: number[] = [];

      words.forEach(word => {
        positions.push(word.x, word.y, word.z - 5); // Move back in Z
        opacities.push(word.opacity);
        scales.push(word.scale);
        colors.push(...word.color);
      });

      // Clear and setup
      gl.clearColor(0.08, 0.08, 0.11, 1); // Deep dark background
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      
      gl.useProgram(program);

      // Create and bind buffers
      const positionBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.DYNAMIC_DRAW);
      gl.enableVertexAttribArray(positionLocation);
      gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);

      const opacityBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, opacityBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(opacities), gl.DYNAMIC_DRAW);
      gl.enableVertexAttribArray(opacityLocation);
      gl.vertexAttribPointer(opacityLocation, 1, gl.FLOAT, false, 0, 0);

      const scaleBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, scaleBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(scales), gl.DYNAMIC_DRAW);
      gl.enableVertexAttribArray(scaleLocation);
      gl.vertexAttribPointer(scaleLocation, 1, gl.FLOAT, false, 0, 0);

      const colorBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.DYNAMIC_DRAW);
      gl.enableVertexAttribArray(colorLocation);
      gl.vertexAttribPointer(colorLocation, 3, gl.FLOAT, false, 0, 0);

      // Set uniforms
      const matrix = createProjectionMatrix(canvas.width, canvas.height);
      gl.uniformMatrix4fv(matrixLocation, false, matrix);
      gl.uniform1f(timeLocation, elapsed);

      // Draw
      gl.drawArrays(gl.POINTS, 0, words.length);

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener('resize', resize);
    
    // Start animation with a delay to let the component mount
    setTimeout(() => {
      setIsVisible(true);
      animate();
    }, 100);

    return () => {
      window.removeEventListener('resize', resize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    />
  );
};

export default WebGLBackground;