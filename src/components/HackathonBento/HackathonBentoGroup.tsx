import React from 'react';
import { HackathonBentoCard } from './HackathonBentoCard';
import type { Project } from '@/components/FeaturedWork/types';

interface HackathonBentoGroupProps {
  hackathons: Project[];
  layout?: 'largeLeft' | 'largeRight';
}

export const HackathonBentoGroup: React.FC<HackathonBentoGroupProps> = ({
  hackathons,
  layout = 'largeLeft'
}) => {
  if (!hackathons || hackathons.length === 0) {
    return null;
  }

  const [first, second, third] = hackathons;
  const isLargeRight = layout === 'largeRight';

  if (hackathons.length === 1) {
    return (
      <div className="max-w-6xl mx-auto grid grid-cols-1 gap-6">
        <HackathonBentoCard hackathon={first} variant="large" />
      </div>
    );
  }

  if (hackathons.length === 2) {
    return (
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        {isLargeRight ? (
          <>
            <HackathonBentoCard hackathon={second} variant="horizontal" />
            <HackathonBentoCard hackathon={first} variant="large" />
          </>
        ) : (
          <>
            <HackathonBentoCard hackathon={first} variant="large" />
            <HackathonBentoCard hackathon={second} variant="horizontal" />
          </>
        )}
      </div>
    );
  }

  // Full group of 3
  if (isLargeRight) {
    return (
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-2 gap-6">
        <HackathonBentoCard hackathon={second} variant="horizontal" />
        <HackathonBentoCard hackathon={first} variant="large" />
        <HackathonBentoCard hackathon={third} variant="horizontal" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-2 gap-6">
      <HackathonBentoCard hackathon={first} variant="large" />
      <HackathonBentoCard hackathon={second} variant="horizontal" />
      <HackathonBentoCard hackathon={third} variant="horizontal" />
    </div>
  );
};

export default HackathonBentoGroup;
