import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, ArrowRight } from "lucide-react";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Overview", href: "#overview" },
  { name: "Highlights", href: "#highlights" },
  { name: "Amenities", href: "#amenities" },
  { name: "Price", href: "#price" },
  { name: "Floor Plans", href: "#floor-plans" },
  { name: "Location", href: "#location" },
];

const legalLinks = [
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "Terms & Conditions", href: "/terms" },
  { name: "Project Disclaimer", href: "/disclaimer" },
];

export default function Footer() {
  const whatsappUrl = "https://wa.me/917042080055/?text=Hi,%20I%20would%20like%20to%20know%20more%20details%20about%20Northwind%20Estate%20Residences.";

  return (
    <footer className="bg-[#070D1D] text-slate-100 border-t border-[#D4AF37]/30 pt-16 pb-12 relative overflow-hidden">
      
      {/* Background ambient gold glow */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Column 1: Logo & Description (Span 4) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="#home" className="inline-block bg-white/95 px-4 py-2 rounded-2xl shadow-md">
              <div className="relative w-44 h-10">
                <Image
                  src="/logo.png"
                  alt="Northwind Estates"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </Link>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-light pr-4">
              Northwind Estate Residences in Sector 22D, Yamuna Expressway sets a new benchmark in holistic luxury living with 75% green wellness spaces, G+30 glass facades, and ultra-exclusive planning.
            </p>
          </div>

          {/* Column 2: Quick Links (Span 2) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-xs sm:text-sm text-slate-300 hover:text-[#D4AF37] transition-colors flex items-center gap-1.5 group"
                  >
                    <ArrowRight className="w-3 h-3 text-[#D4AF37] group-hover:translate-x-1 transition-transform" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Legal (Span 3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
              Legal & Compliance
            </h4>
            <ul className="space-y-2.5">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-xs sm:text-sm text-slate-300 hover:text-[#D4AF37] transition-colors flex items-center gap-1.5 group"
                  >
                    <ArrowRight className="w-3 h-3 text-[#D4AF37] group-hover:translate-x-1 transition-transform" />
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="pt-2">
              <span className="text-[11px] font-semibold text-white block bg-[#0B132B] px-3.5 py-2.5 rounded-xl border border-[#D4AF37]/40 shadow-sm">
                RERA No: Coming Soon
              </span>
            </div>
          </div>

          {/* Column 4: Help Desk (Span 3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
              Help Desk
            </h4>
            
            <div className="space-y-3">
              {/* Direct Helpline */}
              <a
                href="tel:+919910374156"
                className="flex items-center gap-3 p-3 bg-[#0B132B]/90 rounded-xl border border-white/10 hover:border-[#D4AF37] hover:shadow-md transition-all group"
              >
                <div className="w-8 h-8 rounded-full bg-[#1E3A8A]/50 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#1E3A8A] transition-colors shrink-0">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] text-slate-400 block uppercase tracking-wider">Helpline</span>
                  <span className="text-xs font-bold text-white truncate block">+91 99103 74156</span>
                </div>
              </a>

              {/* Email Support */}
              <a
                href="mailto:realtyfmleads@gmail.com"
                className="flex items-center gap-3 p-3 bg-[#0B132B]/90 rounded-xl border border-white/10 hover:border-[#D4AF37] hover:shadow-md transition-all group"
              >
                <div className="w-8 h-8 rounded-full bg-[#1E3A8A]/50 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#1E3A8A] transition-colors shrink-0">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] text-slate-400 block uppercase tracking-wider">Email Support</span>
                  <span className="text-xs font-bold text-white truncate block">realtyfmleads@gmail.com</span>
                </div>
              </a>

              {/* WhatsApp Action with fixed image rendering */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white rounded-xl border border-emerald-400/40 shadow-md transition-all group"
              >
                <div className="w-5 h-5 relative shrink-0 flex items-center justify-center">
                  <Image src="/wh.png" alt="WhatsApp" width={20} height={20} className="object-contain" />
                </div>
                <span className="text-xs font-bold tracking-wide">Connect on WhatsApp</span>
              </a>
            </div>

          </div>

        </div>

        {/* Bottom Copyright & Agency Attribution */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-xs text-slate-400">
          <p>© 2026 Northwind Estate Residences. All rights reserved.</p>
          <p className="font-light">
            Designed & Managed by <strong className="text-white font-semibold">Margaux Tech</strong>
          </p>
        </div>

      </div>
    </footer>
  );
}