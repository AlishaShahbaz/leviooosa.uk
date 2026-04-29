"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import Link from 'next/link';

const CartSidebar = () => {
  const { cart, isOpen, setIsOpen, closeCart, removeFromCart, cartTotal } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[1000]"
          />
          
          {/* Sidebar */}
          <motion.div 
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full md:w-[450px] bg-[#0a0a0a] border-l border-white/5 z-[1001] p-8 flex flex-col"
          >
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-xl font-black uppercase tracking-[0.3em]">Your Bag</h2>
              <button onClick={() => setIsOpen(false)} className="text-white/40 hover:text-white uppercase text-[10px] tracking-widest">Close</button>
            </div>

            <div className="flex-grow overflow-y-auto space-y-8 custom-scrollbar">
              {cart.length === 0 ? (
                <p className="text-white/20 text-[10px] uppercase tracking-widest text-center mt-20">Archive is empty</p>
              ) : (
                cart.map((item, idx) => (
                  <div key={`${item.id}-${item.size}-${idx}`} className="flex gap-6 items-center">
                    <div className="w-20 h-24 bg-white/5 rounded-lg overflow-hidden flex-shrink-0">
                      <img src={item.image} className="w-full h-full object-cover" alt={item.title} />
                    </div>
                    <div className="flex-grow">
                      <h4 className="text-[11px] font-bold uppercase tracking-widest">{item.title}</h4>
                      <p className="text-[9px] text-white/30 uppercase mt-1">Size: {item.size} — Qty: {item.quantity}</p>
                      {/* PKR Symbol updated here */}
                      <p className="text-orange-500 text-[11px] mt-2 font-bold">Rs. {item.price}</p>
                    </div>
                    <button onClick={() => removeFromCart(item.id, item.size)} className="text-white/10 hover:text-red-500 transition-colors text-xl">×</button>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="pt-8 border-t border-white/5">
                <div className="flex justify-between mb-6">
                  <span className="text-[10px] uppercase tracking-widest text-white/40">Total</span>
                  {/* toLocaleString uses commas for professional look */}
                  <span className="text-lg font-bold text-white">Rs. {cartTotal.toLocaleString()}</span>
                </div>
                {/* Fixed: Added closeCart to onClick */}
                <Link href="/checkout" onClick={closeCart} className="w-full block">
                  <button className="w-full bg-white text-black py-5 rounded-full font-black uppercase text-[11px] tracking-[0.4em] hover:bg-orange-500 hover:text-white transition-all">
                    Proceed to Checkout
                  </button>
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;