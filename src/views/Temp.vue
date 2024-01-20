<!-- <script setup>
import { onBeforeMount, onMounted, ref } from 'vue';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
gsap.registerPlugin(ScrollTrigger)

import Menu from '../components/Menu.vue';
import Clients from '../components/Clients.vue';
import Hero from '../components/Hero.vue'
import About from '../components/About.vue';
import Services from '../components/Services.vue';
import Footer from '../components/Footer.vue'
import Work from '../components/Work.vue';

const about = ref(null)
const workTitleSection = ref(null)

const scrollTriggerAnimations = ()=>{
    const roller = about.value.roller  
    const stones_video = about.value.stones_video  
    const stones_images = about.value.stones_images  

    // let transforms = [
    //     {angle: 50, y: '-=100'},
    //     {angle: -20, y: '-=55'},
    //     {angle: 15, y: '+=40'},
    // ]

    // for (let i = 0; i < stones_images.children.length; i++) {
    //     const e = stones_images.children[i];
    //     gsap.to(e, {
    //         rotate: transforms[i].angle, 
    //         y: transforms[i].y,
    //     scrollTrigger: {
    //         trigger: stones_images,
    //         scrub: true,
    //     }, 
    //     transformOrigin:'center center'}) 
    // }

    gsap.fromTo(stones_video, {y: 0, scale: 1}, {scale: 1.35, ease: 'Expo.easeOut', scrollTrigger: {
        trigger: stones_video,
        scrub: true
    }})
/*
    for (let i = 0; i < roller.children.length; i++) {
        const element = roller.children[i];  
        gsap.to(element, {x: '-=800', ease: 'linear', scrollTrigger: {
            trigger: stones_video,
            scrub: true
        }})
    } 
 */   
}

const workTitleScrollTrigger = ()=>{
    let tl = gsap.timeline({
        scrollTrigger: {
            trigger: workTitleSection.value,
            scrub: true
        }
    })
    tl.to(workTitleSection.value.children[0], {x: window.innerWidth/4}, 'default')
    tl.to(workTitleSection.value.children[1], {x: -window.innerWidth/4}, 'default')
}

onMounted(()=>{ 

    scrollTriggerAnimations()
    workTitleScrollTrigger()

})
</script>

<template>  
    <div>  
        <Menu></Menu>
        <Hero></Hero>
        <About ref="about"></About>
        <div class="container mx-auto pb-10 pt-10" ref="workTitleSection">
            <div class="font-['DM_Sans'] uppercase text-9xl">
                <span>c</span> 
                <span>o</span> 
                <span>o</span> 
                <span>l</span> 
                <span>e</span> 
                <span>s</span> 
                <span>t</span> 
            </div>
            <div class="font-['DM_Sans'] uppercase text-9xl text-right mb-40">
                <span style="letter-spacing: -20px; margin-right: 0.35em;">----</span>
                <span>p</span> 
                <span>r</span> 
                <span>o</span> 
                <span>j</span> 
                <span>e</span> 
                <span>c</span> 
                <span>t</span> 
                <span>s</span> 
            </div>
        </div>
        <Work></Work>
        <Services></Services>
        <Clients></Clients> 
        <Footer></Footer>
    </div>  
</template> -->