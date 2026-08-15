import Link from "next/link";
import { ArrowLeft, AlertCircle } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function DisclaimerPage() {
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
            <AlertCircle className="w-4 h-4 text-[#B8860B]" />
            <span className="text-xs uppercase tracking-[0.25em] text-[#B8860B] font-bold">
              Legal & Compliance
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#0A1128] mb-6">
            Project Disclaimer
          </h1>

          <p className="text-xs text-[#0A1128]/60 mb-8">
            RERA Registration No: UPRERAAGT25307
          </p>

          <div className="space-y-6 text-[#0A1128]/80 text-sm sm:text-base font-light leading-relaxed">
            <h2 className="text-xl font-serif font-bold text-[#0A1128] pt-4">1. Informational Purpose Only</h2>
            <p>
              The content, graphics, pricing sheets, floor plans, and architectural renders displayed on this website are for informational and marketing purposes only and do not constitute an offer for lease or formal legal contract.
            </p>

            <h2 className="text-xl font-serif font-bold text-[#0A1128] pt-4">2. Architectural Renders</h2>
            <p>
              Images, dimensions, specifications, and layout plans depicted are artistic impressions and conceptual representations. Actual construction, finishes, and landscaping may vary upon final completion.
            </p>

            <h2 className="text-xl font-serif font-bold text-[#0A1128] pt-4">3. Regulatory Compliance</h2>
            <p>
              Northwind Estate Residences is registered under RERA. All statutory approvals and project details can be verified through the official UP RERA portal using registration number <strong className="text-[#1E3A8A]">UPRERAAGT25307</strong>.
            </p>

            <h2 className="text-xl font-serif font-bold text-[#0A1128] pt-4">4. Channel Partner Attribution</h2>
            <p>
              This platform is designed and managed by Margaux Tech and promoted on behalf of authorized channel partners under Investor Arena Consulting Pvt. Ltd.
            </p>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
}