"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { IconTrophy, IconMedal, IconMedal2, IconAward, IconArrowUpRight } from "@tabler/icons-react";
import DemoMedia from "@/components/DemoMedia";
import type { Project, Award } from "@/components/FeaturedWork/types";

const medal: Record<Award["variant"], { Icon: typeof IconTrophy; tone: string }> = {
  gold: { Icon: IconTrophy, tone: "text-amber-600 bg-amber-50 ring-amber-200" },
  silver: { Icon: IconMedal2, tone: "text-slate-600 bg-slate-50 ring-slate-300" },
  bronze: { Icon: IconMedal, tone: "text-orange-700 bg-orange-50 ring-orange-200" },
  special: { Icon: IconAward, tone: "text-neutral-500 bg-white ring-neutral-200" },
};

// Only placings show; "special" labels are track or city names, not awards.
const topAward = (p: Project) => (p.awards ?? []).find((a) => a.variant !== "special");

// A ranked index of builds. On hover the demo floats beside the cursor; on phones each row carries its own thumbnail.
export default function HackathonIndex({ hackathons }: { hackathons: Project[] }) {
  const [active, setActive] = useState<Project | null>(null);
  const preview = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    preview.current?.style.setProperty("transform", `translate(${e.clientX + 32}px, ${e.clientY - 272}px)`);
  };

  return (
    <div onMouseMove={onMove} onMouseLeave={() => setActive(null)} className="relative">
      <ol className="divide-y divide-neutral-200 border-y border-neutral-200">
        {hackathons.map((h, i) => {
          const award = topAward(h);
          const { Icon, tone } = medal[award?.variant ?? "special"];
          const build = h.hackathonName && h.name !== h.hackathonName ? h.name.split(":")[0] : null;
          return (
            <li key={h.id} onMouseEnter={() => setActive(h)}>
              <Link
                href={h.href}
                className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 py-4 sm:py-5 sm:grid-cols-[3rem_auto_1fr_auto_auto] sm:gap-6 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
              >
                <span className="hidden sm:block font-mono text-sm tabular-nums text-neutral-400">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="relative block size-14 shrink-0 overflow-hidden rounded-lg bg-neutral-100 sm:hidden">
                  {h.images?.[0] && <DemoMedia src={h.images[0]} alt="" sizes="56px" className="object-cover size-full" />}
                </span>
                <span className={`hidden sm:inline-flex size-10 items-center justify-center rounded-full ring-1 ${tone}`}>
                  <Icon className="size-5" aria-hidden />
                </span>
                <span className="min-w-0">
                  <span className="block text-lg sm:text-2xl font-semibold tracking-tight text-neutral-900 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:group-hover:translate-x-0">
                    {h.hackathonName || h.name}
                  </span>
                  <span className="mt-0.5 block text-sm text-neutral-500">
                    {[build, h.displayDate].filter(Boolean).join(" · ")}
                    {award && <span className="sm:hidden"> · {award.label}</span>}
                  </span>
                </span>
                {award ? (
                  <span className={`hidden sm:inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-semibold ring-1 ${tone}`}>
                    {award.label}
                  </span>
                ) : <span className="hidden sm:block" />}
                <IconArrowUpRight
                  className="size-5 text-neutral-400 transition-all duration-300 group-hover:text-neutral-900 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden
                />
              </Link>
            </li>
          );
        })}
      </ol>

      {/* Floating preview: pointer devices only, never in the way of the row it describes. */}
      <div
        ref={preview}
        aria-hidden
        className={`pointer-events-none fixed left-0 top-0 z-50 hidden lg:block transition-opacity duration-200 ${active ? "opacity-100" : "opacity-0"}`}
      >
        <div className="relative h-[240px] w-[340px] overflow-hidden rounded-xl bg-neutral-900 shadow-2xl ring-1 ring-black/10 rotate-[-2deg]">
          {active?.images?.[0] &&
            (/\.(mp4|webm)$/i.test(active.images[0]) ? (
              <video key={active.id} src={active.images[0]} muted autoPlay loop playsInline className="size-full object-cover" />
            ) : (
              <Image key={active.id} src={active.images[0]} alt="" fill sizes="340px" className="object-cover" />
            ))}
        </div>
      </div>
    </div>
  );
}
