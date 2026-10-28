"use client";

import {
  motion,
  useInView,
  useReducedMotion,
  type HTMLElements,
  type HTMLMotionProps,
  type Variants,
} from "framer-motion";
import type { ElementType, RefObject } from "react";

type TimelineContentProps<T extends keyof HTMLElements> = {
  as?: T;
  animationNum: number;
  timelineRef: RefObject<HTMLElement | null>;
  customVariants?: Variants;
  once?: boolean;
} & HTMLMotionProps<T>;

const defaultVariants: Variants = {
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: { delay: i * 0.5, duration: 0.5 },
  }),
  hidden: { filter: "blur(20px)", y: -20, opacity: 0 },
};

export function TimelineContent<T extends keyof HTMLElements = "div">({
  as,
  animationNum,
  timelineRef,
  customVariants,
  once = true,
  ...props
}: TimelineContentProps<T>) {
  const isInView = useInView(timelineRef, { once });
  const reduceMotion = useReducedMotion();
  const MotionTag = motion[as ?? "div"] as ElementType;

  // Visitors who ask for reduced motion get the content immediately.
  const state = reduceMotion || isInView ? "visible" : "hidden";

  return (
    <MotionTag
      custom={animationNum}
      initial={reduceMotion ? "visible" : "hidden"}
      animate={state}
      variants={customVariants ?? defaultVariants}
      {...props}
    />
  );
}
