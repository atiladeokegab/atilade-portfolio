import type { JSX } from "react"

export interface Award {
  label: string
  variant: "gold" | "silver" | "bronze" | "special"
}

export interface Project {
  id: string
  name: string
  description: string
  tags: {
    name: string
    icon?: JSX.Element
  }[]
  images: string[]
  href: string
  layout: "imageLeft" | "imageRight"
  brandIcon?: string
  category?: "project" | "hackathon"
  date?: string | null
  // Hackathon-specific fields
  awards?: Award[]
  hackathonName?: string
  displayDate?: string
  // Manual ordering (lower = higher priority)
  priority?: number
}
