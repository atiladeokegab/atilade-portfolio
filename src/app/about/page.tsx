"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import AboutSection from "@/components/AboutSection";
import { plexMono } from "./mono";

// The badge as a still: what loads first, what reduced motion and a browser without WebGL keep.
// The live badge at rest, captured from the 3D scene at 2x for each layout: what shows while it loads,
// under reduced motion and without WebGL, so the still and the live badge are the same object.
const StillBadge = () => (
  <picture className="absolute inset-0" aria-hidden="true">
    <source media="(min-width: 1024px)" srcSet="/about/badge-rest-desktop.webp" />
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img src="/about/badge-rest-mobile.webp" alt="" className="mx-auto h-full w-auto" fetchPriority="high" />
  </picture>
);

const Lanyard = dynamic(() => import("@/components/Lanyard"), { ssr: false, loading: () => <StillBadge /> });

function useBadgeMode() {
  const [mode, setMode] = useState<"still" | "live">("still");
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const phone = window.matchMedia("(max-width: 1023px)");
    const gl = (() => {
      try {
        const c = document.createElement("canvas");
        return !!(c.getContext("webgl2") || c.getContext("webgl"));
      } catch {
        return false;
      }
    })();
    const update = () => {
      setMode(gl && !reduce.matches ? "live" : "still");
      setMobile(phone.matches);
    };
    update();
    reduce.addEventListener("change", update);
    phone.addEventListener("change", update);
    return () => {
      reduce.removeEventListener("change", update);
      phone.removeEventListener("change", update);
    };
  }, []);
  return { mode, mobile };
}

// The header and footer are shared and stay as they are; on this page the document gets the finish
// they lack: a focus ring, a styled selection, caret and scrollbar, 44px touch areas, and no motion
// under reduced motion. Padding with an equal negative margin grows the hit area without moving anything.
const frame = `
::selection{background:#cfe3fb;color:#1d1d1f}
html{caret-color:#0071e3;scrollbar-color:#c7c7cc transparent}
:focus-visible{outline:2px solid #0071e3 !important;outline-offset:3px;border-radius:6px}
@media (pointer:coarse){header a,footer a{padding:8px;margin:-8px}}
@media (prefers-reduced-motion:reduce){*,*::before,*::after{transition:none !important;animation:none !important}}
`;

export default function About() {
  const { mode, mobile } = useBadgeMode();
  return (
    <div className={`${plexMono.variable} bg-white text-ink`}>
      <style>{frame}</style>
      <div className="container mx-auto max-w-6xl px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[420px_minmax(0,1fr)] lg:gap-24">
          <div
            role="img"
            aria-label="Lanyard badge: Atilade Oke, Electrical Engineering at the University of Manchester. Drag it to swing it."
            className="relative -mx-4 -mt-2 h-[430px] sm:mx-0 lg:mt-0 lg:h-[537px]"
          >
            {mode === "live" ? (
              <Lanyard position={mobile ? [0, -0.398, 8.12] : [0, -0.384, 8.95]} gravity={[0, -40, 0]} />
            ) : (
              <StillBadge />
            )}
          </div>

          <div className="pt-4 lg:self-center lg:pt-0">
            <h1 className="max-w-[18ch] text-[28px] font-semibold leading-[1.08] tracking-[-0.025em] sm:text-[44px]">
              Engineer, founder and hackathon winner in London.
            </h1>
            <p className="mt-3 max-w-[58ch] sm:mt-4 text-[17px] leading-relaxed text-ink-2 sm:text-[20px]">
              I&apos;m building{" "}
              <a href="/projects/refinery" className="font-medium text-ink underline decoration-black/20 underline-offset-4 hover:decoration-ink">Refinery</a>.
              It proves AI changes to mainframe COBOL are safe to deploy.
            </p>
            <div className="mt-5 flex flex-wrap sm:mt-6 items-center gap-x-6 gap-y-3">
              <a
                href="/Atilade_Oke_CV.pdf"
                className="inline-flex min-h-11 items-center rounded-full bg-link px-5 text-[17px] font-medium text-white transition-colors hover:bg-[#0077ed]"
              >
                Download CV (PDF)
              </a>
              <a href="mailto:okeatilade@gmail.com" className="inline-flex min-h-11 items-center text-[17px] text-ink underline decoration-black/25 underline-offset-4 hover:decoration-ink">
                Email me
              </a>
            </div>
            {/* Space kept when the still shows, so the column never jumps. */}
            <p className={`mt-3 text-[13px] text-ink-2 lg:mt-10 ${mode === "live" ? "" : "invisible"}`}>Drag the badge to swing it.</p>
          </div>
        </div>
        <AboutSection />
      </div>
    </div>
  );
}
