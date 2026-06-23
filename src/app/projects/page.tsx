import { Inter } from "next/font/google";
import { ProjectCard } from "@/components/FeaturedWork/ProjectCard"
import { SparkleIcon } from "@/components/icons/SparkleIcon"
import { getProjectsData } from "@/lib/projects";
import type { Project } from "@/components/FeaturedWork/types"
import { HackathonBentoGroup } from "@/components/HackathonBento"

const inter = Inter({ subsets: ["latin"] });

// Utility to chunk array into groups of n
function chunkArray<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

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
          {regularProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
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
                10x hackathon winner, consecutively.
              </h2>
            </div>

            <div className="mt-12 sm:mt-16 flex flex-col gap-12">
              {chunkArray(hackathonProjects, 3).map((group, index) => (
                <HackathonBentoGroup
                  key={index}
                  hackathons={group}
                  layout={index % 2 === 0 ? 'largeLeft' : 'largeRight'}
                />
              ))}
            </div>
          </div>
        )}

        {/* More Projects Coming Soon */}
        <div className="mt-10 sm:mt-12 text-center">
          <p className="text-base sm:text-lg text-gray-500 font-medium">
            More projects will be added soon...
          </p>
        </div>
      </div>
    </div>
  )
}
