---
title: "SafeRoute"
shortDescription: "A disaster preparedness platform with an interactive risk map, real-time weather, and evacuation routing."
category: WEB
status: COMPLETED
featured: true
featuredOrder: 2
publishedAt: 2025-11-05
published: true
cover:
  src: /images/projects/saferoute/cover.webp
  alt: "SafeRoute homepage showing the local risk panel and real-time weather status"
technologies: [vue, vue-router, vite, pinia, leaflet, chart-js]
links:
  github: https://github.com/Chrisimana/saferoute
  demo: https://saferoute-drab.vercel.app/#/
gallery:
  - src: /images/projects/saferoute/peta.webp
    alt: "Interactive Leaflet-based risk map with disaster location markers"
  - src: /images/projects/saferoute/cuaca.webp
    alt: "Real-time weather panel with risk status and a seven-day summary"
  - src: /images/projects/saferoute/analitik.webp
    alt: "Risk analytics with a 24-hour precipitation chart and risk distribution"
  - src: /images/projects/saferoute/keselamatan.webp
    alt: "Safety guidance with evacuation procedures for multiple disasters"
  - src: /images/projects/saferoute/tentang.webp
    alt: "SafeRoute About page listing the main features"
---

## Overview

SafeRoute is a web platform that helps Indonesian communities prepare for and
respond to natural disasters through real-time information and easy to
understand guidance all running directly in the browser with no extra
installation.

## Problem

Disaster risk information is often hard to access in an understandable form,
location-based evacuation guidance remains limited, and safety education is
scattered across many different sources while rapidly changing weather
conditions demand risk analysis that stays continuously up to date.

## Solution

SafeRoute maps risk zones as an interactive, color-coded map by danger level,
monitors weather in real time to automatically classify risk (low/medium/
high), and provides complete evacuation guidance for multiple disaster types
along with shelter locations across Indonesia's provinces.

## Features

- Interactive risk map with danger-zone polygons and evacuation routing
- Real-time weather monitoring and a 7-day forecast
- Automatic risk detection based on precipitation thresholds
- Emergency browser push notifications when risk escalates
- 24-hour precipitation charts and historical risk distribution
- Safety guidance for multiple disaster types and shelter locations

## Tech Stack

Vue 3 and Vite were chosen for fast iteration on a visually heavy,
map-centric app. Leaflet handles interactive map rendering and route
calculation, Chart.js visualizes precipitation and historical risk data, and
Pinia manages cross-component state (user location, risk status, alert
history). Weather data comes from Open-Meteo and base map tiles from
OpenStreetMap, both key-free public APIs, in line with the backend-free
approach.

## Challenges

Keeping risk classification consistent as weather data changes quickly,
while avoiding duplicate notifications that would annoy users when risk
status fluctuates within a short time window.

## What I Learned

This project gave hands-on experience integrating geospatial data (GeoJSON,
routing) with real-time weather data in a fully client-side workflow,
including designing sensible risk thresholds from raw precipitation data.

## Result

SafeRoute provides evacuation route estimates and location risk status
directly from the browser, covering safety guidance for multiple disaster
types and shelter locations across Indonesia's provinces.
