---
title: "UAV Path Planning over LoRaWAN"
description: "DQN agent with original curriculum learning and cross-attention sensor encoding that outperformed greedy baselines for autonomous IoT data collection. High first-class grade."
tags: ["Python", "PyTorch", "Stable-Baselines3", "Gymnasium", "LoRaWAN", "Deep RL"]
images: ["/events/uav.png"]
youtube: "rfLI5Z3S9cs"
layout: "imageRight"
date: "2026-05-01"
brandIcon:
category: "project"
priority: 3
githubUrl: "https://github.com/atiladeokegab/Dynamic-UAV-Energy-Efficient-Path-Planning-in-IoT-Sensor-Networks"
---

# UAV Path Planning with Deep Q-Networks

Final year project, BEng Electrical Engineering, University of Manchester. Graded 86. Watch the walkthrough above.

A DQN agent flies a UAV over a 2D grid to collect data from LoRa IoT sensors, balancing throughput, energy, and coverage fairness.

## What I built

- Custom Gymnasium environment simulating LoRaWAN physics (Two-Ray path loss, EMA-ADR, AoI)
- DQN with domain randomisation across 16 environment conditions
- Competence-based curriculum learning (NDR >= 95%, Jain fairness >= 0.85)
- 4-frame state stacking with cross-attention sensor encoding
- Full ablation study (A1-A4) with Welch t-tests vs baselines

## Results

- 100% sensor coverage, matching the greedy oracle baseline
- 72,590 bytes collected per episode
- Cohen d = 1.43 vs combined ablation
- High first-class grade

## Stack

Python 3.11, Stable-Baselines3, PyTorch, Gymnasium, Matplotlib, Seaborn.
