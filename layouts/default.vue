<template>
  <div class="w-full h-full flex flex-col justify-center">
    <Background :cube="$route.name.includes('index')">
      <div id="data-scroll-container" class="w-full" :class="{'pt-[100vh]': $route.name.includes('index')}">
        <nuxt @language="language"/>
      </div>
    </Background>

    <nav class="fixed left-0 top-0 w-full h-auto flex justify-center align-center z-[100]">
      <ul class="container flex justify-end align-center space-x-[15px] py-[28px] relative">
        <li class="inline-block absolute left-0 top-[28px]">
          <nuxt-link :to="localePath('/')" class="inline-block text-white p-[7px] subpixel-antialiased"><span  v-appear class="rounded-full py-[3px] px-[13px] bg-[#FF0058] inline-block font-sans text-[16px]">Jérémie</span><span  v-appear class="inline-block font-sans text-[16px]">Dupas_></span></nuxt-link>
        </li>
        <li class="inline-block" v-if="language.length > 0">
          <nuxt-link v-appear v-for="lang in language" :to="localePath({name: $route.name.split('__')[0],params: {uid: lang.uid}},LANG[lang.lang])" :key="lang.lang" class="inline-block text-white p-[7px] subpixel-antialiased font-sans text-[18px]">
            {{ LANG[lang.lang].toUpperCase() }}</nuxt-link>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script>

import Background from "~/components/Background";
import unlerp from "~/lib/lerp/unlerp";

export default {
  name: "DefaultLayout",
  components: {
    Background
  },
  data(){
    return {
      language: [],
      LANG: {
        "fr-fr": "fr",
        "en-eu": "en",
      }
    }
  },
  created() {
    this.$nuxt.$on('language', ($event) => this.languageUpdated($event))
  },
  methods: {
    languageUpdated(_language){
      this.language.splice(0,this.language.length,... _language);
    }
  }
}
</script>
