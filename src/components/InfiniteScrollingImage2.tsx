"use client";

import React from "react";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

export function InfiniteMovingImages2() {
  return (
    <div className="h-[15rem] md:h-[20rem] rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden pt-0 md:pt-5 pb-2 md:pb-0">
      <InfiniteMovingCards
        items={images}
        direction="left"
        speed="fast"
      />
    </div>
  );
}

const images = [
  {
    src: "/events/ibm-large-group.jpeg",
    alt: "IBM Z Society members",
  },
  {
    src: "/events/google-ai-hack-team.jpeg",
    alt: "Google AI Hackathon team",
  },
  {
    src: "/events/london-group.jpeg",
    alt: "With the mainframe community in London",
  },
  {
    src: "/events/ibm-freshers-booth.jpeg",
    alt: "IBM Z Society stand at the Freshers Fair",
  },
  {
    src: "/events/thinking-ambassador.jpeg",
    alt: "Atilade Gabriel Oke",
  },
  {
    src: "/events/ibm-z-banner-group.jpeg",
    alt: "IBM Z Society UoM Chapter",
  },
  {
    src: "/events/sap.jpeg",
    alt: "SAP Belfast",
  },
  {
    src: "/events/ibm-mainframe-security-group.jpeg",
    alt: "IBM Z Society Mainframe Security event",
  },
];
