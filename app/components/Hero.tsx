"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2, Loader2 } from "lucide-react";

const banners = [
  {
    src: "/banner1.png",
    subtitle: "Yamuna Expressway's Crown Jewel",
    title: "Northwind Estate Residences",
  },
  {
    src: "/banner2.png",
    subtitle: "75% Green & Open Wellness Spaces",
    title: "A Sanctuary of Natural Living",
  },
  {
    src: "/banner3.png",
    subtitle: "Ultra-Exclusive 2 Apartments Per Core",
    title: "Uncompromised Privacy & Elegance",
  },
];

export default function Hero() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Form states
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Automatically cycle banners cinematically every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
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

      // Redirect to Thank You page on success
      router.push("/thank-you");
    } catch (err: any) {
      setErrorMsg(err.message || "Something went wrong. Please call us directly.");
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen bg-[#070D1D] text-slate-100 flex flex-col justify-start lg:justify-between overflow-hidden">
      
      {/* ================= MOBILE VIEW: Full Banner First (No text over it) ================= */}
      <div className="block lg:hidden w-full h-[55vh] sm:h-[60vh] relative overflow-hidden shrink-0">
        {banners.map((banner, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100 scale-100 z-10" : "opacity-0 scale-105 z-0"
            }`}
          >
            <Image
              src={banner.src}
              alt={banner.title}
              fill
              priority={index === 0}
              className="object-cover"
            />
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#070D1D] via-transparent to-[#070D1D]/30" />
          </div>
        ))}
        {/* Slide Indicators on Mobile Banner */}
        <div className="absolute bottom-3 left-0 right-0 z-20 flex justify-center gap-1.5">
          {banners.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentSlide ? "w-8 bg-[#D4AF37]" : "w-2 bg-white/50"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* ================= DESKTOP BACKGROUND CINEMATIC SLIDESHOW ================= */}
      <div className="hidden lg:block absolute inset-0 z-0 overflow-hidden">
        {banners.map((banner, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1500 ease-in-out transform transition-transform duration-[6000ms] ${
              index === currentSlide ? "opacity-100 scale-105" : "opacity-0 scale-100"
            }`}
          >
            <Image
              src={banner.src}
              alt={banner.title}
              fill
              priority={index === 0}
              className="object-cover"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-[#070D1D]/85 via-[#070D1D]/50 to-[#070D1D]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070D1D]/70 via-transparent to-[#070D1D]/30" />
      </div>

      {/* Ambient gold glow accents */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-[120px] pointer-events-none" />

      {/* ================= MAIN CONTENT CONTAINER ================= */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 lg:py-16 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto">
        
        {/* LEFT COLUMN: Branding, Tagline & Description */}
        <div className="lg:col-span-7 text-center lg:text-left">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/30 border border-[#D4AF37]/50 backdrop-blur-md mb-4 shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
              Sector 22D, Yamuna Expressway
            </span>
          </div>

          {/* Dynamic Subtitle / Title change with banner */}
          <div className="min-h-[80px] sm:min-h-[100px] mb-3">
            <span className="text-xs sm:text-sm uppercase tracking-[0.3em] text-amber-200/90 font-medium block mb-1">
              {banners[currentSlide].subtitle}
            </span>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-wide leading-tight">
              {banners[currentSlide].title}
            </h1>
          </div>

          <p className="text-slate-200 text-xs sm:text-base lg:text-lg mb-6 leading-relaxed max-w-2xl font-light mx-auto lg:mx-0">
            Experience first-ever glass facade luxury residences with grand 11.25-ft ceiling heights, 
            75% open wellness green spaces, and ultra-exclusive planning with only 2 apartments per core. 
            Priced attractively starting at <strong className="text-[#D4AF37] font-semibold">₹8,500/Sq.Ft.</strong> (All-Inclusive).
          </p>

          {/* Correctly Positioned 3 Key Highlights Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 max-w-lg mx-auto lg:mx-0 mb-6 lg:mb-8">
            <div className="flex items-center justify-center sm:justify-start gap-2.5 p-2.5 sm:p-3 rounded-xl bg-black/30 border border-white/15 backdrop-blur-md">
              <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span className="text-xs font-medium text-slate-100">G+30 Glass Facade</span>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-2.5 p-2.5 sm:p-3 rounded-xl bg-black/30 border border-white/15 backdrop-blur-md">
              <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span className="text-xs font-medium text-slate-100">65-Acre Clubhouse</span>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-2.5 p-2.5 sm:p-3 rounded-xl bg-black/30 border border-white/15 backdrop-blur-md">
              <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span className="text-xs font-medium text-slate-100">12 Mins to Airport</span>
            </div>
          </div>

          {/* Desktop Slide Indicators */}
          <div className="hidden lg:flex items-center gap-3">
            {banners.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentSlide ? "w-10 bg-[#D4AF37]" : "w-3 bg-white/40 hover:bg-white/70"
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>

        </div>

        {/* RIGHT COLUMN: Premium Lead Form (Off-White Luxury Theme) */}
        <div className="lg:col-span-5 w-full">
          <div className="bg-[#FAF9F5] text-[#0A1128] backdrop-blur-2xl border-2 border-[#D4AF37]/50 rounded-3xl p-5 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.5)] relative overflow-hidden">
            
            {/* Top decorative gold glow line */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

            <div className="text-center mb-5">
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#B8860B] font-bold block mb-1">
                Exclusive Invitation
              </span>
              <h3 className="text-lg sm:text-2xl font-serif font-bold text-[#0A1128]">
                Request E-Brochure & Pricing
              </h3>
              <p className="text-[#0A1128]/70 text-xs sm:text-sm mt-1">
                Connect with our senior real estate advisors instantly.
              </p>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-700 text-xs text-center">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5">
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
                  className="w-full px-3.5 py-3 bg-white border border-[#D4AF37]/30 rounded-xl text-[#0A1128] placeholder-slate-400 text-sm focus:outline-none focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] transition-all shadow-sm"
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
                  className="w-full px-3.5 py-3 bg-white border border-[#D4AF37]/30 rounded-xl text-[#0A1128] placeholder-slate-400 text-sm focus:outline-none focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] transition-all shadow-sm"
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
                  className="w-full px-3.5 py-3 bg-white border border-[#D4AF37]/30 rounded-xl text-[#0A1128] placeholder-slate-400 text-sm focus:outline-none focus:border-[#1E3A8A] focus:ring-1 focus:ring-[#1E3A8A] transition-all shadow-sm"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3.5 px-6 bg-[#1E3A8A] hover:bg-[#152a65] text-white font-semibold text-sm sm:text-base rounded-xl border-2 border-[#D4AF37] shadow-[0_10px_25px_rgba(30,58,138,0.25)] hover:shadow-[0_15px_30px_rgba(30,58,138,0.4)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 group disabled:opacity-70 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin text-[#D4AF37]" />
                    <span>Processing Inquiry...</span>
                  </>
                ) : (
                  <>
                    <span>Get Instant Master Plan</span>
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

      </div>
    </section>
  );
}