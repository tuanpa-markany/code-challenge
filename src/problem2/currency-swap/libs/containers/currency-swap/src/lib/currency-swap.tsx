import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { fetchTokenPrices } from '@currency-swap/api';
import Dropdown from '@currency-swap/dropdown';

const CurrencySwap: React.FC = () => {
  const [fromCurrency, setFromCurrency] = useState<string>('ETH');
  const [toCurrency, setToCurrency] = useState<string>('USDC');
  const [amount, setAmount] = useState<string>('');
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const {
    data: prices,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['fetchPrices'],
    queryFn: fetchTokenPrices,
  });

  useEffect(() => {
    if (prices && amount && fromCurrency !== toCurrency) {
      const fromPrice = prices[fromCurrency]?.price || 0;
      const toPrice = prices[toCurrency]?.price || 0;
      if (fromPrice && toPrice) {
        setConvertedAmount((parseFloat(amount) * fromPrice) / toPrice);
      } else {
        setConvertedAmount(null);
      }
    }
  }, [amount, fromCurrency, toCurrency, prices]);

  const handleSwap = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert(
        `Swapped ${amount} ${fromCurrency} to ${convertedAmount?.toFixed(
          4
        )} ${toCurrency}`
      );
    }, 1500);
  };

  return (
    <div>
      {isLoading && (
        <p className="text-center text-gray-500">Loading prices...</p>
      )}
      {error && (
        <p className="text-center text-red-500">Error fetching prices</p>
      )}

      <Dropdown
        label="From"
        selected={fromCurrency}
        setSelected={setFromCurrency}
        prices={prices}
      />
      <Dropdown
        label="To"
        selected={toCurrency}
        setSelected={setToCurrency}
        prices={prices}
      />

      <div className="mb-3">
        <label className="block text-sm font-medium">Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>

      {convertedAmount !== null && (
        <div className="mb-3 text-gray-700 text-sm">
          Estimated: {convertedAmount.toFixed(4)} {toCurrency}
        </div>
      )}

      <button
        onClick={handleSwap}
        disabled={loading || !amount || !convertedAmount}
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-300"
      >
        {loading ? 'Swapping...' : 'Swap'} {loading} {amount} {convertedAmount}{' '}
        to{' '}
      </button>
    </div>
  );
};

const CurrencySwapContainer: React.FC = () => {
  return (
    <div className="w-96 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold text-center mb-4">Currency Swap</h2>
      <CurrencySwap />
    </div>
  );
};

export default CurrencySwapContainer;
