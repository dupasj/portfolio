const unlerp = (min: number,max: number,value: number,clamp = true): number => {

  const __min = Math.min(min,max);
  const __max = Math.max(min,max);

  const clamped = clamp ? Math.min(__max, Math.max(__min, value)) : value;
  return (clamped - min) / (max - min);
};

export default unlerp;
