"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import AboutSection from "@/components/AboutSection";

// The back of the badge: real text, laid out at the card's on-screen size (1.6:2.25) so it maps 1:1.
const BadgeBack = ({ live, width }: { live: boolean; width: number }) => (
  <div style={{ width, height: (width * 2.25) / 1.6 }} className="flex flex-col rounded-[22px] bg-[#e6e6e8] px-6 pb-6 pt-9 text-ink">
    <p className="text-[28px] font-semibold leading-[1.1] tracking-[-0.02em]">Atilade Oke</p>
    <ul className="mt-6 flex flex-1 flex-col divide-y divide-black/[0.12] border-y border-black/[0.12] text-[17px] leading-snug">
      <li className="flex flex-1 items-center py-2.5">Founder, Refinery</li>
      <li className="flex flex-1 items-center py-2.5">Analyst, Data and AI, ION</li>
      <li className="flex flex-1 items-center py-2.5">12× hackathon winner</li>
      <li className="flex flex-1 items-center py-2.5"><span>#1 IBM Z Ambassador <span className="whitespace-nowrap">2025–26</span></span></li>
      <li className="flex flex-1 items-center py-2.5">BEng, Manchester, 2:1</li>
    </ul>
    <a
      href="/Atilade_Oke_CV.pdf"
      tabIndex={live ? -1 : 0}
      className="pointer-events-auto mt-4 inline-flex min-h-11 items-center self-start text-[17px] font-medium text-link underline decoration-link/30 underline-offset-4 hover:decoration-link"
    >
      Download CV (PDF)
    </a>
  </div>
);

const StillBadge = () => (
  <picture className="absolute inset-0">
    <source media="(min-width: 1024px)" srcSet="/about/badge-rest-desktop.webp" />
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

// Camera [x, y, z] per layout: the whole clip hangs below the header and the card ends inside the first
// screen; 320px wide at 1280 (card top ~180px) and 290px at 390 (clip 12px+ under the header).
const DESKTOP_CAMERA: [number, number, number] = [0, -0.142, 9.356];
const MOBILE_CAMERA: [number, number, number] = [0, -0.377, 8.065];

export default function About() {
  const { mode, mobile } = useBadgeMode();
  const [flipped, setFlipped] = useState(false);
  const flip = () => setFlipped((f) => !f);
  return (
    <div className="bg-white text-ink">
      <style>{frame}</style>
      <div className="container mx-auto max-w-6xl px-4 sm:px-8">
        <section className="grid grid-cols-1 lg:grid-cols-12 lg:items-center lg:gap-x-8 lg:gap-y-0">
          {/* The badge: the page's figure, centred. A tap on it, or the button beside it, turns it over. */}
          <div className="relative -mx-4 -mt-2 sm:mx-0 lg:col-span-7 lg:col-start-6 lg:row-start-1 lg:-mt-24">
            <div
              role="img"
              aria-label="Atilade Oke's lanyard badge: Electrical Engineering, University of Manchester. Drag it to swing it."
              // The strap fades out just under the header, so the badge hangs from above the page.
              className="relative h-[512px] [mask-image:linear-gradient(to_bottom,transparent_4px,black_16px)] lg:mx-auto lg:h-[660px] lg:w-[480px] lg:[mask-image:linear-gradient(to_bottom,transparent_78px,black_92px)]"
            >
              {/* Contact shadow under the card. */}
              <div className="pointer-events-none absolute left-1/2 top-[636px] hidden h-6 w-[280px] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgba(0,0,0,0.16),transparent)] blur-[6px] lg:block" />
              {mode === "live" ? (
                <Lanyard
                  position={mobile ? MOBILE_CAMERA : DESKTOP_CAMERA}
                  gravity={[0, -40, 0]}
                  flipped={flipped}
                  onFlip={flip}
                  back={<BadgeBack live width={mobile ? 290 : 320} />}
                  backWidth={mobile ? 290 : 320}
                />
              ) : (
                <>
                  <StillBadge />
                  {/* Reduced motion and no WebGL: the back swaps in at once, over the card's footprint. */}
                  {flipped && (
                    <div className="absolute left-1/2 top-[99px] -translate-x-1/2 lg:top-[180px]">
                      <BadgeBack live={false} width={mobile ? 290 : 320} />
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
            className="mx-auto inline-flex min-h-11 items-center px-3 text-[15px] text-ink-2 underline decoration-black/20 underline-offset-4 hover:text-ink mt-2 lg:col-span-7 lg:col-start-6 lg:row-start-2"
          >
            <span className="[@media(hover:hover)]:hidden">Tap the badge to flip it{flipped ? " back" : ""}</span>
            <span className="hidden [@media(hover:hover)]:inline">Click the badge to flip it{flipped ? " back" : ""}</span>
          </button>

          <div className="flex flex-col lg:col-span-5 lg:col-start-1 lg:row-span-2 lg:row-start-1">
            <h1 className="mt-1 font-[family-name:var(--font-instrument-serif)] text-[28px] font-normal leading-[1.05] lg:mt-0 lg:text-[48px]">
              Engineer, founder and hackathon winner in London.
            </h1>
            <p className="order-3 mt-4 text-[17px] leading-relaxed text-ink-2 lg:order-none">
              I&apos;m building{" "}
              <Link href="/projects/refinery" className="font-medium text-ink underline decoration-black/20 underline-offset-4 hover:decoration-ink">Refinery</Link>.
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
