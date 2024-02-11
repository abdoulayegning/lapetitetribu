<script setup>
import { onBeforeMount, onMounted, ref } from 'vue';
import gsap from 'gsap';
import Hero from '../components/Hero.vue';
import Grid from '../components/Work/Grid.vue' 
import Footer from '../components/Footer.vue';
import Services from '../components/Services.vue';
let idx = 0
const wordingList = ['ambitieuses', 'audacieuses', 'innovantes']
 onMounted(()=>{
    let wordings = document.querySelectorAll('.wording')
    for (let i = 0; i < wordings.length; i++) {
        const element = wordings[i];
        gsap.set(element, {display: 'none', opacity: 0})
    }
    gsap.set(wordings[0], {display: 'block', opacity: 0})

    let tl = gsap.timeline({repeat: -1, defaults: {ease: 'power4.inOut', duration: 1.15}})

    tl.fromTo(wordings[0], {y: 100, opacity: 0, display: 'block'}, {y: 0, opacity: 1})
    tl.to(wordings[0], {opacity: 0, delay: 1.5})

    tl.fromTo(wordings[1], {y: 100, opacity: 0, display: 'block'}, {y: 0, opacity: 1})
    tl.to(wordings[1], {opacity: 0, delay: 1.5})

    tl.fromTo(wordings[2], {y: 100, opacity: 0, display: 'block'}, {y: 0, opacity: 1})
    tl.to(wordings[2], {opacity: 0, delay: 1.5})
})
</script>

<template>  
<div id="content_homepage">
    
    <Hero></Hero>

    <div class="container mx-auto">
        <div class="lg:text-8xl text-5xl uppercase mt-72 mb-72" style="border-bottom: 0px solid black;"> 
            <h1 class="font-['PP_Neue_Machina_Plain'] text-right text-gray-300"><span class="text-black">le studio </span>créatif</h1>
            <h1 class="font-['PP_Neue_Machina_Plain'] text-gray-300">pour des <span>marques</span></h1>
            <div>
                <h1 class="font-['PP_Neue_Machina_Plain'] absolute text-center wording">ambitieuses</h1>  
                <h1 class="font-['PP_Neue_Machina_Plain'] absolute text-center wording">audacieuses</h1>  
                <h1 class="font-['PP_Neue_Machina_Plain'] absolute text-center wording">innovantes</h1>  
            </div>  
        </div>
    </div>

    <div class="container mx-auto">
        <div class="lg:text-8xl text-5xl uppercase mt-32" style="border-bottom: 0px solid black;"> 
            <h1 class="font-['PP_Neue_Machina_Plain']">nos derniers</h1>
            <h1 class="font-['PP_Neue_Machina_Plain']">projets</h1>  
        </div>
    </div>

    <Grid :length="2"></Grid>

    <!-- <Services></Services> -->

    <Footer></Footer> 

</div>
</template>