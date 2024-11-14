<template>
  <Container :screen="slice.primary.screen" :container="slice.primary.container">
    <div class="flex items-start justify-start content-start w-full">
      <img class="scroll-animation max-h-[50vh]" :class="{'rounded-[20px]': slice.primary.rounded}" :alt="slice.primary.image.alt" :src="slice.primary.image.url"/>
    </div>
  </Container>
</template>
<script>
import Container from "~/components/Container.vue";

export default {
  name: 'FullScreenImageSlice',
  components: {
    Container,
  },
  props: {
    slice: {
      required: true,
      type: Object
    }
  }
};
</script>
