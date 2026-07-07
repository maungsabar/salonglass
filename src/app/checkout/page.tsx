"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CreditCard, Truck, ShieldCheck, HelpCircle, ArrowLeft, CheckCircle2, AlertTriangle, Copy, Check } from "lucide-react";
import { useApp, ShippingAddress } from "@/context/AppContext";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, createOrder, updateOrderStatus } = useApp();

  // --- Shipping address state ---
  const [address, setAddress] = useState<ShippingAddress>({
    salonName: "",
    ownerName: "",
    phone: "",
    address: "",
    city: "dalam_kota"
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [createdOrder, setCreatedOrder] = useState<any>(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("bank_transfer");

  // --- Calculation helpers ---
  const totalProductPrice = cart.reduce((total, item) => {
    const itemPrice = item.isCustom ? (item.customPrice || 0) : item.product.price;
    return total + itemPrice * item.quantity;
  }, 0);

  const deliveryFee = address.city === "dalam_kota" ? 100000 : 250000;
  const totalAmount = totalProductPrice + deliveryFee;
  const dpAmount = Math.round(totalAmount * 0.5);
  const remainingBalance = totalAmount - dpAmount;

  // --- Handlers ---
  const handleAddressChange = (key: keyof ShippingAddress, value: any) => {
    setAddress((prev) => ({ ...prev, [key]: value }));
    if (formErrors[key]) {
      setFormErrors((prev) => {
        const copy = { ...prev };
        delete copy[key];
        return copy;
      });
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};
    if (!address.salonName.trim()) errors.salonName = "Nama salon wajib diisi.";
    if (!address.ownerName.trim()) errors.ownerName = "Nama penerima wajib diisi.";
    if (!address.phone.trim()) errors.phone = "Nomor Whatsapp wajib diisi.";
    if (!address.address.trim()) errors.address = "Alamat salon lengkap wajib diisi.";
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleOpenPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsModalOpen(true);
  };

  // Simulate payment processing
  const handleSimulatePayment = (success: boolean) => {
    if (success) {
      // 1. Create order in context (which handles local storage and cart clearing)
      const newOrder = createOrder("ready_stock", address);
      
      // 2. Set status to paid
      updateOrderStatus(newOrder.id, "dp_paid", "processing");
      
      setCreatedOrder(newOrder);
      setIsModalOpen(false);
      setIsSuccess(true);
    } else {
      alert("Simulasi Pembayaran Gagal / Dibatalkan. Silakan pilih metode pembayaran lain atau coba lagi.");
      setIsModalOpen(false);
    }
  };

  const copyVaNumber = () => {
    navigator.clipboard.writeText("8806081298765432");
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  if (cart.length === 0 && !isSuccess) {
    return (
      <div className="bg-salon-cream min-h-screen py-24 flex items-center justify-center">
        <div className="glass-panel p-12 rounded-3xl text-center space-y-6 max-w-md mx-auto">
          <HelpCircle className="h-12 w-16 text-gold-500 mx-auto" />
          <h2 className="font-serif text-2xl font-bold text-salon-dark">Tidak Ada Transaksi</h2>
          <p className="text-xs text-salon-dark/65 font-light">
            Sesi checkout kosong karena tidak ada barang di keranjang belanja Anda.
          </p>
          <Link
            href="/catalog"
            className="inline-block px-6 py-2.5 rounded-full bg-gold-500 text-salon-cream text-xs font-semibold uppercase tracking-wider hover:bg-gold-600 transition-all"
          >
            Mulai Belanja
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-salon-cream min-h-screen py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="mb-10 flex items-center gap-4">
          <button 
            onClick={() => router.push("/cart")} 
            className="p-2 rounded-full border border-gold-500/20 bg-salon-cream/50 text-salon-dark hover:bg-gold-500/10 cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div>
            <h1 className="font-serif text-3xl font-bold text-salon-dark">Checkout Pembayaran DP</h1>
            <p className="text-xs text-salon-dark/50 font-light mt-0.5">Isi alamat pengiriman salon untuk mengkalkulasi pengantaran.</p>
          </div>
        </div>

        {isSuccess ? (
          /* --- SUCCESS SCREEN --- */
          <div className="max-w-xl mx-auto glass-panel p-8 sm:p-12 rounded-3xl text-center space-y-6 animate-fade-in my-8">
            <CheckCircle2 className="h-16 w-16 text-emerald-600 mx-auto animate-bounce" />
            <div className="space-y-2">
              <h2 className="font-serif text-2xl font-bold text-salon-dark">Pembayaran DP 50% Berhasil!</h2>
              <p className="text-xs text-salon-dark/65 font-light">
                Kode Pesanan: <span className="font-mono font-bold text-gold-600">{createdOrder?.id}</span>
              </p>
            </div>
            
            <div className="bg-salon-cream/50 p-5 rounded-xl text-left text-xs space-y-3.5 border border-gold-500/10 leading-relaxed font-light">
              <div className="flex justify-between border-b border-gold-500/5 pb-2">
                <span className="text-salon-dark/50">Total Invoice (Termasuk Ongkir):</span>
                <span className="font-semibold text-salon-dark font-mono">IDR {createdOrder?.totalAmount.toLocaleString("id-ID")}</span>
              </div>
              <div className="flex justify-between border-b border-gold-500/5 pb-2 text-emerald-700 font-semibold">
                <span>DP 50% Terbayar (Midtrans):</span>
                <span className="font-mono">IDR {createdOrder?.dpAmount.toLocaleString("id-ID")}</span>
              </div>
              <div className="flex justify-between text-gold-700 font-semibold">
                <span>Sisa COD di Lokasi (Saat Perakitan):</span>
                <span className="font-mono">IDR {createdOrder?.remainingBalance.toLocaleString("id-ID")}</span>
              </div>
            </div>

            <p className="text-[11px] text-salon-dark/50 font-light max-w-sm mx-auto">
              Invoice dan tanda terima pembayaran DP telah dikirim ke nomor WhatsApp Anda. Kurir toko akan menghubungi untuk mencocokkan jadwal pengiriman.
            </p>

            <div className="pt-2">
              <button
                onClick={() => router.push("/dashboard")}
                className="w-full py-4 rounded-full bg-gold-500 text-salon-cream font-semibold uppercase tracking-wider text-xs hover:bg-gold-600 transition-all shadow-md cursor-pointer"
              >
                Ke Dashboard Pembeli
              </button>
            </div>
          </div>
        ) : (
          /* --- CHECKOUT INTERFACE --- */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Column: Form Address */}
            <div className="lg:col-span-7">
              <form onSubmit={handleOpenPayment} className="glass-panel p-6 sm:p-8 rounded-2xl border border-gold-500/10 space-y-6">
                <h3 className="font-serif text-xl font-bold text-salon-dark flex items-center gap-2">
                  <Truck className="h-5 w-5 text-gold-500" /> Informasi Pengiriman Salon
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Salon Name */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold text-salon-dark/70 uppercase tracking-wider">Nama Salon / Studio Kecantikan</label>
                    <input
                      type="text"
                      placeholder="Contoh: Lavish Lash Studio"
                      value={address.salonName}
                      onChange={(e) => handleAddressChange("salonName", e.target.value)}
                      className={`w-full px-3.5 py-2.5 bg-salon-cream border rounded-lg text-xs focus:outline-none focus:border-gold-500 ${
                        formErrors.salonName ? "border-red-500" : "border-gold-500/15"
                      }`}
                    />
                    {formErrors.salonName && <span className="text-[9px] text-red-500 block font-light">{formErrors.salonName}</span>}
                  </div>

                  {/* Owner Name */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold text-salon-dark/70 uppercase tracking-wider">Nama Penerima / Pemilik</label>
                    <input
                      type="text"
                      placeholder="Contoh: Siska Amelia"
                      value={address.ownerName}
                      onChange={(e) => handleAddressChange("ownerName", e.target.value)}
                      className={`w-full px-3.5 py-2.5 bg-salon-cream border rounded-lg text-xs focus:outline-none focus:border-gold-500 ${
                        formErrors.ownerName ? "border-red-500" : "border-gold-500/15"
                      }`}
                    />
                    {formErrors.ownerName && <span className="text-[9px] text-red-500 block font-light">{formErrors.ownerName}</span>}
                  </div>
                </div>

                {/* Phone WhatsApp */}
                <div className="space-y-1">
                  <label className="text-[10px] font-semibold text-salon-dark/70 uppercase tracking-wider">Nomor Whatsapp (Untuk Koordinasi Kurir)</label>
                  <input
                    type="tel"
                    placeholder="Contoh: 08129876XXXX"
                    value={address.phone}
                    onChange={(e) => handleAddressChange("phone", e.target.value)}
                    className={`w-full px-3.5 py-2.5 bg-salon-cream border rounded-lg text-xs focus:outline-none focus:border-gold-500 ${
                      formErrors.phone ? "border-red-500" : "border-gold-500/15"
                    }`}
                  />
                  {formErrors.phone && <span className="text-[9px] text-red-500 block font-light">{formErrors.phone}</span>}
                </div>

                {/* Full Address */}
                <div className="space-y-1">
                  <label className="text-[10px] font-semibold text-salon-dark/70 uppercase tracking-wider">Alamat Lengkap Pemasangan</label>
                  <textarea
                    placeholder="Tuliskan nama jalan, nomor toko/ruko, rt/rw, kelurahan, kecamatan, dan kota..."
                    value={address.address}
                    onChange={(e) => handleAddressChange("address", e.target.value)}
                    rows={3}
                    className={`w-full px-3.5 py-2.5 bg-salon-cream border rounded-lg text-xs focus:outline-none focus:border-gold-500 ${
                      formErrors.address ? "border-red-500" : "border-gold-500/15"
                    }`}
                  />
                  {formErrors.address && <span className="text-[9px] text-red-500 block font-light">{formErrors.address}</span>}
                </div>

                {/* Zoning selector */}
                <div className="space-y-2">
                  <label className="text-[10px] font-semibold text-salon-dark/70 uppercase tracking-wider block">Wilayah Pengiriman (Logistik Toko + Perakitan)</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <label className={`flex flex-col p-4 rounded-xl border cursor-pointer transition-all ${
                      address.city === "dalam_kota" 
                        ? "bg-gold-500/5 border-gold-500" 
                        : "border-gold-500/15 bg-salon-cream/50"
                    }`}>
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="city"
                          value="dalam_kota"
                          checked={address.city === "dalam_kota"}
                          onChange={() => handleAddressChange("city", "dalam_kota")}
                          className="accent-gold-500"
                        />
                        <span className="text-xs font-semibold text-salon-dark">Dalam Kota</span>
                      </div>
                      <span className="text-[10px] text-salon-dark/50 font-light mt-1 pl-5">Jabodetabek (+IDR 100.000)</span>
                    </label>

                    <label className={`flex flex-col p-4 rounded-xl border cursor-pointer transition-all ${
                      address.city === "luar_kota" 
                        ? "bg-gold-500/5 border-gold-500" 
                        : "border-gold-500/15 bg-salon-cream/50"
                    }`}>
                      <div className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="city"
                          value="luar_kota"
                          checked={address.city === "luar_kota"}
                          onChange={() => handleAddressChange("city", "luar_kota")}
                          className="accent-gold-500"
                        />
                        <span className="text-xs font-semibold text-salon-dark">Luar Kota</span>
                      </div>
                      <span className="text-[10px] text-salon-dark/50 font-light mt-1 pl-5">Jawa & DIY (+IDR 250.000)</span>
                    </label>
                  </div>
                </div>

                {/* Form submit shortcut */}
                <button type="submit" className="hidden" id="submit-form-btn" />
              </form>
            </div>

            {/* Right Column: Checkout Breakdown */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Order Items Summary */}
              <div className="glass-panel p-6 rounded-2xl border border-gold-500/10 space-y-4">
                <h3 className="font-serif text-lg font-bold text-salon-dark">Daftar Cabinet</h3>
                
                <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                  {cart.map((item) => {
                    const price = item.isCustom ? (item.customPrice || 0) : item.product.price;
                    return (
                      <div key={item.id} className="flex justify-between items-center text-xs gap-3">
                        <div className="min-w-0">
                          <p className="font-semibold text-salon-dark truncate">{item.product.name}</p>
                          <p className="text-[10px] text-salon-dark/50 font-light">{item.quantity} Unit x IDR {price.toLocaleString("id-ID")}</p>
                        </div>
                        <span className="font-mono text-salon-dark flex-shrink-0">
                          IDR {(price * item.quantity).toLocaleString("id-ID")}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Order total & DP split summary */}
              <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-gold-500/10 space-y-6">
                <h3 className="font-serif text-lg font-bold text-salon-dark">Tagihan Pembayaran</h3>
                
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between items-center py-1">
                    <span className="text-salon-dark/60">Total Harga Cabinet</span>
                    <span className="font-semibold text-salon-dark font-mono">
                      IDR {totalProductPrice.toLocaleString("id-ID")}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center py-1 border-b border-gold-500/10 pb-3">
                    <span className="text-salon-dark/60">Biaya Kirim ({address.city === "dalam_kota" ? "Dalam Kota" : "Luar Kota"})</span>
                    <span className="font-semibold text-salon-dark font-mono">
                      IDR {deliveryFee.toLocaleString("id-ID")}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-1 font-semibold text-salon-dark">
                    <span>Total Tagihan Keseluruhan</span>
                    <span className="font-mono text-base text-salon-dark">
                      IDR {totalAmount.toLocaleString("id-ID")}
                    </span>
                  </div>

                  <div className="h-px bg-gold-500/10 w-full my-2"></div>

                  {/* Payment gateway transaction display */}
                  <div className="bg-gold-500/5 p-4 rounded-xl space-y-2 border border-gold-500/10">
                    <div className="flex justify-between items-center text-emerald-700 font-bold">
                      <span>DP 50% (Bayar Sekarang)</span>
                      <span className="font-mono text-base">
                        IDR {dpAmount.toLocaleString("id-ID")}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-salon-dark/60 font-medium">
                      <span>Pelunasan 50% (Bayar COD di Tempat)</span>
                      <span className="font-mono text-xs">
                        IDR {remainingBalance.toLocaleString("id-ID")}
                      </span>
                    </div>
                  </div>

                  {/* Note security */}
                  <div className="flex items-center gap-2 text-[10px] text-salon-dark/50 font-light leading-relaxed">
                    <ShieldCheck className="h-4.5 w-4.5 text-gold-500 flex-shrink-0" />
                    <span>Lembaga gerbang pembayaran Midtrans/Xendit mengamankan transaksi DP Anda. Sisa tagihan ditagih langsung oleh kurir.</span>
                  </div>

                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      const btn = document.getElementById("submit-form-btn");
                      if (btn) btn.click();
                    }}
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-full bg-gold-500 text-salon-cream font-semibold uppercase tracking-wider text-xs hover:bg-gold-600 hover:shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
                  >
                    <CreditCard className="h-4.5 w-4.5" />
                    Bayar DP 50% (IDR {dpAmount.toLocaleString("id-ID")})
                  </button>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* --- PAYMENT MODAL GATEWAY SIMULATOR --- */}
        {isModalOpen && (
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
                  <p className="text-sm font-bold font-mono text-cyan-400">IDR {dpAmount.toLocaleString("id-ID")}</p>
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
    </div>
  );
}
