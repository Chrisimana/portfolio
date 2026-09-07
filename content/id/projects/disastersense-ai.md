---
title: "DisasterSense AI"
shortDescription: "Sistem peringatan dini bencana yang menghitung tingkat risiko otomatis dari data cuaca real-time berbasis lokasi."
category: WEB
status: COMPLETED
featured: true
featuredOrder: 3
publishedAt: 2025-08-20
published: true
cover:
  src: /images/projects/disastersense-ai/cover.webp
  alt: "Halaman utama DisasterSense AI dengan tombol cek risiko dan ringkasan fitur"
technologies: [react, react-router, typescript, vite, leaflet, zustand]
links:
  github: https://github.com/Chrisimana/disastersense-ai
  demo: https://disastersense-ai.vercel.app/
gallery:
  - src: /images/projects/disastersense-ai/dashboard.webp
    alt: "Dashboard risiko dengan status, data cuaca terkini, dan rekomendasi tindakan"
  - src: /images/projects/disastersense-ai/petarisiko.webp
    alt: "Peta risiko interaktif dengan penanda lokasi berwarna sesuai tingkat bahaya"
  - src: /images/projects/disastersense-ai/edukasi.webp
    alt: "Halaman edukasi bencana dengan panduan untuk berbagai jenis bencana alam"
  - src: /images/projects/disastersense-ai/notifikasi.webp
    alt: "Halaman notifikasi dengan riwayat peringatan dan pengaturan notifikasi browser"
  - src: /images/projects/disastersense-ai/tentang.webp
    alt: "Halaman Tentang DisasterSense AI dengan tujuan proyek dan teknologi yang dipakai"
---

## Ringkasan

DisasterSense AI adalah sistem peringatan dini berbasis web yang membantu
masyarakat Indonesia mempersiapkan diri menghadapi bencana alam dengan
menganalisis data cuaca real-time dan menghitung tingkat risiko bencana
secara otomatis berdasarkan lokasi pengguna.

## Masalah

Sistem peringatan bencana yang ada seringkali terlalu teknis untuk dipahami
masyarakat umum, edukasi kebencanaan tersebar di berbagai sumber yang tidak
terpusat, dan banyak solusi mengharuskan instalasi aplikasi tambahan padahal
akses cepat lewat browser jauh lebih praktis saat kondisi darurat.

## Solusi

Aplikasi mendeteksi lokasi pengguna secara otomatis (GPS atau input manual
dengan reverse geocoding), memantau data cuaca real-time (curah hujan,
kecepatan angin, kelembapan, suhu), lalu menghitung tingkat risiko otomatis
menjadi tiga level: Aman, Waspada, Bahaya, ditampilkan pada peta interaktif
dengan penanda berwarna sesuai lokasi.

## Fitur

- Deteksi lokasi otomatis via GPS atau input manual dengan reverse geocoding
- Pemantauan cuaca real-time (curah hujan, angin, kelembapan, suhu)
- Kalkulasi risiko otomatis dengan tiga level: Aman, Waspada, Bahaya
- Peta risiko interaktif dengan penanda lokasi berwarna
- Edukasi kebencanaan mencakup berbagai jenis bencana alam di Indonesia
- Sistem notifikasi peringatan dengan riwayat pelacakan

## Teknologi yang Digunakan

React dan TypeScript dipilih untuk membangun antarmuka yang reaktif dan
type-safe, dengan Vite sebagai build tool untuk iterasi cepat. Zustand
menangani state management yang ringan (lokasi, data cuaca, riwayat
peringatan) tanpa boilerplate berlebih. Leaflet (lewat React Leaflet)
merender peta risiko interaktif. Data cuaca diambil dari Open-Meteo dan
geocoding dari Nominatim/OpenStreetMap, keduanya API publik tanpa kunci
akses, sejalan dengan pendekatan tanpa backend.

## Tantangan

Merancang ambang batas kalkulasi risiko yang masuk akal dari data cuaca
mentah, serta menangani kasus saat izin lokasi ditolak pengguna dengan
alur input manual yang tetap mulus.

## Hal-hal yang Saya Pelajari

Proyek ini memperkuat pemahaman tentang state management minimal (Zustand)
dibandingkan solusi yang lebih berat, serta cara menyusun logika klasifikasi
risiko berbasis ambang batas yang transparan dan mudah dijelaskan ke
pengguna awam.

## Hasil

DisasterSense AI memberikan estimasi risiko bencana berbasis lokasi langsung
dari browser tanpa instalasi, mencakup edukasi untuk berbagai jenis bencana
alam di Indonesia.
