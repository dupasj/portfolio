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

const { data, error } = await useSinglePrismicDocument('homepage', {
  lang: {
    fr: "fr-fr",
    en: "en-eu",
  }[locale.value]
});

useHead({
  meta: [
    { hid: 'robots', name: 'robots', content: 'noindex, follow' },
  ],
});

watchEffect(() => {
  if (data.value === null) {
    useHead({
      title: 'Default Title',
      meta: [
        { hid: 'description', name: 'description', content: 'Default Description' },
      ],
    });
  } else {
    // SEO for Prismic content
    useHead({
      title: $prismic.asText(data.value.data.seo_title),
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: $prismic.asText(data.value.data.description),
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: data.value.data.tags,
        },
      ],
    });
  }
});
</script>