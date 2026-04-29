"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

const ContactPage = () => {
  const [focused, setFocused] = useState(null);

  return (
    <main className="min-h-screen bg-transparent pt-40 pb-20 px-6 flex flex-col items-center">
      <div className="w-full max-w-4xl">
        
        {/* Header Section */}
        <div className="mb-24 relative">
          <motion.div 
            initial={{ width: 0 }} 
            animate={{ width: "120px" }} 
            className="h-[2px] bg-orange-500 mb-8"
          />
       <h1 className="text-5xl md:text-7xl font-black uppercase tracking-[-0.05em] text-white leading-none">
            Establish <br />
           
          </h1>
          {/* Single solid line replacement */}
          <div className="w-full h-[1px] bg-white/10 mt-10" />
          
          <div className="absolute top-0 right-0 text-[10px] text-white/30 tracking-[0.8em] uppercase hidden md:block font-bold">
            LEVIOOSA / CONCIERGE
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-16">
          
          {/* Left: Info */}
          <div className="md:col-span-4 space-y-12">
            <div className="group border-l-2 border-orange-500/20 pl-6 hover:border-orange-500 transition-all duration-500">
              <p className="text-[10px] uppercase tracking-[0.4em] text-orange-500 font-black mb-2">Location</p>
              <p className="text-white/60 text-sm tracking-widest font-medium">LONDON / MAYFAIR</p>
            </div>
            <div className="group border-l-2 border-orange-500/20 pl-6 hover:border-orange-500 transition-all duration-500">
              <p className="text-[10px] uppercase tracking-[0.4em] text-orange-500 font-black mb-2">Direct Link</p>
              <p className="text-white/60 text-sm tracking-widest font-medium uppercase">support@levioosa.uk</p>
            </div>
          </div>

          {/* Right: Form */}
          <div className="md:col-span-8">
            <form className="space-y-20">
              
              {/* Name */}
              <div className="relative">
                <span className={`absolute -top-6 left-0 text-[10px] tracking-[0.3em] uppercase font-black transition-all duration-300 ${focused === "name" ? "text-orange-500" : "text-white/40"}`}>
                  01 / Full Name
                </span>
                <input 
                  type="text" 
                  onFocus={() => setFocused("name")}
                  onBlur={() => setFocused(null)}
                  className="w-full bg-transparent border-none py-4 text-2xl md:text-4xl font-light tracking-tight text-white outline-none placeholder:text-white/[0.03]"
                  placeholder="IDENTIFY YOURSELF"
                />
                <motion.div 
                  className="h-[1px] w-full"
                  animate={{ backgroundColor: focused === "name" ? "#f97316" : "rgba(255,255,255,0.2)" }}
                />
              </div>

              {/* Email */}
              <div className="relative">
                <span className={`absolute -top-6 left-0 text-[10px] tracking-[0.3em] uppercase font-black transition-all duration-300 ${focused === "email" ? "text-orange-500" : "text-white/40"}`}>
                  02 / Digital Address
                </span>
                <input 
                  type="email" 
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused(null)}
                  className="w-full bg-transparent border-none py-4 text-2xl md:text-4xl font-light tracking-tight text-white outline-none placeholder:text-white/[0.03]"
                  placeholder="COORDINATES"
                />
                <motion.div 
                  className="h-[1px] w-full"
                  animate={{ backgroundColor: focused === "email" ? "#f97316" : "rgba(255,255,255,0.2)" }}
                />
              </div>

              {/* Message */}
              <div className="relative">
                <span className={`absolute -top-6 left-0 text-[10px] tracking-[0.3em] uppercase font-black transition-all duration-300 ${focused === "msg" ? "text-orange-500" : "text-white/40"}`}>
                  03 / Transmission
                </span>
                <textarea 
                  rows="3"
                  onFocus={() => setFocused("msg")}
                  onBlur={() => setFocused(null)}
                  className="w-full bg-transparent border-none py-4 text-xl md:text-2xl font-light tracking-tight text-white outline-none placeholder:text-white/[0.03] resize-none"
                  placeholder="DESCRIBE THE NATURE OF YOUR INQUIRY"
                />
                <motion.div 
                  className="h-[1px] w-full"
                  animate={{ backgroundColor: focused === "msg" ? "#f97316" : "rgba(255,255,255,0.2)" }}
                />
              </div>

              <button className="group relative w-full md:w-auto px-16 py-6 bg-white text-black overflow-hidden rounded-full transition-all duration-500 hover:bg-orange-500">
                <span className="relative z-10 text-[11px] font-black uppercase tracking-[0.5em] group-hover:text-white transition-colors">
                  Send Signal
                </span>
                <div className="absolute inset-0 bg-black/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              </button>

            </form>
          </div>
        </div>

      </div>
    </main>
  );
};

export default ContactPage;