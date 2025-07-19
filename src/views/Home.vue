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
 

</script>


<template> 

  <div id="main-content" class="">  

      <DeckCTA></DeckCTA>

      <Hero></Hero> 

      <Clients></Clients> 

      <div class="lg:p-20 p-6 bg-[#efefef] mt-10">
        <video class="w-full h-full rounded-none object-cover" muted autoplay loop playsinline disable-picture-in-picture="true " 
        disablePictureInPicture src="../assets/canalplus.mp4"></video>
      </div>
 
      <div class="container mx-auto relative pt-20 pb-14"> 
 
          <svg class="w-8 h-8 absolute right-1 shining-star" width="20" height="20" viewBox="0 0 165 165" fill="none" xmlns="http://www.w3.org/2000/svg">
             <path d="M82.3333 0L56.6042 56.6042L0 82.3333L56.6042 108.062L82.3333 164.667L108.062 108.062L164.667 82.3333L108.062 56.6042" fill="black"/>
          </svg> 
          <svg class="w-4 h-4 absolute right-20 shining-star" width="20" height="20" viewBox="0 0 165 165" fill="none" xmlns="http://www.w3.org/2000/svg">
             <path d="M82.3333 0L56.6042 56.6042L0 82.3333L56.6042 108.062L82.3333 164.667L108.062 108.062L164.667 82.3333L108.062 56.6042" fill="black"/>
          </svg> 
          <svg class="w-4 h-4 absolute -left-6 shining-star" width="20" height="20" viewBox="0 0 165 165" fill="none" xmlns="http://www.w3.org/2000/svg">
             <path d="M82.3333 0L56.6042 56.6042L0 82.3333L56.6042 108.062L82.3333 164.667L108.062 108.062L164.667 82.3333L108.062 56.6042" fill="black"/>
          </svg> 
          
          <h1 class="font-['Acid_Grotesk'] text-gray-300 lg:text-8xl font-bold">Nos dernières <span class="font-['Acid_Grotesk'] text-black">pépites</span></h1>

      </div>

      <div class="container mx-auto " v-if="true">
        <div class="h-[350px] mb-10 cursor-pointer border" @click="router.push('/wave-summer-xeweul')">
          <img class="w-full h-full object-cover" src="/wave-summer-xeweul/bg.jpg" alt="">
        </div>
        <div class="uppercase font-bold text-4xl">Wave sénégal in the game</div>
        <div class="uppercase text-gray-400">summer xeweul - édition 2024</div>
        <div class="uppercase text-gray-500">jeu vidéo, UX/UI, Développement</div>
      </div>
       
      <Grid></Grid>

      <div class="mx-auto container border-t border-black pt-10">
        
        <div>
  
          <div class="container mx-auto text-left leading-[7vw] text-[8vw] font-bold font-['Acid_Grotesk'] mb-10">
              <h1 class="">Services</h1>
              <h1 class="">à la carte</h1>  
          </div>
     
          <div class="grid lg:grid-cols-3 gap-20 mt-20 mb-20">
  
            <div v-for="service in services" class="mt-4 mb-10"> 
      
              <div class="text-2xl mb-4 font-['Acid_Grotesk'] font-bold">{{service.fields.title}}</div>
              <div class="leading-tight" v-html="documentToHtmlString(service.fields.description)"></div>

              <div class="w-1/2">
                <button class="text-xs mr-3 opacity-40" v-for="item in service.fields.list">#{{item}}</button>
              </div>
       
            </div>
  
          </div>
  
        </div>

        <div>
  
          <div class="container mx-auto text-right leading-[7vw] text-[8vw] font-bold font-['Acid_Grotesk'] mb-10">
              <h1 class="">Nos produits</h1> 
          </div>
     
          <div class="grid lg:grid-cols-2 gap-20 mt-20 mb-20">
  
            <div class="mt-4 mb-10"> 
      
              <div class="text-2xl mb-4 font-['Acid_Grotesk'] font-bold">dAIrector</div>
              <div class="leading-tight"><span class="font-medium">Craft your cinematic masterpiece !</span><br>Create, preview, mix with powerful AI models in one place !<br>Flux, Imagen 3, Ideogram, Photon and more to come...</div>

              <div class="w-1/2">
                <button class="text-xs mr-3 opacity-40"></button>
              </div>
       
            </div>
  
          </div>
  
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