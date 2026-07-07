"use client";

import React, { useState } from "react";
import { useApp, Order } from "@/context/AppContext";
import { 
  BarChart3, CheckSquare, Clock, ShieldAlert, Award, FileSpreadsheet, 
  MapPin, Edit3, ArrowRight, UserCheck, RefreshCw, Box, Landmark, Truck
} from "lucide-react";

export default function AdminDashboard() {
  const { orders, updateOrderStatus, adminApproveCustomOrder } = useApp();

  // Selected order to review custom specs
  const [selectedReviewOrder, setSelectedReviewOrder] = useState<Order | null>(null);
  const [adjustedPrice, setAdjustedPrice] = useState<number>(0);
  
  // Tab states: 'all', 'custom_review', 'active_logistics'
  const [activeTab, setActiveTab] = useState<string>("all");

  const startReview = (order: Order) => {
    setSelectedReviewOrder(order);
    setAdjustedPrice(order.totalProductPrice);
  };

  const handleApproveCustom = () => {
    if (!selectedReviewOrder) return;
    adminApproveCustomOrder(selectedReviewOrder.id, adjustedPrice);
    alert(`Pesanan custom "${selectedReviewOrder.id}" telah disetujui dengan harga kabinet disesuaikan menjadi IDR ${adjustedPrice.toLocaleString("id-ID")}. Tautan bayar DP dikirim ke konsumen.`);
    setSelectedReviewOrder(null);
  };

  const handleAdvanceDelivery = (orderId: string, currentStatus: Order["deliveryStatus"]) => {
    let nextStatus: Order["deliveryStatus"] = currentStatus;
    let nextPaymentStatus: Order["paymentStatus"] = "dp_paid";

    if (currentStatus === "processing") {
      nextStatus = "scheduled";
    } else if (currentStatus === "scheduled") {
      nextStatus = "out_for_delivery";
    } else if (currentStatus === "out_for_delivery") {
      nextStatus = "installed_and_completed";
      nextPaymentStatus = "fully_paid"; // COD collected upon assembly completion
    }

    updateOrderStatus(orderId, nextPaymentStatus, nextStatus);
    alert(`Status pengiriman pesanan "${orderId}" diperbarui menjadi "${nextStatus.toUpperCase()}".`);
  };

  // --- Statistics Calculation ---
  const totalSales = orders.reduce((sum, order) => {
    if (order.paymentStatus === "fully_paid") return sum + order.totalAmount;
    if (order.paymentStatus === "dp_paid") return sum + order.dpAmount;
    return sum;
  }, 0);

  const pendingReviewsCount = orders.filter(
    (o) => o.type === "custom_made" && o.deliveryStatus === "pending"
  ).length;

  const activeShipmentsCount = orders.filter(
    (o) => o.paymentStatus === "dp_paid" && o.deliveryStatus !== "installed_and_completed"
  ).length;

  const filteredOrders = orders.filter((order) => {
    if (activeTab === "custom_review") return order.type === "custom_made" && order.deliveryStatus === "pending";
    if (activeTab === "active_logistics") return order.paymentStatus === "dp_paid" && order.deliveryStatus !== "installed_and_completed";
    return true; // default 'all'
  });

  return (
    <div className="bg-salon-cream min-h-screen py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center sm:text-left space-y-2 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-700 text-xs font-semibold uppercase tracking-wider">
            <ShieldAlert className="h-3.5 w-3.5" /> Portal Internal Pengelola
          </div>
          <h1 className="font-serif text-3xl font-bold text-salon-dark">Dasbor Admin SalonGlass</h1>
          <p className="text-xs sm:text-sm text-salon-dark/60 font-light">
            Kelola pengajuan custom kabinet, validasi kelayakan struktur kaca, modifikasi harga, dan pantau status kurir.
          </p>
        </div>

        {/* Operational Statistics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          
          <div className="glass-panel p-6 rounded-2xl border border-gold-500/15 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-600">
              <Landmark className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] text-salon-dark/45 uppercase tracking-wider font-semibold">Total Pendapatan DP/COD</p>
              <p className="text-xl font-bold text-salon-dark font-mono mt-0.5">IDR {totalSales.toLocaleString("id-ID")}</p>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-gold-500/15 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-600">
              <Clock className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] text-salon-dark/45 uppercase tracking-wider font-semibold">Review Kustomisasi Baru</p>
              <p className="text-xl font-bold text-salon-dark font-mono mt-0.5">{pendingReviewsCount} Pesanan</p>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-gold-500/15 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600">
              <Truck className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[10px] text-salon-dark/45 uppercase tracking-wider font-semibold">Pengiriman & Rakit Aktif</p>
              <p className="text-xl font-bold text-salon-dark font-mono mt-0.5">{activeShipmentsCount} Alamat</p>
            </div>
          </div>

        </div>

        {/* Tab Filters Navigation */}
        <div className="flex gap-4 border-b border-gold-500/10 pb-4 mb-8">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider border cursor-pointer transition-all ${
              activeTab === "all"
                ? "bg-gold-500 border-gold-500 text-salon-cream font-bold"
                : "border-gold-500/10 text-salon-dark/65 hover:bg-gold-500/5"
            }`}
          >
            Semua Pesanan ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab("custom_review")}
            className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider border cursor-pointer transition-all ${
              activeTab === "custom_review"
                ? "bg-gold-500 border-gold-500 text-salon-cream font-bold"
                : "border-gold-500/10 text-salon-dark/65 hover:bg-gold-500/5"
            }`}
          >
            Review Custom ({pendingReviewsCount})
          </button>
          <button
            onClick={() => setActiveTab("active_logistics")}
            className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider border cursor-pointer transition-all ${
              activeTab === "active_logistics"
                ? "bg-gold-500 border-gold-500 text-salon-cream font-bold"
                : "border-gold-500/10 text-salon-dark/65 hover:bg-gold-500/5"
            }`}
          >
            Kirim & Perakitan ({activeShipmentsCount})
          </button>
        </div>

        {/* Main Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Side: Orders List */}
          <div className="lg:col-span-8 space-y-4">
            {filteredOrders.length === 0 ? (
              <div className="glass-panel p-16 rounded-2xl text-center space-y-4">
                <CheckSquare className="h-10 w-10 text-gold-500 mx-auto" />
                <h3 className="font-serif text-lg font-bold text-salon-dark">Tidak Ada Transaksi</h3>
                <p className="text-xs text-salon-dark/60 font-light">Tidak ada pesanan yang sesuai dengan filter tab aktif saat ini.</p>
              </div>
            ) : (
              filteredOrders.map((order) => (
                <div 
                  key={order.id} 
                  className="glass-panel p-6 rounded-2xl border border-gold-500/10 space-y-4 shadow-sm"
                >
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-3 border-b border-gold-500/5 pb-3">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono font-bold text-sm">{order.id}</span>
                        <span className="text-[9px] bg-salon-cream border border-gold-500/20 text-gold-800 font-semibold px-2 py-0.5 rounded uppercase">
                          {order.type === "custom_made" ? "Custom-Made" : "Ready-Stock"}
                        </span>
                      </div>
                      <p className="text-[10px] text-salon-dark/45 mt-1 font-light">
                        Pemesan: {order.shippingAddress.salonName} ({order.shippingAddress.ownerName})
                      </p>
                    </div>

                    <div className="text-left sm:text-right text-xs">
                      <p className="text-salon-dark/50 font-light">Status Pembayaran:</p>
                      <p className={`font-bold uppercase text-[10px] mt-0.5 ${
                        order.paymentStatus === "fully_paid" ? "text-blue-600" :
                        order.paymentStatus === "dp_paid" ? "text-emerald-600" : "text-amber-600"
                      }`}>
                        {order.paymentStatus === "fully_paid" ? "Lunas" :
                         order.paymentStatus === "dp_paid" ? "DP 50% Dibayar" : "Belum Bayar"}
                      </p>
                    </div>
                  </div>

                  {/* Details summary */}
                  <div className="text-xs space-y-2.5 font-light">
                    {order.type === "ready_stock" && order.items && (
                      <div>
                        <span className="text-salon-dark/50">Item: </span>
                        <span className="font-semibold text-salon-dark">
                          {order.items.map((i) => `${i.product.name} (${i.quantity}x)`).join(", ")}
                        </span>
                      </div>
                    )}
                    {order.type === "custom_made" && order.customSpecs && (
                      <div className="space-y-1">
                        <p><span className="text-salon-dark/50">Kustomisasi Dimensi:</span> <strong>{order.customSpecs.width} x {order.customSpecs.depth} x {order.customSpecs.height} cm</strong></p>
                        <p>
                          <span className="text-salon-dark/50">Opsi Kaca & LED:</span> 
                          <span className="font-medium uppercase"> {order.customSpecs.glassThickness} | {order.customSpecs.ledOption}</span>
                        </p>
                        {order.customSpecs.notes && (
                          <p className="text-[10px] italic text-salon-dark/65 bg-salon-cream/50 p-2 rounded border border-gold-500/5 mt-1">
                            &ldquo;{order.customSpecs.notes}&rdquo;
                          </p>
                        )}
                      </div>
                    )}

                    <p>📍 <strong>Alamat</strong>: {order.shippingAddress.address} ({order.shippingAddress.phone})</p>
                    
                    <div className="flex justify-between items-center py-1.5 bg-salon-cream/55 px-3 rounded-lg border border-gold-500/5 font-mono text-[11px]">
                      <span className="text-salon-dark/50">Subtotal: IDR {order.totalProductPrice.toLocaleString("id-ID")}</span>
                      <span className="text-salon-dark/50">Ongkir: IDR {order.deliveryFee.toLocaleString("id-ID")}</span>
                      <span className="font-bold text-gold-600">Total: IDR {order.totalAmount.toLocaleString("id-ID")}</span>
                    </div>
                  </div>

                  {/* Actions Column based on status */}
                  <div className="pt-2 border-t border-gold-500/5 flex flex-wrap gap-3 items-center justify-between">
                    <div>
                      <span className="text-[10px] text-salon-dark/45 font-semibold uppercase tracking-wider">Status Kurir: </span>
                      <span className="text-[10px] font-bold text-gold-700 bg-gold-500/5 px-2 py-0.5 rounded border border-gold-500/15 uppercase">
                        {order.deliveryStatus}
                      </span>
                    </div>

                    {/* Button Custom Review */}
                    {order.type === "custom_made" && order.deliveryStatus === "pending" && (
                      <button
                        onClick={() => startReview(order)}
                        className="px-4 py-2 bg-amber-500 text-salon-cream rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-amber-600 transition-all cursor-pointer shadow-sm flex items-center gap-1.5"
                      >
                        <Edit3 className="h-3.5 w-3.5" /> Review Desain
                      </button>
                    )}

                    {/* Button Logistics progression */}
                    {order.paymentStatus === "dp_paid" && order.deliveryStatus !== "installed_and_completed" && (
                      <button
                        onClick={() => handleAdvanceDelivery(order.id, order.deliveryStatus)}
                        className="px-4 py-2 bg-emerald-600 text-salon-cream rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-emerald-700 transition-all cursor-pointer shadow-sm flex items-center gap-1.5"
                      >
                        <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                        {order.deliveryStatus === "processing" && "Keluarkan Jadwal Kirim"}
                        {order.deliveryStatus === "scheduled" && "Jalankan Kurir Toko"}
                        {order.deliveryStatus === "out_for_delivery" && "Selesai Perakitan & Lunas COD"}
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Right Side: Active Custom Review Panel */}
          <div className="lg:col-span-4 lg:sticky lg:top-24">
            {selectedReviewOrder ? (
              <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-amber-500/20 shadow-lg space-y-6 bg-amber-500/5 animate-fade-in">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1.5 text-amber-700 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full text-xs font-semibold uppercase">
                    <Edit3 className="h-3 w-3" /> Panel Review
                  </div>
                  <h3 className="font-serif text-lg font-bold text-salon-dark">Evaluasi Dimensi Kaca</h3>
                  <p className="text-[10px] text-salon-dark/45 font-light">Kode: {selectedReviewOrder.id}</p>
                </div>

                <div className="bg-salon-cream/70 p-4 rounded-xl border border-gold-500/10 space-y-2 text-xs font-light">
                  <p><strong>Lebar</strong>: {selectedReviewOrder.customSpecs?.width} cm</p>
                  <p><strong>Tinggi</strong>: {selectedReviewOrder.customSpecs?.height} cm</p>
                  <p><strong>Kedalaman</strong>: {selectedReviewOrder.customSpecs?.depth} cm</p>
                  <p><strong>Ketebalan Kaca</strong>: {selectedReviewOrder.customSpecs?.glassThickness} Tempered</p>
                  <p><strong>LED System</strong>: {selectedReviewOrder.customSpecs?.ledOption}</p>
                  {selectedReviewOrder.customSpecs?.notes && (
                    <p className="italic bg-white p-2 rounded border mt-2 font-mono text-[9px] text-salon-dark/75 leading-relaxed">
                      &ldquo;{selectedReviewOrder.customSpecs.notes}&rdquo;
                    </p>
                  )}
                </div>

                {/* Pricing adjustments overrides */}
                <div className="space-y-2">
                  <label className="text-[10px] font-semibold text-salon-dark/70 uppercase tracking-wider block">Harga Lemari (Rekomendasi / Sesuaikan)</label>
                  <input
                    type="number"
                    value={adjustedPrice}
                    onChange={(e) => setAdjustedPrice(Number(e.target.value))}
                    className="w-full px-3.5 py-3 bg-salon-cream border border-gold-500/20 rounded-xl text-xs font-mono font-bold focus:outline-none focus:border-gold-500"
                  />
                  <p className="text-[9px] text-salon-dark/40 leading-relaxed">
                    *Admin berhak menyesuaikan harga final jika ada catatan khusus pemesan (misal warna emas khusus, backing cermin ekstra).
                  </p>
                </div>

                <div className="pt-2 flex flex-col gap-2">
                  <button
                    onClick={handleApproveCustom}
                    className="w-full py-3.5 bg-emerald-600 text-salon-cream rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-emerald-700 transition-all cursor-pointer shadow-md"
                  >
                    Setujui & Kirim Invoice DP
                  </button>
                  <button
                    onClick={() => setSelectedReviewOrder(null)}
                    className="w-full py-3 text-slate-500 hover:text-slate-700 text-xs font-semibold cursor-pointer"
                  >
                    Batal Review
                  </button>
                </div>
              </div>
            ) : (
              <div className="glass-panel p-8 rounded-2xl border border-gold-500/10 text-center space-y-4">
                <Box className="h-10 w-10 text-gold-500 mx-auto" />
                <h4 className="font-serif text-base font-bold text-salon-dark">Evaluasi Desain Custom</h4>
                <p className="text-xs text-salon-dark/65 font-light leading-relaxed">
                  Pilih salah satu pesanan custom dengan menekan tombol **"Review Desain"** untuk memvalidasi kelayakan ukuran kaca dan mengirim invoice DP 50% ke pembeli.
                </p>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
