"use client"; // Client component for animations
import { motion } from "framer-motion";

export default function LiquidGlassBg() {
  return (
    <div className="fixed inset-0 -z-20 overflow-hidden bg-[#0a0a0a]">
      {/* Dynamic Animated Blobs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
          x: [0, 50, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-20 -left-20 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[120px]"
      />
      <motion.div
        animate={{
          scale: [1, 1.5, 1],
          x: [0, -60, 0],
          y: [0, 40, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 right-0 w-[700px] h-[700px] bg-purple-600/10 rounded-full blur-[150px]"
      />
      
      {/* Noise Texture for Premium Look */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('/noise.svg')]"></div>
    </div>
  );
}