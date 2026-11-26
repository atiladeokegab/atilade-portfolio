"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import AboutSection from "@/components/AboutSection";

// The back of the badge: real text, laid out at the card's 320x450 px so it maps onto the 3D card.
const BadgeBack = ({ live }: { live: boolean }) => (
  <div className="flex h-[450px] w-[320px] flex-col rounded-[22px] bg-white px-7 pb-6 pt-9 text-ink shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06)]">
    <p className="text-[28px] font-semibold leading-[1.1] tracking-[-0.02em]">Atilade Oke</p>
    <ul className="mt-6 divide-y divide-black/10 border-y border-black/10 text-[17px] leading-snug">
      <li className="py-3">Founder, Refinery</li>
      <li className="py-3">Analyst, Data and AI, ION</li>
      <li className="py-3">12× hackathon winner</li>
      <li className="py-3">#1 IBM Z Ambassador 2025–26</li>
    </ul>
    <a
      href="/Atilade_Oke_CV.pdf"
      tabIndex={live ? -1 : 0}
      className="pointer-events-auto mt-auto inline-flex min-h-11 items-center self-start text-[17px] font-medium text-link underline decoration-link/30 underline-offset-4 hover:decoration-link"
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

export default function About() {
  const { mode, mobile } = useBadgeMode();
  const [flipped, setFlipped] = useState(false);
  const flip = () => setFlipped((f) => !f);
  return (
    <div className="bg-white text-ink">
      <style>{frame}</style>
      <div className="container mx-auto max-w-6xl px-4 sm:px-8">
        <section className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_480px_minmax(0,1fr)] lg:grid-rows-[1fr_auto] lg:gap-x-8">
          {/* The badge: the page's figure, centred. A tap, or the button under it, turns it over. */}
          <div className="relative -mx-4 -mt-2 sm:mx-0 lg:col-start-2 lg:row-span-2 lg:-mt-6">
            <div
              role="img"
              aria-label="Atilade Oke's lanyard badge: Electrical Engineering, University of Manchester. Drag it to swing it."
              className="relative h-[430px] lg:h-[499px]"
            >
              {mode === "live" ? (
                <Lanyard
                  position={mobile ? [0, -0.459, 7.5] : [0, -0.366, 7.58]}
                  gravity={[0, -40, 0]}
                  flipped={flipped}
                  onFlip={flip}
                  back={<BadgeBack live />}
                />
              ) : (
                <>
                  <StillBadge />
                  {/* Reduced motion and no WebGL: the back swaps in at once, over the card's footprint. */}
                  {flipped && (
                    <div className="absolute left-1/2 top-[60px] w-[260px] -translate-x-1/2 lg:top-[66px] lg:ml-[-3px] lg:w-[299px]">
                      <div className="origin-top-left scale-[0.8125] lg:scale-[0.934]">
                        <BadgeBack live={false} />
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
            <div className="flex justify-center">
              <button
                type="button"
                onClick={flip}
                aria-pressed={flipped}
                className="inline-flex min-h-11 items-center px-3 text-[15px] text-ink-2 underline decoration-black/20 underline-offset-4 hover:text-ink"
              >
                {flipped ? "Tap the badge to flip it back" : "Tap the badge to flip it"}
              </button>
            </div>
            <p className="sr-only" aria-live="polite">
              {flipped ? "Back of the badge: Founder, Refinery. Analyst, Data and AI, ION. 12× hackathon winner. #1 IBM Z Ambassador 2025–26." : ""}
            </p>
          </div>

          <h1 className="mt-3 max-w-[16ch] text-[28px] font-semibold leading-[1.1] tracking-[-0.025em] sm:text-[32px] lg:col-start-1 lg:row-start-1 lg:mt-0 lg:self-end">
            Engineer, founder and hackathon winner in London.
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3 lg:col-start-3 lg:row-start-1 lg:mt-0 lg:self-end">
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
          <p className="mt-4 max-w-[40ch] text-[17px] leading-relaxed text-ink-2 lg:col-start-1 lg:row-start-2 lg:mt-4 lg:self-start">
            I&apos;m building{" "}
            <a href="/projects/refinery" className="font-medium text-ink underline decoration-black/20 underline-offset-4 hover:decoration-ink">Refinery</a>.
            It proves AI changes to mainframe COBOL are safe to deploy.
          </p>
        </section>
        <AboutSection />
      </div>
    </div>
  );
}
