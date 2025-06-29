export type TokenPrice = {
  symbol: string;
  price: number;
  logoUrl: string;
};

const TOKEN_ICON_BASE_URL =
  'https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens';

function getTokenIconUrl(symbol: string): string {
  return `${TOKEN_ICON_BASE_URL}/${symbol}.svg`;
}

export async function fetchTokenPrices(): Promise<TokenPrice[]> {
  const response = await fetch('https://interview.switcheo.com/prices.json');
  const data: { currency: string; price: number; date: number }[] =
    (await response.json()) as any;

  // Use Map to store the latest entry for each symbol
  const latestPricesMap = new Map<string, { price: number; date: number }>();

  for (const entry of data) {
    const symbol = entry.currency.toUpperCase();
    const existing = latestPricesMap.get(symbol);

    if (!existing || entry.date > existing.date) {
      latestPricesMap.set(symbol, { price: entry.price, date: entry.date });
    }
  }

  return Array.from(latestPricesMap.entries()).map(([symbol, { price }]) => ({
    symbol,
    price,
    logoUrl: getTokenIconUrl(symbol),
  }));
}
