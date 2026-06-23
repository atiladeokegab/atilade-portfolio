"use client";

import React from 'react'
import dynamic from 'next/dynamic';
import AboutSection from "@/components/AboutSection";
import ClickSpark from '@/components/ui/ClickSpark';
import CircularText from '@/components/ui/CircularText/CircularText';

// Lazy load the heavy 3D Lanyard component to prevent lag on initial page load
const Lanyard = dynamic(() => import("@/components/Lanyard"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-16 h-16 border-4 border-gray-200 border-t-gray-400 rounded-full animate-spin" />
        <span className="text-sm text-gray-400">Loading 3D scene...</span>
      </div>
    </div>
  ),
});

const About = () => {
  return (
    <>
      <ClickSpark
              sparkColor='#0092FF'
              sparkSize={15}
              sparkRadius={40}
              sparkCount={10}
              duration={400}
            >
        
        <div className="min-h-screen bg-white py-2">
          <div className="container mx-auto max-w-6xl px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Lanyard Component Section */}
              <div className="relative h-[600px] lg:h-[800px]">
                <Lanyard position={[0, 0, 10]} gravity={[0, -40, 0]} />
                {/* Circular Text Component in top right corner */}
                <div className="absolute top-5 left-0 z-10">
                  <CircularText 
                    text="PLAY*WITH*THE*LANYARD*" 
                    onHover="speedUp" 
                    spinDuration={20} 
                    className="" 
                  />
                </div>
              </div>  
              {/* Content Section */}
              <div className="mb-16">
                <div className="space-y-6">
                  <h2 className="mb-12 text-sm font-medium uppercase tracking-wider text-gray-400">
                    Introduction
                  </h2>
                  <h1 className="mb-6 text-3xl font-semibold tracking-tight text-gray-900 md:text-4xl lg:text-4xl">
                    <span className="text-gray-300">I&apos;m a</span>
                    <span className="text-gray-300"> CompSci</span>
                    <span className="text-gray-900"> Student,</span>
                    <span className="text-gray-900"> Founder,</span>
                    <span className="text-gray-300"> and</span>
                    <span className="text-gray-900"> Developer</span>
                    <br />
                    <span className="text-gray-300"> based in</span>
                    <span className="text-gray-900"> Manchester.</span>
                  </h1>
                </div>

                <div className="space-y-6 text-lg text-gray-500">
                  <p>
                    I build products that solve real problems for real people. Whether it&apos;s an english speaking platform or a voice-powered coding assistant, I focus on creating tools that make complex tasks accessible and enjoyable.
                  </p>
                  <p>
                    My work centers on understanding how people interact with technology. I believe the best products feel intuitive, remove friction, and genuinely improve someone&apos;s productivity.
                  </p>
                  <p>
                    Currently studying at Manchester while building the next generation of intelligent applications. Always excited to collaborate on projects that push boundaries.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* About Section */}
        <AboutSection />
      </ClickSpark>
    </>
  )
}
export default About