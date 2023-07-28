<template>
    <div class="bg-[#1c1c1c] pt-40 pb-40">
        <div class="container mx-auto"> 
            <div class="grid grid-cols-2" ref="container">
                <div class="font-['DM_Sans'] cursor-pointer" v-for="i,j in [0,1,2,3,4,6]"> 
                    <div class="relative h-full"> 
                         <img class="mx-auto opacity-100 w-[75%] h-[75vh] object-cover" :src="'https://picsum.photos/id/' + j + '/2000/2000'"> 
                        <div class="text-white text-center mt-10 mb-10">
                            <!-- <h1 class="text-2xl">Orange Sénégal</h1> -->
                            <h1 class="text-2xl">Demain nous appartient</h1>
                            <h2 class="text-sm uppercase font-bold mt-2 text-white mix-blend-difference font-['PP_Neue_Machina_Plain']">Réalité Augmentée</h2> 
                        </div> 
                    </div> 
                </div>  
            </div>
        </div>
    </div>
    <!-- text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -->
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
            duration: 1.5,
            ease: 'Expo.easeOut',
            scrollTrigger: {
                trigger: e, 
            }
        })

        if(i%2===0){
            e.style.marginTop = 6 + 'rem'
        }
    }
})
</script>