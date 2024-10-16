<template>
  <Background :cube="false">
    <Container :margin="false" :container="true" :screen="false" :padding="true" v-if="data !== null">
      <h1 class="text-left xl:text-center subpixel-antialiased block w-auto h-auto text-white text-[35px] xl:text-[65px] font-bold m-0 mt-[176px] p-0 font-sans">{{$prismic.asText(data.data.title)}}</h1>
    </Container>
    <Slices v-if="data" :slices="data.data.body"/>
  </Background>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { useNuxtApp } from '#app';
import Container from "../../components/Container.vue";
import Background from "../../components/Background.vue";
import Slices from "../../components/Slices.vue";
import {useHead} from "@unhead/vue";
const { locale } = useI18n();
const client = usePrismic()

const route = useRoute()

const { data, error } = await useFirstPrismicDocument({
  lang: {
    fr: "fr-fr",
    en: "en-eu",
  }[locale.value],
  filters: [
    client.filter.at('document.type', "skill"),
    client.filter.at('my.skill.uid', route.params.uid),
  ]
});

useHead({
  meta: [
    { hid: 'robots', name: 'robots', content: 'noindex, follow' },
  ],
});

</script>