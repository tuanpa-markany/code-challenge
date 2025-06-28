import { calculateSwapAmount, TokenPrice } from '@fancy-form-nx/utils';

type SwapPreviewProps = {
  amount: string;
  fromToken: TokenPrice | null;
  toToken: TokenPrice | null;
};

export function SwapPreview({
  amount,
  fromToken,
  toToken,
}: Readonly<SwapPreviewProps>) {
  const parsedAmount = parseFloat(amount);
  const isValid =
    !isNaN(parsedAmount) && parsedAmount > 0 && fromToken && toToken;

  const result = isValid
    ? calculateSwapAmount(parsedAmount, fromToken!.price, toToken!.price)
    : 0;

  return (
    <div className="w-full mt-4 border rounded-md p-4 bg-gray-50 text-sm">
      {isValid ? (
        <p>
          You will receive approximately{' '}
          <span className="font-semibold">
            {result.toFixed(6)} {toToken?.symbol}
          </span>
        </p>
      ) : (
        <p className="text-gray-500 italic">
          Enter amount and select both tokens to preview.
        </p>
      )}
    </div>
  );
}
