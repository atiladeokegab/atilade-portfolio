import type { Metadata } from "next";
import Link from "next/link";

const machineReadableResources = [
  {
    href: "/llms.txt",
    label: "llms.txt",
    description: "A compact Markdown summary of the site, author, focus areas, and key projects.",
  },
  {
    href: "/robots.txt",
    label: "robots.txt",
    description: "Crawler guidance plus the canonical sitemap location.",
  },
  {
    href: "/sitemap.xml",
    label: "sitemap.xml",
    description: "The current index of public pages and project routes.",
  },
];

const helpfulPages = [
  {
    href: "/projects",
    label: "Projects",
    description: "Portfolio entries with project-level detail and supporting media.",
  },
  {
    href: "/about",
    label: "About",
    description: "Background, current focus, and working style.",
  },
  {
    href: "/resume",
    label: "Resume",
    description: "Latest resume PDF and an embedded viewer for quick review.",
  },
];

export const metadata: Metadata = {
  title: "Agent Discovery",
  description:
    "Human-readable guidance for agents and tools browsing Noah Pham's portfolio.",
};

export default function AgentDocsPage() {
  return (
    <div className="bg-white py-10 sm:py-14">
      <div className="mx-auto flex max-w-4xl flex-col gap-10 px-6 sm:px-8">
        <div className="space-y-4">
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-gray-400">
            Agent Discovery
          </p>
          <div className="space-y-4">
            <h1 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
              Site guidance for automated clients
            </h1>
            <p className="max-w-3xl text-base leading-7 text-gray-600 sm:text-lg">
              This portfolio does not currently publish a public programmatic API. The homepage
              advertises this page as human-readable service documentation and links to
              machine-readable resources that help agents discover the site structure and author
              context.
            </p>
          </div>
        </div>

        <section className="rounded-3xl border border-gray-200 bg-gray-50 p-6 sm:p-8">
          <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
            Machine-readable resources
          </h2>
          <div className="mt-6 grid gap-4">
            {machineReadableResources.map((resource) => (
              <Link
                key={resource.href}
                href={resource.href}
                className="rounded-2xl border border-gray-200 bg-white p-5 transition-colors hover:border-gray-300"
              >
                <p className="text-sm font-medium uppercase tracking-[0.18em] text-gray-400">
                  {resource.label}
                </p>
                <p className="mt-2 text-lg font-semibold text-gray-900">{resource.href}</p>
                <p className="mt-2 text-sm leading-6 text-gray-600">{resource.description}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="rounded-3xl border border-gray-200 p-6 sm:p-8">
          <h2 className="text-2xl font-semibold tracking-tight text-gray-900">
            High-value pages
          </h2>
          <div className="mt-6 grid gap-4">
            {helpfulPages.map((resource) => (
              <Link
                key={resource.href}
                href={resource.href}
                className="rounded-2xl border border-gray-200 p-5 transition-colors hover:border-gray-300"
              >
                <p className="text-sm font-medium uppercase tracking-[0.18em] text-gray-400">
                  {resource.label}
                </p>
                <p className="mt-2 text-lg font-semibold text-gray-900">{resource.href}</p>
                <p className="mt-2 text-sm leading-6 text-gray-600">{resource.description}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
