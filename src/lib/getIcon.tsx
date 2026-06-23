import { Icon } from "@iconify/react"
import { NextJsIcon } from "@/components/icons/NextJsIcon"
import { PostgreSQLIcon } from "@/components/icons/PostgreSQLIcon"
import { SupabaseIcon } from "@/components/icons/SupabaseIcon"
import { ReactIcon } from "@/components/icons/ReactIcon"
import TypeScriptIcon from "@/components/icons/TypeScriptIcon"
import TailwindCSSIcon from "@/components/icons/TailwindCSSIcon"
import OpenAIIcon from "@/components/icons/OpenAIIcon";
import MongoIcon from "@/components/icons/MongoIcon";
import GoogleAnalytics from "@/components/icons/GoogleAnalytics"
import MapBoxIcon from "@/components/icons/MapBox"
import ClerkIcon from "@/components/icons/ClerkIcon"
import PartyKitIcon from "@/components/icons/PartyKitIcon"
import AwsIcon from "@/components/icons/AwsIcon"
import {
  GithubIcon,
  PythonIcon,
  JavaScriptIcon,
  JavaIcon,
  HtmlIcon,
  DockerIcon,
  GitIcon,
  GitlabIcon,
  LinuxIcon,
  WindowsIcon,
  AwsFontAwesomeIcon
} from "@/components/FontAwesomeIcons"

// Iconify wrapper for consistent sizing
const IconifyIcon = ({ icon }: { icon: string }) => (
  <Icon icon={icon} className="w-4 h-4" />
)

export function getIcon(tag: string) {
    switch (tag) {
        case "Next.js":
            return <NextJsIcon />;
        case "React":
            return <ReactIcon />;
        case "TypeScript":
            return <TypeScriptIcon />;
        case "Supabase":
            return <SupabaseIcon />;
        case "PostgreSQL":
            return <PostgreSQLIcon />;
        case "Tailwind CSS":
            return <TailwindCSSIcon />;
        case "OpenAI":
            return <OpenAIIcon />;
        case "Whisper":
            return <OpenAIIcon />;
        case "MongoDB":
            return <MongoIcon />;
        case "Google Analytics":
            return <GoogleAnalytics />;
        case "Mapbox GL":
            return <MapBoxIcon/>;
        case "Clerk":
            return <ClerkIcon />;
        case "PartyKit":
            return <PartyKitIcon/>;
        case "Amazon EC2":
            return <AwsIcon />;
        case "GitHub":
            return <GithubIcon />;
        case "Python":
            return <PythonIcon />;
        case "JavaScript":
            return <JavaScriptIcon />;
        case "Java":
            return <JavaIcon />;
        case "HTML/CSS":
            return <HtmlIcon />;
        case "Docker":
            return <DockerIcon />;
        case "Git":
            return <GitIcon />;
        case "GitLab":
            return <GitlabIcon />;
        case "Linux":
            return <LinuxIcon />;
        case "Windows":
            return <WindowsIcon />;
        case "AWS":
            return <AwsFontAwesomeIcon />;
        // Iconify icons for additional technologies
        case "Flask":
            return <IconifyIcon icon="simple-icons:flask" />;
        case "SQLAlchemy":
            return <IconifyIcon icon="simple-icons:sqlalchemy" />;
        case "REST API":
            return <IconifyIcon icon="mdi:api" />;
        case "Radix UI":
            return <IconifyIcon icon="simple-icons:radixui" />;
        case "Recharts":
            return <IconifyIcon icon="mdi:chart-line" />;
        case "TanStack Table":
            return <IconifyIcon icon="mdi:table" />;
        case "Mapbox":
            return <IconifyIcon icon="simple-icons:mapbox" />;
        case "Framer Motion":
            return <IconifyIcon icon="simple-icons:framer" />;
        case "Zod":
            return <IconifyIcon icon="simple-icons:zod" />;
        case "Vercel":
            return <IconifyIcon icon="simple-icons:vercel" />;
        case "Cloudflare":
            return <IconifyIcon icon="simple-icons:cloudflare" />;
        case "Redis":
            return <IconifyIcon icon="simple-icons:redis" />;
        case "GraphQL":
            return <IconifyIcon icon="simple-icons:graphql" />;
        case "Prisma":
            return <IconifyIcon icon="simple-icons:prisma" />;
        case "Node.js":
            return <IconifyIcon icon="simple-icons:nodedotjs" />;
        case "Express":
            return <IconifyIcon icon="simple-icons:express" />;
        case "Firebase":
            return <IconifyIcon icon="simple-icons:firebase" />;
        case "Stripe":
            return <IconifyIcon icon="simple-icons:stripe" />;
        // Languages
        case "C++":
            return <IconifyIcon icon="simple-icons:cplusplus" />;
        case "C":
            return <IconifyIcon icon="simple-icons:c" />;
        case "SQL":
            return <IconifyIcon icon="mdi:database" />;
        case "MySQL":
            return <IconifyIcon icon="simple-icons:mysql" />;
        case "SQLite":
            return <IconifyIcon icon="simple-icons:sqlite" />;
        // Tools & Frameworks
        case "Qt":
            return <IconifyIcon icon="simple-icons:qt" />;
        case "LaTeX":
            return <IconifyIcon icon="simple-icons:latex" />;
        default:
            return null;
    }
}
