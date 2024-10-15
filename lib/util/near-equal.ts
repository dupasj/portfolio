export const nearEquals = (a: number, b: number, epsilon: number): boolean => (a > (b - epsilon)) && (a < (b + epsilon)) || a === b;

export default nearEquals;