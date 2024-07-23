import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPrices } from '../redux/actions/priceActions';
import { RootState } from '../redux/store';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';
import Modal from '../components/Modal';

// Register ChartJS components
ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const icons: { [key: string]: string } = {
  bitcoin: '/icons/bitcoin.png',  // Replace with actual paths to icon images
  ethereum: '/icons/ethereum.png',
  litecoin: '/icons/litecoin.png',
  ripple: '/icons/ripple.png',
  cardano: '/icons/cardano.png'
};

const Home = () => {
  const dispatch = useDispatch();
  const pricedatas = useSelector((state: RootState) => state.prices.data);
  const loading = useSelector((state: RootState) => state.prices.loading);
  const error = useSelector((state: RootState) => state.prices.error);
  const [selectedCrypto, setSelectedCrypto] = useState<string | null>(null);
  const [cryptoData, setCryptoData] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Fetch initial data
    dispatch(fetchPrices(['bitcoin', 'ethereum', 'litecoin', 'ripple', 'cardano']));
    
    // Set up interval to fetch data every 10 seconds
    const interval = setInterval(() => {
      dispatch(fetchPrices(['bitcoin', 'ethereum', 'litecoin', 'ripple', 'cardano']));
    }, 10000);

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, [dispatch]);

  useEffect(() => {
    if (selectedCrypto) {
      const filteredData = pricedatas.flat().filter((data: any) => data.symbol === selectedCrypto);
      setCryptoData(filteredData);
    }
  }, [selectedCrypto, pricedatas]);

  const handleSelectCrypto = (crypto: string) => {
    setSelectedCrypto(crypto);
  };

  const handleOpenModal = (crypto: any) => {
    setSelectedCrypto(crypto.symbol);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCrypto(null);
  };

  // Prepare data for chart
  const chartData = {
    labels: cryptoData.slice(-20).map(data => new Date(data.timestamp).toLocaleString()),
    datasets: [
      {
        label: selectedCrypto,
        data: cryptoData.slice(-20).map(data => data.price),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            return `Price: $${context.raw}`;
          }
        }
      }
    },
    scales: {
      x: {
        display: false // Hide x-axis
      },
      y: {
        display: false // Hide y-axis
      }
    }
  };

  // Sort and limit data for table
  const sortedData = cryptoData.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  const last20Entries = sortedData.slice(0, 20);

  return (
    <div className="w-full min-h-screen p-4 bg-gray-900 text-white">
      {/* <h1 className="text-4xl font-bold text-center mb-4 bg-gray-900">Crypto Prices</h1> */}
      <div className="flex flex-col sm:flex-row justify-between items-start mb-4 px-0 bg-gray-900">
        <div className="flex flex-wrap gap-6 mx-0">
          {Object.keys(icons).map((crypto) => (
            <button
              key={crypto}
              onClick={() => handleSelectCrypto(crypto)}
              className="flex items-center px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
            >
              <img src={icons[crypto]} alt={crypto} className="w-6 h-6 mr-2" />
              {crypto.charAt(0).toUpperCase() + crypto.slice(1)}
            </button>
          ))}
        </div>
        {selectedCrypto && cryptoData.length > 0 && (
          <div className="relative flex-shrink-0 w-full sm:w-[300px] h-[80px] mt-2">
            <Line data={chartData} options={chartOptions} />
          </div>
        )}
      </div>
      {loading && <p className="text-center text-gray-400">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {selectedCrypto && (
        <>
          <h2 className="text-3xl font-semibold mb-2 text-center bg-gray-900">{selectedCrypto.charAt(0).toUpperCase() + selectedCrypto.slice(1)} Data</h2>
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse text-gray-300 bg-gray-900">
              <thead>
                <tr className="bg-gray-800">
                  <th className="px-4 py-2 border border-gray-700 text-left">Symbol</th>
                  <th className="px-4 py-2 border border-gray-700 text-right">Price</th>
                  <th className="px-4 py-2 border border-gray-700 text-right">Volume</th>
                  <th className="px-4 py-2 border border-gray-700 text-right">Market Cap</th>
                  <th className="px-4 py-2 border border-gray-700 text-left">Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {last20Entries.map((price: any, index: number) => (
                  <tr key={index} className="border-b border-gray-700">
                    <td className="px-4 py-2 text-left flex items-center">
                    <img src={icons[price.symbol]} alt={price.symbol} className="w-6 h-6 mr-2" /> 
                      {price.symbol}
                    </td>
                    <td className="px-4 py-2 text-right">${price.price.toLocaleString()}</td>
                    <td className="px-4 py-2 text-right">${price.volume.toLocaleString()}</td>
                    <td className="px-4 py-2 text-right">${price.marketCap.toLocaleString()}</td>
                    <td className="px-4 py-2 text-left">{new Date(price.timestamp).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} crypto={selectedCrypto} />
    </div>
  );
};

export default Home;
