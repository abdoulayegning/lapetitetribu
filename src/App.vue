<script setup>  
import Lenis from '@studio-freight/lenis'
import { onMounted, ref } from 'vue'
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import TopBar from './components/TopBar.vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()

// const contactBtn = ref(null)

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
    // contactBtn.value.addEventListener("click", ()=>{
    //   window.open('mailto:abdoulaye@lapetitetribu.co');
    // })
 

    // const redDot = contactBtn.value.children[0]
    // gsap.fromTo(redDot, {opacity: 0}, {opacity: 1, repeat: -1})
    // gsap.fromTo(contactBtn.value, {y: 0}, {y: 10, repeat: -1, yoyo: true, ease: 'power4.inOut'})
})

</script>

<template>
  <router-view></router-view> 
</template>

<style scoped> 
</style>
