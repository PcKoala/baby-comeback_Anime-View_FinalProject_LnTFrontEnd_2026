# Anime View

## Deskripsi Program

Anime View adalah website anime streaming dan manga berbasis frontend yang dibuat dengan React.js dan Vite. Website ini dirancang dengan tampilan rapi bertema streaming anime dan manga platform yang menampilkan anime populer dan manga populer, serta fitur pencarian anime secara dinamis menggunakan API.

Website ini memiliki beberapa halaman utama seperti Home Page, Browse Anime, Watch Page, Login, dan Register. Data anime pada website diambil menggunakan Jikan API sehingga anime dapat berubah secara dinamis tanpa perlu menambahkan data secara manual satu per satu.

---

## Framework dan Teknologi yang Digunakan

* React.js
* Vite
* TailwindCSS
* React Router DOM
* Jikan API

---

## Fitur Utama

### Home Page

* Hero section anime
* Popular Anime This Week
* New This Season
* Popular Manga This Week
* Dynamic anime poster menggunakan API

### Browse Anime

* Filter kategori anime:

  * Popular
  * New
  * Most Watched
  * On-Going
  * Finished

### Watch Page

* Menampilkan detail anime
* Judul anime dinamis
* Deskripsi anime

### Login & Register

* Halaman autentikasi
* Routing menggunakan React Router
* Redirect ke Main Page setelah login/register

### Search Anime

* Pencarian anime menggunakan Jikan API
* Menampilkan hasil anime secara dinamis

### Theme Mode

* Dark Mode
* Light Mode

---

## Alur Program

1. User membuka website Anime View.
2. User dapat melihat anime populer dan anime terbaru pada Home Page.
3. Data anime diambil secara dinamis menggunakan Jikan API.
4. User dapat melakukan pencarian anime melalui search bar.
5. User dapat membuka halaman Browse Anime untuk melihat kategori anime tertentu.
6. User dapat membuka Watch Page untuk melihat detail anime.
7. User dapat melakukan Login atau Register untuk masuk ke website.
8. Website mendukung Dark Mode dan Light Mode.

---

## Struktur Folder

```plaintext
src/
├── assets/
├── components/
├── pages/
├── services/
├── data/
├── App.jsx
├── main.jsx
```

---

## Cara Menjalankan Program

1. Install dependencies

```bash
npm install
```

2. Jalankan project

```bash
npm run dev
```

3. Buka browser

```plaintext
http://localhost:5174
```

---

## Anggota Kelompok

### 1. Dewa Gede Eka Aruna Widjana & Magnolia Levina Putri

Jobdesk:

* Mendesain tampilan UI/UX
* Membuat struktur halaman website
* Mendesain layout website

### 2. Magnolia Levina Putri

Jobdesk:

* Mengimplementasikan React Components
* Mengatur routing halaman
* Mengembangkan fitur frontend

### 3. Dewa Gede Eka Aruna Widjana

Jobdesk:

* Mengintegrasikan API anime
* Membuat fitur search anime
* Testing dan debugging program

---

## API yang Digunakan

Jikan API:
https://api.jikan.moe/

---

## Penutup

Anime View dibuat sebagai website frontend anime streaming modern dengan tampilan interaktif dan data anime dinamis menggunakan API.