<template>
  <Background :cube="false">
    <Container :margin="false" :container="true" :screen="false" :padding="true" v-if="data !== null">
      <h1 class="text-left subpixel-antialiased block w-auto h-auto text-white text-[35px] xl:text-[65px] font-bold m-0 mt-[176px] p-0 font-sans">{{$prismic.asText(data.data.title)}}</h1>
    </Container>
    <Slices v-if="data" :slices="data.data.body"/>
  </Background>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { useNuxtApp } from '#app';
import Background from "../../components/Background.vue";
import Slices from "../../components/Slices.vue";
import {useHead} from "@unhead/vue";
const { $prismic } = useNuxtApp();
const { locale } = useI18n();
const prismic = usePrismic()

const route = useRoute()

const { data, error } = await useAsyncData(`project-${route.params.uid}`, () => prismic.client.getSingle('project', {
  filters: [
    prismic.filter.at('my.project.uid', route.params.uid),
  ],
  lang: {
    fr: "fr-fr",
    en: "en-eu",
  }[locale.value]
}))

useHead({
  meta: [
    { hid: 'robots', name: 'robots', content: 'noindex, follow' },
  ],
});

watchEffect(() => {

  if (data.value === null) {
    useHead({
      title: `Portfolio of Jeremie - Skill - ${route.params.uid}`,
      meta: [
        { hid: 'description', name: 'description', content: `Portfolio of Jeremie - Project - ${route.params.uid}` },
        { hid: 'og:title', property: 'og:title', content: `Portfolio of Jeremie - Project - ${route.params.uid}` },
        { hid: 'og:description', property: 'og:description', content: `Portfolio of Jeremie - Project - ${route.params.uid}` },
        { hid: 'keywords', name: 'keywords', content: 'portfolio, jeremie, homepage, project' },
      ],
    });
  } else {
    const title = $prismic.asText(data.value.data.seo_title);
    const description = $prismic.asText(data.value.data.description);
    const keywords = data.value.tags || 'portfolio, jeremie, project';

    useHead({
      title,
      meta: [
        { hid: 'description', name: 'description', content: description },
        { hid: 'og:title', property: 'og:title', content: title },
        { hid: 'og:description', property: 'og:description', content: description },
        { hid: 'keywords', name: 'keywords', content: keywords },
      ],
    });
  }
});

</script>