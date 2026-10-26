import Link from 'next/link';
import Reveal from '@/components/Reveal';
import React from 'react';
import { SparkleIcon } from '../icons/SparkleIcon';
import { HackathonBentoGroup } from '@/components/HackathonBento';
import type { Project } from '@/components/FeaturedWork/types';

interface FeaturedHackathonsProps {
  hackathons: Project[];
}

const FeaturedHackathons: React.FC<FeaturedHackathonsProps> = ({ hackathons }) => {
  // Two bento groups of three, the second mirrored
  const featuredHackathons = hackathons.slice(0, 6);
  const groups = [featuredHackathons.slice(0, 3), featuredHackathons.slice(3, 6)].filter((g) => g.length > 0);

  if (featuredHackathons.length === 0) {
    return null;
  }

  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-sm font-medium border border-neutral-300 bg-white px-3 py-1.5 rounded-full mb-4">
            <SparkleIcon className="size-5"/>
            <span>48 hours to build and ship</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-neutral-900 mb-4">
            8× hackathon winner.
          </h2>
        </div>

        <div className="mt-16 flex flex-col gap-6">
          {groups.map((group, index) => (
            <Reveal key={index}>
              <HackathonBentoGroup hackathons={group} layout={index % 2 ? 'largeRight' : 'largeLeft'} />
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10 text-center">
          <Link href="/projects" className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900">
            Every hackathon, project and demo
            <span aria-hidden>→</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
};

export default FeaturedHackathons;
