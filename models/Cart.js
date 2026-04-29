import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
  // 'productId' ki jagah sirf 'id' rakhein taake context ke data se match kare
  id: { type: String, required: true }, 
  title: { type: String, required: true },
  price: { type: String, required: true },
  image: { type: String },
  size: { type: String, required: true },
  quantity: { type: Number, default: 1 },
}, { timestamps: true });

// Check karein ke Model 'Cart' hi export ho raha hai
export default mongoose.models.Cart || mongoose.model("Cart", CartSchema);