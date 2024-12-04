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

</script>