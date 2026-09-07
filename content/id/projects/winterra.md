---
title: "WinterRa"
shortDescription: "Platform liburan akhir tahun interaktif dengan pengalaman 3D, kalkulator budget, dan checklist packing."
category: WEB
status: COMPLETED
featured: true
featuredOrder: 1
publishedAt: 2026-01-10
published: true
cover:
  src: /images/projects/winterra/cover.webp
  alt: "Halaman utama WinterRa dengan judul bertema salju dan efek partikel 3D"
technologies: [vue, vue-router, vite, tailwind, three-js, gsap, pinia]
links:
  github: https://github.com/Chrisimana/winterra
  demo: https://winterra.vercel.app/
gallery:
  - src: /images/projects/winterra/about.webp
    alt: "Halaman Tentang WinterRa dengan penjelasan konsep dan lini masa proyek"
  - src: /images/projects/winterra/budget.webp
    alt: "Kalkulator budget liburan dengan rincian biaya per kategori"
  - src: /images/projects/winterra/packing.webp
    alt: "Checklist packing berkategori dengan indikator progres"
  - src: /images/projects/winterra/countdown.webp
    alt: "Hitung mundur tahun baru dengan latar bintang dan kembang api 3D"
---

## Ringkasan

WinterRa adalah platform web bertema liburan akhir tahun yang menggantikan
artikel travel statis dengan pengalaman 3D interaktif. Semua fitur berjalan
sepenuhnya di browser tanpa backend, mulai dari kalkulator budget, checklist
packing, hingga hitung mundur tahun baru dengan animasi kembang api 3D.

## Masalah

Perencanaan liburan akhir tahun biasanya tersebar di banyak aplikasi terpisah
(catatan budget, checklist barang, kalender hitung mundur), dan pengalaman
digital seputar pergantian tahun cenderung monoton, sekadar angka yang
berjalan mundur tanpa nuansa perayaan.

## Solusi

WinterRa menyatukan seluruh kebutuhan itu dalam satu halaman: kalkulator
budget yang merinci estimasi biaya transportasi, akomodasi, makan, aktivitas,
dan oleh-oleh; checklist packing berkategori dengan progres yang tersimpan
otomatis di perangkat; serta hitung mundur tahun baru dengan latar animasi
kembang api 3D dan efek salju yang jatuh sepanjang halaman.

## Fitur

- Kalkulator budget liburan per kategori pengeluaran
- Checklist packing dengan pelacakan progres tersimpan lokal
- Hitung mundur tahun baru real-time dengan animasi kembang api 3D
- Efek salju berjalan di seluruh halaman
- Kutipan inspiratif harian yang berganti otomatis

## Teknologi yang Digunakan

Vue 3 (Composition API) dan Vite dipilih sebagai fondasi karena ringan dan
cepat untuk aplikasi murni sisi klien. Three.js menangani rendering animasi
kembang api 3D, sementara GSAP mengatur animasi reveal dan scroll agar
transisi antar bagian terasa halus. Pinia menyimpan state terpusat (progres
checklist, hasil kalkulasi budget) yang dipersist ke `localStorage` sehingga
data pengguna tidak hilang saat halaman dimuat ulang.

## Tantangan

Menjaga performa tetap mulus saat animasi 3D (kembang api) dan efek salju
Canvas 2D berjalan bersamaan adalah tantangan utama, mengingat semuanya
dieksekusi sepenuhnya di sisi klien tanpa server yang membantu pra-pemrosesan.

## Hal-hal yang Saya Pelajari

Proyek ini memperdalam pemahaman tentang mengelola animasi 3D real-time
(Three.js) berdampingan dengan animasi berbasis timeline (GSAP) dalam satu
aplikasi Vue, serta pentingnya memanfaatkan penyimpanan lokal untuk aplikasi
tanpa backend agar pengalaman pengguna tetap terasa persisten.

## Hasil

WinterRa berjalan penuh di sisi klien dan dapat diakses langsung dari
browser tanpa instalasi apa pun, cocok untuk kebutuhan perencanaan liburan
yang ringan dan cepat diakses dari perangkat mana saja.
