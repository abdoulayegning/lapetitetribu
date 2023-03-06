<script setup>
import { onMounted, ref } from 'vue'
import Splitting from "splitting"; 
import gsap from 'gsap'

const art = ref(null)
const tech = ref(null)
const video = ref(null)
const arrow = ref(null)

onMounted(()=>{

  const splitted_art_text = Splitting({ target: art.value, by: 'chars' });
  const splitted_tech_text = Splitting({ target: tech.value, by: 'chars' });

  console.log(splitted_art_text)

  let tl = gsap.timeline({
    delay: 1
  })
  tl.fromTo(video.value, {scale: 0}, {scale: 1, duration: 1.5, ease: 'power4'})
  tl.fromTo(art.value, {x: -100, opacity: 0}, {x: 0, opacity: 1, duration: 1.5, ease: 'power4'}, 0.05)
  tl.fromTo(tech.value, {x: 100, opacity: 0}, {x: 0,  opacity: 1, duration: 1.5, ease: 'power4'}, 0.05)

  arrow_animation(arrow)

})

function arrow_animation(arrow){
  let tl = gsap.timeline({repeat: -1})
  tl.to(arrow.value, {scale: 0.75, rotate: 360, duration: 1, ease: 'power4', transformOrigin: 'center'})
  tl.to(arrow.value, {y: 50, duration: 1, transformOrigin: 'center'})
  tl.to(arrow.value, {y: -50, duration: 1, transformOrigin: 'center'})
  tl.to(arrow.value, {y: 0, duration: 1, transformOrigin: 'center'})
  tl.to(arrow.value, {scale: 1, duration: 1, ease: 'power4', transformOrigin: 'center'})
}

</script>

<template> 

   <div id="close-intro">
     <svg x="0px" y="0px"
     viewBox="0 0 2048 2048" style="enable-background:new 0 0 2048 2048;" xml:space="preserve">
       <g id="circle">
         <circle cx="1024" cy="1024" r="988.4"/>
       </g>
       <g ref="arrow" id="arrow">
         <path class="st0" d="M980,273.6V1595l-296.2-296.2l-66.1,66.1l409.4,409.4l409.4-409.4l-66.1-66.1L1074.1,1595V273.6H980z"/>
       </g>
     </svg>
   </div>

 <div class="main"> 
  
  <div class="plus">&</div>
 
  <div class="content">
    
    <div> 
     <h1 ref="art">art</h1>
    </div>
    <div>
      <video ref="video" muted autoplay loop src="../assets/interactive.mp4"></video>
    </div>
    <div> 
      <h1 ref="tech">tech</h1> 
    </div>
  
  </div>

 </div> 
</template>

<style scoped>

.st0{
  fill:#FFFFFF;
}

* {
  border: 0px solid black;
}

#close-intro {
  position: absolute;
  min-width: 3rem;
  width: 4vw; 
  bottom: 2vw;
  left: 50%;
  transform: translateX(-50%);
}

#close-intro svg {
  width: 100%; 
}

#arrow {
  position: relative;
}

.plus {
  position: absolute;
  font-size: clamp(6rem, 6.5vw, 7vw);
  z-index: 1000;
  font-weight: 100;
  color: white;
  mix-blend-mode: difference;
}
.main {
  display: flex;
  position: relative;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
}

.content { 
  position: relative;
}

.content div:nth-child(1), .content div:nth-child(3) {
  z-index: 100;
  color: black; 
}

.content div:nth-child(1) {  
  position: absolute;
  top: 0;
  left: 0;
}

.content div:nth-child(2) {
  width: 100%; 
  position: relative;
}
.content div:nth-child(3)
{  
  position: absolute;
  bottom: 0;
  right: 0;
   
}

.content div:nth-child(1) h1 { 
  /*font-family: Benton Italic Bold*/
}

h1 {
  font-size: clamp(6rem, 6.5vw, 7vw);
  margin: 0;
  line-height: 0;
  mix-blend-mode: color-burn;
  font-weight: 100;
}

video {
  width: clamp(18rem, 22vw, 24vw);
  display: block;
  margin: 0 auto;
}

</style>
