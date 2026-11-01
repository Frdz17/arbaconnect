/**
 * ArbaConnect ERP - Reactive Centralized Store & Business Mutations
 * CV Arba'in Solo Raya
 */

window.ArbaStore = (function() {
  const STORAGE_KEY = 'arbaconnect_erp_state_v2';

  // Load from local storage or fallback to ArbaData initial values
  function loadInitialState() {
    let hashPath = null;
    let overrideSidebarCollapsed = null;
    let overrideDarkMode = null;
    if (typeof window !== 'undefined' && window.location) {
      if (window.location.hash) {
        const h = window.location.hash.replace(/^#\/?/, '');
        if (['executive-dashboard', 'inventory-stock-ledger', 'b2b-crm-directory', 'order-approval-queue', 'field-sales-pwa-preview'].indexOf(h) !== -1) {
          hashPath = h;
        }
      }
      if (window.location.search) {
        if (window.location.search.indexOf('sidebar=expanded') !== -1) {
          overrideSidebarCollapsed = false;
        } else if (window.location.search.indexOf('sidebar=collapsed') !== -1) {
          overrideSidebarCollapsed = true;
        }
        if (window.location.search.indexOf('dark=true') !== -1) {
          overrideDarkMode = true;
        } else if (window.location.search.indexOf('dark=false') !== -1) {
          overrideDarkMode = false;
        }
      }
    }

    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          currentPath: hashPath || parsed.currentPath || 'executive-dashboard',
          currentRole: parsed.currentRole || 'executive',
          isOnline: parsed.isOnline !== undefined ? parsed.isOnline : true,
          isDarkMode: overrideDarkMode !== null ? overrideDarkMode : (parsed.isDarkMode || false),
          isSidebarCollapsed: overrideSidebarCollapsed !== null ? overrideSidebarCollapsed : (parsed.isSidebarCollapsed !== undefined ? parsed.isSidebarCollapsed : true),
          selectedOutletId: parsed.selectedOutletId || 'AP-SLO-001',
          products: parsed.products || ArbaData.products,
          ledger: parsed.ledger || ArbaData.ledger,
          outlets: parsed.outlets || ArbaData.outlets,
          orders: parsed.orders || ArbaData.orders,
          supplierPOs: parsed.supplierPOs || ArbaData.supplierPOs,
          salesVisits: parsed.salesVisits || ArbaData.salesVisits,
          driverManifests: parsed.driverManifests || ArbaData.driverManifests,
          offlineQueue: parsed.offlineQueue || []
        };
      }
    } catch (e) {
      console.warn('Gagal membaca localStorage, memuat data default awal', e);
    }

    return {
      currentPath: hashPath || 'executive-dashboard',
      currentRole: 'executive',
      isOnline: true,
      isDarkMode: overrideDarkMode !== null ? overrideDarkMode : false,
      isSidebarCollapsed: overrideSidebarCollapsed !== null ? overrideSidebarCollapsed : true,
      selectedOutletId: 'AP-SLO-001',
      products: JSON.parse(JSON.stringify(ArbaData.products)),
      ledger: JSON.parse(JSON.stringify(ArbaData.ledger)),
      outlets: JSON.parse(JSON.stringify(ArbaData.outlets)),
      orders: JSON.parse(JSON.stringify(ArbaData.orders)),
      supplierPOs: JSON.parse(JSON.stringify(ArbaData.supplierPOs)),
      salesVisits: JSON.parse(JSON.stringify(ArbaData.salesVisits)),
      driverManifests: JSON.parse(JSON.stringify(ArbaData.driverManifests)),
      offlineQueue: []
    };
  }

  const state = loadInitialState();
  const listeners = [];
  let toastTimer = null;

  function persist() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        currentPath: state.currentPath,
        currentRole: state.currentRole,
        isOnline: state.isOnline,
        isDarkMode: state.isDarkMode,
        isSidebarCollapsed: state.isSidebarCollapsed,
        selectedOutletId: state.selectedOutletId,
        products: state.products,
        ledger: state.ledger,
        outlets: state.outlets,
        orders: state.orders,
        supplierPOs: state.supplierPOs,
        salesVisits: state.salesVisits,
        driverManifests: state.driverManifests,
        offlineQueue: state.offlineQueue
      }));
    } catch (e) {
      console.error('Failed to persist to localStorage', e);
    }
  }

  function subscribe(fn) {
    listeners.push(fn);
  }

  function notify() {
    persist();
    listeners.forEach(fn => {
      try {
        fn(state);
      } catch (err) {
        console.error('Error in store listener', err);
      }
    });
  }

  function showToast(message, icon = 'check_circle') {
    const toastEl = document.getElementById('toast-popup');
    const toastMsg = document.getElementById('toast-message');
    const toastIcon = document.getElementById('toast-icon');

    if (!toastEl || !toastMsg) return;

    if (toastTimer) clearTimeout(toastTimer);

    toastMsg.textContent = message;
    if (toastIcon) toastIcon.textContent = icon;
    toastEl.style.display = 'flex';

    toastTimer = setTimeout(() => {
      toastEl.style.display = 'none';
    }, 3500);
  }

  function setPath(path) {
    state.currentPath = path;
    if (typeof window !== 'undefined' && window.location) {
      if (window.location.hash.replace(/^#\/?/, '') !== path) {
        window.location.hash = path;
      }
    }
    notify();
    if (typeof window !== 'undefined' && window.scrollTo) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function setRole(role) {
    state.currentRole = role;
    if (role === 'field-sales') {
      state.currentPath = 'field-sales-pwa-preview';
      showToast('Beralih ke mode Field Sales Rep (Mobile PWA)', 'smartphone');
    } else if (role === 'inventory') {
      state.currentPath = 'inventory-stock-ledger';
      showToast('Beralih ke Manajemen Gudang & Stock Ledger', 'warehouse');
    } else if (role === 'sales-ops') {
      state.currentPath = 'order-approval-queue';
      showToast('Beralih ke Antrean Otorisasi Pesanan', 'fact_check');
    } else {
      state.currentPath = 'executive-dashboard';
      showToast('Beralih ke Executive Director & Management', 'dashboard');
    }
    notify();
  }

  function toggleSidebar() {
    state.isSidebarCollapsed = !state.isSidebarCollapsed;
    notify();
  }

  function toggleDarkMode() {
    state.isDarkMode = !state.isDarkMode;
    document.documentElement.classList.toggle('dark', state.isDarkMode);
    notify();
  }

  function toggleOnlineStatus() {
    state.isOnline = !state.isOnline;

    if (state.isOnline && state.offlineQueue.length > 0) {
      state.orders = state.orders.map(o =>
        o.syncStatus === 'OFFLINE_QUEUED' ? { ...o, syncStatus: 'SYNCED_DEDUCTED' } : o
      );
      const count = state.offlineQueue.length;
      state.offlineQueue = [];
      showToast(`Online kembali: ${count} pesanan lokal disinkronisasi ke pusat!`, 'cloud_done');
    } else {
      showToast(
        state.isOnline
          ? 'Status: Online - Semua data tersinkronisasi instan'
          : 'Status: Offline - Transaksi disimpan di IndexedDB / LocalStorage lokal',
        state.isOnline ? 'cloud_done' : 'cloud_off'
      );
    }
    notify();
  }

  function setSelectedOutletId(id) {
    state.selectedOutletId = id;
    notify();
  }

  function addInboundBatch({ sku, batch, qty, expiryDate, docRef }) {
    const prod = state.products.find(p => p.sku === sku);
    const prodName = prod ? prod.name : 'Produk Herbal';
    const newStock = prod ? prod.stock + qty : qty;

    if (prod) {
      prod.stock = newStock;
      prod.activeBatch = batch;
      prod.fefoDate = expiryDate;
      prod.status = newStock >= prod.rop ? 'optimal' : 'below-rop';
    }

    const newEntry = {
      id: `LEDG-${Math.floor(10000 + Math.random() * 90000)}`,
      timestamp: 'Baru saja • Real-time',
      docRef: docRef || `PO-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      skuName: prodName,
      skuCode: sku,
      batch: batch,
      type: 'MASUK',
      quantity: qty,
      finalStock: newStock,
      operator: 'Slamet Riadi',
      operatorRole: 'Warehouse Inbound',
      hash: `${Math.random().toString(36).substring(2, 6)}...${Math.random().toString(36).substring(2, 6)}`
    };

    state.ledger = [newEntry, ...state.ledger];
    showToast(`Penerimaan +${qty} unit (${batch}) berhasil dicatat ke Ledger!`, 'check_circle');
    notify();
  }

  function approveOrder(orderId) {
    const order = state.orders.find(o => o.id === orderId || o.clientUuid === orderId);
    if (!order) return;

    // Deduct stock for each item using flexible clean matching
    order.items.forEach(item => {
      const prod = state.products.find(p =>
        p.sku === item.sku ||
        p.sku.replace(/SKU-|ARB-|-/g, '') === item.sku.replace(/SKU-|ARB-|-/g, '') ||
        p.name.toLowerCase().includes(item.name.toLowerCase()) ||
        item.name.toLowerCase().includes(p.name.toLowerCase())
      );

      if (prod) {
        prod.stock = Math.max(0, prod.stock - item.quantity);
        prod.status = prod.stock <= prod.safetyStock ? 'below-rop' : (prod.stock <= prod.rop ? 'below-rop' : 'optimal');
      }
    });

    // Add immutable ledger row for each item
    const newLedgerRows = order.items.map(item => ({
      id: `LEDG-${Math.floor(10000 + Math.random() * 90000)}`,
      timestamp: 'Baru saja • Real-time',
      docRef: order.clientUuid,
      skuName: item.name,
      skuCode: item.sku,
      batch: item.batch.replace('Batch: ', ''),
      type: 'KELUAR',
      quantity: -item.quantity,
      finalStock: Math.max(0, item.remainingBatchStock - item.quantity),
      operator: order.salesRep,
      operatorRole: `Field Sales ${order.salesRepId || '#FS-04'}`,
      hash: `${Math.random().toString(36).substring(2, 6)}...${Math.random().toString(36).substring(2, 6)}`
    }));

    state.ledger = [...newLedgerRows, ...state.ledger];

    order.status = 'APPROVED';
    order.syncStatus = 'SYNCED_DEDUCTED';

    showToast(`Pesanan ${order.outletName} disetujui & stok dipotong otomatis!`, 'task_alt');
    notify();
  }

  function batchApproveOrders(orderIds) {
    orderIds.forEach(id => approveOrder(id));
    showToast(`${orderIds.length} pesanan berhasil disetujui & dialokasikan ke armada!`, 'done_all');
  }

  function rejectOrder(orderId, reason) {
    const order = state.orders.find(o => o.id === orderId);
    if (order) {
      order.status = 'REJECTED';
      showToast(`Pesanan #${orderId} ditolak: ${reason || 'Pembatalan manual'}`, 'block');
      notify();
    }
  }

  function substituteOrderBatch({ orderId, sku, newBatch, sourceWarehouse }) {
    const order = state.orders.find(o => o.id === orderId);
    if (!order) return;

    order.items = order.items.map(it => {
      if (it.sku === sku || it.name.includes(sku) || sku.includes(it.sku)) {
        return {
          ...it,
          batch: `Batch: ${newBatch} (${sourceWarehouse})`,
          allocated: true
        };
      }
      return it;
    });
    order.stockWarning = undefined;

    showToast(`Batch dialihkan ke ${newBatch} (${sourceWarehouse}). Pesanan siap disetujui!`, 'swap_horiz');
    notify();
  }

  function adjustOrderQuantity({ orderId, sku, newQty }) {
    const order = state.orders.find(o => o.id === orderId);
    if (!order) return;

    order.items = order.items.map(it => {
      if (it.sku === sku || it.name.includes(sku)) {
        return {
          ...it,
          quantity: newQty,
          subtotal: newQty * it.unitPrice
        };
      }
      return it;
    });
    order.totalAmount = order.items.reduce((acc, it) => acc + it.subtotal, 0);

    showToast(`Kuantitas SKU disesuaikan menjadi ${newQty} unit!`, 'tune');
    notify();
  }

  function adjustStock({ sku, batch, quantityDelta, reason, auditorName }) {
    const prod = state.products.find(p => p.sku === sku);
    const prodName = prod ? prod.name : 'Produk Herbal';
    const newStock = Math.max(0, (prod ? prod.stock : 0) + quantityDelta);

    if (prod) {
      prod.stock = newStock;
      prod.status = newStock <= prod.safetyStock ? 'below-rop' : (newStock <= prod.rop ? 'below-rop' : 'optimal');
    }

    const newEntry = {
      id: `LEDG-${Math.floor(10000 + Math.random() * 90000)}`,
      timestamp: 'Baru saja • Real-time',
      docRef: `ADJ-${Math.floor(100 + Math.random() * 900)}`,
      skuName: prodName,
      skuCode: sku,
      batch: batch,
      type: 'PENYESUAIAN',
      quantity: quantityDelta,
      finalStock: newStock,
      operator: auditorName || 'Dewi Lestari',
      operatorRole: 'Chief Auditor Intern',
      hash: `${Math.random().toString(36).substring(2, 6)}...${Math.random().toString(36).substring(2, 6)}`
    };

    state.ledger = [newEntry, ...state.ledger];
    showToast(`Penyesuaian stok (${quantityDelta > 0 ? '+' : ''}${quantityDelta} unit) dicatat ke Ledger: ${reason}`, 'tune');
    notify();
  }

  function createSupplierPO({ sku, productName, vendorName, quantity, unitPrice, leadTimeDays }) {
    const expDate = new Date();
    expDate.setDate(expDate.getDate() + leadTimeDays);

    const newPO = {
      id: `PO-SUPP-2026-${Math.floor(100 + Math.random() * 900)}`,
      sku,
      productName,
      vendorName,
      quantity,
      unitPrice,
      totalCost: quantity * unitPrice,
      leadTimeDays,
      expectedDate: expDate.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
      status: 'TERKIRIM',
      createdAt: 'Baru saja'
    };

    state.supplierPOs = [newPO, ...state.supplierPOs];
    showToast(`PO Supplier ${newPO.id} berhasil diterbitkan ke ${vendorName}!`, 'local_mall');
    notify();
  }

  function scheduleSalesVisit(params) {
    const newVisit = {
      id: `VISIT-${Math.floor(100 + Math.random() * 900)}`,
      ...params,
      status: 'TERJADWAL'
    };

    state.salesVisits = [newVisit, ...state.salesVisits];

    const targetOutlet = state.outlets.find(o => o.id === params.outletId || o.code === params.outletId);
    if (targetOutlet) {
      targetOutlet.lastVisitDate = params.scheduledDate;
      targetOutlet.visitNotes = `"${params.purpose}: ${params.notes}"`;
    }

    showToast(`Kunjungan ke ${params.outletName} dijadwalkan pada ${params.scheduledDate}`, 'event_available');
    notify();
  }

  function markOrderDelivered(orderId, driverName) {
    state.driverManifests.forEach(manifest => {
      const ord = manifest.orders.find(o => o.orderId === orderId);
      if (ord) {
        ord.delivered = true;
        ord.deliveredTime = new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB';
      }
    });

    const targetOrder = state.orders.find(o => o.id === orderId || o.clientUuid === orderId);
    if (targetOrder) {
      targetOrder.status = 'DISPATCHED';
    }

    showToast(`Bukti Serah Terima (POD) berhasil dicatat oleh Driver ${driverName}!`, 'verified');
    notify();
  }

  function addOutlet(newOutlet) {
    const id = `AP-SLO-${168 + state.outlets.length + 1}`;
    const limit = Number(newOutlet.creditLimit) || 10000000;

    const fullOutlet = {
      id,
      code: id,
      name: newOutlet.name || 'Apotek Mitra Baru',
      address: newOutlet.address || 'Solo Raya',
      city: newOutlet.city || 'Solo',
      cityName: newOutlet.cityName || (newOutlet.city === 'Solo' ? 'Surakarta' : newOutlet.city),
      type: newOutlet.type || 'Apotek Mandiri',
      picName: newOutlet.picName || 'Apoteker Penanggung Jawab',
      picRole: 'Apoteker Pengelola Apotek (APA)',
      picPhone: newOutlet.picPhone || '62812000000',
      salesRep: newOutlet.salesRep || 'Budi Santoso',
      salesArea: 'Solo Tengah',
      terms: newOutlet.terms || 'Net 30 Hari',
      creditLimit: limit,
      creditUsed: 0,
      creditRemaining: limit,
      creditStatus: 'Lancar',
      lastOrderDate: 'Hari Ini (Baru)',
      orderFrequency: 'Akun Baru',
      ytdTotal: 0,
      lastVisitDate: 'Hari Ini',
      visitNotes: `"Outlet baru berhasil didaftarkan ke sistem ERP CV Arba'in. Alokasi rute pengiriman telah terdaftar."`
    };

    state.outlets = [fullOutlet, ...state.outlets];
    state.selectedOutletId = id;
    showToast(`Outlet ${fullOutlet.name} (${id}) berhasil didaftarkan!`, 'add_business');
    notify();
  }

  function submitFieldSalesOrder(newOrder) {
    const id = `ord-${Math.random().toString(36).substring(2, 7)}-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}`;

    const orderObj = {
      id,
      clientUuid: id,
      outletId: newOrder.outletId || 'AP-SLO-001',
      outletName: newOrder.outletName || 'Apotek Mitra',
      address: newOrder.address || 'Surakarta',
      city: newOrder.city || 'Surakarta',
      salesRep: newOrder.salesRep || 'Budi Santoso',
      salesRepId: 'REP-SR-04',
      orderTime: 'Baru saja (<1m lalu)',
      orderTimestamp: Date.now(),
      totalAmount: newOrder.totalAmount || 0,
      terms: newOrder.terms || 'Net 30 Hari',
      limitMax: 15000000,
      limitRemaining: 8000000,
      geofenceValid: true,
      geofenceCoords: '-7.5583, 110.8214 (Presisi GPS)',
      npwp: '01.324.891.4-528.000',
      status: 'PENDING',
      syncStatus: state.isOnline ? 'SYNCED_DEDUCTED' : 'OFFLINE_QUEUED',
      priority: 'Normal',
      items: newOrder.items || []
    };

    if (!state.isOnline) {
      state.offlineQueue = [orderObj, ...state.offlineQueue];
    }

    state.orders = [orderObj, ...state.orders];

    showToast(
      state.isOnline
        ? `Pesanan ${orderObj.outletName} dikirim ke antrean pusat!`
        : `Pesanan disimpan di offline storage lokal (akan sync otomatis saat online)`,
      state.isOnline ? 'cloud_upload' : 'save'
    );
    notify();
  }

  function resetToDefaults() {
    localStorage.removeItem(STORAGE_KEY);
    location.reload();
  }

  // Initialize theme on load
  if (state.isDarkMode) {
    document.documentElement.classList.add('dark');
  }

  return {
    getState: () => state,
    subscribe,
    notify,
    setPath,
    setRole,
    toggleSidebar,
    toggleDarkMode,
    toggleOnlineStatus,
    setSelectedOutletId,
    showToast,
    addInboundBatch,
    approveOrder,
    batchApproveOrders,
    rejectOrder,
    substituteOrderBatch,
    adjustOrderQuantity,
    adjustStock,
    createSupplierPO,
    scheduleSalesVisit,
    markOrderDelivered,
    addOutlet,
    submitFieldSalesOrder,
    resetToDefaults
  };
})();
