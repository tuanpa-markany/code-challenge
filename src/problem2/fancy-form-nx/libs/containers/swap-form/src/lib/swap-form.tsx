import { useEffect, useState } from 'react';
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

  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');

  useEffect(() => {
    fetchTokenPrices()
      .then((data) => {
        setTokenList(data);
      })
      .catch(() => setStatus('error'));
  }, [setTokenList]);

  const isFormValid =
    fromToken && toToken && amount && fromToken.symbol !== toToken.symbol;

  const handleSubmit = async () => {
    if (!isFormValid) return;

    // simulate async behavior
    await new Promise((resolve) => setTimeout(resolve, 800));
    setStatus('success');
    alert(`Swapping ${amount} ${fromToken?.symbol} to ${toToken?.symbol}`);

    setTimeout(() => setStatus('idle'), 3000); // reset message
  };

  return (
    <div className="w-full max-w-md bg-white p-4 sm:p-6 rounded-xl shadow-md space-y-6">
      <h1 className="text-3xl font-bold text-center">Currency Swap</h1>

      <div className="space-y-4">
        {tokenList.length === 0 ? (
          <div className="text-center text-gray-400">Loading tokens...</div>
        ) : (
          <>
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
          </>
        )}

        <AmountInput
          label="Amount"
          value={amount}
          onChange={setAmount}
          disabled={status === 'loading'}
        />
      </div>

      <SwapPreview amount={amount} fromToken={fromToken} toToken={toToken} />

      {status === 'success' && (
        <p className="text-green-600 text-sm text-center font-medium transition-opacity duration-500 ease-in-out opacity-100">
          ✅ Swap successful!
        </p>
      )}

      {status === 'error' && (
        <p className="text-red-500 text-sm text-center font-medium transition-opacity duration-500 ease-in-out opacity-100">
          ⚠️ Something went wrong.
        </p>
      )}

      <SwapButton onClick={handleSubmit} disabled={!isFormValid} />
    </div>
  );
}
