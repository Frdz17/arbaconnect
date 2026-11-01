# ArbaConnect ERP — Dokumentasi & Arsitektur Sistem Vanilla

> **Sistem Manajemen Logistik & Distribusi Farmasi Herbal CV Arba'in Solo Raya**  
> *Standar Kepatuhan CDOB (Cara Distribusi Obat yang Baik) & Mutasi Stok FEFO (First-Expired, First-Out)*  
> *Implementasi: Standalone Pure Vanilla HTML5, CSS3, & ES6 JavaScript (Zero-Build)*

---

## 📌 Pengantar Dokumentasi

Dokumentasi ini menyajikan referensi arsitektur teknis lengkap, domain bisnis, kamus data, audit tampilan antarmuka, dan sistem token desain dari **ArbaConnect ERP**.

Seluruh sistem saat ini beroperasi secara penuh di atas fondasi **Pure Vanilla Web Architecture (HTML5 + CSS3 kustom + JavaScript modular)** tanpa membutuhkan bundler (Vite), transpiler (TypeScript), framework (React), maupun dependensi Node (`node_modules`). Aplikasi dapat langsung dijalankan dengan membuka berkas [`index.html`](file:///home/sam/Code/arbaconnect/arbaconn/index.html) di peramban web modern atau disajikan melalui server statis apa pun.

---

## 📚 Peta Modul Dokumentasi (`docs/`)

Berikut adalah daftar modul dokumentasi komprehensif yang tersedia:

| No | Modul Dokumentasi | Deskripsi & Cakupan Teknis |
| :---: | :--- | :--- |
| **01** | [`01_CURRENT_SYSTEM_OVERVIEW.md`](file:///home/sam/Code/arbaconnect/arbaconn/docs/01_CURRENT_SYSTEM_OVERVIEW.md) | **Arsitektur Sistem Vanilla**: Analisis tumpukan teknologi runtime tanpa build, struktur direktori aktif, alur kerja reaktif (`ArbaStore`), sinkronisasi transisi layout shell (`app-content-wrapper`), perutean URL hash, dan perbandingan performa. |
| **02** | [`02_DOMAIN_AND_BUSINESS_RULES.md`](file:///home/sam/Code/arbaconnect/arbaconn/docs/02_DOMAIN_AND_BUSINESS_RULES.md) | **Domain Bisnis & Regulasi Logistik**: Wilayah operasional Solo Raya (6 sub-rayon), kepatuhan CDOB BPOM, mekanisme seleksi batch FEFO, formula persediaan ROP ($d \times L + SS$), manajemen kredit B2B, dan geofencing GPS sales. |
| **03** | [`03_DATA_MODELS_AND_MOCK_DATA.md`](file:///home/sam/Code/arbaconnect/arbaconn/docs/03_DATA_MODELS_AND_MOCK_DATA.md) | **Model Data & Kamus Master Data**: Struktur skema data di [`js/data.js`](file:///home/sam/Code/arbaconnect/arbaconn/js/data.js), relasi ERD, 7 produk herbal tersanitasi, 11 outlet B2B terverifikasi, 6 pesanan aktif, buku besar stok SHA-256, dan manifest armada. |
| **04** | [`04_VIEWS_AND_UI_COMPONENTS_AUDIT.md`](file:///home/sam/Code/arbaconnect/arbaconn/docs/04_VIEWS_AND_UI_COMPONENTS_AUDIT.md) | **Audit 5 Modul Tampilan & Komponen UI**: Spesifikasi tata letak shell global (Header 64px, Sidebar responsif 64px/256px dengan layout shift content wrapper), hierarki 3 seksi Executive Dashboard, 5 modul perender view, modal interaktif, dan toast. |
| **05** | [`05_DESIGN_SYSTEM_AND_TOKENS.md`](file:///home/sam/Code/arbaconnect/arbaconn/docs/05_DESIGN_SYSTEM_AND_TOKENS.md) | **Sistem Desain, Token CSS, & Tipografi**: Variabel CSS di [`css/tokens.css`](file:///home/sam/Code/arbaconnect/arbaconn/css/tokens.css), palet warna Material 3 (Deep Herbal Teal & Sky Corporate Blue), mode gelap, tipografi Google Fonts, serta aturan cetak Surat Jalan dan struk 58mm. |
| **06** | [`06_VANILLA_PROTOTYPE_BLUEPRINT.md`](file:///home/sam/Code/arbaconnect/arbaconn/docs/06_VANILLA_PROTOTYPE_BLUEPRINT.md) | **Cetak Biru Arsitektur & Mesin Eksekusi Vanilla**: Pola arsitektur modular tanpa bundler, pemuatan skrip berurutan, siklus hidup reaktif Pub/Sub di [`js/store.js`](file:///home/sam/Code/arbaconnect/arbaconn/js/store.js), sinkronisasi URL hash (`hashchange`), kontrol query param, dan persistensi `localStorage`. |
| **07** | [`07_VANILLA_IMMERSION_REPORT.md`](file:///home/sam/Code/arbaconnect/arbaconn/docs/07_VANILLA_IMMERSION_REPORT.md) | **Laporan Pengiriman & Verifikasi Paritas**: Checklist verifikasi 100% paritas fitur, laporan resolusi layout shift sidebar, perbaikan integritas tag HTML, verifikasi screenshot peramban headless, dan panduan eksekusi. |

---

## 🎯 Ringkasan Eksekutif Sistem

### 1. Entitas & Cakupan Wilayah
- **Nama Perusahaan**: CV Arba'in Solo Raya (Produsen & Distributor Resmi Herbal Berstandar BPOM & Halal).
- **Fasilitas Distribusi Utama**: Gudang Sentral Kartasura, Sukoharjo.
- **Wilayah Distribusi Terpadu**: 6 sub-rayon aglomerasi Solo Raya (Kota Surakarta/Solo, Sukoharjo, Karanganyar, Klaten, Boyolali, Sragen).
- **Jaringan Mitra**: 148+ apotek mandiri, jaringan waralaba farmasi (K-24, Kimia Farma), dan swalayan ritel (Luwes).

### 2. Lima Modul Utama Aplikasi
1. **Executive Dashboard ([`js/views/executiveDashboard.js`](file:///home/sam/Code/arbaconnect/arbaconn/js/views/executiveDashboard.js))**:
   - **Seksi 1 (Grid 4 Kartu KPI Utama)**: Omset Bulanan (Rp 482.650.000, 96.5% Target), Total Mitra B2B (148 Outlet), Kunjungan Sales Hari Ini (38/45 Target), dan Integritas Stok & ROP (4 SKU Kritis).
   - **Seksi 2 (Grid Analitik 60% / 40%)**: Grafik batang ganda SVG murni (Target vs Realisasi Penjualan) 5 kategori herbal dengan sakelar *Bulan Ini* vs *Q1 2026*, berdampingan dengan Matriks Loyalitas Pelanggan RFM (*Champions, Loyal, At-Risk*) dan Proyeksi Repeat Order Prediktif.
   - **Seksi 3 (Tabel Stream Pesanan Real-Time)**: PWA Stream 8 kolom dengan pencarian UUID/outlet, filter status sinkronisasi, dan aksi inspeksi detail.
   - Ekspor laporan eksekutif PDF & CSV.

2. **Inventory & Stock Ledger ([`js/views/inventoryLedger.js`](file:///home/sam/Code/arbaconnect/arbaconn/js/views/inventoryLedger.js))**:
   - 4 Kartu KPI Inventaris (Total SKU, Di Bawah ROP, Peringatan FEFO, Integritas Hash SHA-256).
   - Panel visualisasi: Donat SVG komposisi FEFO, progress bar safety stock, banner Gudang Utama Kartasura.
   - Katalog stok gudang dengan visualisasi formula Reorder Point ($ROP = d \times L + SS$).
   - Buku besar mutasi stok imutabel (*immutable ledger*) dengan filter pills (`ALL`, `MASUK`, `KELUAR`, `PENYESUAIAN`, `RETUR`).
   - 5 Modal operasional: Penerimaan batch baru, penyesuaian opname stok, monitoring PO supplier, penerbitan PO ke vendor, dan cetak lembar opname.

3. **B2B CRM & Directory ([`js/views/b2bCrm.js`](file:///home/sam/Code/arbaconnect/arbaconn/js/views/b2bCrm.js))**:
   - 4 Kartu KPI CRM (Total Mitra, Plafon Kredit Aktif, Rata-rata Kunjungan, Wilayah Terlayani).
   - Multi-filter bar (pencarian nama/kode/PIC/alamat, filter kota Solo Raya, tipe outlet, status kredit, dan rute sales).
   - Tabel master 8 kolom dengan visualisasi gauge penggunaan kredit dan seleksi baris interaktif.
   - Panel laci samping (side drawer) 4 kolom: grafik tren omset sparkline SVG 6 bulan, profil apoteker penanggung jawab (APA), rincian plafon kredit, dan log aktivitas kunjungan lapangan.
   - Modal registrasi outlet baru, asisten komunikasi WhatsApp (3 template pesan otomatis), penjadwalan kunjungan sales, dan cetak rekening koran.

4. **Order Approval Queue ([`js/views/orderApproval.js`](file:///home/sam/Code/arbaconnect/arbaconn/js/views/orderApproval.js))**:
   - 4 Tab status pesanan (*Perlu Otorisasi, Diproses Hari Ini, Manifest Armada, Ditolak/Void*).
   - Seleksi multi-checkbox dan fitur **Batch Approve** yang memotong stok fisik secara atomik dan mencatat entri buku besar otomatis.
   - Tab Manifest Logistik Armada: kapasitas muat kendaraan, alokasi rute, dan pencatatan serah terima (Proof of Delivery / POD) oleh driver.
   - Inspeksi rinci pesanan: verifikasi koordinat presisi GPS geofence, validasi ketersediaan batch, dan batas kredit outlet.
   - Modal cetak Surat Jalan resmi 3-rangkap berstandar CDOB, dialog substitusi batch gudang B, penyesuaian kuantitas SKU, dan pembatalan pesanan.

5. **Field Sales PWA Preview ([`js/views/fieldSalesPwa.js`](file:///home/sam/Code/arbaconnect/arbaconn/js/views/fieldSalesPwa.js))**:
   - Sakelar viewport responsif: Simulasi smartphone frame 390px vs mode fullscreen layar penuh.
   - Fitur GPS Check-in luar ruangan dengan perhitungan jarak radius dinamis (8–20 m dari apotek target).
   - Katalog pemesanan cepat ramah sentuhan (*touch-friendly*) dengan stepper kuantitas besar (`-` dan `+`) serta tab kategori.
   - Bilah checkout bawah lekat (*sticky bottom bar*) dengan kalkulasi total item dan nominal rupiah instan.
   - Modal cetak struk kasir termal ukuran 58mm dengan fitur berbagi teks rincian pesanan langsung ke nomor WhatsApp pemilik apotek.
