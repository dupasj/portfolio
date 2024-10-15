const unlerp = (min: number,max: number,value: number,clamp = true): number => {
  const clamped = clamp ? Math.min(max, Math.max(min, value)) : value;
  return (clamped - min) / (max - min);
};

export default unlerp;
