"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Phone, MessageSquare, ClipboardList, X, ShieldCheck, Loader2, ArrowRight } from "lucide-react";

export default function FloatingAction() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form states
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const whatsappUrl = "https://wa.me/917042080055/?text=Hi,%20I%20would%20like%20to%20know%20more%20details%20about%20Northwind%20Estate%20Residences.";

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
    <>
      {/* ================= DESKTOP: Bottom-Right Hover-to-Expand Widget ================= */}
      <div className="hidden sm:flex fixed bottom-6 right-6 z-40 flex-col gap-3 items-end">
        
        {/* Call Now Button */}
        <a
          href="tel:+919910374156"
          className="group flex items-center bg-[#0A1128] hover:bg-[#1E3A8A] text-white rounded-full border-2 border-[#D4AF37] shadow-[0_10px_25px_rgba(0,0,0,0.3)] transition-all duration-300 overflow-hidden cursor-pointer"
        >
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out text-xs uppercase tracking-wider font-semibold pl-4">
            Call Now
          </span>
          <div className="w-12 h-12 flex items-center justify-center text-[#D4AF37] shrink-0">
            <Phone className="w-5 h-5" />
          </div>
        </a>

        {/* WhatsApp Now Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center bg-emerald-600 hover:bg-emerald-500 text-white rounded-full border-2 border-emerald-400/50 shadow-[0_10px_25px_rgba(0,0,0,0.3)] transition-all duration-300 overflow-hidden cursor-pointer"
        >
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out text-xs uppercase tracking-wider font-semibold pl-4">
            WhatsApp Now
          </span>
          <div className="w-12 h-12 flex items-center justify-center shrink-0">
            <Image src="/wh.png" alt="WhatsApp" width={24} height={24} className="object-contain" />
          </div>
        </a>

        {/* Enquire Now Button */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="group flex items-center bg-[#1E3A8A] hover:bg-[#152a65] text-white rounded-full border-2 border-[#D4AF37] shadow-[0_10px_25px_rgba(0,0,0,0.3)] transition-all duration-300 overflow-hidden cursor-pointer"
        >
          <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-300 ease-in-out text-xs uppercase tracking-wider font-semibold pl-4">
            Enquire Now
          </span>
          <div className="w-12 h-12 flex items-center justify-center text-[#D4AF37] shrink-0">
            <ClipboardList className="w-5 h-5" />
          </div>
        </button>

      </div>

      {/* ================= MOBILE: Bottom Sticky Bar ================= */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0A1128] border-t border-[#D4AF37]/40 py-2.5 px-3 flex items-center justify-between gap-2 shadow-[0_-10px_30px_rgba(0,0,0,0.5)]">
        
        {/* Call Button */}
        <a
          href="tel:+919910374156"
          className="flex-1 flex flex-col items-center justify-center py-2 px-1 bg-white/[0.06] rounded-xl border border-white/10 text-white active:bg-white/10 transition-colors"
        >
          <Phone className="w-4 h-4 text-[#D4AF37] mb-1" />
          <span className="text-[10px] uppercase font-semibold tracking-wider">Call</span>
        </a>

        {/* Enquire Modal Trigger */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex-1 flex flex-col items-center justify-center py-2 px-1 bg-[#1E3A8A] rounded-xl border border-[#D4AF37]/60 text-white active:bg-[#152a65] transition-colors cursor-pointer"
        >
          <ClipboardList className="w-4 h-4 text-[#D4AF37] mb-1" />
          <span className="text-[10px] uppercase font-semibold tracking-wider">Enquire</span>
        </button>

        {/* WhatsApp Button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex flex-col items-center justify-center py-2 px-1 bg-emerald-600 rounded-xl border border-emerald-400/50 text-white active:bg-emerald-500 transition-colors"
        >
          <div className="w-4 h-4 relative flex items-center justify-center mb-1">
            <Image src="/wh.png" alt="WhatsApp" width={16} height={16} className="object-contain" />
          </div>
          <span className="text-[10px] uppercase font-semibold tracking-wider">WhatsApp</span>
        </a>

      </div>

      {/* ================= ENQUIRE NOW POPUP MODAL ================= */}
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
                Instant Quick Enquiry
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
                    <span>Processing Inquiry...</span>
                  </>
                ) : (
                  <>
                    <span>Submit & Request Brochure</span>
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
    </>
  );
}