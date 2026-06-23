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
    role: "Software Developer",
    company: "Ping Proxies",
    companyLogo: "/svg/ping-logo.svg",
    type: "Internship",
    duration: "Oct 2025 - Present",
    description:
      "Building scalable infrastructure for data-driven companies and AI-focused startups to access publicly available web data at scale.",
    link: "https://pingproxies.com",
  },
  {
    role: "Digital Design Web Developer",
    company: "University of Manchester Students' Union",
    companyLogo: "/svg/student-union-icon.svg",
    type: "Part-time",
    duration: "Aug 2025 - Present",
    description:
      "Designing and developing web experiences for the Students' Union, serving over 100,000 students.",
    link: "https://manchesterstudentsunion.com",
  },
  {
    role: "Founder",
    company: "SpeakWisely",
    companyLogo: "/svg/speakwiselylogo.svg",
    type: "Startup",
    duration: "Oct 2024 - Present",
    description:
      "Building an AI-powered platform to help 300+ students excel at IELTS Speaking.",
    link: "https://speakwisely.vercel.app",
  },
];

const skills: { [key: string]: Skill[] } = {
  "Languages": [
    { name: "Python", iconName: "Python" },
    { name: "TypeScript", iconName: "TypeScript" },
    { name: "JavaScript", iconName: "JavaScript" },
    { name: "Java", iconName: "Java" },
    { name: "C++", iconName: "C++" },
    { name: "SQL", iconName: "SQL" },
    { name: "HTML/CSS", iconName: "HTML/CSS" },
    { name: "C", iconName: "C" },
  ],
  "Frameworks & Libraries": [
    { name: "Next.js", iconName: "Next.js" },
    { name: "React.js", iconName: "React" },
    { name: "Node.js", iconName: "Node.js" },
    { name: "Tailwind CSS", iconName: "Tailwind CSS" },
    { name: "Framer Motion", iconName: "Framer Motion" },
    { name: "Qt", iconName: "Qt" },
    { name: "PartyKit", iconName: "PartyKit" },
  ],
  "Developer Tools & Platforms": [
    { name: "Docker", iconName: "Docker" },
    { name: "Git", iconName: "Git" },
    { name: "GitHub", iconName: "GitHub" },
    { name: "GitLab", iconName: "GitLab" },
    { name: "Vercel", iconName: "Vercel" },
    { name: "Linux", iconName: "Linux" },
    { name: "Windows", iconName: "Windows" },
    { name: "LaTeX", iconName: "LaTeX" },
    { name: "AWS", iconName: "Amazon EC2" },
    { name: "Google Analytics", iconName: "Google Analytics" },
    { name: "Mapbox", iconName: "Mapbox GL" },
    { name: "Clerk", iconName: "Clerk" },
  ],
  "Database & BaaS": [
    { name: "PostgreSQL", iconName: "PostgreSQL" },
    { name: "Supabase", iconName: "Supabase" },
    { name: "MongoDB", iconName: "MongoDB" },
    { name: "MySQL", iconName: "MySQL" },
    { name: "SQLite", iconName: "SQLite" },
    { name: "Firebase", iconName: "Firebase" },
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
                  BSc. (Hons) Computer Science — Manchester, United Kingdom
                </p>
                <p className="mb-6 text-lg text-gray-400">
                  Sep 2023 – August 2027
                </p>
                <div className="space-y-4 text-gray-500">
                  <p>
                    Coursework: Data Science, Operating Systems, Computer
                    Engineering & Architecture, Discrete Mathematics.
                  </p>
                  <p>
                    Activities: Student Representative, Google Developer Student Club, Hyperloop Manchester, Manchester Robotics Society, Hackchester - Cyber Security, Manchester Trading Society, MUDSS.
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
                    src="/dnsdirectory/DNS Thumbnail 1.svg"
                    alt="DNS Directory"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              {/* Top right - smaller */}
              <div className="col-span-2 relative overflow-hidden rounded-lg rounded-tr-2xl shadow-sm">
                <Image
                  src="/umsu/su-thumbnail.png"
                  alt="Students' Union Website"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Bottom left - smaller */}
              <div className="col-span-2 relative overflow-hidden rounded-lg rounded-bl-2xl shadow-sm">
                <Image
                  src="/about/byteful43.jpeg"
                  alt="Ping Proxies Dashboard"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Bottom right - larger */}
              <div className="col-span-4 relative overflow-hidden rounded-lg rounded-br-2xl shadow-sm">
                <div className="aspect-[16/10]">
                  <Image
                    src="/carousel/speakwisely.jpeg"
                    alt="Development Workspace"
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
