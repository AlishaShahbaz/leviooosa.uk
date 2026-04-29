import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
// 1. Import the component here
import LiquidGlassBg from "../components/LiquidGlassBg";
// import CustomCursor from "../components/CustomCursor";
// import SmoothScroll from '../components/SmoothScroll'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CartSidebar from "../components/CartSidebar";
import LuxurySlider from "../components/Slider";
import OrbitalSlider from "../components/OrbitalSlider";
import  {CartProvider}  from "../context/CartContext";
import  {AppProvider}  from "../context/AppContext";
import { AuthProvider } from "../context/AuthContext"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 2. SEO Update - Levioosa 
export const metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: {
    default: "LEVIOOSA | Evolution of Luxury Apparel",
    template: "%s | LEVIOOSA"
  },
  description: "Experience the fusion of high-end fashion and digital liquid aesthetics. Luxury knitwear and jackets crafted for the bold. Designed in London, EST. 2026.",
  keywords: ["Luxury Clothing", "MERN Stack Fashion", "High-end Jackets", "Levioosa UK", "Minimalist Streetwear"],
  authors: [{ name: "Alishah" }],
  creator: "Alishah",
  publisher: "LEVIOOSA",
  openGraph: {
    title: "LEVIOOSA | Evolution of Luxury",
    description: "Digital liquid glass aesthetics meet high-end luxury fashion.",
    url: "https://levioosa.uk",
    siteName: "LEVIOOSA",
    images: [
      {
        url: "/og-image.jpg", 
        width: 1200,
        height: 630,
        alt: "LEVIOOSA Luxury Collection",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LEVIOOSA | Evolution of Luxury",
    description: "Crafting a new digital reality in luxury fashion.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className={`${geistSans.variable} ${geistMono.variable} bg-[#050505] text-white min-h-screen flex flex-col`}>
        <AuthProvider>
        <AppProvider>
          <CartProvider>
          {/* <SmoothScroll> */}
            {/* <CustomCursor /> */}
            <Navbar />
            <CartSidebar />
            <LiquidGlassBg /> 
            <main className="relative z-10 flex-grow bg-transparent">
              {children}
            </main>
            <Footer />
          {/* </SmoothScroll> */}
       </CartProvider>
        </AppProvider>
        </AuthProvider>
      </body>
    </html>
  );
}