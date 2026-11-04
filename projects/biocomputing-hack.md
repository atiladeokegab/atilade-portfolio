---
title: "Rescue Listener: Biocomputing Hack"
description: "2nd place, and offered a Venture Scout role with Project A. Rescue Listener asks whether a simulated spiking network can tell a trapped survivor's answering knock from the noise of rubble."
tags: ["Hackathon", "Biocomputing", "Neuroscience", "Python", "three.js", "London"]
images: ["/events/rescue-listener-hero-v2.jpg", "/events/rescue-listener-experiment-v2.jpg", "/events/rescue-listener-results-v2.jpg", "/events/rescue-listener-knock-v2.jpg", "/events/biocomputing-hack.jpg"]
layout: "imageRight"
date: "2026-11-03"
brandIcon:
category: "hackathon"
hackathonName: "Biocomputing Hack by Outlier Labs"
displayDate: "November 2026"
priority: 1
githubUrl: "https://github.com/atiladeokegab/rescue-listener"
awards:
  - label: "2nd Place"
    variant: "silver"
  - label: "Venture Scout, Project A"
    variant: "special"
---

# Rescue Listener

Biocomputing Hack by Outlier Labs, London, 3 November 2026. 2nd place, and an offer to join Project A as a Venture Scout.

A survivor under rubble is asked to tap five times. Rescue Listener plays those knocks into a simulated spiking network in a closed loop and asks whether the network can tell an answering knock from the rumble around it. On the night it ran live, in real time, on the organisers' simulator: 64 spiking model neurons, not living cells.

- A 3D rubble scene with a search drone, driven by the network's verdicts
- Calibrate, then knock on the pad: a decoder learns the target rhythm from the network's own responses
- Blind piles: the room picks which piles hide a survivor, and the network's call is revealed after
- A calibration check on every run: the network is scored against shuffled labels and against software reading knock timing alone, so a lucky guess can't pass as a signal

## The experiment

Same final pulse, two different pasts: does the network respond differently? The test was pre-registered and its settings were frozen and hashed before the first trial, so the result could not be tuned after the fact.

- 80 trials in 20 blocks on the live simulator
- Difference D = +3.0 spikes, 95% CI −2.8 to +8.9, p = 0.30
- Reported as found: no history effect detected. Every rerun and the no-network control crossed zero too (chart above)

## Stack

Python, cl-sdk, scikit-learn, three.js.

Scene data: Haiti 2010 earthquake airborne LiDAR (OpenTopography, public domain); aerial imagery World Bank 2010, RIT WASP, via OpenAerialMap (CC BY 4.0); drone model Quadrocopter 2 by yanix (CC BY 4.0); sky by Poly Haven (CC0).
