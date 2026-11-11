---
title: "Red String: Agentic Web Hackathon"
description: "Won · £250,000 in credits. 5 block detectives read the web live in a 3D block town; a red string means the sources disagree. Stacks checkable claims into rising towers and catches live contradictions with side-by-side literal quotes."
tags: ["Hackathon", "AI Agents", "Parallel", "Three.js", "Web Speech API", "London"]
images: ["/events/red-string-world.webp", "/events/red-string-verdict.webp", "/events/red-string-evidence.webp"]
layout: "imageRight"
date: "2026-11-11"
brandIcon:
category: "hackathon"
hackathonName: "The Agentic Web Hackathon (Parallel)"
displayDate: "November 2026"
priority: 1
githubUrl: "https://github.com/atiladeokegab/red-string"
awards:
  - label: "Won · £250,000 in credits"
    variant: "gold"
---

# Red String

The Agentic Web Hackathon (Parallel), London, 11 November 2026. **Won · £250,000 in credits.**

5 block detectives read the web; a red string means the sources disagree. While other AI tools assume consensus, Red String reads conflicting sources live, stacks checkable facts into rising toy towers on a studded baseplate, and snaps a glowing red thread between contradictory claims.

- **3D Block Town & Newsroom Banter:** Five autonomous block detectives (Identifier, Archivist, Timekeeper, Sceptic, Editor) sprint across the board, chattering aloud via browser speech synthesis with distinct personalities and newsroom banter.
- **Side-by-Side Literal Quotes:** On contradictory claims (like Hurricane Maria's landfall date: climate.gov citing 22 Sep vs NOAA and 15 sources citing 20 Sep), a red string snaps between disagreeing towers. Clicking the board displays side-by-side literal quotes and elevates the primary record in gold.
- **Smart Sceptic Filtering:** Distinguishes genuine contradictions from different event stages (e.g. recognizing official death tolls before and after recount studies as distinct stages rather than false disputes).
- **Parallel Platform Integration:** Leverages Parallel Search for concurrent reporting and primary record discovery, Extract for live re-checking, Task for the Editor's verdict, FindAll for entity disambiguation, and Image Search for board evidence.

## Built by Autonomous Agents

Designed and built in two hours by 5 autonomous AI agents collaborating across 3 model vendors: Anthropic Claude Code, OpenAI Codex, and Google Antigravity.

## How It Uses Parallel

- **Search (`/v1/search`)**: Discovers reporting and primary public records concurrently.
- **Extract (`/v1/extract`)**: Re-checks live pages to verify if corrections or updates have landed.
- **Task (`/v1/tasks`)**: Drives the Editor's structured verdict and schema validation.
- **FindAll (`/v1/findall`)**: Disambiguates entities and resolves the people involved in the story.
- **Image Search (`/v1/images/search`)**: Populates board cards with verified media.

## Stack

Parallel API (Search, Extract, Task, FindAll, Image Search), Three.js, Web Speech API (Speech Recognition & Synthesis), Web Audio API, FastAPI, Python.
