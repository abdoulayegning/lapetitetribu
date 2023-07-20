<script setup>
import { onMounted, ref } from 'vue';
import Splitting from "splitting";
import { gsap } from 'gsap';

const stones = ref(null)
const text = ref(null)

defineExpose({
    stones
})

onMounted(()=>{
    console.clear()
    let textSplitted = Splitting({target: text.value, by: 'lines'})
    console.log(textSplitted[0].lines)
    let tl = gsap.timeline({delay: 0.45})

    // const e = textSplitted[0].lines[0];

    for (let i = 0; i < textSplitted[0].lines[i].length; i++) {
        const element = textSplitted[0].lines[i];
        for (let j = 0; j < element[j].length; j++) {
            const line = element[j];
            tl.fromTo(line, {y: 100}, {y: 0, ease: 'Expo.easeOut'}, 'base')
        }
    }

    // for (let i = 0; i < textSplitted[0].lines.length; i++) {
        
         
    //     for (let j = 0; j < e[j].length; j++) {
    //         const element = e[j]; 
    //         gsap.to(element, {y: 100})
    //     }
    // }
})
</script>

<template>
    <div class="container mx-auto">
        <div class="w-full lg:pt-36 pt-8 lg:pb-36 pb-8 relative"> 
             <div class="flex flex-col">
                <div ref="stones" class="w-full h-[65vh]">
                    <img class="rounded-3xl w-full h-full object-cover" src="../assets/carrefour.png" alt="">  
                </div>
                <div class="w-full font-['DM_Sans'] text-base font-light mt-16">
                    <div class="w-2/4">
                        <!-- <h5 class="text-left w-full" ref="text">
                        Située dans la métropole chaotique de Dakar, notre studio digital est un carrefour entre ce que la technologie offre, 
                        ce que notre creativité peut en faire et comment on peut connecter les marques et leurs audiences.
                        </h5> -->
                        <h5 class="text-left w-full lg:text-7xl" ref="text">
                            Une expertise multidisciplinaire pour créer des expériences digitales interactives & engageantes.
                        </h5>
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
</style>