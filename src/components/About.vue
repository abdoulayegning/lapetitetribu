<script setup>
import { onMounted, ref } from 'vue';
import Splitting from "splitting";
import { gsap } from 'gsap';

const stones_video = ref(null)
const stones_images = ref(null)
const text = ref(null)
const roller = ref(null)

defineExpose({
    stones_video,
    stones_images,
    roller
})

onMounted(()=>{
    for (let i = 0; i < roller.value.children.length; i++) {
        const element = roller.value.children[i]; 
        gsap.set(element, {x: i * element.getBoundingClientRect().width})
    } 

    gsap.ticker.add(()=>{ 
    })
})
</script>

<template>

    <div class="w-full h-[100vh] relative">  
        <div ref="roller">
            <div v-for="i in [0,1,2,3,4,6,7,8,9,10]" class="absolute whitespace-nowrap font-['DM_Sans'] text-white 
            uppercase text-8xl mix-blend-difference top-1/2 -translate-y-1/2 pr-6 pl-6">
                hors de <u>l'ordinaire</u>
            </div>
        </div> 
        <video ref="stones_video" loop muted autoplay class="w-full h-full object-cover absolute top-0 left-0 -z-10 " 
        src="../assets/value.mp4"></video>
     </div>

    <div class="container mx-auto">
        <div class="w-full lg:pt-36 pt-8 lg:pb-36 pb-8 relative"> 
            <div class="flex flex-col"> 
                <div class="w-full font-['DM_Sans'] relative text-base font-light mt-16  p-12 rounded-3xl">   
                    <div class="flex lg:flex-row flex-col gap-4">

                        <div class="text-left lg:text-6xl text-2xl lg:w-1/2 w-full flex items-center" ref="text">
                            <div>
                                Une expertise multidisciplinaire pour créer des expériences <span class="">uniques</span>, <span class="">interactives</span> & <span class="">engageantes</span>.
                            </div>
                        </div>

                        <div ref="stones_images" class="lg:block lg:w-1/2 w-full flex relative"> 
                            <img class="absolute bottom-0 left-0 lg:w-1/2 w-1" src="../assets/orange.png" alt="">
                            <img class="absolute top-0 right-0 lg:w-1/2  translate-y-0" src="../assets/pink.png" alt="">
                            <img class="absolute top-0 left-1/2 lg:w-1/2 -translate-x-1/2 translate-y-1/4" src="../assets/purple.png" alt="">
                        </div>
                        
                    </div>
 
                </div>

             </div>
        </div>
    </div>
    
</template>

<style scoped>
.wrapper {
    width: 100%;
    height: 100vh;
}
.text {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: end;
    align-items: center;

} 
/* .st0{fill:#161616;}
.st1{fill:#FF8D7D;}
.st2{fill:#FFFFFF;}
.st3{fill:#FF7BC0;} */
</style>