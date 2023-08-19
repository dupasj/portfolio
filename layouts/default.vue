<template>
  <div class="w-full h-full flex flex-col justify-center">
    <Background @tick="tick" :cube="$route.name.includes('index')">
      <div id="data-scroll-container" class="w-full" :class="{'pt-[100vh]': $route.name.includes('index')}">
        <nuxt @language="language"/>
      </div>
    </Background>

    <nav class="fixed left-0 top-0 w-full h-auto flex justify-center align-center z-[100]">
      <canvas ref="canvas" class="absolute left-0 top-0"/>
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
    },
    tick(renderer){
      const canvas = this.$refs.canvas;
      if (!canvas){
        return;
      }

      const ctx = this.ctx ?? canvas.getContext("2d");
      this.ctx = ctx;
      if (!ctx){
        return;
      }

      const gl = renderer.getContext();

      const screen = {
        width: window.innerWidth,
        height: window.innerHeight,
      }
      const destination = {
        width: screen.width,
        height: 96 + 20,
      }
      const source = {
        width: (screen.width / screen.width) * renderer.domElement.width,
        height: (96 / screen.height) * renderer.domElement.height,
      }

      const pixels = new Uint8Array(source.width * source.height * 4);
      gl.readPixels(0, renderer.domElement.height - source.height, source.width, source.height, gl.RGBA, gl.UNSIGNED_BYTE, pixels);


      const image = ctx.createImageData(destination.width, destination.height);
      for(let x=0;x<destination.width;x++){
        for(let y=0;y<destination.height;y++){
          const map = {
            x: Math.round((x/destination.width) * source.width),
            y: Math.round((1 - (y/destination.height)) * source.height),
          }

          const destination_red = (y * destination.width + x) * 4;
          const source_red = (map.y * source.width + map.x) * 4;

          image.data[destination_red] = pixels[source_red];
          image.data[destination_red+1] = pixels[source_red+1];
          image.data[destination_red+2] = pixels[source_red+2];
          image.data[destination_red+3] = (1 - unlerp(destination.height-20,destination.height,y,true)) * 255;
        }
      }

      canvas.width = destination.width;
      canvas.height = destination.height;

      ctx.putImageData(image, 0, 0);
    }
  }
}
</script>
