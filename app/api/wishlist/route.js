import { NextResponse } from 'next/server';
import dbConnect from "../../../lib/dbConnect"; 
import Wishlist from '../../../models/Wishlist';

// GET: Fetch all wishlist items
export async function GET() {
    try {
        await dbConnect();
        const items = await Wishlist.find({}).sort({ createdAt: -1 }); // Newest items first
        return NextResponse.json(items);
    } catch (error) {
        console.error("GET Error:", error);
        return NextResponse.json([], { status: 500 }); // Return empty array on error to prevent crash
    }
}

// POST: Add item to wishlist
export async function POST(req) {
    try {
        await dbConnect();
        const data = await req.json();
        
        // Basic validation taake empty data create na ho
        if (!data.productId) {
            return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
        }

        const newItem = await Wishlist.create(data);
        return NextResponse.json(newItem, { status: 201 });
    } catch (error) {
        console.error("POST Error:", error);
        return NextResponse.json({ error: "Database Connection Failed" }, { status: 500 });
    }
}

// DELETE: Remove item from wishlist
export async function DELETE(req) {
    try {
        await dbConnect();
        const { id } = await req.json();

        if (!id) {
            return NextResponse.json({ error: "ID is required" }, { status: 400 });
        }

        const deletedItem = await Wishlist.findByIdAndDelete(id);
        
        if (!deletedItem) {
            return NextResponse.json({ error: "Item not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Deleted successfully" });
    } catch (error) {
        console.error("DELETE Error:", error);
        return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
    }
}