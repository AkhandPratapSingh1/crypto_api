import mongoose, { Schema, Document } from 'mongoose';

export interface IPriceData extends Document {
  symbol: string;
  price: number;
  marketCap: number;
  volume: number;
  change24h: number;
  lastUpdated: Date;
  timestamp: Date;
}

const priceSchema: Schema = new Schema({
  symbol: { type: String, required: true },
  price: { type: Number, required: true },
  marketCap: { type: Number, required: true },
  volume: { type: Number, required: true },
  change24h: { type: Number, required: true },
  lastUpdated: { type: Date, required: true },
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model<IPriceData>('price', priceSchema);
