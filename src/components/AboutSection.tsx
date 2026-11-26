import Image from "next/image";
import React from "react";
import { getIcon } from "@/lib/getIcon";

const Tag: React.FC<{ name: string; icon?: React.ReactNode }> = ({
  name,
  icon,
}) => (
  <div className="flex items-center gap-1.5 rounded-full bg-surface px-3 py-1 text-sm text-ink">
    {icon}
    <span>{name}</span>
  </div>
);

// Section title in the left column, content in the right.
const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <section className="grid grid-cols-1 gap-6 pt-24 sm:pt-32 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-12">
    <h2 className="text-2xl sm:text-[28px] font-semibold tracking-[-0.02em] text-ink">{title}</h2>
    <div>{children}</div>
  </section>
);

const LogoTile: React.FC<{ src?: string; label: string }> = ({ src, label }) => (
  <div className="flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-[12px] bg-white ring-1 ring-black/[0.08]">
    {src ? (
      <Image src={src} alt={`${label} logo`} width={44} height={44} className="size-full object-contain" />
    ) : (
      <span className="text-base font-semibold text-ink-2">{label.charAt(0)}</span>
    )}
  </div>
);

const Row: React.FC<{ logo?: string; title: string; subtitle: string; dates: string; href?: string; children?: React.ReactNode }> = ({ logo, title, subtitle, dates, href, children }) => (
  <div className="flex gap-4">
    <LogoTile src={logo} label={title} />
    <div className="min-w-0 flex-1">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="font-semibold text-ink">
          {href ? <a href={href} target="_blank" rel="noopener noreferrer" className="hover:text-link">{title}</a> : title}
        </h3>
        <span className="shrink-0 text-sm text-ink-2 tabular-nums">{dates}</span>
      </div>
      <p className="text-sm text-ink-2">{subtitle}</p>
      {children}
    </div>
  </div>
);

type Skill = {
  name: string;
  iconName?: string;
};

type ExperienceItem = {
  role: string;
  company: string;
  companyLogo?: string;
  type: string;
  duration: string;
  description?: string;
  link?: string;
  // Shown on About: the IBM Z Society numbers live here now the home page has no community section.
  showDescription?: boolean;
};

const experiences: ExperienceItem[] = [
  {
    role: "Analyst, Data & AI",
    company: "ION",
    type: "Full-time",
    duration: "Sep 2026 - Present",
    description:
      "Technical product work on European high-yield bond coverage: design papers, data sourcing and validation, weekly reporting to leadership.",
    link: "https://iongroup.com",
  },
  {
    role: "Venture Scout",
    company: "Venture capital",
    type: "Part-time",
    duration: "Nov 2026 - Present",
    description:
      "Scouting exceptional founders and early-stage companies for a venture fund.",
  },
  {
    role: "Founder",
    company: "Refinery",
    companyLogo: "/landing/refinery-mark.jpg",
    type: "Startup",
    duration: "Sep 2025 - Present",
    description:
      "Proving AI changes to enterprise COBOL are safe to deploy. DiSH Accelerator at Number 10 North, IBM Z ScaleUp, Claude Founder House builder cohort.",
    link: "https://refinery.guru",
  },
  {
    role: "Software Engineer, DevOps",
    company: "SAP",
    type: "Industrial placement",
    duration: "Jul 2024 - Aug 2025",
    description:
      "Built at 19: a bare-metal monitoring tool for SAP Cloud, a performance testing API in Django and Paramiko, and Redis and Celery task processing for the SAP HANA test infrastructure.",
  },
  {
    role: "Founder & President",
    company: "IBM Z Society, UoM",
    type: "Society",
    duration: "Jun 2025 - Mar 2026",
    description:
      "Started with two friends, grew it to 50 members, 15+ workshops and 5 events. Left four new ambassadors behind. #1 IBM Z Ambassador 2025-26, Winter Challenge winner, IBM Z Day speaker.",
    showDescription: true,
  },
  {
    role: "Winter Fellow",
    company: "Palantir",
    type: "Fellowship, remote internship",
    duration: "Dec 2024 - Aug 2025",
    description: "Palantir Technologies Winter Fellowship, nine months.",
  },
  {
    role: "Student Fellow",
    company: "Thinking About Thinking",
    type: "Fellowship",
    duration: "Apr 2026 - Jul 2026",
    description: "AI alignment, and making information more accessible.",
  },
  {
    role: "Founder's Associate",
    company: "BeGenio",
    type: "Internship",
    duration: "Aug 2023 - Oct 2023",
    description: "Edtech startup making maths stick through games. Ran pilot sessions and pitched a maths game to schools in Africa and Europe.",
  },
];

const skills: { [key: string]: Skill[] } = {
  "Languages": [
    { name: "Python", iconName: "Python" },
    { name: "C++", iconName: "C++" },
    { name: "C", iconName: "C" },
    { name: "TypeScript", iconName: "TypeScript" },
    { name: "SQL", iconName: "SQL" },
    { name: "Bash" },
    { name: "COBOL" },
  ],
  "Frameworks & Libraries": [
    { name: "FastAPI" },
    { name: "Django" },
    { name: "React", iconName: "React" },
    { name: "Next.js", iconName: "Next.js" },
    { name: "PyTorch" },
    { name: "Stable-Baselines3" },
    { name: "Gymnasium" },
    { name: "Pydantic" },
    { name: "Z3" },
  ],
  "Developer Tools & Platforms": [
    { name: "Docker", iconName: "Docker" },
    { name: "Kubernetes" },
    { name: "Git", iconName: "Git" },
    { name: "GitHub", iconName: "GitHub" },
    { name: "Linux", iconName: "Linux" },
    { name: "Google Cloud" },
    { name: "Vercel", iconName: "Vercel" },
    { name: "IBM Z" },
    { name: "Claude Code" },
  ],
  "Data & Infrastructure": [
    { name: "PostgreSQL", iconName: "PostgreSQL" },
    { name: "SQLite", iconName: "SQLite" },
    { name: "Redis", iconName: "Redis" },
    { name: "Celery" },
    { name: "SurrealDB" },
  ],
};

export default function AboutSection() {
  return (
    <div className="bg-white pb-24 sm:pb-32">
      <div className="container mx-auto max-w-6xl px-4 sm:px-8">
        <Section title="Education">
          <Row
            logo="/landing/uom-transparent-icon.png"
            title="University of Manchester"
            subtitle="BEng (Hons) Electrical & Electronic Engineering with Industrial Experience · 2:1"
            dates="June 2026"
          >
            <p className="mt-2 text-sm leading-relaxed text-ink-2">
              Final year project on deep RL for UAV path planning: 86. AI: 86. Concurrent Systems: 88.
              Activities: Founder of the IBM Z Society, Student Representative, PASS Leader, Student Ambassador.
            </p>
          </Row>
        </Section>

        <Section title="Experience">
          <div className="space-y-6">
            {experiences.map((exp) => (
              <Row
                key={exp.role + exp.company}
                logo={exp.companyLogo}
                title={exp.company}
                subtitle={`${exp.role} · ${exp.type}`}
                dates={exp.duration}
                href={exp.link}
              >
                {exp.showDescription && (
                  <p className="mt-1 text-sm leading-relaxed text-ink-2">{exp.description}</p>
                )}
              </Row>
            ))}
          </div>
        </Section>

        <Section title="Technologies & Skills">
          <div className="grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-2">
            {Object.entries(skills).map(([category, tech]) => (
              <div key={category}>
                <h3 className="mb-3 text-sm font-semibold text-ink">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {tech.map((item) => (
                    <Tag
                      key={item.name}
                      name={item.name}
                      icon={item.iconName ? getIcon(item.iconName) : undefined}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
}
