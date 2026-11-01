---
title: "Strata"
description: "Tower Bridge rebuilt from real Environment Agency LiDAR and Google's photoreal 3D tiles. Drag a year slider from 1886 to today, raise the bascules, tap any part for its sources. Built in one day with AI agents, and singled out by a DevDay judge as one of the top projects."
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
embedUrl: "https://strata-901257379404.europe-west2.run.app/?embed=1&lite=1"
film: "TODO" # TODO: build-gpu's film of the final build, e.g. /demos/strata-film.mp4 with a strata-film.jpg poster
workflow:
  - from: "Environment Agency 1 m LiDAR and Google Photorealistic 3D Tiles"
    to: "The ground and the city"
    detail: "1.5 km of real surveyed terrain around the bridge, with London standing on it."
  - from: "25 bridge parts, each with its sources"
    to: "A procedural Tower Bridge"
    detail: "Every mesh is named by its part, so the bridge can explode, x-ray and answer a tap with where each figure comes from."
  - from: "Dated events and maps, 1886 to today"
    to: "Eras on a slider"
    detail: "The bridge rises from its piers, the ground becomes the 1890s OS map, and buildings return in the year they stood."
  - from: "The bridge's weighted-accumulator hydraulics"
    to: "A bascule simulation"
    detail: "The leaves lift on simulated pressure, with a live readout, traffic held at the gates and a ship that waits for them."
  - from: "A SurrealDB history graph, 24 sources"
    to: "A docent that cites"
    detail: "Answers stream with a citation for every fact, and it refuses anything it can't source."
  - from: "Every new build"
    to: "GPU-verified deploys"
    detail: "Rendered on a cloud GPU and checked from its stills before it went live."
workflowTeam: "A team of AI agents built it in one day, with me directing. Codex agents built the history graph, its validator and the docent."
---

# Strata, DevDay Community Hackathon London

**[Try it live →](https://strata-901257379404.europe-west2.run.app)**

History is text and flat photos. You can't watch a landmark being built. Strata lets you.

One of the DevDay judges singled Strata out as one of the top projects of the day.

It rebuilds Tower Bridge from real UK Environment Agency LiDAR and Google's photoreal 3D tiles, then lets you move through time.

- A year slider from 1886 to today: the construction stages, an 1890s Ordnance Survey map, 1940, and the bridge now
- An exploded view that pulls the bridge apart
- Hydraulic bascules driven by a simulation, not an animation
- Tap any part to see what it is and where that comes from
- A docent that only answers with cited sources, through OpenAI
- A 60 second guided story, search, a phone layout and a lite tier for slow devices

[Watch the demo film](https://drive.google.com/file/d/1uNi3PW-jJgSrKpRLj1RA3SoMRMLxtWnQ/view?usp=sharing)

## Stack

Three.js, Google photoreal 3D tiles, Environment Agency LiDAR, SurrealDB, OpenAI, Codex, Cloud Run.
