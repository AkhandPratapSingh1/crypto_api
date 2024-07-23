import express from 'express';
import PriceData from '../models/priceDataModel';

const router = express.Router();

router.get('/:symbol', async (req, res) => {
  try {
    const symbol = req.params.symbol;
    const data = await PriceData.find({ symbol }).sort({ timestamp: -1 }).limit(20);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching data', error });
  }
});

export default router;
