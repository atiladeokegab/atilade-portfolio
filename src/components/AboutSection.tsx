import Image from "next/image";
import React from "react";
import { getIcon } from "@/lib/getIcon";

const Tag: React.FC<{ name: string; icon?: React.ReactNode }> = ({
  name,
  icon,
}) => (
  <div className="flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-800">
    {icon}
    <span>{name}</span>
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
      "Started with two friends, grew it to 50 members, 15+ workshops and 5 events. Co-organised IBM's only UK Datathon (400+ registrations) and left four new ambassadors behind. #1 IBM Z Ambassador 2025-26, Winter Challenge winner, IBM Z Day speaker.",
  },
  {
    role: "Winter Fellow",
    company: "Palantir",
    type: "Fellowship",
    duration: "Dec 2024 - Aug 2025",
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
    <div className="min-h-screen bg-white py-8">
      <div className="container mx-auto max-w-6xl px-8 pb-8">
        <hr className="mx-auto my-16 w-full border-t border-gray-200" />
        {/* Education Section */}
        <div className="mb-16">
          <h2 className="mb-12 text-sm font-medium uppercase tracking-wider text-gray-400">
            Education
          </h2>

          <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
            {/* Education Details */}
            <div className="space-y-6">
              <div>
                <h3 className="mb-2 text-3xl font-semibold tracking-tight text-gray-900 md:text-4xl">
                  University of Manchester
                </h3>
                <p className="mb-4 text-xl text-gray-500 md:text-2xl">
                  BEng (Hons) Electrical & Electronic Engineering with Industrial Experience
                </p>
                <p className="mb-6 text-lg text-gray-400">
                  Graduated June 2026, 2:1
                </p>
                <div className="space-y-4 text-gray-500">
                  <p>
                    Final year project on deep RL for UAV path planning: 86. AI: 86. Concurrent Systems: 88.
                  </p>
                  <p>
                    Activities: Founder of the IBM Z Society, Student Representative, PASS Leader, Student Ambassador.
                  </p>
                </div>
              </div>
            </div>

            {/* Campus Image */}
            <div className="relative">
              <div className="relative w-full aspect-video overflow-hidden rounded-lg shadow-lg">
                <Image
                  src="/about/Lanyard/uom.jpg"
                  alt="Manchester Campus in Summer"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="mt-3 text-sm italic text-gray-500">
                Manchester Campus in Summer
              </p>
            </div>
          </div>
        </div>

        <hr className="mx-auto my-16 w-full border-t border-gray-200" />

        {/* Experience Section */}
        <div className="mb-16">
          <h2 className="mb-12 text-sm font-medium uppercase tracking-wider text-gray-400">
            Experience
          </h2>

          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[2fr_3fr]">
            {/* Experience List */}
            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <div key={index} className="flex gap-4">
                  {/* Logo */}
                  <div className="shrink-0">
                    <div className="h-11 w-11 overflow-hidden rounded-lg border border-gray-200 bg-white">
                      {exp.companyLogo ? (
                        <Image
                          src={exp.companyLogo}
                          alt={`${exp.company} logo`}
                          width={44}
                          height={44}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gray-100 text-base font-semibold text-gray-400">
                          {exp.company.charAt(0)}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold tracking-tight text-gray-900">
                      {exp.role}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {exp.company}
                      <span className="text-gray-300"> · </span>
                      {exp.type}
                    </p>
                    <p className="mt-0.5 text-sm text-gray-400">{exp.duration}</p>
                    {exp.description && (
                      <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                        {exp.description}
                      </p>
                    )}
                    {exp.link && (
                      <a
                        href={exp.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1.5 inline-flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        Visit
                        <svg className="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Work Screenshots - Bento Grid */}
            <div className="grid grid-cols-6 auto-rows-fr gap-2">
              {/* Top left - larger */}
              <div className="col-span-4 relative overflow-hidden rounded-lg rounded-tl-2xl shadow-sm">
                <div className="aspect-[16/10]">
                  <Image
                    src="/events/touchline-phone.png"
                    alt="Touchline, Night Shift"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              {/* Top right - smaller */}
              <div className="col-span-2 relative overflow-hidden rounded-lg rounded-tr-2xl shadow-sm">
                <Image
                  src="/events/ibm-presenting.jpeg"
                  alt="Presenting at the IBM Z Society"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Bottom left - smaller */}
              <div className="col-span-2 relative overflow-hidden rounded-lg rounded-bl-2xl shadow-sm">
                <Image
                  src="/events/sap.jpeg"
                  alt="SAP Belfast"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Bottom right - larger */}
              <div className="col-span-4 relative overflow-hidden rounded-lg rounded-br-2xl shadow-sm">
                <div className="aspect-[16/10]">
                  <Image
                    src="/events/hyperdrop-store.jpg"
                    alt="HyperDrop"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr className="mx-auto my-16 w-full border-t border-gray-200" />

        {/* Technologies & Skills Section */}
        <div className="mb-16">
          <h2 className="mb-12 text-sm font-medium uppercase tracking-wider text-gray-400">
            Technologies & Skills
          </h2>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            {Object.entries(skills).map(([category, tech]) => (
              <div key={category} className="rounded-xl bg-gray-50 p-6">
                <h3 className="mb-4 text-lg font-semibold text-gray-900">
                  {category}
                </h3>
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
        </div>
      </div>
    </div>
  );
}
