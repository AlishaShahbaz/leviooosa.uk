"use client";
import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [wishlistCount, setWishlistCount] = useState(0);

    const updateWishlistCount = useCallback(async () => {
        try {
            // Relative path check kar lein agar error aye to ../../../ use karein
            const res = await fetch('/api/wishlist', { cache: 'no-store' });
            if (!res.ok) return;
            const data = await res.json();
            const count = Array.isArray(data) ? data.length : 0;
            setWishlistCount(count);
        } catch (err) {
            console.error("Wishlist sync error", err);
        }
    }, []);

    useEffect(() => {
        updateWishlistCount();
    }, [updateWishlistCount]);

    return (
        <AppContext.Provider value={{ wishlistCount, updateWishlistCount }}>
            {children}
        </AppContext.Provider>
    );
};

// Navbar isay dhoond raha hai
export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) throw new Error("useApp must be used within AppProvider");
    return context;
};