// src/components/FontAwesomeIcons.tsx
"use client";

import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSquareGithub, 
  faLinkedin, 
  faSquareInstagram, 
  faSquareYoutube,
  faPython,
  faJs,
  faJava,
  faHtml5,
  faCss3Alt,
  faDocker,
  faGitAlt,
  faGitlab,
  faLinux,
  faWindows,
  faAws
} from '@fortawesome/free-brands-svg-icons';

export const GithubIcon = () => <FontAwesomeIcon icon={faSquareGithub} />;
export const LinkedInIcon = () => <FontAwesomeIcon icon={faLinkedin} />;
export const InstagramIcon = () => <FontAwesomeIcon icon={faSquareInstagram} />;
export const YoutubeIcon = () => <FontAwesomeIcon icon={faSquareYoutube} />;

// Language Icons
export const PythonIcon = () => <FontAwesomeIcon icon={faPython} />;
export const JavaScriptIcon = () => <FontAwesomeIcon icon={faJs} />;
export const JavaIcon = () => <FontAwesomeIcon icon={faJava} />;
export const HtmlIcon = () => <FontAwesomeIcon icon={faHtml5} />;
export const CssIcon = () => <FontAwesomeIcon icon={faCss3Alt} />;

// Developer Tools & Platforms Icons
export const DockerIcon = () => <FontAwesomeIcon icon={faDocker} />;
export const GitIcon = () => <FontAwesomeIcon icon={faGitAlt} />;
export const GitlabIcon = () => <FontAwesomeIcon icon={faGitlab} />;
export const LinuxIcon = () => <FontAwesomeIcon icon={faLinux} />;
export const WindowsIcon = () => <FontAwesomeIcon icon={faWindows} />;
export const AwsFontAwesomeIcon = () => <FontAwesomeIcon icon={faAws} />;

