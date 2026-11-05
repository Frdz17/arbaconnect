/**
 * ArbaConnect ERP - Master Data & Initial State
 * CV Arba'in Solo Raya
 */

window.ArbaData = (function() {
  const products = [
    {
      sku: 'SKU-ARB-MDR500',
      name: "Madu Randu Murni Arba'in 500g",
      category: 'Madu Herbal',
      stock: 1420,
      safetyStock: 180,
      rop: 320,
      ropFormula: 'd=20, L=7d, SS=180',
      activeBatch: 'BATCH-2026-018',
      fefoDate: '18 Okt 2027',
      fefoStatus: 'Aman (>6 Bulan)',
      status: 'optimal',
      unitPrice: 65000,
      icon: 'nutrition'
    },
    {
      sku: 'SKU-ARB-HBT100',
      name: 'Habbatussauda Oil Softgel 100s',
      category: 'Kapsul Herbal',
      stock: 98,
      safetyStock: 120,
      rop: 225,
      ropFormula: 'd=15, L=7d, SS=120',
      activeBatch: 'BATCH-2025-084',
      fefoDate: '12 Mei 2026',
      fefoStatus: 'Mendekati ED (<3 Bulan)',
      status: 'below-rop',
      unitPrice: 95000,
      icon: 'vaccines'
    },
    {
      sku: 'SKU-ARB-SKP350',
      name: 'Sari Kurma Plus Propolis 350g',
      category: 'Minyak & Cairan',
      stock: 840,
      safetyStock: 90,
      rop: 160,
      ropFormula: 'd=10, L=7d, SS=90',
      activeBatch: 'BATCH-2026-031',
      fefoDate: '30 Nov 2027',
      fefoStatus: 'Aman (>6 Bulan)',
      status: 'optimal',
      unitPrice: 59000,
      icon: 'water_drop'
    },
    {
      sku: 'SKU-ARB-EVO250',
      name: 'Minyak Zaitun Extra Virgin 250ml',
      category: 'Minyak & Cairan',
      stock: 112,
      safetyStock: 80,
      rop: 140,
      ropFormula: 'd=8, L=7d, SS=80',
      activeBatch: 'BATCH-2024-009',
      fefoDate: '14 Mar 2026',
      fefoStatus: 'Kritis (<30 Hari)',
      status: 'critical-expiry',
      unitPrice: 50000,
      icon: 'warning'
    },
    {
      sku: 'SKU-ARB-TML060',
      name: 'Kapsul Temulawak Ekstrak',
      category: 'Kapsul Herbal',
      stock: 650,
      safetyStock: 100,
      rop: 175,
      ropFormula: 'd=10, L=7d, SS=100',
      activeBatch: 'BATCH-2026-044',
      fefoDate: '19 Des 2027',
      fefoStatus: 'Aman (>6 Bulan)',
      status: 'optimal',
      unitPrice: 48000,
      icon: 'pill'
    },
    {
      sku: 'SKU-ARB-MLT1000',
      name: "Madu Multiflora Arba'in 1kg",
      category: 'Madu Herbal',
      stock: 430,
      safetyStock: 80,
      rop: 150,
      ropFormula: 'd=12, L=7d, SS=80',
      activeBatch: 'BATCH-2026-022',
      fefoDate: '15 Jan 2028',
      fefoStatus: 'Aman (>6 Bulan)',
      status: 'optimal',
      unitPrice: 115000,
      icon: 'nutrition'
    },
    {
      sku: 'SKU-ARB-HTN500',
      name: 'Madu Hutan Liar Murni 500g',
      category: 'Madu Herbal',
      stock: 25,
      safetyStock: 40,
      rop: 70,
      ropFormula: 'd=8, L=7d, SS=40',
      activeBatch: 'BATCH-2025-110',
      fefoDate: '20 Jul 2026',
      fefoStatus: 'Mendekati ED (<3 Bulan)',
      status: 'below-rop',
      unitPrice: 85000,
      icon: 'nutrition'
    }
  ];

  const ledger = [
    {
      id: 'LEDG-89210',
      timestamp: '25 Feb 2026 • 14:32:05 WIB',
      docRef: 'PO-2026-089',
      skuName: 'Madu Randu 500g',
      skuCode: 'SKU-ARB-MDR500',
      batch: 'BATCH-2026-018',
      type: 'MASUK',
      quantity: 500,
      finalStock: 1420,
      operator: 'Slamet Riadi',
      operatorRole: 'Warehouse Inbound',
      hash: 'c84a...9df2'
    },
    {
      id: 'LEDG-89209',
      timestamp: '25 Feb 2026 • 13:15:42 WIB',
      docRef: 'ORD-ARB-9021',
      skuName: 'Habbatussauda 100s',
      skuCode: 'SKU-ARB-HBT100',
      batch: 'BATCH-2025-084',
      type: 'KELUAR',
      quantity: -60,
      finalStock: 98,
      operator: 'Budi Wicaksono',
      operatorRole: 'Field Sales #FS-04',
      hash: 'e19b...44a7'
    },
    {
      id: 'LEDG-89208',
      timestamp: '25 Feb 2026 • 10:00:11 WIB',
      docRef: 'OPN-2026-Q1-B',
      skuName: 'Kapsul Temulawak',
      skuCode: 'SKU-ARB-TML060',
      batch: 'BATCH-2026-044',
      type: 'PENYESUAIAN',
      quantity: 2,
      finalStock: 650,
      operator: 'Dewi Lestari',
      operatorRole: 'Chief Auditor Intern',
      hash: '7f20...ee13'
    },
    {
      id: 'LEDG-89207',
      timestamp: '24 Feb 2026 • 16:45:19 WIB',
      docRef: 'RMA-2026-014',
      skuName: 'Sari Kurma Propolis',
      skuCode: 'SKU-ARB-SKP350',
      batch: 'BATCH-2026-031',
      type: 'RETUR',
      quantity: 5,
      finalStock: 840,
      operator: 'Ahmad Fauzi',
      operatorRole: 'QC & Return Staff',
      hash: 'a44d...82cb'
    },
    {
      id: 'LEDG-89206',
      timestamp: '24 Feb 2026 • 14:10:00 WIB',
      docRef: 'ORD-ARB-9018',
      skuName: 'Minyak Zaitun 250ml',
      skuCode: 'SKU-ARB-EVO250',
      batch: 'BATCH-2024-009',
      type: 'KELUAR',
      quantity: -40,
      finalStock: 112,
      operator: 'Slamet Riadi',
      operatorRole: 'Warehouse Outbound',
      hash: '38c1...19a0'
    }
  ];

  const outlets = [
    {
      id: 'AP-SLO-001',
      code: 'AP-SLO-001',
      name: 'Apotek Kimia Farma Slamet Riyadi',
      address: 'Jl. Slamet Riyadi No. 248, Laweyan',
      city: 'Solo',
      cityName: 'Surakarta',
      type: 'Jaringan Farmasi',
      picName: 'apt. Nurul Hidayati, S.Farm',
      picRole: 'Apoteker Pengelola Apotek (APA)',
      picPhone: '6281234567890',
      salesRep: 'Budi Santoso',
      salesArea: 'Solo Tengah',
      terms: 'Net 30 Hari',
      creditLimit: 15000000,
      creditUsed: 6750000,
      creditRemaining: 8250000,
      creditStatus: 'Lancar',
      lastOrderDate: '02 Mei 2026',
      orderFrequency: '3x / bulan',
      ytdTotal: 84500000,
      lastVisitDate: '02 Mei 2026, 14:15 WIB',
      visitNotes: '"Kunjungan rutin mingguan oleh Budi Santoso. Display produk Madu Habbatussauda dan Minyak Zaitun Arba\'in di rak depan sudah terpasang rapi. Pemesanan ulang 3 karton varian 250ml berhasil diinput via Mobile PWA. Penagihan faktur tempo 15 Mei sudah dikonfirmasikan ke bagian kasir."'
    },
    {
      id: 'AP-SLO-002',
      code: 'AP-SLO-002',
      name: 'Apotek K-24 UNS Kentingan',
      address: 'Jl. Ir. Sutami No. 36, Jebres, Solo',
      city: 'Solo',
      cityName: 'Surakarta',
      type: 'Jaringan Farmasi',
      picName: 'apt. Rina Marlina, S.Farm',
      picRole: 'Apoteker Pendamping Shift Pagi',
      picPhone: '6281329001122',
      salesRep: 'Anita Rahmawati',
      salesArea: 'Solo Timur & Jebres',
      terms: 'Net 14 Hari',
      creditLimit: 8000000,
      creditUsed: 4200000,
      creditRemaining: 3800000,
      creditStatus: 'Lancar',
      lastOrderDate: '28 Mar 2026',
      orderFrequency: '2x / bulan',
      ytdTotal: 48900000,
      lastVisitDate: '28 Mar 2026, 09:40 WIB',
      visitNotes: '"Pengecekan display produk kapsul temulawak & multiflora 1kg. Rotasi FEFO berjalan lancar, stok kadaluarsa >1 tahun."'
    },
    {
      id: 'MM-SKH-014',
      code: 'MM-SKH-014',
      name: 'Luwes Swalayan Sukoharjo',
      address: 'Jl. Jend. Sudirman No. 89, Gayam',
      city: 'Sukoharjo',
      cityName: 'Sukoharjo',
      type: 'Minimarket',
      picName: 'Bambang S., SE',
      picRole: 'Category Buyer Healthy Drink & Herbal',
      picPhone: '6285712345678',
      salesRep: 'Tri Wahyuni',
      salesArea: 'Sukoharjo-Solo Baru',
      terms: 'Net 14 Hari',
      creditLimit: 25000000,
      creditUsed: 8500000,
      creditRemaining: 16500000,
      creditStatus: 'Lancar',
      lastOrderDate: '29 Apr 2026',
      orderFrequency: '4x / bulan',
      ytdTotal: 112300000,
      lastVisitDate: '29 Apr 2026, 11:30 WIB',
      visitNotes: '"Pemeriksaan FEFO batch kadaluarsa stok Luwes: seluruh stok masa edar >14 bulan (Sangat Baik). Telah disetujui program end-cap gondola promosi awal bulan Juni."'
    },
    {
      id: 'MM-SLO-009',
      code: 'MM-SLO-009',
      name: 'Luwes Gading Minimarket',
      address: 'Jl. Veteran No. 12, Pasar Kliwon, Solo',
      city: 'Solo',
      cityName: 'Surakarta',
      type: 'Minimarket',
      picName: 'Ibu Ratmi (Store Manager)',
      picRole: 'Kepala Toko & Purchasing',
      picPhone: '6281908877665',
      salesRep: 'Budi Santoso',
      salesArea: 'Solo Tengah & Gading',
      terms: 'Net 14 Hari',
      creditLimit: 20000000,
      creditUsed: 12800000,
      creditRemaining: 7200000,
      creditStatus: 'Lancar',
      lastOrderDate: '28 Mar 2026',
      orderFrequency: '3x / bulan',
      ytdTotal: 78400000,
      lastVisitDate: '28 Mar 2026, 09:15 WIB',
      visitNotes: '"Permintaan restock Madu Hutan Liar tinggi. Perlu alokasi substitusi batch dari Gudang B Solo Baru karena stok gudang utama menipis."'
    },
    {
      id: 'AP-KRA-023',
      code: 'AP-KRA-023',
      name: 'Apotek K-24 Karanganyar',
      address: 'Jl. Lawu No. 112, Karanganyar Kota',
      city: 'Karanganyar',
      cityName: 'Karanganyar',
      type: 'Jaringan Farmasi',
      picName: 'apt. Doni Prasetyo',
      picRole: 'Penanggung Jawab Shift Apotek',
      picPhone: '6281398765432',
      salesRep: 'Agus Hermawan',
      salesArea: 'Karanganyar-Palur',
      terms: 'Net 30 Hari',
      creditLimit: 12000000,
      creditUsed: 10200000,
      creditRemaining: 1800000,
      creditStatus: 'Perhatian',
      lastOrderDate: '26 Apr 2026',
      orderFrequency: 'Tempo: 5 hari lagi',
      ytdTotal: 62000000,
      lastVisitDate: '26 Apr 2026, 16:45 WIB',
      visitNotes: '"Faktur #INV-2026-03-882 sebesar Rp 4.200.000 jatuh tempo 5 hari lagi (12 Mei). Pihak finance K-24 telah menjadwalkan transfer pada hari Kamis."'
    },
    {
      id: 'AP-KRA-004',
      code: 'AP-KRA-004',
      name: 'Apotek Sehat Farma Palur',
      address: 'Jl. Raya Palur Km 5, Karanganyar',
      city: 'Karanganyar',
      cityName: 'Karanganyar',
      type: 'Apotek Mandiri',
      picName: 'apt. Sri Wahyuningsih',
      picRole: 'Owner & Apoteker Penanggung Jawab',
      picPhone: '6282245678910',
      salesRep: 'Hadi Kurniawan',
      salesArea: 'Karanganyar-Palur',
      terms: 'COD Cash',
      creditLimit: 5000000,
      creditUsed: 0,
      creditRemaining: 5000000,
      creditStatus: 'Lancar',
      lastOrderDate: '28 Mar 2026',
      orderFrequency: '1x / 2 minggu',
      ytdTotal: 29500000,
      lastVisitDate: '28 Mar 2026, 08:30 WIB',
      visitNotes: '"Pengiriman COD via Driver Joko. Pembayaran tunai saat barang diterima."'
    },
    {
      id: 'AP-BYL-008',
      code: 'AP-BYL-008',
      name: 'Apotek Sehat Mandiri Boyolali',
      address: 'Jl. Pandanaran No. 45, Boyolali',
      city: 'Boyolali',
      cityName: 'Boyolali',
      type: 'Apotek Mandiri',
      picName: 'apt. Ratna Dewi',
      picRole: 'Owner & Apoteker Penanggung Jawab',
      picPhone: '6282133445566',
      salesRep: 'Rian Pratama',
      salesArea: 'Klaten-Boyolali',
      terms: 'Net 14 Hari',
      creditLimit: 8000000,
      creditUsed: 2500000,
      creditRemaining: 5500000,
      creditStatus: 'Lancar',
      lastOrderDate: '01 Mei 2026',
      orderFrequency: '2x / bulan',
      ytdTotal: 41800000,
      lastVisitDate: '01 Mei 2026, 10:20 WIB',
      visitNotes: '"Menerima pengiriman COD reguler 2 karton Madu Arba\'in Propolis. Kondisi kemasan segel utuh dan batch tercatat di ledger gudang."'
    },
    {
      id: 'MM-BYL-003',
      code: 'MM-BYL-003',
      name: 'Minimarket Sumber Rejeki Jaya Boyolali',
      address: 'Jl. Pemuda No. 18, Boyolali Kota',
      city: 'Boyolali',
      cityName: 'Boyolali',
      type: 'Minimarket',
      picName: 'Pak Hadiyanto',
      picRole: 'Manager Operasional Toko',
      picPhone: '6285890123456',
      salesRep: 'Rahmat Adi',
      salesArea: 'Boyolali',
      terms: 'COD Cash',
      creditLimit: 5000000,
      creditUsed: 0,
      creditRemaining: 5000000,
      creditStatus: 'Lancar',
      lastOrderDate: '28 Mar 2026',
      orderFrequency: '2x / bulan',
      ytdTotal: 34100000,
      lastVisitDate: '28 Mar 2026, 16:30 WIB',
      visitNotes: '"Pemesanan repeat order Madu Randu 500g 48 botol. Driver Hartono ditugaskan mengirim via Wave 2."'
    },
    {
      id: 'MM-KLT-005',
      code: 'MM-KLT-005',
      name: 'Toserba Sami Luwes Klaten',
      address: 'Jl. Pemuda No. 70, Klaten Tengah',
      city: 'Klaten',
      cityName: 'Klaten',
      type: 'Minimarket',
      picName: 'Ibu Suryani (Purchasing)',
      picRole: 'Supervisor Purchasing Ritel',
      picPhone: '6287712349988',
      salesRep: 'Rian Pratama',
      salesArea: 'Klaten-Boyolali',
      terms: 'COD Cash',
      creditLimit: 10000000,
      creditUsed: 0,
      creditRemaining: 10000000,
      creditStatus: 'Lancar',
      lastOrderDate: '24 Apr 2026',
      orderFrequency: '1x / 2 minggu',
      ytdTotal: 54000000,
      lastVisitDate: '24 Apr 2026, 13:10 WIB',
      visitNotes: '"Penjualan di rak etalase stabil. Mengambil paket bundling diskon 5% untuk 10 karton."'
    },
    {
      id: 'AP-SRG-019',
      code: 'AP-SRG-019',
      name: 'Apotek Asri Sragen',
      address: 'Jl. Sukowati No. 15, Sragen Kulon',
      city: 'Sragen',
      cityName: 'Sragen',
      type: 'Apotek Mandiri',
      picName: 'apt. Hendra Kusuma',
      picRole: 'Apoteker Pengelola Apotek',
      picPhone: '6281567890123',
      salesRep: 'Agus Hermawan',
      salesArea: 'Karanganyar-Palur-Sragen',
      terms: 'Net 30 Hari',
      creditLimit: 10000000,
      creditUsed: 9800000,
      creditRemaining: 200000,
      creditStatus: 'Overdue',
      lastOrderDate: '15 Mar 2026',
      orderFrequency: 'Overdue 12 hari',
      ytdTotal: 38200000,
      lastVisitDate: '15 Mar 2026, 15:00 WIB',
      visitNotes: '"Tagihan belum terselesaikan karena pergantian rekening bank manajemen apotek. Sales ops telah mengirimkan Surat Pemberitahuan I (SP-1). Pengiriman order baru dibekukan sementara hingga status kredit kembali lancar."'
    },
    {
      id: 'AP-KRA-078',
      code: 'AP-KRA-078',
      name: 'Apotek Kasih Ibu Karanganyar',
      address: 'Jl. Lawu No. 99, Karanganyar',
      city: 'Karanganyar',
      cityName: 'Karanganyar',
      type: 'Apotek Mandiri',
      picName: 'apt. Bambang Sudarsono',
      picRole: 'Apoteker Pengelola Apotek',
      picPhone: '6281233221100',
      salesRep: 'Bambang S.',
      salesArea: 'Karanganyar',
      terms: 'Net 14 Hari',
      creditLimit: 10000000,
      creditUsed: 5750000,
      creditRemaining: 4250000,
      creditStatus: 'Lancar',
      lastOrderDate: '28 Mar 2026',
      orderFrequency: '2x / bulan',
      ytdTotal: 57500000,
      lastVisitDate: '28 Mar 2026, 13:50 WIB',
      visitNotes: '"Pesanan 50 botol Madu Multiflora 1kg disetujui & siap dikirim logistik."'
    }
  ];

  const orders = [
    {
      id: 'ord-7f3b89-20260328',
      clientUuid: 'ord-7f3b89-20260328',
      outletId: 'AP-SLO-001',
      outletName: 'Apotek Kimia Farma Slamet Riyadi',
      address: 'Jl. Slamet Riyadi No. 340, Laweyan, Surakarta',
      city: 'Surakarta',
      salesRep: 'Budi Santoso',
      salesRepId: 'REP-SR-04',
      orderTime: 'Hari ini, 10:14 WIB (7 menit lalu)',
      orderTimestamp: Date.now() - 7 * 60 * 1000,
      totalAmount: 8450000,
      terms: 'Net 30 Hari',
      limitMax: 15000000,
      limitRemaining: 6550000,
      geofenceValid: true,
      geofenceCoords: '-7.5583, 110.8214 (Presisi)',
      npwp: '01.324.891.4-528.000',
      status: 'PENDING',
      syncStatus: 'SYNCED_DEDUCTED',
      priority: 'High',
      items: [
        {
          sku: 'SKU-ARB-MDR500',
          name: "Madu Randu Murni 500g",
          batch: 'Batch: B-2026-018',
          expiry: '14 Des 2027',
          fefoPriority: 'FEFO Prioritas 1',
          quantity: 40,
          unitPrice: 65000,
          subtotal: 2600000,
          allocated: true,
          remainingBatchStock: 340
        },
        {
          sku: 'SKU-ARB-HBT100',
          name: 'Habbatussauda Softgel 100s',
          batch: 'Batch: B-2026-009',
          expiry: '22 Agu 2027',
          fefoPriority: 'FEFO Prioritas 1',
          quantity: 30,
          unitPrice: 95000,
          subtotal: 2850000,
          allocated: true,
          remainingBatchStock: 180
        },
        {
          sku: 'SKU-ARB-EVO250',
          name: 'Minyak Zaitun Extra Virgin 250ml',
          batch: 'Batch: B-2026-031',
          expiry: '05 Jan 2028',
          fefoPriority: 'FEFO Prioritas 1',
          quantity: 20,
          unitPrice: 50000,
          subtotal: 1000000,
          allocated: true,
          remainingBatchStock: 215
        }
      ]
    },
    {
      id: 'ord-92a10c-20260328',
      clientUuid: 'ord-92a10c-20260328',
      outletId: 'AP-SLO-002',
      outletName: 'Apotek K-24 UNS Kentingan',
      address: 'Jl. Ir. Sutami No. 36, Jebres, Solo',
      city: 'Surakarta',
      salesRep: 'Anita Rahmawati',
      salesRepId: 'REP-SKH-02',
      orderTime: 'Hari ini, 09:58 WIB (25 menit lalu)',
      orderTimestamp: Date.now() - 25 * 60 * 1000,
      totalAmount: 4200000,
      terms: 'Net 14 Hari',
      limitMax: 8000000,
      limitRemaining: 3800000,
      geofenceValid: true,
      geofenceCoords: '-7.5592, 110.8550 (Presisi)',
      npwp: '02.482.119.5-528.000',
      status: 'PENDING',
      syncStatus: 'SYNCED_DEDUCTED',
      priority: 'Normal',
      items: [
        {
          sku: 'SKU-ARB-MLT1000',
          name: "Madu Multiflora 1kg",
          batch: 'Batch: B-2026-022',
          expiry: '15 Jan 2028',
          fefoPriority: 'FEFO Prioritas 1',
          quantity: 20,
          unitPrice: 115000,
          subtotal: 2300000,
          allocated: true,
          remainingBatchStock: 410
        },
        {
          sku: 'SKU-ARB-HBT100',
          name: 'Habbatussauda Softgel 100s',
          batch: 'Batch: B-2026-010',
          expiry: '10 Sep 2027',
          fefoPriority: 'FEFO Prioritas 1',
          quantity: 20,
          unitPrice: 95000,
          subtotal: 1900000,
          allocated: true,
          remainingBatchStock: 160
        }
      ]
    },
    {
      id: 'ord-48e02d-20260328',
      clientUuid: 'ord-48e02d-20260328',
      outletId: 'MM-SLO-009',
      outletName: 'Luwes Gading Minimarket',
      address: 'Jl. Veteran No. 12, Pasar Kliwon, Solo',
      city: 'Surakarta',
      salesRep: 'Budi Santoso',
      salesRepId: 'REP-SR-04',
      orderTime: 'Hari ini, 09:32 WIB (50 menit lalu)',
      orderTimestamp: Date.now() - 50 * 60 * 1000,
      totalAmount: 12800000,
      terms: 'Net 14 Hari',
      limitMax: 20000000,
      limitRemaining: 7200000,
      geofenceValid: true,
      geofenceCoords: '-7.5750, 110.8280 (Presisi)',
      npwp: '03.882.441.9-528.000',
      status: 'PENDING',
      syncStatus: 'PENDING_WAREHOUSE',
      priority: 'High',
      stockWarning: 'Stok SKU Madu Hutan 500g menipis (Kurang 15 unit)',
      items: [
        {
          sku: 'SKU-ARB-HTN500',
          name: 'Madu Hutan Liar Murni 500g',
          batch: 'Batch: B-2025-110',
          expiry: '20 Jul 2026',
          fefoPriority: 'FEFO Menipis',
          quantity: 40,
          unitPrice: 85000,
          subtotal: 3400000,
          allocated: false,
          remainingBatchStock: 25
        },
        {
          sku: 'SKU-ARB-MDR500',
          name: "Madu Randu Murni 500g",
          batch: 'Batch: B-2026-018',
          expiry: '14 Des 2027',
          fefoPriority: 'FEFO Prioritas 1',
          quantity: 100,
          unitPrice: 65000,
          subtotal: 6500000,
          allocated: true,
          remainingBatchStock: 240
        },
        {
          sku: 'SKU-ARB-EVO250',
          name: 'Minyak Zaitun Extra Virgin 250ml',
          batch: 'Batch: B-2026-031',
          expiry: '05 Jan 2028',
          fefoPriority: 'FEFO Prioritas 1',
          quantity: 58,
          unitPrice: 50000,
          subtotal: 2900000,
          allocated: true,
          remainingBatchStock: 157
        }
      ]
    },
    {
      id: 'ord-11c56f-20260328',
      clientUuid: 'ord-11c56f-20260328',
      outletId: 'AP-KRA-004',
      outletName: 'Apotek Sehat Farma Palur',
      address: 'Jl. Raya Palur Km 5, Karanganyar',
      city: 'Karanganyar',
      salesRep: 'Hadi Kurniawan',
      salesRepId: 'REP-KRA-01',
      orderTime: 'Hari ini, 08:45 WIB (1j 35m lalu)',
      orderTimestamp: Date.now() - 95 * 60 * 1000,
      totalAmount: 2950000,
      terms: 'COD Tunai (Driver: Joko)',
      limitMax: 5000000,
      limitRemaining: 5000000,
      geofenceValid: true,
      geofenceCoords: '-7.5610, 110.8710 (Presisi)',
      npwp: '04.192.831.2-528.000',
      status: 'PENDING',
      syncStatus: 'SYNCED_DEDUCTED',
      priority: 'Normal',
      items: [
        {
          sku: 'SKU-ARB-SKP350',
          name: 'Sari Kurma Plus Propolis 350g',
          batch: 'Batch: B-2026-031',
          expiry: '30 Nov 2027',
          fefoPriority: 'FEFO Prioritas 1',
          quantity: 50,
          unitPrice: 59000,
          subtotal: 2950000,
          allocated: true,
          remainingBatchStock: 790
        }
      ]
    },
    {
      id: 'ord-88c2f-20260328',
      clientUuid: 'ord-88c2f-20260328',
      outletId: 'MM-BYL-003',
      outletName: 'Minimarket Sumber Rejeki Jaya',
      address: 'Jl. Pemuda No. 18, Boyolali Kota',
      city: 'Boyolali',
      salesRep: 'Rahmat Adi',
      salesRepId: 'REP-BYL-03',
      orderTime: '16:45 WIB (45m lalu)',
      orderTimestamp: Date.now() - 45 * 60 * 1000,
      totalAmount: 3120000,
      terms: 'COD Tunai',
      limitMax: 5000000,
      limitRemaining: 5000000,
      geofenceValid: true,
      geofenceCoords: '-7.5312, 110.5982 (Presisi)',
      npwp: '05.991.228.1-528.000',
      status: 'PENDING',
      syncStatus: 'PENDING_WAREHOUSE',
      priority: 'Normal',
      items: [
        {
          sku: 'SKU-ARB-MDR500',
          name: "Madu Randu Murni 500g",
          batch: 'Batch: B-2026-018',
          expiry: '14 Des 2027',
          fefoPriority: 'FEFO Prioritas 1',
          quantity: 48,
          unitPrice: 65000,
          subtotal: 3120000,
          allocated: true,
          remainingBatchStock: 340
        }
      ]
    },
    {
      id: 'ord-fe54a-20260328',
      clientUuid: 'ord-fe54a-20260328',
      outletId: 'AP-KRA-078',
      outletName: 'Apotek Kasih Ibu Karanganyar',
      address: 'Jl. Lawu No. 99, Karanganyar',
      city: 'Karanganyar',
      salesRep: 'Bambang S.',
      salesRepId: 'REP-KRA-02',
      orderTime: '14:10 WIB (3j 20m lalu)',
      orderTimestamp: Date.now() - 200 * 60 * 1000,
      totalAmount: 5750000,
      terms: 'Net 14 Hari',
      limitMax: 10000000,
      limitRemaining: 4250000,
      geofenceValid: true,
      geofenceCoords: '-7.5991, 110.9501 (Presisi)',
      npwp: '06.331.002.3-528.000',
      status: 'APPROVED',
      syncStatus: 'SYNCED_DEDUCTED',
      priority: 'Normal',
      items: [
        {
          sku: 'SKU-ARB-MLT1000',
          name: "Madu Multiflora 1kg",
          batch: 'Batch: B-2026-022',
          expiry: '15 Jan 2028',
          fefoPriority: 'FEFO Prioritas 1',
          quantity: 50,
          unitPrice: 115000,
          subtotal: 5750000,
          allocated: true,
          remainingBatchStock: 360
        }
      ]
    }
  ];

  const supplierPOs = [
    {
      id: 'PO-SUPP-2026-001',
      sku: 'SKU-ARB-HBT100',
      productName: 'Habbatussauda Oil Softgel 100s',
      vendorName: 'CV Sumber Herbal Barokah Solo',
      quantity: 300,
      unitPrice: 55000,
      totalCost: 16500000,
      leadTimeDays: 7,
      expectedDate: '04 Apr 2026',
      status: 'DALAM_PRODUKSI',
      createdAt: '28 Mar 2026, 09:00 WIB'
    }
  ];

  const salesVisits = [
    {
      id: 'VISIT-001',
      outletId: 'AP-SLO-001',
      outletName: 'Apotek Kimia Farma Slamet Riyadi',
      salesRep: 'Budi Santoso',
      scheduledDate: '2026-04-02T10:00',
      purpose: 'Kunjungan Rutin',
      notes: 'Pengecekan display etalase depan dan follow-up pemesanan paket 3 varian',
      status: 'TERJADWAL'
    },
    {
      id: 'VISIT-002',
      outletId: 'AP-KRA-023',
      outletName: 'Apotek K-24 Karanganyar',
      salesRep: 'Agus Hermawan',
      scheduledDate: '2026-04-03T14:00',
      purpose: 'Penagihan Tempo',
      notes: 'Faktur tempo 12 Mei dan pengantaran faktur pajak asli',
      status: 'TERJADWAL'
    }
  ];

  const driverManifests = [
    {
      driverName: 'Joko Susilo',
      vehiclePlate: 'AD-8941-KA (GranMax Box)',
      routeArea: 'Solo Tengah & Laweyan',
      wave: 'Wave 1 (08:00 - 12:00 WIB)',
      totalOutlets: 8,
      orders: [
        {
          orderId: 'ord-7f3b89-20260328',
          outletName: 'Apotek Kimia Farma Slamet Riyadi',
          address: 'Jl. Slamet Riyadi No. 340, Laweyan',
          amount: 8450000,
          delivered: false
        },
        {
          orderId: 'ord-fe54a-20260328',
          outletName: 'Apotek Kasih Ibu Karanganyar',
          address: 'Jl. Lawu No. 99, Karanganyar',
          amount: 5750000,
          delivered: true,
          deliveredTime: '10:35 WIB'
        }
      ]
    },
    {
      driverName: 'Hartono Prabowo',
      vehiclePlate: 'AD-1044-YB (BlindVan)',
      routeArea: 'Sukoharjo & Solo Baru',
      wave: 'Wave 2 (13:00 - 17:00 WIB)',
      totalOutlets: 6,
      orders: [
        {
          orderId: 'ord-88c2f-20260328',
          outletName: 'Minimarket Sumber Rejeki Jaya',
          address: 'Jl. Pemuda No. 18, Boyolali',
          amount: 3120000,
          delivered: false
        }
      ]
    }
  ];

  // ---------------------------------------------------------------------------
  // Tim Sales Lapangan & Target Capaian (entitas `sales_targets`)
  // monthlyRevenueBase / monthlyVisitBase = realisasi historis bulan berjalan
  // SEBELUM transaksi live di aplikasi ini (hasil migrasi data awal).
  // ---------------------------------------------------------------------------
  const salesTeam = [
    { id: 'REP-SR-04',  name: 'Budi Santoso',    area: 'Solo Tengah & Laweyan', dailyVisitTarget: 7, monthlyRevenueTarget: 95000000, monthlyRevenueBase: 71200000, monthlyVisitBase: 118 },
    { id: 'REP-SKH-02', name: 'Anita Rahmawati', area: 'Jebres & Sukoharjo',    dailyVisitTarget: 6, monthlyRevenueTarget: 70000000, monthlyRevenueBase: 58400000, monthlyVisitBase: 104 },
    { id: 'REP-SKH-05', name: 'Tri Wahyuni',     area: 'Sukoharjo & Solo Baru', dailyVisitTarget: 6, monthlyRevenueTarget: 60000000, monthlyRevenueBase: 49750000, monthlyVisitBase: 97 },
    { id: 'REP-KRA-03', name: 'Agus Hermawan',   area: 'Karanganyar Kota',      dailyVisitTarget: 6, monthlyRevenueTarget: 60000000, monthlyRevenueBase: 38900000, monthlyVisitBase: 81 },
    { id: 'REP-KRA-01', name: 'Hadi Kurniawan',  area: 'Palur & Karanganyar',   dailyVisitTarget: 5, monthlyRevenueTarget: 50000000, monthlyRevenueBase: 41300000, monthlyVisitBase: 88 },
    { id: 'REP-KLT-01', name: 'Rian Pratama',    area: 'Klaten & Sragen',       dailyVisitTarget: 5, monthlyRevenueTarget: 55000000, monthlyRevenueBase: 46100000, monthlyVisitBase: 86 },
    { id: 'REP-BYL-03', name: 'Rahmat Adi',      area: 'Boyolali',              dailyVisitTarget: 5, monthlyRevenueTarget: 50000000, monthlyRevenueBase: 39600000, monthlyVisitBase: 79 },
    { id: 'REP-KRA-02', name: 'Bambang S.',      area: 'Karanganyar Timur',     dailyVisitTarget: 5, monthlyRevenueTarget: 45000000, monthlyRevenueBase: 35800000, monthlyVisitBase: 74 }
  ];

  // ---------------------------------------------------------------------------
  // Log Kunjungan Lapangan (entitas `visits`) — check-in GPS + hasil kunjungan.
  // outcome: ORDER | NO_ORDER_STOCK_FULL | COLLECTION | FOLLOW_UP | PIC_ABSENT
  // Seed dibuat relatif terhadap hari ini agar KPI "kunjungan hari ini" hidup.
  // ---------------------------------------------------------------------------
  const visitLogs = (function () {
    const plan = [
      ['Budi Santoso', 5], ['Anita Rahmawati', 5], ['Tri Wahyuni', 4], ['Agus Hermawan', 3],
      ['Hadi Kurniawan', 4], ['Rian Pratama', 4], ['Rahmat Adi', 3], ['Bambang S.', 4]
    ];
    const outcomes = ['ORDER', 'ORDER', 'NO_ORDER_STOCK_FULL', 'ORDER', 'COLLECTION', 'FOLLOW_UP', 'ORDER', 'PIC_ABSENT'];
    const logs = [];
    const dayStart = new Date();
    dayStart.setHours(0, 1, 0, 0);
    const total = plan.reduce(function (s, p) { return s + p[1]; }, 0);
    let n = 0;
    plan.forEach(function (p) {
      for (let i = 0; i < p[1]; i++) {
        const outlet = outlets[(n * 3 + i) % outlets.length];
        logs.push({
          id: 'VLOG-' + String(1000 + n),
          salesRep: p[0],
          outletId: outlet.id,
          outletName: outlet.name,
          timestamp: Math.max(dayStart.getTime() + n * 1000, Date.now() - (total - n) * 8 * 60 * 1000),
          outcome: outcomes[n % outcomes.length],
          gpsDistance: 6 + (n * 5) % 15,
          notes: 'Kunjungan rutin terjadwal',
          orderId: null
        });
        n++;
      }
    });
    return logs;
  })();

  // Baseline historis jumlah outlet di luar 11 outlet sampel (hasil migrasi awal)
  const baseline = {
    extraApotek: 92 - outlets.filter(function (o) { return o.type !== 'Minimarket'; }).length,
    extraMinimarket: 56 - outlets.filter(function (o) { return o.type === 'Minimarket'; }).length
  };

  return {
    products,
    ledger,
    outlets,
    orders,
    supplierPOs,
    salesVisits,
    driverManifests,
    salesTeam,
    visitLogs,
    baseline
  };
})();
