"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, ArrowRight, X, ShieldCheck, Loader2, Tag } from "lucide-react";

const pricingData = [
  {
    type: "3 BHK Fully Furnished",
    saleableArea: "1,675 – 1,935 Sq.Ft.",
    price: "₹ 8,500 / Sq.Ft.",
    details: "Approx. ₹ 1.42 Cr – ₹ 1.64 Cr (All Inclusive)",
  },
  {
    type: "4 BHK Fully Furnished",
    saleableArea: "2,550 Sq.Ft.",
    price: "₹ 8,500 / Sq.Ft.",
    details: "Approx. ₹ 2.16 Cr (All Inclusive)",
  },
];

export default function Price() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState("");

  // Form states
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleOpenModal = (unitType: string) => {
    setSelectedUnit(unitType);
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
        body: JSON.stringify({ ...formData, unitType: selectedUnit }),
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
    <section id="price" className="py-20 sm:py-28 bg-[#070D1D] text-slate-100 relative overflow-hidden">
      
      {/* Ambient gold glow accents */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] bg-[#D4AF37]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-[#D4AF37]/40 backdrop-blur-md mb-4 shadow-lg">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
              Investment & Value
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-wide mb-4">
            Pricing & Unit Configurations
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
            Transparent pricing with investor-friendly 20×5 payment plans starting at ₹8,500 / Sq.Ft. (All-Inclusive).
          </p>
        </div>

        {/* ================= DESKTOP TABLE VIEW ================= */}
        <div className="hidden md:block max-w-5xl mx-auto bg-[#0B132B]/90 backdrop-blur-2xl border-2 border-[#D4AF37]/40 rounded-3xl overflow-hidden shadow-[0_25px_50px_rgba(0,0,0,0.5)]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#1E3A8A] text-white border-b border-[#D4AF37]/40">
                <th className="py-5 px-6 font-serif font-semibold text-sm tracking-wider uppercase">Type</th>
                <th className="py-5 px-6 font-serif font-semibold text-sm tracking-wider uppercase">Saleable Area</th>
                <th className="py-5 px-6 font-serif font-semibold text-sm tracking-wider uppercase">Price (All Inclusive)</th>
                <th className="py-5 px-6 font-serif font-semibold text-sm tracking-wider uppercase text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {pricingData.map((item, idx) => (
                <tr key={idx} className="hover:bg-white/[0.03] transition-colors">
                  <td className="py-6 px-6 font-serif font-bold text-white text-base">
                    {item.type}
                    <span className="block text-xs font-sans font-light text-[#D4AF37] mt-0.5">{item.details}</span>
                  </td>
                  <td className="py-6 px-6 text-slate-300 font-medium text-sm">
                    {item.saleableArea}
                  </td>
                  <td className="py-6 px-6 text-emerald-400 font-bold text-base">
                    {item.price}
                  </td>
                  <td className="py-6 px-6 text-center">
                    <button
                      onClick={() => handleOpenModal(item.type)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs uppercase tracking-wider rounded-xl border border-emerald-400/40 shadow-md hover:shadow-lg transition-all cursor-pointer"
                    >
                      <span>Price Breakup</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ================= MOBILE CARD VIEW ================= */}
        <div className="block md:hidden space-y-4 max-w-md mx-auto">
          {pricingData.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#0B132B]/90 backdrop-blur-xl border border-[#D4AF37]/40 rounded-2xl p-5 shadow-xl flex flex-col gap-4"
            >
              <div className="flex items-start justify-between border-b border-white/10 pb-3">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-bold block mb-1">
                    Luxury Residence
                  </span>
                  <h3 className="text-lg font-serif font-bold text-white">{item.type}</h3>
                </div>
                <div className="w-9 h-9 rounded-xl bg-[#1E3A8A]/30 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] shrink-0">
                  <Tag className="w-4 h-4" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-slate-400 block uppercase tracking-wider mb-0.5">Area</span>
                  <span className="font-semibold text-slate-200">{item.saleableArea}</span>
                </div>
                <div>
                  <span className="text-slate-400 block uppercase tracking-wider mb-0.5">Base Rate</span>
                  <span className="font-bold text-emerald-400">{item.price}</span>
                </div>
              </div>

              <div className="text-xs text-amber-200/90 bg-white/[0.04] p-2.5 rounded-xl border border-white/5">
                {item.details}
              </div>

              <button
                onClick={() => handleOpenModal(item.type)}
                className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs uppercase tracking-wider rounded-xl border border-emerald-400/40 shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Request Price Breakup</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

      </div>

      {/* ================= PRICE BREAKUP / ENQUIRE MODAL ================= */}
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
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#B8860B] font-bold block mb-1">
                Northwind Wellness Residences
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#0A1128]">
                Get Detailed Price Breakup
              </h3>
              <p className="text-[#0A1128]/70 text-xs sm:text-sm mt-1">
                Selected Configuration: <strong className="text-[#1E3A8A]">{selectedUnit}</strong>
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
                    <span>Submit & Unlock Price Sheet</span>
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