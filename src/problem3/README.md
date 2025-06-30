
# Messy React Challenge — Code Review & Refactor

## Overview

This document presents a detailed code review for the provided React + TypeScript component, identifies computational inefficiencies and anti-patterns, and provides a fully refactored version with improved code quality, readability, and performance.

---

## Table of Contents

1. [Type Issues & Data Inconsistencies](#type-issues--data-inconsistencies)
2. [Logic Errors](#logic-errors)
3. [Rendering and Key Anti-patterns](#rendering-and-key-anti-patterns)
4. [Performance and React Hooks](#performance-and-react-hooks)
5. [Formatting and UI](#formatting-and-ui)
6. [Other Observations](#other-observations)
7. [Refactored Code](#refactored-code)
8. [How to Run](#how-to-run)

---

## 1. Type Issues & Data Inconsistencies

**Problem:**
- The `WalletBalance` interface is missing the `blockchain` property, even though the code expects it.
- `FormattedWalletBalance` does not extend `WalletBalance`.
- Mapping and typing inconsistencies in the row rendering.

**Solution:**
- Add `blockchain` to `WalletBalance`.
- Use TypeScript's `extends` to build on existing types.

<details>
<summary>Before</summary>

```typescript
interface WalletBalance {
  currency: string;
  amount: number;
}
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}
```
</details>

<details>
<summary>After</summary>

```typescript
interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string;
}
interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
}
```
</details>

---

## 2. Logic Errors

**Problem:**
- Filter step incorrectly uses `lhsPriority` instead of `balancePriority`.
- The filter only passes balances where `amount <= 0` (likely a logic bug).
- The sort comparator does not handle equal priorities.

**Solution:**
- Use correct variable names.
- Adjust logic to match real-world requirements (likely `amount > 0`).
- Make sorting stable.

#### Before

```typescript
const sortedBalances = useMemo(() => {
  return balances.filter((balance: WalletBalance) => {
    const balancePriority = getPriority(balance.blockchain);
    if (lhsPriority > -99) {
      if (balance.amount <= 0) {
        return true;
      }
    }
    return false
  }).sort((lhs: WalletBalance, rhs: WalletBalance) => {
    const leftPriority = getPriority(lhs.blockchain);
    const rightPriority = getPriority(rhs.blockchain);
    if (leftPriority > rightPriority) {
      return -1;
    } else if (rightPriority > leftPriority) {
      return 1;
    }
  });
}, [balances, prices]);
```

#### After

```typescript
const sortedBalances = useMemo(() => (
  balances
    .filter(balance => getPriority(balance.blockchain) > -99 && balance.amount > 0)
    .sort((a, b) => {
      const pA = getPriority(a.blockchain);
      const pB = getPriority(b.blockchain);
      if (pA > pB) return -1;
      if (pA < pB) return 1;
      return 0;
    })
), [balances]);
```

---

## 3. Rendering and Key Anti-patterns

**Problem:**
- Uses the array index as the React key.
- Expects a `formatted` property that may not exist on the object.

**Solution:**
- Use a stable, unique key (like `${currency}_${blockchain}`).
- Ensure formatting is always applied before rendering.

#### Before

```typescript
const rows = sortedBalances.map((balance: FormattedWalletBalance, index: number) => {
  // ...
  key={index}
});
```

#### After

```typescript
const rows = formattedBalances.map((balance) => {
  const key = `${balance.currency}_${balance.blockchain}`;
  // ...
  key={key}
});
```

---

## 4. Performance and React Hooks

**Problem:**
- Incorrect dependency array in `useMemo`.
- Overuse of `useMemo` for cheap computations.

**Solution:**
- Use only necessary dependencies.
- Reserve `useMemo` for genuinely expensive operations.

#### Before

```typescript
useMemo(() => { ... }, [balances, prices])
```

#### After

```typescript
useMemo(() => { ... }, [balances])
```

---

## 5. Formatting and UI

**Problem:**
- `.toFixed()` called without specifying decimals.

**Solution:**
- Specify a fixed number of decimals for currency output (e.g., `.toFixed(2)`).

#### Before

```typescript
formatted: balance.amount.toFixed()
```

#### After

```typescript
formatted: balance.amount.toFixed(2) // or another number of decimals
```

---

## 6. Other Observations

- The `children` prop is destructured but unused.
- Consider moving data transformation logic into utility functions for maintainability.

---

## 7. Refactored Code

See [`WalletPage.refactored.tsx`](./WalletPage.refactored.tsx) for the complete, improved implementation.

**Key improvements:**
- Accurate and extensible types
- Clean separation of data transformation and rendering
- Stable and predictable React keys
- Readable and maintainable code structure

---

## 8. How to Run

1. Copy the code from `WalletPage.refactored.tsx` into your project (or use as a standalone demo).
2. Ensure you have mock or real implementations for the hooks and child components (e.g., `useWalletBalances`, `usePrices`, `WalletRow`).
3. Import and use the component in your React app:

```tsx
import WalletPage from './WalletPage.refactored';

function App() {
  return <WalletPage />;
}
```

---

## License

This review and refactor are provided as part of a technical challenge submission.
