import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { AppProvider } from "@/context/AppContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SalonGlass Cabinet | Kemewahan Lemari Kaca Display Salon Kecantikan",
  description: "E-commerce eksklusif pemesanan dan kustomisasi lemari kaca display premium untuk salon kecantikan, spa, dan klinik estetika. Hubungi kami untuk ukuran custom dengan estimasi harga instan.",
  keywords: ["lemari kaca salon", "display cabinet salon", "glass cabinet custom", "perabot salon premium", "kaca tempered salon"],
  authors: [{ name: "SalonGlass Cabinet" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${playfair.variable} ${inter.variable} h-full scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-salon-cream text-salon-dark antialiased">
        <AppProvider>
          <Navbar />
          <main className="flex-grow flex flex-col">{children}</main>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}
