"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Compass, ShieldCheck, Truck, ArrowRight, Star, Sliders } from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function Home() {
  const { products } = useApp();
  
  // Display the first 3 products as featured
  const featuredProducts = products.slice(0, 3);

  return (
    <div className="bg-salon-cream min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-24 md:pt-32 md:pb-36 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gold-100/35 via-salon-cream to-salon-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Hero Text */}
            <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-700 text-xs font-semibold uppercase tracking-wider animate-pulse">
                <Sparkles className="h-3.5 w-3.5 text-gold-500" />
                Estetika Kemewahan Salon
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-salon-dark leading-tight">
                Sempurnakan Sudut Salon Anda Dengan <br/>
                <span className="gold-gradient-text">Lemari Kaca Premium</span>
              </h1>
              <p className="text-base sm:text-lg text-salon-dark/70 font-light max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Rancang display kosmetik, skincare, atau aksesoris salon kecantikan Anda menggunakan lemari kaca tempered dengan pencahayaan LED dramatis. Bebas kustomisasi ukuran sesuai kebutuhan ruangan Anda.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  href="/custom"
                  className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-full bg-gold-500 text-salon-cream font-semibold tracking-wide uppercase hover:bg-gold-600 shadow-lg hover:shadow-gold-500/20 transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  <Sliders className="h-4 w-4" />
                  Rancang Custom
                </Link>
                <Link
                  href="/catalog"
                  className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-full border-2 border-gold-500/40 text-gold-700 font-semibold tracking-wide uppercase hover:bg-gold-500/5 transition-all duration-300"
                >
                  Beli Lemari Ready
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              {/* Quick Trust badges */}
              <div className="grid grid-cols-3 gap-4 pt-6 max-w-md mx-auto lg:mx-0">
                <div className="text-center lg:text-left">
                  <p className="text-2xl font-bold text-gold-600 font-serif">50%</p>
                  <p className="text-[11px] text-salon-dark/60 uppercase tracking-wider">DP Pembayaran</p>
                </div>
                <div className="text-center lg:text-left border-x border-gold-500/10">
                  <p className="text-2xl font-bold text-gold-600 font-serif">100%</p>
                  <p className="text-[11px] text-salon-dark/60 uppercase tracking-wider">Kaca Tempered</p>
                </div>
                <div className="text-center lg:text-left">
                  <p className="text-2xl font-bold text-gold-600 font-serif">Bebas</p>
                  <p className="text-[11px] text-salon-dark/60 uppercase tracking-wider">Kustom Ukuran</p>
                </div>
              </div>
            </div>

            {/* Hero Image / Mockup Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm sm:max-w-md aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-gold-500/20 glass-panel p-4 group">
                <div className="relative w-full h-full rounded-xl overflow-hidden bg-salon-dark">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop"
                    alt="Premium Gold Glass Cabinet"
                    className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-salon-dark via-transparent to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6 text-salon-cream space-y-2">
                    <p className="text-xs font-semibold text-gold-400 uppercase tracking-widest">Koleksi Terpopuler</p>
                    <h3 className="font-serif text-2xl font-semibold">Aura Glow Classic</h3>
                    <p className="text-xs text-salon-cream/70 font-light">Emas Metalik solid dengan Warm LED Lighting</p>
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-sm font-bold text-gold-300">IDR 2.450.000</span>
                      <Link href="/catalog/ready-1" className="text-xs font-semibold text-salon-cream hover:text-gold-400 flex items-center gap-1">
                        Lihat Detail <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Key Advantages Section */}
      <section className="py-20 bg-salon-cream/50 border-y border-gold-500/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-salon-dark">Mengapa Salon Premium Memilih Kami?</h2>
            <div className="h-1 w-20 bg-gold-500 mx-auto"></div>
            <p className="text-sm text-salon-dark/60 font-light leading-relaxed">
              Kami memadukan standar keamanan material, teknologi pencahayaan modern, dan keterampilan tangan pengerjaan kayu halus untuk menciptakan furniture berkualitas mahakarya.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="glass-panel p-8 rounded-2xl hover:border-gold-500/30 transition-all duration-300 text-center space-y-4 hover:-translate-y-1">
              <div className="mx-auto w-12 h-12 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-600">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-salon-dark">Keamanan Tempered Glass</h3>
              <p className="text-xs text-salon-dark/60 font-light leading-relaxed">
                Menggunakan kaca tempered berkualitas tinggi (5mm, 8mm, hingga 10mm) yang tahan benturan dan tidak membahayakan pelanggan salon.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="glass-panel p-8 rounded-2xl hover:border-gold-500/30 transition-all duration-300 text-center space-y-4 hover:-translate-y-1">
              <div className="mx-auto w-12 h-12 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-600">
                <Sparkles className="h-6 w-6" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-salon-dark">Dynamic LED Lighting</h3>
              <p className="text-xs text-salon-dark/60 font-light leading-relaxed">
                Pencahayaan LED internal tersembunyi (Warm Light, Cool White, atau RGB warna-warni) untuk menonjolkan produk skincare salon agar memikat mata pembeli.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="glass-panel p-8 rounded-2xl hover:border-gold-500/30 transition-all duration-300 text-center space-y-4 hover:-translate-y-1">
              <div className="mx-auto w-12 h-12 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-600">
                <Compass className="h-6 w-6" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-salon-dark">Custom Desain Bebas</h3>
              <p className="text-xs text-salon-dark/60 font-light leading-relaxed">
                Sesuaikan dimensi lemari (lebar, tinggi, kedalaman) secara bebas hingga sentimeter presisi menggunakan kalkulator pintar kami.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="glass-panel p-8 rounded-2xl hover:border-gold-500/30 transition-all duration-300 text-center space-y-4 hover:-translate-y-1">
              <div className="mx-auto w-12 h-12 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-600">
                <Truck className="h-6 w-6" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-salon-dark">Logistik & Perakitan Mandiri</h3>
              <p className="text-xs text-salon-dark/60 font-light leading-relaxed">
                Kabinet diantar dengan aman menggunakan kurir armada internal kami sendiri, lengkap dengan jasa instalasi gratis di tempat salon Anda.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Products Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-12 text-center sm:text-left">
            <div>
              <h2 className="font-serif text-3xl font-bold text-salon-dark">Lemari Ready-Stock Terlaris</h2>
              <p className="text-xs text-salon-dark/60 font-light mt-1">Siap dikirim dalam 1-2 hari kerja tanpa perlu menunggu antrean produksi.</p>
            </div>
            <Link href="/catalog" className="text-sm font-semibold text-gold-600 hover:text-gold-700 flex items-center gap-1 whitespace-nowrap">
              Lihat Semua Katalog <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="group glass-panel rounded-2xl overflow-hidden flex flex-col hover:border-gold-500/30 transition-all duration-300 hover:shadow-xl">
                {/* Product Image */}
                <div className="relative aspect-[4/5] bg-salon-dark overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-salon-dark/80 backdrop-blur text-gold-400 text-[10px] font-semibold tracking-wider px-2.5 py-1 rounded-full border border-gold-500/20">
                    {product.dimensions}
                  </div>
                </div>
                
                {/* Product Detail */}
                <div className="p-6 flex-grow flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-serif text-xl font-bold text-salon-dark group-hover:text-gold-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs text-salon-dark/65 font-light line-clamp-3">
                      {product.description}
                    </p>
                  </div>
                  
                  <div className="pt-2 border-t border-gold-500/5 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-salon-dark/40 uppercase tracking-widest font-light">Harga</p>
                      <p className="text-base font-bold text-gold-600 font-mono">
                        IDR {product.price.toLocaleString("id-ID")}
                      </p>
                    </div>
                    
                    <Link
                      href={`/catalog/${product.id}`}
                      className="px-4 py-2 rounded-full border border-gold-500/30 text-xs font-semibold text-gold-700 uppercase tracking-wider hover:bg-gold-500 hover:text-salon-cream transition-all duration-300"
                    >
                      Detail
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Interactive Custom Teaser Section */}
      <section className="py-20 bg-gradient-to-b from-salon-cream to-salon-warm border-t border-gold-500/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="glass-panel p-8 sm:p-12 lg:p-16 rounded-3xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Teaser Left */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-1 bg-gold-500/10 text-gold-600 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full">
                <Sliders className="h-3 w-3" /> Fitur Rancang Mandiri
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-salon-dark leading-tight">
                Punya Ruang Sudut Salon yang Tidak Standar?
              </h2>
              <p className="text-sm sm:text-base text-salon-dark/70 font-light leading-relaxed">
                Jangan khawatir. Aplikasi kami menyediakan kalkulator kalkulasi harga real-time. Geser lebar, tinggi, dan kedalaman, lalu pilih ketebalan kaca serta warna LED yang Anda impikan. Dapatkan estimasi total harga seketika, ajukan desain, dan tim kami akan segera memproses pengiriman.
              </p>
              
              <ul className="space-y-2.5 text-xs sm:text-sm text-salon-dark/80 font-light">
                <li className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-gold-500 fill-gold-500" /> Lebar custom dari 60 cm sampai 250 cm
                </li>
                <li className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-gold-500 fill-gold-500" /> Pilihan ketebalan kaca tempered 5mm, 8mm, hingga 10mm
                </li>
                <li className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-gold-500 fill-gold-500" /> Pembayaran DP 50% aman lewat Midtrans/Xendit simulator
                </li>
              </ul>
              
              <div className="pt-2">
                <Link
                  href="/custom"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gold-500 text-salon-cream font-semibold tracking-wide uppercase hover:bg-gold-600 hover:shadow-lg transition-all"
                >
                  Buka Kalkulator Custom <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Teaser Right - Static Mock Slider Component */}
            <div className="lg:col-span-5 bg-salon-cream/60 border border-gold-500/15 p-6 sm:p-8 rounded-2xl shadow-xl space-y-6">
              <h3 className="font-serif text-lg font-bold text-salon-dark">Simulasi Ukuran Cabinet</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-salon-dark/70">Lebar Lemari (cm)</span>
                    <span className="text-gold-600">120 cm</span>
                  </div>
                  <div className="h-2 w-full bg-gold-200 rounded-full overflow-hidden">
                    <div className="h-full w-[45%] bg-gold-500 rounded-full"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-salon-dark/70">Tinggi Lemari (cm)</span>
                    <span className="text-gold-600">190 cm</span>
                  </div>
                  <div className="h-2 w-full bg-gold-200 rounded-full overflow-hidden">
                    <div className="h-full w-[65%] bg-gold-500 rounded-full"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-salon-dark/70">LED Lighting</span>
                    <span className="text-gold-600">Warm LED (+IDR 250k)</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 pt-1">
                    <div className="bg-salon-cream border border-salon-dark/10 p-2 rounded text-[10px] text-center text-salon-dark/50">None</div>
                    <div className="bg-gold-500 border border-gold-500 p-2 rounded text-[10px] text-center text-salon-cream font-bold">Warm LED</div>
                    <div className="bg-salon-cream border border-salon-dark/10 p-2 rounded text-[10px] text-center text-salon-dark/50">RGB LED</div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gold-500/10 flex justify-between items-center">
                <div>
                  <p className="text-[10px] text-salon-dark/50 uppercase tracking-wider">Estimasi Harga</p>
                  <p className="text-xl font-bold text-gold-600 font-mono">IDR 2.250.000</p>
                </div>
                <div className="text-[10px] text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-1 rounded font-semibold uppercase tracking-wider">
                  DP 50%: IDR 1.125.000
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* 5. Customer Testimonials Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <h2 className="font-serif text-3xl font-bold text-salon-dark">Review Para Pemilik Salon</h2>
            <div className="h-1 w-20 bg-gold-500 mx-auto"></div>
            <p className="text-sm text-salon-dark/65 font-light">Kepuasan pelanggan adalah komitmen utama kami. Dengarkan pendapat mereka yang telah menata salonnya.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="glass-panel p-8 rounded-2xl space-y-4">
              <div className="flex text-gold-500 gap-0.5">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-4.5 w-4.5 fill-gold-500" />)}
              </div>
              <p className="text-xs sm:text-sm text-salon-dark/80 font-light italic leading-relaxed">
                &ldquo;Kami memesan lemari custom dengan lebar 180cm untuk memamerkan jajaran kosmetik impor kami. Hasil kayunya sangat rapi, emasnya berkilau mahal, dan lampu LED hangatnya membuat produk skincare kami terlihat sangat premium di malam hari.&rdquo;
              </p>
              <div>
                <p className="text-sm font-semibold text-salon-dark">Juliana Siregar</p>
                <p className="text-[10px] text-gold-600 uppercase tracking-widest">Founder, J-Spa & Salon Estetika</p>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="glass-panel p-8 rounded-2xl space-y-4">
              <div className="flex text-gold-500 gap-0.5">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-4.5 w-4.5 fill-gold-500" />)}
              </div>
              <p className="text-xs sm:text-sm text-salon-dark/80 font-light italic leading-relaxed">
                &ldquo;Sangat puas dengan pengiriman dan perakitannya. Mereka mengantarkan lemari kaca tempered 8mm yang sangat tebal dan merakitnya langsung di lantai dua studio kami. Sangat profesional dan aman. Skema pembayaran DP 50% juga sangat membantu cashflow kami!&rdquo;
              </p>
              <div>
                <p className="text-sm font-semibold text-salon-dark">Rian Hidayat</p>
                <p className="text-[10px] text-gold-600 uppercase tracking-widest">Owner, GlowUp Barbershop & Studio</p>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="glass-panel p-8 rounded-2xl space-y-4">
              <div className="flex text-gold-500 gap-0.5">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-4.5 w-4.5 fill-gold-500" />)}
              </div>
              <p className="text-xs sm:text-sm text-salon-dark/80 font-light italic leading-relaxed">
                &ldquo;Kalkulator harga di website ini 100% akurat. Saya mencoba mensimulasikan ukuran lemari sudut sempit kami, dan harganya langsung muncul. Proses pengajuan lancar dan di-approve admin dalam hitungan jam. Lemari kaca tertipis 5mm sudah terasa sangat kokoh.&rdquo;
              </p>
              <div>
                <p className="text-sm font-semibold text-salon-dark">Clara Wijaya</p>
                <p className="text-[10px] text-gold-600 uppercase tracking-widest">Managing Director, Maison de Beauté</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
