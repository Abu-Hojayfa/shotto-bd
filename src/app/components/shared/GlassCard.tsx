import { ReactNode } from 'react';
import { motion } from 'motion/react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

export function GlassCard({ children, className = '', hover = false, glow = false }: GlassCardProps) {
  const baseClasses = "backdrop-blur-md bg-card/60 border border-border rounded-xl";
  const hoverClasses = hover ? "hover:bg-card/80 hover:border-primary/30 transition-all duration-300" : "";
  const glowClasses = glow ? "shadow-lg shadow-primary/10" : "";

  return (
    <motion.div
      initial={hover ? { scale: 1 } : {}}
      whileHover={hover ? { scale: 1.02 } : {}}
      className={`${baseClasses} ${hoverClasses} ${glowClasses} ${className}`}
    >
      {children}
    </motion.div>
  );
}
