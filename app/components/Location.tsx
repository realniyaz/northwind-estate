"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Sparkles, MapPin, Navigation, ArrowRight, X, ShieldCheck, Loader2 } from "lucide-react";

const locationBenefits = [
  { title: "Yamuna Expressway Corridor", distance: "0 Distance", desc: "Direct highway connectivity." },
  { title: "Yatharth Hospital", distance: "Approx. 2 Mins", desc: "Advanced multi-specialty healthcare nearby." },
  { title: "Buddh International Circuit (F1 Track)", distance: "Approx. 5 Mins", desc: "World-class sporting and entertainment hub." },
  { title: "Sharda University", distance: "Approx. 10 Mins", desc: "Renowned educational institution and campus." },
  { title: "Upcoming Noida Film City", distance: "Approx. 10 Mins", desc: "Mega entertainment and media city project." },
  { title: "Noida International Airport (Jewar)", distance: "Approx. 12 Mins", desc: "Upcoming global aviation and transit hub." },
];

export default function Location() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form states
  const [formData, setFormData] = useState({ name: "", email: "", phone: "" });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const response = await fetch("/api/send-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, inquiryType: "Location & Site Visit" }),
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
    <section id="location" className="py-20 sm:py-28 bg-[#FAF9F5] text-[#0A1128] relative overflow-hidden">
      
      {/* Background ambient gold glow */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#D4AF37]/40 shadow-sm mb-4">
            <Sparkles className="w-4 h-4 text-[#B8860B]" />
            <span className="text-xs uppercase tracking-[0.25em] text-[#B8860B] font-bold">
              Strategic Connectivity
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#0A1128] tracking-wide mb-4">
            Location & Surroundings
          </h2>
          <p className="text-[#0A1128]/70 text-sm sm:text-base leading-relaxed font-light">
            Situated in Sector 22D, Yamuna Expressway, Northwind Estate offers unmatched proximity to India&apos;s fastest-growing infrastructure corridors.
          </p>
        </div>

        {/* Main Content Grid: Map on Left, Benefits on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
          
          {/* LEFT: Google Map Embed */}
          <div className="lg:col-span-6 w-full h-[400px] sm:h-[480px] rounded-3xl overflow-hidden border-2 border-[#D4AF37]/40 shadow-xl bg-white relative">
            <iframe
              title="Northwind Estate Sector 22D Yamuna Expressway Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3506.471957640321!2d77.5218!3d28.3792!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cc730a80e8e97%3A0x6b3f7f8f7c00e12!2sSector%2022D%2C%20Greater%20Noida%2C%20Uttar%20Pradesh%20203201!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full grayscale-[20%] contrast-[110%]"
            />
          </div>

          {/* RIGHT: Location Benefits Grid */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {locationBenefits.map((item, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#D4AF37]/30 rounded-2xl p-4 sm:p-5 shadow-sm hover:border-[#1E3A8A] hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-[#B8860B] bg-[#FAF9F5] px-2.5 py-1 rounded-lg border border-[#D4AF37]/20 uppercase tracking-wider">
                      {item.distance}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-[#1E3A8A]/5 flex items-center justify-center text-[#1E3A8A] group-hover:bg-[#1E3A8A] group-hover:text-white transition-colors">
                      <Navigation className="w-4 h-4" />
                    </div>
                  </div>
                  <h3 className="text-sm font-serif font-bold text-[#0A1128] mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#0A1128]/70 font-light">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* CTA Button */}
        <div className="flex justify-center">
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#1E3A8A] hover:bg-[#152a65] text-white font-semibold text-sm sm:text-base rounded-2xl border-2 border-[#D4AF37] shadow-[0_10px_25px_rgba(30,58,138,0.2)] hover:shadow-[0_15px_30px_rgba(30,58,138,0.35)] transition-all transform hover:-translate-y-0.5 cursor-pointer group"
          >
            <MapPin className="w-4 h-4 text-[#D4AF37]" />
            <span>Schedule Site Visit & Get Location Map</span>
            <ArrowRight className="w-4 h-4 text-[#D4AF37] group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>

      {/* ================= SITE VISIT / LOCATION ENQUIRE MODAL ================= */}
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
                <MapPin className="w-5 h-5 text-[#B8860B]" />
              </div>
              <span className="text-[10px] uppercase tracking-[0.3em] text-[#B8860B] font-bold block mb-1">
                Northwind Wellness Residences
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#0A1128]">
                Schedule Exclusive Site Visit
              </h3>
              <p className="text-[#0A1128]/70 text-xs sm:text-sm mt-1">
                Experience Sector 22D Yamuna Expressway firsthand with our senior advisors.
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
                    <span>Booking Visit...</span>
                  </>
                ) : (
                  <>
                    <span>Confirm Site Visit & Location Guide</span>
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