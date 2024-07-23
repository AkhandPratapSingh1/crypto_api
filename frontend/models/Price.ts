// models/Price.ts
import mongoose from 'mongoose';

const PriceSchema = new mongoose.Schema({
  symbol: String,
  time: Date,
  price: Number,
});

export default mongoose.models.Price || mongoose.model('Price', PriceSchema);
