<template>
    <div class="wrapper">  
        <video ref="video" class="video" muted autoplay loop src="../assets/interactive.mp4"></video>
        <div class="content"> 
            <div ref="firstLine" v-html="Splitting.html({content: 'créateurs', by: 'chars'})" class="text"></div>  
            <div ref="secondtLine" v-html="Splitting.html({content: 'd’expériences', by: 'chars'})" class="text"></div> 
            <div ref="thirdLine" v-html="Splitting.html({content: 'digitales', by: 'chars'})" class="text"></div> 
        </div> 
    </div>
</template>

<style scoped> 
.wrapper {
    text-transform: uppercase;
    width: 100%;
    height: 100vh;
    background-color: rgb(26, 26, 26);
    position: relative;
}
.text {
    color: white;
    mix-blend-mode: difference;
}
.content div {
    border: 0px solid red;
    clip-path: inset(-2vw 0);
}
.content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 8vw;
    line-height: 8vw;
}
.video {
    position: absolute;
    top: 50%;
    left: 50%; 
    transform: translateX(-50%) translateY(-50%);
    z-index: 0;
    width: 40vw;
    clip-path: inset(0% 0% 0% 0% round 39px);
}
.arrow-section {
    display: flex;
} 
</style>

<script setup>
import Splitting from 'splitting'
import { onMounted, ref } from 'vue';
import { gsap } from 'gsap';
const video_section = ref(null)
const bounding_box = ref(null)
const video = ref(null)
onMounted(()=>{
    //video_section.value.style.display = 'flex' 
    //looping_video.value.setAttribute('height', bounding_box.value.getBoundingClientRect().height)
    const tl = gsap.timeline({delay: 1.5})
    const chars = document.querySelectorAll('.char')
    tl.fromTo(video.value, {scale: 1.25}, {scale: 1, ease: 'Expo.easeOut', duration: 0.85})
    for (let i = 0; i < chars.length; i++) {
        const c = chars[i];
        tl.fromTo(c, {y: 0.15 * window.innerWidth}, {y: 0, ease: 'Expo.easeOut', duration: 2}, i/10)
    }
})
</script>