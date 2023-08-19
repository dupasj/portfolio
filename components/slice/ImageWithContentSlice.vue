<template>
  <Container :screen="slice.primary.screen" :container="slice.primary.container">
    <div class="flex flex-col xl:grid xl:grid-cols-2 gap-x-0 xl:gap-x-[30px] justify-center justify-items-center content-center items-center">
      <template v-if="slice.primary.right_image">
        <template v-if="slice.primary.image">
          <video v-appear v-if="slice.primary.image.url.endsWith('mp4')" :style="{'max-height': (slice.primary.image_max_height ? slice.primary.image_max_height+'px' : 'none' )}" :class="{'rounded-[20px]': slice.primary.image_rounded}" class="justify-self-start self-start object-cover h-auto" :alt="slice.primary.image.alt" :src="slice.primary.image.url"/>
          <img v-appear v-else :style="{'max-height': (slice.primary.image_max_height ? slice.primary.image_max_height+'px' : 'none' )}" :class="{'rounded-[20px]': slice.primary.image_rounded}" class="justify-self-start self-start object-cover h-auto" :alt="slice.primary.image.alt" :src="slice.primary.image.url"/>
        </template>

        <prismic-rich-text v-appear :field="slice.primary.content" :htmlSerializer="htmlSerializer" />
      </template>
      <template v-else>
        <prismic-rich-text v-appear class="order-last xl:order-none" :field="slice.primary.content" :htmlSerializer="htmlSerializer" />
        <template v-if="slice.primary.image">
          <video v-appear v-if="slice.primary.image.url.endsWith('mp4')" :style="{'max-height': (slice.primary.image_max_height ? slice.primary.image_max_height+'px' : 'none' )}" :class="{'rounded-[20px]': slice.primary.image_rounded}" class="order-first xl:order-none justify-self-start self-start object-cover h-auto" :alt="slice.primary.image.alt" :src="slice.primary.image.url"/>
          <img v-appear v-else :style="{'max-height': (slice.primary.image_max_height ? slice.primary.image_max_height+'px' : 'none' )}" :class="{'rounded-[20px]': slice.primary.image_rounded}" class="order-first xl:order-none justify-self-start self-start object-cover h-auto" :alt="slice.primary.image.alt" :src="slice.primary.image.url"/>
        </template>
      </template>
    </div>
  </Container>
</template>
<script>
import htmlSerializer from "~/lib/html-serializer";
import Container from "~/components/Container.vue";

export default {
  name: 'ImageWithContentSlice',
  components: {
    Container,
  },
  props: {
    slice: {
      required: true,
      type: Object
    }
  },
  methods: {
    htmlSerializer: htmlSerializer
  }
};
</script>
