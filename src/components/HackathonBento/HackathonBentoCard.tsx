import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { IconPointerFilled, IconTrophy, IconMedal, IconMedal2, IconAward } from "@tabler/icons-react";
import type { Project, Award } from '@/components/FeaturedWork/types';

interface HackathonBentoCardProps {
  hackathon: Project;
  variant: 'large' | 'horizontal';
}

const awardVariantStyles: Record<Award['variant'], string> = {
  gold: 'bg-amber-100 text-amber-700',
  silver: 'bg-slate-200 text-slate-600',
  bronze: 'bg-orange-100 text-orange-700',
  special: 'bg-neutral-100 text-neutral-600',
};

const getAwardIcon = (variant: Award['variant']) => {
  switch (variant) {
    case 'gold':
      return <IconTrophy className="w-3.5 h-3.5" />;
    case 'silver':
      return <IconMedal2 className="w-3.5 h-3.5" />;
    case 'bronze':
      return <IconMedal className="w-3.5 h-3.5" />;
    case 'special':
      return <IconAward className="w-3.5 h-3.5" />;
    default:
      return <IconTrophy className="w-3.5 h-3.5" />;
  }
};

export const HackathonBentoCard: React.FC<HackathonBentoCardProps> = ({ hackathon, variant }) => {
  const { name, description, href, images, displayDate, awards, hackathonName } = hackathon;
  const imageUrl = images?.[0] || '/placeholder.png';

  if (variant === 'large') {
    return (
      <div className="bg-[#F6F5F4] rounded-xl overflow-hidden relative flex flex-col justify-between lg:row-span-2">
        <div className="p-8 flex flex-col gap-4">
          {/* Awards */}
          {awards && awards.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {awards.map((award, index) => (
                <div
                  key={index}
                  className={`inline-flex items-center gap-1.5 ${awardVariantStyles[award.variant]} px-2.5 py-1 rounded-full text-xs font-semibold`}
                >
                  {getAwardIcon(award.variant)}
                  {award.label}
                </div>
              ))}
            </div>
          )}
          {/* Title and description */}
          <div>
            <h3 className="text-[28px] font-bold leading-tight m-0">{hackathonName || name}</h3>
            <p className="text-base text-black/70 mt-1">{description}</p>
          </div>
          {/* CTA Button */}
          <Button variant="tactile-black" size="default" asChild className="w-fit">
            <Link href={href} className="inline-flex items-center gap-2">
              <IconPointerFilled className="w-6 h-6 fill-current" />
              Click to View More
            </Link>
          </Button>
        </div>
        {/* Image */}
        <div className="w-full relative p-3 flex-1">
          <div className="relative w-full h-full min-h-[200px] lg:aspect-[4/3] rounded-2xl overflow-hidden">
            {displayDate && (
              <span className="absolute bottom-3 right-3 z-10 text-xs font-medium text-white bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-full">
                {displayDate}
              </span>
            )}
            <Image
              src={imageUrl}
              alt={`${name} image`}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    );
  }

  // Horizontal variant
  return (
    <div className="bg-[#F6F5F4] rounded-xl overflow-hidden relative flex flex-col lg:flex-row min-h-[250px]">
      <div className="p-6 flex flex-col gap-3 justify-center z-10 w-full lg:w-[40%] lg:flex-shrink-0">
        {/* Awards - Mobile: show all, Desktop: compact */}
        {awards && awards.length > 0 && (
          <>
            {/* Mobile: Show all awards */}
            <div className="flex flex-wrap gap-1.5 lg:hidden">
              {awards.map((award, index) => (
                <div
                  key={index}
                  className={`inline-flex items-center gap-1.5 ${awardVariantStyles[award.variant]} px-2.5 py-1 rounded-full text-xs font-semibold`}
                >
                  {getAwardIcon(award.variant)}
                  {award.label}
                </div>
              ))}
            </div>
            {/* Desktop: Compact version */}
            <div className="hidden lg:flex flex-wrap gap-1.5">
              {awards.length === 1 ? (
                <div
                  className={`inline-flex items-center gap-1.5 ${awardVariantStyles[awards[0].variant]} px-2.5 py-1 rounded-full text-xs font-semibold`}
                >
                  {getAwardIcon(awards[0].variant)}
                  {awards[0].label}
                </div>
              ) : (
                <>
                  <div
                    className={`inline-flex items-center gap-1.5 ${awardVariantStyles[awards[0].variant]} px-2.5 py-1 rounded-full text-xs font-semibold`}
                  >
                    {getAwardIcon(awards[0].variant)}
                    {awards[0].label}
                  </div>
                  <div className="inline-flex items-center gap-1.5 bg-neutral-100 text-neutral-600 px-2.5 py-1 rounded-full text-xs font-semibold">
                    +{awards.length - 1} awards
                  </div>
                </>
              )}
            </div>
          </>
        )}
        {/* Title and description */}
        <div>
          <h3 className="text-[24px] font-bold leading-tight m-0">{hackathonName || name}</h3>
          <p className="text-base text-black/70 mt-1">{description}</p>
        </div>
        {/* CTA Button */}
        <Button variant="tactile-black" size="default" asChild className="w-fit">
          <Link href={href} className="inline-flex items-center gap-2">
            <IconPointerFilled className="w-6 h-6 fill-current" />
            Click to View More
          </Link>
        </Button>
      </div>
      {/* Image */}
      <div className="relative w-full lg:flex-1 h-[300px] sm:h-[350px] lg:h-auto z-0 p-3">
        <div className="relative h-full w-full rounded-2xl overflow-hidden">
          {displayDate && (
            <span className="absolute bottom-3 right-2 z-10 text-xs font-medium text-white bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-full">
              {displayDate}
            </span>
          )}
          <Image
            src={imageUrl}
            alt={`${name} image`}
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default HackathonBentoCard;
