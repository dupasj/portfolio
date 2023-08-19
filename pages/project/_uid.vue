<template>
  <div class="w-full h-auto flex flex-col justify-center align-center pb-[200px]">
    <Container :margin="false" :container="true" :screen="false" :padding="true" v-if="data !== null">
      <h1 class="text-left xl:text-center subpixel-antialiased block w-auto h-auto text-white text-[35px] xl:text-[65px] font-bold m-0 mt-[176px] p-0 font-sans">{{$prismic.asText(data.data.title)}}</h1>
    </Container>
    <Slices v-if="data !== null" :slices="data.data.body"/>
  </div>
</template>

<script>
import Container from "~/components/Container.vue";
import Slices from "~/components/Slices.vue";
import ListOfSlice from "~/components/slice/ListOfSlice.vue";
import ScrollTransition from "~/components/transition/ScrollTransition";

export default {
  name: "ProjectPage",
  components: {
    ListOfSlice,
    Container,
    Slices,
  },
  data() {
    return {
      data: null,
    }
  },
  fetchOnServer: true,
  async fetch() {
    try{
      const lang = {
        fr: "fr-fr",
        en: "en-eu",
      }[this.$i18n.locale];

      const data = await this.$prismic.api.getByUID('project',this.$route.params.uid,{ lang: lang });

      if (typeof data === "undefined"){
        return this.$nuxt.error({ statusCode: 404, message: "Page not found" })
      }

      this.data = data;
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
  nuxtI18n: {
    paths: {
      en: '/project/:uid',
      fr: '/projet/:uid',
    }
  },
  scrollToTop: true,
  transition: ScrollTransition
}
</script>
