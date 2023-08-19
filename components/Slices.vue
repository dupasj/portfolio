<template>
  <div class="w-full">
    <ItemSlice :slice="item" v-for="item of slices"/>
  </div>
</template>
<script>

import ItemSlice from "~/components/slice/ItemSlice.vue";

export default {
  name: 'Slices',
  components: {
    ItemSlice
  },
  props: {
    slices: {
      required: true,
      type: Array
    }
  }
};
</script>
