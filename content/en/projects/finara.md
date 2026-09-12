---
title: "Finara"
shortDescription: "A no-account personal finance simulator for understanding income, managing expenses, and planning savings right in the browser."
category: WEB
status: COMPLETED
featured: true
featuredOrder: 6
publishedAt: 2026-09-12
published: true
cover:
  src: /images/projects/finara/cover.webp
  alt: "Finara homepage with a summary of income, expenses, and financial health status"
technologies: [vue, vue-router, vite, css]
links:
  github: https://github.com/Chrisimana/finara
  demo: https://finara-eight.vercel.app/
gallery:
  - src: /images/projects/finara/simulasi.webp
    alt: "First step of the Finara simulator for entering monthly income"
  - src: /images/projects/finara/hasilringkasan.webp
    alt: "Finara simulation results with a financial health indicator and income vs expense and expense composition charts"
  - src: /images/projects/finara/hasilproyeksi.webp
    alt: "Savings target and monthly savings projection chart on the Finara results page"
  - src: /images/projects/finara/edukasi.webp
    alt: "Finara education page covering income, needs, wants, savings, and emergency fund basics"
  - src: /images/projects/finara/sdg1.webp
    alt: "About SDG 1 page explaining how Finara connects to the No Poverty sustainable development goal"
---

## Overview

Finara is a personal finance education and simulation platform that helps
users understand their financial situation, from income and expense
categories to savings planning, without creating an account or sending any
data to a server.

## Problem

Many people struggle to track where their money goes each month, find it
hard to separate essential needs from wants, and lack a measurable savings
target. Existing financial planning tools usually require an account or
sharing personal data, even though many users just want a quick picture
without that commitment.

## Solution

Finara offers a three-step simulator (income, categorized expenses, and
savings) that instantly produces a financial health indicator (Safe,
Warning, or Deficit) along with educational recommendations. All
calculations run entirely on the user's own device, with no account, no
localStorage, and no API calls, keeping privacy fully intact.

## Features

- A three-step financial simulator: income, categorized expenses, and savings targets
- Automatic financial health indicator (Safe / Warning / Deficit) with educational recommendations
- Data visualizations built with pure SVG: an income vs expense bar chart, an expense composition donut chart, and a savings projection line chart
- An education module covering six core finance topics, including the 50/30/20 budgeting reference
- An About SDG 1 page connecting financial literacy to the No Poverty sustainable development goal

## Tech Stack

Vue 3 (Composition API) and Vite were chosen to build a lightweight
single-page application, with Vue Router handling lazy-loaded navigation
between pages. The interface is styled with pure CSS using design tokens,
with no CSS framework, to keep the bundle small. All charts are built as
native SVG with no charting library, and the entire simulation state is
managed through a single reactive composable, with no backend,
localStorage, or API calls at all.

## Challenges

Structuring a fairly detailed expense category system (essentials, wants,
obligations, custom) while keeping the three-step simulation flow simple
and unintimidating, and building the SVG visualizations from scratch
without relying on a charting library.

## What I Learned

This project deepened my understanding of composable-based reactive state
design in Vue, and how to build data visualizations (bar, donut, and line
charts) directly with SVG without external dependencies.

## Result

Finara gives anyone a fast, private way to understand their financial
situation and get educational recommendations, entirely from the browser
with no account and no data leaving the user's device.
