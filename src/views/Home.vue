<script setup>
import { onBeforeMount, onMounted, ref } from 'vue';
import gsap from 'gsap';
import Hero from '../components/Hero.vue';
import Grid from '../components/Work/Grid.vue' 
import Footer from '../components/Footer.vue';
import Services from '../components/Services.vue';
import DeckCTA from '../components/DeckCTA.vue'
import BriefCTA from '../components/BriefCTA.vue'
import Testimonials from '../components/Testimonials.vue';
import Clients from '../components/Clients.vue';
import {useRouter} from 'vue-router'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { BLOCKS, MARKS } from '@contentful/rich-text-types';

let idx = 0
const router = useRouter()
const marquee1 = ref(null)
const marquee2 = ref(null)
const marqueeCount = ref([0,1,2,3,4,5,0,1,2,3,4,5])
const wordingList = ['ambitieuses', 'audacieuses', 'innovantes']
const services = ref(null)

import { createClient } from 'contentful'

const client = createClient({
    space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
    accessToken: import.meta.env.VITE_CONTENTFUL_API_KEY //Only published !!!
    //Preview : yaKRL3ryC8Pr9YLZiDE_tD3L5zGB6CBYxXZzgQkbaLY
})

onBeforeMount(()=>{
  client.getEntries({
        content_type: 'service', 
    })
    .then((entries)=>{
        services.value = entries.items
    })
})

onMounted(()=>{
    const stars = document.querySelectorAll('.shining-star')
    stars.forEach((s,i) => {
      gsap.fromTo(s, {scale: 0.8}, {scale: 1.4, rotate: 360, duration: 4 + (Math.random()*10), repeat: -1, ease: 'expo.inOut', yoyo: true})
    }) 
})

function openExternalLink(url) {
  window.open(url, '_blank', 'noopener,noreferrer');
}

 
const options = {
  renderMark: {
    [MARKS.BOLD]: (text) => `<span class="font-['PP_Bold']">${text}</span>`,
    [MARKS.ITALIC]: (text) => `<em class="italic">${text}</em>`,
    [MARKS.UNDERLINE]: (text) => `<span class="underline">${text}</span>`,
    [MARKS.CODE]: (text) => `<code class="px-1 bg-gray-100 rounded">${text}</code>`,
  },
}

</script>


<template>

  <div id="main-content" class="">  

      <Hero></Hero> 

      <div class="hidden">
        <div class="container mx-auto relative lg:pt-20 pt-6 lg:pb-14 pb-3"> 
   
            <svg class="w-8 h-8 absolute right-1 shining-star hidden lg:block" width="20" height="20" viewBox="0 0 165 165" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M82.3333 0L56.6042 56.6042L0 82.3333L56.6042 108.062L82.3333 164.667L108.062 108.062L164.667 82.3333L108.062 56.6042" fill="black"/>
            </svg> 
            <svg class="w-4 h-4 absolute right-20 shining-star hidden lg:block" width="20" height="20" viewBox="0 0 165 165" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M82.3333 0L56.6042 56.6042L0 82.3333L56.6042 108.062L82.3333 164.667L108.062 108.062L164.667 82.3333L108.062 56.6042" fill="black"/>
            </svg> 
            <svg class="w-4 h-4 absolute -left-6 shining-star hidden lg:block" width="20" height="20" viewBox="0 0 165 165" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M82.3333 0L56.6042 56.6042L0 82.3333L56.6042 108.062L82.3333 164.667L108.062 108.062L164.667 82.3333L108.062 56.6042" fill="black"/>
            </svg> 
            
            <h1 class="text-gray-500 lg:text-8xl text-5xl">Nos dernières <span class="text-black">pépites</span></h1>
  
        </div>
      </div>

      <div id="projects" class="container mx-auto " v-if="false">
        <div class="lg:h-[350px] aspect-video lg:aspect-auto mb-6 cursor-pointer border" @click="router.push('/wave-summer-xeweul')">
          <img class="w-full h-full object-cover" src="/wave-summer-xeweul/bg.jpg" alt="">
        </div>
        <div class="text-base font-bold">Wave Sénégal</div>
        <div class="text-gray-400" text-xs v-if="true">Summer Xeweul - Édition 2024</div>
        <div class="text-gray-500" v-if="false">Jeu Vidéo, UX/UI, Développement</div>
      </div>
       
      <Grid :length="'all'"></Grid>

      <div class="mx-auto container lg:pt-10">
        
        <div>
  
          <div class="container mx-auto text-left text-6xl mb-10">
              <h1 class="">Services à la carte</h1>  
          </div>
     
          <div class="grid lg:grid-cols-2 lg:gap-20 gap-10 mt-10 mb-20">
  
            <div v-for="service in services" class="mt-4 mb-10"> 
              <div class="text-2xl mb-4 font-bold"><span class="mr-3 opacity-50">→</span>{{service.fields.title}}</div>
              <div class="leading-tight" v-html="documentToHtmlString(service.fields.description, options)"></div>
            </div>
  
          </div>
  
        </div>

        <div>
  
          <div id="products" class="container mx-auto text-left text-6xl mb-10">
              <h1 class="">Nos produits</h1> 
          </div>
          
          <img class="w-full mt-12 mb-6 cursor-pointer hover:scale-105 duration-200" src="/popmyproduct.jpg" alt="">

        </div>

      </div>


      <Footer></Footer> 

  </div>

</template>

<style scoped>
.marquee-container {
  @apply absolute w-[1920px] whitespace-nowrap border-red-600 h-[60px] 
}
.marquee-items-primary, .marquee-items-secondary {
  @apply flex gap-0 justify-between items-center uppercase absolute top-1/2 -translate-y-1/2 w-full
}  
.marquee-item {
  @apply text-center w-full text-[1.45em] gap-5 pr-0 pl-0
}
</style>