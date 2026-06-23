"use client";

import React, { useEffect, useState } from "react";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

export function InfiniteMovingImages() {
  const [speed, setSpeed] = useState<"fast" | "normal" | "slow">("normal");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSpeed("normal");
      } else {
        setSpeed("slow");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="h-[20rem] md:h-[20rem] rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden pt-2 md:pt-5 pb-2 md:pb-0">
      <InfiniteMovingCards
        items={images}
        direction="right"
        speed={speed}
      />
    </div>
  );
}

const images = [
  {
    src: "/events/bgn-google.jpeg",
    alt: "Atilade at Google HQ, BGN Hackathon",
  },
  {
    src: "/events/openai-house.jpeg",
    alt: "OpenAI Hacker House with Based Collective",
  },
  {
    src: "/carousel/uav.png",
    alt: "UAV LoRaWAN DQN path planning",
  },
  {
    src: "/events/ibm-presenting.jpeg",
    alt: "Running IBM Z Society talk",
  },
  {
    src: "/events/ibm-mainframe-security-group.jpeg",
    alt: "IBM Z Society Mainframe Security event",
  },
  {
    src: "/events/ibm-atilade-niall-thumbs.jpeg",
    alt: "With Niall Ashley after Mainframe Security",
  },
  {
    src: "/carousel/robot-photo.png",
    alt: "Autonomous line-following robot",
  },
  {
    src: "/events/bgn-team.jpeg",
    alt: "BGN Hackathon team with Google prizes",
  },
];
