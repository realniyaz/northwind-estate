"use client";

import Script from "next/script";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle, Phone, Mail, ArrowLeft } from "lucide-react";

export default function ThankYouPage() {
  const whatsappUrl = "https://wa.me/917042080055/?text=Hi,%20I%20just%20registered%20on%20Northwind%20Wellness%20and%20would%20like%20to%20know%20more%20details.";

  return (
    <main className="min-h-screen bg-[#FAF9F5] text-[#0A1128] flex flex-col items-center justify-center px-4 py-8 sm:py-12 relative overflow-hidden">
      
      {/* Google Ads Conversion Event Snippet */}
      <Script id="google-ads-conversion" strategy="afterInteractive">
        {`
          if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
            gtag('event', 'conversion', {
              'send_to': 'AW-18243414829/S1AyCPOR0sAcEK3WkftD'
            });
          }
        `}
      </Script>

      {/* Ambient Luxury Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] h-[350px] sm:h-[600px] bg-[#1E3A8A]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-[#D4AF37]/10 rounded-full blur-[80px] pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-xl w-full bg-white border border-[#D4AF37]/40 rounded-3xl shadow-[0_20px_50px_rgba(30,58,138,0.08)] p-6 sm:p-10 md:p-12 text-center relative z-10">
        
        {/* Success Icon Badge */}
        <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 bg-[#1E3A8A]/5 border border-[#D4AF37]/40 rounded-full flex items-center justify-center mb-6 shadow-inner">
          <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-[#1E3A8A]" />
        </div>

        {/* Heading & Subtitle */}
        <span className="text-xs uppercase tracking-[0.35em] text-[#B8860B] font-semibold mb-2 block">
          Northwind Wellness Residences
        </span>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#0A1128] mb-4 tracking-wide">
          Thank You For Registering
        </h1>
        
        <p className="text-[#0A1128]/70 text-sm sm:text-base mb-8 leading-relaxed max-w-md mx-auto font-light">
          Your expression of interest has been successfully recorded. Our luxury real estate advisor will get in touch with you shortly with complete pricing sheets, master plans, and exclusive site visit details.
        </p>

        {/* Quick Contact Box */}
        <div className="bg-[#FAF9F5] border border-[#D4AF37]/30 rounded-2xl p-4 sm:p-5 mb-8 grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
          <a 
            href="tel:+919910374156" 
            className="flex items-center gap-3 p-3 bg-white rounded-xl border border-[#D4AF37]/20 hover:border-[#D4AF37] hover:shadow-md transition-all group"
          >
            <div className="w-9 h-9 rounded-full bg-[#1E3A8A]/5 flex items-center justify-center text-[#1E3A8A] group-hover:bg-[#1E3A8A] group-hover:text-[#D4AF37] transition-colors shrink-0">
              <Phone className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="text-[11px] text-[#0A1128]/60 block uppercase tracking-wider font-medium">Direct Helpline</span>
              <span className="text-xs sm:text-sm font-semibold text-[#0A1128] truncate block">+91 99103 74156</span>
            </div>
          </a>

          <a 
            href="mailto:realtyfmleads@gmail.com" 
            className="flex items-center gap-3 p-3 bg-white rounded-xl border border-[#D4AF37]/20 hover:border-[#D4AF37] hover:shadow-md transition-all group"
          >
            <div className="w-9 h-9 rounded-full bg-[#1E3A8A]/5 flex items-center justify-center text-[#1E3A8A] group-hover:bg-[#1E3A8A] group-hover:text-[#D4AF37] transition-colors shrink-0">
              <Mail className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <span className="text-[11px] text-[#0A1128]/60 block uppercase tracking-wider font-medium">Email Support</span>
              <span className="text-xs sm:text-sm font-semibold text-[#0A1128] truncate block">realtyfmleads@gmail.com</span>
            </div>
          </a>
        </div>

        {/* Centered WhatsApp Action Button (Royal Blue with Gold Border & native wh.png) */}
        <div className="flex flex-col items-center justify-center mb-8">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto min-w-[280px] inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#1E3A8A] hover:bg-[#152a65] text-white font-semibold rounded-2xl border-2 border-[#D4AF37] shadow-[0_10px_25px_rgba(30,58,138,0.2)] hover:shadow-[0_15px_30px_rgba(30,58,138,0.3)] transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <div className="relative w-6 h-6 shrink-0">
              <Image 
                src="/wh.png" 
                alt="WhatsApp" 
                fill 
                className="object-contain"
              />
            </div>
            <span className="text-sm sm:text-base tracking-wide">Connect on WhatsApp</span>
          </a>
        </div>

        {/* Return Home Link */}
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#0A1128] hover:text-[#B8860B] transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 text-[#D4AF37] group-hover:-translate-x-1 transition-transform" />
            <span>Return to Homepage</span>
          </Link>
        </div>

      </div>

      {/* Footer Disclaimer */}
      <footer className="mt-8 text-[11px] text-[#0A1128]/50 text-center max-w-sm px-4 leading-relaxed">
        © 2026 Northwind Wellness Residences. All rights reserved. Powered by Investor Arena Consulting Pvt. Ltd.
      </footer>
    </main>
  );
}