import { Inter } from "next/font/google";
import { ProjectCard } from "@/components/FeaturedWork/ProjectCard"
import { SparkleIcon } from "@/components/icons/SparkleIcon"
import { getProjectsData } from "@/lib/projects";
import { isWin, type Project } from "@/components/FeaturedWork/types"
import HackathonIndex from "@/components/HackathonIndex"
import Reveal from "@/components/Reveal"

const inter = Inter({ subsets: ["latin"] });

export default function ProjectsPage() {
  const allProjects = getProjectsData();
  
  // Separate projects by category
  const regularProjects = allProjects.filter((project: Project) => project.category === "project" || !project.category);
  const hackathonProjects = allProjects.filter((project: Project) => project.category === "hackathon");
  
  return (
    <div className={`${inter.className} bg-white py-6 sm:py-8 md:py-10`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Regular Projects Section */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-sm font-medium border border-neutral-300 bg-white px-3 py-1.5 rounded-full mb-4">
            <SparkleIcon className="size-4 sm:size-5"/>
            <span>End-to-end builds from concept to production</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-5xl font-semibold tracking-tight text-neutral-900">
            Featured Work
          </h2>
        </div>

        <div className="mt-12 sm:mt-16 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          {regularProjects.map((project, index) => (
            <Reveal key={project.id} delay={(index % 2) * 0.08} className="h-full">
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>


        {/* Hackathon Projects Section */}
        {hackathonProjects.length > 0 && (
          <div className="mt-24 sm:mt-32">
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 text-sm font-medium border border-neutral-300 bg-white px-3 py-1.5 rounded-full mb-4">
                <SparkleIcon className="size-4 sm:size-5"/>
                <span>48 hours to ideate, build, and ship</span>
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-5xl font-semibold tracking-tight text-neutral-900 mb-4">
                12× hackathon winner.
              </h2>
            </div>

            <Reveal className="mt-12 sm:mt-16 max-w-5xl mx-auto">
              <HackathonIndex hackathons={hackathonProjects.filter(isWin)} />
            </Reveal>

            <Reveal className="mt-20 max-w-5xl mx-auto">
              <h3 className="text-2xl font-semibold tracking-tight text-neutral-900">More builds</h3>
              <p className="mt-1 mb-6 text-neutral-500">Hackathons, hacker houses and tracks, each shipped in a day or a weekend.</p>
              <HackathonIndex hackathons={hackathonProjects.filter((p) => !isWin(p))} />
            </Reveal>
          </div>
        )}

      </div>
    </div>
  )
}
