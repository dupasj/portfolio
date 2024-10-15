<template>
  <Container :screen="props.slice.primary.screen" :container="props.slice.primary.container">
    <prismic-rich-text class="scroll-animation" v-if="props.slice.slice_type === 'rich_text'" :field="props.slice.primary.content" :htmlSerializer="htmlSerializer" />
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
