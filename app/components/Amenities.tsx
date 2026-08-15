"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Sparkles, ArrowRight, X, ShieldCheck, Loader2, CheckCircle2 } from "lucide-react";

const amenitiesList = [
  {
    title: "High-Performance Wellness Gym",
    description: "State-of-the-art fitness equipment curated for holistic health, high-energy workouts, and daily wellness routines.",
    src: "/5.png",
  },
  {
    title: "Exquisite Luxury Living Lounge",
    description: "Expansive living spaces designed with Italian marble flooring, grand floor-to-ceiling glass facades, and panoramic vistas.",
    src: "/a1.png",
  },
  {
    title: "Grand Fine Dining Space",
    description: "Sophisticated dining arenas crafted for memorable family gatherings under magnificent statement chandeliers.",
    src: "/a2.png",
  },
  {
    title: "Exclusive Concierge Reception",
    description: "Double-height grand entrance lobby delivering five-star hospitality, absolute privacy, and welcoming warmth.",
    src: "/a3.png",
  },
  {
    title: "Indoor Games & Recreation Arena",
    description: "Dedicated spaces for billiards, table tennis, air hockey, and community leisure for all age groups.",
    src: "/a4.png",
  },
  {
    title: "Private Cinematic Theatre",
    description: "Immersive private screening lounge with acoustic wall paneling and plush luxury recliners for private movie nights.",
    src: "/a6.png",
  },
];

export default function Amenities() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form states for Enquiry Modal
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Automatically cycle slides on mobile / general view every 3.5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % amenitiesList.length);
    }, 3500);
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
    <section id="amenities" className="py-20 sm:py-28 bg-[#FAF9F5] text-[#0A1128] relative overflow-hidden">
      
      {/* Background ambient gold glow */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#D4AF37]/40 shadow-sm mb-4">
            <Sparkles className="w-4 h-4 text-[#B8860B]" />
            <span className="text-xs uppercase tracking-[0.25em] text-[#B8860B] font-bold">
              World-Class Wellness & Leisure
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#0A1128] tracking-wide mb-4">
            Curated Clubhouse Amenities
          </h2>
          <p className="text-[#0A1128]/70 text-sm sm:text-base leading-relaxed font-light">
            Indulge in a 65-acre grand luxury clubhouse experience designed for holistic rejuvenation, fitness, and elite social gatherings.
          </p>
        </div>

        {/* ================= MOBILE AUTO-SLIDESHOW VIEW ================= */}
        <div className="block lg:hidden mb-10">
          <div className="relative w-full h-[320px] rounded-3xl overflow-hidden border-2 border-[#D4AF37]/40 shadow-xl bg-white mb-4">
            {amenitiesList.map((item, idx) => (
              <div
                key={idx}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  idx === activeTab ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              >
                <Image src={item.src} alt={item.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold block mb-1">
                    Amenity 0{idx + 1} / 0{amenitiesList.length}
                  </span>
                  <h3 className="text-lg font-serif font-bold mb-1">{item.title}</h3>
                  <p className="text-xs text-slate-200 line-clamp-2 font-light">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Slide Indicators */}
          <div className="flex justify-center gap-1.5">
            {amenitiesList.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === activeTab ? "w-8 bg-[#1E3A8A]" : "w-2 bg-slate-300"
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* ================= DESKTOP INTERACTIVE TABS & PREVIEW GRID ================= */}
        <div className="hidden lg:grid grid-cols-12 gap-8 items-center mb-12">
          
          {/* Left Navigation Buttons */}
          <div className="col-span-5 space-y-3">
            {amenitiesList.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
                  idx === activeTab
                    ? "bg-[#1E3A8A] text-white border-[#D4AF37] shadow-lg translate-x-2"
                    : "bg-white text-[#0A1128] border-[#D4AF37]/30 hover:border-[#1E3A8A]/50 shadow-sm"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs ${
                    idx === activeTab ? "bg-white/20 text-[#D4AF37]" : "bg-[#1E3A8A]/10 text-[#1E3A8A]"
                  }`}>
                    0{idx + 1}
                  </div>
                  <span className="font-serif font-semibold tracking-wide text-sm xl:text-base">
                    {item.title}
                  </span>
                </div>
                <ArrowRight className={`w-4 h-4 transition-transform ${idx === activeTab ? "text-[#D4AF37] translate-x-1" : "text-slate-400"}`} />
              </button>
            ))}
          </div>

          {/* Right Active Image Showcase */}
          <div className="col-span-7">
            <div className="relative w-full h-[460px] rounded-3xl overflow-hidden border-2 border-[#D4AF37]/40 shadow-2xl bg-white">
              {amenitiesList.map((item, idx) => (
                <div
                  key={idx}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                    idx === activeTab ? "opacity-100 z-10" : "opacity-0 z-0"
                  }`}
                >
                  <Image src={item.src} alt={item.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  
                  <div className="absolute bottom-8 left-8 right-8 text-white">
                    <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-bold block mb-2">
                      Exclusive Feature
                    </span>
                    <h3 className="text-2xl font-serif font-bold mb-2">{item.title}</h3>
                    <p className="text-sm text-slate-200 font-light max-w-xl leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* CTA Button */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#1E3A8A] hover:bg-[#152a65] text-white font-semibold text-sm sm:text-base rounded-2xl border-2 border-[#D4AF37] shadow-[0_10px_25px_rgba(30,58,138,0.2)] hover:shadow-[0_15px_30px_rgba(30,58,138,0.35)] transition-all transform hover:-translate-y-0.5 cursor-pointer group"
          >
            <span>Enquire About Amenities & Pricing</span>
            <ArrowRight className="w-4 h-4 text-[#D4AF37] group-hover:translate-x-1 transition-transform" />
          </button>
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
                Request Amenities & Brochure
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