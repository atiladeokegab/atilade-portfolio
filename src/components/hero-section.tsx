import StyledBlurText from './ui/StyledBlurText'
import Image from 'next/image'

const icons = {
    manchester: {
        src: "/landing/manchester.png",
        alt: "University of Manchester",
        className: "inline-block h-[1.8em] w-[1.8em] align-[-0.45em] mr-[0.15em] object-contain",
    },
    refinery: {
        src: "/landing/refinery-mark.jpg",
        alt: "Refinery",
        className: "inline-block h-[1em] w-[1em] align-[-0.15em] ml-[0.25em] mr-[0.25em] object-contain rounded-sm",
    },
}

const mobileSegments = [
    { text: "Electrical Engineering" },
    { text: "@", className: "text-gray-400 text-[0.7em] align-[0.15em]" },
    { text: "Manchester", icon: icons.manchester, lineBreak: true },
    { text: "Founder" },
    { text: "@", className: "text-gray-400 text-[0.7em] align-[0.15em]" },
    { text: "Refinery", icon: icons.refinery, lineBreak: true },
    { text: "IBM Z Ambassador", className: "" },
    { text: "#1", className: "text-gray-400" },
    { text: "Worldwide" },
]

const desktopSegments = [
    { text: "Atilade studies", className: "text-gray-400" },
    { text: "Electrical Engineering" },
    { text: "@", className: "text-gray-400 text-[0.7em] align-[0.15em]" },
    { text: "Manchester", icon: icons.manchester, lineBreak: true },
    { text: "Currently", className: "text-gray-400" },
    { text: "Founder" },
    { text: "@", className: "text-gray-400 text-[0.7em] align-[0.15em]" },
    { text: "Refinery", className: "font-[family-name:var(--font-space-grotesk)] tracking-normal", icon: icons.refinery, lineBreak: true },
    { text: "IBM Z Student Ambassador", className: "" },
    { text: "#1", className: "text-gray-400" },
    { text: "Worldwide" },
]

export default function HeroSection() {
    return (
        <section>
            <div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 pt-10 sm:pt-6 md:pt-8">
                <div className="relative text-center mb-3 sm:mb-4 md:mb-6">
                    <StyledBlurText
                        as="div"
                        segments={mobileSegments}
                        delay={100}
                        animateBy="words"
                        direction="bottom"
                        className="block sm:hidden mx-auto text-[clamp(1.125rem,5.5vw,1.75rem)] font-semibold tracking-tight leading-[1.4] text-gray-900 whitespace-nowrap"
                    />
                    <StyledBlurText
                        segments={desktopSegments}
                        delay={100}
                        animateBy="words"
                        direction="bottom"
                        className="hidden sm:block mx-auto mt-2 sm:text-xl md:text-3xl lg:text-5xl font-semibold tracking-tight sm:leading-[1.3] md:leading-[1.35] lg:leading-[1.4] text-gray-900 whitespace-nowrap"
                    />
                </div>
            </div>
        </section>
    )
}
