---
title: "DisasterSense AI"
shortDescription: "An early-warning system that calculates automatic disaster risk levels from real-time, location-based weather data."
category: WEB
status: COMPLETED
featured: true
featuredOrder: 3
publishedAt: 2025-08-20
published: true
cover:
  src: /images/projects/disastersense-ai/cover.webp
  alt: "DisasterSense AI homepage with a risk-check button and feature summary"
technologies: [react, react-router, typescript, vite, leaflet, zustand]
links:
  github: https://github.com/Chrisimana/disastersense-ai
  demo: https://disastersense-ai.vercel.app/
gallery:
  - src: /images/projects/disastersense-ai/dashboard.webp
    alt: "Risk dashboard with status, current weather data, and action recommendations"
  - src: /images/projects/disastersense-ai/petarisiko.webp
    alt: "Interactive risk map with location markers color-coded by danger level"
  - src: /images/projects/disastersense-ai/edukasi.webp
    alt: "Disaster education page with guidance for multiple types of natural disasters"
  - src: /images/projects/disastersense-ai/notifikasi.webp
    alt: "Notifications page with alert history and browser notification settings"
  - src: /images/projects/disastersense-ai/tentang.webp
    alt: "DisasterSense AI About page with project goals and the technologies used"
---

## Overview

DisasterSense AI is a web-based early-warning system that helps Indonesian
communities prepare for natural disasters by analyzing real-time weather data
and automatically calculating disaster risk levels based on the user's
location.

## Problem

Existing disaster warning systems are often too technical for the general
public to understand, disaster education is scattered across disconnected
sources, and many solutions require installing an extra app when fast
browser-based access matters most during an emergency.

## Solution

The app automatically detects the user's location (GPS or manual input with
reverse geocoding), monitors real-time weather data (rainfall, wind speed,
humidity, temperature), then automatically calculates risk into three
levels Safe, Alert, Danger shown on an interactive map with color-coded
location markers.

## Features

- Automatic location detection via GPS or manual input with reverse geocoding
- Real-time weather monitoring (rainfall, wind speed, humidity, temperature)
- Automatic risk calculation with three levels: Safe, Alert, Danger
- Interactive risk map with color-coded location markers
- Disaster education covering multiple types of natural disasters in Indonesia
- Alert notification system with historical tracking

## Tech Stack

React and TypeScript were chosen to build a reactive, type-safe interface,
with Vite as the build tool for fast iteration. Zustand handles lightweight
state management (location, weather data, alert history) without excess
boilerplate. Leaflet (via React Leaflet) renders the interactive risk map.
Weather data comes from Open-Meteo and geocoding from Nominatim/
OpenStreetMap, both key-free public APIs, in line with the backend-free
approach.

## Challenges

Designing sensible risk-calculation thresholds from raw weather data, and
handling the case where location permission is denied with a smooth manual
input fallback.

## What I Learned

This project reinforced the value of minimal state management (Zustand) over
heavier solutions, and how to structure threshold-based risk classification
logic that stays transparent and easy to explain to non-technical users.

## Result

DisasterSense AI delivers location-based disaster risk estimates directly
from the browser with no installation, covering education for multiple types
of natural disasters in Indonesia.
