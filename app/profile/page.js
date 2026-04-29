"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { Package, Heart, User, ShoppingBag, X, ArrowRight } from "lucide-react";
import { useApp } from "../../context/AppContext"; 
import { useCart } from "../../context/CartContext";

export default function ProfilePage() {
  const { data: session } = useSession();
  
  // Context functions for removing items
  const { wishlist: contextWishlist, removeFromWishlist } = useApp(); 
  const { cartItems: contextCart, removeFromCart } = useCart(); 
  
  const [activeTab, setActiveTab] = useState("identity");
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);

  // FORCE DATA SYNC LOGIC
  useEffect(() => {
    const loadData = () => {
      // Priority 1: Context Data
      // Priority 2: LocalStorage (Same as Navbar)
      const savedCart = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem("cartItems") || "[]") : [];
      const savedWish = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem("wishlist") || "[]") : [];

      setWishlist(contextWishlist?.length > 0 ? contextWishlist : savedWish);
      setCart(contextCart?.length > 0 ? contextCart : savedCart);
    };

    loadData();
    // Watch for changes in context or storage
    window.addEventListener("storage", loadData);
    return () => window.removeEventListener("storage", loadData);
  }, [contextWishlist, contextCart]);

  const tabs = [
    { id: "identity", label: "Identity", icon: <User size={14} /> },
    { id: "orders", label: "Orders", icon: <Package size={14} /> },
    { id: "wishlist", label: "Wishlist", icon: <Heart size={14} />, count: wishlist.length },
    { id: "cart", label: "Bag", icon: <ShoppingBag size={14} />, count: cart.length },
  ];

  return (
    <main className="min-h-screen bg-[#020202] text-white pt-44 px-6 lg:px-20 pb-20 relative overflow-hidden">
      
      {/* Brand Luxury Glows */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-orange-600/5 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-[-10%] w-[500px] h-[500px] bg-white/[0.02] blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <header className="mb-16 border-b border-white/5 pb-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-7xl font-black tracking-tighter uppercase italic leading-none">
              User <span className="text-orange-500">Vault</span>
            </h1>
            <div className="flex items-center gap-3 mt-6">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]" />
              <p className="text-[10px] text-white/40 uppercase tracking-[0.6em]">Authorized: {session?.user?.name || "ALISHA GILL"}</p>
            </div>
          </motion.div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Sidebar - Upgraded Theme */}
          <div className="lg:col-span-3 space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full group flex items-center justify-between px-7 py-5 rounded-2xl transition-all duration-500 border ${
                  activeTab === tab.id 
                  ? "bg-white text-black border-white shadow-[0_0_50px_rgba(255,255,255,0.1)]" 
                  : "bg-[#080808] text-white/30 border-white/5 hover:border-white/20 hover:bg-white/[0.03]"
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className={activeTab === tab.id ? "text-black" : "text-orange-500"}>{tab.icon}</span>
                  <span className="text-[9px] font-black uppercase tracking-[0.4em]">{tab.label}</span>
                </div>
                {tab.count > 0 && (
                  <span className={`text-[9px] px-2.5 py-0.5 rounded-full font-black ${activeTab === tab.id ? "bg-black text-white" : "bg-orange-500 text-black"}`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="lg:col-span-9">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white/[0.01] border border-white/5 backdrop-blur-[100px] rounded-[40px] p-12 min-h-[550px] shadow-2xl"
              >
                
                {/* Identity */}
                {activeTab === "identity" && (
                  <div className="space-y-12 pt-4">
                    <div>
                      <p className="text-[8px] text-white/20 uppercase tracking-[0.6em] mb-3">Member Ref.</p>
                      <p className="text-5xl font-light tracking-tighter uppercase italic">{session?.user?.name || "ALISHA GILL"}</p>
                    </div>
                    <div>
                      <p className="text-[8px] text-white/20 uppercase tracking-[0.6em] mb-3">System Access Key</p>
                      <p className="text-2xl text-white/60 tracking-wider font-extralight">{session?.user?.email || "dev.alishah@levioosa.uk"}</p>
                    </div>
                  </div>
                )}

                {/* Wishlist Mapping */}
                {activeTab === "wishlist" && (
                  <div className="grid gap-5">
                    {wishlist.length > 0 ? (
                      wishlist.map((item, idx) => (
                        <div key={item.id || idx} className="flex items-center justify-between p-6 bg-white/[0.03] border border-white/5 rounded-[30px] group hover:border-orange-500/40 transition-all">
                          <div className="flex items-center gap-8">
                            <div className="w-20 h-24 bg-black rounded-2xl overflow-hidden border border-white/5 relative">
                              <img src={item.image || item.img} alt="" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                            </div>
                            <div>
                              <h3 className="text-xs uppercase font-black tracking-[0.2em]">{item.name || "Luxury Item"}</h3>
                              <p className="text-[11px] text-orange-500 mt-2 font-black italic">£{item.price}</p>
                            </div>
                          </div>
                          <button onClick={() => removeFromWishlist(item.id)} className="p-4 text-white/10 hover:text-red-500 transition-all">
                            <X size={18} />
                          </button>
                        </div>
                      ))
                    ) : (
                      <div className="h-64 flex flex-col items-center justify-center space-y-4 opacity-10 uppercase tracking-[1em] text-[10px]">Empty Registry</div>
                    )}
                  </div>
                )}

                {/* Bag Mapping */}
                {activeTab === "cart" && (
                  <div className="space-y-5">
                    {cart.length > 0 ? (
                      <>
                        {cart.map((item, idx) => (
                          <div key={item.id || idx} className="flex items-center justify-between p-7 bg-white/[0.02] border border-white/5 rounded-[25px] hover:bg-white/[0.04] transition-all">
                            <div className="flex items-center gap-8">
                              <span className="text-[9px] text-orange-500 font-black italic tracking-widest">#{idx + 1}</span>
                              <h3 className="text-xs uppercase tracking-[0.2em] font-black">{item.name}</h3>
                            </div>
                            <div className="flex items-center gap-10">
                              <p className="text-sm font-bold tracking-tighter italic font-black">£{item.price}</p>
                              <button onClick={() => removeFromCart(item.id)} className="text-white/10 hover:text-white transition-all"><X size={16} /></button>
                            </div>
                          </div>
                        ))}
                        <button className="w-full mt-10 py-7 bg-white text-black text-[11px] font-black uppercase tracking-[0.6em] rounded-2xl hover:bg-orange-500 hover:text-white transition-all duration-700 flex items-center justify-center gap-5 shadow-[0_0_50px_rgba(255,255,255,0.05)]">
                          Finalize Assets <ArrowRight size={16} />
                        </button>
                      </>
                    ) : (
                      <div className="h-64 flex flex-col items-center justify-center space-y-4 opacity-10 uppercase tracking-[1em] text-[10px]">Zero Inventory</div>
                    )}
                  </div>
                )}

              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </main>
  );
}