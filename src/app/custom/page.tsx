"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Sliders, Sparkles, AlertCircle, ShoppingBag, Send, Info, Eye, CheckCircle2, Lock } from "lucide-react";
import { useApp, CustomSpecs, ShippingAddress } from "@/context/AppContext";

export default function CustomConfiguratorPage() {
  const router = useRouter();
  const { calculateCustomCabinetPrice, createOrder } = useApp();

  // --- Specifications State ---
  const [specs, setSpecs] = useState<CustomSpecs>({
    width: 120,
    height: 190,
    depth: 45,
    glassThickness: "8mm",
    ledOption: "warm_led",
    lockOption: true,
    notes: ""
  });

  // --- Contact / Shipping State ---
  const [address, setAddress] = useState<ShippingAddress>({
    salonName: "",
    ownerName: "",
    phone: "",
    address: "",
    city: "dalam_kota"
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedOrderId, setSubmittedOrderId] = useState("");

  // --- Realtime Calculations ---
  const priceBreakdown = useMemo(() => {
    return calculateCustomCabinetPrice(specs);
  }, [specs, calculateCustomCabinetPrice]);

  const deliveryFee = address.city === "dalam_kota" ? 100000 : 250000;
  const totalAmount = priceBreakdown.totalPrice + deliveryFee;
  const dpAmount = Math.round(totalAmount * 0.5);
  const remainingBalance = totalAmount - dpAmount;

  // --- Handlers ---
  const handleSpecChange = (key: keyof CustomSpecs, value: any) => {
    setSpecs((prev) => ({ ...prev, [key]: value }));
  };

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
    if (!address.ownerName.trim()) errors.ownerName = "Nama pemilik wajib diisi.";
    if (!address.phone.trim()) errors.phone = "Nomor Whatsapp aktif wajib diisi.";
    if (!address.address.trim()) errors.address = "Alamat pengiriman lengkap wajib diisi.";
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      // Scroll to form if invalid
      const formEl = document.getElementById("submission-form");
      if (formEl) formEl.scrollIntoView({ behavior: "smooth" });
      return;
    }

    setIsSubmitting(true);

    // Simulate submission API delay
    setTimeout(() => {
      // Create a dummy custom product
      const dummyProduct = {
        id: "custom-cabinet-product",
        name: `Custom Glass Cabinet (${specs.width}x${specs.depth}x${specs.height})`,
        description: `Custom-made glass cabinet cabinet. Specs: Glass Thickness ${specs.glassThickness}, LED Option ${specs.ledOption}, Security Lock ${specs.lockOption ? "Yes" : "No"}. Notes: ${specs.notes}`,
        price: priceBreakdown.totalPrice,
        stock: 1,
        dimensions: `${specs.width} x ${specs.depth} x ${specs.height} cm`,
        width: specs.width,
        height: specs.height,
        depth: specs.depth,
        glassThickness: specs.glassThickness,
        ledOption: specs.ledOption,
        lockOption: specs.lockOption,
        images: ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop"]
      };

      const customCartItem = {
        id: `custom-${Date.now()}`,
        product: dummyProduct,
        quantity: 1,
        isCustom: true,
        customSpecs: specs,
        customPrice: priceBreakdown.totalPrice
      };

      // Create Custom-made order.
      // Status starts as UNPAID (Awaiting admin review first according to PRD).
      const order = createOrder("custom_made", address, customCartItem);
      
      setSubmittedOrderId(order.id);
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  // LED Glow classes for visual simulator
  const getLedGlowClass = () => {
    if (specs.ledOption === "warm_led") return "shadow-[0_0_25px_rgba(212,175,55,0.7)] border-yellow-200/50 bg-yellow-500/5";
    if (specs.ledOption === "white_led") return "shadow-[0_0_25px_rgba(255,255,255,0.8)] border-neutral-100/60 bg-blue-100/5";
    if (specs.ledOption === "rgb_led") return "shadow-[0_0_25px_rgba(236,72,153,0.7)] border-pink-300/40 bg-pink-500/5 animate-pulse";
    return "border-gold-500/20";
  };

  return (
    <div className="bg-salon-cream min-h-screen py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-salon-dark">Rancang Lemari Kaca Impian</h1>
          <div className="h-1 w-20 bg-gold-500 mx-auto"></div>
          <p className="text-xs sm:text-sm text-salon-dark/65 font-light leading-relaxed">
            Sesuaikan ukuran lemari secara presisi hingga sentimeter agar pas di sudut salon kecantikan Anda. Geser slider, pilih lampu, cermin, dan ajukan desain dengan estimasi harga transparan.
          </p>
        </div>

        {isSuccess ? (
          /* --- SUCCESS SCREEN --- */
          <div className="max-w-xl mx-auto glass-panel p-8 sm:p-12 rounded-3xl text-center space-y-6 animate-fade-in my-8">
            <CheckCircle2 className="h-16 w-16 text-emerald-600 mx-auto animate-bounce" />
            <div className="space-y-2">
              <h2 className="font-serif text-2xl font-bold text-salon-dark">Pengajuan Desain Terkirim!</h2>
              <p className="text-xs text-salon-dark/65 font-light">
                Kode Pesanan: <span className="font-mono font-bold text-gold-600">{submittedOrderId}</span>
              </p>
            </div>
            
            <div className="bg-salon-cream/50 p-4 rounded-xl text-left text-xs space-y-3 border border-gold-500/10 leading-relaxed font-light">
              <p className="font-semibold text-salon-dark text-center pb-2 border-b border-gold-500/5">Alur Selanjutnya:</p>
              <p>1. 🕵️‍♂️ <strong>Review Kelayakan</strong>: Admin kami akan memvalidasi apakah dimensi kaca aman untuk diproduksi (menghindari resiko kaca pecah/tidak stabil).</p>
              <p>2. 💳 <strong>Pembayaran DP 50%</strong>: Setelah disetujui, tombol bayar DP akan aktif di Dashboard Anda. Anda akan menerima email notifikasi.</p>
              <p>3. 🛠 <strong>Produksi & Pengiriman</strong>: Pengerjaan memakan waktu 7-10 hari kerja diikuti pengantaran kurir & instalasi gratis.</p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => router.push("/dashboard")}
                className="flex-1 py-3.5 rounded-full bg-gold-500 text-salon-cream font-semibold uppercase tracking-wider text-xs hover:bg-gold-600 transition-all shadow-md cursor-pointer"
              >
                Ke Dashboard Pembeli
              </button>
              <button
                onClick={() => {
                  setIsSuccess(false);
                  setAddress({
                    salonName: "",
                    ownerName: "",
                    phone: "",
                    address: "",
                    city: "dalam_kota"
                  });
                  setSpecs({
                    width: 120,
                    height: 190,
                    depth: 45,
                    glassThickness: "8mm",
                    ledOption: "warm_led",
                    lockOption: true,
                    notes: ""
                  });
                }}
                className="flex-1 py-3.5 rounded-full border border-gold-500/40 text-gold-700 font-semibold uppercase tracking-wider text-xs hover:bg-gold-500/5 transition-all cursor-pointer"
              >
                Rancang Desain Baru
              </button>
            </div>
          </div>
        ) : (
          /* --- CONFIGURATOR INTERFACE --- */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Column: Simulator Preview & Pricing Details */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Interactive Visual Simulator Box */}
              <div className="glass-panel p-6 rounded-2xl border border-gold-500/10 shadow-lg flex flex-col items-center">
                <span className="text-[10px] font-semibold text-salon-dark/50 uppercase tracking-widest mb-4 flex items-center gap-1">
                  <Eye className="h-3.5 w-3.5" /> Preview Desain 3D-Like
                </span>
                
                {/* 3D Wireframe Container */}
                <div className="relative w-full aspect-square bg-salon-dark/5 rounded-xl border border-gold-500/5 flex items-center justify-center p-8 overflow-hidden">
                  
                  {/* Glowing Cabinet Structure */}
                  <div 
                    className={`relative border-2 rounded-lg transition-all duration-300 flex flex-col justify-between p-4 ${getLedGlowClass()}`}
                    style={{
                      width: `${Math.min(95, Math.max(35, (specs.width / 250) * 100))}%`,
                      height: `${Math.min(95, Math.max(50, (specs.height / 240) * 100))}%`,
                      "--cabinet-depth": `${specs.depth}px`,
                    } as React.CSSProperties}
                  >
                    {/* Shelves inside based on height */}
                    <div className="h-full w-full flex flex-col justify-around py-4">
                      <div className="h-0.5 w-full bg-gold-500/25 border-b border-white/20"></div>
                      <div className="h-0.5 w-full bg-gold-500/25 border-b border-white/20"></div>
                      {specs.height > 170 && <div className="h-0.5 w-full bg-gold-500/25 border-b border-white/20"></div>}
                      {specs.height > 210 && <div className="h-0.5 w-full bg-gold-500/25 border-b border-white/20"></div>}
                    </div>

                    {/* Led Option Badge */}
                    {specs.ledOption !== "none" && (
                      <span className="absolute top-2 left-2 flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
                      </span>
                    )}

                    {/* Lock Badge visual */}
                    {specs.lockOption && (
                      <span className="absolute bottom-2 right-2 bg-gold-500/20 text-gold-500 text-[8px] font-bold p-1 rounded-full uppercase border border-gold-500/10">
                        <Lock className="h-2 w-2 inline" /> Lock
                      </span>
                    )}

                    {/* Display Realtime dimensions tags */}
                    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-[9px] font-bold text-gold-600 bg-salon-cream px-1.5 py-0.5 rounded border border-gold-500/20">
                      W: {specs.width}cm
                    </div>
                    <div className="absolute -left-6 top-1/2 transform -translate-y-1/2 text-[9px] font-bold text-gold-600 bg-salon-cream px-1.5 py-0.5 rounded border border-gold-500/20 rotate-270">
                      H: {specs.height}cm
                    </div>
                  </div>

                  {/* Aesthetic Glowing Background circle */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gold-500/5 via-transparent to-transparent -z-10"></div>
                </div>

                <div className="w-full text-center mt-3 text-[10px] text-salon-dark/45 font-light italic">
                  *Preview visual hanya ilustrasi proporsi. Bentuk asli berupa kabinet kayu solid premium & kaca tempered jernih.
                </div>
              </div>

              {/* pricing breakdown cards */}
              <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-gold-500/10 space-y-4">
                <h3 className="font-serif text-lg font-bold text-salon-dark flex items-center gap-1.5">
                  <Info className="h-4.5 w-4.5 text-gold-500" /> Rincian Kalkulasi Harga
                </h3>
                
                <div className="space-y-2.5 text-xs">
                  <div className="flex justify-between items-center py-1.5 border-b border-gold-500/5">
                    <span className="text-salon-dark/60">Harga Dasar (Standard 100x40x180 cm)</span>
                    <span className="font-semibold text-salon-dark font-mono">IDR 1.500.000</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-1.5 border-b border-gold-500/5">
                    <div className="space-y-0.5">
                      <p className="text-salon-dark/60">Kenaikan Volume Kabinet</p>
                      <p className="text-[9px] text-salon-dark/40 font-mono">
                        Vol: {priceBreakdown.volumeM3.toFixed(3)}m³ (Std: 0.720m³, Tambahan: +{priceBreakdown.additionalVolumeM3.toFixed(3)}m³)
                      </p>
                    </div>
                    <span className="font-semibold text-salon-dark font-mono">
                      +IDR {priceBreakdown.volumeCharge.toLocaleString("id-ID")}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-1.5 border-b border-gold-500/5">
                    <span className="text-salon-dark/60">Tebal Kaca ({specs.glassThickness})</span>
                    <span className="font-semibold text-salon-dark font-mono">
                      +IDR {priceBreakdown.thicknessCharge.toLocaleString("id-ID")}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-1.5 border-b border-gold-500/5">
                    <span className="text-salon-dark/60">Sistem Pencahayaan LED ({specs.ledOption === "none" ? "Tanpa LED" : specs.ledOption === "white_led" ? "Cool White" : specs.ledOption === "warm_led" ? "Warm White" : "RGB Neon"})</span>
                    <span className="font-semibold text-salon-dark font-mono">
                      +IDR {priceBreakdown.ledCharge.toLocaleString("id-ID")}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-1.5 border-b border-gold-500/5">
                    <span className="text-salon-dark/60">Kunci Pengaman ({specs.lockOption ? "Ada" : "Tidak"})</span>
                    <span className="font-semibold text-salon-dark font-mono">
                      +IDR {priceBreakdown.lockCharge.toLocaleString("id-ID")}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-2 font-semibold text-gold-700 bg-gold-500/5 px-2 rounded-lg border border-gold-500/10">
                    <span className="font-serif">Harga Kabinet Custom</span>
                    <span className="font-mono">IDR {priceBreakdown.totalPrice.toLocaleString("id-ID")}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Custom Sliders Inputs & Submission Contact Form */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* Specifications Controls Card */}
              <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-gold-500/10 space-y-6">
                <h3 className="font-serif text-xl font-bold text-salon-dark flex items-center gap-2">
                  <Sliders className="h-5 w-5 text-gold-500" /> Tentukan Spesifikasi
                </h3>

                {/* SLIDER WIDTH */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-salon-dark/70">Lebar Kabinet (Width)</span>
                    <span className="text-gold-600 font-bold">{specs.width} cm</span>
                  </div>
                  <input
                    type="range"
                    min="60"
                    max="250"
                    step="5"
                    value={specs.width}
                    onChange={(e) => handleSpecChange("width", Number(e.target.value))}
                    className="w-full accent-gold-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[9px] text-salon-dark/45 font-mono">
                    <span>Min: 60 cm</span>
                    <span>Std: 100 cm</span>
                    <span>Max: 250 cm</span>
                  </div>
                </div>

                {/* SLIDER HEIGHT */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-salon-dark/70">Tinggi Kabinet (Height)</span>
                    <span className="text-gold-600 font-bold">{specs.height} cm</span>
                  </div>
                  <input
                    type="range"
                    min="120"
                    max="240"
                    step="5"
                    value={specs.height}
                    onChange={(e) => handleSpecChange("height", Number(e.target.value))}
                    className="w-full accent-gold-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[9px] text-salon-dark/45 font-mono">
                    <span>Min: 120 cm</span>
                    <span>Std: 180 cm</span>
                    <span>Max: 240 cm</span>
                  </div>
                </div>

                {/* SLIDER DEPTH */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-salon-dark/70">Kedalaman Kabinet (Depth)</span>
                    <span className="text-gold-600 font-bold">{specs.depth} cm</span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="80"
                    step="5"
                    value={specs.depth}
                    onChange={(e) => handleSpecChange("depth", Number(e.target.value))}
                    className="w-full accent-gold-500 cursor-pointer"
                  />
                  <div className="flex justify-between text-[9px] text-salon-dark/45 font-mono">
                    <span>Min: 30 cm</span>
                    <span>Std: 40 cm</span>
                    <span>Max: 80 cm</span>
                  </div>
                </div>

                {/* Custom Options Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                  
                  {/* Glass Thickness (Radio Buttons) */}
                  <div className="space-y-1.5 col-span-1">
                    <label className="text-xs font-semibold text-salon-dark/70 uppercase tracking-wider block">Ketebalan Kaca</label>
                    <div className="flex flex-col gap-2">
                      {[
                        { val: "5mm", label: "5 mm Tempered (Standard, +IDR 0)" },
                        { val: "8mm", label: "8 mm Tempered (+IDR 150.000)" },
                        { val: "10mm", label: "10 mm Tempered (+IDR 300.000)" }
                      ].map((item) => (
                        <label key={item.val} className={`flex items-center gap-2.5 px-3.5 py-3 rounded-xl border text-xs cursor-pointer transition-all ${
                          specs.glassThickness === item.val ? "bg-gold-500/5 border-gold-500 text-gold-700 font-medium" : "border-gold-500/15 hover:bg-gold-500/5 bg-salon-cream"
                        }`}>
                          <input
                            type="radio"
                            name="glassThickness"
                            value={item.val}
                            checked={specs.glassThickness === item.val}
                            onChange={() => handleSpecChange("glassThickness", item.val as any)}
                            className="accent-gold-500"
                          />
                          <span>{item.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Empty cell for block alignment balance on desktop */}
                  <div className="hidden sm:block"></div>

                  {/* LED lights interactive cards */}
                  <div className="space-y-1.5 sm:col-span-2">
                    <label className="text-xs font-semibold text-salon-dark/70 uppercase tracking-wider block">Pencahayaan Lampu LED</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {[
                        { val: "none", label: "Tanpa LED", sub: "+IDR 0" },
                        { val: "white_led", label: "Cool White", sub: "+IDR 250k" },
                        { val: "warm_led", label: "Warm White", sub: "+IDR 250k" },
                        { val: "rgb_led", label: "RGB Neon", sub: "+IDR 400k" }
                      ].map((item) => (
                        <button
                          key={item.val}
                          type="button"
                          onClick={() => handleSpecChange("ledOption", item.val as any)}
                          className={`flex flex-col items-center justify-center p-3.5 rounded-xl border text-center transition-all cursor-pointer ${
                            specs.ledOption === item.val
                              ? "bg-gold-500/10 border-gold-500 text-gold-700 font-semibold shadow-sm shadow-gold-500/5"
                              : "border-gold-500/15 bg-salon-cream hover:bg-gold-500/5 text-salon-dark/75"
                          }`}
                        >
                          <span className="text-xs font-semibold">{item.label}</span>
                          <span className="text-[10px] text-gold-600 font-mono mt-1">{item.sub}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Toggles Lock Option */}
                <div className="flex items-center justify-between p-4 bg-salon-cream/50 rounded-xl border border-gold-500/15">
                  <div className="text-xs space-y-0.5">
                    <p className="font-semibold text-salon-dark">Kunci Pengaman Tambahan</p>
                    <p className="text-salon-dark/50 font-light">Kunci pintu kabinet ganda untuk keamanan display skincare mahal.</p>
                  </div>
                  <button
                    onClick={() => handleSpecChange("lockOption", !specs.lockOption)}
                    className={`px-4 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider border transition-all cursor-pointer ${
                      specs.lockOption
                        ? "bg-gold-500 border-gold-500 text-salon-cream font-bold"
                        : "border-gold-500/20 text-salon-dark/65 hover:bg-gold-500/5"
                    }`}
                  >
                    {specs.lockOption ? "Termasuk (+IDR 100k)" : "Tanpa Kunci"}
                  </button>
                </div>

                {/* Additional notes */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-salon-dark/70 uppercase tracking-wider block">Catatan Khusus Desain (Opsional)</label>
                  <textarea
                    placeholder="Contoh: Tolong bingkainya diwarnai rose gold mengkilap, cermin dinding belakang dibuat cermin warna perunggu..."
                    value={specs.notes}
                    onChange={(e) => handleSpecChange("notes", e.target.value)}
                    rows={2}
                    className="w-full px-3.5 py-3 bg-salon-cream border border-gold-500/15 rounded-xl text-xs focus:outline-none focus:border-gold-500"
                  />
                </div>
              </div>

              {/* Submission Form Card */}
              <div id="submission-form" className="glass-panel p-6 sm:p-8 rounded-2xl border border-gold-500/10 space-y-6">
                <div className="space-y-1">
                  <h3 className="font-serif text-xl font-bold text-salon-dark flex items-center gap-2">
                    <Send className="h-5 w-5 text-gold-500" /> Kontak & Alamat Pengiriman
                  </h3>
                  <p className="text-[10px] text-salon-dark/50 font-light">
                    Isi formulir lengkap untuk pengajuan custom. Alamat ini akan digunakan untuk menentukan zonasi biaya kirim.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Salon Name */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-semibold text-salon-dark/70 uppercase tracking-wider">Nama Salon / Studio</label>
                      <input
                        type="text"
                        placeholder="Contoh: Glow Beauty Bar"
                        value={address.salonName}
                        onChange={(e) => handleAddressChange("salonName", e.target.value)}
                        className={`w-full px-3 py-2.5 bg-salon-cream border rounded-lg text-xs focus:outline-none focus:border-gold-500 ${
                          formErrors.salonName ? "border-red-500" : "border-gold-500/15"
                        }`}
                      />
                      {formErrors.salonName && <span className="text-[9px] text-red-500 block font-light">{formErrors.salonName}</span>}
                    </div>

                    {/* Owner Name */}
                    <div className="space-y-1">
                      <label className="text-[10px] font-semibold text-salon-dark/70 uppercase tracking-wider">Nama Pemesan / Owner</label>
                      <input
                        type="text"
                        placeholder="Contoh: Siska Amelia"
                        value={address.ownerName}
                        onChange={(e) => handleAddressChange("ownerName", e.target.value)}
                        className={`w-full px-3 py-2.5 bg-salon-cream border rounded-lg text-xs focus:outline-none focus:border-gold-500 ${
                          formErrors.ownerName ? "border-red-500" : "border-gold-500/15"
                        }`}
                      />
                      {formErrors.ownerName && <span className="text-[9px] text-red-500 block font-light">{formErrors.ownerName}</span>}
                    </div>
                  </div>

                  {/* Phone Whatsapp */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold text-salon-dark/70 uppercase tracking-wider">Nomor Whatsapp (Aktif)</label>
                    <input
                      type="tel"
                      placeholder="Contoh: 0812XXXXXXXX"
                      value={address.phone}
                      onChange={(e) => handleAddressChange("phone", e.target.value)}
                      className={`w-full px-3 py-2.5 bg-salon-cream border rounded-lg text-xs focus:outline-none focus:border-gold-500 ${
                        formErrors.phone ? "border-red-500" : "border-gold-500/15"
                      }`}
                    />
                    {formErrors.phone && <span className="text-[9px] text-red-500 block font-light">{formErrors.phone}</span>}
                  </div>

                  {/* Address */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-semibold text-salon-dark/70 uppercase tracking-wider">Alamat Lengkap Salon</label>
                    <textarea
                      placeholder="Masukkan nama jalan, nomor ruko, kecamatan, kota dan provinsi..."
                      value={address.address}
                      onChange={(e) => handleAddressChange("address", e.target.value)}
                      rows={2}
                      className={`w-full px-3 py-2.5 bg-salon-cream border rounded-lg text-xs focus:outline-none focus:border-gold-500 ${
                        formErrors.address ? "border-red-500" : "border-gold-500/15"
                      }`}
                    />
                    {formErrors.address && <span className="text-[9px] text-red-500 block font-light">{formErrors.address}</span>}
                  </div>

                  {/* Zoning Selection */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-semibold text-salon-dark/70 uppercase tracking-wider block">Wilayah Pengiriman (Zonasi)</label>
                    <div className="grid grid-cols-2 gap-4">
                      <label className={`flex flex-col p-3 rounded-lg border cursor-pointer transition-all ${
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
                        <span className="text-[9px] text-salon-dark/50 font-light mt-1 pl-5">Jabodetabek (+IDR 100k)</span>
                      </label>

                      <label className={`flex flex-col p-3 rounded-lg border cursor-pointer transition-all ${
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
                        <span className="text-[9px] text-salon-dark/50 font-light mt-1 pl-5">Jawa & DIY (+IDR 250k)</span>
                      </label>
                    </div>
                  </div>

                  {/* DP split warning notice */}
                  <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl space-y-1.5 text-xs text-emerald-800 font-light">
                    <p className="font-semibold">Skema Pembayaran Bertahap:</p>
                    <p className="leading-relaxed">
                      Pengajuan custom Anda memerlukan review kelayakan produksi. Setelah disetujui admin, Anda dapat membayar <strong>DP 50% (IDR {dpAmount.toLocaleString("id-ID")})</strong> di dashboard. Sisa 50% (IDR {remainingBalance.toLocaleString("id-ID")}) dilunasi saat barang dirakit di salon Anda.
                    </p>
                  </div>

                  {/* Submission Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 py-4 rounded-full bg-gold-500 text-salon-cream font-semibold uppercase tracking-wider text-xs hover:bg-gold-600 hover:shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="h-4 w-4 border-2 border-salon-cream border-t-transparent rounded-full animate-spin"></div>
                          Mengirim Pengajuan...
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="h-4.5 w-4.5" />
                          Ajukan Pesanan Custom (Total: IDR {totalAmount.toLocaleString("id-ID")})
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}
