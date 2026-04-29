"use client";
import Link from "next/link";
import React, { useState } from "react";
import { ShoppingBag, Heart, Search, User, LogOut, LayoutDashboard } from "lucide-react";
import { useApp } from "../context/AppContext"; 
import { useCart } from "../context/CartContext"; 
import { useSession, signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";

export default function LuxuryNavbar() {
  const { wishlistCount } = useApp();
  const { cartCount, setIsOpen } = useCart();
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="fixed top-3.5 w-full flex justify-center z-[100] px-4">
      <nav className="w-full max-w-7xl h-20 bg-white/[0.03] border border-white/10 backdrop-blur-2xl rounded-full px-10 flex items-center justify-between shadow-[0_20px_50px_rgba(0,0,0,0.5)]">

        {/* Logo Section */}
        <div className="flex-1">
          <Link href="/" className="inline-block group">
            <h1 className="text-xl font-black tracking-tighter uppercase italic flex items-center cursor-pointer transition-transform group-hover:scale-[1.02]">
              Levioosa
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full ml-1 animate-pulse shadow-[0_0_10px_#4ade80]" />
            </h1>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="hidden lg:flex flex-[2] justify-center gap-8">
          {['Collection', 'About', 'Blog', 'Contact Us'].map((link) => (
            <Link
              key={link}
              href={`/${link.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/50 hover:text-white transition-all hover:scale-105"
            >
              {link}
            </Link>
          ))}
        </div>

        {/* Action Icons */}
        <div className="flex-1 flex justify-end items-center gap-5">
          <Search size={18} className="text-white/60 hover:text-white cursor-pointer transition-colors" />

          {/* Wishlist */}
          <Link href='/wishlist' className="relative group">
            <Heart size={18} className="text-white/60 group-hover:text-purple-400 cursor-pointer transition-colors" />
            {wishlistCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-purple-600 text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-black border border-black">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Shopping Bag */}
          <div onClick={() => setIsOpen(true)} className="relative group cursor-pointer">
            <ShoppingBag size={18} className="text-white/60 group-hover:text-green-400 cursor-pointer transition-colors" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-500 text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-black text-black border border-black">
                {cartCount}
              </span>
            )}
          </div>

          {/* User Auth Section */}
          <div className="relative">
            {session ? (
              // Logged In State
              <div 
                className="relative group cursor-pointer"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center border border-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.3)] transition-all hover:scale-110">
                  <span className="text-black font-black text-[10px] uppercase">
                    {session.user.name?.charAt(0)}
                  </span>
                </div>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {isMenuOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-4 w-48 bg-[#0f0f0f] border border-white/10 backdrop-blur-3xl rounded-2xl p-2 shadow-2xl"
                    >
                      <Link href="/profile" className="flex items-center gap-3 px-4 py-3 text-[9px] uppercase tracking-widest text-white/60 hover:text-white hover:bg-white/5 rounded-xl transition-all">
                        <User size={12} /> Identity
                      </Link>
                      <button 
                        onClick={() => signOut()}
                        className="w-full flex items-center gap-3 px-4 py-3 text-[9px] uppercase tracking-widest text-red-400 hover:bg-red-500/10 rounded-xl transition-all"
                      >
                        <LogOut size={12} /> Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              // Logged Out State
              <Link href='/login' className="w-8 h-8 rounded-full bg-gradient-to-tr from-white/10 to-white/20 border border-white/10 flex items-center justify-center cursor-pointer hover:border-white/40 transition-all">
                <User size={14} className="text-white/80" />
              </Link>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}