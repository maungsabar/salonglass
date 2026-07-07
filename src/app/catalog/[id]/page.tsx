"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ShoppingBag, ShieldCheck, Info, Sparkles, Check, Truck, Lock, Zap } from "lucide-react";
import { useApp } from "@/context/AppContext";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ProductDetailPage({ params }: PageProps) {
  const router = useRouter();
  const { products, addToCart } = useApp();
  
  // Unwrap params using React.use()
  const { id } = React.use(params);
  
  // Find product
  const product = products.find((p) => p.id === id);

  // States
  const [quantity, setQuantity] = useState<number>(1);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [isAdded, setIsAdded] = useState<boolean>(false);

  if (!product) {
    return (
      <div className="bg-salon-cream min-h-screen py-24 flex items-center justify-center">
        <div className="glass-panel p-12 rounded-2xl text-center space-y-4 max-w-md mx-auto">
          <Info className="h-10 w-10 text-gold-500 mx-auto" />
          <h2 className="font-serif text-2xl font-bold text-salon-dark">Produk Tidak Ditemukan</h2>
          <p className="text-xs text-salon-dark/60 font-light">
            Lemari display yang Anda cari tidak tersedia atau telah dihapus dari katalog kami.
          </p>
          <Link
            href="/catalog"
            className="inline-block px-6 py-2.5 rounded-full bg-gold-500 text-salon-cream text-xs font-semibold uppercase tracking-wider hover:bg-gold-600 transition-all"
          >
            Kembali ke Katalog
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 3000);
  };

  const itemPriceTotal = product.price * quantity;

  return (
    <div className="bg-salon-cream min-h-screen py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/catalog"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold-700 hover:text-gold-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Kembali ke Katalog
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-6 space-y-4">
            <div className="aspect-[4/5] bg-salon-dark rounded-2xl overflow-hidden border border-gold-500/10 shadow-lg relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product.images[activeImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover transition-all duration-300"
              />
              <span className="absolute top-4 left-4 bg-salon-dark/80 backdrop-blur text-gold-400 text-xs font-semibold uppercase tracking-wider px-3.5 py-1.5 rounded-full border border-gold-500/15">
                Kaca Tempered
              </span>
            </div>

            {/* Thumbnail Selectors (simulated alternative angles) */}
            {product.images.length > 1 && (
              <div className="flex gap-4">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 aspect-square rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                      activeImageIndex === idx ? "border-gold-500" : "border-gold-500/10 hover:border-gold-500/50"
                    }`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img}
                      alt={`Angle ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Details & Actions */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-1 bg-gold-500/10 text-gold-700 text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full">
                <Sparkles className="h-3 w-3" /> Rekomendasi Salon Premium
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-salon-dark leading-tight">
                {product.name}
              </h1>
              <p className="text-xl sm:text-2xl font-bold font-mono text-gold-600">
                IDR {product.price.toLocaleString("id-ID")}
              </p>
              <div className="h-px bg-gold-500/10 w-full"></div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h3 className="text-xs font-semibold text-salon-dark/70 uppercase tracking-widest">Deskripsi Produk</h3>
              <p className="text-xs sm:text-sm text-salon-dark/70 font-light leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Specifications Sheet Table */}
            <div className="space-y-3">
              <h3 className="text-xs font-semibold text-salon-dark/70 uppercase tracking-widest">Spesifikasi Teknis</h3>
              <div className="bg-salon-cream/50 rounded-xl border border-gold-500/15 overflow-hidden text-xs">
                <div className="grid grid-cols-2 p-3 border-b border-gold-500/10">
                  <span className="text-salon-dark/50">Dimensi Standar</span>
                  <span className="font-semibold text-salon-dark">{product.dimensions}</span>
                </div>
                <div className="grid grid-cols-2 p-3 border-b border-gold-500/10">
                  <span className="text-salon-dark/50">Ketebalan Kaca</span>
                  <span className="font-semibold text-salon-dark">{product.glassThickness} Tempered Glass</span>
                </div>
                <div className="grid grid-cols-2 p-3 border-b border-gold-500/10">
                  <span className="text-salon-dark/50">Sistem LED</span>
                  <span className="font-semibold text-salon-dark uppercase">
                    {product.ledOption === "white_led" ? "Cool White LED" : product.ledOption === "warm_led" ? "Warm White LED" : product.ledOption === "rgb_led" ? "RGB Neon LED" : "Tidak Ada"}
                  </span>
                </div>
                <div className="grid grid-cols-2 p-3 border-b border-gold-500/10">
                  <span className="text-salon-dark/50">Kunci Pengaman</span>
                  <span className="font-semibold text-salon-dark">
                    {product.lockOption ? "Termasuk Kunci Ganda" : "Tanpa Kunci"}
                  </span>
                </div>
                <div className="grid grid-cols-2 p-3">
                  <span className="text-salon-dark/50">Kapasitas Beban</span>
                  <span className="font-semibold text-salon-dark">Hingga 20kg per Ambalan Kaca</span>
                </div>
              </div>
            </div>

            {/* Logistics Info Bar */}
            <div className="bg-salon-warm/30 border border-gold-500/10 p-4 rounded-xl flex items-start gap-3">
              <Truck className="h-5 w-5 text-gold-600 flex-shrink-0 mt-0.5" />
              <div className="text-xs space-y-1">
                <p className="font-semibold text-salon-dark">Pengiriman Khusus & Gratis Perakitan</p>
                <p className="text-salon-dark/60 font-light">
                  Dikirim mandiri menggunakan kurir armada toko kami. Gratis biaya perakitan lemari di lokasi salon Anda.
                </p>
              </div>
            </div>

            {/* Pricing split note */}
            <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl flex items-start gap-3">
              <Zap className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div className="text-xs space-y-1">
                <p className="font-semibold text-emerald-800">Skema DP 50% Berlaku</p>
                <p className="text-emerald-700/80 font-light">
                  Anda hanya perlu membayar **DP 50% di muka (IDR {(itemPriceTotal * 0.5).toLocaleString("id-ID")})** saat checkout. Sisa 50% dapat dilunasi tunai/transfer saat pemasangan selesai di lokasi.
                </p>
              </div>
            </div>

            {/* Add to Cart Actions */}
            <div className="space-y-4 pt-4 border-t border-gold-500/10">
              <div className="flex items-center gap-6">
                {/* Quantity input */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-semibold text-salon-dark/60 uppercase tracking-wider block">Jumlah</label>
                  <div className="flex items-center bg-salon-cream border border-gold-500/20 rounded-full px-2 py-1">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-2.5 py-1 text-base text-salon-dark/60 hover:text-gold-500 focus:outline-none"
                    >
                      -
                    </button>
                    <span className="px-3 font-mono font-bold text-sm text-salon-dark">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-2.5 py-1 text-base text-salon-dark/60 hover:text-gold-500 focus:outline-none"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="flex-grow space-y-1.5">
                  <label className="text-[10px] font-semibold text-salon-dark/60 uppercase tracking-wider block">Total Harga Produk</label>
                  <p className="text-xl font-bold font-mono text-salon-dark">
                    IDR {itemPriceTotal.toLocaleString("id-ID")}
                  </p>
                </div>
              </div>

              {/* Add to cart button */}
              <div className="flex gap-4">
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 flex items-center justify-center gap-2.5 py-4 rounded-full font-semibold tracking-wide uppercase shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer ${
                    isAdded
                      ? "bg-emerald-600 text-salon-cream shadow-emerald-500/10"
                      : "bg-gold-500 text-salon-cream hover:bg-gold-600 shadow-gold-500/10"
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="h-4.5 w-4.5" />
                      Telah Ditambahkan
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="h-4.5 w-4.5" />
                      Tambah ke Keranjang
                    </>
                  )}
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
