import React from 'react';
import { SparkleIcon } from '../icons/SparkleIcon';
import { HackathonBentoGroup } from '@/components/HackathonBento';
import type { Project } from '@/components/FeaturedWork/types';

interface FeaturedHackathonsProps {
  hackathons: Project[];
}

const FeaturedHackathons: React.FC<FeaturedHackathonsProps> = ({ hackathons }) => {
  // Take first 3 hackathons for the featured section
  const featuredHackathons = hackathons.slice(0, 3);

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
            Built under pressure. Shipped.
          </h2>
        </div>

        <div className="mt-16">
          <HackathonBentoGroup hackathons={featuredHackathons} />
        </div>
      </div>
    </section>
  );
};

export default FeaturedHackathons;
