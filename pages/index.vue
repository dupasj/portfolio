<template>
  <Slices v-if="data !== null" :slices="data.data.body"/>
</template>

<script lang="ts">
import Vue from 'vue'
import Slices from "~/components/Slices.vue";
import ScrollTransition from "~/components/transition/ScrollTransition";
import ContactMeSlice from "~/components/slice/ContactMeSlice.vue";

export default Vue.extend({
  name: 'IndexPage',
  components:{
    Slices,
    ContactMeSlice,
  },
  data(){
    return {
      data: null,
    }
  },
  fetchOnServer: true,
  async fetch(){
    try{
      const lang = {
        fr: "fr-fr",
        en: "en-eu",
      }[this.$i18n.locale];

      this.data = await this.$prismic.api.getSingle('homepage',{ lang: lang });

      this.$nuxt.$emit('language',this.data.alternate_languages)
    }catch (e){
      console.log(e);
      return this.$nuxt.error({ statusCode: 500, message: "Internal Server Error" })
    }
  },
  mounted() {
    if (this.data){
      this.$nuxt.$emit('language',this.data.alternate_languages)
    }
  },
  head(){
    if (this.data === null){
      return this.$nuxtI18nHead({ addSeoAttributes: true });
    }

    const base = this.$nuxtI18nHead({ addSeoAttributes: true });
    return {
      title: this.$prismic.asText(this.data.data.seo_title),
      meta: [
        ... base.meta,
        {
          hid: 'description',
          name: 'description',
          content: this.$prismic.asText(this.data.data.description)
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.data.data.tags
        }
      ]
    }
  },
  scrollToTop: true,
  transition: ScrollTransition
})
</script>
