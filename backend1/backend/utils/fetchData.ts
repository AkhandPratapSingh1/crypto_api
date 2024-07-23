import axios from 'axios';
import PriceData from '../models/priceDataModel';

const symbols = ['bitcoin', 'ethereum', 'litecoin', 'ripple', 'cardano'];
const apiUrl = 'https://api.coingecko.com/api/v3/simple/price';

interface PriceResponse {
  [key: string]: {
    usd: number;
    usd_market_cap: number;
    usd_24h_vol: number;
    usd_24h_change: number;
    last_updated_at: number; // Timestamp in seconds
  };
}

export const fetchPrices = async () => {
  try {
    const response = await axios.get(apiUrl, {
      params: {
        ids: symbols.join(','),
        vs_currencies: 'usd',
        include_market_cap: 'true',
        include_24hr_vol: 'true',
        include_24hr_change: 'true',
        include_last_updated_at: 'true'
      }
    });

    const prices: PriceResponse = response.data;
    const timestamp = new Date();

    for (const symbol of symbols) {
      const priceData = prices[symbol];
      if (priceData) {
        const { usd, usd_market_cap, usd_24h_vol, usd_24h_change, last_updated_at } = priceData;

        const priceEntry = new PriceData({
          symbol,
          price: usd,
          marketCap: usd_market_cap,
          volume: usd_24h_vol,
          change24h: usd_24h_change,
          lastUpdated: new Date(last_updated_at * 1000), // Convert UNIX timestamp to Date
          timestamp
        });

        await priceEntry.save();
      }
    }

    console.log('Prices saved to database');
  } catch (error) {
    console.error('Error fetching prices:', error);
  }
};

export const pollData = () => {
  fetchPrices();
  setInterval(fetchPrices, 5000); // Poll every 5 seconds
};
