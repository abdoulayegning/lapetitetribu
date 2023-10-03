<template>
    <div class="container mx-auto">   
        <div class="uppercase lg:text-8xl mt-20"> 
            <div style="clip-path: inset(-10vh 0);" ref="firstLine" v-html="Splitting.html({content: 'créateurs', by: 'chars'})" class="text"></div>  
            <div style="clip-path: inset(-10vh 0);" ref="secondtLine" v-html="Splitting.html({content: 'd’expériences', by: 'chars'})" class="text"></div> 
            <div style="clip-path: inset(-10vh 0);" ref="thirdLine" v-html="Splitting.html({content: 'digitales', by: 'chars'})" class="text"></div> 
        </div>    
    </div>

    <!--div ref="caroussel">
        <div v-for="i in [0,1,2,3,4,5,6,7,8,9,10]" 
        class="w-1/4 h-[60vh] bg-black absolute mt-16"></div>
    </div-->

</template>

<style scoped>  
</style>

<script setup>
import Splitting from 'splitting'
import { onMounted, ref } from 'vue';
import { gsap } from 'gsap';
const video_section = ref(null)
const bounding_box = ref(null)
const video = ref(null)
const caroussel = ref(null)
onMounted(()=>{
    //video_section.value.style.display = 'flex' 
    //looping_video.value.setAttribute('height', bounding_box.value.getBoundingClientRect().height)
    const tl = gsap.timeline({delay: 0})
    const chars = document.querySelectorAll('.char')
    //tl.fromTo(video.value, {scale: 1, ease: 'Expo.easeOut', duration: 0.85})
    for (let i = 0; i < chars.length; i++) {
        const c = chars[i];
        tl.fromTo(c, {y: 0.15 * window.innerWidth}, {y: 0, ease: 'Expo.easeOut', duration: 0.95}, i/20)
    }
 
})
</script>