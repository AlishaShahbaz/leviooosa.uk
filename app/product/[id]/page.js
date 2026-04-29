"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams } from "next/navigation";
import { useCart } from "../../../context/CartContext"; 

const ProductDetail = () => {
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState("M");
  const [activeImage, setActiveImage] = useState(0);
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0, show: false });
  const [isAdding, setIsAdding] = useState(false);

  const product = {
    title: "Royal Noir Jacket",
    price: "£245.00", 
    description: "A masterclass in minimalist outerwear. Featuring liquid-repellent fabric and a tailored silhouette that evolves with your movement.",
    details: ["Premium Nylon Blend", "Liquid-resistant finish", "Internal security pocket", "Made in London"],
    images: [
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=1000",
      "https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=1000",
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000",
    ]
  };

  const { addToCart } = useCart();

  const handleAddToCart = async () => {
    setIsAdding(true);
    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: id,
          title: product.title,
          price: product.price,
          image: product.images[activeImage],
          size: selectedSize,
          quantity: 1
        }),
      });

      if (response.ok) {
        addToCart({
          id: id,
          title: product.title,
          price: product.price,
          image: product.images[activeImage],
          size: selectedSize
        });
      }
    } catch (err) {
      console.error("Cart DB Error:", err);
    } finally {
      setIsAdding(false);
    }
  };

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left) / width) * 100;
    const y = ((e.pageY - top) / height) * 100;
    setZoomPos({ x, y, show: true });
  };

  return (
    <main className="min-h-screen bg-transparent pt-32 overflow-hidden">
      {/* Background Decorative Glows */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-orange-500/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 w-[500px] h-[500px] bg-white/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 mb-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT: Thumbnails */}
          <div className="hidden lg:flex lg:col-span-1 flex-col gap-4">
            {product.images.map((img, idx) => (
              <div 
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`aspect-[3/4] rounded-xl overflow-hidden cursor-pointer border-2 transition-all duration-500 ${activeImage === idx ? 'border-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.3)]' : 'border-white/5 opacity-40 hover:opacity-100'}`}
              >
                <img src={img} className="w-full h-full object-cover grayscale hover:grayscale-0" alt="View" />
              </div>
            ))}
          </div>

          {/* CENTER: Main Image */}
          <div className="lg:col-span-5">
            <motion.div 
              className="relative aspect-[3/4] bg-white/5 rounded-[2.5rem] overflow-hidden border border-white/10 cursor-crosshair group backdrop-blur-sm"
              onMouseMove={handleMouseMove}
              onMouseLeave={() => setZoomPos({ ...zoomPos, show: false })}
            >
              <img 
                src={product.images[activeImage]} 
                alt={product.title} 
                className={`w-full h-full object-cover transition-transform duration-700 ${zoomPos.show ? 'scale-110 opacity-30' : 'scale-100 opacity-80'}`} 
              />
              
              {zoomPos.show && (
                <div 
                  className="absolute inset-0 z-30 pointer-events-none"
                  style={{
                    backgroundImage: `url(${product.images[activeImage]})`,
                    backgroundPosition: `${zoomPos.x}% ${zoomPos.y}%`,
                    backgroundSize: '250%',
                    backgroundRepeat: 'no-repeat'
                  }}
                />
              )}
            </motion.div>
          </div>

          {/* RIGHT: Product Info */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter text-white mb-4">
                {product.title}
              </h1>
              <p className="text-3xl text-orange-500 font-light italic tracking-widest mb-8">
                {product.price}
              </p>
              
              <p className="text-white/40 text-base leading-relaxed mb-10 max-w-md font-light">
                {product.description}
              </p>

              {/* Size Selection */}
              <div className="mb-12">
                <h4 className="text-[9px] uppercase tracking-[0.5em] text-white/20 mb-6 font-black">Dimension Strategy</h4>
                <div className="flex gap-4">
                  {["S", "M", "L", "XL"].map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-14 h-14 rounded-full border text-[11px] font-bold transition-all duration-500 ${
                        selectedSize === size 
                          ? "bg-orange-500 text-white border-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.4)]" 
                          : "border-white/10 text-white/30 hover:border-white/40 bg-white/5"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-5">
                <button 
                  onClick={handleAddToCart} 
                  disabled={isAdding}
                  className="flex-[2] bg-white text-black py-6 rounded-full font-black uppercase text-xs tracking-[0.4em] hover:bg-orange-500 hover:text-white transition-all duration-700 disabled:opacity-50"
                >
                  {isAdding ? "Synchronizing..." : "Initialize Order"}
                </button>
                <button className="flex-1 border border-white/10 text-white py-6 rounded-full font-black uppercase text-[10px] tracking-[0.4em] hover:bg-white/5 backdrop-blur-md transition-all">
                  Virtual V-TON
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* --- REFINED DARK THEME TABS --- */}
      <ProductExtraInfo />
    </main>
  );
};

// --- SUBSIDIARY COMPONENTS (THEMED) ---

const ProductExtraInfo = () => {
  const [activeTab, setActiveTab] = useState("ABOUT");
  const tabs = ["ABOUT", "REVIEWS", "PRODUCT CARE", "FAQS"];

  return (
    <section className="w-full py-32 border-t border-white/5 bg-transparent text-white relative">
      <div className="container mx-auto px-6 relative z-10">
        <header className="text-center mb-24">
          <p className="text-orange-500 text-[10px] font-black tracking-[0.6em] uppercase mb-6">Discovery</p>
          <h2 className="text-5xl md:text-6xl font-extralight uppercase tracking-tight leading-none">
            All about the <br /> 
            <span className="font-black italic text-transparent block mt-2" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.4)' }}>Product</span>
          </h2>
        </header>

        <div className="flex flex-wrap justify-center gap-3 mb-24">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-12 py-5 rounded-full text-[10px] font-black tracking-[0.3em] transition-all duration-700 border ${
                activeTab === tab 
                ? "bg-white text-black border-white shadow-[0_0_30px_rgba(255,255,255,0.1)]" 
                : "bg-white/5 text-white/30 border-white/5 hover:border-white/20"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5, ease: "circOut" }}
            >
              {activeTab === "ABOUT" && <AboutContent />}
              {activeTab === "REVIEWS" && <ReviewsContent />}
              {activeTab === "PRODUCT CARE" && <AccordionContent type="care" />}
              {activeTab === "FAQS" && <AccordionContent type="faq" />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const AboutContent = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
    <div className="aspect-[4/5] rounded-[3rem] overflow-hidden border border-white/5 bg-white/5 backdrop-blur-xl">
      <img src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000" className="w-full h-full object-cover grayscale opacity-50 hover:opacity-100 transition-opacity duration-1000" alt="Detail" />
    </div>
    <div className="space-y-10">
      <h3 className="text-4xl font-black uppercase italic tracking-tighter text-orange-500">Levioosa Iteration</h3>
      <p className="text-xl text-white/40 font-light leading-relaxed italic">
        "Our coats are engineered in our London studio, bridging physical luxury with digital fluidity."
      </p>
      <div className="space-y-6">
        {["Eco-conscious construction", "Liquid-glass finish", "Tailored for digital reality"].map((item, i) => (
          <div key={i} className="flex items-center gap-6 text-[11px] font-bold uppercase tracking-[0.4em] text-white/60">
            <div className="w-12 h-[1px] bg-orange-500/50" /> {item}
          </div>
        ))}
      </div>
    </div>
  </div>
);

const ReviewsContent = () => (
  <div className="space-y-16 max-w-4xl mx-auto">
    <div className="flex justify-between items-end border-b border-white/10 pb-10">
      <h3 className="text-5xl font-black italic uppercase tracking-tighter text-white">Archives <span className="text-white/20 text-2xl font-light ml-4">(3)</span></h3>
      <p className="text-orange-500 font-bold tracking-[0.5em] uppercase text-[9px]">Verified Standard</p>
    </div>
    {[
      { name: "S. Walkinshaw", text: "Quality is beyond expectations. The liquid finish feels unreal." },
      { name: "Risako M", text: "Minimalist perfection. Fits like a second skin in the digital space." },
      { name: "Eden Birch", text: "The London craftsmanship is evident in every stitch. Highly recommended." }
    ].map((rev, i) => (
      <div key={i} className="group relative">
        <div className="flex justify-between mb-6">
          <span className="font-bold text-[10px] tracking-[0.4em] uppercase text-orange-500">{rev.name}</span>
          <div className="text-white/20 text-xs tracking-widest italic group-hover:text-orange-500 transition-colors">5.0 RATING</div>
        </div>
        <p className="text-2xl font-light text-white/30 italic group-hover:text-white transition-all duration-500 leading-snug">"{rev.text}"</p>
      </div>
    ))}
  </div>
);

const AccordionContent = ({ type }) => {
  const data = type === 'care' ? [
    { q: "Surface Maintenance", a: "Use a clean, damp cloth for mark removal." },
    { q: "Machine Protocol", a: "Cold wash only. Avoid harsh chemicals." },
    { q: "Preservation", a: "Store in a cool, dry place. Avoid direct sunlight." }
  ] : [
    { q: "Digital Reality?", a: "Our designs are optimized for both physical wear and digital presentation." },
    { q: "Sustainability?", a: "Limited production runs to minimize waste." },
    { q: "Global Logistics?", a: "Shipping directly from our London studio to your location." }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
      <div className="aspect-[4/5] rounded-[3rem] overflow-hidden border border-white/5 grayscale">
        <img src="https://images.unsplash.com/photo-1544022613-e87ca75a784a?q=80&w=1000" className="w-full h-full object-cover opacity-30 hover:opacity-100 transition-all duration-1000" alt="Info" />
      </div>
      <div className="divide-y divide-white/5">
        {data.map((item, i) => (
          <details key={i} className="group py-10">
            <summary className="flex justify-between items-center cursor-pointer list-none font-black uppercase italic tracking-tighter text-2xl text-white/40 group-hover:text-white transition-colors">
              {item.q}
              <span className="group-open:rotate-45 transition-transform duration-500 text-orange-500">+</span>
            </summary>
            <p className="pt-8 text-white/30 font-light leading-relaxed italic text-lg">{item.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
};

export default ProductDetail;