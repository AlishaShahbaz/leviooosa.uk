import mongoose from 'mongoose';

const WishlistSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String },
}, { timestamps: true });

export default mongoose.models.Wishlist || mongoose.model('Wishlist', WishlistSchema);