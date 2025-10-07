'use client';

import type { HTMLAttributes } from 'react';
import type { MarqueeProps as FastMarqueeProps } from 'react-fast-marquee';
import FastMarquee from 'react-fast-marquee';
import { cn } from '@/lib/utils';

export type MarqueeProps = HTMLAttributes<HTMLDivElement> & {
  layer?: 'background' | 'middle' | 'foreground';
};

export const Marquee = ({ className, layer, ...props }: MarqueeProps) => {
  const layerStyles = {
    background: 'opacity-30 scale-90 transform translate-y-2 blur-[0.5px]',
    middle: 'opacity-60 scale-95 transform translate-y-1',
    foreground: 'relative z-10'
  };

  return (
    <div
      className={cn(
        'relative w-full overflow-hidden',
        layer && layerStyles[layer],
        className
      )}
      {...props}
    />
  );
};

export type MarqueeContentProps = FastMarqueeProps;

export const MarqueeContent = ({
  loop = 0,
  autoFill = true,
  pauseOnHover = true,
  ...props
}: MarqueeContentProps) => (
  <FastMarquee
    autoFill={autoFill}
    loop={loop}
    pauseOnHover={pauseOnHover}
    {...props}
  />
);

export type MarqueeFadeProps = HTMLAttributes<HTMLDivElement> & {
  side: 'left' | 'right';
};

export const MarqueeFade = ({
  className,
  side,
  ...props
}: MarqueeFadeProps) => (
  <div
    className={cn(
      'absolute top-0 bottom-0 z-10 h-full w-24 from-background to-transparent',
      side === 'left' ? 'left-0 bg-gradient-to-r' : 'right-0 bg-gradient-to-l',
      className
    )}
    {...props}
  />
);

export type MarqueeItemProps = HTMLAttributes<HTMLDivElement>;

export const MarqueeItem = ({ className, ...props }: MarqueeItemProps) => (
  <div
    className={cn('mx-2 flex-shrink-0 object-contain', className)}
    {...props}
  />
);

export type MarqueeLayerProps = HTMLAttributes<HTMLDivElement> & {
  layer: 'background' | 'middle' | 'foreground';
  speed?: 'slow' | 'medium' | 'fast';
  direction?: 'left' | 'right';
  pauseOnHover?: boolean;
  play?: boolean;
};

export const MarqueeLayer = ({ 
  className,
  layer,
  speed = 'medium',
  direction = 'left',
  pauseOnHover = true,
  play = true,
  children,
  ...props 
}: MarqueeLayerProps) => {
  const layerStyles = {
    background: 'absolute inset-0 opacity-30 scale-90 transform translate-y-2 blur-[0.5px]',
    middle: 'absolute inset-0 opacity-60 scale-95 transform translate-y-1',
    foreground: 'relative z-10'
  };

  const speedDurations = {
    slow: '[--duration:80s]',
    medium: '[--duration:60s]',
    fast: '[--duration:45s]'
  };

  return (
    <Marquee className={cn(layerStyles[layer], className)} {...props}>
      <MarqueeContent
        pauseOnHover={pauseOnHover}
        autoFill
        play={play}
        direction={direction}
        className={speedDurations[speed]}
      >
        {children}
      </MarqueeContent>
    </Marquee>
  );
};
