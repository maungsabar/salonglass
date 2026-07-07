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
    <div className="bg-[#FAFAFA] min-h-screen">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-24 md:pt-32 md:pb-36 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-gold-100/30 via-[#FAFAFA] to-[#FAFAFA]">
        <div className="mx-auto max-w-7xl px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Text */}
            <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-700 text-xs font-semibold uppercase tracking-wider animate-pulse">
                <Sparkles className="h-3.5 w-3.5 text-gold-500" />
                Estetika Kemewahan Salon
              </div>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-900 leading-tight">
                Sempurnakan Sudut Salon Anda Dengan <br/>
                <span className="gold-gradient-text">Lemari Kaca Premium</span>
              </h1>
              <p className="text-sm sm:text-base text-zinc-500 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Rancang display kosmetik, skincare, atau aksesoris salon kecantikan Anda menggunakan lemari kaca tempered dengan pencahayaan LED dramatis. Bebas kustomisasi ukuran sesuai kebutuhan ruangan Anda.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  href="/custom"
                  className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-full bg-gold-500 text-white font-semibold tracking-wide uppercase hover:bg-gold-600 shadow-lg hover:shadow-gold-500/20 transition-all duration-300 transform hover:-translate-y-0.5"
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
              <div className="grid grid-cols-3 gap-4 pt-6 max-w-md mx-auto lg:mx-0 border-t border-zinc-200/50">
                <div className="text-center lg:text-left">
                  <p className="text-2xl font-bold text-gold-600 font-serif">50%</p>
                  <p className="text-[10px] text-zinc-400 uppercase tracking-wider font-medium">DP Pembayaran</p>
                </div>
                <div className="text-center lg:text-left border-x border-zinc-200/55">
                  <p className="text-2xl font-bold text-gold-600 font-serif">100%</p>
                  <p className="text-[10px] text-zinc-400 uppercase tracking-wider font-medium">Kaca Tempered</p>
                </div>
                <div className="text-center lg:text-left">
                  <p className="text-2xl font-bold text-gold-600 font-serif">Bebas</p>
                  <p className="text-[10px] text-zinc-400 uppercase tracking-wider font-medium">Kustom Ukuran</p>
                </div>
              </div>
            </div>

            {/* Hero Image / Mockup Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm sm:max-w-md aspect-[3/4] rounded-xl overflow-hidden shadow-xl border border-zinc-200/50 bg-white p-3 group">
                <div className="relative w-full h-full rounded-lg overflow-hidden bg-zinc-900">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop"
                    alt="Premium Gold Glass Cabinet"
                    className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6 text-white space-y-2">
                    <p className="text-[10px] font-semibold text-gold-400 uppercase tracking-widest">Koleksi Terpopuler</p>
                    <h3 className="font-serif text-2xl font-bold">Aura Glow Classic</h3>
                    <p className="text-xs text-white/70 font-light leading-relaxed">Emas Metalik solid dengan Warm LED Lighting</p>
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-sm font-bold text-gold-300">IDR 2.450.000</span>
                      <Link href="/catalog/ready-1" className="text-xs font-semibold text-white hover:text-gold-400 flex items-center gap-1">
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
      <section className="py-24 bg-white border-y border-zinc-200/50">
        <div className="mx-auto max-w-7xl px-6">
          
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-zinc-800">Mengapa Salon Premium Memilih Kami?</h2>
            <div className="h-1 w-20 bg-gold-500 mx-auto"></div>
            <p className="text-sm text-zinc-500 leading-relaxed font-light">
              Kami memadukan standar keamanan material, teknologi pencahayaan modern, dan keterampilan tangan pengerjaan kayu halus untuk menciptakan furniture berkualitas mahakarya.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-xl border border-zinc-200/60 shadow-md shadow-zinc-100 hover:border-gold-500/30 transition-all duration-300 text-center space-y-4 hover:-translate-y-1">
              <div className="mx-auto w-12 h-12 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-600">
                <Compass className="h-6 w-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-zinc-800">Desain Kustom Presisi</h3>
              <p className="text-xs text-zinc-500 leading-relaxed font-light">
                Rancang dimensi lebar, tinggi, dan kedalaman cabinet secara presisi s/d sentimeter untuk memanfaatkan sudut ruang salon kecantikan Anda secara maksimal.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-xl border border-zinc-200/60 shadow-md shadow-zinc-100 hover:border-gold-500/30 transition-all duration-300 text-center space-y-4 hover:-translate-y-1">
              <div className="mx-auto w-12 h-12 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-600">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-zinc-800">Kaca Tempered & LED</h3>
              <p className="text-xs text-zinc-500 leading-relaxed font-light">
                Keamanan kaca tempered tebal (5mm - 10mm) dipadukan pendaran LED internal tersembunyi (Warm, Cool, RGB) yang dramatis dalam memajang kosmetik.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-xl border border-zinc-200/60 shadow-md shadow-zinc-100 hover:border-gold-500/30 transition-all duration-300 text-center space-y-4 hover:-translate-y-1">
              <div className="mx-auto w-12 h-12 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-600">
                <Truck className="h-6 w-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-zinc-800">Armada & Perakitan Mandiri</h3>
              <p className="text-xs text-zinc-500 leading-relaxed font-light">
                Lemari diantar aman menggunakan box armada internal toko kami untuk meminimalisir getaran, lengkap dengan jasa instalasi gratis di tempat salon Anda.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Featured Products Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-16 text-center sm:text-left">
            <div>
              <h2 className="font-serif text-3xl font-bold text-zinc-800">Lemari Ready-Stock Terlaris</h2>
              <p className="text-xs text-zinc-500 leading-relaxed font-light mt-1">Siap dikirim dalam 1-2 hari kerja tanpa perlu menunggu antrean produksi.</p>
            </div>
            <Link href="/catalog" className="text-sm font-semibold text-gold-600 hover:text-gold-700 flex items-center gap-1 whitespace-nowrap">
              Lihat Semua Katalog <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div 
                key={product.id} 
                className="group bg-white border border-zinc-200/60 rounded-xl overflow-hidden flex flex-col hover:border-gold-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-zinc-200/50"
              >
                {/* Product Image */}
                <div className="relative aspect-[4/5] bg-zinc-950 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-zinc-900/80 backdrop-blur text-gold-400 text-[10px] font-semibold tracking-wider px-2.5 py-1 rounded-full border border-zinc-850/40">
                    {product.dimensions}
                  </div>
                </div>
                
                {/* Product Detail */}
                <div className="p-6 flex-grow flex flex-col justify-between space-y-5">
                  <div className="space-y-2">
                    <h3 className="font-serif text-xl font-bold text-zinc-800 group-hover:text-gold-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs text-zinc-500 leading-relaxed line-clamp-3">
                      {product.description}
                    </p>
                  </div>
                  
                  <div className="pt-3 border-t border-zinc-200/50 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-medium">Harga</p>
                      <p className="text-base font-bold text-gold-600 font-mono">
                        IDR {product.price.toLocaleString("id-ID")}
                      </p>
                    </div>
                    
                    <Link
                      href={`/catalog/${product.id}`}
                      className="px-4 py-2 rounded-full border border-gold-500/30 text-xs font-semibold text-gold-700 uppercase tracking-wider hover:bg-gold-500 hover:text-white transition-all duration-300"
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
      <section className="py-24 bg-white border-t border-zinc-200/50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="bg-white border border-zinc-200/60 p-8 sm:p-12 lg:p-16 rounded-2xl shadow-md grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Teaser Left */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-1 bg-gold-500/10 text-gold-600 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full">
                <Sliders className="h-3 w-3" /> Fitur Rancang Mandiri
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-zinc-800 leading-tight">
                Punya Ruang Sudut Salon yang Tidak Standar?
              </h2>
              <p className="text-sm text-zinc-500 leading-relaxed font-light">
                Jangan khawatir. Aplikasi kami menyediakan kalkulator kalkulasi harga real-time. Geser lebar, tinggi, dan kedalaman, lalu pilih ketebalan kaca serta warna LED yang Anda impikan. Dapatkan estimasi total harga seketika, ajukan desain, dan tim kami akan segera memproses pengiriman.
              </p>
              
              <ul className="space-y-2.5 text-xs sm:text-sm text-zinc-650 font-light leading-relaxed">
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
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gold-500 text-white font-semibold tracking-wide uppercase hover:bg-gold-600 shadow-md hover:shadow-gold-500/20 transition-all"
                >
                  Buka Kalkulator Custom <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Teaser Right - Static Mock Slider Component */}
            <div className="lg:col-span-5 bg-[#FAFAFA] border border-zinc-200/60 p-6 sm:p-8 rounded-xl shadow-sm space-y-6">
              <h3 className="font-serif text-lg font-bold text-zinc-800">Simulasi Ukuran Cabinet</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-zinc-600">Lebar Lemari (cm)</span>
                    <span className="text-gold-600">120 cm</span>
                  </div>
                  <div className="h-2 w-full bg-gold-200/50 rounded-full overflow-hidden">
                    <div className="h-full w-[45%] bg-gold-500 rounded-full"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-zinc-600">Tinggi Lemari (cm)</span>
                    <span className="text-gold-600">190 cm</span>
                  </div>
                  <div className="h-2 w-full bg-gold-200/50 rounded-full overflow-hidden">
                    <div className="h-full w-[65%] bg-gold-500 rounded-full"></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-zinc-600">LED Lighting</span>
                    <span className="text-gold-600">Warm LED (+IDR 250k)</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 pt-1">
                    <div className="bg-white border border-zinc-200/80 p-2 rounded text-[10px] text-center text-zinc-400">None</div>
                    <div className="bg-gold-500 border border-gold-500 p-2 rounded text-[10px] text-center text-white font-bold">Warm LED</div>
                    <div className="bg-white border border-zinc-200/80 p-2 rounded text-[10px] text-center text-zinc-400">RGB LED</div>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-200/50 flex justify-between items-center text-xs">
                <div>
                  <p className="text-[10px] text-zinc-400 uppercase tracking-wider">Estimasi Harga</p>
                  <p className="text-xl font-bold text-gold-600 font-mono">IDR 2.250.000</p>
                </div>
                <div className="text-[10px] text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded font-semibold uppercase tracking-wider">
                  DP 50%: IDR 1.125.000
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* 5. Customer Testimonials Section */}
      <section className="py-24 bg-[#FAFAFA]">
        <div className="mx-auto max-w-7xl px-6">
          
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
            <h2 className="font-serif text-3xl font-bold text-zinc-800">Review Para Pemilik Salon</h2>
            <div className="h-1 w-20 bg-gold-500 mx-auto"></div>
            <p className="text-sm text-zinc-500 leading-relaxed font-light">Kepuasan pelanggan adalah komitmen utama kami. Dengarkan pendapat mereka yang telah menata salonnya.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-8 rounded-xl border border-zinc-200/60 shadow-md shadow-zinc-100 space-y-4">
              <div className="flex text-gold-500 gap-0.5">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-4.5 w-4.5 fill-gold-500" />)}
              </div>
              <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed font-light italic">
                &ldquo;Kami memesan lemari custom dengan lebar 180cm untuk memamerkan jajaran kosmetik impor kami. Hasil kayunya sangat rapi, emasnya berkilau mahal, dan lampu LED hangatnya membuat produk skincare kami terlihat sangat premium di malam hari.&rdquo;
              </p>
              <div>
                <p className="text-sm font-semibold text-zinc-800">Juliana Siregar</p>
                <p className="text-[10px] text-gold-600 uppercase tracking-widest font-medium">Founder, J-Spa & Salon Estetika</p>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white p-8 rounded-xl border border-zinc-200/60 shadow-md shadow-zinc-100 space-y-4">
              <div className="flex text-gold-500 gap-0.5">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-4.5 w-4.5 fill-gold-500" />)}
              </div>
              <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed font-light italic">
                &ldquo;Sangat puas dengan pengiriman dan perakitannya. Mereka mengantarkan lemari kaca tempered 8mm yang sangat tebal dan merakitnya langsung di lantai dua studio kami. Sangat profesional dan aman. Skema pembayaran DP 50% juga sangat membantu cashflow kami!&rdquo;
              </p>
              <div>
                <p className="text-sm font-semibold text-zinc-800">Rian Hidayat</p>
                <p className="text-[10px] text-gold-600 uppercase tracking-widest font-medium">Owner, GlowUp Barbershop & Studio</p>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white p-8 rounded-xl border border-zinc-200/60 shadow-md shadow-zinc-100 space-y-4">
              <div className="flex text-gold-500 gap-0.5">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-4.5 w-4.5 fill-gold-500" />)}
              </div>
              <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed font-light italic">
                &ldquo;Kalkulator harga di website ini 100% akurat. Saya mencoba mensimulasikan ukuran lemari sudut sempit kami, dan harganya langsung muncul. Proses pengajuan lancar dan di-approve admin dalam hitungan jam. Lemari kaca tertipis 5mm sudah terasa sangat kokoh.&rdquo;
              </p>
              <div>
                <p className="text-sm font-semibold text-zinc-800">Clara Wijaya</p>
                <p className="text-[10px] text-gold-600 uppercase tracking-widest font-medium">Managing Director, Maison de Beauté</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
