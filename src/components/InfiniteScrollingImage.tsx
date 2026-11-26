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
    src: "/events/dish.jpg",
    alt: "DiSH Accelerator cohort 7, Manchester",
  },
  {
    src: "/events/bgn-google.jpeg",
    alt: "Atilade at Google, BGN Hackathon",
  },
  {
    src: "/events/ibm-z-conference.jpeg",
    alt: "With the IBM Z community at a conference",
  },
  {
    src: "/events/pop-the-bubble.jpeg",
    alt: "Pop The Bubble Hackathon",
  },
  {
    src: "/events/ibm-z-launch.jpg",
    alt: "IBM Z Society UoM launch",
  },
  {
    src: "/events/witness-world.jpg",
    alt: "Witness, winner at Worlds London",
  },
  {
    src: "/events/ibm-atilade-niall-thumbs.jpeg",
    alt: "With Niall Ashley after Mainframe Security",
  },
  {
    src: "/events/bgn-team.jpeg",
    alt: "BGN Hackathon team with Google prizes",
  },
];
