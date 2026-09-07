function median(arr: number[]): number | undefined {
  if (arr.length === 0) {
    throw new Error("Array must not be empty");
  }

  // Step 1: sort the array
  const sorted = [...arr].sort((a, b) => a - b);

  // Step 2: find middle index
  const mid = Math.ceil(sorted.length / 2);

  return sorted[mid];
}