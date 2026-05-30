<template>

    <div class="w-full relative p-8 text-black hidden">
        
        <div ref="logotype" class="lg:text-[7.45vw] text-[7vw] mt-28 font-['PP_Monument_Extended'] text-center" v-html="Splitting.html({content: 'la petite tribu', by: 'chars'})"></div>
        
        <div ref="about" class="text-xl text-center mt-10">
            <div class="opacity-0"><span class="font-bold">Studio digital</span> basé à Dakar, Sénégal. </div> 
            <div class="opacity-0">Des <span class="font-bold">expériences digitales interactives</span></div>
            <div class="opacity-0">pour des marques ambitieuses, <span class="underline">innovantes</span> et surtout <span class="italic">audacieuses</span> !</div>
        </div>  
        
    </div> 

    <div class="w-full aspect-video">
        <video class="w-full h-full object-cover" muted autoplay loop src="/typos/typos.mp4"></video>
    </div>

    <div class="mt-10">
        <div class="mx-auto container">
            <div class="lg:text-6xl text-xl">
                Studio digital basé à Dakar, Sénégal. Nous créons des expériences digitales interactives pour des marques ambitieuses, innovantes et surtout audacieuses.
            </div>
        </div>
    </div>
  
</template>

<script setup>
import KeenSlider from 'keen-slider'
import {ref, onMounted} from 'vue'
import Splitting from 'splitting'
import gsap from 'gsap';
import {AnimateSplittingTextIn, HideSplittingText} from '../js/animations'
const keen = ref(null)
const about = ref(null)
const popups = ref(null)
const logotype = ref(null)
const frames = ref(null) 

onMounted(()=>{
 
 
})
</script>