---
title: "Finara"
shortDescription: "Simulator edukasi keuangan pribadi tanpa akun untuk memahami pemasukan, mengatur pengeluaran, dan merencanakan tabungan langsung dari browser."
category: WEB
status: COMPLETED
featured: true
featuredOrder: 6
publishedAt: 2026-09-12
published: true
cover:
  src: /images/projects/finara/cover.webp
  alt: "Halaman utama Finara dengan ringkasan pendapatan, pengeluaran, dan status kesehatan keuangan"
technologies: [vue, vue-router, vite, css]
links:
  github: https://github.com/Chrisimana/finara
  demo: https://finara-eight.vercel.app/
gallery:
  - src: /images/projects/finara/simulasi.webp
    alt: "Langkah pertama simulator Finara untuk mengisi data pendapatan bulanan"
  - src: /images/projects/finara/hasilringkasan.webp
    alt: "Hasil simulasi Finara dengan indikator kesehatan keuangan serta grafik pendapatan vs pengeluaran dan komposisi pengeluaran"
  - src: /images/projects/finara/hasilproyeksi.webp
    alt: "Target tabungan dan grafik proyeksi tabungan bulanan pada hasil simulasi Finara"
  - src: /images/projects/finara/edukasi.webp
    alt: "Halaman edukasi Finara berisi materi dasar pendapatan, kebutuhan, keinginan, tabungan, dan dana darurat"
  - src: /images/projects/finara/sdg1.webp
    alt: "Halaman Tentang SDG 1 yang menjelaskan keterkaitan Finara dengan tujuan pembangunan berkelanjutan tanpa kemiskinan"
---

## Ringkasan

Finara adalah platform edukasi dan simulasi keuangan pribadi yang membantu
pengguna memahami kondisi finansial mereka, mulai dari pemasukan, kategori
pengeluaran, hingga perencanaan tabungan, tanpa perlu membuat akun atau
mengirim data ke server mana pun.

## Masalah

Banyak orang kesulitan mengetahui ke mana uang mereka digunakan setiap
bulan, sulit membedakan kebutuhan pokok dari keinginan, dan tidak memiliki
target tabungan yang terukur. Alat perencanaan keuangan yang ada umumnya
mengharuskan pembuatan akun atau berbagi data pribadi, padahal banyak
pengguna hanya butuh gambaran cepat tanpa komitmen semacam itu.

## Solusi

Finara menghadirkan simulator tiga langkah (pemasukan, pengeluaran per
kategori, dan tabungan) yang langsung menghasilkan indikator kesehatan
keuangan (Aman, Waspada, atau Defisit) beserta rekomendasi edukatif. Seluruh
perhitungan berjalan di perangkat pengguna sendiri, tanpa akun, tanpa
localStorage, dan tanpa panggilan API, sehingga privasi terjaga sepenuhnya.

## Fitur

- Simulator finansial 3 langkah: pemasukan, pengeluaran per kategori, dan target tabungan
- Indikator kesehatan keuangan otomatis (Aman / Waspada / Defisit) beserta rekomendasi edukatif
- Visualisasi data memakai SVG murni: grafik batang pemasukan vs pengeluaran, diagram donat komposisi pengeluaran, dan grafik proyeksi tabungan
- Modul edukasi 6 topik dasar keuangan, termasuk referensi anggaran 50/30/20
- Halaman Tentang SDG 1 yang menghubungkan literasi keuangan dengan tujuan pembangunan berkelanjutan tanpa kemiskinan

## Teknologi yang Digunakan

Vue 3 (Composition API) dan Vite dipilih untuk membangun single-page
application yang ringan, dengan Vue Router mengatur navigasi antar halaman
secara lazy-loaded. Tampilan disusun dengan CSS murni memakai design token,
tanpa framework CSS, agar bundel tetap kecil. Semua grafik dibuat sebagai
SVG native tanpa pustaka charting, dan seluruh state simulasi dikelola
lewat satu composable reaktif tanpa backend, localStorage, atau panggilan
API sama sekali.

## Tantangan

Menyusun logika kategori pengeluaran yang cukup rinci (kebutuhan pokok,
keinginan, kewajiban, kustom) sekaligus menjaga alur simulasi tiga langkah
tetap sederhana dan tidak membebani pengguna, serta membangun visualisasi
SVG dari nol tanpa mengandalkan pustaka charting.

## Hal-hal yang Saya Pelajari

Proyek ini memperdalam pemahaman saya tentang desain state management
reaktif berbasis composable di Vue, serta cara membangun visualisasi data
(bar, donut, line chart) langsung dengan SVG tanpa dependensi eksternal.

## Hasil

Finara menyediakan cara cepat dan privat bagi siapa pun untuk memahami
kondisi keuangan mereka dan mendapatkan rekomendasi edukatif, seluruhnya
dari browser tanpa akun maupun data yang meninggalkan perangkat pengguna.
