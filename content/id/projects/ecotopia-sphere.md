---
title: "Ecotopia Sphere"
shortDescription: "Platform edukasi gaya hidup ramah lingkungan dengan showcase teknologi hijau dan ruang aksi komunitas."
category: WEB
status: COMPLETED
featured: true
featuredOrder: 4
publishedAt: 2025-05-12
published: true
cover:
  src: /images/projects/ecotopia-sphere/cover.webp
  alt: "Halaman utama Ecotopia Sphere dengan ilustrasi kota hijau berkelanjutan"
technologies: [vue, vue-router, vite, tailwind]
links:
  github: https://github.com/Chrisimana/ecotopia-sphere
  demo: https://ecotopia-sphere.vercel.app/
gallery:
  - src: /images/projects/ecotopia-sphere/tentang.webp
    alt: "Halaman Tentang EcoTopia Sphere dengan visi dan misi platform"
  - src: /images/projects/ecotopia-sphere/tips.webp
    alt: "Halaman Tips Hidup Hijau dengan filter kategori dan kartu tip"
  - src: /images/projects/ecotopia-sphere/artikel.webp
    alt: "Halaman artikel edukasi tentang hemat energi listrik"
  - src: /images/projects/ecotopia-sphere/inovasicerdas.webp
    alt: "Halaman Inovasi Cerdas berisi showcase teknologi hijau perkotaan"
  - src: /images/projects/ecotopia-sphere/smartaction.webp
    alt: "Halaman Smart Action Hub dengan formulir berbagi aksi lingkungan"
---

## Ringkasan

Ecotopia Sphere adalah platform web yang mempromosikan kesadaran lingkungan
dan gaya hidup berkelanjutan dalam konteks kota cerdas, menghubungkan
edukasi, aksi komunitas, dan inovasi teknologi hijau dalam satu ekosistem
digital.

## Masalah

Edukasi tentang gaya hidup ramah lingkungan sering tersebar di berbagai
sumber yang terpisah, dan masyarakat kekurangan platform yang menyatukan
pembelajaran dengan ruang untuk benar-benar berpartisipasi dalam aksi
lingkungan secara nyata.

## Solusi

Ecotopia Sphere menyatukan artikel edukasi terstruktur, showcase inovasi
teknologi hijau untuk lingkungan perkotaan, dan ruang komunitas tempat
pengguna dapat membagikan aksi lingkungan mereka sendiri sebagai inspirasi
bagi orang lain, dilengkapi statistik dampak kolektif yang dianimasikan.

## Fitur

- 12 artikel edukasi terstruktur seputar energi, air, sampah, dan transportasi
- Showcase 10 inovasi teknologi hijau untuk lingkungan perkotaan
- Ruang aksi komunitas untuk berbagi dan menginspirasi aksi lingkungan
- Statistik dampak kolektif yang dianimasikan
- Halaman tentang platform: visi, misi, filosofi, dan makna logo

## Teknologi yang Digunakan

Vue 3 (Composition API) dan Vite dipilih untuk membangun single-page
application yang ringan dengan navigasi history mode via Vue Router.
Tailwind CSS mempercepat penyusunan tampilan yang konsisten tanpa CSS custom
berlebih. Karena seluruh konten bersifat statis dan interaksi komunitas
disimpan di `localStorage`, aplikasi ini tidak memerlukan backend sama
sekali.

## Tantangan

Menyusun struktur konten edukasi yang cukup banyak (12 artikel, 10 inovasi)
agar tetap mudah dinavigasi tanpa membuat halaman terasa padat atau
membingungkan.

## Hal-hal yang Saya Pelajari

Proyek ini mempertajam kemampuan menyusun arsitektur informasi untuk konten
edukasi dalam jumlah besar, serta memanfaatkan `localStorage` sebagai
pengganti backend sederhana untuk fitur komunitas berbasis kontribusi
pengguna.

## Hasil

Ecotopia Sphere menyediakan satu platform terpusat untuk belajar tentang
gaya hidup berkelanjutan sekaligus ruang bagi pengguna untuk berbagi aksi
nyata mereka, seluruhnya dapat diakses langsung dari browser.
