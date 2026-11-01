---
title: "Strata"
description: "Tower Bridge rebuilt from real Environment Agency LiDAR and Google's photoreal 3D tiles. Drag a year slider from 1886 to today, raise the bascules, tap any part for its sources. Built in one day with AI agents."
tags: ["Hackathon", "AI", "OpenAI", "Codex", "3D", "LiDAR", "SurrealDB", "London"]
images: ["/events/strata-2026.webp", "/demos/strata.mp4", "/events/strata-1890.webp", "/events/strata-construction.webp", "/events/strata-part.webp", "/events/strata-phone.webp"]
layout: "imageRight"
date: "2026-11-01"
brandIcon:
category: "hackathon"
hackathonName: "DevDay Community Hackathon London"
displayDate: "November 2026"
priority: 1
liveUrl: "https://strata-901257379404.europe-west2.run.app"
githubUrl: "https://github.com/atiladeokegab/strata"
---

# Strata, DevDay Community Hackathon London

**[Try it live →](https://strata-901257379404.europe-west2.run.app)**

History is text and flat photos. You can't watch a landmark being built. Strata lets you.

It rebuilds Tower Bridge from real UK Environment Agency LiDAR and Google's photoreal 3D tiles, then lets you move through time.

- A year slider from 1886 to today: the construction stages, an 1890s Ordnance Survey map, 1940, and the bridge now
- An exploded view that pulls the bridge apart
- Hydraulic bascules driven by a simulation, not an animation
- Tap any part to see what it is and where that comes from
- A docent that only answers with cited sources, through OpenAI
- A 60 second guided story, search, a phone layout and a lite tier for slow devices

[Watch the demo film](https://drive.google.com/file/d/1uNi3PW-jJgSrKpRLj1RA3SoMRMLxtWnQ/view?usp=sharing)

## How it was built

One day, London, 1 November 2026. I led a team of AI agents. Codex agents built the SurrealDB history graph, the validator that checks every fact has a source, and the docent.

## Stack

Three.js, Google photoreal 3D tiles, Environment Agency LiDAR, SurrealDB, OpenAI, Codex, Cloud Run.
