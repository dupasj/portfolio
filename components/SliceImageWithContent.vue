<template>
  <Container :screen="props.slice.primary.screen" :container="props.slice.primary.container">
    <div :class="{'xl:justify-start': props.slice.primary.right_image,'xl:justify-end': !props.slice.primary.right_image}" class="justify-start flex flex-col xl:flex-row gap-x-0 xl:gap-x-[50px] gap-y-[20px] justify-items-stretch content-start items-end">
      <template v-if="props.slice.primary.right_image">
        <template v-if="props.slice.primary.image && props.slice.primary.image.url">
          <video autoplay muted loop v-if="props.slice.primary.image.url.endsWith('mp4')" :class="{'rounded-[20px]': slice.primary.image_rounded}" class="scroll-animation xl:max-w-[40%] max-w-[60%] xl:max-h-[700px] max-h-[60vh] h-auto justify-self-start self-start " :alt="props.slice.primary.image.alt" :src="props.slice.primary.image.url"/>
          <img v-else :class="{'rounded-[20px]': slice.primary.image_rounded}" class="xl:max-w-[50%] max-w-[60%] xl:max-h-[700px] max-h-[60vh] scroll-animation object-cover h-auto justify-self-start self-start " :alt="props.slice.primary.image.alt" :src="props.slice.primary.image.url"/>
        </template>

        <prismic-rich-text class="xl:max-w-[600px] scroll-animation" :field="props.slice.primary.content" :htmlSerializer="htmlSerializer" />
      </template>
      <template v-else>
        <prismic-rich-text class="xl:max-w-[600px] scroll-animation order-last xl:order-none" :field="props.slice.primary.content" :htmlSerializer="htmlSerializer" />
        <template v-if="props.slice.primary.image">
          <video autoplay muted loop v-if="props.slice.primary.image.url.endsWith('mp4')" :class="{'rounded-[20px]': slice.primary.image_rounded}" class="scroll-animation xl:max-w-[40%] max-w-[60%] xl:max-h-[700px] max-h-[60vh] h-auto justify-self-start self-start " :alt="props.slice.primary.image.alt" :src="props.slice.primary.image.url"/>
          <img v-else :class="{'rounded-[20px]': slice.primary.image_rounded}" class="xl:max-w-[50%] max-w-[60%] xl:max-h-[700px] max-h-[60vh] scroll-animation justify-self-start self-start object-cover h-auto" :alt="props.slice.primary.image.alt" :src="props.slice.primary.image.url"/>
        </template>
      </template>
    </div>
  </Container>
</template>
<script setup>
import htmlSerializer from "~/lib/html-serializer";
const props = defineProps({
  slice: {
    type: Object,
    required: true,
  },
});
</script>
