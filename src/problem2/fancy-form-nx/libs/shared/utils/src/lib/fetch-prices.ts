export type TokenPrice = {
  symbol: string;
  price: number;
};

export async function fetchTokenPrices(): Promise<TokenPrice[]> {
  const response = await fetch('https://interview.switcheo.com/prices.json');
  // @ts-ignore
  const data: { currency: string; price: number }[] = await response.json();

  return data
    .filter((entry) => typeof entry.price === 'number' && entry.price > 0)
    .map((entry) => ({
      symbol: entry.currency.toUpperCase(),
      price: entry.price,
      logoUrl: `https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${entry.currency}.svg`,
    }));
}
