<template>
  <ItemSlice :slice="item" v-for="item of slices"/>
</template>
<script setup>

import ItemSlice from "./SliceItem.vue"

const props = defineProps({
  slices: {
    type: Array,
    required: true,
  },
});
</script>
