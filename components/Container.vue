<template>
  <div class="w-full h-auto" :class="{'mt-[100px] xl:mb-[100px] [&:not(:last-child)]:mb-[100px]': props.margin,'fill-with-margin pt-[160px]': props.screen && !props.section && !props.container && props.margin,'pt-[160px]': props.screen && !props.section && !props.container,'snap': props.section || props.screen,'min-h-[100vh]': props.screen && !props.section && !props.container && !props.margin,'pl-[15px] pr-[15px]': props.padding && !props.container}">
    <div v-if="props.section" class="xl:container flex-col flex justify-items-center items-center justify-center align-center content-center" :class="{'fill-with-margin': props.screen && props.margin,'pt-[160px]': props.screen,'min-h-[100vh]': props.screen && !props.margin,'pl-[15px] pr-[15px]': props.padding}">
      <slot/>
    </div>
    <div v-else-if="props.container" class="container flex-col flex justify-items-center items-center justify-center align-center content-center" :class="{'fill-with-margin': props.screen && props.margin,'pt-[160px]': props.screen,'min-h-[100vh]': props.screen && !props.margin,'pl-[15px] pr-[15px]': props.padding}">
      <slot/>
    </div>
    <slot v-else/>
  </div>
</template>
<script setup>

const props = defineProps({
  container: {
    type: Boolean,
    default: true
  },
  section: {
    type: Boolean,
    default: false
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
})
</script>
<style>
.fill-with-margin{
  min-height: calc(100vh - 140px);
}
</style>
