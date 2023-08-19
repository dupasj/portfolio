<template>
  <RichTextSlice v-if="slice.slice_type === 'rich_text'" :slice="slice"/>
  <FullScreenImageSlice v-else-if="slice.slice_type === 'full_screen_image'" :slice="slice"/>
  <PersonalDescriptionSlice v-else-if="slice.slice_type === 'personal_description'" :slice="slice"/>
  <LanguageSlice v-else-if="slice.slice_type === 'services_list'" :slice="slice"/>
  <ImageWithContentSlice v-else-if="slice.slice_type === 'image_with_content'" :slice="slice"/>
  <ListOfSlice v-else-if="slice.slice_type === 'list_of'" :slice="slice"/>
  <ContactMeSlice v-else-if="slice.slice_type === 'contact_me'" :slice="slice"/>

  <p v-else>
    {{ slice.slice_type }}
  </p>
</template>
<script>

import htmlSerializer from "~/lib/html-serializer";
import ContactMeSlice from "~/components/slice/ContactMeSlice.vue";
import FullScreenImageSlice from "~/components/slice/FullScreenImageSlice.vue";
import RichTextSlice from "~/components/slice/RichTextSlice.vue";
import PersonalDescriptionSlice from "~/components/slice/PersonalDescriptionSlice.vue";
import LanguageSlice from "~/components/slice/ListOfSlice.vue";
import ImageWithContentSlice from "~/components/slice/ImageWithContentSlice.vue";
import ListOfSlice from "~/components/slice/ListOfSlice.vue";

export default {
  name: 'ItemSlice',
  props: {
    slice: {
      required: true,
      type: Object
    }
  },
  components: {
    ContactMeSlice,
    RichTextSlice,
    FullScreenImageSlice,
    PersonalDescriptionSlice,
    LanguageSlice,
    ImageWithContentSlice,
    ListOfSlice,
  },
  methods: {
    htmlSerializer: htmlSerializer
  }
};
</script>
