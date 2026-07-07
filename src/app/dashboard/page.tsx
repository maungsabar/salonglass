"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useApp, Order } from "@/context/AppContext";
import { 
  Clock, CheckCircle, Truck, Package, ShieldCheck, CreditCard, 
  HelpCircle, Sparkles, ChevronDown, ChevronUp, Lock, Copy, Check, AlertTriangle
} from "lucide-react";

export default function BuyerDashboard() {
  const { orders, updateOrderStatus } = useApp();

  // Collapsed order states
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  
  // Midtrans Payment Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrderForPayment, setSelectedOrderForPayment] = useState<Order | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("bank_transfer");
  const [copiedCode, setCopiedCode] = useState(false);

  const toggleExpand = (id: string) => {
    setExpandedOrderId(expandedOrderId === id ? null : id);
  };

  const handleOpenPayment = (order: Order) => {
    setSelectedOrderForPayment(order);
    setIsModalOpen(true);
  };

  const handleSimulatePayment = (success: boolean) => {
    if (success && selectedOrderForPayment) {
      // Update order status to DP paid, transition delivery to processing (production starts)
      updateOrderStatus(selectedOrderForPayment.id, "dp_paid", "processing");
      alert(`Pembayaran DP untuk pesanan "${selectedOrderForPayment.id}" BERHASIL! Status pesanan kini diubah menjadi "Sedang Diproduksi/Disiapkan".`);
    } else if (selectedOrderForPayment) {
      alert("Simulasi pembayaran dibatalkan.");
    }
    setIsModalOpen(false);
    setSelectedOrderForPayment(null);
  };

  const copyVaNumber = () => {
    navigator.clipboard.writeText("8806081298765432");
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // Get localized status badge details
  const getStatusBadge = (order: Order) => {
    if (order.type === "custom_made" && order.paymentStatus === "unpaid" && order.deliveryStatus === "pending") {
      return {
        text: "Menunggu Review Admin",
        classes: "bg-amber-50 text-amber-700 border-amber-200"
      };
    }
    if (order.paymentStatus === "unpaid") {
      return {
        text: "Menunggu Bayar DP 50%",
        classes: "bg-red-50 text-red-700 border-red-200 animate-pulse"
      };
    }
    if (order.paymentStatus === "dp_paid") {
      return {
        text: "DP 50% Lunas",
        classes: "bg-emerald-50 text-emerald-700 border-emerald-200"
      };
    }
    return {
      text: "Lunas (Fully Paid)",
      classes: "bg-blue-50 text-blue-700 border-blue-200"
    };
  };

  // Logistics status texts
  const getLogisticsText = (status: Order["deliveryStatus"]) => {
    switch (status) {
      case "pending": return "Menunggu Persetujuan";
      case "processing": return "Sedang Diproduksi / Disiapkan";
      case "scheduled": return "Jadwal Pengiriman Ditetapkan";
      case "out_for_delivery": return "Kurir Menuju Lokasi Salon";
      case "installed_and_completed": return "Selesai Dirakit & Dilunasi";
      default: return "Diproses";
    }
  };

  // Steps indicator check
  const getStepStatus = (order: Order, step: number) => {
    const { deliveryStatus, paymentStatus, type } = order;
    
    // Step 1: Pesanan Dibuat (Selalu Selesai)
    if (step === 1) return "completed";
    
    // Step 2: Review Kelayakan (Untuk ready stock langsung centang, untuk custom: selesai jika status bukan pending)
    if (step === 2) {
      if (type === "ready_stock") return "completed";
      return deliveryStatus !== "pending" ? "completed" : "current";
    }
    
    // Step 3: Pembayaran DP 50% (Selesai jika dp_paid atau fully_paid)
    if (step === 3) {
      if (paymentStatus === "dp_paid" || paymentStatus === "fully_paid") return "completed";
      if (type === "custom_made" && deliveryStatus === "pending") return "upcoming"; // Wait review
      return "current"; // Waiting payment
    }
    
    // Step 4: Produksi & Jadwal Pengiriman (Selesai jika scheduled / out / complete)
    if (step === 4) {
      if (deliveryStatus === "scheduled" || deliveryStatus === "out_for_delivery" || deliveryStatus === "installed_and_completed") return "completed";
      if (paymentStatus === "dp_paid") return "current";
      return "upcoming";
    }
    
    // Step 5: Selesai Dirakit & Pelunasan COD (Selesai jika completed)
    if (step === 5) {
      if (deliveryStatus === "installed_and_completed") return "completed";
      if (deliveryStatus === "out_for_delivery") return "current";
      return "upcoming";
    }
    
    return "upcoming";
  };

  return (
    <div className="bg-salon-cream min-h-screen py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center sm:text-left space-y-2 mb-10">
          <h1 className="font-serif text-3xl font-bold text-salon-dark">Dashboard Pelanggan</h1>
          <p className="text-xs sm:text-sm text-salon-dark/60 font-light">
            Lacak status pengerjaan, persetujuan custom, pembayaran DP, serta jadwal armada kurir toko kami.
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="glass-panel p-16 rounded-3xl text-center space-y-4 max-w-xl mx-auto">
            <Clock className="h-12 w-16 text-gold-500 mx-auto" />
            <h3 className="font-serif text-xl font-bold text-salon-dark">Belum Ada Pesanan</h3>
            <p className="text-xs text-salon-dark/60 font-light leading-relaxed">
              Anda belum menempatkan pesanan ready-stock atau mengajukan desain cabinet custom ukuran sendiri.
            </p>
            <div className="flex gap-4 justify-center pt-2">
              <Link 
                href="/catalog" 
                className="px-6 py-2.5 rounded-full bg-gold-500 text-salon-cream text-xs font-semibold uppercase tracking-wider hover:bg-gold-600 transition-all"
              >
                Katalog Ready
              </Link>
              <Link 
                href="/custom" 
                className="px-6 py-2.5 rounded-full border border-gold-500/40 text-gold-700 text-xs font-semibold uppercase tracking-wider hover:bg-gold-500/5 transition-all"
              >
                Custom Cabinet
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => {
              const isExpanded = expandedOrderId === order.id;
              const badge = getStatusBadge(order);
              
              // Determine if custom order is approved and awaiting DP payment
              const isAwaitingCustomPayment = order.type === "custom_made" && 
                                              order.deliveryStatus === "processing" && 
                                              order.paymentStatus === "unpaid";
              
              const isAwaitingReadyPayment = order.type === "ready_stock" && 
                                             order.paymentStatus === "unpaid";
              
              const canPayNow = isAwaitingCustomPayment || isAwaitingReadyPayment;

              return (
                <div 
                  key={order.id} 
                  className="glass-panel rounded-2xl border border-gold-500/10 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                >
                  
                  {/* Order Card Header */}
                  <div 
                    onClick={() => toggleExpand(order.id)}
                    className="p-6 flex flex-col sm:flex-row justify-between items-center sm:items-start gap-4 cursor-pointer hover:bg-gold-500/5 transition-colors"
                  >
                    <div className="space-y-1 w-full sm:w-auto text-center sm:text-left">
                      <div className="flex items-center justify-center sm:justify-start gap-2.5 flex-wrap">
                        <span className="font-mono text-sm font-bold text-salon-dark">{order.id}</span>
                        <span className="text-[10px] bg-salon-warm border border-gold-500/20 text-gold-800 font-semibold px-2 py-0.5 rounded uppercase">
                          {order.type === "custom_made" ? "Custom Cabinet" : "Ready Stock"}
                        </span>
                        <span className={`text-[10px] font-semibold border px-2 py-0.5 rounded uppercase ${badge.classes}`}>
                          {badge.text}
                        </span>
                      </div>
                      <p className="text-[10px] text-salon-dark/45 font-light">
                        Dibuat pada: {new Date(order.createdAt).toLocaleDateString("id-ID", {
                          day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit"
                        })} WIB
                      </p>
                    </div>

                    <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                      <div className="text-right">
                        <p className="text-[9px] text-salon-dark/40 uppercase tracking-wider">Total Tagihan</p>
                        <p className="text-sm font-bold font-mono text-gold-600">IDR {order.totalAmount.toLocaleString("id-ID")}</p>
                      </div>
                      <div>
                        {isExpanded ? <ChevronUp className="h-5 w-5 text-salon-dark/40" /> : <ChevronDown className="h-5 w-5 text-salon-dark/40" />}
                      </div>
                    </div>
                  </div>

                  {/* Order Visual Timeline tracking */}
                  <div className="px-6 pb-6 pt-2 border-t border-gold-500/5">
                    <div className="py-4">
                      <div className="flex items-center justify-between">
                        
                        {/* Timeline Step 1 */}
                        <div className="flex flex-col items-center flex-1 relative">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center border text-xs font-bold ${
                            getStepStatus(order, 1) === "completed" ? "bg-emerald-600 border-emerald-600 text-salon-cream" : "border-gold-500/25 text-salon-dark/40 bg-salon-cream"
                          }`}>
                            1
                          </div>
                          <span className="text-[9px] text-center font-semibold mt-2 text-salon-dark/70 max-w-[64px]">Dibuat</span>
                          <div className="absolute top-4 left-[calc(50%+16px)] right-[-50%] h-0.5 bg-slate-200 -z-10"></div>
                        </div>

                        {/* Timeline Step 2 */}
                        <div className="flex flex-col items-center flex-1 relative">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center border text-xs font-bold ${
                            getStepStatus(order, 2) === "completed" ? "bg-emerald-600 border-emerald-600 text-salon-cream" : 
                            getStepStatus(order, 2) === "current" ? "border-gold-500 bg-gold-500/10 text-gold-700 animate-pulse font-extrabold" :
                            "border-gold-500/25 text-salon-dark/40 bg-salon-cream"
                          }`}>
                            2
                          </div>
                          <span className="text-[9px] text-center font-semibold mt-2 text-salon-dark/70 max-w-[64px]">Review Desain</span>
                          <div className="absolute top-4 left-[calc(50%+16px)] right-[-50%] h-0.5 bg-slate-200 -z-10"></div>
                        </div>

                        {/* Timeline Step 3 */}
                        <div className="flex flex-col items-center flex-1 relative">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center border text-xs font-bold ${
                            getStepStatus(order, 3) === "completed" ? "bg-emerald-600 border-emerald-600 text-salon-cream" : 
                            getStepStatus(order, 3) === "current" ? "border-red-500 bg-red-500/10 text-red-600 font-extrabold animate-pulse" :
                            "border-gold-500/25 text-salon-dark/40 bg-salon-cream"
                          }`}>
                            3
                          </div>
                          <span className="text-[9px] text-center font-semibold mt-2 text-salon-dark/70 max-w-[64px]">Bayar DP 50%</span>
                          <div className="absolute top-4 left-[calc(50%+16px)] right-[-50%] h-0.5 bg-slate-200 -z-10"></div>
                        </div>

                        {/* Timeline Step 4 */}
                        <div className="flex flex-col items-center flex-1 relative">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center border text-xs font-bold ${
                            getStepStatus(order, 4) === "completed" ? "bg-emerald-600 border-emerald-600 text-salon-cream" : 
                            getStepStatus(order, 4) === "current" ? "border-gold-500 bg-gold-500/10 text-gold-700 animate-pulse font-extrabold" :
                            "border-gold-500/25 text-salon-dark/40 bg-salon-cream"
                          }`}>
                            4
                          </div>
                          <span className="text-[9px] text-center font-semibold mt-2 text-salon-dark/70 max-w-[64px]">Produksi & Kirim</span>
                          <div className="absolute top-4 left-[calc(50%+16px)] right-[-50%] h-0.5 bg-slate-200 -z-10"></div>
                        </div>

                        {/* Timeline Step 5 */}
                        <div className="flex flex-col items-center flex-1 relative">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center border text-xs font-bold ${
                            getStepStatus(order, 5) === "completed" ? "bg-emerald-600 border-emerald-600 text-salon-cream" : 
                            getStepStatus(order, 5) === "current" ? "border-gold-500 bg-gold-500/10 text-gold-700 animate-pulse font-extrabold" :
                            "border-gold-500/25 text-salon-dark/40 bg-salon-cream"
                          }`}>
                            5
                          </div>
                          <span className="text-[9px] text-center font-semibold mt-2 text-salon-dark/70 max-w-[64px]">Rakit & Lunas</span>
                        </div>

                      </div>
                    </div>
                  </div>

                  {/* Expanded Content Details */}
                  {isExpanded && (
                    <div className="p-6 border-t border-gold-500/5 bg-salon-warm/15 space-y-6 text-xs animate-fade-in">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Column 1: Item specs */}
                        <div className="space-y-4">
                          <h4 className="font-serif text-sm font-bold text-salon-dark border-b border-gold-500/10 pb-1.5 uppercase tracking-wider">Spesifikasi Pesanan</h4>
                          
                          {order.type === "ready_stock" && order.items && (
                            <div className="space-y-3">
                              {order.items.map((item) => (
                                <div key={item.id} className="flex justify-between items-center bg-salon-cream/55 p-3 rounded-lg border border-gold-500/10">
                                  <div>
                                    <p className="font-bold text-salon-dark">{item.product.name}</p>
                                    <p className="text-[10px] text-salon-dark/50 font-light">{item.product.dimensions} | {item.quantity} Unit</p>
                                  </div>
                                  <span className="font-mono font-semibold">IDR {item.product.price.toLocaleString("id-ID")}</span>
                                </div>
                              ))}
                            </div>
                          )}

                          {order.type === "custom_made" && order.customSpecs && (
                            <div className="bg-salon-cream/55 p-4 rounded-xl border border-gold-500/10 space-y-2">
                              <div className="flex justify-between py-1 border-b border-gold-500/5">
                                <span className="text-salon-dark/50">Dimensi Custom</span>
                                <span className="font-semibold text-salon-dark">{order.customSpecs.width} x {order.customSpecs.depth} x {order.customSpecs.height} cm</span>
                              </div>
                              <div className="flex justify-between py-1 border-b border-gold-500/5">
                                <span className="text-salon-dark/50">Tebal Kaca Tempered</span>
                                <span className="font-semibold text-salon-dark uppercase">{order.customSpecs.glassThickness}</span>
                              </div>
                              <div className="flex justify-between py-1 border-b border-gold-500/5">
                                <span className="text-salon-dark/50">Sistem Pencahayaan LED</span>
                                <span className="font-semibold text-salon-dark uppercase">
                                  {order.customSpecs.ledOption === "none" ? "Tanpa LED" : order.customSpecs.ledOption === "white_led" ? "Cool White" : order.customSpecs.ledOption === "warm_led" ? "Warm" : "RGB Neon"}
                                </span>
                              </div>
                              <div className="flex justify-between py-1">
                                <span className="text-salon-dark/50">Kunci Pengaman Ganda</span>
                                <span className="font-semibold text-salon-dark">{order.customSpecs.lockOption ? "Ada" : "Tidak"}</span>
                              </div>
                              {order.customSpecs.notes && (
                                <div className="pt-2 border-t border-gold-500/5 text-[10px]">
                                  <p className="text-salon-dark/45 font-semibold">Catatan Tambahan Pembeli:</p>
                                  <p className="italic text-salon-dark/70 mt-1 font-light">&ldquo;{order.customSpecs.notes}&rdquo;</p>
                                </div>
                              )}
                            </div>
                          )}
                        </div>

                        {/* Column 2: Alamat & Rincian Transaksi */}
                        <div className="space-y-4">
                          <h4 className="font-serif text-sm font-bold text-salon-dark border-b border-gold-500/10 pb-1.5 uppercase tracking-wider">Logistik & Biaya Alamat</h4>
                          
                          <div className="bg-salon-cream/55 p-4 rounded-xl border border-gold-500/10 space-y-2 font-light">
                            <p>📍 <strong>Salon</strong>: {order.shippingAddress.salonName} ({order.shippingAddress.ownerName})</p>
                            <p>📞 <strong>Whatsapp</strong>: {order.shippingAddress.phone}</p>
                            <p>🏠 <strong>Alamat Rakit</strong>: {order.shippingAddress.address}</p>
                            <p>🚚 <strong>Wilayah Kurir</strong>: {order.shippingAddress.city === "dalam_kota" ? "Dalam Kota (Jabodetabek)" : "Luar Kota (Jawa & DIY)"}</p>
                          </div>

                          <div className="bg-salon-cream/55 p-4 rounded-xl border border-gold-500/10 space-y-2">
                            <div className="flex justify-between">
                              <span className="text-salon-dark/50">Subtotal Kabinet</span>
                              <span className="font-semibold font-mono">IDR {order.totalProductPrice.toLocaleString("id-ID")}</span>
                            </div>
                            <div className="flex justify-between border-b border-gold-500/5 pb-2">
                              <span className="text-salon-dark/50">Ongkos Kirim + Jasa Perakitan</span>
                              <span className="font-semibold font-mono">IDR {order.deliveryFee.toLocaleString("id-ID")}</span>
                            </div>
                            <div className="flex justify-between text-emerald-700 font-bold">
                              <span>DP 50% (Pembayaran Online)</span>
                              <span className="font-mono">IDR {order.dpAmount.toLocaleString("id-ID")}</span>
                            </div>
                            <div className="flex justify-between text-gold-700 font-bold">
                              <span>Sisa 50% (Bayar COD di Lokasi)</span>
                              <span className="font-mono">IDR {order.remainingBalance.toLocaleString("id-ID")}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Pay Deposit Action button */}
                      {canPayNow && (
                        <div className="flex items-center justify-between p-4 bg-red-50 border border-red-100 rounded-xl">
                          <div className="flex items-start gap-3 text-red-800">
                            <CreditCard className="h-5 w-5 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="font-bold">Aksi Diperlukan: Bayar DP 50% Sekarang</p>
                              <p className="text-[10px] text-red-700/80 font-light">
                                {order.type === "custom_made" 
                                  ? "Desain custom Anda telah disetujui kelayakannya oleh admin. Lakukan bayar DP untuk memulai produksi." 
                                  : "Silakan selesaikan pembayaran DP 50% Anda agar kami bisa menjadwalkan kurir toko."
                                }
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => handleOpenPayment(order)}
                            className="px-5 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-salon-cream text-xs font-semibold uppercase tracking-wider shadow cursor-pointer transition-all"
                          >
                            Bayar DP 50%
                          </button>
                        </div>
                      )}

                      {/* Status Logistik detail info */}
                      <div className="p-4 bg-gold-500/5 border border-gold-500/10 rounded-xl flex items-center gap-3">
                        <Clock className="h-4.5 w-4.5 text-gold-600 flex-shrink-0" />
                        <div>
                          <p className="font-semibold text-salon-dark">Status Operasional Saat Ini: {getLogisticsText(order.deliveryStatus)}</p>
                          <p className="text-[10px] text-salon-dark/50 font-light">
                            {order.deliveryStatus === "pending" && "Menunggu review ketersediaan antrean workshop kami."}
                            {order.deliveryStatus === "processing" && "Lemari sedang dipotong kaca, dipasang lampu led dan dirakit rangka bingkai kayu di workshop."}
                            {order.deliveryStatus === "scheduled" && "Lemari selesai diproduksi. Jadwal pengantaran telah ditentukan oleh admin logistik."}
                            {order.deliveryStatus === "out_for_delivery" && "Lemari berada di mobil box kurir toko kami menuju alamat salon Anda."}
                            {order.deliveryStatus === "installed_and_completed" && "Lemari telah selesai dirakit dan sisa pembayaran pelunasan 50% COD diterima kurir."}
                          </p>
                        </div>
                      </div>

                    </div>
                  )}

                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* --- PAYMENT MODAL GATEWAY SIMULATOR --- */}
      {isModalOpen && selectedOrderForPayment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white text-slate-800 w-full max-w-md rounded-2xl overflow-hidden shadow-2xl border border-slate-200 flex flex-col">
            
            {/* Modal Header mimicking Midtrans */}
            <div className="bg-slate-900 text-white p-5 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="h-7 w-7 rounded bg-gradient-to-tr from-cyan-500 to-indigo-500 flex items-center justify-center text-white font-extrabold text-[10px] uppercase">
                  SG
                </div>
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider">Midtrans Simulator</h4>
                  <p className="text-[9px] text-slate-400">SalonGlass Cabinet Gateway</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[9px] text-slate-400 uppercase">Jumlah Tagihan DP</p>
                <p className="text-sm font-bold font-mono text-cyan-400">IDR {selectedOrderForPayment.dpAmount.toLocaleString("id-ID")}</p>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 flex-grow">
              
              {/* Method selector tab */}
              <div className="bg-slate-100 p-1 rounded-lg flex text-xs">
                <button
                  onClick={() => setSelectedPaymentMethod("bank_transfer")}
                  className={`flex-1 py-2 text-center rounded-md font-semibold transition-all cursor-pointer ${
                    selectedPaymentMethod === "bank_transfer" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  Transfer Bank VA
                </button>
                <button
                  onClick={() => setSelectedPaymentMethod("credit_card")}
                  className={`flex-1 py-2 text-center rounded-md font-semibold transition-all cursor-pointer ${
                    selectedPaymentMethod === "credit_card" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  Kartu Kredit (Mock)
                </button>
              </div>

              {selectedPaymentMethod === "bank_transfer" ? (
                /* BANK TRANSFER VA SIMULATION */
                <div className="space-y-4 animate-fade-in">
                  <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg flex items-start gap-2 text-[10px] text-amber-800 leading-relaxed font-light">
                    <AlertTriangle className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
                    <p>Lakukan pembayaran DP ke Virtual Account Bank Mandiri / BCA berikut untuk melanjutkan simulasi.</p>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                    <div>
                      <p className="text-[9px] uppercase tracking-wider text-slate-400">Nama Bank</p>
                      <p className="text-xs font-bold text-slate-800">BANK MANDIRI VIRTUAL ACCOUNT</p>
                    </div>
                    
                    <div className="h-px bg-slate-200 w-full"></div>
                    
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-[9px] uppercase tracking-wider text-slate-400">Nomor Virtual Account</p>
                        <p className="text-base font-bold font-mono text-slate-800 tracking-wider">8806 0812 9876 5432</p>
                      </div>
                      <button
                        onClick={copyVaNumber}
                        className="p-2 border border-slate-300 rounded hover:bg-slate-100 text-slate-600 transition-all flex items-center gap-1 text-[10px] cursor-pointer"
                      >
                        {copiedCode ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
                        {copiedCode ? "Tersalin" : "Salin"}
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                /* CREDIT CARD SIMULATION */
                <div className="space-y-4 animate-fade-in text-xs">
                  <div className="space-y-3">
                    <div>
                      <label className="text-[9px] uppercase text-slate-400 block mb-1">Nomor Kartu</label>
                      <input
                        type="text"
                        disabled
                        value="4111 2222 3333 4444"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono text-slate-700 focus:outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[9px] uppercase text-slate-400 block mb-1">Valid Thru</label>
                        <input
                          type="text"
                          disabled
                          value="12 / 29"
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono text-slate-700 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[9px] uppercase text-slate-400 block mb-1">CVV</label>
                        <input
                          type="password"
                          disabled
                          value="123"
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg font-mono text-slate-700 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Actions simulator */}
              <div className="space-y-2 pt-2 border-t border-slate-200">
                <button
                  onClick={() => handleSimulatePayment(true)}
                  className="w-full py-3.5 bg-emerald-600 text-white rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-emerald-700 transition-all cursor-pointer shadow"
                >
                  Simulasikan Bayar Sukses
                </button>
                <button
                  onClick={() => handleSimulatePayment(false)}
                  className="w-full py-3 text-slate-500 hover:text-slate-800 rounded-lg text-xs font-semibold cursor-pointer"
                >
                  Batalkan / Simulasikan Gagal
                </button>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="bg-slate-50 p-4 border-t border-slate-100 text-center text-[10px] text-slate-400">
              🔒 Koneksi terenkripsi. Hak Cipta Midtrans © 2026.
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
