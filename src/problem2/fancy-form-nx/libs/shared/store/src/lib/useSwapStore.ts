import { create } from 'zustand'

type Token = {
  symbol: string
  price: number
}

type SwapState = {
  fromToken: Token | null
  toToken: Token | null
  amount: string
  tokenList: Token[]
  setFromToken: (token: Token) => void
  setToToken: (token: Token) => void
  setAmount: (amount: string) => void
  setTokenList: (tokens: Token[]) => void
}

export const useSwapStore = create<SwapState>((set) => ({
  fromToken: null,
  toToken: null,
  amount: '',
  tokenList: [],
  setFromToken: (token) => set({ fromToken: token }),
  setToToken: (token) => set({ toToken: token }),
  setAmount: (amount) => set({ amount }),
  setTokenList: (tokens) => set({ tokenList: tokens }),
}))
