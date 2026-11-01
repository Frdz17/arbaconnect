# 05 - Sistem Desain, Token CSS, & Tipografi

Dokumen ini mendokumentasikan spesifikasi token warna, hierarki tipografi, sistem ikon, serta aturan cetak (*print stylesheet*) yang menyusun identitas visual **ArbaConnect ERP** sebagaimana diimplementasikan pada berkas-berkas CSS di direktori [`css/`](file:///home/sam/Code/arbaconnect/arbaconn/css).

---

## 1. Filosofi Desain Visual

Identitas visual ArbaConnect memadukan dua karakter utama:
1. **Klinis & Medis Herbal (Deep Teal `#005c55`)**: Menghadirkan kesan kemurnian herbal alami, higienitas farmasi, otoritas standar CDOB, dan kepercayaan klinis.
2. **Logistik & Distribusi Korporat (Sky Corporate Blue `#006398`)**: Menghadirkan dinamisme armada pengiriman, transparansi faktur B2B, dan presisi rantai pasok.
3. **Kerapatan Desktop Enterprise (Zoom 90%)**: Diterapkan secara default melalui aturan `html { zoom: 0.9; }` pada [`css/tokens.css`](file:///home/sam/Code/arbaconnect/arbaconn/css/tokens.css) untuk menyajikan kepadatan informasi tinggi khas aplikasi ERP kelas atas tanpa terasa padat atau sesak.

---

## 2. Palet Token Warna (CSS Custom Properties)

Seluruh token visual didefinisikan pada [`css/tokens.css`](file:///home/sam/Code/arbaconnect/arbaconn/css/tokens.css):

### A. Warna Primer (Deep Herbal Teal)
| Token CSS | Kode HEX | Peruntukan Utama |
| :--- | :---: | :--- |
| `--color-primary` | `#005c55` | Tombol utama, warna aktif menu navigasi, brand title, tab terpilih |
| `--color-primary-container` | `#0f766e` | State hover tombol utama, header aksen |
| `--color-on-primary` | `#ffffff` | Teks di atas latar belakang primer |
| `--color-on-primary-container` | `#a3faef` | Teks aksen lembut di atas kontainer teal |
| `--color-primary-fixed` | `#9cf2e8` | Badge atau chip sorotan aktif |
| `--color-primary-fixed-dim` | `#80d5cb` | Border atau garis pemisah aksen |

### B. Warna Sekunder (Logistics Sky Blue)
| Token CSS | Kode HEX | Peruntukan Utama |
| :--- | :---: | :--- |
| `--color-secondary` | `#006398` | Indikator armada logistik, grafik minimarket, modul PWA |
| `--color-secondary-container` | `#5bb8fe` | Aksen biru cerah pada progress bar |
| `--color-on-secondary` | `#ffffff` | Teks di atas warna sekunder |
| `--color-on-secondary-container`| `#00476e` | Teks kontras tinggi pada kontainer biru |

### C. Warna Latar Permukaan (Surface System)
| Token CSS | Kode HEX | Peruntukan Utama |
| :--- | :---: | :--- |
| `--color-surface` | `#f8f9ff` | Latar belakang dasar halaman (*soft clean blue-white*) |
| `--color-surface-container-lowest` | `#ffffff` | Latar kartu (*card background*), modal, dropdown |
| `--color-surface-container-low` | `#eff4ff` | Latar input form, chip filter tidak aktif |
| `--color-surface-container` | `#e5eeff` | Hover state baris tabel dan kontrol sekunder |
| `--color-surface-container-high` | `#dce9ff` | Latar progress bar yang belum terisi |
| `--color-surface-container-highest`| `#d3e4fe`| Garis batas kontainer tebal |
| `--color-on-surface` | `#0b1c30` | Teks judul utama & body (*deep midnight navy*) |
| `--color-on-surface-variant` | `#3e4947` | Teks sekunder, label tabel, placeholder, deskripsi |
| `--color-border-subtle` | `#e2e8f0` | Garis tepi (*border*) pemisah komponen standar |

### D. Status Semantik & Indikator Kepatuhan (Badges)
| Status | Warna Teks | Warna Latar | Arti dalam Operasional |
| :--- | :---: | :---: | :--- |
| **Sukses (Optimal / Lancar)** | `#15803d` | `#dcfce7` | Stok aman di atas ROP, kredit lancar, order disetujui |
| **Peringatan (Warning / Tempo)** | `#b45309` | `#fef3c7` | Stok di bawah ROP, jatuh tempo $\le 5$ hari, batch near-ED |
| **Kritis (Danger / Overdue)** | `#b91c1c` | `#fee2e2` | Stok kosong, batch kritis $<30$ hari, kredit macet |

### E. Mode Gelap (Dark Mode Tokens)
Diaktifkan ketika elemen `<html>` memiliki kelas `.dark`:
- Latar Belakang Dasar (`--color-surface`): `#0f172a` (Slate 900)
- Permukaan Kartu (`--color-surface-container-lowest`): `#1e293b` (Slate 800)
- Kontainer Rendah (`--color-surface-container-low`): `#334155` (Slate 700)
- Warna Teks Utama (`--color-on-surface`): `#f8fafc` (Slate 50)
- Garis Tepi Pemisah (`--color-border-subtle`): `#334155`

---

## 3. Hierarki Tipografi & Font Eksternal

Aplikasi mengimpor dua jenis rupa huruf Google Fonts berlisensi terbuka di [`index.html`](file:///home/sam/Code/arbaconnect/arbaconn/index.html):

1. **Plus Jakarta Sans** (`--font-headline`):
   - Bobot: 500 (Medium), 600 (SemiBold), 700 (Bold), 800 (ExtraBold).
   - Penggunaan: Judul utama halaman, angka nilai KPI besar, nama modal dialog, dan header kartu.
2. **Inter** (`--font-body`):
   - Bobot: 300 (Light), 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold).
   - Penggunaan: Teks paragraf, isi sel tabel, formulir input, tombol navigasi, dan label kecil.
3. **Monospace System Font** (`--font-mono`):
   - Nilai: `'JetBrains Mono', 'Fira Code', 'Courier New', monospace`.
   - Penggunaan: Kode SKU produk, nomor faktur pesanan, UUID client, dan hash SHA-256 buku besar.

---

## 4. Sistem Ikonografi

Menggunakan **Google Material Symbols Outlined** dengan konfigurasi variable font:
- Sintaks penggunaan: `<span class="material-symbols-outlined text-[20px]">nama_ikon</span>`
- Ikon utama yang digunakan dalam sistem:
  - Navigasi: `dashboard`, `inventory_2`, `store`, `fact_check`, `smartphone`.
  - Regulasi CDOB: `verified`, `shield_with_heart`, `security`.
  - Transaksi: `shopping_cart`, `receipt_long`, `local_shipping`, `print`.
  - Status: `check_circle`, `warning`, `error`, `schedule`.

---

## 5. Media Cetak Resmi (Print Stylesheet)

Didefinisikan secara khusus pada [`css/print.css`](file:///home/sam/Code/arbaconnect/arbaconn/css/print.css) dengan dua format standar operasional:

### A. Surat Jalan Resmi Rangkap 3 (Ukuran A4 / Legal)
- Format cetak multi-halaman yang menyembunyikan header navigasi, sidebar, dan tombol UI sistem saat dialog cetak browser (`Ctrl+P` / `window.print()`) dibuka.
- Format cetak menghasilkan 3 rangkap berurutan dengan label peruntukan yang jelas:
  1. *Lembar 1: Lembar Asli Putih (Untuk Apoteker Pengelola Apotek)*.
  2. *Lembar 2: Lembar Merah/Kuning (Untuk Arsip Finance CV Arba'in)*.
  3. *Lembar 3: Lembar Hijau/Biru (Untuk Arsip Departemen Gudang Kartasura)*.
- Memuat tabel rincian batch berstandar CDOB dan kotak tanda tangan 3 pihak (Penerima Apoteker APA, Driver Ekspedisi, dan Kepala Gudang Kartasura).

### B. Struk Kasir Termal Bluetooth 58mm
- Diformat dengan lebar tepat `58mm` dengan margin minimal tanpa header/footer peramban bawaan.
- Tipografi monospace monokromatik kontras tinggi yang kompatibel dengan printer thermal POS mini di lapangan.
