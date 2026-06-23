import React from 'react';
import { Button } from '../ui/button';
import Link from 'next/link';
import { ParticleGrid } from '../ui/ParticleGrid';
import { IconPointerFilled } from '@tabler/icons-react';

export const ExploreProjectsCallToAction: React.FC = () => {
  return (
    <div
      className="group rounded-2xl border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-gray-100 p-10 md:p-16 lg:p-20 relative overflow-hidden"
    >
      <div className="absolute inset-0 rounded-2xl overflow-hidden">
        <ParticleGrid shape="diamond" />
      </div>
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/20 rounded-2xl"></div>
      
      <div className="text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-white">
          Explore all projects
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-white/70 max-w-2xl mx-auto">
          Discover my diverse range of projects and case studies.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="tactile-secondary" size="default" asChild>
            <Link href="/projects" className="inline-flex items-center gap-2">
                <IconPointerFilled className="w-6 h-6 fill-current" />
                Click to View More
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
