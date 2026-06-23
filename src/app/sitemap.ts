import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://noahpham.me';

export default function sitemap(): MetadataRoute.Sitemap {
  const projectsDirectory = path.join(process.cwd(), 'projects');
  const projectFiles = fs.readdirSync(projectsDirectory);

  const projectUrls = projectFiles
    .filter(file => file.endsWith('.md'))
    .map(file => ({
      url: `${BASE_URL}/projects/${file.replace('.md', '')}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/resume`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...projectUrls,
  ];
}
