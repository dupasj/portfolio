import { nearEquals } from "./near-equal";

export const nearZero = (a: number, epsilon: number): boolean => nearEquals(a, 0, epsilon);

export default nearZero;