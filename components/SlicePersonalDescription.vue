<template>
  <Container :screen="props.slice.primary.screen" :section="true" :padding="false">
    <div class="blur-container" :class="{'min-h-[100vh] xl:min-h-0': props.slice.primary.screen}">
      <Container :screen="false" :container="true" :section="false" :margin="false" :padding="false">
        <div class="pt-[90px] pb-[90px] md:pt-0 md:pb-0 xl:flex-row xl:space-x-[30px] xl:space-y-0 flex justify-center content-center justify-items-center items-center flex-col space-x-0 space-y-[50px]">
          <div>
            <span class="scroll-animation text-[40px] block w-full h-auto text-[#FF0058] md:text-[50px] font-medium m-0 p-0 font-sans leading-[37px] md:leading-[47px]">{{ $prismic.asText(props.slice.primary.primary_text) }}</span>
            <h2 class="scroll-animation text-[45px] subpixel-antialiased block w-full h-auto text-white md:text-[70px] font-bold m-0 p-0 font-sans leading-[60px] md:leading-[90px]">{{ $prismic.asText(props.slice.primary.title) }}</h2>
            <h3 class="scroll-animation text-[25px] subpixel-antialiased mt-[12px] mb-[29px] block w-full h-auto text-white md:text-[40px] font-medium m-0 p-0 font-sans leading-[30px]">{{ $prismic.asText(props.slice.primary.the_third_line) }}</h3>
            <prismic-rich-text class="scroll-animation" :field="props.slice.primary.description" :html-serializer="htmlSerializer"/>
          </div>

          <img class="scroll-animation object-cover aspect-square max-w-[300px] xl:max-w-[320px] h-auto rounded-[20px]" :src="props.slice.primary.image.url"/>
        </div>
      </Container>
    </div>
  </Container>
</template>
<script setup>
import htmlSerializer from "~/lib/html-serializer.ts";
import Container from "~/components/Container.vue";
const props = defineProps({
  slice: {
    type: Object,
    required: true,
  },
});
</script>
<style scoped>
.blur-container{
  @apply w-full backdrop-brightness-[1.5] backdrop-blur-[20px] backdrop-opacity-[0.7] flex justify-center content-center justify-items-center items-center;
  @apply rounded-[0px] p-[20px];
  @apply xl:p-[140px] xl:min-h-0 xl:rounded-[30px];
}
</style>
