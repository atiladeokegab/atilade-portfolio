import fs from "fs";
import path from "path";
import matter from "gray-matter";

import { estimateMarkdownTokens } from "@/lib/markdown-negotiation";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://noahpham.me";
const PROJECTS_DIRECTORY = path.join(process.cwd(), "projects");

type ProjectRecord = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  images: string[];
  brandIcon?: string;
  category: "project" | "hackathon";
  priority: number;
  date?: string | null;
  liveUrl?: string;
  githubUrl?: string;
  hackathonName?: string;
  awards?: Array<{ label: string; variant: string }>;
  content: string;
};

const aboutExperiences = [
  {
    role: "Software Developer",
    company: "Ping Proxies",
    type: "Internship",
    duration: "Oct 2025 - Present",
    description:
      "Building scalable infrastructure for data-driven companies and AI-focused startups to access publicly available web data at scale.",
    link: "https://pingproxies.com",
  },
  {
    role: "Digital Design Web Developer",
    company: "University of Manchester Students' Union",
    type: "Part-time",
    duration: "Aug 2025 - Present",
    description:
      "Designing and developing web experiences for the Students' Union, serving over 100,000 students.",
    link: "https://manchesterstudentsunion.com",
  },
  {
    role: "Founder",
    company: "SpeakWisely",
    type: "Startup",
    duration: "Oct 2024 - Present",
    description:
      "Building an AI-powered platform to help 300+ students excel at IELTS Speaking.",
    link: "https://speakwisely.vercel.app",
  },
];

const aboutSkills: Record<string, string[]> = {
  Languages: ["Python", "TypeScript", "JavaScript", "Java", "C++", "SQL", "HTML/CSS", "C"],
  "Frameworks & Libraries": [
    "Next.js",
    "React.js",
    "Node.js",
    "Tailwind CSS",
    "Framer Motion",
    "Qt",
    "PartyKit",
  ],
  "Developer Tools & Platforms": [
    "Docker",
    "Git",
    "GitHub",
    "GitLab",
    "Vercel",
    "Linux",
    "Windows",
    "LaTeX",
    "AWS",
    "Google Analytics",
    "Mapbox",
    "Clerk",
  ],
  "Database & BaaS": ["PostgreSQL", "Supabase", "MongoDB", "MySQL", "SQLite", "Firebase"],
};

function compareProjects(a: ProjectRecord, b: ProjectRecord) {
  if (a.priority !== b.priority) {
    return a.priority - b.priority;
  }

  const dateA = a.date ? new Date(a.date).getTime() : 0;
  const dateB = b.date ? new Date(b.date).getTime() : 0;
  return dateB - dateA;
}

function readProject(id: string): ProjectRecord | null {
  try {
    const fullPath = path.join(PROJECTS_DIRECTORY, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      id,
      title: data.title,
      description: data.description,
      tags: data.tags || [],
      images: data.images || [],
      brandIcon: data.brandIcon || undefined,
      category: data.category || "project",
      priority: data.priority ?? Number.POSITIVE_INFINITY,
      date: data.date || null,
      liveUrl: data.liveUrl || undefined,
      githubUrl: data.githubUrl || undefined,
      hackathonName: data.hackathonName || undefined,
      awards: data.awards || undefined,
      content: content.trim(),
    };
  } catch {
    return null;
  }
}

function listProjects(): ProjectRecord[] {
  const fileNames = fs.readdirSync(PROJECTS_DIRECTORY);
  const projects = fileNames
    .map((fileName) => readProject(fileName.replace(/\.md$/, "")))
    .filter((project): project is ProjectRecord => Boolean(project));

  return projects.sort(compareProjects);
}

function toAbsoluteUrl(href: string) {
  return new URL(href, BASE_URL).toString();
}

function formatProjectList(projects: ProjectRecord[]) {
  return projects
    .map((project) => {
      const lines = [
        `### [${project.title}](${toAbsoluteUrl(`/projects/${project.id}`)})`,
        project.description,
      ];

      if (project.tags.length > 0) {
        lines.push(`Tags: ${project.tags.join(", ")}`);
      }

      if (project.date) {
        lines.push(`Date: ${project.date}`);
      }

      if (project.hackathonName) {
        lines.push(`Hackathon: ${project.hackathonName}`);
      }

      if (project.awards && project.awards.length > 0) {
        lines.push(`Awards: ${project.awards.map((award) => award.label).join(", ")}`);
      }

      return lines.join("\n\n");
    })
    .join("\n\n");
}

function buildFrontmatter(title: string, pathname: string, description: string) {
  return [
    "---",
    `title: ${JSON.stringify(title)}`,
    `url: ${JSON.stringify(toAbsoluteUrl(pathname))}`,
    `description: ${JSON.stringify(description)}`,
    "---",
    "",
  ].join("\n");
}

function buildHomeMarkdown() {
  const projects = listProjects();
  const featuredProjects = projects.filter((project) => project.category === "project").slice(0, 4);
  const featuredHackathons = projects.filter((project) => project.category === "hackathon").slice(0, 4);

  return (
    buildFrontmatter(
      "Atilade Oke's Portfolio",
      "/",
      "Portfolio homepage for Atilade Oke (Nguyen Pham).",
    ) +
    [
      "# Atilade Oke",
      "",
      "Computer Science at the University of Manchester, Software Developer at Byteful, incoming at Cloudflare.",
      "",
      "## Quick Links",
      "",
      `- Website: ${toAbsoluteUrl("/")}`,
      `- About: ${toAbsoluteUrl("/about")}`,
      `- Projects: ${toAbsoluteUrl("/projects")}`,
      `- Resume: ${toAbsoluteUrl("/resume")}`,
      `- Agent docs: ${toAbsoluteUrl("/docs/agents")}`,
      `- llms.txt: ${toAbsoluteUrl("/llms.txt")}`,
      "",
      "## Current Focus",
      "",
      "- Building products that solve real problems for real people.",
      "- Exploring AI agents, voice interfaces, and developer tooling.",
      "- Competing in hackathons and shipping fast prototypes to production quality.",
      "",
      "## Featured Projects",
      "",
      formatProjectList(featuredProjects),
      "",
      "## Hackathon Highlights",
      "",
      formatProjectList(featuredHackathons),
    ].join("\n")
  );
}

function buildAboutMarkdown() {
  const experienceSection = aboutExperiences
    .map((experience) =>
      [
        `### ${experience.role} at ${experience.company}`,
        `Type: ${experience.type}`,
        `Duration: ${experience.duration}`,
        experience.description,
        `Link: ${experience.link}`,
      ].join("\n\n"),
    )
    .join("\n\n");

  const skillSection = Object.entries(aboutSkills)
    .map(([group, values]) => `### ${group}\n\n- ${values.join("\n- ")}`)
    .join("\n\n");

  return (
    buildFrontmatter("About | Atilade Oke", "/about", "Background and experience for Atilade Oke.") +
    [
      "# About Atilade Oke",
      "",
      "I am a Computer Science student, founder, and developer based in Manchester. I build products that solve real problems for real people, with a focus on intuitive experiences, AI-powered workflows, and accessible tooling.",
      "",
      "## Education",
      "",
      "### University of Manchester",
      "",
      "BSc. (Hons) Computer Science — Manchester, United Kingdom",
      "",
      "Sep 2023 - August 2027",
      "",
      "Coursework: Data Science, Operating Systems, Computer Engineering & Architecture, Discrete Mathematics.",
      "",
      "Activities: Student Representative, Google Developer Student Club, Hyperloop Manchester, Manchester Robotics Society, Hackchester - Cyber Security, Manchester Trading Society, MUDSS.",
      "",
      "## Experience",
      "",
      experienceSection,
      "",
      "## Skills",
      "",
      skillSection,
    ].join("\n")
  );
}

function buildProjectsMarkdown() {
  const projects = listProjects();
  const regularProjects = projects.filter((project) => project.category === "project");
  const hackathonProjects = projects.filter((project) => project.category === "hackathon");

  return (
    buildFrontmatter("Projects | Atilade Oke", "/projects", "Project index for Atilade Oke's portfolio.") +
    [
      "# Projects",
      "",
      "A curated index of portfolio projects and hackathon builds.",
      "",
      "## Featured Work",
      "",
      formatProjectList(regularProjects),
      "",
      "## Hackathons",
      "",
      formatProjectList(hackathonProjects),
    ].join("\n")
  );
}

function buildResumeMarkdown() {
  const resumePath = "/Tran_Khoi_Nguyen_Pham_s_Resume_Summer_Feb_2026.pdf";

  return (
    buildFrontmatter("Resume | Atilade Oke", "/resume", "Latest resume and download link for Atilade Oke.") +
    [
      "# Resume",
      "",
      "Latest resume for Atilade Oke (Nguyen Pham).",
      "",
      `- PDF: ${toAbsoluteUrl(resumePath)}`,
      "- Last updated: Feb 2026",
      "- Role summary: Computer Science Student & Developer",
      "",
      "## Notes",
      "",
      "The HTML page provides an embedded PDF viewer and download actions. Agents can fetch the PDF directly from the URL above if they need the canonical document.",
    ].join("\n")
  );
}

function buildAgentDocsMarkdown() {
  return (
    buildFrontmatter("Agent Discovery | Atilade Oke", "/docs/agents", "Agent discovery documentation for the site.") +
    [
      "# Agent Discovery",
      "",
      "This portfolio does not currently publish a public programmatic API. The homepage advertises this page as service documentation and points agents to machine-readable resources that describe the site structure and author context.",
      "",
      "## Machine-readable resources",
      "",
      `- llms.txt: ${toAbsoluteUrl("/llms.txt")}`,
      `- robots.txt: ${toAbsoluteUrl("/robots.txt")}`,
      `- sitemap.xml: ${toAbsoluteUrl("/sitemap.xml")}`,
      "",
      "## High-value pages",
      "",
      `- Projects: ${toAbsoluteUrl("/projects")}`,
      `- About: ${toAbsoluteUrl("/about")}`,
      `- Resume: ${toAbsoluteUrl("/resume")}`,
    ].join("\n")
  );
}

function buildProjectMarkdown(id: string) {
  const project = readProject(id);

  if (!project) {
    return null;
  }

  const metaLines = [
    project.date ? `- Date: ${project.date}` : null,
    project.tags.length > 0 ? `- Tags: ${project.tags.join(", ")}` : null,
    project.liveUrl ? `- Live: ${project.liveUrl}` : null,
    project.githubUrl ? `- GitHub: ${project.githubUrl}` : null,
    project.hackathonName ? `- Hackathon: ${project.hackathonName}` : null,
    project.awards && project.awards.length > 0
      ? `- Awards: ${project.awards.map((award) => award.label).join(", ")}`
      : null,
  ].filter(Boolean);

  return (
    buildFrontmatter(project.title, `/projects/${project.id}`, project.description) +
    [
      `# ${project.title}`,
      "",
      project.description,
      "",
      "## Metadata",
      "",
      ...metaLines,
      "",
      "## Content",
      "",
      project.content,
    ].join("\n")
  );
}

export function getMarkdownDocument(pathname: string) {
  if (pathname === "/") {
    return buildHomeMarkdown();
  }

  if (pathname === "/about") {
    return buildAboutMarkdown();
  }

  if (pathname === "/projects") {
    return buildProjectsMarkdown();
  }

  if (pathname === "/resume") {
    return buildResumeMarkdown();
  }

  if (pathname === "/docs/agents") {
    return buildAgentDocsMarkdown();
  }

  if (pathname.startsWith("/projects/")) {
    const id = pathname.replace("/projects/", "");
    return buildProjectMarkdown(id);
  }

  return null;
}

export function createMarkdownResponse(markdown: string) {
  return new Response(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Vary": "Accept",
      "x-markdown-tokens": String(estimateMarkdownTokens(markdown)),
      "X-Robots-Tag": "noindex",
    },
  });
}
