"use client";

import { motion } from "framer-motion";
import { Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useMotionPreference } from "@/hooks/useMotionPreference";
import { AndervangLogo } from "@/components/AndervangLogo";

type ElegantShapeProps = {
  className?: string;
  delay?: number;
  width?: number;
  height?: number;
  rotate?: number;
  gradient?: string;
};

function ElegantShape({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-white/[0.08]",
}: ElegantShapeProps) {
  const prefersReducedMotion = useMotionPreference();

  if (prefersReducedMotion) {
    // Static version for users who prefer reduced motion
    return (
      <div
        className={cn("absolute", className)}
        style={{
          width,
          height,
          transform: `rotate(${rotate}deg)`,
        }}
      >
        <div
          className={cn(
            "absolute inset-0",
            "bg-gradient-to-r to-transparent",
            gradient,
            "backdrop-blur-[2px] border border-border",
            "shadow-[0_8px_32px_0_rgba(0,0,0,0.1)]",
            "after:absolute after:inset-0",
            "after:bg-[radial-gradient(circle_at_50%_50%,rgba(128,128,128,0.1),transparent_70%)]"
          )}
        />
      </div>
    );
  }

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -150,
        rotate: rotate - 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotate: rotate,
      }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={cn("absolute", className)}
    >
      <motion.div
        animate={{
          y: [0, 15, 0],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{
          width,
          height,
        }}
        className="relative"
      >
        <div
          className={cn(
            "absolute inset-0",
            "bg-gradient-to-r to-transparent",
            gradient,
            "backdrop-blur-[2px] border border-border",
            "shadow-[0_8px_32px_0_rgba(0,0,0,0.1)]",
            "after:absolute after:inset-0",
            "after:bg-[radial-gradient(circle_at_50%_50%,rgba(128,128,128,0.1),transparent_70%)]"
          )}
        />
      </motion.div>
    </motion.div>
  );
}

type HeroGeometricProps = {
  badge?: string;
  title1?: string;
  title2?: string;
  description?: string;
  className?: string;
};

export function HeroGeometric({
  badge = "shadcn.io",
  title1 = "Design",
  title2 = "Development",
  description = "Crafting exceptional digital experiences through innovative design and cutting-edge technology.",
  className,
}: HeroGeometricProps) {
  const prefersReducedMotion = useMotionPreference();

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 1,
        delay: prefersReducedMotion ? 0 : 0.5 + i * 0.2,
        ease: [0.25, 0.4, 0.25, 1] as const,
      },
    }),
  };

  // Static content component for reduced motion
  const StaticContent = () => (
    <div className="relative z-10 container mx-auto px-4 md:px-6">
      <div className="max-w-3xl mx-auto text-center">
        {/* Andervang Logo */}
        <div className="mb-8 md:mb-12">
          <AndervangLogo width={190} height={190} />
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary border border-border mb-8 md:mb-12">
          <Circle className="h-2 w-2 fill-green-500" />
          <span className="text-sm text-muted-foreground tracking-wide uppercase">
            {badge}
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-6 md:mb-8 tracking-tight">
          <span className="text-foreground">
            {title1}
          </span>
          <br />
          <span className="relative inline-block mx-4 text-6xl font-light bg-gradient-to-r from-emerald-700 via-green-600 to-emerald-800 bg-clip-text text-transparent transform rotate-12 animate-pulse">
            &
          </span>
          <br />
                <span className="bg-gradient-to-r from-gray-900 via-gray-400 to-gray-900 bg-clip-text text-transparent dark:[text-shadow:_0_0_1px_rgba(255,255,255,0.3),_1px_1px_1px_rgba(255,255,255,0.2)] dark:[-webkit-text-stroke:_0.5px_rgba(255,255,255,0.4)] bg-[length:400%_100%] animate-[gradient-shift_40s_linear_infinite]">
            {title2}
          </span>
        </h1>

                <p className="text-xl sm:text-2xl md:text-[1.4rem] mb-8 leading-relaxed tracking-wide max-w-xl mx-auto px-4 bg-gradient-to-r from-gray-600 via-gray-500 to-gray-700 bg-clip-text text-transparent">
          {description}
        </p>
      </div>
    </div>
  );

  return (
    <div className={cn("relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-background", className)}>
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-accent/[0.03] blur-3xl" />

      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <ElegantShape
          delay={0.3}
          width={600}
          height={140}
          rotate={12}
          gradient="from-primary/[0.08]"
          className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
        />

        <ElegantShape
          delay={0.5}
          width={500}
          height={120}
          rotate={-15}
          gradient="from-secondary/[0.15]"
          className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
        />

        <ElegantShape
          delay={0.4}
          width={300}
          height={80}
          rotate={-8}
          gradient="from-muted/[0.15]"
          className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
        />

        <ElegantShape
          delay={0.6}
          width={200}
          height={60}
          rotate={20}
          gradient="from-accent/[0.15]"
          className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
        />

        <ElegantShape
          delay={0.7}
          width={150}
          height={40}
          rotate={-25}
          gradient="from-primary/[0.05]"
          className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
        />
      </div>

      {prefersReducedMotion ? (
        <StaticContent />
      ) : (
        <div className="relative z-10 container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            {/* Andervang Logo with Animation */}
            <motion.div
              custom={0}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="mb-8 md:mb-12"
            >
              <AndervangLogo width={190} height={190} />
            </motion.div>

            <motion.div
              custom={1}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2 px-3 py-1 bg-secondary border border-border mb-8 md:mb-12"
            >
              <Circle className="h-2 w-2 fill-green-500 drop-shadow-[0_0_6px_rgb(34,197,94)]" />
              <span className="text-sm text-muted-foreground tracking-wide uppercase">
                {badge}
              </span>
            </motion.div>

            <motion.div
              custom={1}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
            >
              <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-6 md:mb-8 tracking-tight">
                <span className="text-foreground">
                  {title1}
                </span>
                <br />
                <motion.span 
                  className="relative inline-block mx-4 text-6xl font-light bg-gradient-to-r from-emerald-700 via-green-600 to-emerald-800 bg-clip-text text-transparent"
                  animate={{ 
                    rotate: [12, -12, 12],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  &
                </motion.span>
                <br />
                <span className="bg-gradient-to-r from-gray-900 via-gray-400 to-gray-900 bg-clip-text text-transparent bg-[length:400%_100%] animate-[gradient-shift_40s_linear_infinite]">
                  {title2}
                </span>
              </h1>
            </motion.div>

            <motion.div
              custom={2}
              variants={fadeUpVariants}
              initial="hidden"
              animate="visible"
            >
              <p className="text-xl sm:text-2xl md:text-[1.4rem] mb-8 leading-relaxed tracking-wide max-w-xl mx-auto px-4 bg-gradient-to-r from-gray-600 via-gray-500 to-gray-700 bg-clip-text text-transparent">
                {description}
              </p>
            </motion.div>
          </div>
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/80 pointer-events-none" />
    </div>
  );
}

export type { HeroGeometricProps, ElegantShapeProps };
