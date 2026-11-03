import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description:
    "Atilade Oke: founder of Refinery, Analyst in Data & AI at ION, Manchester engineer and hackathon winner.",
  alternates: { canonical: "/about" },
};

// Six type sizes on this page: 128 (years), 72 (h1), 48 (h2, hero line), 24, 18 (body), 16 (meta).
const serif = "font-[family-name:var(--font-instrument-serif)] font-normal";
const link =
  "inline-flex min-h-11 items-center text-base font-medium underline decoration-gray-300 underline-offset-4 hover:decoration-gray-900";
const email = "mailto:okeatilade@gmail.com";

type Chapter = { title: string; meta: string; body: string[]; href?: string; label?: string };

const story: { year: string; chapters: Chapter[] }[] = [
  {
    year: "2023",
    chapters: [
      {
        title: "Founder's Associate at BeGenio",
        meta: "August to October 2023",
        body: ["BeGenio is an edtech startup that teaches maths through games.", "I ran its pilot sessions.", "I pitched its maths game to schools in Africa and Europe."],
      },
    ],
  },
  {
    year: "2024",
    chapters: [
      {
        title: "Software Engineer, DevOps at SAP",
        meta: "Belfast, July 2024 to August 2025",
        body: [
          "My industrial placement, at 19.",
          "I built a bare-metal monitoring tool for SAP Cloud.",
          "I built a performance testing API in Django and Paramiko.",
          "I added Redis and Celery task processing to the SAP HANA test infrastructure.",
        ],
      },
      {
        title: "Winter Fellow at Palantir",
        meta: "December 2024 to August 2025",
        body: ["A 9-month remote fellowship with Palantir Technologies."],
      },
    ],
  },
  {
    year: "2025",
    chapters: [
      {
        title: "Founder of the IBM Z Society",
        meta: "University of Manchester, June 2025 to March 2026",
        body: ["Day 1 was me and 2 friends."],
        href: "/projects/ibm-z-society",
        label: "The IBM Z Society story",
      },
      {
        title: "Founder of Refinery",
        meta: "Since September 2025",
        body: ["I started it in my final year at Manchester."],
        href: "https://refinery.guru",
        label: "refinery.guru",
      },
    ],
  },
  {
    year: "2026",
    chapters: [
      {
        title: "Student Fellow at Thinking About Thinking",
        meta: "April to July 2026",
        body: ["A fellowship on AI alignment and accessible information."],
      },
      {
        title: "BEng (Hons) Electrical and Electronic Engineering",
        meta: "University of Manchester, graduated June 2026 with a 2:1",
        body: ["My final year project used deep reinforcement learning to plan UAV paths.", "It was graded 86."],
        href: "/projects/uav-fyp",
        label: "The UAV project",
      },
      {
        title: "Analyst, Data & AI at ION",
        meta: "Since September 2026",
        body: ["I do technical product work on European high-yield bond coverage.", "That means design papers, data sourcing and validation, and weekly reports."],
      },
    ],
  },
];

// Every result here is on its project page; the link is the source.
const wins = [
  { when: "November 2026", event: "DevDay Community Hackathon London", result: "A judge picked Strata as one of the top projects.", href: "/projects/strata" },
  { when: "October 2026", event: "Night Shift: Mubit Hackathon", result: "2nd in the side challenge and 4th on the main track.", href: "/projects/night-shift" },
  { when: "September 2026", event: "Corgi Hackathon", result: "Most Innovative Solution, with Edna.", href: "/projects/corgi" }, // copy-ok: the award's own name
  { when: "September 2026", event: "Worlds London", result: "1st place and £1,000, with Witness.", href: "/projects/worlds-witness" },
  { when: "2025-26", event: "IBM Z Student Ambassador", result: "#1 worldwide, and winner of the Winter Challenge.", href: "/projects/ibm-z-society" },
  { when: "October 2023", event: "BGN Hackathon at Google", result: "3rd place overall, and best design and branding.", href: "/projects/bgn-hackathon" },
  { when: "October 2023", event: "Google UK Black Talent programme", result: "1 of 50 selected from 1,000+ applicants.", href: "/projects/bgn-hackathon" },
];

const elsewhere = [
  { name: "LinkedIn", href: "https://www.linkedin.com/in/atiladeoke/" },
  { name: "GitHub", href: "https://github.com/atiladeokegab" },
];

function Heading({ children }: { children: React.ReactNode }) {
  return <h2 className="max-w-[20ch] text-balance text-4xl font-semibold tracking-tight text-gray-900 lg:text-5xl">{children}</h2>;
}

export default function About() {
  return (
    <div className="bg-white text-pretty text-gray-900 selection:bg-gray-900 selection:text-white">
      {/* First screen */}
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-24 pt-6 sm:px-6 lg:min-h-[calc(100svh-5rem)] lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:px-8 lg:pb-16">
        <div>
          <h1 className="text-6xl font-semibold tracking-tight lg:text-7xl">I&apos;m Atilade.</h1>
          <p className="mt-6 max-w-[24ch] text-balance text-4xl font-semibold leading-tight tracking-tight lg:text-5xl">
            <span className="text-gray-500">I build</span> Refinery<span className="text-gray-500">, which proves</span> AI
            changes to enterprise COBOL <span className="text-gray-500">are</span> safe to deploy.
          </p>
          <a
            href={email}
            className="mt-8 inline-flex h-12 items-center rounded-md bg-gray-900 px-6 text-base font-medium text-white transition-colors hover:bg-gray-700"
          >
            Email me
          </a>
          <dl className="mt-10 grid max-w-md grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-base">
            <dt className="text-gray-500">Day job</dt>
            <dd>Analyst, Data &amp; AI at ION</dd>
            <dt className="text-gray-500">Studied</dt>
            <dd>Electrical Engineering, Manchester</dd>
            <dt className="text-gray-500">Based in</dt>
            <dd>London</dd>
          </dl>
        </div>
        <figure className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl bg-gray-100 lg:max-w-none">
          <Image
            src="/me.jpg"
            alt="Atilade Oke in front of an IBM sign"
            fill
            priority
            sizes="(min-width: 1024px) 40vw, 384px"
            className="object-cover object-top"
          />
        </figure>
      </section>

      {/* Now */}
      <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
        <Heading>What I&apos;m building now</Heading>
        <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-2xl font-semibold tracking-tight">Refinery</h3>
            <p className="mt-3 text-lg leading-relaxed text-gray-600">
              Refinery proves AI changes to enterprise COBOL are safe to deploy.
            </p>
            <p className="mt-3 text-lg leading-relaxed text-gray-600">Programmes that back it:</p>
            <ul className="mt-2 space-y-1 text-base text-gray-600">
              <li>IBM Z ScaleUp</li>
              <li>DiSH Accelerator at Number 10 North</li>
              <li>Claude Founder House builder cohort</li>
              <li>Based Collective</li>
              <li>OpenAI Hacker House London</li>
            </ul>
            <a href="https://refinery.guru" className={`mt-2 ${link}`}>
              refinery.guru
            </a>
          </div>
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-2xl font-semibold tracking-tight">ION</h3>
            <p className="mt-3 text-lg leading-relaxed text-gray-600">By day I&apos;m an Analyst in Data &amp; AI at ION.</p>
          </div>
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-2xl font-semibold tracking-tight">A team of AI agents</h3>
            <p className="mt-3 text-lg leading-relaxed text-gray-600">I build with a team of AI agents.</p>
            <p className="mt-3 text-lg leading-relaxed text-gray-600">They share a task board, message each other and review each other&apos;s work.</p>
            <Link href="/projects/agent-hub" className={`mt-2 ${link}`}>
              How the agent hub works
            </Link>
          </div>
        </div>
      </section>

      {/* The story, one sticky year at a time */}
      <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
        <Heading>How I got here</Heading>
        <ol className="mt-12">
          {story.map(({ year, chapters }) => (
            <li key={year} className="grid border-t border-gray-200 py-10 lg:grid-cols-[18rem_1fr] lg:gap-12 lg:py-16">
              <div>
                <p className={`${serif} text-6xl leading-none tracking-tight tabular-nums lg:sticky lg:top-28 lg:text-9xl`}>{year}</p>
              </div>
              <div className="mt-6 space-y-10 lg:mt-4">
                {chapters.map((c) => (
                  <article key={c.title}>
                    <h3 className="text-2xl font-semibold tracking-tight">{c.title}</h3>
                    <p className="mt-1 text-base text-gray-500">{c.meta}</p>
                    <p className="mt-3 max-w-[60ch] text-lg leading-relaxed text-gray-600">{c.body.join(" ")}</p>
                    {c.href && (
                      <Link href={c.href} className={`mt-2 ${link}`}>
                        {c.label}
                      </Link>
                    )}
                  </article>
                ))}
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Wins */}
      <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
        <Heading>What I&apos;ve won</Heading>
        <ul className="mt-12">
          {wins.map((w) => (
            <li key={w.event} className="grid gap-1 border-t border-gray-200 py-6 md:grid-cols-[10rem_1fr_1fr] md:items-baseline md:gap-8">
              <p className="text-base text-gray-500 tabular-nums">{w.when}</p>
              <Link href={w.href} className="inline-flex min-h-11 items-center text-2xl font-semibold tracking-tight underline decoration-transparent underline-offset-4 hover:decoration-gray-900">
                {w.event}
              </Link>
              <p className="text-lg leading-relaxed text-gray-600">{w.result}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Community */}
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-24 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div>
          <Heading>I build communities</Heading>
          <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-gray-600">
            I founded the IBM Z Society at the University of Manchester with 2 friends. It grew to 50 members. We ran
            15+ workshops and 5 events on AI, quantum and security. 4 new IBM Z Student Ambassadors now carry it on.
          </p>
          <Link href="/projects/ibm-z-society" className={`mt-4 ${link}`}>
            The IBM Z Society story
          </Link>
        </div>
        <figure className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl bg-gray-100">
          <Image
            src="/events/ibm-z-launch.jpg"
            alt="The IBM Z Society launch at the University of Manchester"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </figure>
      </section>

      {/* Reach me */}
      <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
        <Heading>Email is the fastest way to reach me</Heading>
        <a
          href={email}
          className="mt-8 inline-flex min-h-11 items-center break-all text-2xl font-semibold tracking-tight underline decoration-gray-300 underline-offset-8 hover:decoration-gray-900"
        >
          okeatilade@gmail.com
        </a>
        <ul className="mt-6 flex flex-wrap gap-x-8">
          {elsewhere.map((l) => (
            <li key={l.name}>
              <a href={l.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-1 text-base text-gray-600 hover:text-gray-900">
                {l.name} <ArrowUpRight aria-hidden className="size-4" />
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
