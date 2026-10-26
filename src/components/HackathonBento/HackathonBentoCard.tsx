"use client";

import React, { useRef } from 'react';
import DemoMedia from '@/components/DemoMedia';
import ProjectLinks from '@/components/ProjectLinks';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { IconPointerFilled, IconTrophy, IconMedal, IconMedal2, IconAward } from "@tabler/icons-react";
import type { Project, Award } from '@/components/FeaturedWork/types';

interface HackathonBentoCardProps {
  hackathon: Project;
  variant: 'large' | 'horizontal';
}

const awardVariantStyles: Record<Award['variant'], string> = {
  gold: 'bg-gradient-to-b from-amber-50 to-amber-100 text-amber-800 ring-amber-200',
  silver: 'bg-gradient-to-b from-white to-slate-100 text-slate-700 ring-slate-300',
  bronze: 'bg-gradient-to-b from-orange-50 to-orange-100 text-orange-800 ring-orange-200',
  special: 'bg-white text-neutral-600 ring-neutral-200',
};

const awardIcons: Record<Award['variant'], typeof IconTrophy> = {
  gold: IconTrophy,
  silver: IconMedal2,
  bronze: IconMedal,
  special: IconAward,
};

const AwardPill: React.FC<{ award: Award }> = ({ award }) => {
  const Icon = awardIcons[award.variant] ?? IconTrophy;
  return (
    <div className={`inline-flex items-center gap-1.5 ${awardVariantStyles[award.variant]} px-2.5 py-1 rounded-full text-xs font-semibold ring-1 shadow-[0_1px_0_rgba(255,255,255,0.8)_inset]`}>
      <Icon className="w-3.5 h-3.5" />
      {award.label}
    </div>
  );
};

// Lifts on hover and lays a soft light under the cursor.
const CardShell: React.FC<{ className: string; children: React.ReactNode }> = ({ className, children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    ref.current!.style.setProperty('--x', `${e.clientX - r.left}px`);
    ref.current!.style.setProperty('--y', `${e.clientY - r.top}px`);
  };
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className={`group relative overflow-hidden rounded-xl bg-[#F6F5F4] ring-1 ring-black/[0.04] transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl motion-reduce:hover:translate-y-0 ${className}`}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: 'radial-gradient(420px circle at var(--x) var(--y), rgba(255,255,255,0.35), transparent 60%)' }}
      />
      {children}
    </div>
  );
};

// The build's own name sits on the picture; the event name is the card title.
const Media: React.FC<{ hackathon: Project; sizes: string }> = ({ hackathon, sizes }) => (
  <>
    <DemoMedia
      src={hackathon.images?.[0] || '/placeholder.png'}
      alt={`${hackathon.name} demo`}
      sizes={sizes}
      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
    />
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-black/50 to-transparent" />
    <div className="absolute inset-x-3 bottom-3 z-10 flex items-end justify-between gap-2">
      {hackathon.hackathonName && hackathon.name !== hackathon.hackathonName ? (
        <span className="text-sm font-semibold text-white drop-shadow">{hackathon.name}</span>
      ) : <span />}
      {hackathon.displayDate && (
        <span className="text-xs font-medium text-white bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-full">
          {hackathon.displayDate}
        </span>
      )}
    </div>
  </>
);

const Cta: React.FC<{ hackathon: Project }> = ({ hackathon }) => (
  <div className="flex flex-wrap items-center gap-2">
    <Button variant="tactile-black" size="default" asChild className="w-fit">
      <Link href={hackathon.href} className="inline-flex items-center gap-2">
        <IconPointerFilled className="w-6 h-6 fill-current" />
        Click to View More
      </Link>
    </Button>
    <ProjectLinks project={hackathon} />
  </div>
);

export const HackathonBentoCard: React.FC<HackathonBentoCardProps> = ({ hackathon, variant }) => {
  const { name, description, awards, hackathonName } = hackathon;

  if (variant === 'large') {
    return (
      <CardShell className="flex flex-col justify-between lg:row-span-2">
        <div className="p-8 flex flex-col gap-4">
          {awards && awards.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {awards.map((award) => <AwardPill key={award.label} award={award} />)}
            </div>
          )}
          <div>
            <h3 className="text-[28px] font-bold leading-tight tracking-tight m-0">{hackathonName || name}</h3>
            <p className="text-base text-black/70 mt-2 leading-relaxed">{description}</p>
          </div>
          <Cta hackathon={hackathon} />
        </div>
        <div className="w-full relative p-3 flex-1">
          <div className="relative w-full h-full min-h-[240px] lg:aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-200">
            <Media hackathon={hackathon} sizes="(max-width: 1024px) 100vw, 50vw" />
          </div>
        </div>
      </CardShell>
    );
  }

  return (
    <CardShell className="flex flex-col lg:flex-row min-h-[250px]">
      <div className="p-6 flex flex-col gap-3 justify-center z-10 w-full lg:w-[46%] lg:flex-shrink-0">
        {awards && awards.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {awards.slice(0, 2).map((award) => <AwardPill key={award.label} award={award} />)}
            {awards.length > 2 && (
              <div className="inline-flex items-center bg-white text-neutral-500 ring-1 ring-neutral-200 px-2.5 py-1 rounded-full text-xs font-semibold">
                +{awards.length - 2}
              </div>
            )}
          </div>
        )}
        <div>
          <h3 className="text-[24px] font-bold leading-tight tracking-tight m-0">{hackathonName || name}</h3>
          <p className="text-[15px] text-black/70 mt-1.5 leading-relaxed line-clamp-4">{description}</p>
        </div>
        <Cta hackathon={hackathon} />
      </div>
      <div className="relative w-full lg:flex-1 h-[300px] sm:h-[350px] lg:h-auto z-0 p-3">
        <div className="relative h-full w-full rounded-2xl overflow-hidden bg-neutral-200">
          <Media hackathon={hackathon} sizes="(max-width: 1024px) 100vw, 30vw" />
        </div>
      </div>
    </CardShell>
  );
};

export default HackathonBentoCard;
