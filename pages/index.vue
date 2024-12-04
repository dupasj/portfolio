<template>
  <Background :cube="true">
    <Slices v-if="data" :slices="data.data.body"/>
  </Background>
</template>

<script setup>
import { useHead } from '@unhead/vue';
import { useI18n } from 'vue-i18n';
import { useNuxtApp } from '#app';
import Background from '../components/Background.vue';
const { $prismic } = useNuxtApp();
const { locale } = useI18n();
const prismic = usePrismic()
import { useRuntimeConfig, useRoute } from '#imports';
const config = useRuntimeConfig();


const { data, error } = await useAsyncData('homepage', () => prismic.client.getSingle('homepage', {
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
      title: 'Portfolio of Jeremie - Homepage',
      meta: [
        { hid: 'description', name: 'description', content: 'Portfolio of Jeremie - Homepage' },
        { hid: 'og:title', property: 'og:title', content: 'Portfolio of Jeremie - Homepage' },
        { hid: 'og:description', property: 'og:description', content: 'Portfolio of Jeremie - Homepage' },
        { hid: 'keywords', name: 'keywords', content: 'portfolio, jeremie, homepage' },
      ],
    });
  } else {
    const title = $prismic.asText(data.value.data.seo_title);
    const description = $prismic.asText(data.value.data.description);
    const keywords = data.value.data.tags || 'portfolio, jeremie, homepage';

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