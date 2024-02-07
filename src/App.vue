<script setup>  
import Lenis from '@studio-freight/lenis'
import { onMounted, ref } from 'vue'
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import Header from './components/Header.vue';

const contactBtn = ref(null)

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
    const redDot = contactBtn.value.children[0]
    gsap.fromTo(redDot, {opacity: 0}, {opacity: 1, repeat: -1})
    gsap.fromTo(contactBtn.value, {y: 0}, {y: 10, repeat: -1, yoyo: true, ease: 'power4.inOut'})
})

</script>

<template>
  
  <div ref="contactBtn" 
  class="fixed z-[150] bottom-7 left-1/2 -translate-x-1/2 bg-red-600 text-white hover:bg-white hover:text-black hover:border hover:border-black
  rounded-full pr-6 pl-6 pt-3 pb-3 uppercase text-xs flex gap-2 justify-center items-center cursor-pointer">
    <div class="w-2 h-2 bg-black rounded-full"></div>
    <div class="leading-none">Vous avez un projet ?</div>
  </div>

  <Header></Header>  
  <router-view></router-view> 
</template>

<style scoped> 
</style>
