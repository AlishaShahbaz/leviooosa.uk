import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
  items: [
    {
      id: { type: String, required: true },
      title: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
      size: { type: String },
      image: { type: String },
    }
  ],
  customerInfo: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    postcode: { type: String, required: true }, // 👈 Ye missing tha
  },
  totalAmount: { type: Number, required: true },
  paymentMethod: { type: String, required: true }, // 👈 Frontend se match karne k liye
  status: { 
    type: String, 
    default: "Pending",
    enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"] // Security k liye
  },
}, { timestamps: true });

// Pehle check karein k model exist karta hai ya nahi (Next.js hot reloading fix)
export default mongoose.models.Order || mongoose.model("Order", OrderSchema);