<template>
    <div class="container mx-auto" ref="container"> 
        <div class="flex mt-40 mb-40 even:justify-end font-['DM_Sans'] cursor-pointer" v-for="i,j in [0,1,2,3,4,6]"> 
            <div class="w-3/4 h-full border-red-600 relative bg-black"> 
                <img class="opacity-50 w-full h-[50vh] object-cover" src="https://picsum.photos/2000/2000" alt=""> 
                <div class="text-white text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <h1 class="text-5xl">hello</h1>
                    <h2 class="font-['Benton_Italic_Regular']">hello</h2> 
                    <!-- <h2 class="font-['PP_Neue_Machina_Plain']">hello</h2>  -->
                </div>
            </div> 
        </div>  
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { gsap, ScrollTrigger } from 'gsap/all' 
gsap.registerPlugin(ScrollTrigger)

const container = ref(null)
onMounted(()=>{
    for (let i = 0; i < container.value.children.length; i++) {
        const e = container.value.children[i]; 
        gsap.set(e, {scaleY: 1.25, y: 100})
        gsap.to(e, {
            scaleY: 1, 
            y: 0,
            // delay: 0.45,
            duration: 0.85,
            ease: 'Expo.easeOut',
            scrollTrigger: {
                trigger: e, 
            }
        })
    }
})
</script>