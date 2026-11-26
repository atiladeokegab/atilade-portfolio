import { IBM_Plex_Mono } from "next/font/google";

// The job deck's voice: IBM's own mono for JCL step names and return codes only.
export const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
});
