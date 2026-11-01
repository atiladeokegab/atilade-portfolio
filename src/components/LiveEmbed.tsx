"use client"

import Image from "next/image"
import { useState } from "react"
import { IconCube3dSphere } from "@tabler/icons-react"

// The poster stays behind the frame while the live app loads. Click-to-load keeps the page light,
// and never shows a blocked frame before the app allows this site as an embedder.
export default function LiveEmbed({ src, poster, title }: { src: string; poster: string; title: string }) {
  const [live, setLive] = useState(false)

  return (
    <>
      <Image src={poster} alt={`${title} poster`} fill priority sizes="(max-width: 768px) 100vw, 80vw" className="object-cover" />
      {live ? (
        <iframe
          src={src}
          title={`${title}: the live 3D bridge`}
          loading="lazy"
          allow="fullscreen; xr-spatial-tracking"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      ) : (
        <button type="button" onClick={() => setLive(true)} className="group absolute inset-0 h-full w-full cursor-pointer">
          <span className="absolute inset-0 bg-black/25 transition-colors duration-300 group-hover:bg-black/35" />
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-white px-5 py-3 text-sm sm:text-base font-semibold text-gray-900 shadow-lg transition-transform duration-300 group-hover:scale-105">
            <IconCube3dSphere className="h-5 w-5" />
            Load the live 3D bridge
          </span>
        </button>
      )}
    </>
  )
}
