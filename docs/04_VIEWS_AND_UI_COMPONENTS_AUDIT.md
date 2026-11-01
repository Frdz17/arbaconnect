# 04 - Audit Layar Tampilan & Komponen UI

Dokumen ini mendokumentasikan secara menyeluruh setiap elemen antarmuka, tata letak (*layout*), interaksi pengguna, komponen dialog modal, dan tabel data pada ke-5 modul tampilan **ArbaConnect ERP** sebagaimana diimplementasikan pada [`index.html`](file:///home/sam/Code/arbaconnect/arbaconn/index.html), [`css/layout.css`](file:///home/sam/Code/arbaconnect/arbaconn/css/layout.css), [`css/components.css`](file:///home/sam/Code/arbaconnect/arbaconn/css/components.css), [`js/app.js`](file:///home/sam/Code/arbaconnect/arbaconn/js/app.js), dan modul perender di [`js/views/`](file:///home/sam/Code/arbaconnect/arbaconn/js/views).

---

## 1. Arsitektur Komponen Global (Frame & Shell)

```
+---------------------------------------------------------------------------------------+
| HEADER (.app-header, Tinggi: 64px, Fixed Top)                                         |
| [Logo ArbaConnect]  [Pencarian Global: SKU/Apotek/Faktur]  [Role] [Sync] [Theme] [Bell] |
+---------------+-----------------------------------------------------------------------+
| SIDEBAR       | MAIN CONTENT AREA (#main-view-container, Padding-left: 64px)           |
| (.app-sidebar)|                                                                       |
| (64px/256px)  |  Modul Tampilan Aktif:                                                |
| [Dashboard]   |  1. js/views/executiveDashboard.js                                    |
| [Inventory]   |  2. js/views/inventoryLedger.js                                       |
| [B2B CRM]     |  3. js/views/b2bCrm.js                                                |
| [Order Appr]  |  4. js/views/orderApproval.js                                         |
| [Field PWA]   |  5. js/views/fieldSalesPwa.js                                         |
| [CDOB Card]   |                                                                       |
| [Fold Button] |                                                                       |
+---------------+-----------------------------------------------------------------------+
| FOOTER (.app-footer): ArbaConnect v2.5.0-Vanilla · Gudang Kartasura · Kepatuhan CDOB    |
+---------------------------------------------------------------------------------------+
```

### A. Header Bar ([`css/layout.css`](file:///home/sam/Code/arbaconnect/arbaconn/css/layout.css) & [`js/app.js`](file:///home/sam/Code/arbaconnect/arbaconn/js/app.js))
- **Branding (`#header-brand-logo`)**: Logo resmi CV Arba'in, teks judul *"ArbaConnect"*, sub-teks *"CV Arba'in Logistics ERP"*. Mengklik logo langsung mengarahkan ke Executive Dashboard.
- **Pencarian Cepat 3-Kategori (`#global-search-input`)**:
  - Input teks pencarian dengan pembersihan instan (`#search-clear-btn`).
  - Dropdown hasil live (`#global-search-dropdown`) menampilkan 3 kategori sekaligus:
    1. *Mitra B2B Outlet*: Menampilkan nama apotek & kota; diklik mengarahkan ke CRM dan memilih outlet tersebut.
    2. *Produk & SKU Herbal*: Menampilkan nama produk & saldo stok; diklik mengarahkan ke Inventory Ledger.
    3. *Faktur Pesanan B2B*: Menampilkan client UUID, nama apotek, dan total Rupiah; diklik mengarahkan ke antrean order.
- **Role Perspective Switcher (`#role-perspective-select`)**:
  - Pilihan peran: *Direksi & Manajemen (`executive`)*, *Field Sales PWA (`field-sales`)*, *Admin Gudang & Stok (`inventory`)*, *Admin Sales & Verifikasi (`sales-ops`)*.
  - Perubahan opsi langsung memutasi `window.ArbaStore.setRole(role)`.
- **Indikator Mode Online / Lokal (`#header-online-btn`)**:
  - Titik indikator hijau (`online`) bertuliskan "Tersinkron" atau kuning (`offline`) bertuliskan "Mode Lokal".
  - Mengklik tombol memicu `window.ArbaStore.toggleOnlineStatus()`.
- **Sakelar Tema Mode Gelap (`#header-dark-btn`)**:
  - Ikon *dark_mode* / *light_mode* yang menambahkan/menghapus kelas `.dark` pada elemen `<html>`.
- **Menu Notifikasi Sistem (`#header-notif-btn` & `#header-notif-menu`)**:
  - Badge merah indikator pesanan pending; dropdown berisi tautan cepat verifikasi pesanan, peringatan ROP, dan audit CDOB.
- **Profil Pengguna (`#header-profile-pill`)**:
  - Avatar inisial "AB", menampilkan nama akun dan role aktif saat diklik via toast notifikasi.

### B. Sidebar Navigasi ([`css/layout.css`](file:///home/sam/Code/arbaconnect/arbaconn/css/layout.css) & [`js/app.js`](file:///home/sam/Code/arbaconnect/arbaconn/js/app.js))
- **Dua Mode Tampilan & Sinkronisasi Tata Letak Konten**:
  - *Collapsed* (lebar 64px): Menampilkan susunan ikon vertikal dengan badge counter tereduksi. Elemen `#app-content-wrapper` memiliki `padding-left: 64px`.
  - *Expanded* (lebar 256px): Menampilkan label teks penuh dan badge numerik counter.
  - **Sinkronisasi Tata Letak Desktop vs Mobile**:
    - *Desktop (`min-width: 1024px`)*: Saat sidebar dibuka, `#app-content-wrapper` menerima kelas `.sidebar-open` yang mentransisikan `padding-left` secara mulus dari `64px` ke `256px` (`cubic-bezier(0.4, 0, 0.2, 1)`). Elemen `#sidebar-backdrop` dinonaktifkan (`display: none !important`), memastikan seluruh kartu, tombol, tabel, dan input pada dashboard tetap 100% interaktif tanpa terhalang lapisan gelap.
    - *Tablet / Mobile (`< 1024px`)*: `#app-content-wrapper` dipertahankan pada `padding-left: 64px` agar area pandang konten tidak terhimpit. Sidebar bertindak sebagai *drawer overlay* dengan latar belakang redup (`#sidebar-backdrop`), dan otomatis melipat kembali saat tautan navigasi ditekan.
- **5 Tombol Navigasi (`.nav-button`)**:
  1. `data-path="executive-dashboard"`: Ikon `dashboard`.
  2. `data-path="inventory-stock-ledger"`: Ikon `inventory_2`, badge counter stok di bawah ROP.
  3. `data-path="b2b-crm-directory"`: Ikon `store`.
  4. `data-path="order-approval-queue"`: Ikon `fact_check`, badge counter pesanan `PENDING`.
  5. `data-path="field-sales-pwa-preview"`: Ikon `smartphone`.
- **Bagian Bawah**:
  - Kartu Kepatuhan Standar CDOB (ikon saja saat collapsed, kartu penuh informatif saat expanded).
  - Tombol Lipat/Buka Menu (`#sidebar-toggle-btn`) dengan ikon `chevron_right` atau `dock_to_left`.

---

## 2. Rincian Modul 1: Executive Dashboard

**File**: [`js/views/executiveDashboard.js`](file:///home/sam/Code/arbaconnect/arbaconn/js/views/executiveDashboard.js)

Tampilan dashboard eksekutif disusun dalam 3 seksi visual utama berhierarki bersih:

1. **Seksi 1: Grid 4 Kartu KPI Utama (`grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4`)**:
   - *Total Omset Bulanan*: **Rp 482.650.000** (MoM +14.8%), visualisasi bar pencapaian target 96.5% dari target Rp 500 Juta.
   - *Outlet B2B Aktif*: **148 Titik Distribusi** (+6 Mitra Baru), visualisasi bar split proporsi jenis mitra (92 Apotek / 62% vs 56 Minimarket / 38%).
   - *Kunjungan Sales Hari Ini*: **38 / 45 Target** (Capaian 84.4%), pemantauan 5 Sales Rep aktif dengan verifikasi GPS Geofence.
   - *Integritas Stok & ROP*: **4 SKU Kritis Terdeteksi** (2 butuh restock, 2 batch near-expiry), dilengkapi tombol aksi cepat *"Prioritas FEFO: Madu Habbatus"*.

2. **Seksi 2: Grid Analitik & Strategi Loyalitas (60% / 40% Split Layout)**:
   - **Panel Kiri (7 Kolom - Tren Penjualan B2B Produk Herbal)**:
     - Grafik batang ganda SVG murni (Target Hijau Teal vs Realisasi Biru Cerah) tanpa dependensi library eksternal.
     - 5 Kategori Produk Utama CV Arba'in: *Madu Herbal (138M), Habbatus (114M), Minyak Zaitun (92M), Jamu Cair (78M), Suplemen (60M)*.
     - Sakelar filter periode interaktif: **Bulan Ini (Maret 2026)** vs **Kumulatif Q1 2026**.
     - 3 Kartu Ringkasan Bawah: *Top SKU Q1 (Madu Murni Arba 500g)*, *Rata-rata Order (Rp 3.260.000 / PO)*, dan *Fulfillment FEFO (99.4% Kepatuhan)*.
   - **Panel Kanan (5 Kolom - Customer Loyalty & Algoritma Prediktif)**:
     - *Segmentasi Pelanggan RFM*:
       - **Champions (RO <7 Hari)**: 34 Apotek (contoh: Kimia Farma Slamet Riyadi, K-24 UNS).
       - **Loyal Customers (Rutin 2 Minggu)**: 58 Mitra dengan kepatuhan termin Net 30.
       - **At-Risk (>30 Hari Tanpa Order)**: 12 Mitra klaster Solo Baru & Boyolali, dilengkapi tombol aksi *"Kirim Sales Visit"* untuk penugasan tim lapangan.
     - *Proyeksi Repeat Order Minggu Ini*: Perhitungan algoritma prediktif waktu habis stok apotek (Apotek Sehat Mandiri Kartasura, Minimarket Barokah Sukoharjo).

3. **Seksi 3: Stream Pesanan Lapangan Real-Time (`PWA Stream`)**:
   - Tabel 8 kolom pemantauan alur transaksi masuk dari sales lapangan dengan sinkronisasi instan ke stok gudang:
     - *Client UUID*, *Nama Outlet & Kota*, *Sales Rep*, *Waktu Order*, *Total Nilai (Rp)*, *Metode/Termin (Net 14/30 / COD)*, *Status Sinkronisasi (Synced & Stok Terpotong vs Menunggu Konfirmasi Gudang)*, dan *Aksi Cepat (Inspeksi & Faktur)*.
   - Bilah pencarian teks UUID/nama apotek dan tombol filter status stream (`Semua`, `Sync Sukses`, `Menunggu Gudang`).
   - Indikator status live: *WebSocket PWA Stream Terhubung: Latency 42ms · Menampilkan 6 dari 6 transaksi masuk hari ini*.

4. **Ekspor & Cetak Laporan**:
   - Tombol **"Ekspor Excel"**: Mengunduh berkas `.csv` rekap eksekutif secara instan via `ArbaUtils.downloadCsv`.
   - Tombol **"Unduh Laporan PDF"**: Membuka modal pratinjau ringkasan eksekutif berstandar formal yang siap dicetak ke format PDF.

> [!NOTE]
> **Ketahanan Tata Letak HTML5**: Seluruh kontainer flex/grid dan elemen progress bar dikonstruksi menggunakan pasangan tag pembuka dan penutup eksplisit (`<div></div>`) tanpa sintaks self-closing XML (`<div ... />`) untuk menjamin kepatuhan parser HTML peramban web dan mencegah tumpang tindih kolom.

---

## 3. Rincian Modul 2: Inventory & Stock Ledger

**File**: [`js/views/inventoryLedger.js`](file:///home/sam/Code/arbaconnect/arbaconn/js/views/inventoryLedger.js)

1. **4 Kartu Metrik Inventaris**:
   - *Total Fisik Herbal*: Jumlah unit fisik seluruh SKU di Kartasura.
   - *SKU di Bawah ROP*: Jumlah produk yang menyentuh batas pemesanan ulang.
   - *Peringatan Kedaluwarsa FEFO*: Jumlah batch yang berada dalam rentang kritis (<30 hari / <3 bulan).
   - *Integritas Ledger SHA-256*: Status validasi buku besar anti-manipulasi.
2. **3 Panel Analitik Visual**:
   - *Grafik Donat SVG FEFO*: Persentase proporsi stok Aman (>6 bulan), Mendekati ED (<3 bulan), dan Kritis (<30 hari).
   - *Status Stok Pengaman*: Bar pengukur kapasitas buffer stok Gudang Kartasura (88.4%).
   - *Banner Gudang Utama Kartasura*: Informasi alamat fasilitas, suhu ruang terkontrol (24.2°C), dan sertifikat CDOB aktif.
3. **Bagian 1: Katalog Stok & Monitor ROP**:
   - Filter tab kategori (*Semua, Madu Herbal, Kapsul Herbal, Minyak & Cairan*) dan filter status stok (*Semua Status, Optimal, Di Bawah ROP, Kedaluwarsa Kritis*).
   - Tabel menampilkan detail SKU, stok fisik, batas ROP beserta visualisasi rumusnya, batch aktif, tanggal FEFO, dan tombol aksi terbitkan PO.
4. **Bagian 2: Buku Besar Mutasi Stok Imutabel (Stock Ledger)**:
   - Filter pills jenis mutasi: `ALL`, `MASUK`, `KELUAR`, `PENYESUAIAN`, `RETUR`.
   - Menampilkan stempel waktu WIB, nomor dokumen, kode & nama SKU, batch, jumlah mutasi (hijau untuk masuk, merah untuk keluar), saldo akhir, operator, dan kode hash SHA-256.
5. **5 Dialog Modal Operasional**:
   - `+ Penerimaan Batch`: Formulir input barang masuk dari produsen, penunjukan nomor PO supplier, tanggal ED, dan kuantitas.
   - `Penyesuaian Opname`: Formulir penyesuaian stok fisik hasil stock opname berkala dengan alasan audit.
   - `Daftar PO Supplier`: Tabel pemantauan PO ke pabrik rekanan dengan tombol terima barang 1-klik.
   - `Terbitkan PO ke Vendor`: Formulir usulan PO otomatis berdasarkan kekurangan stok terhadap ROP.
   - `Pratinjau Lembar Opname`: Berkas cetak berita acara penghitungan fisik persediaan.

---

## 4. Rincian Modul 3: B2B CRM & Directory

**File**: [`js/views/b2bCrm.js`](file:///home/sam/Code/arbaconnect/arbaconn/js/views/b2bCrm.js)

1. **4 Kartu Metrik CRM**:
   - Total Mitra Terdaftar, Total Plafon Kredit B2B, Rata-rata Kunjungan per Bulan, Sub-Rayon Terlayani.
2. **Bilah Multi-Filter**:
   - Input pencarian apotek/kode/PIC/alamat.
   - Dropdown Wilayah Solo Raya, Tipe Outlet, dan Status Kredit (*Lancar, Perhatian, Overdue*).
   - Chips Rute Sales: *Semua Rute, Solo Tengah, Solo Baru, Karanganyar, Klaten, Boyolali, Sragen*.
3. **Tabel Master Mitra (8 Kolom)**:
   - Kolom: Kode & Nama Outlet, Kota, Jenis Badan Usaha, Apoteker Penanggung Jawab & WhatsApp, Sales Rep, Termin Pembayaran, Utilisasi Plafon Kredit (dengan gauge bar visual), dan Tanggal Order Terakhir.
   - Baris dapat diklik untuk memilih outlet aktif yang langsung memperbarui panel laci di samping kanan.
4. **Panel Laci Profil Mitra (Side Drawer 4 Kolom)**:
   - *Grafik Sparkline SVG*: Tren historis nilai belanja bulanan outlet selama 6 bulan terakhir.
   - *Status Limit Kredit*: Visualisasi gauge bar, nominal pemakaian, batas plafon, dan sisa kelonggaran kredit.
   - *Kontak Apoteker*: Nomor telepon dengan tautan langsung kirim WhatsApp.
   - *Log Aktivitas Kunjungan*: Tanggal kunjungan terakhir, sales yang bertugas, dan catatan apoteker.
5. **Modal Operasional CRM**:
   - `+ Daftarkan Outlet Baru`: Registrasi outlet baru dengan penomoran otomatis `AP-SLO-xxx`.
   - `WhatsApp Assistant`: 3 template pesan resmi (Follow-up Tagihan, Info Promo Restock, Konfirmasi Jadwal Kunjungan) yang dapat diedit dan langsung dikirim via `wa.me`.
   - `Jadwalkan Kunjungan Sales`: Formulir penugasan kunjungan sales rep ke outlet terkait.
   - `Riwayat Faktur & Rekening Koran`: Riwayat lengkap seluruh faktur pemesanan outlet dengan fitur cetak rekap.

---

## 5. Rincian Modul 4: Order Approval Queue

**File**: [`js/views/orderApproval.js`](file:///home/sam/Code/arbaconnect/arbaconn/js/views/orderApproval.js)

1. **4 Tab Antrean Status**:
   - *Perlu Otorisasi* (badge pending counter).
   - *Diproses Hari Ini* (pesanan yang telah disetujui).
   - *Manifest Armada* (pesanan yang masuk ke jadwal pengiriman driver).
   - *Ditolak / Void* (pesanan yang ditolak dengan catatan CDOB).
2. **Fitur Batch Selection & Batch Approve**:
   - Checkbox di header tabel untuk memilih seluruh pesanan secara massal.
   - Tombol **"Setujui Terpilih (Batch Approve)"** yang secara atomik memvalidasi ketersediaan stok fisik seluruh line item, memotong saldo stok produk, mencatat entri keluar ke buku besar, dan memindahkan status pesanan menjadi `APPROVED`.
3. **Inspeksi Detail Pesanan**:
   - Verifikasi koordinat GPS geofence apotek (koordinat lintang/bujur dan radius presisi).
   - Rincian item produk yang dipesan, harga satuan, subtotal, dan alokasi batch aktif FEFO.
4. **Tab Manifest Logistik Armada**:
   - Jadwal pengiriman Wave 1 (GranMax Box AD-8941-BA) dan Wave 2 (BlindVan AD-1044-YB).
   - Monitoring kapasitas muat kendaraan (kg/unit) dan rute perjalanan.
   - Tombol **"Konfirmasi Serah Terima (POD)"** oleh driver saat barang tiba di apotek pemesan.
5. **4 Modal Workflow Pesanan**:
   - `Surat Jalan Rangkap 3`: Dokumen pengiriman resmi dengan 3 rangkap lembar dan blok tanda tangan Apoteker APA, Driver Pengirim, dan Kepala Gudang Kartasura.
   - `Substitusi Batch Gudang`: Dialog alokasi nomor batch alternatif dari Gudang B jika batch prioritas 1 mengalami penipisan stok.
   - `Sesuaikan Kuantitas SKU`: Dialog penyesuaian kuantitas pesanan jika apotek meminta revisi volume.
   - `Tolak Pesanan`: Dialog pembatalan pesanan dengan kewajiban mengisi alasan audit CDOB.

---

## 6. Rincian Modul 5: Field Sales PWA Preview

**File**: [`js/views/fieldSalesPwa.js`](file:///home/sam/Code/arbaconnect/arbaconn/js/views/fieldSalesPwa.js)

1. **Sakelar Mode Tampilan (Viewport Switcher)**:
   - *Mode Frame Smartphone (390px)*: Simulasi realistis tampilan layar ponsel iPhone/Android lengkap dengan dynamic notch dan bayangan kontur fisik perangkat.
   - *Mode Layar Penuh (Fullscreen Responsive)*: Menyesuaikan tampilan lebar kontainer secara penuh.
2. **Header Mobile PWA**:
   - Profil sales aktif (Budi Santoso - Solo Tengah).
   - Sakelar simulasi koneksi Online/Offline lokal.
3. **Langkah 1: Check-In GPS Luar Ruangan**:
   - Menampilkan jarak meter sales ke apotek tujuan (antara 8–20 m).
   - Tombol **"Check-In GPS"** yang memverifikasi kehadiran di dalam radius aman geofence.
   - Pemilih apotek mitra yang sedang dikunjungi.
4. **Langkah 2: Katalog Pemesanan Cepat Ramah Sentuhan**:
   - Tab kategori produk untuk memfilter katalog herbal.
   - Kartu produk dengan gambar ikonik, badge masa kedaluwarsa FEFO, harga satuan, dan stepper kuantitas sentuh besar (`-` dan `+`).
5. **Langkah 3: Ketentuan Pembayaran & Catatan Apoteker**:
   - Pilihan termin: *Net 30 Hari*, *Net 14 Hari*, *COD (Tunai)*.
   - Kolom catatan instruksi khusus dari apoteker pemesan.
6. **Bilah Checkout Bawah Lekat (Sticky Checkout Bar)**:
   - Menampilkan total kuantitas item dan kalkulasi nilai Rupiah pesanan secara langsung.
   - Tombol **"Kirim Pesanan B2B"** yang memasukkan order ke antrean pusat (jika Online) atau antrean lokal offline (jika Offline).
7. **Modal Struk Kasir Termal 58mm**:
   - Visualisasi struk kertas dengan tepi robekan kasir khas POS bluetooth mobile.
   - Tombol **"Cetak Struk POS (58mm)"** yang langsung memicu dialog cetak printer termal.
   - Tombol **"Kirim Struk via WhatsApp"** yang membuka chat WhatsApp ke apoteker dengan format teks struk resmi CV Arba'in.
