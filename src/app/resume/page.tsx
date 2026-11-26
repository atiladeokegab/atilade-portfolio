import type { Metadata } from "next";
import { IconDownload, IconExternalLink } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

const PDF = "/Atilade_Oke_CV.pdf";

export const metadata: Metadata = {
  title: "Resume | Atilade Oke",
  description: "Atilade Oke's latest resume, as a PDF.",
};

export default function Resume() {
  return (
    <main className="bg-white pt-24 pb-16 sm:pt-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium text-neutral-500">Resume</p>
            <h1 className="mt-3 text-4xl sm:text-5xl font-semibold tracking-tight text-neutral-900">Atilade Oke</h1>
            <p className="mt-2 text-lg sm:text-xl text-neutral-500">Analyst, Data &amp; AI at ION · Founder of Refinery</p>
            <p className="mt-2 text-base sm:text-lg text-neutral-500">Last Updated: Nov 2026</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="tactile-black" size="lg" asChild>
              <a href={PDF} download="Atilade_Oke_CV.pdf" className="inline-flex items-center gap-2">
                <IconDownload className="size-5" aria-hidden />
                Download PDF
              </a>
            </Button>
            <Button variant="tactile-secondary" size="lg" asChild>
              <a href={PDF} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                <IconExternalLink className="size-5" aria-hidden />
                Open in New Tab
              </a>
            </Button>
          </div>
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl bg-neutral-800 shadow-xl ring-1 ring-black/10">
          {/* Phones that can't show a PDF inline get the fallback link instead. */}
          <object data={`${PDF}#view=FitH&navpanes=0`} type="application/pdf" className="block h-[85vh] min-h-[640px] w-full" aria-label="Atilade Oke's resume">
            <div className="flex h-64 flex-col items-center justify-center gap-3 text-neutral-200">
              <p>Your browser can&apos;t show the PDF here.</p>
              <a href={PDF} className="underline underline-offset-4">Open the resume</a>
            </div>
          </object>
        </div>
      </div>
    </main>
  );
}
