"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { Heart } from "lucide-react"; 
import { useState } from "react";
// 1. Context ko import kiya
import { useApp } from "../context/AppContext"; 

export default function ProductCard({ id, title, price, image, category }) {
  const [isSaved, setIsSaved] = useState(false);
  
  // 2. Context se update function nikala
  const { updateWishlistCount } = useApp();

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const toggleWishlist = async (e) => {
    e.preventDefault(); 
    e.stopPropagation(); 

    try {
      const response = await fetch('/api/wishlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: id,
          name: title,
          price: price,
          image: image,
          category: category || "Collection"
        }),
      });

      if (response.ok) {
        setIsSaved(true);
        // 3. DATABASE UPDATE HONE KE BAAD NAVBAR KO SIGNAL BHEJA
        updateWishlistCount(); 
      }
    } catch (err) {
      console.error("Wishlist error:", err);
    }
  };

  return (
    <Link href={`/product/${id}`} className="block w-full">
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative h-[450px] w-full rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md p-4 group"
      >
        <div 
          style={{ transform: "translateZ(50px)", transformStyle: "preserve-3d" }}
          className="relative h-full w-full rounded-xl overflow-hidden bg-[#111]"
        >
          <button
            onClick={toggleWishlist}
            className="absolute top-4 right-4 z-30 p-3 rounded-full bg-black/40 backdrop-blur-md border border-white/10 transition-all hover:scale-110 active:scale-90"
            style={{ transform: "translateZ(30px)" }}
          >
            <Heart 
              size={18} 
              className={`transition-colors duration-300 ${isSaved ? "fill-orange-500 text-orange-500" : "text-white/70"}`} 
            />
          </button>

          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent z-10" />
          
          <img 
            src={image || "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1000&auto=format&fit=crop"} 
            alt={title}
            className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100"
          />
            
          <div className="absolute bottom-6 left-6 z-20" style={{ transform: "translateZ(40px)" }}>
            <p className="text-[9px] tracking-[0.4em] uppercase text-orange-500 font-bold mb-1">New Arrival</p>
            <h3 className="text-xl font-bold uppercase tracking-tighter">{title}</h3>
            <p className="text-white/40 text-sm font-medium">{price}</p>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}