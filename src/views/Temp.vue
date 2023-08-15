<script setup>
import { onBeforeMount, onMounted, ref } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
gsap.registerPlugin(ScrollTrigger)

import Menu from '../components/Menu.vue';
import Clients from '../components/Clients.vue';
import Header from '../components/Header.vue'
import About from '../components/About.vue';
import Services from '../components/Services.vue';
import Footer from '../components/Footer.vue'
import Work from '../components/Work.vue';
const about = ref(null)

const scrollTriggerAnimations = ()=>{
    const stones_video = about.value.stones_video  
    const stones_images = about.value.stones_images  

    let transforms = [
        {angle: 50, y: '-=100'},
        {angle: -20, y: '-=55'},
        {angle: 15, y: '+=40'},
    ]

    for (let i = 0; i < stones_images.children.length; i++) {
        const e = stones_images.children[i];
        gsap.to(e, {
            rotate: transforms[i].angle, 
            y: transforms[i].y,
        scrollTrigger: {
            trigger: stones_images,
            scrub: true,
        }, 
        transformOrigin:'center center'}) 
    }

    gsap.fromTo(stones_video, {scale: 0.45}, {scale: 0.85, ease: 'Expo.easeOut', scrollTrigger: {
        trigger: stones_video,
        scrub: true
    }})
}

onMounted(()=>{ 

    scrollTriggerAnimations()

})
</script>

<template>  
    <div>  
        <Menu></Menu>
        <Header></Header>
        <About ref="about"></About>
        <Work></Work>
        <Services></Services>
        <Clients></Clients> 
        <Footer></Footer>
    </div>  
</template>