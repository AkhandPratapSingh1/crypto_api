import express from 'express';
import mongoose from 'mongoose';
import priceRoutes from './routes/priceRoutes';
import { pollData } from './utils/fetchData';

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(express.json());

// Routes
app.use('/api/prices', priceRoutes);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/price-tracker')
  .then(() => {
    console.log('MongoDB connected');
    // Start polling data once MongoDB is connected
    pollData();
  })
  .catch((err) => console.error('MongoDB connection error:', err));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
