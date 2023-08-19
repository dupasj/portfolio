import LocomotiveScroll from "locomotive-scroll"
import Vue from 'vue'

export default ({ app }, inject) => {
  let delay = 0
  const timers = []
  let instance = null;

  const scrolls = [];
  const onScroll = (callback) => {
    if (Array.isArray(callback)){
      for(const item of callback){
        onScroll(item);
      }
      return;
    }

    if (scrolls.includes(callback)){
      return;
    }
    scrolls.push(callback);
  };
  const offScroll = (callback) => {
    if (Array.isArray(callback)){
      for(const item of callback){
        onScroll(item);
      }
      return;
    }

    while (true) {
      const index = scrolls.indexOf(callback)
      if (index < 0) {
        break
      }

      scrolls.splice(index, 1)
    }
  }

  const scrollTo = (target,options) => {
    const instance = initScroll();

    if (instance === null){
      window.scrollTo({
        y: target
      })
      return;
    }
    instance.scrollTo(target,options);
  }

  const updateScroll = () => {
    initScroll()?.update();
  }

  const initScroll = () => {
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      destroyScroll();
      return null;
    }

    if (instance !== null){
      return instance;
    }

    instance = new LocomotiveScroll({
      el: document.getElementById('data-scroll-container'),
      smooth: true,
      touchMultiplier: 1.3,
    });
    instance.on('scroll',(evt) => {
      scrolls.forEach(scroll => {
        scroll({
          y: evt.scroll.y
        });
      })
    });

    return instance;
  };

  const destroyScroll = () => {
    if (instance === null){
      return;
    }

    instance.destroy();
    instance = null;
  };

  const restartScroll = () => {
    destroyScroll();
    return initScroll();
  };



  Vue.mixin({
    mounted() {
      const ready = () => {
        if (document.readyState !== 'complete') {
          return
        }

        document.removeEventListener('readystatechange', ready)
        this.$locomotive.restart();
      }

      if(this.$parent){
        document.addEventListener('readystatechange', ready)
        ready()
      }else{
        window.addEventListener("scroll",() => {
          scrolls.forEach(scroll => {
            scroll({
              y: window.scrollY
            });
          })
        });
      }
    },
  })


  const visible = [];
  const interaction = (entry) => {
    if (!entry.isIntersecting) {
      return
    }

    const _delay = 1/Math.max(1,delay/75) * 75;

    const time = setTimeout(() => {
      while (true) {
        const index = timers.indexOf(time)
        if (index < 0) {
          break
        }

        timers.splice(index, 1)
      }
      delay -= _delay

      entry.target.classList.add('scroll-animated')
      for(const item of entry.target.getElementsByClassName("scroll-animation")){
        item.classList.add("scroll-animated");
      }

      visible.push(entry.target);
    }, delay + _delay)
    timers.push(time)
    delay += _delay


    app.$unsubscribeInteraction(entry.target, interaction)
  }

  Vue.directive('appear', {
    inserted: (el) => {
      el.classList.add("scroll-animation");

      app.$onInteract(el, interaction)
    },
    update: (el) => {
      el.classList.add("scroll-animation");
      if (visible.includes(el)){
        for(const item of el.getElementsByClassName("scroll-animation")){
          item.classList.add("scroll-animated");
        }

        el.classList.add("scroll-animated");
      }
    }
  })

  inject('locomotive',{
    init: initScroll,
    update: updateScroll,
    destroy: destroyScroll,
    restart: restartScroll,
    scrollTo: scrollTo,
    onUpdate: onScroll,
    removeOnUpdate: offScroll,
  })
}
