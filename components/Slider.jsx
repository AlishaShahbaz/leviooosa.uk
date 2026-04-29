"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// 1. Data Array (Isko component se bahar rakhte hain for better performance)
const slides = [
  { 
    id: 1, 
    title: "Royal Noir", 
    subtitle: "Iteration 01", 
    img: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=1000" 
  },
  { 
    id: 2, 
    title: "Onyx Cargo", 
    subtitle: "Iteration 02", 
    img: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1000" 
  },
  { 
    id: 3, 
    title: "Glass Vest", 
    subtitle: "Iteration 03", 
    img: "https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?q=80&w=1000" 
  },
];

// 2. Optimized Luxury Variants
const imageVariants = {
  initial: { clipPath: "inset(0 100% 0 0)", scale: 1.2, filter: "blur(10px)" },
  animate: { 
    clipPath: "inset(0 0% 0 0)", 
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 1.4, ease: [0.76, 0, 0.24, 1] } 
  },
  exit: { 
    clipPath: "inset(0 0 0 100%)",
    scale: 1.1,
    transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } 
  }
};

const textVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { delay: 0.8, duration: 0.8, ease: "easeOut" } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.4 } }
};

export default function LuxurySlider() {
  const [index, setIndex] = useState(0);

  // Auto-play Logic: Har 5 seconds baad slide change hogi
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black font-sans">
      <AnimatePresence mode="wait">
        {/* Main Slide Container */}
        <motion.div key={index} className="absolute inset-0">
          
          {/* Animated Background Image */}
          <motion.img 
            key={`img-${index}`}
            src={slides[index].img} 
            variants={imageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="h-full w-full object-cover grayscale opacity-50" 
            alt={slides[index].title} 
          />

          {/* Overlay Content */}
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6">
            <motion.p 
              variants={textVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="text-[10px] tracking-[0.8em] uppercase text-orange-500 mb-6 font-bold"
            >
              {slides[index].subtitle}
            </motion.p>
            
            <motion.h2 
              variants={textVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="text-6xl md:text-[10vw] font-black uppercase tracking-tighter text-white leading-none mb-10"
            >
              {slides[index].title}
            </motion.h2>

            <motion.button 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="px-12 py-5 border border-white/10 rounded-full text-[10px] uppercase tracking-[0.4em] text-white hover:bg-white hover:text-black transition-all duration-700 backdrop-blur-sm shadow-2xl"
            >
              Explore Collection
            </motion.button>
          </div>
          
          {/* Gradient Vignette for Depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60 z-10 pointer-events-none" />
        </motion.div>
      </AnimatePresence>

      {/* Progress Indicators (The Luxury Line) */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex items-center gap-6">
        {slides.map((_, i) => (
          <button 
            key={i} 
            onClick={() => setIndex(i)}
            className="relative h-8 w-1 group flex items-center justify-center"
          >
            <div className={`h-full w-[1px] transition-all duration-700 ${i === index ? "bg-orange-500 scale-y-150 shadow-[0_0_10px_#f97316]" : "bg-white/20 group-hover:bg-white/40"}`} />
            {i === index && (
                <motion.span 
                    layoutId="activeDot"
                    className="absolute -top-1 w-1 h-1 bg-orange-500 rounded-full"
                />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}