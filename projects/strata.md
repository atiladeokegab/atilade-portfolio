---
title: "Strata"
description: "Tower Bridge rebuilt from real Environment Agency LiDAR and Google's photoreal 3D tiles. Drag a year slider from 1886 to today, raise the bascules, tap any part for its sources. Built in one day with AI agents, and picked out by a DevDay London judge as one of the top projects."
tags: ["Hackathon", "AI", "OpenAI", "Codex", "3D", "LiDAR", "SurrealDB", "London"]
images: ["/events/strata-2026.webp", "/demos/strata.mp4", "/events/strata-construction.webp", "/events/strata-part.webp", "/events/strata-phone.webp"]
layout: "imageRight"
date: "2026-11-01"
brandIcon:
category: "hackathon"
hackathonName: "DevDay Community Hackathon London"
displayDate: "November 2026"
priority: 1
# shortcut: tagged build until the promote, then switch back to the live URL (https://strata-901257379404.europe-west2.run.app)
liveUrl: "https://next18---strata-5zvig7nbvq-nw.a.run.app"
githubUrl: "https://github.com/atiladeokegab/strata"
# shortcut: tagged build until the promote, then switch back to the live URL
embedUrl: "https://next18---strata-5zvig7nbvq-nw.a.run.app/?embed=1"
# The submitted demo film; build-gpu's film of the final build replaces it (a local .mp4 plays inline)
film: "https://drive.google.com/file/d/1uNi3PW-jJgSrKpRLj1RA3SoMRMLxtWnQ/view?usp=sharing"
filmPoster: "/events/strata-film-poster.webp"
filmLabel: "Watch the 90 s demo film"
---

# Strata, DevDay Community Hackathon London

History is text and flat photos. You can't watch a landmark being built. Strata lets you.

It rebuilds Tower Bridge from real UK Environment Agency LiDAR and Google's photoreal 3D tiles, then lets you move through time.

## Try it

**[Try it live →](https://next18---strata-5zvig7nbvq-nw.a.run.app)**

- A year slider from 1886 to today: the construction stages, an 1890s Ordnance Survey map, 1940, and the bridge now
- An exploded view that pulls the bridge apart
- Hydraulic bascules driven by a simulation, not an animation
- Tap any part to see what it is and where that comes from
- A docent that only answers with cited sources, through OpenAI
- A 60 second guided story, search, a phone layout and a lite tier for slow devices

## What the judges saw

One of the DevDay London judges picked Strata out as one of the top projects.

The judges saw the 90 second demo film I submitted. [Watch the demo film](https://drive.google.com/file/d/1uNi3PW-jJgSrKpRLj1RA3SoMRMLxtWnQ/view?usp=sharing)

## How it was built

![How Strata was built: the data contract, LiDAR to bare earth, a procedural bridge, the hydraulic sim, the eras, Google tiles with the bridge cut out, the cited docent, and tag, GPU stills, promote](/projects/strata/workflow.svg "diagram")

## Stack

Three.js, Google photoreal 3D tiles, Environment Agency LiDAR, SurrealDB, OpenAI, Codex, Cloud Run.
