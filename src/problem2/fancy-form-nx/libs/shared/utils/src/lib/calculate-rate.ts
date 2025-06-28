export function calculateSwapAmount(
  amount: number,
  fromPrice: number,
  toPrice: number
): number {
  if (!fromPrice || !toPrice) return 0
  return (amount * fromPrice) / toPrice
}
