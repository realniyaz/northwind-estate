import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://northwind22d.com"),
  title: "Northwind Wellness Residences | Luxury 3 & 4 BHK on Yamuna Expressway",
  description: "Discover Northwind Wellness in Sector 22D, Yamuna Expressway. Ultra-luxury 3 & 4 BHK fully furnished residences with first-ever glass facade, 75% open spaces, and world-class amenities.",
  keywords: "Northwind Wellness, Northwind Estate Sector 22D, Yamuna Expressway luxury apartments, 3 BHK fully furnished Greater Noida, 4 BHK luxury flats Jewar airport",
  openGraph: {
    title: "Northwind Wellness Residences | Yamuna Expressway",
    description: "Experience wellness-themed luxury living with 4 iconic glass-facade towers, 75% green spaces, and elite specifications in Sector 22D.",
    url: "https://northwind22d.com",
    siteName: "Northwind Wellness",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Northwind Wellness Residences | Yamuna Expressway",
    description: "Explore ultra-luxury wellness residences featuring 3 & 4 BHK apartments starting at ₹1.42 Cr.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="antialiased selection:bg-gold selection:text-navy">
        {children}
      </body>
    </html>
  );
}