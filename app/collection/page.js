"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "../../components/ProductCard";

export default function CollectionPage() {
  const products = [
    // Existing Items
    { id: 1, title: "Royal Noir Jacket", price: "Rs. 24,500", category: "Outerwear", image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=1000" },
    { id: 2, title: "Liquid Glass Tee", price: "Rs. 8,500", category: "Tops", image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000" },
    
    // --- NEW FABRIC COLLECTIONS ---
    { id: 7, title: "Vintage Cotton Set", price: "Rs. 12,500", category: "Cotton", image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=1000" },
    { id: 8, title: "Hand-Crafted Chikankari", price: "Rs. 18,000", category: "Chikankari", image: "https://images.unsplash.com/photo-1605611311025-01053181829e?q=80&w=1000" },
    { id: 9, title: "Flowing Chiffon Wrap", price: "Rs. 15,500", category: "Chiffon", image: "https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?q=80&w=1000" },
    
    { id: 4, title: "Cyber Knitwear", price: "Rs. 12,000", category: "Knitwear", image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1000" },
    { id: 5, title: "Onyx Cargo", price: "Rs. 19,000", category: "Bottoms", image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1000" },
    { id: 10, title: "Summer Cotton Kurta", price: "Rs. 9,000", category: "Cotton", image: "https://images.unsplash.com/photo-1598501479155-00b0e7cbc4d7?q=80&w=1000" },
  ];

  // Updated Categories list
  const categories = ["All", "Cotton", "Chikankari", "Chiffon"];
  const [activeTab, setActiveTab] = useState("All");

  const filteredProducts = activeTab === "All" 
    ? products 
    : products.filter(p => p.category === activeTab);

  return (
    <main className="min-h-screen bg-[#0a0a0a] pt-40 pb-20">
      <div className="container mx-auto px-6">
        
        <header className="mb-24 flex flex-col lg:flex-row justify-between items-start lg:items-end gap-12">
          <div className="max-w-2xl">
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-white mb-6"
            >
              The <span className="text-orange-500 italic font-light">Archive</span>
            </motion.h1>
            <p className="text-white/40 text-xs tracking-[0.4em] uppercase font-light leading-relaxed">
              Curated essentials for the modern digital reality. <br/> 
              Specializing in <span className="text-white font-bold">Cotton, Chikankari, and Chiffon</span> iterations.
            </p>
          </div>

          {/* Upgraded Filter Navigation */}
          <div className="flex flex-wrap gap-x-8 gap-y-4 border-b border-white/5 pb-4 w-full lg:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`text-[10px] uppercase tracking-[0.3em] font-bold transition-all duration-500 relative pb-2 ${
                  activeTab === cat ? "text-orange-500" : "text-white/20 hover:text-white"
                }`}
              >
                {cat}
                {activeTab === cat && (
                  <motion.div 
                    layoutId="activeTabUnderline" 
                    className="absolute bottom-0 left-0 w-full h-[2px] bg-orange-500" 
                  />
                )}
              </button>
            ))}
          </div>
        </header>

        {/* Dynamic Grid with Animation */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                key={product.id}
              >
                <ProductCard 
                  id={product.id} 
                  title={product.title} 
                  price={product.price} 
                  image={product.image} 
                />
                {/* Visual indicator for category on card */}
                <div className="mt-4">
                   <span className="text-[8px] text-white/20 uppercase tracking-[0.3em] border border-white/10 px-2 py-1 rounded-full">
                     {product.category}
                   </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-white/20 uppercase text-[10px] tracking-widest italic">No items found in this category of the archive.</p>
          </div>
        )}
      </div>
    </main>
  );
}