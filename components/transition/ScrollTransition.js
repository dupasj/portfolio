export default {
  name: 'ScrollTransition',
  leave(el, done) {
    const elements = el.getElementsByClassName('scroll-animated')
    for (const element of elements) {
      element.classList.add('scroll-leave-animation')
    }

    this.$locomotive.scrollTo(0,{
      duration: 300
    });

    setTimeout(done, 300)
  },
  enter(el, done) {
    this.$locomotive.scrollTo(0,{
      duration: 0
    });
    this.$locomotive.restart();


    done()
  },
}
