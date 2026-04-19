<template>
  <Background :menu="false" :light="true" :opacity="0.8" color="#505050">
    <div ref="page" class="relative page py-[5rem] px-[7rem] w-[210rem] h-[297rem] page flex flex-col justify-between items-stretch content-stretch justify-items-stretch bg-white">
      <div class="pl-[3rem] pr-[12rem] flex flex-row justify-stretch items-stretch content-stretch justify-items-stretch bg-white w-full h-auto">
        <div class="flex flex-col justify-center items-center content-center justify-items-center w-full h-full space-y-[1rem]">
          <div class="space-y-[1.7rem] flex flex-col justify-center items-center content-center justify-items-center w-full h-auto">
            <h1 class="scroll-animation w-full h-auto subpixel-antialiased text-[#505050] text-[8rem] font-normal leading-none m-0">JÉRÉMIE <b>DUPAS</b></h1>
            <h2 class="scroll-animation w-full h-auto subpixel-antialiased text-[#505050] text-[7rem] font-normal leading-none m-0"><b>Fullstack</b> developer + <b>Creative</b> developer</h2>
          </div>
          <i class="scroll-animation w-full h-auto subpixel-antialiased text-[#505050] text-[4rem] font-normal leading-none m-0">Based in Amsterdam</i>
        </div>
        <div class="flex flex-col justify-center items-center content-center justify-items-center min-w-[35rem] w-auto h-auto">
          <img src="../assets/image/profile.jpg" class="size-[35rem] rounded-full"/>
        </div>
      </div>
      <div class="flex flex-row justify-stretch items-stretch content-stretch justify-items-stretch bg-white w-full h-full space-x-[7rem]">
        <div class="flex flex-col justify-between items-start content-start justify-items-end w-full h-full">
          <div class="flex flex-col justify-start items-start content-start justify-items-start w-full h-auto space-y-[2rem]">
            <h3 class="scroll-animation w-full h-auto subpixel-antialiased text-[#505050] text-[7rem] leading-none m-0 uppercase font-bold">SUMMARY</h3>
            <p class="scroll-animation w-full h-auto subpixel-antialiased text-[#505050] text-[4rem] font-normal leading-[6rem] m-0">Creative full-stack developer with 6+ years of experience, blending technical precision with artistic curiosity. Strong foundation in frontend technologies, real-time 3D, and full-stack development. Passionate about crafting engaging, scalable tech experiences and exploring the edges of creative technology.</p>
          </div>


          <div class="flex flex-col justify-start items-start content-start justify-items-start w-full h-auto space-y-[2rem]">
            <div class="flex flex-col justify-start justify-items-start items-stretch content-stretch w-full space-y-[2rem]">
              <h3 class="scroll-animation w-full h-auto subpixel-antialiased text-[#505050] text-[7rem] leading-none m-0 uppercase font-bold">WORK EXPERIENCE</h3>
              <div class="flex flex-row justify-between justify-items-start items-start content-start w-full">
                <div class="flex flex-col justify-start justify-items-start items-stretch content-start w-full space-y-[1rem]">
                  <strong class="scroll-animation font-bold whitespace-nowrap subpixel-antialiased text-[#505050] text-[4.7rem] leading-none">Frontend Developer</strong>
                  <p class="scroll-animation whitespace-nowrap subpixel-antialiased text-[#505050] text-[4rem] leading-none font-normal">MX3D | Amsterdam, Netherlands</p>
                </div>
                <i class="scroll-animation whitespace-nowrap subpixel-antialiased text-[#505050] text-[4rem] leading-none font-normal">Sep 2025 - Present</i>
              </div>
              <ul>
                <li class="scroll-animation subpixel-antialiased text-[#505050] text-[3.7rem]">
                  Developed and maintained an Electron-based interface to monitor and control industrial metal 3D printing robots.
                </li>
                <li class="scroll-animation subpixel-antialiased text-[#505050] text-[3.7rem]">
                  Built real-time visualization tools using React and Three.js for print process tracking and diagnostics.
                </li>
              </ul>
            </div>
            <div class="flex flex-col justify-start justify-items-start items-stretch content-stretch w-full space-y-[2rem]">
              <div class="flex flex-row justify-between justify-items-start items-start content-start w-full">
                <div class="flex flex-col justify-start justify-items-start items-stretch content-start w-full space-y-[1rem]">
                  <strong class="scroll-animation font-bold whitespace-nowrap subpixel-antialiased text-[#505050] text-[4.7rem] leading-none">Fullstack Developer + Creative Developer</strong>
                  <p class="scroll-animation whitespace-nowrap subpixel-antialiased text-[#505050] text-[4rem] leading-none font-normal">Freelance | Amsterdam, Netherlands</p>
                </div>
                <i class="scroll-animation whitespace-nowrap subpixel-antialiased text-[#505050] text-[4rem] leading-none font-normal">Nov 2024 - Sep 2025</i>
              </div>
              <ul>
                <li class="scroll-animation subpixel-antialiased text-[#505050] text-[3.7rem]">Built a flexible face-swap web app (NuxtJS/NextJS, TailwindCSS) deployable as booth, web, or mobile view.</li>
                <li class="scroll-animation subpixel-antialiased text-[#505050] text-[3.7rem]">Integrated custom and third-party face-swap APIs (ConfUI, Replicate, Akool).</li>
                <li class="scroll-animation subpixel-antialiased text-[#505050] text-[3.7rem]">Created a multilingual Garfield AR filter on Snapchat (11 languages).</li>
              </ul>
            </div>
            <div class="flex flex-col justify-start justify-items-start items-stretch content-stretch w-full space-y-[2rem]">
              <div class="flex flex-row justify-between justify-items-start items-start content-start w-full">
                <div class="flex flex-col justify-start justify-items-start items-stretch content-start w-full space-y-[1rem]">
                  <strong class="scroll-animation font-bold whitespace-nowrap subpixel-antialiased text-[#505050] text-[4.7rem] leading-none">Creative Developer</strong>
                  <p class="scroll-animation whitespace-nowrap subpixel-antialiased text-[#505050] text-[4rem] leading-none font-normal">GoSpooky | Amsterdam, Netherlands</p>
                </div>
                <i class="scroll-animation whitespace-nowrap subpixel-antialiased text-[#505050] text-[4rem] leading-none font-normal">Dec 2022 - Nov 2024</i>
              </div>
              <ul>
                <li class="scroll-animation subpixel-antialiased text-[#505050] text-[3.7rem]">Built AR/VR experiences for Jameson, Barbie (50 million views), Creamfields using WebGL/A-Frame/WebXR/Three.js/8thwall, Lens Studio, Effect House, Spark AR.</li>
                <li class="scroll-animation subpixel-antialiased text-[#505050] text-[3.7rem]">Led R&D: heartbeat tracker (FFT), ML prototyping with PyTorch.</li>
              </ul>
            </div>
            <div class="flex flex-col justify-start justify-items-start items-stretch content-stretch w-full space-y-[2rem]">
              <div class="flex flex-row justify-between justify-items-start items-start content-start w-full">
                <div class="flex flex-col justify-start justify-items-start items-stretch content-start w-full space-y-[1rem]">
                  <strong class="scroll-animation font-bold whitespace-nowrap subpixel-antialiased text-[#505050] text-[4.7rem] leading-none">Creative Developer</strong>
                  <p class="scroll-animation whitespace-nowrap subpixel-antialiased text-[#505050] text-[4rem] leading-none font-normal">Atomic Digital Design | Paris, France</p>
                </div>
                <i class="scroll-animation whitespace-nowrap subpixel-antialiased text-[#505050] text-[4rem] leading-none font-normal">Oct 2019 - Nov 2022</i>
              </div>
              <ul>
                <li class="scroll-animation subpixel-antialiased text-[#505050] text-[3.7rem]">Created highly successful branded AR/web experiences for clients like Dior (15M impressions), PNL (10M views in 1 week, sold-out tour tickets in <48 hours), Steve Madden (1.2k+ views in less than 3 weeks), utilizing Three.js, 8thWall, ReactJS, and NuxtJS.</li>
                <li class="scroll-animation subpixel-antialiased text-[#505050] text-[3.7rem]">Optimized mobile/web 3D rendering with designers and 3D artists.</li>
              </ul>
            </div>
          </div>
          <div class="flex flex-col justify-between items-start content-start justify-items-start w-full h-auto  space-y-[2rem]">
            <div class="flex flex-col justify-start justify-items-start items-stretch content-stretch w-full space-y-[2rem]">
              <h3 class="scroll-animation w-full h-auto subpixel-antialiased text-[#505050] text-[7rem] font-bold leading-none m-0 uppercase">PERSONAL PROJECTS</h3>
              <div class="flex flex-col justify-start justify-items-start items-stretch content-stretch w-full space-y-[2rem]">
                <div class="flex flex-col justify-start justify-items-start items-stretch content-start w-full space-y-[1rem]">
                  <strong class="scroll-animation font-bold whitespace-nowrap subpixel-antialiased text-[#505050] text-[4.7rem] leading-none">Dupy</strong>
                  <p class="scroll-animation whitespace-nowrap subpixel-antialiased text-[#505050] text-[4rem] leading-none font-normal">Backend framework</p>
                </div>
                <ul>
                  <li class="scroll-animation subpixel-antialiased text-[#505050] text-[3.7rem]">Built scalable backend framework (in Typescript) with REST/GraphQL support.</li>
                  <li class="scroll-animation subpixel-antialiased text-[#505050] text-[3.7rem]">Focused on validation, i18n, and automated documentation (TypeDoc).</li>
                </ul>
              </div>
            </div>
            <div class="flex flex-col justify-start justify-items-start items-stretch content-stretch w-full space-y-[2rem]">
              <div class="flex flex-col justify-start justify-items-start items-stretch content-stretch w-full space-y-[2rem]">
                <div class="flex flex-col justify-start justify-items-start items-stretch content-start w-full space-y-[1rem]">
                  <strong class="scroll-animation font-bold whitespace-nowrap subpixel-antialiased text-[#505050] text-[4.7rem] leading-none">Liketoshare</strong>
                  <p class="scroll-animation whitespace-nowrap subpixel-antialiased text-[#505050] text-[4rem] leading-none font-normal">Social network</p>
                </div>
                <ul>
                  <li class="scroll-animation subpixel-antialiased text-[#505050] text-[3.7rem]">Designed ephemeral content system with engagement-driven lifespan.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-col justify-start items-start content-start justify-items-start w-auto h-full space-y-[5rem] pt-[8rem]">
          <div class="flex flex-col justify-start items-start content-start justify-items-start w-auto h-auto space-y-[3rem]">
            <h3 class="scroll-animation w-full h-auto subpixel-antialiased text-[#505050] text-[7rem] font-bold whitespace-nowrap leading-none m-0 uppercase">Contact</h3>
            <ul class="list-none space-y-[1rem]">
              <li class="scroll-animation leading-none align-middle whitespace-nowrap subpixel-antialiased text-[#505050] text-[3.7rem] min-h-[5rem] relative flex justify-start items-center content-center"><img class="image" src="https://api.iconify.design/material-symbols:call-sharp.svg"/> +33 6 67 05 17 64</li>
              <li class="scroll-animation whitespace-nowrap subpixel-antialiased text-[#505050] text-[3.7rem] min-h-[5rem] relative flex justify-start items-center content-center"><img class="image" src="https://api.iconify.design/material-symbols:location-on-rounded.svg"/>Amsterdam, Netherlands</li>
              <li class="scroll-animation whitespace-nowrap subpixel-antialiased text-[#505050] text-[3.7rem] min-h-[5rem] relative flex justify-start items-center content-center"><img class="image" src="https://api.iconify.design/ic:outline-mail.svg"/>dupasj97@gmail.com</li>
              <li class="scroll-animation whitespace-nowrap subpixel-antialiased text-[#505050] text-[3rem] min-h-[5rem] relative flex justify-start items-center content-center"><img class="image" src="https://api.iconify.design/devicon-plain:linkedin.svg"/><a href="https://linkedin.com/in/jeremie-dupas">linkedin.com/in/jeremie-dupas</a></li>
              <li class="scroll-animation whitespace-nowrap subpixel-antialiased text-[#505050] text-[3rem] min-h-[5rem] relative flex justify-start items-center content-center"><img class="image" src="https://api.iconify.design/tabler:world.svg"/><a href="https://portfolio-y71.pages.dev">portfolio-y71.pages.dev</a></li>
            </ul>
          </div>
          <div class="flex flex-col justify-start items-start content-start justify-items-start w-auto h-auto space-y-[3rem]">
            <h3 class="scroll-animation w-full h-auto subpixel-antialiased text-[#505050] text-[7rem] font-bold leading-none whitespace-nowrap m-0 uppercase">Education</h3>
            <div class="flex flex-col justify-start items-start content-start justify-items-start w-auto h-auto space-y-[1rem]">
              <strong class="scroll-animation font-bold subpixel-antialiased text-[#505050] text-[4.2rem] leading-none">Master’s in Web & Mobile Engineering</strong>
              <p class="scroll-animation subpixel-antialiased text-[#505050] text-[4rem] leading-none">September 2016 - June 2021</p>
              <p class="scroll-animation subpixel-antialiased text-[#505050] text-[3.2rem] font-light leading-none">Paris, France</p>
              <p class="scroll-animation subpixel-antialiased text-[#505050] text-[3.7rem] font-light leading-none">IIM – Institute of Internet and Multimedia</p>
            </div>
          </div>
          <div class="flex flex-col justify-start items-start content-start justify-items-start w-auto h-auto space-y-[3rem]">
            <h3 class="scroll-animation w-full h-auto subpixel-antialiased text-[#505050] text-[7rem] font-bold leading-none whitespace-nowrap m-0 uppercase">SKILLS</h3>
            <div class="flex flex-col justify-start items-start content-start justify-items-start w-auto h-auto space-y-[3rem]">
              <div class="flex flex-col justify-start items-start content-start justify-items-start w-auto h-auto space-y-[1rem]">
                <h4 class="scroll-animation w-full h-auto subpixel-antialiased text-[#505050] text-[4rem] font-bold leading-none whitespace-nowrap m-0 uppercase">Hard skills</h4>
                <ul class="space-y-0">
                  <li class="scroll-animation whitespace-nowrap subpixel-antialiased text-[#505050] text-[3.7rem]">VueJS / NuxtJS</li>
                  <li class="scroll-animation whitespace-nowrap subpixel-antialiased text-[#505050] text-[3.7rem]">NodeJS / TypeScript</li>
                  <li class="scroll-animation whitespace-nowrap subpixel-antialiased text-[#505050] text-[3.7rem]">8thWall / WebXR</li>
                  <li class="scroll-animation whitespace-nowrap subpixel-antialiased text-[#505050] text-[3.7rem]">ReactJS / NextJS</li>
                  <li class="scroll-animation whitespace-nowrap subpixel-antialiased text-[#505050] text-[3.7rem]">WebGL / ThreeJS</li>
                  <li class="scroll-animation whitespace-nowrap subpixel-antialiased text-[#505050] text-[3.7rem]">SQL / NoSQL</li>
                  <li class="scroll-animation whitespace-nowrap subpixel-antialiased text-[#505050] text-[3.7rem]">AmmoJS</li>
                  <li class="scroll-animation whitespace-nowrap subpixel-antialiased text-[#505050] text-[3.7rem]">Postgres / PostGis</li>
                  <li class="scroll-animation whitespace-nowrap subpixel-antialiased text-[#505050] text-[3.7rem]">Git / CI</li>
                  <li class="scroll-animation whitespace-nowrap subpixel-antialiased text-[#505050] text-[3.7rem]">Electron</li>
                  <li class="scroll-animation whitespace-nowrap subpixel-antialiased text-[#505050] text-[3.7rem]">HTML/CSS/JS</li>
                </ul>
              </div>
              <div class="flex flex-col justify-start items-start content-start justify-items-start w-auto h-auto space-y-[1rem]">
                <h4 class="scroll-animation w-full h-auto subpixel-antialiased text-[#505050] text-[4rem] font-bold leading-none whitespace-nowrap m-0 uppercase">Soft skills</h4>
                <ul>
                  <li class="scroll-animation whitespace-nowrap subpixel-antialiased text-[#505050] text-[3.7rem]">Problem solving</li>
                  <li class="scroll-animation whitespace-nowrap subpixel-antialiased text-[#505050] text-[3.7rem]">Volunteer minded</li>
                  <li class="scroll-animation whitespace-nowrap subpixel-antialiased text-[#505050] text-[3.7rem]">Curious</li>
                  <li class="scroll-animation whitespace-nowrap subpixel-antialiased text-[#505050] text-[3.7rem]">Adaptation</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="flex flex-col justify-start items-start content-start justify-items-start w-auto h-auto space-y-[3rem]">
            <h3 class="scroll-animation w-full h-auto subpixel-antialiased text-[#505050] text-[7rem] font-bold leading-none whitespace-nowrap m-0 uppercase">Language</h3>
            <ul>
              <li class="scroll-animation whitespace-nowrap subpixel-antialiased text-[#505050] text-[3.7rem]">French</li>
              <li class="scroll-animation whitespace-nowrap subpixel-antialiased text-[#505050] text-[3.7rem]">English</li>
            </ul>
          </div>
        </div>
        <div ref="qrRef" class="absolute right-[5rem] bottom-[5rem] size-[17rem]"/>
      </div>
    </div>
    <div class="navbar fixed bottom-0 left-0 w-full z-50 bg-[#505050]/90 backdrop-blur-md text-white text-[4rem] px-[6rem] py-[2rem] flex justify-between items-center">
      <div class="flex justify-start items-start space-x-[2.5rem]">
        <a href="/[RESUME] DUPAS Jeremie.pdf" download="[RESUME] DUPAS Jeremie.pdf" class="no-underline hover:opacity-80 transition-opacity">
          <img class="inline-block align-middle -translate-y-[5%]" src="https://api.iconify.design/material-symbols:download-2.svg?color=%23ffffff"/> Download Resume
        </a>
        <button @click="print" class="hover:opacity-80 transition-opacity">
          <img class="inline-block align-middle -translate-y-[5%]" src="https://api.iconify.design/material-symbols:print-rounded.svg?color=%23ffffff"/> Print Resume
        </button>
      </div>
      <a v-if="referrer" :href="referrer" class="hover:opacity-80 transition-opacity no-underline"><img class="inline-block align-middle -translate-y-[5%]" src="https://api.iconify.design/material-symbols:keyboard-backspace-rounded.svg?color=%23ffffff"/> Back to previous page</a>
      <a v-else-if="referrer === null" href="/" class="hover:opacity-80 transition-opacity no-underline"><img class="inline-block align-middle -translate-y-[5%]" src="https://api.iconify.design/material-symbols:keyboard-backspace-rounded.svg?color=%23ffffff"/> Back to Home</a>
    </div>
  </Background>

 </template>
 <style>
 html, body {
   font-smooth: always;
   margin: 0;
   padding: 0;
   background: #f0f0f0;

   width: 100%;
   @apply flex flex-col justify-center items-center content-center justify-items-center;
 }
 .page {
   box-shadow: 0 0 5rem rgba(0, 0, 0, 0.2);
   max-width: 100%;
   margin: 10rem 0 20rem 0;

   p{
     margin-bottom: 0;
   }
 }

 body{
   min-height: 100%;
   height: auto;
   @apply flex flex-col justify-center items-center content-center justify-items-center;
 }
 html{
   font-size: min(3.75px,0.45vw);
   height: 100%;
   &.pdf-mode{
     font-size: 3.6px;
    .page{
      margin: 0;
      overflow: hidden;
    }
   }
 }

 @page {
   margin: 0;
 }


 ul li  .image{
   @apply absolute right-full top-1/2 -translate-x-[2rem] -translate-y-1/2 size-[5rem] -mt-[0.6rem];
 }
ul:not(.list-none){
  padding-left: 0;
  list-style: none;

  li{
    padding-left: 4rem;
    position: relative;

    &:before{
      position: absolute;
      left:1rem;
      top:2.1rem;
      background-color: #505050;
      content: ' ';
      width: 1.2rem;
      height: 1.2rem;
      border-radius: 99px;
      print-color-adjust: exact;
    }
  }
}
 ul.list-none{
   padding-left: 6.5rem;
 }

@media print {
  .navbar{
    display:none;
  }
  .page{
    position: fixed;
    left:0;
    top:0;
    width: 100%;
    height: 100%;
    margin: 0;
    box-shadow: none;
  }
 html{
   font-size: 1mm;
 }
}




 </style>

 <script setup>
 import html2pdf from "html2pdf.js";
 import QRCodeStyling from "qr-code-styling";
 import ResumePreviewUrl from "../assets/image/resume-preview.jpg";

 const page = ref();

 const referrer = ref(null)
 const router = useRouter()

 const print = () => {
   window.print()
 }

 onMounted(async () => {
   if (!process.client) return

   const currentUrl = window.location.href
   const currentOrigin = window.location.origin

   const urlParams = new URLSearchParams(window.location.search)
   const backParam = urlParams.get('back')

   const isValidBackUrl = (urlStr) => {
     try {
       const url = new URL(urlStr, currentOrigin)
       return url.origin === currentOrigin && url.href !== currentUrl
     } catch {
       return false
     }
   }

   if (backParam && isValidBackUrl(backParam)) {
     referrer.value = new URL(backParam, currentOrigin).href
     return
   }

   const historyStateBack = history.state?.back
   if (typeof historyStateBack === 'string' && isValidBackUrl(historyStateBack)) {
     referrer.value = new URL(historyStateBack, currentOrigin).href
     return
   }

   const previousUrlRaw = document.referrer
   if (previousUrlRaw) {
     const previousUrl = new URL(previousUrlRaw)
     if (previousUrl.origin === currentOrigin && previousUrl.href !== currentUrl) {
       referrer.value = previousUrl.href
     }
   }
 })

 useHead({
   title: 'Resume of Jeremie Dupas – Fullstack & Creative Developer',
   meta: [
     {
       hid: 'description',
       name: 'description',
       content: 'Download or view the resume of Jeremie Dupas, a Fullstack and Creative Developer based in Amsterdam.',
     },
     {
       hid: 'og:title',
       property: 'og:title',
       content: 'Resume of Jeremie Dupas – Fullstack & Creative Developer',
     },
     {
       hid: 'og:description',
       property: 'og:description',
       content: 'Explore the CV of Jeremie Dupas: Fullstack & Creative Developer experienced in AR/VR, WebGL, and scalable web platforms.',
     },
     {
       hid: 'og:type',
       property: 'og:type',
       content: 'website',
     },
     {
       hid: 'og:url',
       property: 'og:url',
       content: 'https://portfolio-y71.pages.dev/resume', // adjust if needed
     },
     {
       hid: 'og:image',
       property: 'og:image',
       content: ResumePreviewUrl,
     },
     {
       hid: 'keywords',
       name: 'keywords',
       content: 'jeremie dupas, resume, cv, fullstack developer, creative developer, web developer, amsterdam',
     },
   ],
 })



 const pdf = async () => {

   document.documentElement.classList.add('pdf-mode')

   const size = page.value.getBoundingClientRect();

   await html2pdf()
       .set({
         margin: 0,
         enableLinks: true,
         filename: '[RESUME] DUPAS Jeremie.pdf',
         html2canvas: {
           width: size.width,
           height: size.height,
           scale: 5,
           removeContainer: false,
           useCORS: true
         },
         jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait',compress: true }
       })
       .from(page.value)
       .save();
   document.documentElement.classList.remove('pdf-mode')
 }

 const qrRef = ref(null)

 onMounted(() => {
   if (!process.client){
     return
   }


   const qrcode = new QRCodeStyling({
     width: 300,
     height: 300,
     type: 'svg',
     data: 'https://portfolio-y71.pages.dev/',
     dotsOptions: {
       color: "#505050",
       type: "rounded"
     },
     backgroundOptions: {
       color: "#ffffff"
     },
     imageOptions: {
       crossOrigin: "anonymous",
       margin: 5
     }
   })



   qrcode._svg.removeAttribute('height')
   qrcode._svg.removeAttribute('width')
   qrRef.value.appendChild(qrcode._svg)
 })

 </script>