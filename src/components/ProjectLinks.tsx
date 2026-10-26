import { IconBrandGithub, IconBrandLinkedin, IconExternalLink } from "@tabler/icons-react"
import type { Project } from "@/components/FeaturedWork/types"

// GitHub / live / LinkedIn pills. Rendered outside any card <Link>, so no nested anchors.
export default function ProjectLinks({ project, className = "" }: { project: Pick<Project, "githubUrl" | "liveUrl" | "postUrl">; className?: string }) {
  const links = [
    project.githubUrl && { href: project.githubUrl, label: "GitHub", Icon: IconBrandGithub },
    project.liveUrl && { href: project.liveUrl, label: "Live", Icon: IconExternalLink },
    project.postUrl && { href: project.postUrl, label: "Post", Icon: IconBrandLinkedin },
  ].filter(Boolean) as { href: string; label: string; Icon: typeof IconBrandGithub }[]
  if (links.length === 0) return null
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {links.map(({ href, label, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 transition-all duration-200 hover:-translate-y-0.5 hover:border-gray-300 hover:shadow-sm active:scale-[0.97]"
        >
          <Icon className="h-3.5 w-3.5" />
          {label}
        </a>
      ))}
    </div>
  )
}
