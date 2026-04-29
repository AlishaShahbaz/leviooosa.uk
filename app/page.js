"use client";
import React from "react";
import HeroScene from "../components/HeroScene";
import ProductCard from "../components/ProductCard";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  const articles = [
    { id: 1, title: "Royal Noir Jacket", price: "Rs. 24,500", image: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=1000" },
    { id: 2, title: "Liquid Glass Tee", price: "Rs. 8,500", image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000" },
    { id: 3, title: "Evolution Hoodie", price: "Rs. 16,000", image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1000" },
    { id: 4, title: "Cyber Knitwear", price: "Rs. 12,000", image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1000" },
  ];

  const blogPreview = [
    { id: 1, title: "The Art of Minimalist Fashion", date: "Apr 20, 2026", image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070" },
    { id: 2, title: "Summer 2026: Floral & Modest", date: "Apr 25, 2026", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1920" }
  ];

  return (
    <main className="relative w-full bg-transparent">
      {/* --- HERO SECTION (Original Theme) --- */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <HeroScene />
        <div className="container mx-auto px-6 z-10 text-center">
          <div className="inline-block px-4 py-1.5 mb-6 border border-white/10 rounded-full bg-white/5 backdrop-blur-md">
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-orange-400">Evolution of Luxury</span>
          </div>
          <h1 className="text-6xl md:text-[10rem] font-black uppercase tracking-[-0.05em] leading-none mb-6 flex flex-wrap justify-center items-center relative">
            <span className="text-transparent" style={{ WebkitTextStroke: '1.5px white' }}>LEVIO</span>
            <span className="italic font-extralight text-orange-500 md:-ml-12 drop-shadow-[0_0_15px_rgba(249,115,22,0.3)]">OSA</span>
          </h1>
          <p className="max-w-xl mx-auto text-white/60 font-light text-sm md:text-base mb-10">
            Crafting a new digital reality where high-end fashion meets liquid glass aesthetics.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-10 py-4 bg-white text-black font-bold uppercase text-[11px] tracking-widest rounded-full hover:bg-orange-500 hover:text-white transition-all shadow-xl">
              Explore Collection
            </button>
            <button className="px-10 py-4 border text-white border-white/10 backdrop-blur-xl font-bold uppercase text-[11px] tracking-widest rounded-full hover:bg-white/5 transition-all ">
              Watch Film
            </button>
          </div>
        </div>
        <div className="absolute bottom-10 left-10 hidden md:block">
          <p className="text-[10px] font-bold tracking-[0.4em] opacity-30 rotate-90 origin-left text-white">
            EST. 2026 / LONDON
          </p>
        </div>
      </section>

      {/* --- PHASE 1: FABRIC COLLECTIONS (Transparent/Glass Theme) --- */}
      <section className="relative z-20 container mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <CollectionCard title="Cotton" desc="Pure Comfort" link="/collection?cat=Cotton" />
          <CollectionCard title="Chikankari" desc="Heritage Art" link="/collection?cat=Chikankari" />
          <CollectionCard title="Chiffon" desc="Elegant Flow" link="/collection?cat=Chiffon" />
        </div>
      </section>

      {/* --- PRODUCT SECTION (Original Theme) --- */}
      <section className="relative z-20 container mx-auto px-6 py-32">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20">
          <h2 className="text-4xl md:text-6xl font-black uppercase text-white">
            The <span className="text-orange-500 italic font-light">Drop</span>
          </h2>
        </div>

        <div className="flex overflow-x-auto gap-6 snap-x snap-mandatory no-scrollbar pb-10 md:grid md:grid-cols-3 md:overflow-visible">
          {articles.map((item, index) => (
            <div key={item.id} className={`min-w-[85%] snap-center md:min-w-full ${index === 3 ? 'md:hidden' : ''}`}>
              <ProductCard {...item} />
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="group relative px-12 py-4 rounded-full border border-white/10 text-[10px] tracking-[0.5em] uppercase text-white/50 hover:text-white transition-all overflow-hidden">
            <span className="relative z-10">View All Articles — 20</span>
            <div className="absolute inset-0 bg-white/5 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300" />
          </button>
        </div>
      </section>

      {/* --- BLOG SECTION (The Archive) --- */}
      <section className="relative z-20 container mx-auto px-6 py-32 border-t border-white/5">
        <div className="flex justify-between items-end mb-16">
          <h2 className="text-4xl md:text-6xl font-black uppercase text-white leading-none">
            The <span className="text-orange-500 italic font-light">Archive</span>
          </h2>
          <Link href="/blog" className="text-[10px] font-black uppercase tracking-widest border-b border-orange-500 pb-1 hover:text-orange-500 transition-all">
            Read All
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {blogPreview.map((post) => (
            <Link key={post.id} href={`/blog/${post.id}`} className="group">
              <div className="aspect-video rounded-3xl overflow-hidden mb-6 border border-white/5 bg-white/5 backdrop-blur-sm">
                <img src={post.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 opacity-60 group-hover:opacity-100" alt={post.title} />
              </div>
              <p className="text-orange-500 text-[10px] font-bold tracking-widest uppercase mb-2">{post.date}</p>
              <h3 className="text-2xl font-black italic tracking-tighter uppercase group-hover:pl-4 transition-all duration-300 text-white">{post.title}</h3>
            </Link>
          ))}
        </div>
      </section>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </main>
  );
}

// Collection Card with Glassmorphism
const CollectionCard = ({ title, desc, link }) => (
  <Link href={link}>
    <motion.div 
      whileHover={{ y: -10 }}
      className="relative h-64 rounded-[2rem] overflow-hidden group border border-white/10 bg-white/5 backdrop-blur-md cursor-pointer flex items-center justify-center text-center p-8"
    >
      <div className="z-10">
        <p className="text-orange-500 text-[9px] font-black tracking-[0.4em] uppercase mb-2 opacity-70 group-hover:opacity-100">{desc}</p>
        <h3 className="text-4xl font-black italic tracking-tighter uppercase text-white drop-shadow-2xl">{title}</h3>
      </div>
      {/* Subtle Glow Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute inset-0 bg-orange-500/0 group-hover:bg-orange-500/5 transition-all duration-500" />
    </motion.div>
  </Link>
);