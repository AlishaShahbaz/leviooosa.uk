"use client";
import React from "react";

const Footer = () => {
  return (
    <footer className="relative z-20 bg-transparent pt-20 pb-10 overflow-hidden border-t border-white/5">
      {/* Background Giant Text - Lowered opacity and adjusted position */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.015]">
        <h1 className="text-[18vw] font-black uppercase tracking-tighter text-white whitespace-nowrap">
          LEVIOOSA
        </h1>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-16">
          
          {/* Brand Info */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                <span className="text-black font-black text-[10px]">L</span>
              </div>
              <h2 className="text-xl font-black uppercase tracking-widest text-white">
                LEVIO<span className="text-orange-500 italic font-light">OSA</span>
              </h2>
            </div>
            <p className="max-w-xs text-white/30 text-[11px] leading-relaxed tracking-wider uppercase font-light">
              Digital fluidity meets high-end luxury. London / 2026.
            </p>
          </div>

          <div className="hidden md:block md:col-span-2"></div>

          {/* Links Column 1 */}
          <div className="md:col-span-2">
            <h4 className="text-[9px] uppercase tracking-[0.4em] text-orange-500 mb-6 font-bold">Menu</h4>
            <ul className="space-y-3">
              {['Archive', 'VTON', 'About'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-white/40 text-[10px] uppercase tracking-widest hover:text-white transition-all duration-300">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

         {/* Links Column 2 */}
          <div className="md:col-span-2">
            <h4 className="text-[9px] uppercase tracking-[0.4em] text-orange-500 mb-6 font-bold">Legal</h4>
            <ul className="space-y-3">
              {['Privacy', 'Sitemaps', 'Shipping'].map((item) => (
                <li key={item}>
                  <a 
                    href={item === 'Sitemaps' ? "/sitemap.xml" : "#"} 
                    target={item === 'Sitemaps' ? "_blank" : "_self"}
                    rel={item === 'Sitemaps' ? "noopener noreferrer" : ""}
                    className="text-white/40 text-[10px] uppercase tracking-widest hover:text-white transition-all duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="md:col-span-2">
            <h4 className="text-[9px] uppercase tracking-[0.4em] text-orange-500 mb-6 font-bold">Social</h4>
            <div className="flex flex-col gap-3">
              {['Instagram', 'Twitter'].map((social) => (
                <a key={social} href="#" className="text-white/40 text-[10px] uppercase tracking-widest hover:text-white transition-all duration-300">
                  {social}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 gap-4">
          <p className="text-[8px] tracking-[0.6em] text-white/10 uppercase font-bold">
            © 2026 LEVIOOSA LUXURY
          </p>
          <div className="flex items-center gap-2">
             <div className="w-1 h-1 rounded-full bg-orange-500/50 animate-pulse"></div>
             <span className="text-[8px] tracking-[0.3em] text-white/20 uppercase font-medium">Luxury Standard</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;