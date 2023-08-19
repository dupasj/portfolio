export default ({ app }, inject) => {
  const map = new Map()
  const observer = new IntersectionObserver(function(entries) {
    for (const entry of entries) {
      const data = map.get(entry.target)
      if (typeof data === 'undefined') {
        continue
      }

      for (const item of data) {
        item(entry)
      }
    }
  })

  inject('onInteract', (el, callback) => {
    const data = map.get(el)
    if (typeof data === 'undefined') {
      map.set(el, [callback])
    } else if (!data.includes(callback)) {
      data.push(callback)
    }

    observer.observe(el)
  })
  inject('unsubscribeInteraction', (element, callback) => {
    const destroys = [];
    for(const _element of map.keys()){
      if (element.contains(_element) || _element === element){
        destroys.push(_element);
      }
    }

    for(const destroy of destroys){
      if (callback === "undefined"){
        map.delete(destroy);
        observer.unobserve(destroy);
        continue;
      }

      const data = map.get(destroy);

      while (true) {
        const index = data.indexOf(callback)
        if (index < 0) {
          break
        }

        data.splice(index, 1)
      }

      if (data.length <= 0){
        map.delete(destroy);
        observer.unobserve(destroy);
      }
    }
  })
}
