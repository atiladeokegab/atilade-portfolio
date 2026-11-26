import Image from "next/image"
import Link from "next/link"
import type { Project } from "./types"
import Reveal from "@/components/Reveal"
import DemoMedia from "@/components/DemoMedia"

// The section heading with its "All …" link on the right; shared with the hackathons section.
export function SectionHeading({ title, href, linkLabel }: { title: string; href: string; linkLabel: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <h2 className="text-2xl sm:text-[28px] font-semibold tracking-[-0.02em] text-ink">{title}</h2>
      <Link href={href} className="shrink-0 text-sm font-medium text-link hover:underline">
        {linkLabel} <span aria-hidden>→</span>
      </Link>
    </div>
  )
}

function WorkCard({ project }: { project: Project }) {
  const tagline = project.description.split(/(?<=\.)\s/)[0]
  return (
    <Link
      href={project.href}
      className="group relative block aspect-[4/3] overflow-hidden rounded-[20px] bg-surface ring-1 ring-black/[0.08]"
    >
      <DemoMedia
        src={project.images[0]}
        alt={project.name}
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
      />
      <div className="card-scrim backdrop-blur-md" />
      <div className="absolute inset-x-0 bottom-0 z-[2] flex items-center gap-3 p-4 sm:p-5">
        <div className="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-[10px] bg-white text-sm font-semibold text-ink">
          {project.brandIcon ? (
            <Image src={project.brandIcon} alt="" width={36} height={36} className="size-full object-contain" />
          ) : (
            project.name.charAt(0)
          )}
        </div>
        <div className="min-w-0">
          <h3 className="text-lg font-semibold tracking-tight text-white">{project.name}</h3>
          <p className="line-clamp-1 text-sm text-white/80">{tagline}</p>
        </div>
      </div>
    </Link>
  )
}

export default function FeaturedWork({ projects }: { projects: Project[] }) {
  return (
    <section className="bg-white pt-24 sm:pt-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Selected work" href="/projects" linkLabel="All projects" />
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          {projects.map((project, index) => (
            <Reveal key={project.id} delay={(index % 2) * 0.08}>
              <WorkCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
