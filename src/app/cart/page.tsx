"use client";

import React from "react";
import Link from "next/link";
import { Trash2, ShoppingBag, ArrowLeft, ArrowRight, ShieldCheck, HelpCircle } from "lucide-react";
import { useApp, CartItem } from "@/context/AppContext";

export default function CartPage() {
  const { cart, updateCartQuantity, removeFromCart } = useApp();

  const totalProductPrice = cart.reduce((total, item) => {
    const itemPrice = item.isCustom ? (item.customPrice || 0) : item.product.price;
    return total + itemPrice * item.quantity;
  }, 0);

  const dpAmount = Math.round(totalProductPrice * 0.5);
  const remainingBalance = totalProductPrice - dpAmount;

  if (cart.length === 0) {
    return (
      <div className="bg-salon-cream min-h-screen py-24 flex items-center justify-center">
        <div className="glass-panel p-12 rounded-3xl text-center space-y-6 max-w-md mx-auto">
          <div className="mx-auto w-16 h-16 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-500">
            <ShoppingBag className="h-8 w-8" />
          </div>
          <div className="space-y-2">
            <h2 className="font-serif text-2xl font-bold text-salon-dark">Keranjang Belanja Kosong</h2>
            <p className="text-xs text-salon-dark/65 font-light">
              Anda belum menambahkan lemari display apa pun ke keranjang belanja.
            </p>
          </div>
          <Link
            href="/catalog"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gold-500 text-salon-cream font-semibold uppercase tracking-wider text-xs hover:bg-gold-600 transition-all cursor-pointer"
          >
            Lihat Katalog Lemari Ready
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-salon-cream min-h-screen py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="mb-10 text-center sm:text-left">
          <h1 className="font-serif text-3xl font-bold text-salon-dark">Keranjang Belanja</h1>
          <p className="text-xs text-salon-dark/50 font-light mt-1">Review kembali cabinet pilihan Anda sebelum melanjutkan pembayaran DP 50%.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Cart List */}
          <div className="lg:col-span-8 space-y-4">
            {cart.map((item) => {
              const itemPrice = item.isCustom ? (item.customPrice || 0) : item.product.price;
              
              return (
                <div 
                  key={item.id} 
                  className="glass-panel p-5 rounded-2xl border border-gold-500/10 flex flex-col sm:flex-row gap-5 items-center sm:items-start"
                >
                  {/* Item Image */}
                  <div className="w-24 aspect-[4/5] bg-salon-dark rounded-xl overflow-hidden flex-shrink-0 border border-gold-500/10">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Item Details */}
                  <div className="flex-grow space-y-3 text-center sm:text-left w-full">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                      <div>
                        <span className="text-[9px] font-semibold bg-gold-500/10 text-gold-700 px-2 py-0.5 rounded border border-gold-500/20 uppercase tracking-wider">
                          {item.isCustom ? "Custom-Made" : "Ready Stock"}
                        </span>
                        <h3 className="font-serif text-lg font-bold text-salon-dark mt-1">
                          {item.product.name}
                        </h3>
                      </div>
                      
                      {/* Price per unit */}
                      <p className="font-mono text-sm font-semibold text-gold-600">
                        IDR {itemPrice.toLocaleString("id-ID")}
                      </p>
                    </div>

                    {/* Spec badges if custom */}
                    {item.isCustom && item.customSpecs && (
                      <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                        <span className="bg-salon-cream border border-gold-500/10 px-2 py-0.5 rounded text-[10px] text-salon-dark/60 font-light">
                          Ukuran: {item.customSpecs.width}x{item.customSpecs.depth}x{item.customSpecs.height} cm
                        </span>
                        <span className="bg-salon-cream border border-gold-500/10 px-2 py-0.5 rounded text-[10px] text-salon-dark/60 font-light uppercase">
                          Kaca: {item.customSpecs.glassThickness}
                        </span>
                        <span className="bg-salon-cream border border-gold-500/10 px-2 py-0.5 rounded text-[10px] text-salon-dark/60 font-light uppercase">
                          LED: {item.customSpecs.ledOption === "none" ? "None" : item.customSpecs.ledOption === "white_led" ? "Cool White" : item.customSpecs.ledOption === "warm_led" ? "Warm" : "RGB"}
                        </span>
                        {item.customSpecs.lockOption && (
                          <span className="bg-salon-cream border border-gold-500/10 px-2 py-0.5 rounded text-[10px] text-salon-dark/60 font-light">
                            Kunci Pengaman
                          </span>
                        )}
                      </div>
                    )}

                    {!item.isCustom && (
                      <p className="text-[11px] text-salon-dark/50 font-light">
                        Dimensi: {item.product.dimensions} | Glass: {item.product.glassThickness} | Lock: {item.product.lockOption ? "Ada" : "Tidak"}
                      </p>
                    )}

                    {/* Actions Row */}
                    <div className="flex items-center justify-between pt-2 border-t border-gold-500/5">
                      {/* Quantity input */}
                      <div className="flex items-center bg-salon-cream border border-gold-500/20 rounded-full px-2 py-0.5">
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-sm text-salon-dark/60 hover:text-gold-500"
                        >
                          -
                        </button>
                        <span className="px-2.5 font-mono font-bold text-xs text-salon-dark">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-sm text-salon-dark/60 hover:text-gold-500"
                        >
                          +
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-salon-dark/40 hover:text-red-600 transition-colors p-1 cursor-pointer"
                        title="Hapus"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}

            <div className="pt-4">
              <Link
                href="/catalog"
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gold-700 hover:text-gold-900 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" /> Tambah Cabinet Lain
              </Link>
            </div>
          </div>

          {/* Right Column: Order Summary Card */}
          <div className="lg:col-span-4 glass-panel p-6 sm:p-8 rounded-2xl border border-gold-500/10 space-y-6">
            <h3 className="font-serif text-xl font-bold text-salon-dark">Ringkasan Pesanan</h3>
            
            <div className="space-y-3.5 text-xs">
              <div className="flex justify-between items-center py-1">
                <span className="text-salon-dark/60">Total Harga Barang</span>
                <span className="font-semibold text-salon-dark font-mono">
                  IDR {totalProductPrice.toLocaleString("id-ID")}
                </span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-gold-500/10 pb-3">
                <div className="flex items-center gap-1 text-salon-dark/60">
                  <span>Estimasi Biaya Kirim</span>
                  <span className="group relative cursor-pointer text-gold-500 hover:text-gold-600">
                    <HelpCircle className="h-3.5 w-3.5" />
                    <span className="absolute left-1/2 transform -translate-x-1/2 bottom-5 w-48 p-2 rounded bg-salon-dark text-salon-cream text-[9px] leading-relaxed hidden group-hover:block z-20 font-light border border-gold-500/25">
                      Dihitung pada tahap selanjutnya berdasarkan wilayah salon Anda (Dalam Kota IDR 100k, Luar Kota IDR 250k).
                    </span>
                  </span>
                </div>
                <span className="font-light text-salon-dark/45">Dihitung di checkout</span>
              </div>

              {/* Payment Split info */}
              <div className="space-y-2 pt-2">
                <div className="flex justify-between items-center py-1 text-emerald-700">
                  <span className="font-medium">DP 50% (Dibayar Sekarang)</span>
                  <span className="font-bold font-mono">
                    IDR {dpAmount.toLocaleString("id-ID")}
                  </span>
                </div>
                <div className="flex justify-between items-center py-1 text-salon-dark/60">
                  <span>Pelunasan 50% (Bayar di Salon COD)</span>
                  <span className="font-semibold font-mono">
                    IDR {remainingBalance.toLocaleString("id-ID")}
                  </span>
                </div>
              </div>

              <div className="h-px bg-gold-500/10 w-full my-2"></div>

              {/* Trust Badge */}
              <div className="bg-gold-500/5 border border-gold-500/10 p-3.5 rounded-xl flex items-start gap-2.5">
                <ShieldCheck className="h-4.5 w-4.5 text-gold-600 flex-shrink-0 mt-0.5" />
                <p className="text-[10px] text-gold-700/90 leading-relaxed font-light">
                  Aman & Terjamin. Pembayaran DP 50% menggunakan Payment Gateway Midtrans/Xendit simulator. Sisa tagihan ditagih saat lemari selesai dipasang.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/checkout"
                className="w-full flex items-center justify-center gap-2 py-4 rounded-full bg-gold-500 text-salon-cream font-semibold uppercase tracking-wider text-xs hover:bg-gold-600 hover:shadow-lg transition-all transform hover:-translate-y-0.5"
              >
                Lanjut Ke Checkout
                <ArrowRight className="h-4.5 w-4.5" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
