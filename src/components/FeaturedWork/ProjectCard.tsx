"use client"

import Image from "next/image"
import Link from "next/link"
import type React from "react"
import { useState } from "react"
import { ArrowUpRight } from "lucide-react"
import { useWebHaptics } from "web-haptics/react"
import type { Project } from "./types"
import type { JSX } from "react/jsx-runtime" 

interface ProjectCardProps {
  project: Project
}

const Tag: React.FC<{ name: string; icon?: JSX.Element }> = ({ name, icon }) => (
  <div className="flex items-center gap-1.5 whitespace-nowrap rounded-lg bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700">
    {icon}
    <span>{name}</span>
  </div>
)

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const haptic = useWebHaptics()
  const [activeIndex, setActiveIndex] = useState(0)
  const [imageLoaded, setImageLoaded] = useState<boolean[]>(project.images.map(() => false))

  const cycleImages = (direction: 'next' | 'prev' = 'next') => {
    if (project.images.length <= 1) return
    setActiveIndex((current) => {
      if (direction === 'next') {
        return (current + 1) % project.images.length
      } else {
        return current === 0 ? project.images.length - 1 : current - 1
      }
    })
  }

  const handleImageLoad = (index: number) => {
    setImageLoaded((prev) => {
      const newState = [...prev]
      newState[index] = true
      return newState
    })
  }

  const content = (
    <div className="flex flex-1 flex-col justify-center gap-6 p-6 lg:p-8">
      <div className="flex items-center gap-3">
        {project.brandIcon && (
          <Image 
            src={project.brandIcon} 
            alt={`${project.name} logo`}
            width={80} 
            height={80} 
            className="w-10 h-10 sm:w-12 sm:h-12 shadow-sm rounded-lg object-contain"
          />
        )}
        <h2 className="text-2xl lg:text-3xl font-semibold tracking-tight text-gray-900">{project.name}</h2>
      </div>
      
      <h3 className="max-w-md font-medium tracking-tight leading-relaxed text-gray-500">{project.description}</h3>
    </div>
  )

  const imageGallery = (
    <div className="relative flex-1 bg-gray-100 rounded-2xl overflow-hidden aspect-[4/3]">
      {project.images.map((src, index) => (
        <div 
          key={src} 
          className="absolute inset-0 h-full w-full transition-opacity duration-300" 
          style={{
            opacity: index === activeIndex ? 1 : 0,
            zIndex: 1
          }}
        >
          <div className={`absolute inset-0 bg-gray-200 animate-pulse ${imageLoaded[index] ? "hidden" : "block"}`} />
          <Image
            src={src || "/placeholder.svg"}
            alt={`${project.name} screenshot ${index + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority={index === 0}
            onLoad={() => handleImageLoad(index)}
          />
        </div>
      ))}

      {/* Clickable indicator */}
      <div className="absolute top-4 right-4 z-10">
        <div className="p-2 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-colors">
          <ArrowUpRight className="h-5 w-5" />
        </div>
      </div>

      {/* Tech tags overlay - disabled for now */}
      {/* <div className="absolute bottom-0 left-0 right-0 z-10 p-4 pt-10 bg-gradient-to-t from-black/60 to-transparent">
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <Tag key={tag.name} name={tag.name} icon={tag.icon} />
          ))}
        </div>
      </div> */}

      {/* Controls */}
      {project.images.length > 1 && (
        <div className="absolute bottom-4 right-4 flex items-center gap-2 z-10">
          <button
            onClick={(e) => {
              e.preventDefault()
              haptic.trigger('selection')
              cycleImages('prev')
            }}
            className="p-2 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-colors"
            aria-label="Previous image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>

          <button
            onClick={(e) => {
              e.preventDefault()
              haptic.trigger('selection')
              cycleImages('next')
            }}
            className="p-2 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-colors"
            aria-label="Next image"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      )}
    </div>
  )

  return (
    <div className="group rounded-2xl border border-gray-100 bg-[#FAFAFA] shadow-sm transition-all duration-300 hover:shadow-lg hover:border-gray-100 p-3">
      <Link href={project.href} className="flex flex-col h-full">
        <div>{imageGallery}</div>
        <div>{content}</div>
      </Link>
    </div>
  )
}
