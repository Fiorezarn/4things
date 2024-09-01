# 4Things

4Things adalah aplikasi berbasis website yang memungkinkan pengguna untuk berbagi, menilai, dan bertanya tentang produk yang mereka minati. Pengguna dapat menjelajahi produk terbaru, melihat produk yang sedang tren, serta mengelola pertanyaan dan jawaban terkait produk.

## Deskripsi Proyek

Aplikasi ini menawarkan fitur-fitur berikut:

- **Home Page:** Menampilkan daftar produk dan pertanyaan terbaru.
- **Trending Page:** Menampilkan produk dan pertanyaan yang disorting dengan like terbanyak.
- **My Questions Page:** Mengelola dan menampilkan pertanyaan yang telah diajukan oleh pengguna.
- **Authentication:** Fitur login untuk mengakses dan mengelola konten pribadi.
- **Registration:** Fitur untuk mendaftarkan akun baru.
- **Forgot Password:** Fitur untuk memulihkan kata sandi yang terlupa.
- **Dashboard:** Fitur untuk admin mengelola dan menampilkan category.

## Tech Stack

Aplikasi ini dibangun menggunakan teknologi berikut:

- **Frontend:**

  - **React.js:** Library JavaScript untuk membangun antarmuka pengguna.
  - **React Router:** Untuk navigasi di dalam aplikasi.
  - **Axios:** Untuk melakukan request HTTP ke backend.
  - **Flowbite React:** Komponen UI berbasis Tailwind CSS.
  - **Tailwind CSS:** Framework CSS untuk desain yang responsif dan modern.
  - **Date-fns:** Library untuk manipulasi dan format tanggal.
  - **React Icons:** Koleksi ikon untuk digunakan dalam antarmuka pengguna.
  - **React Toastify:** Untuk menampilkan notifikasi yang elegan dan dapat disesuaikan.

- **Backend:**

  - **Nest.js:** Framework web untuk Node.js.
  - **MySQL:** Basis data SQL untuk menyimpan data pengguna, produk, dan pertanyaan.
  - **Sequelize & Sequelize-Typescript:** ORM untuk mengelola database.
  - **JWT (JSON Web Token):** Untuk autentikasi berbasis token.
  - **TypeScript:** Bahasa pemrograman berbasis JavaScript dengan tipe statis.

## Cara Install Project

### 1. Clone Repositori Back-End

```bash
git clone -b 4things-be https://github.com/Fiorezarn/4things.git
cd 4things-be
npm i
Pastikan server web lokal seperti Laragon atau XAMPP sudah berjalan dan terhubung dan buat database dengan nama 4things.
npm run start:dev
```

### 2. Clone Repositori Front-End

```bash
git clone -b 4things-fe https://github.com/Fiorezarn/4things.git
cd 4things-fe
npm i
npm run dev
```

## Cara Menggunakan Aplikasi

_Cara membuat akun baru:_

```bash
1. Buka project 4Things di browser Anda (misalnya: http://localhost:3000)
2. Klik tombol "Register" di halaman utama
3. Isi formulir pendaftaran dengan informasi yang diperlukan:
   - Username
   - Fullname
   - Email
   - Password
4. Klik tombol "Register" untuk menyelesaikan proses pendaftaran
5. Akun baru Anda akan dibuat, dan Anda akan otomatis masuk ke dalam halaman home
```

_Cara Membuat Pertanyaan Baru di My Questions:_

```bash
1. Setelah login, navigasikan ke halaman "My Questions" menggunakan menu navigasi
3. Masukkan judul pertanyaan pada field "Question Title"
3. Masukkan category pada field "Question Category"
4. Masukkan deskripsi pertanyaan pada field "Question Description"
4. Masukkan image pertanyaan pada field "File"
5. Klik tombol "Submit" untuk mengajukan pertanyaan Anda
6. Pertanyaan baru Anda akan ditambahkan ke daftar pertanyaan di halaman "My Questions"
```

_Cara Menjelajahi Halaman Home dan Trending serta Berinteraksi:_

```bash
1. Navigasikan ke halaman "Home" untuk melihat produk dan pertanyaan terbaru
2. Navigasikan ke halaman "Trending" untuk melihat produk dan pertanyaan yang sedang trending berdasarkan jumlah like terbanyak
3. Untuk memberikan komentar pada postingan orang lain:
   - Pilih postingan yang ingin Anda komentari
   - Masukkan komentar Anda di kolom komentar
   - Klik tombol "Submit" untuk mengirimkan komentar
4. Untuk memberikan like pada postingan orang lain:
   - Klik ikon "Like" pada postingan yang ingin Anda sukai
   - Jumlah like akan otomatis bertambah
```

_Cara Mengelola Kategori sebagai Admin:_

```bash
1. Login sebagai admin menggunakan akun yang memiliki hak akses admin
2. Navigasikan ke halaman "Dashboard" di panel admin
3. Untuk menambahkan kategori baru:
   - Klik tombol "Add Category"
   - Masukkan nama kategori baru di kolom yang disediakan
   - Klik tombol "Save" untuk menyimpan kategori baru
4. Untuk mengedit kategori yang ada:
   - Klik ikon "Edit" di samping kategori yang ingin Anda ubah
   - Lakukan perubahan pada nama kategori
   - Klik tombol "Save" untuk menyimpan perubahan
5. Untuk menghapus kategori:
   - Klik ikon "Delete" di samping kategori yang ingin Anda hapus
   - Konfirmasi penghapusan dengan mengklik tombol "Delete" pada dialog konfirmasi
```

## Dokumentasi Aplikasi

### Halaman Login

![alt text](https://github.com/Fiorezarn/4things/blob/main/image/loginpage.png?raw=true)

### Halaman Register

![alt text](https://github.com/Fiorezarn/4things/blob/main/image/registerpage.png?raw=true)

### Halaman Forgot Password

![alt text](https://github.com/Fiorezarn/4things/blob/main/image/forgotpage.png?raw=true)

### Halaman Home

![alt text](https://github.com/Fiorezarn/4things/blob/main/image/homepage.png?raw=true)

### Halaman Trending

![alt text](https://github.com/Fiorezarn/4things/blob/main/image/trendingpage.png?raw=true)

### Halaman MyQuestion

![alt text](https://github.com/Fiorezarn/4things/blob/main/image/questionpage.png?raw=true)

### Halaman Dashboard

![alt text](https://github.com/Fiorezarn/4things/blob/main/image/dashboardpage.png?raw=true)


