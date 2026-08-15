import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function PrivacyPolicyPage() {
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
            <ShieldCheck className="w-4 h-4 text-[#B8860B]" />
            <span className="text-xs uppercase tracking-[0.25em] text-[#B8860B] font-bold">
              Legal & Compliance
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#0A1128] mb-6">
            Privacy Policy
          </h1>

          <p className="text-xs text-[#0A1128]/60 mb-8">
            Last Updated: August 2026
          </p>

          <div className="space-y-6 text-[#0A1128]/80 text-sm sm:text-base font-light leading-relaxed">
            <h2 className="text-xl font-serif font-bold text-[#0A1128] pt-4">1. Information We Collect</h2>
            <p>
              At Northwind Estate Residences (powered by Investor Arena Consulting Pvt. Ltd.), we respect your privacy. When you register your interest, download e-brochures, or submit enquiries through our digital platforms, we collect personal information including your full name, email address, and telephone number.
            </p>

            <h2 className="text-xl font-serif font-bold text-[#0A1128] pt-4">2. Use of Information</h2>
            <p>
              The information collected is utilized strictly to provide you with comprehensive project details, pricing sheets, master plans, site visit arrangements, and direct advisory support from our luxury real estate specialists. We do not sell, rent, or trade your personal data to third parties.
            </p>

            <h2 className="text-xl font-serif font-bold text-[#0A1128] pt-4">3. Data Security & Protection</h2>
            <p>
              We implement robust administrative, technical, and physical security measures to protect your personal information against unauthorized access, disclosure, alteration, or destruction.
            </p>

            <h2 className="text-xl font-serif font-bold text-[#0A1128] pt-4">4. Contact Information</h2>
            <p>
              If you have any questions or concerns regarding our privacy practices, please contact our support team directly via helpline at <strong className="text-[#1E3A8A]">+91 99103 74156</strong> or email at <strong className="text-[#1E3A8A]">realtyfmleads@gmail.com</strong>.
            </p>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
}