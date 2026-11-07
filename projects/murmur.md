---
title: "Murmur: AI Agents for Accessibility"
description: "A voice-first phone for people with little or no sight, built in a day with two co-designers. Say what you want and Murmur runs the phone's apps for you, then asks before anything is sent or paid."
tags: ["Hackathon", "Accessibility", "AI Agents", "OpenAI Realtime", "JavaScript", "London"]
images: ["/demos/murmur.mp4", "/events/murmur-pay.jpg", "/events/murmur-mum.jpg", "/events/murmur-notify.jpg"]
layout: "imageRight"
date: "2026-11-07"
brandIcon:
category: "hackathon"
hackathonName: "AI for Accessibility Collective: AI Agents for Accessibility"
displayDate: "November 2026"
priority: 1
liveUrl: "https://murmur-901257379404.europe-west1.run.app"
githubUrl: "https://github.com/atiladeokegab/murmur"
---

# Murmur

AI Agents for Accessibility, UCL East, London, 7 November 2026.

Phones are built for eyes. Our two co-designers, one partly sighted and one blind, described zooming to 400%, missing buttons and apps that ignore screen readers. Murmur is one button: tap anywhere and talk.

- Every app by voice: calendar, messages, mail, notifications, gallery, music, maps, rides, food and more
- It drafts anything you ask, reads it back, and sends only after you say yes
- Paying needs a yes and a fingerprint, and fails closed
- A live view on the laptop shows what Murmur heard, its plan and every step it checked on the phone

## How it works

The voice is OpenAI's realtime model with a natural female voice. It never guesses about the phone: for anything on screen it calls the phone itself, which runs the app step by step and checks each one before it moves on.

All the people, messages and money in the demo are invented.

## Stack

JavaScript, Node, OpenAI Realtime (WebRTC), Gemini, Cloud Run.
