<script setup>
import { onBeforeMount, onMounted, ref } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
gsap.registerPlugin(ScrollTrigger)

import List from '../components/Projects/List.vue';
import Clients from '../components/Clients.vue';
import Header from '../components/Header.vue'
import About from '../components/About.vue';
import Services from '../components/Services.vue';
const about = ref(null)

onMounted(()=>{
    console.log(about.value.stones)
    gsap.fromTo(about.value.stones, {width: '20%'}, {width: '100%', ease: 'Expo.easeOut', scrollTrigger: {
        trigger: about.value.stones,
        scrub: true
    }})
})
</script>

<template>  
    <div>  
        <Header></Header>
        <About ref="about"></About>
        <Services></Services>
        <Clients></Clients>
        <List :length="3"></List>
    </div>  
</template>