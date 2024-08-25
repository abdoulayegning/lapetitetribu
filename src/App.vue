<script setup>  
import Lenis from '@studio-freight/lenis'
import { onMounted, ref } from 'vue'
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import TopBar from './components/TopBar.vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()

const contactBtn = ref(null)

const topbar = ref(null)

gsap.registerPlugin(ScrollTrigger)

onMounted(()=>{
    const lenis = new Lenis()
    
    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time)=>{
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    //Contact button
    contactBtn.value.addEventListener("click", ()=>{
      window.open('mailto:abdoulaye@lapetitetribu.co');
    })

    // topbar.value.scrollToWork.addEventListener('click', ()=>{
    //   const work = document.getElementById('work')
    //   if(work){
    //     lenis.scrollTo(work, {duration: 4})
    //   } else {
    //     router.push('/')
    //   }
    // })
    
    // router.beforeEach((to, from)=>{
    //   console.log(from.name)
    //   if(from.name == 'Project'){
    //     const work = document.getElementById('work')
    //     lenis.scrollTo(work, {duration: 4})
    //   }  
    // })

    const redDot = contactBtn.value.children[0]
    gsap.fromTo(redDot, {opacity: 0}, {opacity: 1, repeat: -1})
    gsap.fromTo(contactBtn.value, {y: 0}, {y: 10, repeat: -1, yoyo: true, ease: 'power4.inOut'})
})

</script>

<template>
  
  <div ref="contactBtn" 
  class="fixed z-[150] bottom-7 left-1/2 -translate-x-1/2 bg-red-600 text-white  hover:border hover:border-black
  rounded-none pr-6 pl-6 pt-3 pb-3 uppercase text-xs hidden gap-2 justify-center items-center cursor-pointer">
    <div class="w-2 h-2 bg-black rounded-full"></div>
    <h1 class="leading-none">Vous avez un projet ?</h1>
  </div>

  <!--div class="text-[#08ff08] cursor-pointer uppercase rounded-full bottom-5 left-5 -rotate-2 text-xs bg-black pl-6 pr-6 pt-2 pb-2 fixed z-10 flex gap-2 items-center justify-center">
    <span class="material-symbols-outlined text-xs">arrow_right_alt</span>
    <div>nos savoir-faire</div>
    <span class="material-symbols-outlined text-xs">arrow_left_alt</span>
  </div-->

  <TopBar ref="topbar"></TopBar>  
  <router-view></router-view> 
</template>

<style scoped> 
</style>
