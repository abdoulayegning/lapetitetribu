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
    /*for (let i = 0; i < roller.value.children.length; i++) {
        const element = roller.value.children[i]; 
        gsap.set(element, {x: i * element.getBoundingClientRect().width})
    } */ 
})
</script>

<template>

    <div class="container mx-auto">
        <div style="clip-path: inset(0 0);" class="w-full h-[100vh] relative border mt-16">    
            <video ref="stones_video" loop muted autoplay class="w-full h-full object-cover absolute top-0 left-0 -z-10 " 
            src="../assets/value.mp4"></video>
         </div>
    </div>


    <div class="container mx-auto">
        <div class="w-full lg:pt-36 pt-8 lg:pb-36 pb-8 relative"> 
            <div class="flex flex-col"> 
                <div class="w-full font-['DM_Sans'] relative text-base font-light mt-16  p-12 rounded-3xl">   

                        <div class="text-left leading-loose lg:text-6xl text-6xl lg:w-4/5 w-full flex items-center font-regular font-['Inter']" ref="text">
                            <div>
                                Une expertise multidisciplinaire pour créer des expériences <span class="">uniques</span>, <span class="">interactives</span> & <span class="">engageantes</span>.
                            </div>
                        </div>

                        <div class="text-right leading-loose lg:text-base text-xl font-regular font-['Inter'] mt-20 font-medium uppercase">
                                the process
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