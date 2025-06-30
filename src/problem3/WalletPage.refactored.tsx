import React, { useMemo } from "react";

// --- Types ---
interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string;
}

interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}

interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {}

interface WalletRowProps {
  amount: number;
  usdValue: number;
  formattedAmount: string;
  className?: string;
}

// Self implement WalletRow component
const WalletRow: React.FC<WalletRowProps> = ({
  amount,
  usdValue,
  formattedAmount,
  className,
}) => (
  <div className={className}>
    <span>Amount: {amount}</span>
    <span> | Formatted: {formattedAmount}</span>
    <span> | Value: {usdValue.toFixed(2)} USD</span>
  </div>
);

// --- Mock hooks for demo ---
const useWalletBalances = (): WalletBalance[] => [
  { currency: "ETH", amount: 0.5, blockchain: "Ethereum" },
  { currency: "OSMO", amount: 20, blockchain: "Osmosis" },
  { currency: "ARB", amount: 0, blockchain: "Arbitrum" },
  { currency: "NEO", amount: 10, blockchain: "Neo" },
];

const usePrices = (): Record<string, number> => ({
  ETH: 3500,
  OSMO: 1.2,
  ARB: 0.8,
  NEO: 15,
});

// --- Helper function ---
const getPriority = (blockchain: string): number => {
  switch (blockchain) {
    case "Osmosis":
      return 100;
    case "Ethereum":
      return 50;
    case "Arbitrum":
      return 30;
    case "Zilliqa":
      return 20;
    case "Neo":
      return 20;
    default:
      return -99;
  }
};

const WalletPage: React.FC<BoxProps> = (props) => {
  const balances = useWalletBalances();
  const prices = usePrices();

  // Filter and sort balances by priority, only positive amounts
  const sortedBalances = useMemo(
    () =>
      balances
        .filter(
          (balance) =>
            getPriority(balance.blockchain) > -99 && balance.amount > 0
        )
        .sort((a, b) => getPriority(b.blockchain) - getPriority(a.blockchain)),
    [balances]
  );

  // Format amounts for display
  const formattedBalances: FormattedWalletBalance[] = useMemo(
    () =>
      sortedBalances.map((balance) => ({
        ...balance,
        formatted: balance.amount.toFixed(2),
      })),
    [sortedBalances]
  );

  // Render rows with unique keys
  const rows = formattedBalances.map((balance) => {
    const usdValue = (prices[balance.currency] ?? 0) * balance.amount;
    const key = `${balance.currency}_${balance.blockchain}`;
    return (
      <WalletRow
        className="wallet-row"
        key={key}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.formatted}
      />
    );
  });

  return <div {...props}>{rows}</div>;
};

export default WalletPage;
