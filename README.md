# 4Things

4Things adalah aplikasi web yang memungkinkan pengguna untuk berbagi, menilai, dan bertanya tentang produk yang mereka minati. Pengguna dapat menjelajahi produk terbaru, melihat produk yang sedang tren, serta mengelola pertanyaan dan jawaban terkait produk.

## Deskripsi Proyek

Aplikasi ini menawarkan fitur-fitur berikut:

- **Home Page:** Menampilkan daftar produk dan pertanyaan terbaru.
- **Trending Page:** Menampilkan produk dan pertanyaan yang sedang populer.
- **My Questions Page:** Mengelola dan menampilkan pertanyaan yang telah diajukan oleh pengguna.
- **Authentication:** Fitur login untuk mengakses dan mengelola konten pribadi.

## Tech Stack

Aplikasi ini dibangun menggunakan teknologi berikut:

- **Frontend:**

  - **React.js:** Library JavaScript untuk membangun antarmuka pengguna.
  - **React Router:** Untuk navigasi di dalam aplikasi.
  - **Axios:** Untuk melakukan request HTTP ke backend.
  - **Flowbite:** Komponen UI berbasis Tailwind CSS.
  - **Tailwind CSS:** Framework CSS untuk desain yang responsif dan modern.

- **Backend:**
  - **Nest.js:** Framework web untuk Node.js.
  - **MySQL:** Basis data SQL untuk menyimpan data pengguna, produk, dan pertanyaan.

## Instalasi dan Cara Menjalankan Proyek

### 1. Clone Repositori Front-End

```bash
git clone -b 4things-fe https://github.com/Fiorezarn/4things.git
cd 4things-fe
npm i
npm run dev
```

### 2. Clone Repositori Back-End

```bash
git clone -b 4things-be https://github.com/Fiorezarn/4things.git
cd 4things-be
npm i
npm run start:dev
```
