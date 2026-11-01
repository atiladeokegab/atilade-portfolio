import { ArrowDown, ArrowRight } from "lucide-react"

export type BuildStep = { from: string; to: string; detail: string }

// "Source → what it became" rows: a diagram of how a project was built, from frontmatter `workflow`.
export default function BuildFlow({ steps, team }: { steps: BuildStep[]; team?: string }) {
  return (
    <section id="how-it-was-built" className="mb-8 md:mb-12 bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 shadow-sm border border-gray-200 scroll-mt-24">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">How it was built</h2>
      <ol className="space-y-3">
        {steps.map((step, i) => (
          <li key={step.to} className="grid grid-cols-1 md:grid-cols-[minmax(0,2fr)_auto_minmax(0,3fr)] items-center gap-2 md:gap-4">
            <div className="flex items-center gap-3 rounded-lg border border-dashed border-gray-300 bg-gray-50 px-3 py-2.5 text-sm text-gray-600">
              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-gray-900 text-xs font-semibold text-white">{i + 1}</span>
              {step.from}
            </div>
            <ArrowRight aria-hidden className="hidden md:block h-4 w-4 text-gray-400" />
            <ArrowDown aria-hidden className="md:hidden mx-auto h-4 w-4 text-gray-400" />
            <div className="rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-sm">
              <div className="font-semibold text-gray-900">{step.to}</div>
              <div className="mt-0.5 text-sm leading-relaxed text-gray-600">{step.detail}</div>
            </div>
          </li>
        ))}
      </ol>
      {team && (
        <div className="mt-6 rounded-lg bg-gray-900 px-4 py-4 sm:px-6 text-sm sm:text-base leading-relaxed text-white">
          {team}
        </div>
      )}
    </section>
  )
}
