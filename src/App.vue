<script setup> 
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import Lenis from '@studio-freight/lenis'
import {onMounted} from 'vue'
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
gsap.registerPlugin(ScrollTrigger)

onMounted(()=>{
    const lenis = new Lenis()
    
    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time)=>{
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)
})

</script>

<template>  
  <router-view></router-view> 
</template>

<style scoped> 
</style>
