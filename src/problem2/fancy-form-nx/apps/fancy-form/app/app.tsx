import { useSwapStore } from '@fancy-form-nx/store';
import { fetchTokenPrices } from '@fancy-form-nx/utils';
import { useEffect } from 'react';
import {
  AmountInput,
  SwapButton,
  SwapPreview,
  TokenSelect,
} from '@fancy-form-nx/ui';
import '../styles.css';

export function App() {
  const {
    fromToken,
    toToken,
    amount,
    tokenList,
    setTokenList,
    setFromToken,
    setToToken,
    setAmount,
  } = useSwapStore();

  useEffect(() => {
    fetchTokenPrices().then((data) => {
      console.log('data', data);
      setTokenList(data);
    });
  }, [setTokenList]);

  console.log('tokenList', tokenList);

  const isFormValid =
    fromToken && toToken && amount && fromToken.symbol !== toToken.symbol;

  const handleSubmit = () => {
    if (isFormValid) {
      alert(`Swapping ${amount} ${fromToken?.symbol} to ${toToken?.symbol}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-100">
      <div className="max-w-md w-full bg-white p-6 rounded-xl shadow-md space-y-4">
        <h1 className="text-xl font-bold mb-4">Currency Swap</h1>

        <TokenSelect
          label="From"
          tokens={tokenList}
          selected={fromToken}
          onChange={setFromToken}
        />

        <TokenSelect
          label="To"
          tokens={tokenList}
          selected={toToken}
          onChange={setToToken}
        />

        <AmountInput label="Amount" value={amount} onChange={setAmount} />

        <SwapPreview amount={amount} fromToken={fromToken} toToken={toToken} />

        <SwapButton onClick={handleSubmit} disabled={!isFormValid} />
      </div>
    </div>
  );
}

export default App;
