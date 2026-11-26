import Link from 'next/link';
import React from 'react';
import { IconAward, IconMedal } from '@tabler/icons-react';
import Reveal from '@/components/Reveal';
import DemoMedia from '@/components/DemoMedia';
import { SectionHeading } from '@/components/FeaturedWork';
import type { Project, Award } from '@/components/FeaturedWork/types';

const medalStyles: Record<Award['variant'], string> = {
  gold: 'bg-gradient-to-b from-amber-200 to-amber-400 text-amber-900',
  silver: 'bg-gradient-to-b from-slate-100 to-slate-300 text-slate-700',
  bronze: 'bg-gradient-to-b from-orange-200 to-orange-400 text-orange-900',
  special: 'bg-white text-ink',
};

// Gold, silver or bronze get a medal; "Won …" and special awards get a ribbon.
const MedalBadge: React.FC<{ award: Award }> = ({ award }) => {
  const ribbon = award.variant === 'special' || /^won\b/i.test(award.label);
  const Icon = ribbon ? IconAward : IconMedal;
  return (
    <span
      title={award.label}
      className={`absolute left-3 top-3 z-[2] flex size-9 items-center justify-center rounded-full ring-1 ring-black/10 ${ribbon ? medalStyles.special : medalStyles[award.variant]}`}
    >
      <Icon className="size-5" stroke={1.75} />
      <span className="sr-only">{award.label}</span>
    </span>
  );
};

// Large tiles sit left in the first group of three and right in the second.
const tileLayout = [
  'md:col-span-2 md:row-span-2',
  '',
  '',
  '',
  'md:col-start-2 md:col-span-2 md:row-span-2',
  '',
];

const HackathonTile: React.FC<{ hackathon: Project; className: string }> = ({ hackathon, className }) => {
  const title = hackathon.name.split(':')[0];
  const event = hackathon.hackathonName?.replace(`${title}: `, '');
  const large = className.includes('row-span-2');
  return (
    <Link
      href={hackathon.href}
      className={`group relative block aspect-[4/3] md:aspect-auto overflow-hidden rounded-[20px] bg-surface ring-1 ring-black/[0.08] ${className}`}
    >
      <DemoMedia
        src={hackathon.images?.[0] || '/placeholder.png'}
        alt={hackathon.name}
        sizes={large ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 100vw, 33vw'}
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
      />
      {hackathon.awards?.[0] && <MedalBadge award={hackathon.awards[0]} />}
      <div className="card-scrim backdrop-blur-md" />
      <div className="absolute inset-x-0 bottom-0 z-[2] p-4 sm:p-5">
        <h3 className={`font-semibold tracking-tight text-white ${large ? 'text-xl' : 'text-base'}`}>{title}</h3>
        {event && event !== title && <p className="truncate text-sm text-white/75">{event}</p>}
      </div>
    </Link>
  );
};

const FeaturedHackathons: React.FC<{ hackathons: Project[] }> = ({ hackathons }) => {
  const featured = hackathons.slice(0, 6);
  if (featured.length === 0) return null;

  return (
    <section className="bg-white pt-24 sm:pt-32 pb-24 sm:pb-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title="12× hackathon winner." href="/projects" linkLabel="All hackathons" />
        <Reveal className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3 md:auto-rows-[220px] lg:auto-rows-[260px]">
          {featured.map((hackathon, index) => (
            <HackathonTile key={hackathon.id} hackathon={hackathon} className={tileLayout[index]} />
          ))}
        </Reveal>
      </div>
    </section>
  );
};

export default FeaturedHackathons;
