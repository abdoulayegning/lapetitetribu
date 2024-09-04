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
    animateMarquee(marquee1.value)
    animateReverseMarquee(marquee2.value)
})

const animateMarquee = (marquee)=>{
  const marqueeDuration = 25
    gsap.fromTo(marquee.children[0], {translateX: '-100%'}, {ease: 'linear', translateX: '100%', repeat: -1, duration: marqueeDuration})
    gsap.fromTo(marquee.children[1], {translateX: '-100%'}, {ease: 'linear', translateX: '100%', repeat: -1, delay: marqueeDuration/2, duration: marqueeDuration})
}

const animateReverseMarquee = (marquee)=>{
  const marqueeDuration = 25
    gsap.fromTo(marquee.children[0], {translateX: '100%'}, {ease: 'linear', translateX: '-100%', repeat: -1, duration: marqueeDuration})
    gsap.fromTo(marquee.children[1], {translateX: '100%'}, {ease: 'linear', translateX: '-100%', repeat: -1, delay: marqueeDuration/2, duration: marqueeDuration})
}

</script>


<template> 

  <div id="main-content" class=""> 

      <!-- <BriefCTA></BriefCTA> -->

      <DeckCTA></DeckCTA>

      <Hero></Hero> 

      <div class="relative h-52 hidden">
        <div class="marquee-container bg-[#FF7283] -rotate-1" ref="marquee1">
          
          <div class="marquee-items-primary">
              <div class="marquee-item" v-for="i,index in marqueeCount">
                <div v-if="index%2 == 0">
                  nos services
                </div> 
    
                <div v-else>
                  +
                </div>
              </div>
          </div> 
          
          <div class="marquee-items-secondary"> 
            <div class="marquee-item" v-for="i,index in marqueeCount">
                <div v-if="index%2 == 0">
                  nos services
                </div> 
    
                <div v-else>
                  +
                </div>
              </div>
          </div>
    
        </div>
    
        <div class="marquee-container bg-[#FFD872] rotate-3" ref="marquee2">
          
          <div class="marquee-items-primary">
            <div class="marquee-item" v-for="i,index in marqueeCount">
    
              <div v-if="index%2 == 0">
                nos services
              </div> 
    
              <div v-else>
                +
              </div>
    
            </div> 
          </div> 
    
          <div class="marquee-items-secondary"> 
            <div class="marquee-item" v-for="i,index in marqueeCount">
              
              <div v-if="index%2 == 0">
                nos services
              </div> 
    
              <div v-else>
                +
              </div>
    
            </div>
          </div>
    
    
        </div>
      </div>

      <Clients></Clients> 

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
          
          <h1 class="font-['PP_Neue_Machina_Plain'] text-gray-300 lg:text-8xl font-bold uppercase">nos derniers <span class="font-['PP_Neue_Machina_Plain'] text-black">pépites</span></h1>

      </div>

      <div class="container mx-auto " v-if="false">
        <div class="h-[350px] mb-10 cursor-pointer border" @click="router.push('/wave-summer-xeweul')">
          <img class="w-full h-full object-cover" src="/wave-summer-xeweul/bg.jpg" alt="">
        </div>
        <div class="uppercase font-bold text-4xl">Wave in the game</div>
        <div class="uppercase text-gray-400">summer xeweul - édition 2024</div>
        <div class="uppercase text-gray-500">jeu vidéo, UX/UI, Développement</div>
      </div>
       
      <Grid></Grid>

      <div class="container mx-auto text-center">
          <div class="lg:text-8xl text-5xl font-black uppercase mb-32" style="border-bottom: 0px solid black;"> 
              <h1 class="font-['PP_Neue_Machina_Plain'] text-gray-300">nos services</h1>
              <h1 class="font-['PP_Neue_Machina_Plain']">à la carte</h1>  
          </div>
      </div>

      <div v-if="false" class="container mx-auto">
        <div class="flex flex-col lg:flex-row gap-5 text-center lg:text-left uppercase">
          <div class="lg:w-1/3 lg:pr-5 lg:pl-5">
            <h1 class="text-2xl font-bold mb-3">développement <br>web / ux & UI</h1>
            <ul class="">
              <li>LaNding page</li>
              <li>SITE VITRINE</li>
              <li>portfolio</li>
              <li>webgl</li>
              <li>ux/ui</li>
            </ul>
          </div>
          <div class="lg:w-1/3 lg:pr-5 lg:pl-5">
            <h1 class="text-2xl font-bold mb-3">animation <br>2D & 3D</h1>
            <ul class="">
              <li>motion design</li>
              <li>video explicative</li>
              <li>sound design</li>
              <li>tutoriels</li>
              <li>habillage vidéo</li>
              <li>packshot</li>
            </ul>
          </div>
          <div class="lg:w-1/3 lg:pr-5 lg:pl-5">
            <h1 class="text-2xl font-bold mb-3">expériences immersives</h1>
            <ul class="">
              <li>filtre instagram & snapchat</li>
              <li>réalité augmenté et virtuelle</li>
              <li>jeux vidéos</li>
              <li>installation interactive</li>
              <li>design d’interaction</li>
              <li>gamification</li>
              <li>webgl</li>
            </ul>
          </div>
        </div>
      </div>

<!-- lg:h-[360px] -->
      <div v-if="true" v-for="service in services" :style="`background-color:` + service.fields.backgroundColor + `; color: ` + service.fields.textColor +`;`" class='bg-red-500 pt-16 pb-16'> 
        <div class="container mx-auto">

          <div class="flex lg:flex-row flex-col pb-10 lg:gap-0 gap-5">

            <div class="lg:w-[70%] border-red-700">
              <div class="font-['PP_Monument_Extended'] font-bold text-2xl lg:text-5xl">{{service.fields.title}}</div>
              <div class="grid lg:grid-cols-2 lg:gap-10 gap-3 mt-6">
                <div class="font-['DM_Sans'] lg:pt-4 lg:text-2xl leading-tight" v-html="documentToHtmlString(service.fields.description)"></div>
                <div class="lg:p-4 lg:text-xl text-xs uppercase text-gray-500">
                  <div v-for="item in service.fields.list">{{item}}</div>
                </div>
              </div>
            </div>

            <div class="lg:w-[30%] border-red-700"> 
              <img class="lg:w-72 w-full mx-auto" :src="service.fields.image.fields.file.url" alt="">
               <!-- <video muted autoplay loop class="w-full h-full object-cover rounded-md" src="../assets/interactive.mp4"></video> -->
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