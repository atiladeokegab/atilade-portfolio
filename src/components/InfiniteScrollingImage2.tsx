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
    src: "/events/pop-the-bubble.jpeg",
    alt: "Pop The Bubble Hackathon",
  },
  {
    src: "/carousel/uav.png",
    alt: "UAV LoRaWAN DQN path planning",
  },
  {
    src: "/events/ibm-large-group.jpeg",
    alt: "IBM Z Society full group",
  },
  {
    src: "/events/google-ai-hack-team.jpeg",
    alt: "Google AI Hackathon team",
  },
  {
    src: "/events/thinking-ambassador.jpeg",
    alt: "Thinking About Thinking Ambassador",
  },
];
