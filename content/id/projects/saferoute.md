---
title: "SafeRoute"
shortDescription: "Platform kesiapsiagaan bencana dengan peta risiko interaktif, cuaca real-time, dan jalur evakuasi."
category: WEB
status: COMPLETED
featured: true
featuredOrder: 2
publishedAt: 2025-11-05
published: true
cover:
  src: /images/projects/saferoute/cover.webp
  alt: "Halaman utama SafeRoute menampilkan panel risiko lokal dan status cuaca real-time"
technologies: [vue, vue-router, vite, pinia, leaflet, chart-js]
links:
  github: https://github.com/Chrisimana/saferoute
  demo: https://saferoute-drab.vercel.app/#/
gallery:
  - src: /images/projects/saferoute/peta.webp
    alt: "Peta risiko interaktif berbasis Leaflet dengan penanda lokasi bencana"
  - src: /images/projects/saferoute/cuaca.webp
    alt: "Panel cuaca real-time dengan status risiko dan ringkasan tujuh hari"
  - src: /images/projects/saferoute/analitik.webp
    alt: "Analitik risiko dengan grafik curah hujan 24 jam dan distribusi risiko"
  - src: /images/projects/saferoute/keselamatan.webp
    alt: "Panduan keselamatan berisi prosedur evakuasi untuk berbagai bencana"
  - src: /images/projects/saferoute/tentang.webp
    alt: "Halaman Tentang SafeRoute dengan daftar fitur utama"
---

## Ringkasan

SafeRoute adalah platform web yang membantu masyarakat Indonesia
mempersiapkan diri dan merespons bencana alam lewat informasi real-time dan
panduan yang mudah dipahami. Semuanya berjalan langsung di browser tanpa
instalasi aplikasi tambahan.

## Masalah

Informasi risiko bencana sering kali sulit diakses dalam bentuk yang mudah
dipahami, panduan evakuasi berbasis lokasi masih terbatas, dan edukasi
keselamatan tersebar di banyak sumber berbeda, padahal kondisi cuaca yang
berubah cepat menuntut analisis risiko yang selalu diperbarui.

## Solusi

SafeRoute memetakan zona risiko dalam bentuk peta interaktif berlapis warna
sesuai tingkat bahaya, memantau cuaca real-time untuk mengklasifikasikan
risiko secara otomatis (rendah/sedang/tinggi), dan menyediakan panduan
evakuasi lengkap untuk berbagai jenis bencana beserta titik lokasi
pengungsian di seluruh provinsi di Indonesia.

## Fitur

- Peta risiko interaktif dengan poligon zona bahaya dan jalur evakuasi
- Pemantauan cuaca real-time dan prakiraan 7 hari
- Deteksi risiko otomatis berbasis ambang batas curah hujan
- Notifikasi darurat via push browser saat risiko meningkat
- Grafik analitik risiko curah hujan 24 jam dan riwayat distribusi risiko
- Panduan keselamatan untuk berbagai jenis bencana dan titik pengungsian

## Teknologi yang Digunakan

Vue 3 dan Vite dipilih untuk kecepatan pengembangan aplikasi berbasis peta
yang berat secara visual. Leaflet menangani rendering peta interaktif dan
perhitungan jalur, Chart.js memvisualisasikan data curah hujan dan riwayat
risiko, sementara Pinia mengelola state lintas komponen (lokasi pengguna,
status risiko, riwayat notifikasi). Data cuaca diambil dari Open-Meteo dan
peta dasar dari OpenStreetMap, keduanya API publik tanpa kunci akses,
selaras dengan pendekatan tanpa backend.

## Tantangan

Menjaga akurasi klasifikasi risiko tetap konsisten saat data cuaca berubah
cepat, sekaligus menghindari notifikasi duplikat yang mengganggu pengguna
saat status risiko naik-turun dalam rentang waktu singkat.

## Hal-hal yang Saya Pelajari

Proyek ini memberi pengalaman langsung mengintegrasikan data geospasial
(GeoJSON, routing) dengan data cuaca real-time dalam satu alur kerja yang
sepenuhnya berjalan di klien, termasuk merancang ambang batas risiko yang
masuk akal dari data curah hujan mentah.

## Hasil

SafeRoute menyediakan estimasi jalur evakuasi dan status risiko lokasi
langsung dari browser, mencakup panduan keselamatan untuk berbagai jenis
bencana dan titik pengungsian di seluruh provinsi di Indonesia.
