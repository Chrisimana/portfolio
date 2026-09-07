---
title: "WinterRa"
shortDescription: "An interactive year-end holiday platform with a 3D experience, budget calculator, and packing checklist."
category: WEB
status: COMPLETED
featured: true
featuredOrder: 1
publishedAt: 2026-01-10
published: true
cover:
  src: /images/projects/winterra/cover.webp
  alt: "WinterRa homepage with a snow-themed title and 3D particle effects"
technologies: [vue, vue-router, vite, tailwind, three-js, gsap, pinia]
links:
  github: https://github.com/Chrisimana/winterra
  demo: https://winterra.vercel.app/
gallery:
  - src: /images/projects/winterra/about.webp
    alt: "WinterRa About page explaining the concept and project timeline"
  - src: /images/projects/winterra/budget.webp
    alt: "Holiday budget calculator with a per-category cost breakdown"
  - src: /images/projects/winterra/packing.webp
    alt: "Categorized packing checklist with a progress indicator"
  - src: /images/projects/winterra/countdown.webp
    alt: "New Year countdown with a starfield and 3D fireworks background"
---

## Overview

WinterRa is a year-end holiday platform that replaces static travel articles
with an immersive 3D experience. Every feature runs entirely in the browser
with no backend a budget calculator, a packing checklist, and a New Year
countdown with a 3D fireworks animation.

## Problem

End-of-year holiday planning is usually scattered across several separate
tools (budget notes, packing lists, countdown apps), and the digital
experience around the new year tends to be monotonous just a number
ticking down with no sense of celebration.

## Solution

WinterRa brings all of that into a single page: a budget calculator that
breaks down estimated costs for transportation, accommodation, food,
activities, and souvenirs; a categorized packing checklist whose progress is
saved automatically on the device; and a real-time New Year countdown with a
3D fireworks background and falling snow across the page.

## Features

- Holiday budget calculator broken down by spending category
- Packing checklist with locally persisted progress tracking
- Real-time New Year countdown with a 3D fireworks animation
- Falling snow effect across the whole page
- Rotating daily inspirational quotes

## Tech Stack

Vue 3 (Composition API) and Vite were chosen as the foundation for their
speed and low overhead in a purely client-side app. Three.js renders the 3D
fireworks animation, while GSAP drives reveal and scroll animations for
smooth transitions between sections. Pinia holds centralized state (checklist
progress, budget calculations) persisted to `localStorage` so user data
survives a page reload.

## Challenges

Keeping performance smooth while a 3D fireworks animation and a Canvas 2D
snow effect run simultaneously was the main challenge, since everything
executes entirely client-side with no server to offload work to.

## What I Learned

This project deepened my understanding of running a real-time 3D animation
(Three.js) alongside timeline-based animation (GSAP) within a single Vue app,
and reinforced the value of local storage for backend-free apps so the user
experience still feels persistent.

## Result

WinterRa runs fully client-side and is accessible directly from the browser
with no installation, making it a lightweight option for holiday planning
from any device.
