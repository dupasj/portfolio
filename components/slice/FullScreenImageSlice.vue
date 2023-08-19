<template>
  <Container :screen="slice.primary.screen" :container="slice.primary.container">
    <img v-appear :style="{'max-height': (slice.primary.image_max_height ? slice.primary.image_max_height+'px' : 'none' )}" :class="{'rounded-[20px]': slice.primary.rounded}" :alt="slice.primary.image.alt" :src="slice.primary.image.url"/>
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
