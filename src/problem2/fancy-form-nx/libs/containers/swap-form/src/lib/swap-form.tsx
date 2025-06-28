import { useEffect } from 'react';
import { useSwapStore } from '@fancy-form-nx/store';
import { fetchTokenPrices } from '@fancy-form-nx/utils';
import {
  AmountInput,
  SwapButton,
  SwapPreview,
  TokenSelect,
} from '@fancy-form-nx/ui';

export function SwapForm() {
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
      setTokenList(data);
    });
  }, [setTokenList]);

  const isFormValid =
    fromToken && toToken && amount && fromToken.symbol !== toToken.symbol;

  const handleSubmit = () => {
    if (isFormValid) {
      alert(`Swapping ${amount} ${fromToken?.symbol} to ${toToken?.symbol}`);
    }
  };

  return (
    <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md space-y-6">
      <h1 className="text-3xl font-bold text-center">Currency Swap</h1>

      <div className="space-y-4">
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
      </div>

      <SwapPreview amount={amount} fromToken={fromToken} toToken={toToken} />

      <SwapButton onClick={handleSubmit} disabled={!isFormValid} />
    </div>
  );
}
