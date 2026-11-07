"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"

export const isVideo = (src: string) => /\.(mp4|webm)$/i.test(src)

interface DemoMediaProps {
  src: string
  alt: string
  sizes?: string
  priority?: boolean
  className?: string
  controls?: boolean
  onLoad?: () => void
  fit?: "cover" | "contain"
}

// Images render through next/image. Clips loop muted, and only play while on screen;
// `controls` lets the viewer unmute or scrub.
// fit="contain" shows the whole picture whatever its shape, over a blurred copy that fills the frame.
export default function DemoMedia({ src, alt, sizes, priority, className = "object-cover", controls, onLoad, fit = "cover" }: DemoMediaProps) {
  const contain = fit === "contain"
  const cls = contain ? className.replace("object-cover", "object-contain") : className
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = ref.current
    if (!video) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const observer = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? video.play().catch(() => {}) : video.pause()),
      { threshold: 0.35 },
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  if (!isVideo(src)) {
    if (!contain) return <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={className} onLoad={onLoad} />
    return (
      <>
        <Image src={src} alt="" aria-hidden fill sizes={sizes} className="object-cover scale-110 blur-2xl opacity-70" />
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className={cls} onLoad={onLoad} />
      </>
    )
  }

  return (
    <video
      ref={ref}
      src={src}
      poster={src.replace(/\.(mp4|webm)$/i, ".jpg")}
      aria-label={alt}
      muted
      loop
      controls={controls}
      playsInline
      preload="metadata"
      onLoadedData={onLoad}
      className={`absolute inset-0 h-full w-full ${cls}`}
    />
  )
}
