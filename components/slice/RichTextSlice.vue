<template>
  <Container :screen="slice.primary.screen" :container="slice.primary.container">
    <prismic-rich-text v-appear v-if="slice.slice_type === 'rich_text'" :field="slice.primary.content" :htmlSerializer="htmlSerializer" />
  </Container>
</template>
<script>

import htmlSerializer from "~/lib/html-serializer";
import Container from "~/components/Container.vue";

export default {
  name: 'RichTextSlice',
  props: {
    slice: {
      required: true,
      type: Object
    }
  },
  components: {
    Container
  },
  methods: {
    htmlSerializer: htmlSerializer
  }
};
</script>
