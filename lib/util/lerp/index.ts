
const lerp = (min: number,max: number,coef: number,clamp = true): number => {
  if (clamp){
    return lerp(
      min,
      max,
      Math.max(0,Math.min(1,coef)),
      false
    )
  }

  return coef * (max - min) + min;
};

export default lerp;
