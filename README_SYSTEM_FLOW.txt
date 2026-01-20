================================================================================
KNOWLEDGE BASE: ALUR SISTEM & LOGIKA FORWARDING
================================================================================

Dokumen ini menjawab pertanyaan: 
1. "Bagaimana WHMCS tahu user sudah bayar?"
2. "Apakah sistem ini butuh AI/Upload Bukti Transfer?"

--------------------------------------------------------------------------------
1. KONSEP DASAR (NO AI, NO IMAGE UPLOAD)
--------------------------------------------------------------------------------
Sistem QiosLink ini menggunakan teknologi **Server-to-Server Callback (Webhook)**.

PENTING:
- **TIDAK ADA AI:** Sistem tidak membaca gambar struk/screenshot.
- **TIDAK ADA UPLOAD:** User tidak perlu upload bukti transfer.
- **ANTI STRUK PALSU:** Karena kita tidak mengecek gambar, user tidak bisa menipu dengan struk editan Photoshop/AI. Kita hanya percaya jika ada sinyal uang masuk dari Bank/Qiospay.

ANALOGI:
Bayangkan "SMS Banking". Ketika ada uang masuk, Bank mengirim SMS ke Anda. Anda percaya uang itu masuk karena SMS-nya dari Bank, bukan karena pengirim mengirim foto struk ATM.
Di sini, Qiospay bertindak sebagai Bank yang mengirim "SMS" (Callback) ke Website Anda.

--------------------------------------------------------------------------------
2. ALUR DETEKSI PEMBAYARAN (REAL MONEY DETECTION)
--------------------------------------------------------------------------------

A. SAAT ORDER DIBUAT (Request)
   1. User checkout (Invoice #100, Rp 50.000).
   2. QiosLink membuat kode unik/nominal unik di database.

B. SAAT USER BAYAR (Real Time)
   1. User Scan QRIS di HP mereka.
   2. Transaksi berhasil di sisi Bank (Gopay/OVO/BCA user).
   3. Jaringan Pembayaran Nasional (GPN/Bank) memberitahu Server Qiospay: "Ada dana masuk Rp 50.000".

C. SAAT CALLBACK (Notifikasi Server)
   1. Detik itu juga, Server Qiospay menembak URL Anda: `https://domain-anda.com/callback.php`
   2. Data yang dikirim bukan gambar, tapi data mentah valid:
      {
         "status": "success",
         "amount": 50000,
         "desc": "Payment from..."
      }
   3. Server Anda menerima data ini. Karena pengirimnya adalah IP Qiospay, data ini dianggap Otoritas Tertinggi (Kebenaran Mutlak).

--------------------------------------------------------------------------------
3. LOGIKA FORWARDING (MENERUSKAN KABAR)
--------------------------------------------------------------------------------
Masalah: Qiospay hanya tahu lapor ke `callback.php` utama Anda. Dia tidak tahu Anda pakai WHMCS atau WooCommerce.

Solusi:
1. `callback.php` menerima kabar sukses dari Qiospay.
2. `callback.php` cek database: "Ooh, uang 50.000 ini untuk Invoice #100 milik WHMCS".
3. `callback.php` melakukan cURL (menelpon) ke Modul WHMCS Anda.
4. WHMCS merubah status jadi PAID.

--------------------------------------------------------------------------------
4. KEUNTUNGAN SISTEM INI
--------------------------------------------------------------------------------
1. **Hemat Biaya:** Tidak perlu beli API Key OpenAI/Gemini/Google Vision. Gratis selamanya (hanya bayar admin fee QRIS ke penyedia).
2. **Otomatis 24 Jam:** Tidak perlu Admin CS untuk cek mutasi manual atau validasi bukti transfer.
3. **Aman:** Menghilangkan risiko penipuan struk palsu (Fake Transfer Proof) yang marak terjadi.

--------------------------------------------------------------------------------
5. IMPLEMENTASI TEKNIS
--------------------------------------------------------------------------------
Pastikan file `callback.php` Anda selalu aktif dan hosting Anda tidak memblokir Incoming Connection (Post) dari IP luar, agar Qiospay bisa mengirim data.
