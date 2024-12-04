<template>
  <div class="w-full h-auto" :class="{
      'mt-[100px] xl:mb-[100px] [&:not(:last-child)]:mb-[100px]': props.margin,
      'fill-with-margin pt-[160px]': props.screen === true && !props.section && !props.container && props.margin,
      'xl-fill-with-margin xl:pt-[160px]': props.screen === 'mobile' && !props.section && !props.container && props.margin,
      'pt-[160px]': props.screen === true && !props.section && !props.container,
      'xl:pt-[160px]': props.screen === 'mobile' && !props.section && !props.container,
      'snap': props.section || props.screen === true,
      'xl:snap': props.section || props.screen === 'mobile',
      'min-h-[100vh]': props.screen === true && !props.section && !props.container && !props.margin,
      'xl:min-h-[100vh]': props.screen === 'mobile' && !props.section && !props.container && !props.margin,
      'pl-[15px] pr-[15px]': props.padding && !props.container
  }">
    <div :class="{
      'fill-with-margin': props.screen === true && props.margin,
      'xl-fill-with-margin': props.screen === 'mobile' && props.margin,
      'pt-[160px]': props.screen === true,
      'xl:pt-[160px]': props.screen === 'mobile',
      'min-h-[100vh]': props.screen === true && !props.margin,
      'xl:min-h-[100vh]': props.screen === 'mobile' && !props.margin,
      'pl-[15px] pr-[15px]': props.padding
    }" v-if="props.section" class="xl:container flex-col flex justify-items-center items-center justify-center align-center content-center">
      <slot/>
    </div>
    <div :class="{
      'fill-with-margin': props.screen === true && props.margin,
      'xl-fill-with-margin': props.screen === 'mobile' && props.margin,
      'pt-[160px]': props.screen === true,
      'min-h-[100vh]': props.screen === true && !props.margin,
      'xl:min-h-[100vh]': props.screen === 'mobile' && !props.margin,
      'pl-[15px] pr-[15px]': props.padding
    }" v-else-if="props.container" class="container flex-col flex justify-items-center items-center justify-center align-center content-center">
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
    type: [Boolean,"mobile"],
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
