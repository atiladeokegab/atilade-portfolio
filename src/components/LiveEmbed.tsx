"use client"

import Image from "next/image"
import { useState } from "react"
import { IconCube3dSphere } from "@tabler/icons-react"

// A poster until the visitor asks for the live app, so the page never pays for a WebGL scene up front.
export default function LiveEmbed({ src, poster, title }: { src: string; poster: string; title: string }) {
  const [live, setLive] = useState(false)

  if (live) {
    return (
      <iframe
        src={src}
        title={`${title}, live`}
        allow="fullscreen; xr-spatial-tracking"
        allowFullScreen
        className="absolute inset-0 h-full w-full border-0"
      />
    )
  }

  return (
    <button type="button" onClick={() => setLive(true)} className="group absolute inset-0 h-full w-full cursor-pointer">
      <Image src={poster} alt={`${title} poster`} fill priority sizes="(max-width: 768px) 100vw, 80vw" className="object-cover" />
      <span className="absolute inset-0 bg-black/25 transition-colors duration-300 group-hover:bg-black/35" />
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm sm:text-base font-semibold text-gray-900 shadow-lg transition-transform duration-300 group-hover:scale-105">
        <IconCube3dSphere className="h-5 w-5" />
        Explore it in 3D
      </span>
    </button>
  )
}
