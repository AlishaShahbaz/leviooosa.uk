"use client";
import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

const CheckoutPage = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const router = useRouter();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '', email: '', address: '', city: '', postcode: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return alert("Cart is empty!");
    
    setLoading(true);
    try {
      // Clean data for Database (removing symbols, ensuring numbers)
      const cleanedItems = cart.map(item => ({
        ...item,
        price: Number(item.price.toString().replace(/[^0-9.]/g, '')),
        id: item.id || item._id || `man-${Date.now()}`
      }));

      const cleanedTotal = Number(cartTotal.toString().replace(/[^0-9.]/g, ''));

      const res = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerInfo: formData,
          items: cleanedItems,
          totalAmount: cleanedTotal,
          paymentMethod: paymentMethod,
        }),
      });

      const result = await res.json();

      if (res.ok) {
        alert("✅ Order Placed Successfully!");
        // Safely call clearCart now
        if (typeof clearCart === 'function') {
          await clearCart();
        }
        router.push('/'); 
      } else {
        alert(`❌ Order failed: ${result.error || "Try again"}`);
      }
    } catch (err) {
      console.error("Submission Error:", err);
      alert("❌ Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white pt-24 pb-12 px-6 md:px-12 font-sans relative overflow-hidden">
      <div className="fixed top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#1a1a1a,0%,#0a0a0a_100%)] -z-10" />
      
      <div className="max-w-6xl mx-auto">
        <motion.h1 initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-4xl md:text-6xl font-black italic tracking-tighter uppercase mb-10">
          THE <span className="text-[#ff4d00]">CHECKOUT</span>
        </motion.h1>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-10">
            <section className="space-y-6">
              <h2 className="text-sm font-bold tracking-[0.2em] uppercase border-b border-white/10 pb-2">Shipping Address</h2>
              <div className="grid grid-cols-1 gap-4 text-sm">
                <input name="name" required value={formData.name} onChange={handleChange} placeholder="FULL NAME" type="text" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-[#ff4d00] transition-all" />
                <input name="email" required value={formData.email} onChange={handleChange} placeholder="EMAIL ADDRESS" type="email" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-[#ff4d00] transition-all" />
                <input name="address" required value={formData.address} onChange={handleChange} placeholder="STREET ADDRESS" type="text" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-[#ff4d00] transition-all" />
                <div className="grid grid-cols-2 gap-4">
                  <input name="city" required value={formData.city} onChange={handleChange} placeholder="CITY" type="text" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-[#ff4d00] transition-all" />
                  <input name="postcode" required value={formData.postcode} onChange={handleChange} placeholder="POSTCODE" type="text" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-[#ff4d00] transition-all" />
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-sm font-bold tracking-[0.2em] uppercase border-b border-white/10 pb-2">Payment Method</h2>
              <div className="space-y-4">
                <div onClick={() => setPaymentMethod('card')} className={`bg-white/5 border ${paymentMethod === 'card' ? 'border-[#ff4d00]' : 'border-white/10'} p-4 rounded-xl cursor-pointer flex justify-between items-center`}>
                  <span className="text-[10px] tracking-widest uppercase text-white/60">Credit Card</span>
                  <div className="w-4 h-4 border border-white/20 rounded-full flex items-center justify-center">{paymentMethod === 'card' && <div className="w-2 h-2 bg-[#ff4d00] rounded-full" />}</div>
                </div>
                <div onClick={() => setPaymentMethod('cod')} className={`bg-white/5 border ${paymentMethod === 'cod' ? 'border-[#ff4d00]' : 'border-white/10'} p-4 rounded-xl cursor-pointer flex justify-between items-center`}>
                  <span className="text-[10px] tracking-widest uppercase text-white/60">Cash on Delivery (COD)</span>
                  <div className="w-4 h-4 border border-white/20 rounded-full flex items-center justify-center">{paymentMethod === 'cod' && <div className="w-2 h-2 bg-[#ff4d00] rounded-full" />}</div>
                </div>
              </div>
            </section>

            <button disabled={loading} type="submit" className="w-full bg-white text-black font-black py-4 rounded-full uppercase tracking-[0.2em] text-xs hover:bg-[#ff4d00] hover:text-white transition-all duration-500 disabled:bg-zinc-800">
              {loading ? "PROCESSING..." : "Place Order"}
            </button>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-5 rounded-[1.2rem] sticky top-28">
              <h2 className="text-md font-bold italic tracking-tighter uppercase mb-5 border-b border-white/10 pb-3">Order Summary</h2>
              <div className="space-y-4 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
                {cart.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="flex space-x-3 items-center">
                    <div className="w-12 h-12 bg-zinc-900 rounded-md overflow-hidden border border-white/5 flex-shrink-0">
                      <img src={item.image} className="w-full h-full object-cover opacity-80" alt={item.title} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-[9px] font-black uppercase tracking-tight">{item.title}</h3>
                      <p className="text-[8px] text-white/40">Size: {item.size} — Qty: {item.quantity}</p>
                      <p className="text-[#ff4d00] font-bold text-[10px]">Rs.{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-white/10 flex justify-between items-end">
                <span className="text-lg font-black italic tracking-tighter uppercase">Total:</span>
                <span className="text-xl font-black text-[#ff4d00]">Rs.{cartTotal}.00</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;