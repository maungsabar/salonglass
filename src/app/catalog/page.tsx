"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Search, SlidersHorizontal, Eye, ShoppingCart, Info, RotateCcw } from "lucide-react";
import { useApp, Product } from "@/context/AppContext";

export default function CatalogPage() {
  const { products, addToCart } = useApp();
  
  // States for filter inputs
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLed, setSelectedLed] = useState<string>("all");
  const [selectedLock, setSelectedLock] = useState<string>("all");
  const [maxPrice, setMaxPrice] = useState<number>(8000000);
  const [sortBy, setSortBy] = useState<string>("default");

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm("");
    setSelectedLed("all");
    setSelectedLock("all");
    setMaxPrice(8000000);
    setSortBy("default");
  };

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Name / Search matching
        const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              product.description.toLowerCase().includes(searchTerm.toLowerCase());
        
        // LED filter
        const matchesLed = selectedLed === "all" || product.ledOption === selectedLed;
        
        // Lock filter
        const matchesLock = selectedLock === "all" || 
          (selectedLock === "yes" && product.lockOption) || 
          (selectedLock === "no" && !product.lockOption);
        
        // Price filter
        const matchesPrice = product.price <= maxPrice;

        return matchesSearch && matchesLed && matchesLock && matchesPrice;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") return a.price - b.price;
        if (sortBy === "price-desc") return b.price - a.price;
        if (sortBy === "name-asc") return a.name.localeCompare(b.name);
        return 0; // Default sorting
      });
  }, [products, searchTerm, selectedLed, selectedLock, maxPrice, sortBy]);

  return (
    <div className="bg-salon-cream min-h-screen py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-center sm:text-left space-y-2 mb-12">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-salon-dark">Katalog Lemari Ready-Stock</h1>
          <p className="text-xs sm:text-sm text-salon-dark/60 font-light max-w-2xl">
            Tingkatkan gengsi salon Anda dengan jajaran lemari kaca display premium kami. Semua produk di bawah siap kirim dan sudah termasuk jasa rakit gratis di tempat.
          </p>
        </div>

        {/* Filters and Catalog Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Panel: Filter Controls */}
          <div className="lg:col-span-3 glass-panel p-6 sm:p-8 rounded-2xl space-y-6 lg:sticky lg:top-24">
            <div className="flex items-center justify-between pb-4 border-b border-gold-500/10">
              <span className="font-serif text-lg font-bold text-salon-dark flex items-center gap-2">
                <SlidersHorizontal className="h-4.5 w-4.5 text-gold-500" /> Filter
              </span>
              <button 
                onClick={resetFilters}
                className="text-xs text-gold-600 hover:text-gold-800 flex items-center gap-1 font-medium cursor-pointer"
              >
                <RotateCcw className="h-3 w-3" /> Reset
              </button>
            </div>

            {/* Filter Search */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-salon-dark/70 uppercase tracking-wider">Cari Nama Lemari</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Ketik model..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-salon-cream/50 border border-gold-500/15 rounded-lg text-xs focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500"
                />
                <Search className="absolute left-3 top-3 h-4 w-4 text-salon-dark/35" />
              </div>
            </div>

            {/* Filter LED Option */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-salon-dark/70 uppercase tracking-wider">Pencahayaan LED</label>
              <select
                value={selectedLed}
                onChange={(e) => setSelectedLed(e.target.value)}
                className="w-full px-3 py-2.5 bg-salon-cream/50 border border-gold-500/15 rounded-lg text-xs focus:outline-none focus:border-gold-500"
              >
                <option value="all">Semua LED</option>
                <option value="white_led">Cool White LED</option>
                <option value="warm_led">Warm White LED</option>
                <option value="rgb_led">RGB Neon LED</option>
                <option value="none">Tanpa Lampu</option>
              </select>
            </div>

            {/* Filter Lock Security */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-salon-dark/70 uppercase tracking-wider">Kunci Pengaman</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedLock("all")}
                  className={`flex-1 py-2 text-center rounded text-[11px] font-medium border transition-all ${
                    selectedLock === "all"
                      ? "bg-gold-500 border-gold-500 text-salon-cream font-bold"
                      : "border-gold-500/20 text-salon-dark/65 hover:bg-gold-500/5"
                  }`}
                >
                  Semua
                </button>
                <button
                  onClick={() => setSelectedLock("yes")}
                  className={`flex-1 py-2 text-center rounded text-[11px] font-medium border transition-all ${
                    selectedLock === "yes"
                      ? "bg-gold-500 border-gold-500 text-salon-cream font-bold"
                      : "border-gold-500/20 text-salon-dark/65 hover:bg-gold-500/5"
                  }`}
                >
                  Ada
                </button>
                <button
                  onClick={() => setSelectedLock("no")}
                  className={`flex-1 py-2 text-center rounded text-[11px] font-medium border transition-all ${
                    selectedLock === "no"
                      ? "bg-gold-500 border-gold-500 text-salon-cream font-bold"
                      : "border-gold-500/20 text-salon-dark/65 hover:bg-gold-500/5"
                  }`}
                >
                  Tidak
                </button>
              </div>
            </div>

            {/* Filter Price Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold text-salon-dark/70 uppercase tracking-wider">
                <span>Maks Harga</span>
                <span className="font-mono text-gold-600">IDR {maxPrice.toLocaleString("id-ID")}</span>
              </div>
              <input
                type="range"
                min="1000000"
                max="8000000"
                step="250000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-gold-500 cursor-pointer"
              />
              <div className="flex justify-between text-[9px] text-salon-dark/45 font-mono">
                <span>1 Juta</span>
                <span>8 Juta</span>
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="space-y-2 pt-2 border-t border-gold-500/10">
              <label className="text-xs font-semibold text-salon-dark/70 uppercase tracking-wider">Urutkan</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2.5 bg-salon-cream/50 border border-gold-500/15 rounded-lg text-xs focus:outline-none focus:border-gold-500"
              >
                <option value="default">Rekomendasi</option>
                <option value="price-asc">Harga Terendah</option>
                <option value="price-desc">Harga Tertinggi</option>
                <option value="name-asc">Nama (A - Z)</option>
              </select>
            </div>
          </div>

          {/* Right Panel: Catalog Items */}
          <div className="lg:col-span-9">
            {filteredProducts.length === 0 ? (
              <div className="glass-panel p-16 rounded-2xl text-center space-y-4">
                <Info className="h-10 w-10 text-gold-500 mx-auto" />
                <h3 className="font-serif text-xl font-bold text-salon-dark">Tidak Ada Produk Cocok</h3>
                <p className="text-xs text-salon-dark/60 font-light max-w-sm mx-auto">
                  Cobalah untuk mereset filter pencarian atau memperlebar rentang pencarian harga Anda.
                </p>
                <button
                  onClick={resetFilters}
                  className="px-6 py-2.5 rounded-full bg-gold-500 text-salon-cream text-xs font-semibold uppercase tracking-wider hover:bg-gold-600 transition-all cursor-pointer"
                >
                  Reset Filter
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <div 
                    key={product.id} 
                    className="group glass-panel rounded-xl overflow-hidden flex flex-col hover:border-gold-500/30 transition-all duration-300 hover:shadow-lg"
                  >
                    {/* Product Image container */}
                    <div className="relative aspect-[4/5] bg-salon-dark overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 bg-salon-dark/85 backdrop-blur text-gold-400 text-[9px] font-semibold tracking-wider px-2 py-0.5 rounded border border-gold-500/10 uppercase">
                        {product.glassThickness} glass
                      </div>
                      
                      {/* Hover action overlay */}
                      <div className="absolute inset-0 bg-salon-dark/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                        <Link
                          href={`/catalog/${product.id}`}
                          className="p-3 rounded-full bg-salon-cream text-salon-dark hover:bg-gold-500 hover:text-salon-cream transition-all shadow-md"
                          title="Lihat Detail"
                        >
                          <Eye className="h-4.5 w-4.5" />
                        </Link>
                        <button
                          onClick={() => {
                            addToCart(product, 1);
                            alert(`"${product.name}" telah ditambahkan ke keranjang belanja Anda!`);
                          }}
                          className="p-3 rounded-full bg-salon-cream text-salon-dark hover:bg-gold-500 hover:text-salon-cream transition-all shadow-md cursor-pointer"
                          title="Tambah ke Keranjang"
                        >
                          <ShoppingCart className="h-4.5 w-4.5" />
                        </button>
                      </div>
                    </div>

                    {/* Product Content Details */}
                    <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-[10px] text-salon-dark/45 uppercase tracking-widest font-light">
                          <span>{product.dimensions}</span>
                          {product.lockOption && <span className="text-gold-600 font-semibold">Ber-kunci</span>}
                        </div>
                        <h3 className="font-serif text-lg font-bold text-salon-dark group-hover:text-gold-600 transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-[11px] text-salon-dark/60 font-light line-clamp-3 leading-relaxed">
                          {product.description}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-gold-500/5 flex justify-between items-center">
                        <div>
                          <p className="text-[9px] text-salon-dark/40 uppercase tracking-widest font-light">Harga Ready</p>
                          <p className="text-base font-bold text-gold-600 font-mono">
                            IDR {product.price.toLocaleString("id-ID")}
                          </p>
                        </div>
                        <Link
                          href={`/catalog/${product.id}`}
                          className="px-4 py-2 rounded-full border border-gold-500/30 text-xs font-semibold text-gold-700 uppercase tracking-wider hover:bg-gold-500 hover:text-salon-cream transition-all duration-300"
                        >
                          Beli
                        </Link>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
