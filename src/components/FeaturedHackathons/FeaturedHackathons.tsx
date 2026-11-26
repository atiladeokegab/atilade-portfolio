import Link from 'next/link';
import Reveal from '@/components/Reveal';
import React from 'react';
import { SparkleIcon } from '../icons/SparkleIcon';
import HackathonIndex from '@/components/HackathonIndex';
import { isWin, type Project } from '@/components/FeaturedWork/types';

interface FeaturedHackathonsProps {
  hackathons: Project[];
}

const FeaturedHackathons: React.FC<FeaturedHackathonsProps> = ({ hackathons }) => {
  const wins = hackathons.filter(isWin);

  if (wins.length === 0) {
    return null;
  }

  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-sm font-medium border border-neutral-300 bg-white px-3 py-1.5 rounded-full mb-4">
            <SparkleIcon className="size-5"/>
            <span>The trophy wall</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-neutral-900 mb-4">
            12× hackathon winner.
          </h2>
        </div>

        <Reveal className="mt-12 sm:mt-16 max-w-5xl mx-auto">
          <HackathonIndex hackathons={wins} />
        </Reveal>
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
