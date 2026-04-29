"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Trash2, Loader2 } from "lucide-react";
// 1. Context ko import karein
import { useApp } from "../../context/AppContext"; 

export default function WishlistPage() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // 2. Context se update function nikalain
    const { updateWishlistCount } = useApp();

    useEffect(() => {
        fetchWishlist();
    }, []);

    const fetchWishlist = async () => {
        try {
            const res = await fetch('/api/wishlist');
            const data = await res.json();
            setItems(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Failed to fetch wishlist", err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (itemId) => {
        try {
            const res = await fetch('/api/wishlist', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id: itemId }),
            });

            if (res.ok) {
                // 3. Pehle screen se item hatao (Instant feeling)
                setItems(prev => prev.filter(item => item._id !== itemId));
                
                // 4. NAVBAR KO UPDATE KARO (Ye missing tha)
                updateWishlistCount(); 
            } else {
                console.error("Delete failed on server");
            }
        } catch (err) {
            console.error("Delete failed", err);
        }
    };

    return (
        <main className="min-h-screen bg-[#050505] text-white pt-32 pb-20 px-6 md:px-12 relative overflow-hidden">
            {/* Background Vibes */}
            <div className="fixed inset-0 z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-teal-500/5 blur-[150px] rounded-full" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] bg-center" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto">
                <div className="mb-20">
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-orange-500 text-[9px] tracking-[0.6em] uppercase font-black mb-4"
                    >
                        Vault / Saved Pieces
                    </motion.p>
                    <motion.h1
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic leading-none"
                    >
                        Wish <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.3)' }}>List</span>
                    </motion.h1>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <Loader2 className="animate-spin text-orange-500" size={32} />
                    </div>
                ) : items.length === 0 ? (
                    <div className="text-center py-20">
                        <h2 className="text-2xl font-bold text-white/20 uppercase italic">Your vault is empty</h2>
                        <Link href="/collection" className="mt-6 inline-block text-orange-500 font-bold tracking-widest text-xs border-b border-orange-500">EXPLORE COLLECTIONS</Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <AnimatePresence mode="popLayout">
                            {items.map((item) => (
                                <motion.div
                                    key={item._id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                                    whileHover={{ y: -8 }}
                                    className="group relative bg-white/[0.02] border border-white/5 backdrop-blur-3xl rounded-[32px] overflow-hidden p-6 transition-all hover:bg-white/[0.04] hover:border-white/10"
                                >
                                    <div className="relative aspect-square w-full rounded-2xl bg-black/40 overflow-hidden mb-6">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-full h-full object-contain p-8 transition-transform duration-700 group-hover:scale-110"
                                        />
                                        <button
                                            onClick={() => handleDelete(item._id)}
                                            className="absolute top-4 right-4 p-3 bg-black/50 backdrop-blur-md rounded-full border border-white/5 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500/20 hover:border-red-500/50"
                                        >
                                            <Trash2 size={16} className="text-white/60 hover:text-white" />
                                        </button>
                                    </div>

                                    <div className="flex justify-between items-start">
                                        <div>
                                            <span className="text-[8px] uppercase tracking-widest text-white/30 font-bold">{item.category}</span>
                                            <h3 className="text-lg font-bold uppercase tracking-tight mt-1">{item.name}</h3>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-lg font-black italic">{item.price}</p>
                                            <Link href={`/product/${item.productId}`} className="text-[9px] uppercase tracking-widest text-orange-500 font-black mt-2 inline-block border-b border-orange-500/0 hover:border-orange-500 transition-all">
                                                View Details
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </main>
    );
}