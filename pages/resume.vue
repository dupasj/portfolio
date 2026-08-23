<template>
  <Background :menu="false" :light="true" :opacity="0.8" color="#505050">
    <div ref="page" class="relative page">
      <div class="header-group">
        <div class="header-content">
          <div class="header-title-group">
            <h1 class="scroll-animation header-title">JÉRÉMIE <b>DUPAS</b></h1>
            <h2 class="scroll-animation header-subtitle"><b>Creative</b> Developer & <b>Frontend</b> Engineer</h2>
          </div>
          <i class="scroll-animation header-subinformation">React · Three.js · Interactive Experiences · TypeScript</i>
        </div>
        <div class="header-image-group">
          <img src="../assets/image/profile.jpg" class="header-image"/>
        </div>
      </div>
      <div class="content-group">
        <div class="content-left">
          <div class="category-group">
            <h3 class="scroll-animation category-title">SUMMARY</h3>
            <p class="scroll-animation category-summary">Creative Developer & Frontend Engineer with 7+ years building interactive web,
              3D and real-time experiences for brands including <b>Dior</b>, <b>Barbie</b> and <b>Jameson</b>.
              Specialized in <span>React</span>, <span>TypeScript</span>, <span>Three.js</span>, <span>WebGL</span> and <span>WebXR</span>, spanning creative
              agencies, branded campaigns and industrial applications (including one
              experience that reached 50M+ views). Focused on pairing strong engineering with creative technology to ship <span>pixel-perfect</span>, <span>real-time</span> experiences.
            </p>
          </div>
          <div class="category-group">
            <h3 class="scroll-animation category-title">WORK EXPERIENCE</h3>
            <div class="category-content">
              <div class="work-group">
                <div class="work-header">
                  <div class="work-title-group">
                    <strong class="scroll-animation work-title">Frontend Developer</strong>
                    <p class="scroll-animation work-subtitle">MX3D | Amsterdam, Netherlands</p>
                  </div>
                  <i class="scroll-animation work-date">Sep 2025 - Sep 2026</i>
                </div>
                <ul class="list">
                  <li class="scroll-animation work-bullet">
                    Developed and maintained an <span>Electron</span> application for monitoring and controlling industrial metal 3D-printing robots.
                  </li>
                  <li class="scroll-animation work-bullet">
                    Built <span>real-time 3D visualization</span> tools with <span>React</span> and <span>Three.js</span> to monitor and diagnose industrial metal 3D-printing processes.
                  </li>
                </ul>
              </div>
              <div class="work-group">
                <div class="work-header">
                  <div class="work-title-group">
                    <strong class="scroll-animation work-title">Creative Developer & Frontend Engineer</strong>
                    <p class="scroll-animation work-subtitle">Freelance | Amsterdam, Netherlands</p>
                  </div>
                  <i class="scroll-animation work-date">Nov 2024 - Sep 2025</i>
                </div>
                <ul class="list">
                  <li class="scroll-animation work-bullet">Created a multilingual <b>Garfield</b> <span>AR experience</span> for <span>Snapchat</span>, supporting 11 languages</li>
                  <li class="scroll-animation work-bullet">Built a <span>cross-platform web application</span> with <span>Nuxt.js</span>, <span>Next.js</span> and <span>Tailwind CSS</span>, adapted for a photobooth/TV setup, a standalone web app, and an embedded <span>Flutter</span> application.</li>
                  <li class="scroll-animation work-bullet">Integrated custom and third-party <span>AI image-generation APIs</span>, including <span>ComfyUI</span>, <span>Replicate</span> and <span>Akool</span>.</li>
                </ul>
              </div>
              <div class="work-group">
                <div class="work-header">
                  <div class="work-title-group">
                    <strong class="scroll-animation work-title">Creative Developer</strong>
                    <p class="scroll-animation work-subtitle">GoSpooky | Amsterdam, Netherlands</p>
                  </div>
                  <i class="scroll-animation work-date">Dec 2022 - Nov 2024</i>
                </div>
                <ul class="list">
                  <li class="scroll-animation work-bullet">Built a <b>Barbie</b> <span>AR experience</span> that <b>reached 50M+ views</b>, part of a broader slate of interactive <span>AR/VR</span> campaigns for brands including <b>Jameson</b> and <b>Creamfields</b>, using <span>WebGL</span>, <span>Three.js</span>, <span>WebXR</span>, <span>8th Wall</span> and <span>Lens Studio</span></li>
                  <li class="scroll-animation work-bullet">Led <span>creative R&D projects</span>, including real-time heartbeat tracking using <span>FFT</span> and <span>machine-learning prototypes</span> built with <span>PyTorch</span>.
                  </li>
                </ul>
              </div>
              <div class="work-group">
                <div class="work-header">
                  <div class="work-title-group">
                    <strong class="scroll-animation work-title">Creative Developer</strong>
                    <p class="scroll-animation work-subtitle">Atomic Digital Design | Paris, France</p>
                  </div>
                  <i class="scroll-animation work-date">Oct 2019 - Nov 2022</i>
                </div>
                <ul class="list">
                  <li class="scroll-animation work-bullet">Created interactive <span>AR and web experiences</span> for major brands including <b>Dior</b>, <b>Disney</b>, <b>PNL</b> and <b>Steve Madden</b>, reaching <span>15M+ impressions</span> and <span>10M+ views</span> within the first weeks of launch.</li>
                  <li class="scroll-animation work-bullet">Developed immersive experiences with <span>Three.js</span>, <span>8th Wall</span>, <span>React</span> and <span>Nuxt.js</span>, working closely with designers and 3D artists to optimize <span>real-time 3D  performance</span> across mobile and web.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="content-right">
          <div class="category-group">
            <h3 class="scroll-animation category-title">CONTACT</h3>
            <ul class="list">
              <li class="scroll-animation work-bullet"><img class="bullet-image" src="https://api.iconify.design/material-symbols:call-sharp.svg"/> +33 6 67 05 17 64</li>
              <li class="scroll-animation work-bullet"><img class="bullet-image" src="https://api.iconify.design/material-symbols:location-on-rounded.svg"/>Amsterdam, Netherlands</li>
              <li class="scroll-animation work-bullet"><img class="bullet-image" src="https://api.iconify.design/ic:outline-mail.svg"/>dupasj97@gmail.com</li>
              <li class="scroll-animation work-bullet"><img class="bullet-image" src="https://api.iconify.design/devicon-plain:linkedin.svg"/><a href="https://linkedin.com/in/jeremie-dupas">linkedin.com/in/jeremie-dupas</a></li>
              <li class="scroll-animation work-bullet"><img class="bullet-image" src="https://api.iconify.design/tabler:world.svg"/><a href="https://portfolio-y71.pages.dev">portfolio-y71.pages.dev</a></li>
            </ul>
          </div>
          <div class="category-group">
            <h3 class="scroll-animation category-title">SKILLS</h3>
            <div class="category-content">
              <div class="subcategory-group">
                <h4 class="scroll-animation subcategory-title">Frontend</h4>
                <ul class="list">
                  <li class="scroll-animation work-bullet">VueJS / NuxtJS</li>
                  <li class="scroll-animation work-bullet">NodeJS / TypeScript</li>
                  <li class="scroll-animation work-bullet">8thWall / WebXR</li>
                  <li class="scroll-animation work-bullet">ReactJS / NextJS</li>
                  <li class="scroll-animation work-bullet">WebGL / Three.js</li>
                  <li class="scroll-animation work-bullet">HTML/CSS/JS</li>
                </ul>
              </div>
              <div class="subcategory-group">
                <h4 class="scroll-animation subcategory-title">Creative Technology</h4>
                <ul class="list">
                  <li class="scroll-animation work-bullet">Three.js / WebGL</li>
                  <li class="scroll-animation work-bullet">WebXR / 8th Wall</li>
                  <li class="scroll-animation work-bullet">Lens Studio</li>
                  <li class="scroll-animation work-bullet">A-Frame</li>
                  <li class="scroll-animation work-bullet">Electron</li>
                </ul>
              </div>
              <div class="subcategory-group">
                <h4 class="scroll-animation subcategory-title">Backend & Tools</h4>
                <ul class="list">
                  <li class="scroll-animation work-bullet">REST / GraphQL</li>
                  <li class="scroll-animation work-bullet">PostgreSQL / PostGIS</li>
                  <li class="scroll-animation work-bullet">SQL / NoSQL</li>
                  <li class="scroll-animation work-bullet">Git / CI</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="category-group">
            <h3 class="scroll-animation category-title">Language</h3>
            <ul class="list">
              <li class="scroll-animation work-bullet">French — Native</li>
              <li class="scroll-animation work-bullet">English — Fluent</li>
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
   @apply py-[5rem] px-[7rem] w-[210rem] h-[297rem] flex flex-col justify-between items-stretch content-stretch justify-items-stretch bg-white;
 }

 body{
   min-height: 100%;
   height: auto;
   @apply flex flex-col justify-center items-center content-center justify-items-center;
 }
 html{
   font-size: min(3.75px,0.45vw);
   height: 100%;
 }

 @page {
   margin: 0;
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


.work-group{
 @apply flex flex-col justify-start justify-items-start items-stretch content-stretch w-full space-y-[2rem]
}
.work-header{
  @apply flex flex-row justify-between justify-items-start items-start content-start w-full;
}
.work-title-group{
 @apply flex flex-col justify-start justify-items-start items-stretch content-start w-full space-y-[1rem];
}
.work-title{
  @apply font-semibold whitespace-nowrap subpixel-antialiased text-[#1a1a1a] text-[4rem] leading-none;
}
.work-subtitle{
 @apply whitespace-nowrap subpixel-antialiased text-[#505050] text-[4rem] leading-none font-normal;
}
.work-date{
 @apply whitespace-nowrap subpixel-antialiased text-[#505050] text-[3rem] leading-none font-normal;
}

.list{
  @apply list-none pl-0 space-y-[0.5rem];
}
.work-bullet{
  &:not(:has(.bullet-image)){
    @apply subpixel-antialiased text-[#505050] pl-[4rem] relative;

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
  &:has(.bullet-image){
    @apply whitespace-nowrap subpixel-antialiased text-[#505050] relative flex justify-start items-center content-center min-h-[5rem];
    &:not(:first-child){
      @apply mt-[1rem];
    }
  }

  .bullet-image{
    @apply pr-[1rem];
  }

  @apply text-[3.9rem];
  &:has(a){
    @apply  text-[3rem];
  }
}

.content-left{
  @apply flex flex-col justify-start items-start content-start justify-items-start w-full h-auto space-y-[7rem] pt-[5rem];
  span{
    @apply brightness-50 font-medium;
  }
}
 .content-right{
   @apply flex flex-col justify-start items-start content-start justify-items-start w-auto h-full space-y-[5rem] pt-[5rem] pr-[1rem];
 }
.content-group{
  @apply flex flex-row justify-stretch items-stretch content-stretch justify-items-stretch  w-full h-full space-x-[7rem];
}

.category-group{
  @apply flex flex-col justify-start items-start content-start justify-items-start w-full h-auto space-y-[3rem];
}
.category-title{
  @apply w-full h-auto subpixel-antialiased text-[#1a1a1a] text-[5.5rem] leading-none m-0 pb-[1rem] uppercase font-medium border-b;
}
.category-content{
  @apply flex flex-col justify-start items-start content-start justify-items-start w-full h-auto space-y-[7rem];
  @apply subpixel-antialiased text-[#505050] text-[3.7rem] font-normal leading-[5.2rem];
}
 .category-summary{
   @apply subpixel-antialiased text-[#505050] text-[4rem] font-normal leading-[5.2rem];
 }

 .header-title-group{
   @apply flex flex-col justify-center items-center content-center justify-items-center w-full h-auto;
 }
 .header-group{
   @apply pl-[3rem] pr-[7rem] flex flex-row justify-stretch items-stretch content-stretch justify-items-stretch w-full h-auto;
 }
 .header-content{
   @apply flex flex-col justify-center items-center content-center justify-items-center w-full h-full space-y-[2rem];
 }

 .header-image-group{
   @apply flex flex-col justify-center items-center content-center justify-items-center min-w-[30rem] w-auto h-auto;
 }
 .header-image{
   @apply size-[30rem] rounded-full;
 }
 .header-title{
   @apply w-full h-auto subpixel-antialiased text-[#1A1A1A] text-[8rem] font-normal leading-none m-0;
 }
 .header-subtitle{
   @apply w-full h-auto subpixel-antialiased text-[#1A1A1A] text-[7rem] font-normal leading-none m-0;
 }
 .header-subinformation{
   @apply w-full h-auto subpixel-antialiased text-[#505050] text-[4rem] font-normal leading-none m-0;
 }

 .subcategory-title{
   @apply  w-full h-auto subpixel-antialiased text-[#1a1a1a] text-[4rem] font-semibold leading-none whitespace-nowrap m-0 uppercase;
 }
 .subcategory-group{
   @apply flex flex-col justify-start items-start content-start justify-items-start w-auto h-auto space-y-[1rem];
 }
 </style>

 <script setup>
 import QRCodeStyling from "qr-code-styling";
 import ResumePreviewUrl from "../assets/image/resume-preview.jpg";

 const page = ref();
 const referrer = ref(null)

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