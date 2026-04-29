"use client";
import React, { useState, useRef, useEffect, useMemo } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";

const products = [
  { 
    id: 1, 
    name: "ONYX ARMOR", 
    price: "Rs.240", 
    // Frame sequence: jitni zyada images, utna smooth 3D view
    frames: Array.from({ length: 24 }, (_, i) => `/jackets/onyx/frame_${i + 1}.png`) 
  }
];

export default function UltraSmooth3D() {
  const [active, setActive] = useState(0);
  const containerRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Drag value handle
  const dragX = useMotionValue(0);
  
  // DRAG SMOOTHNESS FIX: 
  // 600px total drag length = 360 degree rotation
  const frameIndex = useTransform(dragX, [0, 600], [0, products[active].frames.length - 1]);

  const [currentFrame, setCurrentFrame] = useState(0);

  // Pre-load images taake lag na aaye
  useEffect(() => {
    const loadImages = async () => {
      const promises = products[active].frames.map((src) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
        });
      });
      await Promise.all(promises);
      setIsLoaded(true);
    };
    loadImages();
  }, [active]);

  // Update frame on drag
  useEffect(() => {
    return frameIndex.onChange((v) => {
      const rounded = Math.round(v);
      // Loop rotation: agar 600px se agay nikal jaye toh wapis 0 se shuru ho
      setCurrentFrame(Math.abs(rounded % products[active].frames.length));
    });
  }, [frameIndex, active]);

  return (
    <main className="h-screen bg-[#080808] flex items-center justify-center overflow-hidden font-sans">
      
      {/* Background Parallax Text */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] select-none pointer-events-none">
        <h1 className="text-[30vw] font-black">{products[active].name.split(" ")[0]}</h1>
      </div>

      <div className="relative w-full max-w-5xl h-[70vh] flex flex-col items-center justify-center">
        
        {/* THE 3D OBJECT */}
        <div className="relative z-30 cursor-grab active:cursor-grabbing group">
          {!isLoaded && <div className="text-white/20 animate-pulse uppercase tracking-widest">Initialising 3D Space...</div>}
          
          <motion.img
            src={products[active].frames[currentFrame]}
            alt="3D View"
            draggable={false}
            className="w-[400px] md:w-[600px] h-auto drop-shadow-[0_60px_100px_rgba(0,0,0,0.8)]"
            style={{ userSelect: "none" }}
          />
        </div>

        {/* CUSTOM TRACKER & LINE */}
       {/* The Orbital Track (Nike Style) */}
<div className="absolute bottom-20 w-full flex justify-center items-center">
  <div className="relative w-[600px] h-[100px]">
    {/* Ye wo curve line hai */}
    <div className="absolute top-0 w-full h-full border-t border-white/10 rounded-[100%] rotate-x-60" />
    
    {/* Handle/Cliper jo track par chale ga */}
    <motion.div 
      drag="x"
      dragConstraints={{ left: 0, right: 600 }}
      style={{ x: dragX }}
      className="absolute -top-3 left-0 w-6 h-6 bg-orange-500 rounded-full shadow-[0_0_20px_#f97316] cursor-grab active:cursor-grabbing z-50"
    >
       <div className="w-full h-full flex items-center justify-center">
          <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
       </div>
    </motion.div>
  </div>
</div>
      </div>
    </main>
  );
}