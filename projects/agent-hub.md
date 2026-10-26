---
title: "Agent Hub"
description: "My own harness for running a team of AI coding agents: a shared task board, direct messaging between Claude Code and Codex sessions, review gates, and an always-on cloud host."
tags: ["AI Agents", "Claude Code", "Codex", "Python", "GCP"]
images: ["/events/hub.jpg"]
layout: "imageLeft"
date: "2026-10-01"
brandIcon:
category: "project"
priority: 2
githubUrl: "https://github.com/atiladeokegab/my_harness"
---

# Agent Hub

I build most things now with a team of agents. This is the harness that runs them.

## What it does

- One durable task board, one owner per file, so agents don't trip over each other
- Named sessions that message each other directly, across Claude Code and Codex
- A lead plans and reviews, workers build, a reviewer checks every PR before it merges
- Runs always-on on a cloud VM, so the team keeps working when my laptop is shut

## Hackathon teamwork

[hackathon_teamwork](https://github.com/atiladeokegab/hackathon_teamwork) is the public template I bring to team events: every task is a GitHub Issue, every teammate's agent reads the same rulebook, and a smoke check gates main. Night Shift and Scale were both built this way.
