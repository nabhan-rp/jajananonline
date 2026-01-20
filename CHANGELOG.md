
# Changelog Jajanan Online

Semua perubahan pada proyek **Jajanan Online** (SaaS QRIS Engine) didokumentasikan di sini.

**Current Version:** `v1.1`
**Release Date:** 15 Januari 2026

---

## [v1.1] - 2026-01-15
### Major Update: SaaS & Bridge Mode
- **User Management:** Superadmin kini bisa mengelola User, Merchant, dan CS.
- **Dual Integration Mode:**
  - **Native Mode:** Website ini menjadi Host QRIS langsung (menggunakan akun Qiospay sendiri).
  - **Bridge Mode:** Website ini menjadi Client yang "menembak" ke website QiosLink lain (mirip cara kerja modul WHMCS).
- **Profile Settings:** User bisa update profil dan password sendiri.
- **Merchant Config:** UI baru untuk mengatur kredensial toko dan mode integrasi.
- **UI Restoration:** Landing Page kembali ke versi lengkap dengan animasi dan fitur showcase.

## [v1.0] - 2026-01-14
### Initial Release
- **Rebranding:** Perubahan total UI/UX menjadi "Jajanan Online".
- **Product Types:** License Keys, Digital Static, Physical.
- **Embedded QRIS:** Integrasi engine pembayaran QiosLink native.
- **Auto Delivery:** Serial key dikirim otomatis setelah paid.
