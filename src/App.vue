<script setup>  
import Lenis from '@studio-freight/lenis'
import {onMounted} from 'vue'
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import Header from './components/Header.vue';

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
  <Header></Header>  
  <router-view></router-view> 
</template>

<style scoped> 
</style>
