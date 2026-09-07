---
title: "Ecotopia Sphere"
shortDescription: "An eco-friendly lifestyle education platform with a green-technology showcase and a community action space."
category: WEB
status: COMPLETED
featured: true
featuredOrder: 4
publishedAt: 2025-05-12
published: true
cover:
  src: /images/projects/ecotopia-sphere/cover.webp
  alt: "Ecotopia Sphere homepage with a sustainable green-city illustration"
technologies: [vue, vue-router, vite, tailwind]
links:
  github: https://github.com/Chrisimana/ecotopia-sphere
  demo: https://ecotopia-sphere.vercel.app/
gallery:
  - src: /images/projects/ecotopia-sphere/tentang.webp
    alt: "EcoTopia Sphere About page with the platform's vision and mission"
  - src: /images/projects/ecotopia-sphere/tips.webp
    alt: "Green Living Tips page with category filters and tip cards"
  - src: /images/projects/ecotopia-sphere/artikel.webp
    alt: "An educational article page about saving electrical energy"
  - src: /images/projects/ecotopia-sphere/inovasicerdas.webp
    alt: "Smart Innovations page showcasing urban green technologies"
  - src: /images/projects/ecotopia-sphere/smartaction.webp
    alt: "Smart Action Hub page with a form for sharing environmental actions"
---

## Overview

Ecotopia Sphere is a web platform that promotes environmental awareness and
sustainable living in the context of smart cities, connecting education,
community action, and green technology innovation into one digital
ecosystem.

## Problem

Education about eco-friendly living is often scattered across disconnected
sources, and people lack a platform that combines learning with a space to
actually participate in real environmental action.

## Solution

Ecotopia Sphere brings together structured educational articles, a showcase
of green technology innovations for urban environments, and a community
space where users can share their own environmental actions to inspire
others, backed by animated collective-impact statistics.

## Features

- 12 structured educational articles on energy, water, waste, and transport
- A showcase of 10 green technology innovations for urban environments
- A community action space for sharing and inspiring environmental action
- Animated collective impact statistics
- An about page covering the platform's vision, mission, philosophy, and logo

## Tech Stack

Vue 3 (Composition API) and Vite were chosen to build a lightweight
single-page application with history-mode navigation via Vue Router.
Tailwind CSS sped up building a consistent look without excess custom CSS.
Since all content is static and community interactions are stored in
`localStorage`, the app needs no backend at all.

## Challenges

Structuring a fairly large body of educational content (12 articles, 10
innovations) so it stays easy to navigate without the pages feeling dense or
confusing.

## What I Learned

This project sharpened my ability to design information architecture for a
large volume of educational content, and to use `localStorage` as a simple
backend substitute for user-contribution-based community features.

## Result

Ecotopia Sphere provides a single centralized platform for learning about
sustainable living while giving users a space to share their real actions,
all accessible directly from the browser.
