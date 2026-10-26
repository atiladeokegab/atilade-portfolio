import Link from "next/link"
import { IconUsersGroup } from "@tabler/icons-react"
import Reveal from "@/components/Reveal"

const stats = [
  { value: "0 → 50", label: "members in the IBM Z Society's first year" },
  { value: "15+", label: "workshops, plus 5 events on AI, quantum and security" },
  { value: "400+", label: "registrations for IBM's only UK Datathon, 3× the goal" },
  { value: "4", label: "new IBM Z Student Ambassadors to carry it on" },
]

export default function CommunitySection() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-sm font-medium border border-neutral-300 bg-white px-3 py-1.5 rounded-full mb-4">
            <IconUsersGroup className="size-5" />
            <span>Community</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-neutral-900 mb-4">
            I build communities.
          </h2>
          <p className="text-lg text-gray-400 max-w-[44ch] mx-auto">
            Day one of the IBM Z Society was me and two friends.
          </p>
        </Reveal>

        <div className="mt-16 max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, index) => (
            <Reveal key={stat.value} delay={index * 0.08} className="rounded-xl bg-[#F6F5F4] p-6 sm:p-8">
              <div className="text-3xl sm:text-5xl font-semibold tracking-tight text-neutral-900">{stat.value}</div>
              <p className="mt-3 text-sm sm:text-base text-black/60 leading-relaxed">{stat.label}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 text-center">
          <Link href="/projects/ibm-z-society" className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900">
            The IBM Z story, from #1 ambassador to the Datathon
            <span aria-hidden>→</span>
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
