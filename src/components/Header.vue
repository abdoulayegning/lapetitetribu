<template>
    <div class="wrapper">  
        <video class="video" muted autoplay loop src="../assets/interactive.mp4"></video>
        <div class="content"> 
            <div class="text">créateurs</div>  
            <div class="text">d’expériences</div> 
            <div class="text">digitales</div> 
        </div> 
    </div>
</template>

<style scoped> 
.wrapper {
    text-transform: uppercase;
    width: 100%;
    height: 100vh;
    background-color: rgb(26, 26, 26);
}
.text {
    color: white;
    mix-blend-mode: difference;
}
.content div {
    border: 0px solid red;
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
    width: 35vw;
    clip-path: inset(0% 0% 0% 0% round 39px);
}
.arrow-section {
    display: flex;
} 
</style>

<script setup>
import { onMounted, ref } from 'vue';
const video_section = ref(null)
const bounding_box = ref(null)
const looping_video = ref(null)
onMounted(()=>{
    //video_section.value.style.display = 'flex' 
    //looping_video.value.setAttribute('height', bounding_box.value.getBoundingClientRect().height)
})
</script>