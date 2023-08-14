<script setup>
import { onMounted, ref } from 'vue';
import Splitting from "splitting";
import { gsap } from 'gsap';

const stones_video = ref(null)
const stones_images = ref(null)
const text = ref(null)

defineExpose({
    stones_video,
    stones_images
})

onMounted(()=>{
    // console.clear()
    // let textSplitted = Splitting({target: text.value, by: 'lines'}) 
    
    // let tl = gsap.timeline({delay: 0.45})

    // // const e = textSplitted[0].lines[0];

    // for (let i = 0; i < textSplitted[0].lines[i].length; i++) {
    //     const element = textSplitted[0].lines[i];
    //     for (let j = 0; j < element[j].length; j++) {
    //         const line = element[j];
    //         tl.fromTo(line, {y: 100}, {y: 0, ease: 'Expo.easeOut'}, 'base')
    //     }
    // }

    // for (let i = 0; i < textSplitted[0].lines.length; i++) {
        
         
    //     for (let j = 0; j < e[j].length; j++) {
    //         const element = e[j]; 
    //         gsap.to(element, {y: 100})
    //     }
    // }
})
</script>

<template>

    <div ref="stones_video" class="w-full h-[100vh] relative"> 
        <video loop muted autoplay class="w-full h-full object-cover absolute top-0 left-0 -z-10" src="../assets/video-test-1.mp4"></video>
        <!-- <img class="w-full h-full object-cover absolute top-0 left-0 -z-10" src="../assets/carrefour.png" alt="">   -->
    </div>

    <div class="container mx-auto">
        <div class="w-full lg:pt-36 pt-8 lg:pb-36 pb-8 relative"> 
            <div class="flex flex-col"> 
                <div class="w-full font-['DM_Sans'] relative text-base font-light mt-16  p-12 rounded-3xl">   
                    <div class="flex lg:flex-row flex-col gap-4">

                        <div class="text-left lg:text-6xl text-2xl lg:w-1/2 w-full flex items-center" ref="text">
                            <div>
                                Une expertise multidisciplinaire pour créer des expériences <span class="font-['Benton_Italic_Regular']">uniques</span>, <span class="font-['FK_Grotesk_Mono']">interactives</span> & <span class="font-['PP_Neue_Machina_Plain']">engageantes</span>.
                            </div>
                        </div>

                        <div ref="stones_images" class="hidden lg:block lg:w-1/2 w-full flex relative"> 
                            <img class="absolute bottom-0 left-0 lg:w-1/2 w-1" src="../assets/orange.png" alt="">
                            <img class="absolute top-0 right-0 lg:w-1/2  translate-y-0" src="../assets/pink.png" alt="">
                            <img class="absolute top-0 left-1/2 lg:w-1/2 -translate-x-1/2 translate-y-1/4" src="../assets/purple.png" alt="">
                        </div>
                        
                    </div>

                        <!-- bg-[#E2DADA] -->
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