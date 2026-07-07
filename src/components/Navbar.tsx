"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, Menu, X, User, ShieldAlert } from "lucide-react";
import { useApp } from "@/context/AppContext";

export default function Navbar() {
  const { cart } = useApp();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  const navLinks = [
    { name: "Beranda", href: "/" },
    { name: "Katalog", href: "/catalog" },
    { name: "Custom Cabinet", href: "/custom" },
    { name: "Dashboard Pembeli", href: "/dashboard" },
  ];

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <nav className="sticky top-0 z-50 w-full transition-all duration-300 bg-white/90 backdrop-blur-md border-b border-zinc-200/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-1">
              <span className="font-serif text-2xl font-bold tracking-wider">
                <span className="gold-gradient-text">SalonGlass</span>
                <span className="text-salon-dark/80 text-lg font-light ml-1">Cabinet</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium tracking-wide uppercase transition-all duration-300 ${
                  isActive(link.href)
                    ? "text-gold-500 font-semibold border-b-2 border-gold-500 pb-1"
                    : "text-salon-dark/70 hover:text-gold-500 pb-1"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Icons & Actions */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/admin"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                isActive("/admin")
                  ? "bg-gold-500 text-salon-cream"
                  : "bg-gold-500/10 text-gold-700 hover:bg-gold-500/20"
              }`}
            >
              <ShieldAlert className="h-3.5 w-3.5" />
              Admin
            </Link>

            <Link href="/cart" className="relative group p-2 rounded-full hover:bg-gold-500/5 transition-all">
              <ShoppingBag className="h-6 w-6 text-salon-dark group-hover:text-gold-500 transition-colors" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gold-500 text-[10px] font-bold text-salon-cream ring-2 ring-salon-cream animate-pulse">
                  {cartItemsCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu & Cart Buttons */}
          <div className="flex items-center space-x-4 md:hidden">
            <Link href="/cart" className="relative p-2 rounded-full hover:bg-gold-500/5">
              <ShoppingBag className="h-6 w-6 text-salon-dark" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gold-500 text-[10px] font-bold text-salon-cream ring-2 ring-salon-cream">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-salon-dark hover:text-gold-500 transition-colors focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div className="md:hidden animate-fade-in bg-white border-t border-zinc-200/50">
          <div className="space-y-1 px-4 pb-6 pt-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2.5 rounded-lg text-base font-medium tracking-wide transition-all ${
                  isActive(link.href)
                    ? "bg-gold-500/10 text-gold-600 font-semibold"
                    : "text-salon-dark/80 hover:bg-gold-500/5 hover:text-gold-500"
                }`}
              >
                {link.name}
              </Link>
            ))}
            
            <div className="h-px bg-gold-500/10 my-3"></div>

            <Link
              href="/admin"
              onClick={() => setIsOpen(false)}
              className={`flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg text-sm font-semibold uppercase tracking-wider transition-all duration-300 ${
                isActive("/admin")
                  ? "bg-gold-500 text-salon-cream"
                  : "bg-gold-500/10 text-gold-700 hover:bg-gold-500/20"
              }`}
            >
              <ShieldAlert className="h-4 w-4" />
              Admin Portal
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
