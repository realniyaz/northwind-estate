"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Sparkles, ArrowRight, X, ShieldCheck, Loader2, CheckCircle2 } from "lucide-react";

const galleryImages = [
  { src: "/5.png", label: "Wellness Gym" },
  { src: "/a1.png", label: "Luxury Living Room" },
  { src: "/a2.png", label: "Grand Dining" },
  { src: "/a3.png", label: "Exclusive Reception" },
];

export default function Overview() {
  const router = useRouter();
  const [activeImage, setActiveImage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form states
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Automatically cycle gallery images every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % galleryImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const response = await fetch("/api/send-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit inquiry. Please try again.");
      }

      router.push("/thank-you");
    } catch (err: any) {
      setErrorMsg(err.message || "Something went wrong. Please call us directly.");
      setLoading(false);
    }
  };

  return (
    <section id="overview" className="py-20 bg-[#FAF9F5] text-[#0A1128] relative overflow-hidden">
      
      {/* Background ambient gold glow */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#D4AF37]/40 shadow-sm mb-4">
            <div className="relative w-4 h-4">
              <Image src="/icon.png" alt="Icon" fill className="object-contain" />
            </div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#B8860B] font-bold">
              Project Master Overview
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#0A1128] tracking-wide mb-4">
            Northwind Estate Residences
          </h2>
          <p className="text-[#0A1128]/70 text-sm sm:text-base leading-relaxed font-light">
            A landmark ₹650+ Crore planned development spread across 5 acres with 75% green and open wellness spaces in Sector 22D, Yamuna Expressway.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* LEFT: Project Mid-Size Description & Key Pillars */}
          <div className="lg:col-span-6 space-y-6">
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#0A1128] leading-snug">
              The First-Ever Glass Facade Residential Apartments on Yamuna Expressway
            </h3>
            
            <p className="text-[#0A1128]/75 text-sm sm:text-base leading-relaxed font-light">
              Crafted by world-class architects, Northwind Estate redefines luxury living through uncompromised privacy, featuring an ultra-exclusive layout with only 2 apartments per core. Enjoy grand 11.25-ft floor-to-ceiling heights, Italian marble flooring, 5-star inverter air conditioning, and a massive 65-acre luxury clubhouse.
            </p>

            {/* Feature Checkpoints */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-[#D4AF37]/30 shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-[#B8860B] shrink-0" />
                <span className="text-xs font-semibold text-[#0A1128]">G+30 Iconic Towers</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-[#D4AF37]/30 shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-[#B8860B] shrink-0" />
                <span className="text-xs font-semibold text-[#0A1128]">20x5 Investor Payment Plan</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-[#D4AF37]/30 shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-[#B8860B] shrink-0" />
                <span className="text-xs font-semibold text-[#0A1128]">12 Mins to Jewar Airport</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-[#D4AF37]/30 shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-[#B8860B] shrink-0" />
                <span className="text-xs font-semibold text-[#0A1128]">Starting ₹8,500 / Sq.Ft.</span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#1E3A8A] hover:bg-[#152a65] text-white font-semibold text-sm sm:text-base rounded-2xl border-2 border-[#D4AF37] shadow-[0_10px_25px_rgba(30,58,138,0.2)] hover:shadow-[0_15px_30px_rgba(30,58,138,0.35)] transition-all transform hover:-translate-y-0.5 cursor-pointer group"
              >
                <span>Enquire Now</span>
                <ArrowRight className="w-4 h-4 text-[#D4AF37] group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

          </div>

          {/* RIGHT: Image Gallery with Custom Icon Badge & Thumbnail Selector */}
          <div className="lg:col-span-6 flex flex-col gap-4">
            
            {/* Main Active Gallery Display with smooth cross-fade */}
            <div className="relative w-full h-[320px] sm:h-[400px] rounded-3xl overflow-hidden border-2 border-[#D4AF37]/40 shadow-2xl bg-white">
              {galleryImages.map((img, idx) => (
                <div
                  key={idx}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                    idx === activeImage ? "opacity-100 z-10" : "opacity-0 z-0"
                  }`}
                >
                  <Image
                    src={img.src}
                    alt={img.label}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                </div>
              ))}

              {/* Floating Custom Icon Badge */}
              <div className="absolute top-4 right-4 z-20 w-12 h-12 rounded-2xl bg-white/90 backdrop-blur-md border border-[#D4AF37]/50 flex items-center justify-center shadow-lg">
                <div className="relative w-7 h-7">
                  <Image src="/icon.png" alt="Brand Icon" fill className="object-contain" />
                </div>
              </div>

              {/* Image Label Overlay */}
              <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between text-white">
                <span className="text-sm sm:text-base font-serif font-semibold tracking-wide bg-black/40 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20">
                  {galleryImages[activeImage].label}
                </span>
                <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold bg-black/40 backdrop-blur-md px-3 py-2 rounded-xl border border-white/20">
                  0{activeImage + 1} / 0{galleryImages.length}
                </span>
              </div>
            </div>

            {/* Thumbnail Selectors */}
            <div className="grid grid-cols-4 gap-3">
              {galleryImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`relative h-20 sm:h-24 rounded-2xl overflow-hidden border-2 transition-all cursor-pointer ${
                    idx === activeImage
                      ? "border-[#1E3A8A] ring-2 ring-[#D4AF37] scale-105 shadow-md"
                      : "border-[#D4AF37]/30 opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image src={img.src} alt={img.label} fill className="object-cover" />
                </button>
              ))}
            </div>

          </div>

        </div>

      </div>

      {/* ================= ENQUIRE NOW POPUP MODAL ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg bg-[#FAF9F5] border-2 border-[#D4AF37] rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden">
            
            {/* Top decorative gold line */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white border border-[#D4AF37]/40 text-[#0A1128] hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#B8860B] font-bold block mb-1">
                Northwind Wellness Residences
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#0A1128]">
                Request Project Overview & Pricing
              </h3>
              <p className="text-[#0A1128]/70 text-xs sm:text-sm mt-1">
                Fill in your details to receive complete master plans instantly.
              </p>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-700 text-xs text-center">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#0A1128]/80 mb-1 uppercase tracking-wider">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-[#D4AF37]/30 rounded-xl text-[#0A1128] placeholder-slate-400 text-sm focus:outline-none focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] transition-all shadow-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0A1128]/80 mb-1 uppercase tracking-wider">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-[#D4AF37]/30 rounded-xl text-[#0A1128] placeholder-slate-400 text-sm focus:outline-none focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] transition-all shadow-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0A1128]/80 mb-1 uppercase tracking-wider">
                  Phone Number (with Country Code)
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+91 99103 74156"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-[#D4AF37]/30 rounded-xl text-[#0A1128] placeholder-slate-400 text-sm focus:outline-none focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] transition-all shadow-sm"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-4 px-6 bg-[#1E3A8A] hover:bg-[#152a65] text-white font-semibold text-sm sm:text-base rounded-xl border-2 border-[#D4AF37] shadow-[0_10px_25px_rgba(30,58,138,0.25)] hover:shadow-[0_15px_30px_rgba(30,58,138,0.4)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 group disabled:opacity-70 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin text-[#D4AF37]" />
                    <span>Processing Request...</span>
                  </>
                ) : (
                  <>
                    <span>Submit & Get E-Brochure</span>
                    <ArrowRight className="w-4 h-4 text-[#D4AF37] group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-[#0A1128]/70 text-center">
              <ShieldCheck className="w-4 h-4 text-[#B8860B] shrink-0" />
              <span>100% Privacy Guaranteed. Direct Developer Booking.</span>
            </div>

          </div>
        </div>
      )}

    </section>
  );
}