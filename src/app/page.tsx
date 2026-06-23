import { getProjectsData } from "@/lib/projects";
import HomePage from "./HomePage";

export default function Home() {
  const projects = getProjectsData();
  return <HomePage projects={projects} />;
}
