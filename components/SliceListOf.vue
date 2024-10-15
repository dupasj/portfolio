 <template>
  <Container :screen="props.slice.primary.screen" :container="props.slice.primary.container">
    <h3 class="scroll-animation text-left mb-[20px] xl:mb-[30px] block w-full h-auto xl:text-center text-white xl:text-[75px] lg:text-[65px] md:text-[50px] text-[35px] font-bold m-0 p-0 font-sans subpixel-antialiased">
      {{ $prismic.asText(props.slice.primary.title) }}</h3>

    <div class="flex justify-items-center content-center items-center justify-center">
      <prismic-rich-text class="scroll-animation max-w-[800px]" :field="props.slice.primary.description" :html-serializer="htmlSerializer" />
    </div>

    <div class="mt-[30px] xl:mt-[90px] grid grid-cols-2 xl:grid-cols-3 gap-x-[15px] md:gap-x-[30px] gap-y-[44px]">
      <article class="max-w-[370px]" v-for="item in items" :key="item.id">
        <img :src="item.data.preview.url" :alt="item.data.preview.alt" class="scroll-animation object-cover w-full h-auto aspect-[4/3] rounded-[5px]"/>
        <h4 class="scroll-animation mb-[10px] mt-[10px] block w-full h-auto text-white text-[20px] md:text-[30px] font-medium m-0 p-0 font-sans subpixel-antialiased">{{ $prismic.asText(item.data.title) }}</h4>
        <p class="scroll-animation mt-[6px] block w-full h-auto max-h-[60px] text-clip overflow-hidden text-white text-[13px] md:text-[16px] font-medium m-0 p-0 font-sans subpixel-antialiased leading-[20px]">{{ $prismic.asText(item.data.ellipsis) }}</p>
        <NuxtLink class="scroll-animation mt-[5px] md:mt-[7px] block w-full h-auto text-white text-[14px] md:text-[16px] font-medium m-0 p-0 font-sans subpixel-antialiased" :to="{ name: `${type}-uid___${locale}`, params: { uid: item.uid } }">
          {{$t('more')}}
        </NuxtLink>
      </article>
    </div>
  </Container>
</template>

<script setup>


import {useI18n} from "vue-i18n";

const props = defineProps({
  slice: {
    type: Object,
    required: true,
  },
});
import htmlSerializer from "~/lib/html-serializer";
import Container from "~/components/Container.vue";

const client = usePrismic()
const route = useRoute()
const { locale } = useI18n();

const type = props.slice.primary.item;


const {data: items} = await useAsyncData(`list-of-${type}-${props.slice.primary.limit}`,async () => {
  const lang =
  {
    fr: "fr-fr",
    en: "en-eu",
  }[locale.value];

  const filters = [
    client.filter.at('document.type', type),
  ];
  if (route.name.includes(type)){
    filters.push(client.filter.not('my.'+type+'.uid',  route.params.uid));
  }

  const data = await client.client.get({
    filters: filters,
    pageSize: props.slice.primary.limit,
    lang: lang
  });

  return data.results;

})
</script>
