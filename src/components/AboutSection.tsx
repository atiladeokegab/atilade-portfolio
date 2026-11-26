"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

type Step = {
  step: string;
  title: string;
  org: string;
  dates: string;
  detail?: string;
  href?: string;
};

const steps: Step[] = [
  {
    step: "VENTURE",
    title: "Venture Scout",
    org: "Venture capital, part-time",
    dates: "Nov 2026 – now",
    detail: "Scouting founders and early-stage companies for a venture fund.",
  },
  {
    step: "ION",
    title: "Analyst, Data and AI",
    org: "ION",
    dates: "Sep 2026 – now",
    detail: "Technical product work on European high-yield bond coverage: design papers, data sourcing and validation, weekly reporting to leadership.",
  },
  {
    step: "REFINERY",
    title: "Founder",
    org: "Refinery",
    dates: "Sep 2025 – now",
    detail: "Proving AI changes to mainframe COBOL are safe to deploy. DiSH Accelerator at Number 10 North, IBM Z ScaleUp, Claude Founder House builder cohort.",
    href: "/projects/refinery",
  },
  {
    step: "UOM",
    title: "BEng (Hons) Electrical and Electronic Engineering, 2:1",
    org: "University of Manchester, with Industrial Experience",
    dates: "Jun 2026",
    detail: "Final year project on deep RL for UAV path planning: 86. AI: 86. Concurrent Systems: 88. Student Representative, PASS Leader, Student Ambassador.",
    href: "/projects/uav-fyp",
  },
  {
    step: "THINKING",
    title: "Student Fellow",
    org: "Thinking About Thinking",
    dates: "Apr 2026 – Jul 2026",
    detail: "AI alignment, and making information more accessible.",
  },
  {
    step: "IBMZSOC",
    title: "Founder and President",
    org: "IBM Z Society, University of Manchester",
    dates: "Jun 2025 – Mar 2026",
    detail: "Started with two friends and grew it to 50 members, 15+ workshops and 5 events. Left four new ambassadors behind. #1 IBM Z Ambassador 2025-26, Winter Challenge winner, IBM Z Day speaker.",
    href: "/projects/ibm-z-society",
  },
  {
    step: "PALANTIR",
    title: "Winter Fellow",
    org: "Palantir",
    dates: "Dec 2024 – Aug 2025",
    detail: "Palantir Technologies Winter Fellowship, nine months.",
  },
  {
    step: "SAP",
    title: "Software Engineer, DevOps",
    org: "SAP, Belfast, industrial placement",
    dates: "Jul 2024 – Aug 2025",
    detail: "Joined at 19. Built a bare-metal monitoring tool for SAP Cloud and a performance testing API in Django and Paramiko. Added Redis and Celery task processing to the SAP HANA test infrastructure.",
    href: "/projects/sap",
  },
  {
    step: "BEGENIO",
    title: "Founder's Associate",
    org: "BeGenio, internship",
    dates: "Aug 2023 – Oct 2023",
    detail: "Edtech startup making maths stick through games. Ran pilot sessions and pitched a maths game to schools in Africa and Europe.",
  },
];

const wins = [
  { name: "Murmur", place: "1st place", event: "AI for Accessibility Collective", date: "Nov 2026", href: "/projects/murmur" },
  { name: "Red String", place: "Winner, £250,000 in credits", event: "The Agentic Web Hackathon by Parallel", date: "Nov 2026", href: "/projects/red-string" },
  { name: "Preflight", place: "3rd place, £1,000", event: "SoTA Scientific Parallelism Hackathon", date: "Nov 2026", href: "/projects/preflight" },
  { name: "Rescue Listener", place: "2nd place", event: "Biocomputing Hack by Outlier Labs", date: "Nov 2026", href: "/projects/biocomputing-hack" },
  { name: "Sapling and Touchline", place: "2nd in a side challenge, 4th in the main track", event: "Night Shift: Mubit Hackathon", date: "Oct 2026", href: "/projects/night-shift" },
  { name: "Edna", place: "Most Innovative Solution", event: "Corgi Hackathon", date: "Sep 2026", href: "/projects/corgi" },
  { name: "Witness", place: "1st place, £1,000 and £2,000 credits", event: "Worlds London", date: "Sep 2026", href: "/projects/worlds-witness" },
  { name: "BGN Hackathon", place: "3rd overall, Best Design and Branding", event: "Hosted at Google", href: "/projects/bgn-hackathon" },
  { name: "Winter Challenge", place: "Winner", event: "IBM Z" },
];

const alsoOnRecord = [
  "1 of 50 from 1,000+ applicants, Google UK Black talent programme",
  "OpenAI x Based Collective hacker house",
  "WAVEZ Grant",
  "GSE UK Conference",
];

const skills: [string, string[]][] = [
  ["Languages", ["Python", "C++", "C", "TypeScript", "SQL", "Bash", "COBOL"]],
  ["Frameworks and libraries", ["FastAPI", "Django", "React", "Next.js", "PyTorch", "Stable-Baselines3", "Gymnasium", "Pydantic", "Z3"]],
  ["Tools and platforms", ["Docker", "Kubernetes", "Git", "GitHub", "Linux", "Google Cloud", "IBM Z", "Claude Code", "Vercel"]],
  ["Data and infrastructure", ["PostgreSQL", "SQLite", "Redis", "Celery", "SurrealDB"]],
];

const Section: React.FC<{ title: string; caption?: string; id?: string; children: React.ReactNode }> = ({ title, caption, id, children }) => (
  <section id={id} className="pt-24 sm:pt-32">
    <h2 className="text-[28px] font-semibold leading-tight tracking-[-0.02em]">{title}</h2>
    {caption && <p className="mt-2 max-w-[60ch] text-[17px] text-ink-2">{caption}</p>}
    <div className="mt-8">{children}</div>
  </section>
);

export default function AboutSection() {
  // Rows rise in turn as they scroll in; with reduced motion they are simply there.
  const still = useReducedMotion();
  const reveal = (i: number) =>
    still
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.4 },
          transition: { duration: 0.45, delay: (i % 3) * 0.06, ease: "easeOut" as const },
        };
  return (
    <div className="pb-24 sm:pb-32">
      <Section id="steps" title="Work and study since 2023" caption="Newest first.">
        <div role="list" className="divide-y divide-black/[0.08] border-y border-black/[0.08]">
          {steps.map((s, i) => (
            <motion.div role="listitem" key={s.step} {...reveal(i)} className="grid grid-cols-1 gap-x-6 gap-y-1 py-5 lg:grid-cols-[minmax(0,1fr)_190px]">
              <div>
                <h3 className="text-[17px] font-semibold leading-snug">
                  {s.href ? (
                    <a href={s.href} className="-my-3 inline-block py-3 underline decoration-transparent underline-offset-4 hover:decoration-ink">{s.title}</a>
                  ) : s.title}
                </h3>
                <p className="text-[15px] text-ink">{s.org}</p>
                {s.detail && <p className="mt-1.5 max-w-[68ch] text-[15px] leading-relaxed text-ink-2">{s.detail}</p>}
              </div>
              <span className="text-[15px] tabular-nums text-ink-2 lg:pt-0.5 lg:text-right">{s.dates}</span>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section id="wins" title="12 hackathon wins" caption="Most weekends I'm at a hackathon. A selection of the wins:">
        <ul className="grid grid-cols-1 gap-x-12 md:grid-cols-2">
          {wins.map((w) => (
            <li key={w.name} className="flex items-baseline justify-between gap-4 border-t border-black/[0.08] py-4">
              <div className="min-w-0">
                <p className="text-[17px] font-semibold">
                  {w.href ? (
                    <a href={w.href} className="-my-3 inline-block min-w-11 py-3 underline decoration-black/20 underline-offset-4 hover:decoration-ink">{w.name}</a>
                  ) : w.name}
                </p>
                <p className="text-[15px] text-ink">{w.place}</p>
                <p className="text-[15px] text-ink-2">{w.event}</p>
              </div>
              {w.date && <span className="shrink-0 text-[15px] tabular-nums text-ink-2">{w.date}</span>}
            </li>
          ))}
        </ul>
        <h3 className="mt-12 text-[17px] font-semibold">Also on record</h3>
        <ul className="mt-3 space-y-2 text-[15px] text-ink-2">
          {alsoOnRecord.map((a) => <li key={a}>{a}</li>)}
        </ul>
      </Section>

      <Section id="tools" title="I build in Python, TypeScript and COBOL">
        <dl className="grid grid-cols-1 gap-x-12 gap-y-6 md:grid-cols-2">
          {skills.map(([group, items]) => (
            <div key={group} className="border-t border-black/[0.08] pt-4">
              <dt className="text-[15px] font-semibold">{group}</dt>
              <dd className="mt-1 text-[15px] leading-relaxed text-ink-2">{items.slice(0, -1).join(", ")} and {items.at(-1)}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <section className="pt-24 sm:pt-32">
        <div className="rounded-[22px] bg-surface px-6 py-10 sm:px-12 sm:py-14">
          <h2 className="text-[28px] font-semibold leading-tight tracking-[-0.02em]">Email is the fastest way to reach me.</h2>
          <p className="mt-2 text-[17px] text-ink-2">okeatilade@gmail.com</p>
          <a href="mailto:okeatilade@gmail.com" className="mt-6 inline-flex min-h-11 items-center rounded-full bg-ink px-5 text-[17px] font-medium text-white transition-colors hover:bg-black">
            Email me
          </a>
        </div>
      </section>
    </div>
  );
}
