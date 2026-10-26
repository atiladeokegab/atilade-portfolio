---
title: "Night Shift: Mubit Hackathon"
description: "2nd place in the side challenge and 4th on the main track. Two builds in one weekend: Touchline, live sport described aloud for blind fans, and Sapling, a gate that checks what an AI says it changed in COBOL."
tags: ["Hackathon", "AI", "Python", "FastAPI", "ElevenLabs", "Z3", "London"]
images: ["/demos/touchline.mp4", "/demos/sapling.mp4", "/events/touchline-eyes-closed.png", "/events/touchline-phone.png", "/events/sapling-portal.png"]
layout: "imageRight"
date: "2026-10-23"
brandIcon:
category: "hackathon"
hackathonName: "Night Shift: Mubit Hackathon"
displayDate: "October 2026"
priority: 1
liveUrl: "https://night-shift-5zvig7nbvq-ew.a.run.app"
githubUrl: "https://github.com/atiladeokegab/night-shift"
awards:
  - label: "2nd Place, Side Challenge"
    variant: "silver"
  - label: "4th, Main Track"
    variant: "special"
---

# Night Shift: Mubit Hackathon

London, 23 to 25 October 2026. Two builds, two placings.

## Touchline (main track, 4th)

Touchline calls a match aloud for fans who can't see it. Every line is checked against the match data before it goes on air: the score, the leader, the numbers. If a line is wrong it gets one retry, then falls back to a line written straight from the data.

- Two voices, play-by-play and analyst, through ElevenLabs
- "Close your eyes" mode: the picture goes black and only the called line stays on screen
- A producer's fix to one line trains the checker through Mubit, so the same mistake doesn't happen twice
- Four sports, replayed as if live over real broadcast highlights

## Sapling (side challenge, 2nd)

An AI tool says what its COBOL edit does. Sapling checks that description against a bank's change policy and a Z3 proof, and a command-line gate turns the ruling into BLOCK, HOLD or PASS.

- 87% agreement with ground truth on 180 held-out cases, against 67% for the proof alone
- Built on Refinery as the fact-finder

[Sapling on GitHub](https://github.com/atiladeokegab/sapling-cobol-gate)

## Stack

Python, FastAPI, ElevenLabs, Mubit, SurrealDB, Z3, Cloud Run.
