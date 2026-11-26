"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import AboutSection from "@/components/AboutSection";

// The back of the badge: real text, laid out at the card's on-screen size (1.6:2.25) so it maps 1:1.
const BadgeBack = ({ live, width }: { live: boolean; width: number }) => (
  <div style={{ width, height: (width * 2.25) / 1.6 }} className="flex flex-col rounded-[22px] bg-white px-6 pb-6 pt-9 text-ink shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06)]">
    <p className="text-[28px] font-semibold leading-[1.1] tracking-[-0.02em]">Atilade Oke</p>
    <ul className="mt-6 divide-y divide-black/10 border-y border-black/10 text-[17px] leading-snug">
      <li className="py-3">Founder, Refinery</li>
      <li className="py-3">Analyst, Data and AI, ION</li>
      <li className="py-3">12× hackathon winner</li>
      <li className="whitespace-nowrap py-3">#1 IBM Z Ambassador 2025–26</li>
      <li className="py-3">BEng, Manchester, 2:1</li>
    </ul>
    <a
      href="/Atilade_Oke_CV.pdf"
      tabIndex={live ? -1 : 0}
      className="pointer-events-auto mt-4 inline-flex min-h-11 items-center self-start text-[17px] font-medium text-link underline decoration-link/30 underline-offset-4 hover:decoration-link"
    >
      Download CV
    </a>
  </div>
);

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

// Camera [x, y, z] per layout: framed so the card is 400px wide at 1280 and 300px at 390, under a short run of strap.
const DESKTOP_CAMERA: [number, number, number] = [0, -0.33, 7.26];
const MOBILE_CAMERA: [number, number, number] = [0, -0.41, 7.41];

export default function About() {
  const { mode, mobile } = useBadgeMode();
  const [flipped, setFlipped] = useState(false);
  const flip = () => setFlipped((f) => !f);
  return (
    <div className="bg-white text-ink">
      <style>{frame}</style>
      <div className="container mx-auto max-w-6xl px-4 sm:px-8">
        <section className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_440px_minmax(0,1fr)] lg:items-center lg:gap-x-8">
          {/* The badge: the page's figure, centred. A tap on it, or the button beside it, turns it over. */}
          <div className="relative -mx-4 -mt-2 sm:mx-0 lg:col-start-2 lg:row-start-1 lg:-mt-6">
            <div
              role="img"
              aria-label="Atilade Oke's lanyard badge: Electrical Engineering, University of Manchester. Drag it to swing it."
              className="relative h-[496px] lg:h-[640px]"
            >
              {mode === "live" ? (
                <Lanyard
                  position={mobile ? MOBILE_CAMERA : DESKTOP_CAMERA}
                  gravity={[0, -40, 0]}
                  flipped={flipped}
                  onFlip={flip}
                  back={<BadgeBack live width={mobile ? 300 : 400} />}
                  backWidth={mobile ? 300 : 400}
                />
              ) : (
                <>
                  <StillBadge />
                  {/* Reduced motion and no WebGL: the back swaps in at once, over the card's footprint. */}
                  {flipped && (
                    <div className="absolute left-1/2 top-[60px] -translate-x-1/2 lg:top-[93px]">
                      <BadgeBack live={false} width={mobile ? 300 : 400} />
                    </div>
                  )}
                </>
              )}
            </div>
            <p className="sr-only" aria-live="polite">
              {flipped ? "Back of the badge: Founder, Refinery. Analyst, Data and AI, ION. 12× hackathon winner. #1 IBM Z Ambassador 2025–26. BEng, Manchester, 2:1." : ""}
            </p>
          </div>

          <button
            type="button"
            onClick={flip}
            aria-pressed={flipped}
            className="mx-auto inline-flex min-h-11 items-center px-3 text-[15px] text-ink-2 underline decoration-black/20 underline-offset-4 hover:text-ink lg:col-start-3 lg:row-start-1 lg:mx-0 lg:justify-self-start lg:px-0"
          >
            <span className="[@media(pointer:fine)]:hidden">Tap the badge to flip it{flipped ? " back" : ""}</span>
            <span className="hidden [@media(pointer:fine)]:inline">Click the badge to flip it{flipped ? " back" : ""}</span>
          </button>

          <div className="flex flex-col lg:col-start-1 lg:row-start-1">
            <h1 className="mt-1 text-[28px] font-semibold leading-[1.1] tracking-[-0.025em] lg:mt-0">
              Engineer, founder and hackathon winner in London.
            </h1>
            <p className="order-3 mt-4 text-[17px] leading-relaxed text-ink-2 lg:order-none">
              I&apos;m building{" "}
              <a href="/projects/refinery" className="font-medium text-ink underline decoration-black/20 underline-offset-4 hover:decoration-ink">Refinery</a>.
              It proves AI changes to mainframe COBOL are safe to deploy.
            </p>
            <div className="order-2 mt-3 flex flex-wrap items-center gap-x-6 gap-y-3 lg:order-none lg:mt-6">
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
          </div>
        </section>
        <AboutSection />
      </div>
    </div>
  );
}
