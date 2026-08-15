import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#FAF9F5] text-[#0A1128] flex flex-col justify-between overflow-x-hidden pt-24 sm:pt-28">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full relative z-10">
        
        {/* Background ambient gold glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[140px] pointer-events-none" />

        <div className="bg-white border-2 border-[#D4AF37]/40 rounded-3xl p-6 sm:p-12 shadow-2xl relative z-10">
          
          {/* Back Link */}
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#1E3A8A] hover:text-[#B8860B] transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 text-[#D4AF37] group-hover:-translate-x-1 transition-transform" />
              <span>Return to Homepage</span>
            </Link>
          </div>

          {/* Header Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF9F5] border border-[#D4AF37]/40 shadow-sm mb-4">
            <FileText className="w-4 h-4 text-[#B8860B]" />
            <span className="text-xs uppercase tracking-[0.25em] text-[#B8860B] font-bold">
              Legal & Compliance
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#0A1128] mb-6">
            Terms & Conditions
          </h1>

          <p className="text-xs text-[#0A1128]/60 mb-8">
            Last Updated: August 2026
          </p>

          <div className="space-y-6 text-[#0A1128]/80 text-sm sm:text-base font-light leading-relaxed">
            <h2 className="text-xl font-serif font-bold text-[#0A1128] pt-4">1. Acceptance of Terms</h2>
            <p>
              By accessing and using this website for Northwind Estate Residences, you agree to comply with and be bound by these Terms and Conditions. If you disagree with any part of these terms, please refrain from using our digital channels.
            </p>

            <h2 className="text-xl font-serif font-bold text-[#0A1128] pt-4">2. Intellectual Property</h2>
            <p>
              All content, architectural renderings, master plans, text, graphics, logos, and imagery displayed on this platform are the intellectual property of Northwind Estate Residences and Investor Arena Consulting Pvt. Ltd. Unauthorized reproduction or distribution is strictly prohibited.
            </p>

            <h2 className="text-xl font-serif font-bold text-[#0A1128] pt-4">3. Pricing & Specifications</h2>
            <p>
              Prices, payment plans (such as the 20x5 investor plan), specifications, and availability details listed on this website are subject to change without prior notice at the sole discretion of the developer.
            </p>

            <h2 className="text-xl font-serif font-bold text-[#0A1128] pt-4">4. Governing Law</h2>
            <p>
              These terms shall be governed by and construed in accordance with the laws of India, and any disputes relating to these terms shall be subject to the exclusive jurisdiction of the courts in Greater Noida / Delhi NCR.
            </p>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
}