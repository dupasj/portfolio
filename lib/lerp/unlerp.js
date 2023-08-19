const unlerp = (min,max,value,clamp = true) => {
  if (Array.isArray(min) && Array.isArray(max) && min.length === max.length){
    return min.map((_,i) => unlerp(min[i],max[i],value,clamp));
  }
  if (typeof min === "object" && typeof max === "object" && min !== null && max !== null){
    for(const key in min){
      min[key] = unlerp(min[key],max[key],value,clamp);
    }
  }

  if (typeof min === "number" && typeof max === "number"){
    const clamped = clamp ? Math.min(max, Math.max(min, value)) : value;
    return (clamped - min) / (max - min);
  }

  throw new Error();
};

export default unlerp;
