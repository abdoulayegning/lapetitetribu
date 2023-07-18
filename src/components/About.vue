<script setup>
import { onMounted, ref } from 'vue';
import Splitting from "splitting";
import { gsap } from 'gsap';
const text = ref(null)
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
    <div class="w-full pt-36 pb-36 relative">
        <img class="absolute top-0 w-72" src="../assets/sigui.png" alt="">
         <div class="flex">
            <div class="w-1/2">
            </div>
            <div class="w-1/2 font-['DM_Sans'] text-6xl font-light">
                <h5 class="w-3/4" ref="text">
                    Située dans la métropole chaotique de Dakar, notre studio digital est un carrefour entre ce que la technologie offre, 
                    ce que notre creativité peut en faire et comment on peut connecter les marques et leurs audiences.
                </h5>
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