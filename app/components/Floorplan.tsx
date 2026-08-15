"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Sparkles, Lock, ArrowRight, X, ShieldCheck, Loader2, FileText } from "lucide-react";

const floorplans = [
  {
    id: "3bhk",
    title: "3 BHK Luxury Residence",
    saleableArea: "1,675 – 1,935 Sq.Ft.",
    src: "/fp1.png",
    tag: "Most Popular",
  },
  {
    id: "4bhk",
    title: "4 BHK Grand Residence",
    saleableArea: "2,550 Sq.Ft.",
    src: "/fp2.png",
    tag: "Ultra-Exclusive",
  },
];

export default function Floorplan() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");

  // Form states
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleOpenModal = (planTitle: string) => {
    setSelectedPlan(planTitle);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const response = await fetch("/api/send-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, floorplanRequested: selectedPlan }),
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
    <section id="floor-plans" className="py-20 sm:py-28 bg-[#FAF9F5] text-[#0A1128] relative overflow-hidden">
      
      {/* Background ambient gold glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#D4AF37]/40 shadow-sm mb-4">
            <Sparkles className="w-4 h-4 text-[#B8860B]" />
            <span className="text-xs uppercase tracking-[0.25em] text-[#B8860B] font-bold">
              Architectural Blueprints
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#0A1128] tracking-wide mb-4">
            Master Floor Plans
          </h2>
          <p className="text-[#0A1128]/70 text-sm sm:text-base leading-relaxed font-light">
            Explore meticulously designed layouts featuring 11.25-ft ceiling heights, grand balconies, and private core access.
          </p>
        </div>

        {/* ================= MOBILE TAB SELECTOR ================= */}
        <div className="flex sm:hidden justify-center gap-2 mb-8">
          {floorplans.map((plan, idx) => (
            <button
              key={plan.id}
              onClick={() => setActiveTab(idx)}
              className={`px-5 py-2.5 rounded-xl font-semibold text-xs transition-all ${
                idx === activeTab
                  ? "bg-[#1E3A8A] text-white border-2 border-[#D4AF37] shadow-md"
                  : "bg-white text-[#0A1128] border border-[#D4AF37]/40"
              }`}
            >
              {plan.title.split(" ")[0]} {plan.title.split(" ")[1]}
            </button>
          ))}
        </div>

        {/* ================= SIDE BY SIDE DESKTOP VIEW & MOBILE ACTIVE TAB ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
          {floorplans.map((plan, idx) => {
            // On mobile, only show the active tab; on desktop, show both side-by-side
            const isMobileVisible = idx === activeTab;
            
            return (
              <div
                key={plan.id}
                className={`flex-col bg-white border-2 border-[#D4AF37]/40 rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(30,58,138,0.06)] relative overflow-hidden group hover:border-[#1E3A8A] transition-all ${
                  isMobileVisible ? "flex" : "hidden md:flex"
                }`}
              >
                {/* Top Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] uppercase tracking-widest text-[#B8860B] font-bold bg-[#FAF9F5] px-3 py-1 rounded-full border border-[#D4AF37]/30">
                    {plan.tag}
                  </span>
                  <span className="text-xs font-semibold text-[#1E3A8A] bg-[#1E3A8A]/5 px-3 py-1 rounded-full border border-[#1E3A8A]/20">
                    {plan.saleableArea}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#0A1128] mb-4">
                  {plan.title}
                </h3>

                {/* ================= BLURRED IMAGE CONTAINER WITH LOCK ================= */}
                <div 
                  onClick={() => handleOpenModal(plan.title)}
                  className="relative w-full h-[260px] sm:h-[300px] rounded-2xl overflow-hidden border border-[#D4AF37]/30 bg-slate-900 cursor-pointer group/img mb-6 shadow-inner"
                >
                  <Image
                    src={plan.src}
                    alt={plan.title}
                    fill
                    className="object-contain p-2 filter blur-[6px] brightness-90 group-hover/img:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Dark Glass Overlay with Lock Sign */}
                  <div className="absolute inset-0 bg-[#0A1128]/40 backdrop-blur-[2px] flex flex-col items-center justify-center p-6 text-center transition-colors group-hover/img:bg-[#0A1128]/50">
                    <div className="w-14 h-14 rounded-2xl bg-white/90 backdrop-blur-md border border-[#D4AF37] flex items-center justify-center text-[#1E3A8A] shadow-2xl mb-3 group-hover/img:scale-110 transition-transform">
                      <Lock className="w-6 h-6 text-[#B8860B]" />
                    </div>
                    <span className="text-sm font-semibold text-white tracking-wide mb-1">
                      Confidential Blueprint
                    </span>
                    <span className="text-xs text-amber-200/90 font-light">
                      Click to unlock high-resolution master plan
                    </span>
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  onClick={() => handleOpenModal(plan.title)}
                  className="w-full py-4 px-6 bg-[#1E3A8A] hover:bg-[#152a65] text-white font-semibold text-sm rounded-xl border-2 border-[#D4AF37] shadow-[0_10px_25px_rgba(30,58,138,0.2)] hover:shadow-[0_15px_30px_rgba(30,58,138,0.35)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 cursor-pointer group/btn mt-auto"
                >
                  <FileText className="w-4 h-4 text-[#D4AF37]" />
                  <span>Get Floorplan & Pricing</span>
                  <ArrowRight className="w-4 h-4 text-[#D4AF37] group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            );
          })}
        </div>

      </div>

      {/* ================= UNLOCK FLOORPLAN POPUP MODAL ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg bg-[#FAF9F5] text-[#0A1128] border-2 border-[#D4AF37] rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden">
            
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
              <div className="mx-auto w-12 h-12 rounded-full bg-[#1E3A8A]/10 border border-[#D4AF37]/50 flex items-center justify-center text-[#1E3A8A] mb-3">
                <Lock className="w-5 h-5 text-[#B8860B]" />
              </div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#B8860B] font-bold block mb-1">
                Northwind Wellness Residences
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#0A1128]">
                Unlock High-Res Floorplan
              </h3>
              <p className="text-[#0A1128]/70 text-xs sm:text-sm mt-1">
                Selected Plan: <strong className="text-[#1E3A8A]">{selectedPlan}</strong>
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
                    <span>Unlocking Blueprint...</span>
                  </>
                ) : (
                  <>
                    <span>Unlock & Download Floorplan</span>
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