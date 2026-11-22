---
title: "Preflight: SoTA Scientific Parallelism Hackathon"
description: "3rd place, £1,000. Simulates a cancer biomarker trial cell by cell on real patient tissue before a lab stains a slide: 10,800× faster than off-the-shelf squidpy + lifelines on one H100, and it shows textbook trial maths promising 80% power where real tissue gives 27%."
tags: ["Hackathon", "GPU", "CUDA", "Spatial Biology", "Survival Analysis", "London"]
images: ["/demos/preflight-race.mp4", "/events/preflight-race.webp", "/events/preflight-ihc.webp"]
layout: "imageRight"
date: "2026-11-22"
brandIcon:
category: "hackathon"
hackathonName: "SoTA Scientific Parallelism Hackathon"
displayDate: "November 2026"
priority: 1
awards:
  - label: "3rd Place, £1,000"
    variant: "bronze"
---

# Preflight

SoTA Scientific Parallelism Hackathon, King's Cross, London, 21–22 November 2026. **3rd place, £1,000.**

Spatial biomarker trials stain real patient tissue for months, then often find nothing. Preflight tells a lab before it stains whether the study can work.

For every candidate stain panel it simulates a thousand clinical studies cell by cell on real biopsies, adding the cell mis-calls of hospital imaging, then counts each cell's neighbours and scores survival.

- **10,800× faster per study:** 22.35 s with off-the-shelf squidpy + lifelines on 8 CPU workers, 0.00207 s for our fused kernel on one H100. 253,000 simulated studies drop from about 65 days to under 9 minutes.
- **One fused pass:** re-imaging, neighbour counting and scoring in one kernel, one GPU thread per tissue region, 3,000 studies in a single launch, bit-identical to the CPU.
- **The science:** for a 200-patient trial the textbook formula promises 80% power; on real tissue with hospital noise it is 27%, with false alarms held near 5%.

## Stack

Python, Numba and Numba CUDA on an NVIDIA H100, squidpy and lifelines as baselines, Modal, Google Cloud Run.
