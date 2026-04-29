"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

// Ye wahi data hai jo main page par tha, real project mein aap isay database se layein ge
const BLOG_POSTS = {
  "1": {
    title: "THE ART OF MINIMALIST FASHION",
    category: "LIFESTYLE",
    date: "APR 20, 2026",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop",
    content: `Minimalism is not just a trend; it's a statement of sophistication. At Levioosa, we believe that the clothes you wear should reflect your inner calm and external power. 

    In this editorial, we explore how simple silhouettes, premium fabrics, and a monochromatic palette can create a high-end look that stands the test of time. Whether it's a crisp white tee or a tailored black blazer, the key is the fit and the quality of the material.

    Streetwear is evolving. It's moving away from loud logos and towards "Quiet Luxury." This means focusing on the texture of the cotton, the weight of the hoodie, and the precision of the stitching. Join us as we redefine the modern wardrobe.`
  },
  "2": {
    title: "SUMMER 2026: FLORAL & MODEST",
    category: "COLLECTION",
    date: "APR 25, 2026",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1920&auto=format&fit=crop",
    content: "Our Summer 2026 collection is finally here. We've combined the breezy feel of summer with the elegance of modest western silhouettes. Featuring custom-designed floral prints on premium lawn and silk blends, this collection is for the bold yet graceful. Every piece is designed to keep you cool while looking exceptionally premium."
  },
  "3": {
    title: "BEHIND THE SCENES: LEVIOOSA STUDIO",
    category: "INSIDE",
    date: "APR 27, 2026",
    image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1974&auto=format&fit=crop",
    content: "Step inside the Levioosa Studio. This is where the magic happens—from the first sketch to the final professional photoshoot. We believe in transparency and craftsmanship. Our team spends months perfecting a single design before it reaches your doorstep. Quality is our obsession, and our studio is our sanctuary."
  }
};

const SingleBlogPost = () => {
  const { id } = useParams();
  const router = useRouter();
  const post = BLOG_POSTS[id];

  if (!post) return <div className="min-h-screen flex items-center justify-center text-white">Post not found...</div>;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-32 pb-20 px-6 md:px-12 font-sans relative">
      <div className="fixed top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,#1a1a1a,0%,#0a0a0a_100%)] -z-10" />

      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button 
          onClick={() => router.back()}
          className="text-[10px] font-black uppercase tracking-[0.3em] text-[#ff4d00] mb-12 hover:text-white transition-colors"
        >
          ← Back to Archive
        </button>

        {/* Article Header */}
        <motion.header 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6 mb-12"
        >
          <span className="bg-[#ff4d00] text-black text-[9px] font-black tracking-widest uppercase px-4 py-1 rounded-sm">
            {post.category}
          </span>
          <h1 className="text-4xl md:text-7xl font-black italic tracking-tighter uppercase leading-tight">
            {post.title}
          </h1>
          <p className="text-white/40 text-xs font-bold tracking-[0.2em]">{post.date} — BY LEVIOOSA TEAM</p>
        </motion.header>

        {/* Featured Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          animate={{ opacity: 1, scale: 1 }}
          className="aspect-video w-full rounded-3xl overflow-hidden mb-16 border border-white/5"
        >
          <img src={post.image} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" alt={post.title} />
        </motion.div>

        {/* Article Content */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="prose prose-invert max-w-none"
        >
          <p className="text-xl md:text-2xl text-white/80 leading-relaxed font-light whitespace-pre-line">
            {post.content}
          </p>
        </motion.div>

        {/* Footer CTA */}
        <div className="mt-20 pt-12 border-t border-white/10 text-center">
          <p className="text-white/30 text-[10px] uppercase tracking-[0.3em] mb-6">Shop the featured looks</p>
          <Link href="/">
            <button className="bg-white text-black px-12 py-4 rounded-full font-black uppercase text-[10px] tracking-[0.4em] hover:bg-[#ff4d00] hover:text-white transition-all duration-500">
              Explore Collection
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SingleBlogPost;