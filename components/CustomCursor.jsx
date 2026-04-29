"use client";
import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Smooth springs for a "Liquid" following effect
  const springConfig = { damping: 25, stiffness: 200 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  useEffect(() => {
    const moveMouse = (e) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    window.addEventListener("mousemove", moveMouse);

    // Check if hovering over buttons or links
    const handleHover = () => setIsHovering(true);
    const handleUnhover = () => setIsHovering(false);

    const interactiveElements = document.querySelectorAll("button, a, .hover-target");
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleHover);
      el.addEventListener("mouseleave", handleUnhover);
    });

    return () => {
      window.removeEventListener("mousemove", moveMouse);
    };
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full border border-white z-[9999] pointer-events-none flex items-center justify-center"
      style={{
        x: cursorX,
        y: cursorY,
        backgroundColor: isHovering ? "rgba(255, 255, 255, 0.1)" : "transparent",
        backdropFilter: isHovering ? "blur(4px)" : "none",
      }}
      animate={{
        scale: isHovering ? 2.5 : 1,
        borderColor: isHovering ? "rgba(249, 115, 22, 0.5)" : "rgba(255, 255, 255, 0.5)",
      }}
    >
      {/* Tiny dot in the center */}
      <div className="w-1 h-1 bg-orange-500 rounded-full" />
    </motion.div>
  );
}