type TokenOption = {
  symbol: string
  price: number
}

type TokenSelectProps = {
  label: string
  tokens: TokenOption[]
  selected: TokenOption | null
  onChange: (token: TokenOption) => void
}

export function TokenSelect({ label, tokens, selected, onChange }: Readonly<TokenSelectProps>) {
  return (
    <div className="w-full">
      <label className="block text-sm font-medium mb-1">{label}</label>
      <select
        value={selected?.symbol ?? ''}
        onChange={(e) => {
          const selectedSymbol = e.target.value
          const token = tokens.find((t) => t.symbol === selectedSymbol)
          if (token) onChange(token)
        }}
        className="w-full border rounded-md px-3 py-2 text-sm"
      >
        <option value="">Select a token</option>
        {tokens.map((token) => (
          <option key={token.symbol} value={token.symbol}>
            {token.symbol}
          </option>
        ))}
      </select>
    </div>
  )
}
