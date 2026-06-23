import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { Project } from '@/components/FeaturedWork/types';
import { getIcon } from '@/lib/getIcon';

const projectsDirectory = path.join(process.cwd(), 'projects');

function compareProjects(a: Project, b: Project) {
  // Sort by priority first (lower = higher rank), then by date (newest first)
  const priorityA = a.priority ?? Infinity;
  const priorityB = b.priority ?? Infinity;

  if (priorityA !== priorityB) {
    return priorityA - priorityB;
  }

  const dateA = a.date ? new Date(a.date).getTime() : 0;
  const dateB = b.date ? new Date(b.date).getTime() : 0;
  return dateB - dateA;
}

export function getProjectsData(): Project[] {
  const fileNames = fs.readdirSync(projectsDirectory);
  const allProjectsData = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, '');
    const fullPath = path.join(projectsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const matterResult = matter(fileContents);

    const project: Project = {
      id,
      name: matterResult.data.title,
      description: matterResult.data.description,
      tags: matterResult.data.tags.map((tag: string) => ({ name: tag, icon: getIcon(tag) })),
      images: matterResult.data.images,
      href: `/projects/${id}`,
      layout: matterResult.data.layout,
      brandIcon: matterResult.data.brandIcon,
      category: matterResult.data.category || "project",
      date: matterResult.data.date || null,
      // Hackathon-specific fields
      awards: matterResult.data.awards || undefined,
      hackathonName: matterResult.data.hackathonName || undefined,
      displayDate: matterResult.data.displayDate || undefined,
      priority: matterResult.data.priority ?? undefined,
    };
    return project;
  });

  allProjectsData.sort(compareProjects);

  return allProjectsData;
}
