"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone, Menu, X, ArrowRight } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Overview", href: "#overview" },
  { name: "Highlights", href: "#highlights" },
  { name: "Amenities", href: "#amenities" },
  { name: "Price", href: "#price" },
  { name: "Floor Plans", href: "#floor-plans" },
  { name: "Location", href: "#location" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Add subtle shadow on scroll for luxury feel
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const whatsappUrl = "https://wa.me/917042080055/?text=Hi,%20I%20would%20like%20to%20know%20more%20details%20about%20Northwind%20Estate%20Residences.";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[#FAF9F5] border-b border-[#D4AF37]/30 ${
        scrolled ? "shadow-[0_10px_30px_rgba(0,0,0,0.06)] py-2.5" : "py-3.5 sm:py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        
        {/* ================= LEFT: Brand Logo (Expanded width to prevent crowding) ================= */}
        <Link href="/" className="flex items-center shrink-0">
          <div className="relative w-48 sm:w-56 h-10 sm:h-11">
            <Image
              src="/logo.png"
              alt="Northwind Estates"
              fill
              priority
              className="object-contain object-left"
            />
          </div>
        </Link>

        {/* ================= DESKTOP NAVIGATION LINKS ================= */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-[11px] xl:text-xs font-semibold uppercase tracking-wider text-[#0A1128]/80 hover:text-[#B8860B] transition-colors relative py-1 group whitespace-nowrap"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#D4AF37] transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* ================= RIGHT: Action Buttons (Call & WhatsApp) ================= */}
        <div className="hidden md:flex items-center gap-2.5 shrink-0">
          {/* Call Button */}
          <a
            href="tel:+919910374156"
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-[#D4AF37]/40 text-[#0A1128] hover:border-[#1E3A8A] hover:shadow-md transition-all group"
          >
            <div className="w-6 h-6 rounded-full bg-[#1E3A8A]/5 flex items-center justify-center text-[#1E3A8A] group-hover:bg-[#1E3A8A] group-hover:text-white transition-colors shrink-0">
              <Phone className="w-3 h-3" />
            </div>
            <span className="text-[11px] xl:text-xs font-bold tracking-wide">+91 99103 74156</span>
          </a>

          {/* WhatsApp Button */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#1E3A8A] hover:bg-[#152a65] text-white border border-[#D4AF37] shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
          >
            <div className="relative w-4 h-4 shrink-0">
              <Image
                src="/wh.png"
                alt="WhatsApp"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-[11px] xl:text-xs font-bold tracking-wide">WhatsApp Now</span>
          </a>
        </div>

        {/* ================= MOBILE HAMBURGER & WHATSAPP BUTTON ================= */}
        <div className="flex items-center gap-2 lg:hidden">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-xl bg-[#1E3A8A] text-white border border-[#D4AF37] shadow"
            aria-label="WhatsApp"
          >
            <div className="relative w-4 h-4">
              <Image src="/wh.png" alt="WhatsApp" fill className="object-contain" />
            </div>
          </a>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-xl bg-white border border-[#D4AF37]/40 text-[#0A1128] hover:bg-slate-100 transition-colors"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-5 h-5 text-[#1E3A8A]" /> : <Menu className="w-5 h-5 text-[#1E3A8A]" />}
          </button>
        </div>

      </div>

      {/* ================= MOBILE DRAWER MENU ================= */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-[#FAF9F5] border-b border-[#D4AF37]/40 shadow-2xl py-6 px-6 lg:hidden flex flex-col gap-4 animate-fadeIn">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-sm font-semibold uppercase tracking-wider text-[#0A1128] hover:text-[#B8860B] py-2 border-b border-slate-200/60 flex items-center justify-between"
              >
                <span>{link.name}</span>
                <ArrowRight className="w-4 h-4 text-[#D4AF37]" />
              </Link>
            ))}
          </div>

          <div className="pt-4 flex flex-col gap-3">
            <a
              href="tel:+919910374156"
              className="flex items-center justify-center gap-3 py-3.5 px-4 rounded-xl bg-white border border-[#D4AF37]/40 text-[#0A1128] font-semibold text-sm shadow-sm"
            >
              <Phone className="w-4 h-4 text-[#1E3A8A]" />
              <span>Call: +91 99103 74156</span>
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 py-3.5 px-4 rounded-xl bg-[#1E3A8A] text-white border border-[#D4AF37] font-semibold text-sm shadow-md"
            >
              <div className="relative w-5 h-5">
                <Image src="/wh.png" alt="WhatsApp" fill className="object-contain" />
              </div>
              <span>Connect on WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}