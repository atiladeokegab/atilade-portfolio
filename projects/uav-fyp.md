---
title: "UAV Path Planning over LoRaWAN"
description: "DQN agent with original curriculum learning and cross-attention sensor encoding that outperformed greedy baselines for autonomous IoT data collection. High first-class grade."
tags: ["Python", "PyTorch", "Stable-Baselines3", "Gymnasium", "LoRaWAN", "Deep RL"]
images: ["/events/uav.png"]
layout: "imageRight"
date: "2026-05-01"
brandIcon:
category: "project"
priority: 3
---

# UAV Path Planning with Deep Q-Networks

## Overview

BEng Electrical Engineering Final Year Project at the University of Manchester. A Deep Q-Network (DQN) agent learns to fly a UAV over a 2D grid to collect data from LoRa IoT sensors, optimising for data throughput, energy efficiency, and fairness.

## What I Built

- Custom Gymnasium environment simulating LoRaWAN physics (Two-Ray path loss, EMA-ADR, AoI)
- DQN agent with domain randomisation across 16 environment conditions
- Competence-based curriculum learning (NDR >= 95%, Jain fairness >= 0.85)
- 4-frame state stacking with cross-attention-inspired sensor encoding
- Full ablation study (A1-A4) with Welch t-tests vs baselines

## Results

- 100% sensor coverage matching the oracle greedy baseline
- 72,590 bytes collected per episode
- Cohen d = 1.43 vs combined ablation across fairness and efficiency metrics
- High first-class grade

## Stack

Python 3.11, Stable-Baselines3, PyTorch, Gymnasium, Matplotlib, Seaborn.
