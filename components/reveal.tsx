"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import type { ElementType, ReactNode } from "react";

type RevealTag = "div" | "section" | "aside" | "article" | "li" | "p" | "h1" | "dl";

type RevealProps = {
  children: ReactNode;
  // Position in the stagger order; each step waits a little longer.
  index?: number;
  as?: RevealTag;
  className?: string;
};

const variants: Variants = {
  hidden: { opacity: 0, y: 16, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

// Blur-and-rise entrance in the style of the home hero, but quicker so the
// page feels ready rather than staged. Plays once, when scrolled into view.
export function Reveal({ children, index = 0, as = "div", className }: RevealProps) {
  const reduceMotion = useReducedMotion();
  const MotionTag = motion[as] as ElementType;

  // Always render the motion element: the server can't know the visitor's
  // motion setting, and swapping elements after hydration would leave the
  // server's hidden inline style behind. Reduced motion jumps to "visible".
  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      animate={reduceMotion ? "visible" : undefined}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : { duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }
      }
    >
      {children}
    </MotionTag>
  );
}
