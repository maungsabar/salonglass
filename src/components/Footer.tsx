import React from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, ShieldCheck, Truck, Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-salon-dark text-salon-cream border-t border-gold-500/10 mt-auto">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo & Brand Intro */}
          <div className="space-y-4 md:col-span-1">
            <span className="font-serif text-2xl font-bold tracking-wider">
              <span className="gold-gradient-text">SalonGlass</span>
              <span className="text-salon-cream/80 text-lg font-light ml-1">Cabinet</span>
            </span>
            <p className="text-salon-cream/60 text-xs leading-relaxed font-light">
              Menghadirkan lemari display kaca tempered eksklusif yang dirancang khusus untuk memperindah salon kecantikan, klinik estetika, dan studio kuku Anda. Estetika berpadu ketangguhan.
            </p>
            <div className="flex gap-4 pt-2">
              <span className="text-xs bg-gold-500/10 text-gold-400 px-3 py-1 rounded-full border border-gold-500/20 flex items-center gap-1">
                <Sparkles className="h-3 w-3" /> Handmade Premium
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-semibold tracking-wider text-gold-400">Navigasi</h3>
            <ul className="space-y-2.5 text-xs text-salon-cream/70 font-light">
              <li>
                <Link href="/" className="hover:text-gold-400 transition-colors">Beranda</Link>
              </li>
              <li>
                <Link href="/catalog" className="hover:text-gold-400 transition-colors">Katalog Lemari Ready</Link>
              </li>
              <li>
                <Link href="/custom" className="hover:text-gold-400 transition-colors">Custom Ukuran Sendiri</Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-gold-400 transition-colors">Lacak Status Pesanan</Link>
              </li>
            </ul>
          </div>

          {/* Logistics / Shipping Zones Info */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-semibold tracking-wider text-gold-400">Informasi Logistik</h3>
            <p className="text-salon-cream/60 text-xs font-light leading-relaxed">
              Pengiriman dikirim mandiri oleh kurir toko kami langsung ke salon Anda sekaligus pemasangan/perakitan gratis di tempat.
            </p>
            <div className="bg-salon-charcoal p-3.5 rounded-lg border border-gold-500/10">
              <div className="flex justify-between items-center text-xs py-1 border-b border-salon-cream/10">
                <span className="text-salon-cream/80">Dalam Kota (Jabodetabek)</span>
                <span className="font-semibold text-gold-400">IDR 100.000</span>
              </div>
              <div className="flex justify-between items-center text-xs py-1 pt-2">
                <span className="text-salon-cream/80">Luar Kota (Jawa & DIY)</span>
                <span className="font-semibold text-gold-400">IDR 250.000</span>
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h3 className="font-serif text-lg font-semibold tracking-wider text-gold-400">Kontak & Workshop</h3>
            <ul className="space-y-3.5 text-xs text-salon-cream/70 font-light">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4.5 w-4.5 text-gold-400 flex-shrink-0 mt-0.5" />
                <span>Kawasan Industri Gading Serpong, Kav 18A, Tangerang, Banten</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4.5 w-4.5 text-gold-400" />
                <span>+62 812-9876-5432</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4.5 w-4.5 text-gold-400" />
                <span>info@salonglasscabinet.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="h-px bg-gold-500/15 my-12"></div>

        {/* Footer Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-salon-cream/40 font-light">
          <p>© {new Date().getFullYear()} SalonGlass Cabinet. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1"><ShieldCheck className="h-3.5 w-3.5 text-gold-400" /> Keamanan Tempered Glass 100%</span>
            <span className="flex items-center gap-1"><Truck className="h-3.5 w-3.5 text-gold-400" /> Pengiriman & Perakitan Khusus</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
