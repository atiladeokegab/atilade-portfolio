import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description:
    "Atilade Oke: founder of Refinery, Analyst in Data & AI at ION, Manchester engineer, eight hackathon wins.",
  alternates: { canonical: "/about" },
};

const serif = "font-[family-name:var(--font-instrument-serif)] font-normal";
const focus =
  "inline-flex min-h-11 items-center rounded-sm focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-gray-900";

type Chapter = { title: string; where: string; when: string; body: string; href?: string };

const story: { year: string; chapters: Chapter[] }[] = [
  {
    year: "2023",
    chapters: [
      {
        title: "Founder's Associate",
        where: "BeGenio",
        when: "Aug to Oct 2023",
        body: "An edtech startup making maths stick through games. I ran pilot sessions and pitched a maths game to schools in Africa and Europe.",
      },
    ],
  },
  {
    year: "2024",
    chapters: [
      {
        title: "Software Engineer, DevOps",
        where: "SAP, Belfast",
        when: "Jul 2024 to Aug 2025",
        body: "My industrial placement, at 19. I built a bare-metal monitoring tool for SAP Cloud and a performance testing API in Django and Paramiko. I also built Redis and Celery task processing for the SAP HANA test infrastructure.",
      },
      {
        title: "Winter Fellow",
        where: "Palantir",
        when: "Dec 2024 to Aug 2025",
        body: "The Palantir Technologies Winter Fellowship: nine months, remote.",
      },
    ],
  },
  {
    year: "2025",
    chapters: [
      {
        title: "Founder and President",
        where: "IBM Z Society, University of Manchester",
        when: "Jun 2025 to Mar 2026",
        body: "Day one was me and two friends. More on that below.",
        href: "/projects/ibm-z-society",
      },
      {
        title: "Founder",
        where: "Refinery",
        when: "Sep 2025 to now",
        body: "I started it in my final year at Manchester. More on it above.",
        href: "https://refinery.guru",
      },
    ],
  },
  {
    year: "2026",
    chapters: [
      {
        title: "Student Fellow",
        where: "Thinking About Thinking",
        when: "Apr to Jul 2026",
        body: "AI alignment, and making information more accessible.",
      },
      {
        title: "BEng (Hons) Electrical and Electronic Engineering with Industrial Experience",
        where: "University of Manchester",
        when: "Graduated June 2026, 2:1",
        body: "My final year project used deep reinforcement learning for UAV path planning and scored 86.",
        href: "/projects/uav-fyp",
      },
      {
        title: "Analyst, Data & AI",
        where: "ION",
        when: "Sep 2026 to now",
        body: "Technical product work on European high-yield bond coverage: design papers, data sourcing and validation, and weekly reporting to leadership.",
      },
    ],
  },
];

const wins = [
  { what: "Eight hackathon wins", detail: "I spend most weekends at hackathons." },
  { what: "#1 IBM Z Student Ambassador worldwide", detail: "2025-26. I also won the IBM Z Winter Challenge and spoke at IBM Z Day." },
  { what: "Google UK talent programme", detail: "One of 50 chosen from more than 1,000." },
  { what: "Two fellowships", detail: "Palantir's Winter Fellowship and Thinking About Thinking." },
];

const links = [
  { name: "LinkedIn", href: "https://www.linkedin.com/in/atiladeoke/" },
  { name: "GitHub", href: "https://github.com/atiladeokegab" },
  { name: "Refinery", href: "https://refinery.guru" },
];

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="max-w-[20ch] text-balance text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
      {children}
    </h2>
  );
}

export default function About() {
  return (
    <div className="bg-white text-pretty text-gray-900 selection:bg-gray-900 selection:text-white">
      {/* First screen */}
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-24 pt-8 sm:px-6 lg:min-h-[calc(100svh-6rem)] lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:px-8 lg:pb-16">
        <div>
          <h1 className="text-6xl font-semibold tracking-tight sm:text-7xl lg:text-8xl">
            I&apos;m Atilade.
          </h1>
          <p className="mt-6 max-w-[22ch] text-balance text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            <span className="text-gray-500">I want to build</span> cool stuff{" "}
            <span className="text-gray-500">for</span> people and agents.
          </p>
          <dl className="mt-10 grid max-w-md grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-base">
            <dt className="text-gray-500">Founder</dt>
            <dd>Refinery</dd>
            <dt className="text-gray-500">Analyst, Data &amp; AI</dt>
            <dd>ION</dd>
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
            <h3 className="text-xl font-semibold tracking-tight">Refinery</h3>
            <p className="mt-3 text-base leading-relaxed text-gray-600">
              Refinery proves AI changes to enterprise COBOL are safe to deploy. Supported by IBM Z ScaleUp, the DiSH Accelerator at Number 10 North, Based Collective, OpenAI
              Hacker House London and the Claude Founder House builder cohort.
            </p>
            <a href="https://refinery.guru" className={`mt-4 text-base font-medium underline decoration-gray-300 underline-offset-4 hover:decoration-gray-900 ${focus}`}>
              refinery.guru
            </a>
          </div>
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-xl font-semibold tracking-tight">ION</h3>
            <p className="mt-3 text-base leading-relaxed text-gray-600">
              By day I&apos;m an Analyst in Data &amp; AI, doing technical product work on European high-yield bond
              coverage.
            </p>
          </div>
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-xl font-semibold tracking-tight">A team of AI agents</h3>
            <p className="mt-3 text-base leading-relaxed text-gray-600">
              I build almost everything with a team of AI agents: a shared task board, direct messaging between
              sessions and review gates.
            </p>
            <Link href="/projects/agent-hub" className={`mt-4 text-base font-medium underline decoration-gray-300 underline-offset-4 hover:decoration-gray-900 ${focus}`}>
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
                <p className={`${serif} text-7xl leading-none tabular-nums tracking-tight lg:sticky lg:top-28 lg:text-[9rem]`} aria-label={`In ${year}`}>
                  {year}
                </p>
              </div>
              <div className="mt-6 space-y-10 lg:mt-4">
                {chapters.map((c) => (
                  <article key={c.title}>
                    <h3 className="text-2xl font-semibold tracking-tight">{c.title}</h3>
                    <p className="mt-1 text-base text-gray-500">
                      {c.where} <span aria-hidden>·</span> {c.when}
                    </p>
                    <p className="mt-3 max-w-[60ch] text-lg leading-relaxed text-gray-600">{c.body}</p>
                    {c.href && (
                      <Link href={c.href} className={`mt-3 text-base font-medium underline decoration-gray-300 underline-offset-4 hover:decoration-gray-900 ${focus}`}>
                        {c.href.startsWith("http") ? c.href.replace("https://", "") : "Read the story"}
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
        <Heading>Wins along the way</Heading>
        <ul className="mt-12">
          {wins.map((w) => (
            <li key={w.what} className="grid gap-2 border-t border-gray-200 py-6 md:grid-cols-[1fr_1fr] md:gap-8">
              <p className="text-2xl font-semibold tracking-tight">{w.what}</p>
              <p className="text-lg leading-relaxed text-gray-600">{w.detail}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Community */}
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-24 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div>
          <Heading>I build communities</Heading>
          <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-gray-600">
            I founded the IBM Z Society at the University of Manchester with two friends. It grew to 50 members and
            ran 15+ workshops and 5 events on AI, quantum and security. Four new IBM Z Student Ambassadors carry it on.
          </p>
          <Link href="/projects/ibm-z-society" className={`mt-6 text-base font-medium underline decoration-gray-300 underline-offset-4 hover:decoration-gray-900 ${focus}`}>
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
      <section className="mx-auto max-w-6xl px-4 pb-24 pt-24 sm:px-6 lg:px-8">
        <p className={`${serif} text-5xl leading-tight tracking-tight sm:text-7xl`}>
          Always happy to build something together.
        </p>
        <a
          href="mailto:okeatilade@gmail.com"
          className={`mt-8 break-all text-2xl font-semibold tracking-tight underline decoration-gray-300 underline-offset-8 hover:decoration-gray-900 sm:text-4xl ${focus}`}
        >
          okeatilade@gmail.com
        </a>
        <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-base">
          {links.map((l) => (
            <li key={l.name}>
              <a href={l.href} target="_blank" rel="noopener noreferrer" className={`text-gray-600 hover:text-gray-900 ${focus}`}>
                {l.name} <ArrowUpRight aria-hidden className="inline size-4 align-[-0.125em]" />
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
