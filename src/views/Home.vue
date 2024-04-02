<script setup>
import { onBeforeMount, onMounted, ref } from 'vue';
import gsap from 'gsap';
import Hero from '../components/Hero.vue';
import Grid from '../components/Work/Grid.vue' 
import Footer from '../components/Footer.vue';
import Services from '../components/Services.vue';
import TopBar from '../components/TopBar.vue'
let idx = 0
const marquee1 = ref(null)
const marquee2 = ref(null)
const marqueeCount = ref([0,1,2,3,4,5,0,1,2,3,4,5])
const wordingList = ['ambitieuses', 'audacieuses', 'innovantes']

onMounted(()=>{
    let wordings = document.querySelectorAll('.wording')

    for (let i = 0; i < wordings.length; i++) {
        const element = wordings[i];
        gsap.set(element, {display: 'none', opacity: 0})
    }
    gsap.set(wordings[0], {display: 'block', opacity: 0})

    let tl = gsap.timeline({repeat: -1, defaults: {ease: 'none', duration: 0}})

    const delay = 0.45

    tl.fromTo(wordings[0], {opacity: 0, display: 'block'}, {opacity: 1})
    tl.to(wordings[0], {opacity: 0, delay: delay})

    tl.fromTo(wordings[1], {opacity: 0, display: 'block'}, {opacity: 1})
    tl.to(wordings[1], {opacity: 0, delay: delay})

    tl.fromTo(wordings[2], {opacity: 0, display: 'block'}, {opacity: 1})
    tl.to(wordings[2], {opacity: 0, delay: delay})
 
     
    // gsap.set(marqueeElement.children[1], {translateX: '50%'})
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

  <div id="content_homepage"> 

      <TopBar></TopBar>

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

      <div class="container mx-auto">
          <div class="lg:text-8xl text-5xl font-black uppercase mt-32" style="border-bottom: 0px solid black;"> 
              <h1 class="font-['PP_Neue_Machina_Plain'] text-gray-300">nos derniers</h1>
              <h1 class="font-['PP_Neue_Machina_Plain']">projets</h1>  
          </div>
      </div>

      <Grid :length="2"></Grid>

      <div class="container mx-auto">
          <div class="lg:text-8xl text-5xl font-black uppercase mb-32" style="border-bottom: 0px solid black;"> 
              <h1 class="font-['PP_Neue_Machina_Plain'] text-gray-300">nos services</h1>
              <h1 class="font-['PP_Neue_Machina_Plain']">à la carte</h1>  
          </div>
      </div>

      <div class="container mx-auto">
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