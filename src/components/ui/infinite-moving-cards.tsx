"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useEffect, useRef, useState, useCallback } from "react";

const SPEED_DURATIONS: Record<string, number> = { fast: 20, normal: 40, slow: 80 };
const FRICTION = 0.95; // per 16ms frame
const MOMENTUM_ENTRY_THRESHOLD = 0.05; // px/ms
const MOMENTUM_STOP_THRESHOLD = 0.01; // px/ms
const MAX_DT = 100; // ms, cap to prevent jumps after tab switch

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  items: {
    src: string;
    alt: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);
  const [isDraggingState, setIsDraggingState] = useState(false);

  // Refs for animation loop (avoid stale closures)
  const directionRef = useRef(direction);
  const speedRef = useRef(speed);
  const offsetRef = useRef(0);
  const rafIdRef = useRef(0);
  const lastTimeRef = useRef(0);
  const halfWidthRef = useRef(0);

  // Drag state
  const isDraggingRef = useRef(false);
  const isMomentumRef = useRef(false);
  const velocityRef = useRef(0);
  const dragStartXRef = useRef(0);
  const dragOffsetAtStartRef = useRef(0);
  const lastPointerXRef = useRef(0);
  const lastPointerTimeRef = useRef(0);

  // Hover pause
  const isPausedRef = useRef(false);

  // Sync prop changes to refs
  useEffect(() => { directionRef.current = direction; }, [direction]);
  useEffect(() => { speedRef.current = speed; }, [speed]);

  // Clone items for seamless loop
  useEffect(() => {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);
      scrollerContent.forEach((item) => {
        scrollerRef.current!.appendChild(item.cloneNode(true));
      });
      halfWidthRef.current = scrollerRef.current.scrollWidth / 2;
      setStart(true);
    }
  }, []);

  // Recalculate halfWidth on resize
  useEffect(() => {
    if (!start || !scrollerRef.current) return;
    const observer = new ResizeObserver(() => {
      if (scrollerRef.current) {
        halfWidthRef.current = scrollerRef.current.scrollWidth / 2;
      }
    });
    observer.observe(scrollerRef.current);
    return () => observer.disconnect();
  }, [start]);

  // Wrap offset to stay within one cycle
  const wrapOffset = useCallback(() => {
    const hw = halfWidthRef.current;
    if (hw <= 0) return;
    while (offsetRef.current < -hw) offsetRef.current += hw;
    while (offsetRef.current > 0) offsetRef.current -= hw;
  }, []);

  // Main animation loop
  useEffect(() => {
    if (!start || !scrollerRef.current) return;

    const tick = (time: number) => {
      if (!scrollerRef.current) return;

      if (lastTimeRef.current === 0) {
        lastTimeRef.current = time;
        rafIdRef.current = requestAnimationFrame(tick);
        return;
      }

      const dt = Math.min(time - lastTimeRef.current, MAX_DT);
      lastTimeRef.current = time;

      if (isDraggingRef.current) {
        // Position controlled by pointer handler — just keep loop alive
      } else if (isMomentumRef.current) {
        // Apply momentum with exponential decay
        offsetRef.current += velocityRef.current * dt;
        velocityRef.current *= Math.pow(FRICTION, dt / 16);

        if (Math.abs(velocityRef.current) < MOMENTUM_STOP_THRESHOLD) {
          isMomentumRef.current = false;
          velocityRef.current = 0;
        }
      } else if (!isPausedRef.current) {
        // Auto-scroll
        const sign = directionRef.current === "left" ? -1 : 1;
        const hw = halfWidthRef.current;
        const duration = SPEED_DURATIONS[speedRef.current] || 40;
        const pxPerMs = hw / (duration * 1000);
        offsetRef.current += sign * pxPerMs * dt;
      }

      wrapOffset();
      scrollerRef.current.style.transform = `translateX(${offsetRef.current}px)`;

      rafIdRef.current = requestAnimationFrame(tick);
    };

    lastTimeRef.current = 0;
    rafIdRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafIdRef.current);
  }, [start, wrapOffset]);

  // Pointer event handlers
  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if (e.button !== 0) return;

    isDraggingRef.current = true;
    isMomentumRef.current = false;
    velocityRef.current = 0;
    setIsDraggingState(true);

    dragStartXRef.current = e.clientX;
    dragOffsetAtStartRef.current = offsetRef.current;
    lastPointerXRef.current = e.clientX;
    lastPointerTimeRef.current = e.timeStamp;

    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {
      // Pointer capture may fail on some browsers; drag still works via move events
    }
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;

    const dx = e.clientX - dragStartXRef.current;
    offsetRef.current = dragOffsetAtStartRef.current + dx;

    // Track velocity with exponential moving average
    const dt = e.timeStamp - lastPointerTimeRef.current;
    if (dt > 0) {
      const instantVelocity = (e.clientX - lastPointerXRef.current) / dt;
      velocityRef.current = 0.8 * velocityRef.current + 0.2 * instantVelocity;
    }
    lastPointerXRef.current = e.clientX;
    lastPointerTimeRef.current = e.timeStamp;

    wrapOffset();
    if (scrollerRef.current) {
      scrollerRef.current.style.transform = `translateX(${offsetRef.current}px)`;
    }
  }, [wrapOffset]);

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsDraggingState(false);

    if (Math.abs(velocityRef.current) > MOMENTUM_ENTRY_THRESHOLD) {
      isMomentumRef.current = true;
    }

    // Touch never reliably fires onPointerLeave/onMouseLeave after release —
    // explicitly unpause so the carousel doesn't get stuck.
    if (e.pointerType === "touch") {
      isPausedRef.current = false;
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        "select-none",
        isDraggingState ? "cursor-grabbing" : "cursor-grab",
        className,
      )}
      style={{ touchAction: "pan-y" }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onPointerEnter={(e) => { if (pauseOnHover && e.pointerType === "mouse") isPausedRef.current = true; }}
      onPointerLeave={(e) => { if (pauseOnHover && e.pointerType === "mouse") isPausedRef.current = false; }}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-4",
        )}
      >
        {items.map((item, idx) => (
          <li
            className="relative w-[350px] max-w-full shrink-0 rounded-2xl md:w-[450px]"
            key={idx}
          >
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover"
                draggable={false}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
