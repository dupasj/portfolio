<template>
  <Container :screen="slice.primary.screen" :container="slice.primary.container">
    <h3 v-appear class="mb-[20px] xl:mb-[30px] block w-full h-auto text-center text-white xl:text-[75px] lg:text-[65px] md:text-[50px] text-[35px] font-bold m-0 p-0 font-sans subpixel-antialiased">
      {{ $prismic.asText(slice.primary.title) }}</h3>

    <div class="flex justify-items-center content-center items-center justify-center">
      <prismic-rich-text v-appear class="max-w-[800px]" :field="slice.primary.description" :htmlSerializer="htmlSerializer" />
    </div>


    <div class="mt-[30px] xl:mt-[90px] grid grid-cols-2 xl:grid-cols-3 gap-x-[15px] md:gap-x-[30px] gap-y-[44px]">
      <article class="max-w-[370px]" v-for="item in items" :key="item.id">
        <img v-appear :src="item.data.preview.url" :alt="item.data.preview.alt" class="object-cover w-full h-auto aspect-[4/3] rounded-[5px]"/>
        <h4 v-appear class="mt-[6px] block w-full h-auto text-white text-[20px] md:text-[30px] font-medium m-0 p-0 font-sans subpixel-antialiased">{{ $prismic.asText(item.data.title) }}</h4>
        <p v-appear class="mt-[6px] block w-full h-auto max-h-[60px] text-clip overflow-hidden text-white text-[13px] md:text-[16px] font-medium m-0 p-0 font-sans subpixel-antialiased leading-[20px]">{{ $prismic.asText(item.data.ellipsis) }}</p>
        <router-link v-appear class="mt-[5px] md:mt-[7px] block w-full h-auto text-white text-[14px] md:text-[16px] font-medium m-0 p-0 font-sans subpixel-antialiased" :to="localePath({name: slice.primary.item+'-uid',params: {uid: item.uid}})" >{{$t('more')}}</router-link>
      </article>
    </div>
  </Container>
</template>

<script>
import htmlSerializer from "~/lib/html-serializer";
import Container from "~/components/Container.vue";

export default {
  name: "ListOfSlice",
  props: {
     slice: {
       type: Object,
       required: true,
     }
  },
  components: {
    Container,
  },
  data() {
    return {
      items: []
    }
  },
  methods: {
    htmlSerializer: htmlSerializer
  },
  fetchOnServer: true,
  async fetch() {
    const lang = {
      fr: "fr-fr",
      en: "en-eu",
    }[this.$i18n.locale];
    const type = this.slice.primary.item;

    const params = [
      this.$prismic.predicate.at('document.type', this.slice.primary.item),
    ];

    if (this.$route.name.includes(type)){
      params.push(this.$prismic.predicate.not('my.'+this.slice.primary.item+'.uid', this.$route.params.uid));
    }

    const data = await this.$prismic.api.query(
      params,
      {
        pageSize: this.slice.primary.limit,
        lang: lang
      }
    );
    this.items = data.results;
  }
}
</script>
