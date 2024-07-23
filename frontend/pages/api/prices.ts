// pages/api/prices.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from '../../utils/db';
import Price from '../../models/Price';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { symbol } = req.query;

  if (typeof symbol !== 'string') {
    return res.status(400).json({ message: 'Invalid symbol' });
  }

  await connectToDatabase();

  try {
    const pricedatas = await Price.find({ symbol })
      .sort({ timestamp: -1 })  // Assuming 'timestamp' is the correct field for sorting
      .limit(20)
      .exec();

    res.status(200).json(pricedatas);
  } catch (error) {
    console.error('Error fetching prices:', error);
    res.status(500).json({ message: 'Error fetching prices' });
  }
}
