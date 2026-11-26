"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import AboutSection from "@/components/AboutSection";
import { plexMono } from "./mono";

// The badge as a still: what loads first, what reduced motion and a browser without WebGL keep.
// The badge at rest, matched to the live one's pose and size: what shows while it loads, under reduced
// motion and without WebGL, so the signature is never missing its strap.
const StillBadge = () => (
  <div className="absolute inset-0" aria-hidden="true">
    <div className="absolute left-1/2 top-0 h-[112px] w-[22px] -translate-x-1/2 bg-ink lg:h-[170px] lg:w-[32px]" />
    <div className="absolute left-1/2 top-[104px] h-[26px] w-[30px] -translate-x-1/2 rounded-[7px] border-[5px] border-[#2a2a2c] lg:top-[160px] lg:h-[32px] lg:w-[40px] lg:border-[6px]" />
    <div className="absolute left-1/2 top-[131px] w-[168px] -translate-x-1/2 overflow-hidden rounded-[12px] bg-white shadow-[0_1px_0_rgba(0,0,0,0.08),0_24px_48px_-20px_rgba(0,0,0,0.3)] lg:top-[188px] lg:w-[304px] lg:rounded-[18px]">
      <Image src="/about/badge-front.jpg" alt="" width={512} height={715} priority sizes="(min-width: 1024px) 304px, 168px" className="h-auto w-full" />
    </div>
  </div>
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
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-12">
          <div
            role="img"
            aria-label="Lanyard badge: Atilade Oke, Electrical Engineering at the University of Manchester. Drag it to swing it."
            className="relative -mx-4 -mt-2 h-[394px] sm:mx-0 lg:-mt-24 lg:h-[630px]"
          >
            {mode === "live" ? (
              <Lanyard position={mobile ? [0, 0, 10.6] : [0, 0, 9.4]} gravity={[0, -40, 0]} />
            ) : (
              <StillBadge />
            )}
          </div>

          <div className="pt-4 lg:self-center lg:pt-0">
            <h1 className="max-w-[18ch] text-[32px] font-semibold leading-[1.08] tracking-[-0.025em] sm:text-[44px]">
              Engineer, founder and hackathon winner in London.
            </h1>
            <p className="mt-4 max-w-[58ch] text-[17px] leading-relaxed text-ink-2 sm:text-[19px]">
              I&apos;m building{" "}
              <a href="/projects/refinery" className="font-medium text-ink underline decoration-black/20 underline-offset-4 hover:decoration-ink">Refinery</a>.
              It proves AI changes to mainframe COBOL are safe to deploy.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
              <a
                href="/Atilade_Oke_CV.pdf"
                className="inline-flex min-h-11 items-center rounded-full bg-link px-5 text-base font-medium text-white transition-colors hover:bg-[#0077ed]"
              >
                Download CV (PDF)
              </a>
              <a href="mailto:okeatilade@gmail.com" className="inline-flex min-h-11 items-center text-base text-ink underline decoration-black/25 underline-offset-4 hover:decoration-ink">
                Email me
              </a>
            </div>
            {mode === "live" && <p className="mt-10 hidden text-[13px] text-ink-2 lg:block">The badge is live. Drag it.</p>}
          </div>
        </div>
        <AboutSection />
      </div>
    </div>
  );
}
