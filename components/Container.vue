<template>
  <div class="w-full h-auto" :class="{'mt-[70px] mb-[70px]': margin,'fill-with-margin': screen && margin && !container,'min-h-[100vh]': screen && !margin && !container,'pl-[15px] pr-[15px]': padding && !container}">
    <div v-if="container" class="container" :class="{'fill-with-margin': screen && margin,'min-h-[100vh]': screen && !margin,'pl-[15px] pr-[15px]': padding}">
      <slot/>
    </div>
    <slot v-else/>
  </div>
</template>
<script>
export default {
  name: "Container",
  props: {
    container: {
      type: Boolean,
      default: true
    },
    margin: {
      type: Boolean,
      default: true
    },
    screen: {
      type: Boolean,
      default: true
    },
    padding: {
      type: Boolean,
      default: true
    }
  }
}
</script>
<style scoped>
.fill-with-margin{
  min-height: calc(100vh - 140px);
}
</style>
