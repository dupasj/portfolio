<template>
  <SliceContactMe v-if="props.slice.slice_type === 'contact_me'" :slice="props.slice"/>
  <SliceListOf v-else-if="props.slice.slice_type === 'list_of'" :slice="props.slice"/>
  <SlicePersonalDescription v-else-if="props.slice.slice_type === 'personal_description'" :slice="props.slice"/>
  <SliceRichText v-else-if="props.slice.slice_type === 'rich_text'" :slice="props.slice"/>
  <SliceImageWithContent v-else-if="slice.slice_type === 'image_with_content'" :slice="slice"/>
  <SliceFullScreenImage v-else-if="slice.slice_type === 'full_screen_image'" :slice="slice"/>

  <p v-else>
    {{ props.slice.slice_type }}
  </p>
</template>
<script setup>
import SliceContactMe from "./SliceContactMe.vue"
import SliceListOf from "./SliceListOf.vue"
import SlicePersonalDescription from "./SlicePersonalDescription.vue"
import SliceFullScreenImage from "./SliceFullScreenImage.vue"
import SliceRichText from "./SliceRichText.vue"
const props = defineProps({
  slice: {
    type: Object,
    required: true,
  },
});
</script>