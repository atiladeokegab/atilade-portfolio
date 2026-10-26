---
title: "Axon"
description: "A camera watches your arm, builds a live 3D model of it, and TENS pads drive the muscle through the right motion while you watch. Stroke rehab, built in a weekend."
tags: ["Hackathon", "Health", "Computer Vision", "Python", "Hardware", "London"]
images: ["/demos/juno.mp4", "/events/axon-twin.png", "/events/axon-flexed.jpeg"]
layout: "imageRight"
date: "2026-07-26"
brandIcon:
category: "hackathon"
hackathonName: "Juno x Anthropic Hackathon"
displayDate: "July 2026"
priority: 1.5
githubUrl: "https://github.com/atiladeokegab/axon"
postUrl: "https://www.linkedin.com/posts/atiladeoke_spent-the-weekend-at-the-juno-yc-p26-x-activity-7488148846829727744-5uOS"
awards:
  - label: "Consumer Health"
    variant: "special"
---

# Axon, Juno (YC P26) x Anthropic Consumer Health Hackathon

London, with Jack Marshall, Faisal Lawan and Siona Heritage.

After a stroke or nerve injury, relearning to move an arm isn't really a strength problem. It's your brain re-finding a pathway it lost. So a camera watches your arm, builds a live 3D model of it on screen, and TENS pads gently drive the muscle through the correct motion while you watch it happen. You pick the motion, the pads do the rest.

## Where to put the pads

People have no idea where to stick TENS pads. So we built a calibration step: take a few photos and it shows you exactly where each pad goes, with a picture pointing at the spot, not "3cm below the elbow".

## Safety first

It's real current going into a real arm. The hardware physically can't fire without multiple checks passing, intensity and duration are hard-capped, and it stops the second anything disconnects or errors. Those limits live on the microcontroller, independent of the software.

## My part

Software and the computer vision model. Jack and Faisal on hardware, Siona on pad-placement research and the frontend.

## Stack

Python, pose estimation, PI control, microcontroller firmware, FastAPI.
