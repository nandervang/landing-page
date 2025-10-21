import { useEffect, useRef, useState } from 'react';

interface AndervangLogoProps {
  width?: number;
  height?: number;
}

export const AndervangLogo = ({ width = 190, height = 190 }: AndervangLogoProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = 300;
      const scrollPercent = Math.min(scrollY / maxScroll, 1);
      
      const tiltX = (scrollPercent * 30) - 15;
      const tiltY = scrollPercent * 20;
      
      setTilt({ x: tiltX, y: tiltY });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.scale(dpr, dpr);

    const drawLogo = () => {
      ctx.clearRect(0, 0, width, height);
      
      const bgGradient = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, Math.max(width, height)/2);
      bgGradient.addColorStop(0, 'rgba(99, 102, 241, 0.1)');
      bgGradient.addColorStop(0.5, 'rgba(59, 130, 246, 0.05)');
      bgGradient.addColorStop(1, 'rgba(17, 24, 39, 0.02)');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);
      
      ctx.save();
      ctx.translate(width / 2, height / 2);

      const size = 120;
      const depth = 40;
      
      const perspective = 400;
      const rotX = (tilt.x * Math.PI) / 180;
      const rotY = (tilt.y * Math.PI) / 180;
      
      const transform3D = (x: number, y: number, z: number) => {
        const x1 = x * Math.cos(rotY) - z * Math.sin(rotY);
        const z1 = x * Math.sin(rotY) + z * Math.cos(rotY);
        const y2 = y * Math.cos(rotX) - z1 * Math.sin(rotX);
        const z2 = y * Math.sin(rotX) + z1 * Math.cos(rotX);
        const scale = perspective / (perspective + z2);
        return { x: x1 * scale, y: y2 * scale, z: z2, scale };
      };

      const frontTop = transform3D(0, -size * 0.7, 0);
      const frontBottomLeft = transform3D(-size / 2, size * 0.35, 0);
      const frontBottomRight = transform3D(size / 2, size * 0.35, 0);
      const backTop = transform3D(0, -size * 0.7, -depth);
      const backBottomLeft = transform3D(-size / 2, size * 0.35, -depth);
      const backBottomRight = transform3D(size / 2, size * 0.35, -depth);

      const faces = [
        {
          name: 'leftSide',
          avgZ: (frontTop.z + frontBottomLeft.z + backTop.z + backBottomLeft.z) / 4,
          draw: () => {
            ctx.beginPath();
            ctx.moveTo(frontTop.x, frontTop.y);
            ctx.lineTo(backTop.x, backTop.y);
            ctx.lineTo(backBottomLeft.x, backBottomLeft.y);
            ctx.lineTo(frontBottomLeft.x, frontBottomLeft.y);
            ctx.closePath();
            ctx.fillStyle = '#1e293b';
            ctx.fill();
          }
        },
        {
          name: 'rightSide',
          avgZ: (frontTop.z + frontBottomRight.z + backTop.z + backBottomRight.z) / 4,
          draw: () => {
            ctx.beginPath();
            ctx.moveTo(frontTop.x, frontTop.y);
            ctx.lineTo(backTop.x, backTop.y);
            ctx.lineTo(backBottomRight.x, backBottomRight.y);
            ctx.lineTo(frontBottomRight.x, frontBottomRight.y);
            ctx.closePath();
            ctx.fillStyle = '#334155';
            ctx.fill();
          }
        },
        {
          name: 'bottomSide',
          avgZ: (frontBottomLeft.z + frontBottomRight.z + backBottomLeft.z + backBottomRight.z) / 4,
          draw: () => {
            ctx.beginPath();
            ctx.moveTo(frontBottomLeft.x, frontBottomLeft.y);
            ctx.lineTo(backBottomLeft.x, backBottomLeft.y);
            ctx.lineTo(backBottomRight.x, backBottomRight.y);
            ctx.lineTo(frontBottomRight.x, frontBottomRight.y);
            ctx.closePath();
            ctx.fillStyle = '#0f172a';
            ctx.fill();
          }
        },
        {
          name: 'front',
          avgZ: (frontTop.z + frontBottomLeft.z + frontBottomRight.z) / 3,
          draw: () => {
            ctx.beginPath();
            ctx.moveTo(frontTop.x, frontTop.y);
            ctx.lineTo(frontBottomLeft.x, frontBottomLeft.y);
            ctx.lineTo(frontBottomRight.x, frontBottomRight.y);
            ctx.closePath();
            
            // Clean solid surface - no gradient
            ctx.fillStyle = '#475569';
            ctx.fill();

            ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      ];

      faces.sort((a, b) => a.avgZ - b.avgZ);
      faces.forEach(face => face.draw());
      ctx.restore();
    };

    drawLogo();
  }, [width, height, tilt]);

  return (
    <canvas
      ref={canvasRef}
      className="block mx-auto"
    />
  );
};
