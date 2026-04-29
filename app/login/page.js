"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { signIn } from "next-auth/react"; // 👈 Logic Added
import { useRouter } from "next/navigation"; // 👈 For redirecting

export default function LoginPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: "", password: "", name: "" });
  const [loading, setLoading] = useState(false); // 👈 Show loading state

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (isLogin) {
      // --- LOGIN LOGIC ---
      const res = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false, // Page refresh se bachne ke liye
      });

      if (res?.error) {
        alert("Invalid Access Key or Cipher"); // Aap yahan toast bhi laga sakte hain
      } else {
        router.push("/"); // Successful login ke baad home par
      }
    } else {
      // --- SIGNUP LOGIC ---
      try {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        if (res.ok) {
          alert("Protocol Initialized. You can now login.");
          setIsLogin(true); // Signup ke baad login mode par le jao
        } else {
          const data = await res.json();
          alert(data.message || "Registration Failed");
        }
      } catch (err) {
        console.error("Signup error:", err);
      }
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-transparent pt-40 flex items-center justify-center px-6 relative overflow-hidden">
      
      {/* Background Decorative Glow - Style Maintained */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-500/10 blur-[120px] rounded-full pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-white/[0.02] backdrop-blur-2xl border border-white/5 p-12 rounded-3xl shadow-2xl">
          
          {/* Header - Style Maintained */}
          <div className="text-center mb-12">
            <div className="inline-block w-12 h-12 border border-orange-500/30 rounded-full mb-6 flex items-center justify-center">
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
            </div>
            <h2 className="text-3xl font-bold text-white uppercase tracking-[0.2em] mb-2">
              Identity <span className="italic font-light text-orange-500">{isLogin ? "Check" : "Creation"}</span>
            </h2>
            <p className="text-[10px] text-white/30 uppercase tracking-[0.3em]">
              {isLogin ? "Authorized Personnel Only" : "Initialize New Protocol"}
            </p>
          </div>

          {/* Form */}
          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="space-y-4">
              
              {/* Name Field Logic */}
              <AnimatePresence>
                {!isLogin && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="group relative overflow-hidden"
                  >
                    <label className="text-[9px] text-white/20 uppercase tracking-[0.4em] mb-2 block group-focus-within:text-orange-500 transition-colors">
                      Full Name
                    </label>
                    <input 
                      name="name"
                      type="text" 
                      required
                      onChange={handleInputChange}
                      placeholder="Your Name"
                      className="w-full bg-white/[0.03] border border-white/5 rounded-xl px-5 py-4 text-white text-sm focus:border-orange-500/50 outline-none transition-all placeholder:text-white/10 tracking-wide"
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="group relative">
                <label className="text-[9px] text-white/20 uppercase tracking-[0.4em] mb-2 block group-focus-within:text-orange-500 transition-colors">
                  Access Key
                </label>
                <input 
                  name="email"
                  type="email" 
                  required
                  onChange={handleInputChange}
                  placeholder="name@levioosa.uk"
                  className="w-full bg-white/[0.03] border border-white/5 rounded-xl px-5 py-4 text-white text-sm focus:border-orange-500/50 outline-none transition-all placeholder:text-white/10 tracking-wide"
                />
              </div>

              <div className="group relative">
                <label className="text-[9px] text-white/20 uppercase tracking-[0.4em] mb-2 block group-focus-within:text-orange-500 transition-colors">
                  Cipher
                </label>
                <input 
                  name="password"
                  type="password" 
                  required
                  onChange={handleInputChange}
                  placeholder="••••••••"
                  className="w-full bg-white/[0.03] border border-white/5 rounded-xl px-5 py-4 text-white text-sm focus:border-orange-500/50 outline-none transition-all placeholder:text-white/10 tracking-widest"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className={`w-full group relative overflow-hidden bg-white py-5 rounded-xl transition-all duration-500 hover:bg-orange-500 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <span className="relative z-10 text-black group-hover:text-white font-black uppercase text-[11px] tracking-[0.5em]">
                {loading ? "Processing..." : (isLogin ? "Grant Access" : "Create Identity")}
              </span>
              {!loading && (
                <div className="absolute inset-0 bg-orange-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              )}
            </button>
          </form>

          {/* Footer Switcher */}
          <div className="mt-10 text-center">
            <button 
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-[9px] text-white/20 uppercase tracking-widest hover:text-white transition-colors border-none bg-transparent cursor-pointer"
            >
              {isLogin ? "Request Entry — New Member?" : "Already Verified? Access Key"}
            </button>
          </div>
        </div>
        
        {/* Security Stamp */}
        <div className="mt-8 text-center">
          <p className="text-[8px] text-white/10 uppercase tracking-[0.8em] font-bold">
            Secure Protocol 2.0.2.6
          </p>
        </div>
      </motion.div>
    </main>
  );
}