import { Inter } from "next/font/google"
import Image from "next/image"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
})

const NextJsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" className="w-3.5 h-3.5">
    <path d="M64 0C28.7 0 0 28.7 0 64s28.7 64 64 64c11.2 0 21.7-2.9 30.8-7.9L48.4 55.3v36.6h-6.8V41.8h6.8l50.5 75.8C116.4 106.2 128 86.5 128 64c0-35.3-28.7-64-64-64zm22.1 84.6l-7.5-11.3V41.8h7.5v42.8z" />
  </svg>
)

const PostgreSQLIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" className="w-3.5 h-3.5">
    <path d="M93.809 92.112c.785-6.533.55-7.492 5.416-6.433l1.235.108c3.742.17 8.637-.602 11.513-1.938 6.191-2.873 9.861-7.668 3.758-6.409-13.924 2.873-14.881-1.842-14.881-1.842 14.703-21.815 20.849-49.508 15.543-56.287-14.47-18.489-39.517-9.746-39.936-9.52l-.134.025c-2.751-.571-5.83-.912-9.289-.968-6.301-.104-11.082 1.652-14.709 4.402 0 0-44.683-18.409-42.604 23.151.442 8.841 12.672 66.898 27.26 49.362 5.332-6.412 10.484-11.834 10.484-11.834 2.558 1.699 5.622 2.567 8.834 2.255l.249-.212c-.078.796-.044 1.575.099 2.497-3.757 4.199-2.653 4.936-10.166 6.482-7.602 1.566-3.136 4.355-.221 5.084 3.535.884 11.712 2.136 17.238-5.598l-.22.882c1.474 1.18 1.375 8.477 1.583 13.69.209 5.214.558 10.079 1.621 12.948 1.063 2.868 2.317 10.256 12.191 8.14 8.252-1.764 14.561-4.309 15.136-27.985" />
    <path
      fill="#336791"
      d="M115.731 77.44c-13.925 2.873-14.882-1.842-14.882-1.842 14.703-21.816 20.849-49.51 15.545-56.287C101.924.823 76.875 9.566 76.457 9.793l-.135.024c-2.751-.571-5.83-.911-9.291-.967-6.301-.103-11.08 1.652-14.707 4.402 0 0-44.684-18.408-42.606 23.151.442 8.842 12.672 66.899 27.26 49.363 5.332-6.412 10.483-11.834 10.483-11.834 2.559 1.699 5.622 2.567 8.833 2.255l.25-.212c-.078.796-.042 1.575.1 2.497-3.758 4.199-2.654 4.936-10.167 6.482-7.602 1.566-3.136 4.355-.22 5.084 3.534.884 11.712 2.136 17.237-5.598l-.221.882c1.473 1.18 2.507 7.672 2.334 13.557-.174 5.885-.29 9.926.871 13.082 1.16 3.156 2.316 10.256 12.192 8.14 8.252-1.768 12.528-6.351 13.124-13.995.422-5.435 1.377-4.631 1.438-9.49l.767-2.3c.884-7.367.14-9.743 5.225-8.638l1.235.108c3.742.17 8.639-.602 11.514-1.938 6.19-2.871 9.861-7.667 3.758-6.408z"
    />
  </svg>
)

export default function Component() {
  return (
    <div className={`${inter.className} bg-white text-gray-900 p-6 lg:p-12 min-h-screen`}>
      <div className="max-w-7xl mx-auto space-y-20 lg:space-y-24">
        {/* SpeakWisely Case Study */}
        <div className="bg-gray-50/50 border-gray-100 rounded-xl p-8 lg:p-12 shadow-md border">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center">
            {/* Content - Mobile First, Desktop Second */}
            <div className="space-y-6 lg:space-y-8 order-1 lg:order-1 text-left lg:col-span-2 flex flex-col justify-center py-8 lg:py-12">
              <h2 className="text-4xl lg:text-5xl font-semibold tracking-tight">SpeakWisely</h2>
              <p className="text-gray-600 leading-relaxed max-w-md text-base">
                AI-powered instant personalized feedback, and structured practice for IELTS Speaking.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-gray-50 text-gray-700 text-xs font-medium rounded-lg px-3 py-1.5 border border-gray-200 flex items-center gap-1.5">
                  <NextJsIcon />
                  Next.js
                </span>
                <span className="bg-gray-50 text-gray-700 text-xs font-medium rounded-lg px-3 py-1.5 border border-gray-200">
                  React
                </span>
                <span className="bg-gray-50 text-gray-700 text-xs font-medium rounded-lg px-3 py-1.5 border border-gray-200">
                  TypeScript
                </span>
                <span className="bg-gray-50 text-gray-700 text-xs font-medium rounded-lg px-3 py-1.5 border border-gray-200">
                  Tailwind CSS
                </span>
                <span className="bg-gray-50 text-gray-700 text-xs font-medium rounded-lg px-3 py-1.5 border border-gray-200">
                  OpenAI API
                </span>
              </div>
            </div>

            {/* Media - Mobile Second, Desktop First */}
            <div className="relative order-2 lg:order-2 lg:col-span-3 p-0">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] w-full h-full min-h-[300px] lg:min-h-[400px]">
                <Image
                  src="/placeholder.svg?height=360&width=640"
                  alt="SpeakWisely project screenshot"
                  width={640}
                  height={360}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* StudyMapper Case Study */}
        <div className="bg-gray-50/50 border border-gray-100 rounded-xl p-8 lg:p-12 shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center">
            {/* Content - Mobile First, Desktop Second */}
            <div className="space-y-6 lg:space-y-8 order-1 lg:order-2 text-left lg:col-span-2 flex flex-col justify-center py-8 lg:py-12">
              <h2 className="text-4xl lg:text-5xl font-semibold tracking-tight">StudyMapper</h2>
              <p className="text-gray-600 leading-relaxed max-w-md text-base">
                Designed and coded 2 web apps. Working together for some time now and planning to do more big projects.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-gray-50 text-gray-700 text-xs font-medium rounded-lg px-3 py-1.5 border border-gray-200 flex items-center gap-1.5">
                  <NextJsIcon />
                  Next.js
                </span>
                <span className="bg-gray-50 text-gray-700 text-xs font-medium rounded-lg px-3 py-1.5 border border-gray-200">
                  Supabase
                </span>
                <span className="bg-gray-50 text-gray-700 text-xs font-medium rounded-lg px-3 py-1.5 border border-gray-200">
                  React
                </span>
                <span className="bg-gray-50 text-gray-700 text-xs font-medium rounded-lg px-3 py-1.5 border border-gray-200">
                  Tailwind CSS
                </span>
                <span className="bg-gray-50 text-gray-700 text-xs font-medium rounded-lg px-3 py-1.5 border border-gray-200 flex items-center gap-1.5">
                  <PostgreSQLIcon />
                  PostgreSQL
                </span>
              </div>
            </div>

            {/* Media - Mobile Second, Desktop First */}
            <div className="relative order-2 lg:order-1 lg:col-span-3 p-0">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] w-full h-full min-h-[300px] lg:min-h-[400px] bg-gray-50 p-1">
                <Image
                  src="/placeholder.svg?height=360&width=640"
                  alt="StudyMapper dashboard interface screenshot"
                  width={640}
                  height={360}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
