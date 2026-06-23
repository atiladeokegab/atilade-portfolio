import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, Clock, ExternalLink, Github } from 'lucide-react';
import { TableOfContents } from '@/components/TableOfContents';
import { BlogCard } from '@/components/BlogCard';
import { getIcon } from '@/lib/getIcon';
import { customSyntaxTheme } from '@/lib/syntax-theme';

const projectsDirectory = path.join(process.cwd(), 'projects');

export async function generateStaticParams() {
  const fileNames = fs.readdirSync(projectsDirectory);
  return fileNames.map((fileName) => ({
    id: fileName.replace(/\.md$/,''),
  }));
}

async function getProjectData(id: string) {
  try {
    const fullPath = path.join(projectsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    // Add reading time calculation
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const readingTime = Math.ceil(words / wordsPerMinute);
    
    return {
      id,
      data: {
        title: data.title,
        description: data.description,
        tags: data.tags,
        images: data.images,
        brandIcon: data.brandIcon,
        category: data.category,
        date: data.date,
        liveUrl: data.liveUrl,
        githubUrl: data.githubUrl,
        readingTime: `${readingTime} min read`
      },
      content,
    };
  } catch {
    return null;
  }
}

async function getAllProjects() {
  const fileNames = fs.readdirSync(projectsDirectory);
  const projects = await Promise.all(
    fileNames.map(async (fileName) => {
      const id = fileName.replace(/\.md$/, '');
      return await getProjectData(id);
    })
  );
  return projects.filter(Boolean);
}

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}): Promise<Metadata> {
  const { id } = await params;
  const project = await getProjectData(id);
  
  return project ? {
    title: `${project.data.title} | Atilade Oke`,
    description: project.data.description,
    openGraph: {
      title: project.data.title, 
      description: project.data.description,
      images: project.data.images || [],
    },
  } : {
    title: 'Project Not Found | Atilade Oke',
    description: 'The requested project could not be found',
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [projectData, allProjects] = await Promise.all([
    getProjectData(id),
    getAllProjects()
  ]);

  if (!projectData) {
    notFound();
  }

  // Get related projects (same category, different project)
  const relatedProjects = allProjects
    .filter(p => p && p.data.category === projectData.data.category && p.id !== projectData.id)
    .slice(0, 3)
    .map(p => ({
      id: p!.id,
      title: p!.data.title || '',
      description: p!.data.description || '',
      tags: p!.data.tags || [],
      images: p!.data.images || [],
      brandIcon: p!.data.brandIcon,
      category: p!.data.category,
      readingTime: p!.data.readingTime,
      date: p!.data.date
    }));

  const displayDate = projectData.data.date 
    ? new Date(projectData.data.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : null;

  return (
    <div className="min-h-screen">
      <div className="container max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-8">
        {/* Back button */}
        <Button asChild variant="ghost" className="mb-6 md:mb-8 hover:bg-white">
          <Link href="/projects" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Projects</span>
            <span className="sm:hidden">Back</span>
          </Link>
        </Button>

        <article className="grid lg:grid-cols-[1fr_300px] gap-8 lg:gap-12">
          <main className="max-w-4xl min-w-0">
            {/* Header */}
            <header className="mb-6 md:mb-8">
              {/* Title */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-3 md:mb-4">
                {projectData.data.brandIcon && (
                  <Image 
                    src={projectData.data.brandIcon} 
                    alt={`${projectData.data.title} logo`}
                    width={48} 
                    height={48} 
                    className="w-10 h-10 sm:w-12 sm:h-12 object-contain rounded-lg shadow-sm"
                  />
                )}
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  {projectData.data.title}
                </h1>
              </div>

              {/* Description */}
              {projectData.data.description && (
                <p className="text-lg sm:text-xl text-gray-600 mb-4 md:mb-6 leading-relaxed max-w-3xl">
                  {projectData.data.description}
                </p>
              )}

              {/* Meta info */}
              <div className="flex flex-wrap items-center gap-4 md:gap-6 text-gray-500 text-sm mb-4 md:mb-6">
                {displayDate && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span className="text-xs sm:text-sm">{displayDate}</span>
                  </div>
                )}
                {projectData.data.readingTime && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span className="text-xs sm:text-sm">{projectData.data.readingTime}</span>
                  </div>
                )}
              </div>

              {/* Tags */}
              {projectData.data.tags && projectData.data.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6 md:mb-8">
                  {projectData.data.tags.map((tag: string) => {
                    const icon = getIcon(tag);
                    return (
                      <div 
                        key={tag}
                        className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-lg px-2.5 py-1.5 sm:px-3 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 shadow-sm"
                      >
                        {icon}
                        <span>{tag}</span>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Action buttons */}
              {(projectData.data.liveUrl || projectData.data.githubUrl) && (
                <div className="flex flex-col sm:flex-row gap-3 mb-6 md:mb-8">
                  {projectData.data.liveUrl && (
                    <Button asChild variant="tactile-black" className="justify-center sm:justify-start">
                      <a href={projectData.data.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                        <ExternalLink className="w-4 h-4" />
                        View Live
                      </a>
                    </Button>
                  )}
                  {projectData.data.githubUrl && (
                    <Button asChild variant="tactile-secondary" className="justify-center sm:justify-start">
                      <a href={projectData.data.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                        <Github className="w-4 h-4" />
                        View Code
                      </a>
                    </Button>
                  )}
                </div>
              )}
            </header>

            {/* Hero image */}
            {projectData.data.images && projectData.data.images[0] && (
              <div className="relative aspect-[4/3] rounded-lg sm:rounded-xl overflow-hidden mb-8 md:mb-12 bg-gray-100">
                <Image
                  src={projectData.data.images[0]}
                  alt={projectData.data.title || 'Project image'}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 80vw"
                />
              </div>
            )}

            {/* Content */}
            <div className="prose prose-sm sm:prose prose-lg max-w-none mb-8 md:mb-12 bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 shadow-sm border border-gray-200">
              <ReactMarkdown
                components={{
                  h1: ({ children }) => <h1 id={String(children).toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')} className="text-2xl sm:text-3xl font-bold mt-8 sm:mt-12 mb-4 sm:mb-6 first:mt-0 text-gray-900 scroll-mt-24">{children}</h1>,
                  h2: ({ children }) => <h2 id={String(children).toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')} className="text-xl sm:text-2xl font-bold mt-8 sm:mt-12 mb-4 sm:mb-6 text-gray-900 scroll-mt-24">{children}</h2>,
                  h3: ({ children }) => <h3 id={String(children).toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')} className="text-lg sm:text-xl font-semibold mt-6 sm:mt-8 mb-3 sm:mb-4 text-gray-900 scroll-mt-24">{children}</h3>,
                  h4: ({ children }) => <h4 className="text-base sm:text-lg font-semibold mt-4 sm:mt-6 mb-2 sm:mb-3 text-gray-900">{children}</h4>,
                  p: ({ children }) => <p className="mb-4 sm:mb-6 leading-relaxed text-gray-700 text-sm sm:text-base">{children}</p>,
                  ul: ({ children }) => <ul className="list-disc pl-4 sm:pl-6 mb-4 sm:mb-6 space-y-1 sm:space-y-2">{children}</ul>,
                  ol: ({ children }) => <ol className="list-decimal pl-4 sm:pl-6 mb-4 sm:mb-6 space-y-1 sm:space-y-2">{children}</ol>,
                  li: ({ children }) => <li className="leading-relaxed text-gray-700 text-sm sm:text-base">{children}</li>,
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-blue-500 pl-4 sm:pl-6 py-2 bg-blue-50 rounded-r-lg my-4 sm:my-6 italic text-gray-700 text-sm sm:text-base">{children}</blockquote>
                  ),
                  code: ({ className, children, ...props }) => {
                    const match = /language-(\w+)/.exec(className || '');
                    const language = match ? match[1] : '';
                    const isInline = !className || !language;
                    
                    return !isInline ? (
                      <div className="relative group">
                        <SyntaxHighlighter
                          style={customSyntaxTheme}
                          language={language}
                          PreTag="div"
                          customStyle={{
                            background: '#1a1a1a',
                            borderRadius: '12px',
                            border: '1px solid #333',
                            fontSize: '14px',
                            lineHeight: '1.6',
                            margin: '1.5rem 0',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                          }}
                          codeTagProps={{
                            style: {
                              fontFamily: 'Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace',
                            }
                          }}
                        >
                          {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                        {language && (
                          <div className="absolute top-3 right-3 bg-gray-800 text-gray-300 px-2 py-1 rounded text-xs font-mono border border-gray-600">
                            {language}
                          </div>
                        )}
                      </div>
                    ) : (
                      <code 
                        className="bg-blue-50 text-blue-800 rounded px-2 py-1 text-sm font-mono border border-blue-200" 
                        {...props}
                      >
                        {children}
                      </code>
                    );
                  },
                  pre: ({ children }) => (
                    <div className="not-prose">
                      {children}
                    </div>
                  ),
                  a: ({ href, children }) => (
                    <a href={href} className="text-blue-600 hover:text-blue-800 transition-colors underline decoration-blue-200 hover:decoration-blue-400 break-words">
                      {children}
                    </a>
                  ),
                  img: ({ src, alt }) => (
                    <div className="my-6 sm:my-8">
                      <img src={src} alt={alt} className="rounded-lg shadow-md w-full border border-gray-200" />
                    </div>
                  ),
                  hr: () => <hr className="my-8 sm:my-12 border-gray-200" />,
                  strong: ({ children }) => <strong className="font-semibold text-gray-900">{children}</strong>,
                  em: ({ children }) => <em className="italic text-gray-700">{children}</em>,
                }}
              >
                {projectData.content}
              </ReactMarkdown>
            </div>

            {/* Related projects */}
            {relatedProjects.length > 0 && (
              <section className="pt-6 sm:pt-8 border-t border-gray-200">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8">Related Projects</h2>
                <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  {relatedProjects.map(project => (
                    <BlogCard key={project.id} post={project} compact />
                  ))}
                </div>
              </section>
            )}
          </main>

          {/* Sidebar - Hidden on mobile */}
          <aside className="hidden lg:block">
            <TableOfContents content={projectData.content} />
          </aside>
        </article>
      </div>
    </div>
  );
}
