<template>
  <Container :section="true" :padding="false">
    <div class="blur-inner-container relative w-full block xl:grid xl:grid-cols-2 rounded-[0px] xl:rounded-[30px]">
      <div class="left space-y-[30px]">
        <a target="_blank" :href="item.link.url ?? null" v-for="item of props.slice.items" class="w-full relative xl:pl-[76px] pl-[60px] no-underline">
          <div class="scroll-animation absolute left-0 top-[50%] -translate-y-1/2 xl:w-[56px] xl:h-[56px] w-[45px] h-[45px] rounded-full border border-[#52486C] flex justify-center items-center content-center justify-items-center">
            <svg v-if="item.type === 'phone'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="fill: rgba(255, 255, 255, 1);msFilter:progid:DXImageTransform.Microsoft.BasicImage(rotation=0, mirror=1);"><path d="m20.487 17.14-4.065-3.696a1.001 1.001 0 0 0-1.391.043l-2.393 2.461c-.576-.11-1.734-.471-2.926-1.66-1.192-1.193-1.553-2.354-1.66-2.926l2.459-2.394a1 1 0 0 0 .043-1.391L6.859 3.513a1 1 0 0 0-1.391-.087l-2.17 1.861a1 1 0 0 0-.29.649c-.015.25-.301 6.172 4.291 10.766C11.305 20.707 16.323 21 17.705 21c.202 0 .326-.006.359-.008a.992.992 0 0 0 .648-.291l1.86-2.171a.997.997 0 0 0-.085-1.39z"></path></svg>
            <svg v-if="item.type === 'email'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="fill: rgba(255, 255, 255, 1);transform: ;msFilter:;"><path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4.7-8 5.334L4 8.7V6.297l8 5.333 8-5.333V8.7z"></path></svg>
            <svg v-if="item.type === 'github'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="fill: rgba(255, 255, 255, 1);transform: ;msFilter:;"><path d="m21.62 11.108-8.731-8.729a1.292 1.292 0 0 0-1.823 0L9.257 4.19l2.299 2.3a1.532 1.532 0 0 1 1.939 1.95l2.214 2.217a1.53 1.53 0 0 1 1.583 2.531c-.599.6-1.566.6-2.166 0a1.536 1.536 0 0 1-.337-1.662l-2.074-2.063V14.9c.146.071.286.169.407.29a1.537 1.537 0 0 1 0 2.166 1.536 1.536 0 0 1-2.174 0 1.528 1.528 0 0 1 0-2.164c.152-.15.322-.264.504-.339v-5.49a1.529 1.529 0 0 1-.83-2.008l-2.26-2.271-5.987 5.982c-.5.504-.5 1.32 0 1.824l8.731 8.729a1.286 1.286 0 0 0 1.821 0l8.69-8.689a1.284 1.284 0 0 0 .003-1.822"></path></svg>
            <svg v-if="item.type === 'file'" xmlns="http://www.w3.org/2000/svg" width="24" height="24" style="fill: rgba(255, 255, 255, 1);transform: ;msFilter:;"><path d="M19 9h-4V3H9v6H5l7 8zM4 19h16v2H4z"></path></svg>
          </div>
          <p class="scroll-animation no-underline w-full h-auto xl:text-[20px] text-[16px] text-white xl:leading-[27px] leading-[20px] m-0 p-0">{{ $prismic.asText(item.title)  }}</p>
          <span class="scroll-animation no-underline w-full h-auto xl:text-[30px] text-[20px] text-white xl:leading-[40px] leading-[30px] m-0 p-0">{{ $prismic.asText(item.action_text)  }}</span>
        </a>
      </div>
        <div class="right">
          <form class="form" @submit="submit">
            <h5 class="scroll-animation">{{ $t('contact') }}</h5>
            <div class="scroll-animation input-field">
              <input ref="nameEL" @blur="updateForm" @input="updateForm" type="text" autocomplete="off" name="name" :placeholder="$t('content')"/>
            </div>
            <div class="scroll-animation input-field">
              <input ref="emailEL" @blur="updateForm" @input="updateForm" type="email" autocomplete="off" name="email" :placeholder="$t('email')"/>
            </div>
            <div class="scroll-animation input-field">
              <textarea ref="contentEL" @blur="updateForm" @input="updateForm" type="text" name="content" :placeholder="$t('content')"/>
            </div>

            <div class="mt-[35px] w-full flex items-center content-center justify-end justify-items-end">
              <button :disabled="!active || loading" class="scroll-animation text-[#fff] bg-[#FF0058] disabled:bg-[#6B527C] rounded-[3px] pt-[7px] pb-[7px] pr-[12px] pl-[12px] text-[18px]" type="submit">
                {{  $t('send') }}</button>
            </div>
          </form>
        </div>
    </div>
  </Container>
</template>
<script setup>
const props = defineProps({
  slice: {
    type: Object,
    required: true,
  },
});
const app = useNuxtApp();


const active = ref(false)
const nameEL = ref(null)
const emailEL = ref(null)
const contentEL = ref(null)


const updateForm = () => {
  active.value = (nameEL.value.value.trim().length > 0 && emailEL.value.value.trim().length > 0 && contentEL.value.value.trim().length > 0);
}

</script>
<style>


.blur-inner-container:before{
  content:"";

  @apply absolute left-0 top-0 w-full h-full;
  @apply rounded-[0px] xl:rounded-[30px];
  background-color: rgba(70, 70, 70, 0.2);
}

.blur-inner-container .left{
  @apply pr-[15px] pl-[15px] pt-[115px] pb-[115px];

  @apply xl:pl-[90px] xl:pr-[90px];
  @apply flex flex-col justify-center content-center items-center;

  @apply backdrop-blur-[11px] backdrop-opacity-[0.24];
}

.blur-inner-container .right{
  @apply pr-[15px] pl-[15px] pt-[115px] pb-[115px];
  @apply xl:pl-[90px] xl:pr-[90px];

  @apply flex content-center justify-items-center justify-center items-center;


  @apply rounded-[0px];
  @apply xl:rounded-[30px];

  background-color: rgba(70, 70, 70, 0.25);

  @apply backdrop-blur-[11px] backdrop-opacity-[0.24];
}


.form{
  @apply w-[350px] h-auto flex flex-col justify-center content-center justify-items-center items-center;
}
.form .input-field{
  @apply max-w-[350px] h-auto flex flex-col justify-center content-center justify-items-center items-center;
  @apply mt-[24px] mb-[24px];
}
.form .input-field textarea,
.form .input-field input{
  @apply w-[350px] h-auto flex flex-col justify-center content-center justify-items-center items-center;
  @apply pt-[15px] pb-[15px] pr-[7px] pl-[7px];

  @apply font-sans text-[16px] border-b-[#6B527C] border-b bg-transparent outline-none;

  @apply placeholder:text-[#6B527C];
  @apply text-[#fff];
  @apply active:text-[#FF0058] focus:text-[#FF0058] active:border-b-[#FF0058] focus:border-b-[#FF0058];
}

</style>
