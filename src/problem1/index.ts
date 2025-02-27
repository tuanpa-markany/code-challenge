// Task
// Provide 3 unique implementations of the following function in JavaScript.
//
// **Input**: `n` - any integer
//
// *Assuming this input will always produce a result lesser than `Number.MAX_SAFE_INTEGER`*.
//
// **Output**: `return` - summation to `n`, i.e. `sum_to_n(5) === 1 + 2 + 3 + 4 + 5 === 15`.

/**
 * Implementation A: Using a Loop
 * This method iteratively adds each number from 1 to n.
 * Time Complexity: O(n) - Loop iterates n times.
 * Space Complexity: O(1) - Constant space usage.
 */
const sum_to_n_a = (n: number): number => {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
};

/**
 * Implementation B: Using the Arithmetic Series Formula
 * This method calculates the sum using the formula: sum = n * (n + 1) / 2
 * Time Complexity: O(1) - Formula is computed in constant time.
 * Space Complexity: O(1) - Constant space usage.
 */
const sum_to_n_b = (n: number): number => {
    return (n * (n + 1)) / 2;
};

/**
 * Implementation C: Using Recursion
 * This method recursively sums numbers from n down to 1.
 * Time Complexity: O(n) - Recursion occurs n times.
 * Space Complexity: O(n) - Due to the recursive call stack.
 */
const sum_to_n_c = (n: number): number => {
    if (n === 0) return 0; // Base case: Sum of numbers up to 0 is 0.
    return n + sum_to_n_c(n - 1); // Recursive call: Add n to the sum of numbers up to (n-1).
};

// Example usage
console.log(sum_to_n_a(5)); // Output: 15
console.log(sum_to_n_b(5)); // Output: 15
console.log(sum_to_n_c(5)); // Output: 15


