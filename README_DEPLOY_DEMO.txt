================================================================================
PANDUAN DEPLOY DEMO (STATIC MODE)
================================================================================

Anda bisa mengonlinekan aplikasi ini sebagai portofolio/demo tanpa database MySQL.
Aplikasi akan menggunakan "Mock Data" (Data Palsu) yang tersimpan di browser pengunjung.

CARA INSTALL DI KOMPUTER (HILANGKAN BLANK SCREEN):
1. Pastikan Anda memiliki file `package.json` dan `vite.config.ts` (sudah saya buatkan).
2. Buka terminal di folder project ini.
3. Ketik: `npm install` (Tunggu sampai selesai).
4. Ketik: `npm run dev` (Untuk edit/preview).
5. Ketik: `npm run build` (Untuk membuat file siap upload).

CARA UPLOAD KE HOSTING (qioslink-demo.orgz.top):
1. Setelah jalankan `npm run build`, akan muncul folder bernama `dist`.
2. Buka folder `dist` tersebut.
3. Upload SEMUA ISI folder `dist` (index.html, folder assets, dll) ke `public_html` hosting Anda.
4. Selesai! Akses domain Anda.

AKUN DEMO UNTUK PENGUNJUNG:
Berikan kredensial ini di deskripsi repo/website Anda agar orang bisa mencoba:

- Super Admin:
  User: dev_admin
  Pass: dev_admin

- Merchant (Penjual):
  User: merchant_user
  Pass: merchant_user

- User (Pembeli):
  User: member_budi
  Pass: member_budi

CATATAN:
Karena ini Mode Demo Statis, fitur "Integration" (Download Module) tetap tampil tapi file PHP backend tidak akan berfungsi karena tidak ada server PHP yang memprosesnya. Namun untuk sekadar showcase UI/UX, ini sudah SANGAT SEMPURNA.
