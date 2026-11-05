/**
 * ArbaConnect ERP - Utility Functions & Exporters
 * CV Arba'in Solo Raya
 */

window.ArbaUtils = (function() {
  function formatRupiah(amount) {
    if (typeof amount !== 'number') amount = Number(amount) || 0;
    return 'Rp ' + amount.toLocaleString('id-ID');
  }

  function formatNumber(num) {
    if (typeof num !== 'number') num = Number(num) || 0;
    return num.toLocaleString('id-ID');
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function downloadCsv(filename, content) {
    const blob = new Blob(['\uFEFF' + content], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  function exportCrmToCsv(outlets) {
    const headers = [
      'Kode Outlet',
      'Nama Outlet',
      'Alamat',
      'Kota/Wilayah',
      'Tipe',
      'Apoteker / PJ',
      'WhatsApp / Telepon',
      'Sales Dedikasi',
      'Area Rute',
      'Termin Pembayaran',
      'Plafon Kredit (IDR)',
      'Pemakaian Kredit (IDR)',
      'Sisa Plafon (IDR)',
      'Status Kredit',
      'Order Terakhir',
      'Total Omset YTD (IDR)'
    ];

    const rows = outlets.map(o => [
      `"${o.code}"`,
      `"${o.name}"`,
      `"${o.address}"`,
      `"${o.cityName}"`,
      `"${o.type}"`,
      `"${o.picName}"`,
      `"${o.picPhone}"`,
      `"${o.salesRep}"`,
      `"${o.salesArea}"`,
      `"${o.terms}"`,
      o.creditLimit,
      o.creditUsed,
      o.creditRemaining,
      `"${o.creditStatus}"`,
      `"${o.lastOrderDate}"`,
      o.ytdTotal
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    downloadCsv(`ArbaConnect_CRM_Mitra_SoloRaya_${new Date().toISOString().slice(0, 10)}.csv`, csvContent);
  }

  function exportStockLedgerToCsv(ledger) {
    const headers = [
      'ID Transaksi',
      'Waktu',
      'Ref Dokumen',
      'Kode SKU',
      'Nama Produk',
      'Batch Terkait',
      'Tipe Mutasi',
      'Kuantitas',
      'Saldo Akhir',
      'Petugas/Operator',
      'Peran Operator',
      'SHA-256 Hash'
    ];

    const rows = ledger.map(l => [
      `"${l.id}"`,
      `"${l.timestamp}"`,
      `"${l.docRef}"`,
      `"${l.skuCode}"`,
      `"${l.skuName}"`,
      `"${l.batch}"`,
      `"${l.type}"`,
      l.quantity,
      l.finalStock,
      `"${l.operator}"`,
      `"${l.operatorRole}"`,
      `"${l.hash}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    downloadCsv(`ArbaConnect_BukuBesarStok_${new Date().toISOString().slice(0, 10)}.csv`, csvContent);
  }

  function exportExecutiveReportToCsv(orders, products, outlets) {
    const a = window.ArbaStore ? window.ArbaStore.getAnalytics() : null;
    const totalOmset = a ? a.revenueMonth : orders.reduce((sum, o) => sum + o.totalAmount, 0);
    const headers = ['METRIK EKSEKUTIF', 'NILAI', 'CATATAN'];
    const summaryRows = [
      ['Total Omset Bulan Berjalan', `Rp ${totalOmset.toLocaleString('id-ID')}`, a ? `Target Rp ${a.revenueTarget.toLocaleString('id-ID')} (${a.revenuePct}%)` : '-'],
      ['Total Mitra B2B Solo Raya', `${a ? a.totalOutlets : outlets.length} Outlet`, a ? `${a.apotekCount} Apotek, ${a.minimarketCount} Minimarket` : '-'],
      ['Kunjungan Sales Hari Ini', a ? `${a.visitsToday} / ${a.visitTargetToday}` : '-', a ? `Effective Call ${a.effectiveCallRate}%` : '-'],
      ['Total Saldo Fisik Gudang', `${products.reduce((acc, p) => acc + p.stock, 0)} Unit`, 'Gudang Utama Kartasura'],
      ['SKU di Bawah ROP', `${products.filter(p => p.stock <= p.rop).length} SKU`, 'Low-stock alert otomatis']
    ];

    const perfHeaders = ['Sales Rep', 'Area', 'Kunjungan Hari Ini', 'Target Harian', 'Kunjungan Bulan Ini', 'Omset Bulan Ini (IDR)', 'Target Omset (IDR)', 'Capaian (%)', 'Effective Call (%)'];
    const perfRows = a ? a.salesPerformance.map(s => [
      `"${s.name}"`, `"${s.area}"`, s.visitsToday, s.dailyVisitTarget, s.visitsMonth, s.revenueMonth, s.monthlyRevenueTarget, s.revenuePct, s.effectiveCallRate
    ]) : [];

    const orderHeaders = ['', '', ''];
    const orderTableHeaders = ['Client UUID', 'Nama Outlet', 'Kota', 'Sales Rep', 'Total (IDR)', 'Termin', 'Status'];
    const orderRows = orders.map(o => [
      `"${o.clientUuid}"`,
      `"${o.outletName}"`,
      `"${o.city}"`,
      `"${o.salesRep}"`,
      o.totalAmount,
      `"${o.terms}"`,
      `"${o.status}"`
    ]);

    const csvContent = [
      headers.join(','),
      ...summaryRows.map(r => r.map(c => `"${c}"`).join(',')),
      orderHeaders.join(','),
      ['PERFORMA TIM SALES', '', ''].join(','),
      perfHeaders.join(','),
      ...perfRows.map(r => r.join(',')),
      orderHeaders.join(','),
      ['DAFTAR PESANAN MASUK TERBARU', '', ''].join(','),
      orderTableHeaders.join(','),
      ...orderRows.map(r => r.join(','))
    ].join('\n');

    downloadCsv(`ArbaConnect_Laporan_Eksekutif_${new Date().toISOString().slice(0, 10)}.csv`, csvContent);
  }

  /**
   * Parser CSV ringan (RFC 4180): mendukung tanda kutip, koma di dalam kutip,
   * serta delimiter koma (,) atau titik koma (;) — format umum ekspor Excel Indonesia.
   * Mengembalikan array objek dengan key header (lowercase, spasi -> underscore).
   */
  function parseCsv(text) {
    if (!text) return [];
    text = String(text).replace(/^\uFEFF/, '');
    const firstLine = text.split(/\r?\n/)[0] || '';
    const delimiter = (firstLine.split(';').length > firstLine.split(',').length) ? ';' : ',';

    const rows = [];
    let row = [];
    let field = '';
    let inQuotes = false;
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      if (inQuotes) {
        if (ch === '"') {
          if (text[i + 1] === '"') { field += '"'; i++; }
          else inQuotes = false;
        } else {
          field += ch;
        }
      } else if (ch === '"') {
        inQuotes = true;
      } else if (ch === delimiter) {
        row.push(field); field = '';
      } else if (ch === '\n' || ch === '\r') {
        if (ch === '\r' && text[i + 1] === '\n') i++;
        row.push(field); field = '';
        rows.push(row); row = [];
      } else {
        field += ch;
      }
    }
    if (field !== '' || row.length) { row.push(field); rows.push(row); }

    const nonEmpty = rows.filter(r => r.some(c => String(c).trim() !== ''));
    if (nonEmpty.length < 2) return [];
    const headers = nonEmpty[0].map(h => String(h).trim().toLowerCase().replace(/\s+/g, '_'));
    return nonEmpty.slice(1).map(r => {
      const obj = {};
      headers.forEach((h, idx) => { obj[h] = (r[idx] !== undefined ? String(r[idx]).trim() : ''); });
      return obj;
    });
  }

  return {
    formatRupiah,
    formatNumber,
    escapeHtml,
    downloadCsv,
    parseCsv,
    exportCrmToCsv,
    exportStockLedgerToCsv,
    exportExecutiveReportToCsv
  };
})();
