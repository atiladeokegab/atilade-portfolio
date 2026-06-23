import { motion, Transition } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState, useMemo } from "react";

type TextSegment = {
  text: string;
  className?: string;
  icon?: { src: string; alt: string; className?: string };
  lineBreak?: boolean;
};

type StyledBlurTextProps = {
  segments: TextSegment[];
  delay?: number;
  className?: string;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  threshold?: number;
  rootMargin?: string;
  onAnimationComplete?: () => void;
  stepDuration?: number;
  as?: "h1" | "h2" | "h3" | "span" | "p" | "div";
  initialDelay?: number;
};

const buildKeyframes = (
  from: Record<string, string | number>,
  steps: Array<Record<string, string | number>>,
): Record<string, Array<string | number>> => {
  const keys = new Set<string>([
    ...Object.keys(from),
    ...steps.flatMap((s) => Object.keys(s)),
  ]);

  const keyframes: Record<string, Array<string | number>> = {};
  keys.forEach((k) => {
    keyframes[k] = [from[k], ...steps.map((s) => s[k])];
  });
  return keyframes;
};

const StyledBlurText: React.FC<StyledBlurTextProps> = ({
  segments,
  delay = 150,
  className = "",
  animateBy = "words",
  direction = "bottom",
  threshold = 0.1,
  rootMargin = "0px",
  onAnimationComplete,
  stepDuration = 0.35,
  as: Component = "h1",
  initialDelay = 0,
}) => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLElement>(null);

  // Flatten segments into animatable units while preserving styling
  const animationUnits = useMemo(() => {
    const units: Array<{
      text: string;
      className?: string;
      segmentIndex: number;
      unitIndex: number;
      icon?: { src: string; alt: string; className?: string };
      lineBreakAfter?: boolean;
    }> = [];

    segments.forEach((segment, segmentIndex) => {
      const segmentUnitsStart = units.length;

      if (animateBy === "words") {
        const words = segment.text.split(" ");
        words.forEach((word, wordIndex) => {
          if (word.trim()) {
            units.push({
              text: word,
              className: segment.className,
              segmentIndex,
              unitIndex: wordIndex,
            });
          }
        });
      } else {
        const letters = segment.text.split("");
        letters.forEach((letter, letterIndex) => {
          units.push({
            text: letter,
            className: segment.className,
            segmentIndex,
            unitIndex: letterIndex,
          });
        });
      }

      // Attach the segment's icon to the FIRST unit it contributed
      if (segment.icon && units.length > segmentUnitsStart) {
        units[segmentUnitsStart].icon = segment.icon;
      }
      // Mark the LAST unit of this segment with a trailing line break
      if (segment.lineBreak && units.length > segmentUnitsStart) {
        units[units.length - 1].lineBreakAfter = true;
      }
    });

    return units;
  }, [segments, animateBy]);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current as Element);
        }
      },
      { threshold, rootMargin },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const defaultFrom = useMemo(
    () =>
      direction === "top"
        ? { filter: "blur(10px)", opacity: 0, y: -50 }
        : { filter: "blur(10px)", opacity: 0, y: 50 },
    [direction],
  );

  const defaultTo = useMemo(
    () => [
      {
        filter: "blur(5px)",
        opacity: 0.5,
        y: direction === "top" ? 5 : -5,
      },
      { filter: "blur(0px)", opacity: 1, y: 0 },
    ],
    [direction],
  );

  const stepCount = defaultTo.length + 1;
  const totalDuration = stepDuration * (stepCount - 1);
  const times = Array.from({ length: stepCount }, (_, i) =>
    stepCount === 1 ? 0 : i / (stepCount - 1),
  );

  return (
    <Component ref={ref as React.RefObject<never>} className={className}>
      {animationUnits.map((unit, index) => {
        const animateKeyframes = buildKeyframes(defaultFrom, defaultTo);

        const spanTransition: Transition = {
          duration: totalDuration,
          times,
          delay: (initialDelay + index * delay) / 1000,
        };

        return (
          <span key={`${unit.segmentIndex}-${unit.unitIndex}-${index}`} style={{ display: "inline" }}>
            <motion.span
              initial={defaultFrom}
              animate={inView ? animateKeyframes : defaultFrom}
              transition={spanTransition}
              onAnimationComplete={
                index === animationUnits.length - 1 ? onAnimationComplete : undefined
              }
              className={unit.className}
              style={{
                display: "inline-block",
                willChange: "transform, filter, opacity",
              }}
            >
              {unit.icon && (
                <Image
                  src={unit.icon.src}
                  alt={unit.icon.alt}
                  width={256}
                  height={256}
                  priority
                  className={
                    unit.icon.className ??
                    "inline-block h-[0.9em] w-[0.9em] align-[-0.1em] mr-[0.15em] object-contain"
                  }
                />
              )}
              {unit.text === " " ? "\u00A0" : unit.text}
              {/* Add space after every word except the last and except before a line break */}
              {animateBy === "words" &&
                index < animationUnits.length - 1 &&
                !unit.lineBreakAfter &&
                "\u00A0"}
            </motion.span>
            {unit.lineBreakAfter && <br />}
          </span>
        );
      })}
    </Component>
  );
};

export default StyledBlurText;
