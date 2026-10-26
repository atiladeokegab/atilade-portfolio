import fs from "fs";
import path from "path";
import matter from "gray-matter";

import { estimateMarkdownTokens } from "@/lib/markdown-negotiation";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://atilade.uk";
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
  { role: "Analyst, Data & AI", company: "ION", type: "Full-time", duration: "Sep 2026 - Present", description: "Technical product work on European high-yield bond coverage.", link: "https://iongroup.com" },
  { role: "Founder", company: "Refinery", type: "Startup", duration: "Sep 2025 - Present", description: "Proving AI changes to enterprise COBOL are safe to deploy. DiSH Accelerator at Number 10 North, IBM Z ScaleUp, Claude Founder House builder cohort.", link: "https://refinery.guru" },
  { role: "Software Engineer, DevOps", company: "SAP", type: "Industrial placement", duration: "Jul 2024 - Aug 2025", description: "Bare-metal monitoring for SAP Cloud and developer APIs, Belfast.", link: "https://sap.com" },
  { role: "Founder & President", company: "IBM Z Society, UoM", type: "Society", duration: "Jun 2025 - Mar 2026", description: "0 to 50 members in a year. #1 IBM Z Ambassador 2025-26.", link: "https://atilade.uk/projects/ibm-z-society" },
  { role: "Winter Fellow", company: "Palantir", type: "Fellowship", duration: "Dec 2024 - Aug 2025", description: "Palantir Winter Fellowship.", link: "https://palantir.com" },
  { role: "Student Fellow", company: "Thinking About Thinking", type: "Fellowship", duration: "Apr 2026 - Jul 2026", description: "AI alignment, and making information more accessible.", link: "https://atilade.uk/about" },
  { role: "Founder's Associate", company: "BeGenio", type: "Internship", duration: "Aug 2023 - Oct 2023", description: "Edtech startup making maths stick through games. Ran pilot sessions and pitched a maths game to schools in Africa and Europe.", link: "https://atilade.uk/about" },
];

const aboutSkills: Record<string, string[]> = {
  Languages: ["Python", "C++", "C", "TypeScript", "SQL", "Bash", "COBOL"],
  "Frameworks & Libraries": ["FastAPI", "Django", "React", "Next.js", "PyTorch", "Stable-Baselines3", "Gymnasium", "Pydantic", "Z3"],
  "Developer Tools & Platforms": ["Docker", "Kubernetes", "Git", "GitHub", "Linux", "Google Cloud", "Vercel", "IBM Z", "Claude Code"],
  "Data & Infrastructure": ["PostgreSQL", "SQLite", "Redis", "Celery", "SurrealDB"],
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
      "Portfolio homepage for Atilade Gabriel Oke.",
    ) +
    [
      "# Atilade Oke",
      "",
      "Analyst, Data & AI at ION. Founder of Refinery. Electrical Engineering graduate, University of Manchester. 8x hackathon winner. #1 IBM Z Student Ambassador 2025-26.",
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
      "- Refinery: proving AI changes to enterprise COBOL are safe to deploy.",
      "- Building with teams of AI agents, and winning hackathons with them.",
      "- Data and AI at ION.",
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
      "I want to build cool stuff for people and agents. Analyst at ION, founder of Refinery, based in London.",
      "",
      "## Education",
      "",
      "### University of Manchester",
      "",
      "BEng (Hons) Electrical & Electronic Engineering with Industrial Experience, 2:1",
      "",
      "Graduated June 2026",
      "",
      "Final year project on deep RL for UAV path planning: 86. AI: 86. Concurrent Systems: 88.",
      "",
      "Activities: Founder of the IBM Z Society, Student Representative, PASS Leader, Student Ambassador.",
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
  const resumePath = "https://linkedin.com/in/atiladeoke";

  return (
    buildFrontmatter("Resume | Atilade Oke", "/resume", "Latest resume and download link for Atilade Oke.") +
    [
      "# Resume",
      "",
      "Atilade's full experience lives on LinkedIn.",
      "",
      `- LinkedIn: ${resumePath}`,
      "",
      "## Notes",
      "",
      "The /resume page redirects to LinkedIn.",
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
