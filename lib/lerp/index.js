
const lerp = (min,max,coef,clamp = true) => {
  if (clamp){
    return lerp(
      min,
      max,
      Math.max(0,Math.min(1,coef)),
      false
    )
  }

  if (typeof min === "number" && typeof max === "number"){
    return coef * (max - min) + min;
  }

  if (Array.isArray(min) && Array.isArray(max) && min.length === max.length){
    return min.map((_,i) => lerp(min[i],max[i],coef,clamp));
  }
  if (typeof min === "object" && typeof max === "object" && min !== null && max !== null){
    for(const key in min){
      min[key] = lerp(min[key],max[key],coef,clamp);
    }
  }

  throw new Error();
};

export default lerp;
