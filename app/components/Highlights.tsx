"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, ArrowDown, CheckCircle2 } from "lucide-react";

const banners = [
  { src: "/banner1.png", alt: "Northwind Estate Aerial View" },
  { src: "/banner2.png", alt: "Wellness Poolside & Palm Court" },
  { src: "/banner3.png", alt: "Luxury Clubhouse Lounge" },
];

const highlightPoints = [
  "Sector 22D, Yamuna Expressway (0 Distance Corridor)",
  "5 Acres Land Parcel with 75% Green & Open Spaces",
  "4 Iconic G+30 Towers (First-Ever Glass Facade on Expressway)",
  "Ultra-Exclusive Planning with Only 2 Apartments Per Core",
  "Grand 11.25-Ft Floor-to-Floor Ceiling Height",
  "Massive 65-Acre Luxury Clubhouse & Wellness Center",
  "Investor-Friendly 20×5 Payment Plan (Prices from ₹8,500/Sq.Ft.)",
  "World-Class Amenities Curated for Holistic Living",
];

export default function Highlights() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Automatically cycle banners cinematically every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="highlights" className="relative min-h-screen bg-[#070D1D] text-slate-100 py-16 sm:py-24 overflow-hidden flex flex-col justify-center">
      
      {/* ================= CINEMATIC BACKGROUND SLIDESHOW (Reduced Overlay for Clear Visibility) ================= */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {banners.map((banner, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1500 ease-in-out transform transition-transform duration-[5000ms] ${
              index === currentSlide ? "opacity-60 scale-105" : "opacity-0 scale-100"
            }`}
          >
            <Image
              src={banner.src}
              alt={banner.alt}
              fill
              priority={index === 0}
              className="object-cover"
            />
          </div>
        ))}
        {/* Significantly reduced overlay opacities so banners remain brightly visible */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#070D1D]/70 via-[#070D1D]/50 to-[#070D1D]/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#070D1D]/60 via-transparent to-[#070D1D]/60" />
      </div>

      {/* Ambient gold glow accents */}
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-[120px] pointer-events-none" />

      {/* ================= MAIN CONTENT CONTAINER ================= */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/40 border border-[#D4AF37]/50 backdrop-blur-md mb-3 shadow-lg">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
              Unmatched Distinction
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-wide mb-2 drop-shadow-md">
            Project Highlights
          </h2>
          <p className="text-slate-200 text-xs sm:text-sm font-light drop-shadow">
            Core architectural and luxury specifications that set a new benchmark on Yamuna Expressway.
          </p>
        </div>

        {/* 8 Main Points Grid (Reduced Card Size with Compact Padding) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-10">
          {highlightPoints.map((point, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 p-3.5 sm:p-4 rounded-xl bg-[#0B132B]/85 backdrop-blur-md border border-[#D4AF37]/30 shadow-[0_8px_20px_rgba(0,0,0,0.3)] hover:border-[#D4AF37] transition-all group"
            >
              <div className="w-8 h-8 rounded-lg bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] group-hover:scale-110 transition-transform shrink-0">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <span className="text-xs sm:text-sm font-medium text-slate-100 tracking-wide leading-snug">
                {point}
              </span>
            </div>
          ))}
        </div>

        {/* CTA Button to Amenities Section */}
        <div className="flex justify-center">
          <Link
            href="#amenities"
            className="inline-flex items-center gap-3 px-7 py-3.5 bg-[#1E3A8A] hover:bg-[#152a65] text-white font-semibold text-xs sm:text-sm rounded-xl border-2 border-[#D4AF37] shadow-[0_10px_25px_rgba(212,175,55,0.25)] hover:shadow-[0_15px_30px_rgba(212,175,55,0.4)] transition-all transform hover:-translate-y-0.5 cursor-pointer group"
          >
            <span>Explore Wellness Amenities</span>
            <ArrowDown className="w-4 h-4 text-[#D4AF37] group-hover:translate-y-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
}