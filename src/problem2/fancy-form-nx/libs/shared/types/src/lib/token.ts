export interface Token {
  symbol: string;
  name: string;
  icon: string; // URL or base64
  address: string;
}

export type TokenOption = {
  symbol: string;
  price: number;
  logoUrl: string;
};
