import { useMotionPreference } from "@/hooks/useMotionPreference";
import { cn } from "@/lib/utils";

interface MotionSafeTransitionProps {
  children: React.ReactNode;
  className?: string;
  transitionClassName?: string;
  staticClassName?: string;
}

/**
 * A wrapper component that conditionally applies transition classes
 * based on user's motion preferences
 */
export function MotionSafeTransition({
  children,
  className,
  transitionClassName = "transition-all duration-200",
  staticClassName = ""
}: MotionSafeTransitionProps) {
  const prefersReducedMotion = useMotionPreference();
  
  const appliedClassName = cn(
    className,
    prefersReducedMotion ? staticClassName : transitionClassName
  );
  
  return (
    <div className={appliedClassName}>
      {children}
    </div>
  );
}