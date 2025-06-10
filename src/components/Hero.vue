<template>

    <div class="w-full relative p-8 text-black">
        
        <div ref="logotype" class="lg:text-[7.45vw] text-[7vw] mt-10 font-['PP_Monument_Extended'] text-center" v-html="Splitting.html({content: 'la petite tribu', by: 'chars'})"></div>
        
        <div ref="about" class="text-xl text-center mt-10">
            <div class="opacity-0"><span class="font-bold">Studio digital</span> basé à Dakar, Sénégal. </div> 
            <div class="opacity-0">Des <span class="font-bold">expériences digitales interactives</span></div>
            <div class="opacity-0">pour des marques ambitieuses, <span class="underline">innovantes</span> et surtout <span class="italic">audacieuses</span> !</div>
        </div>  
    
    </div>
    
    

    <div ref="popups" class="w-full font-['DM_Sans'] uppercase lg:text-xl text-base lg:absolute lg:top-8 left-0 lg:h-screen hidden grid-cols-3">
        <div class="lg:absolute border border-[#ff2390] bg-[#ffe1f0] text-[#ff2390] top-20 left-28 rounded-xl pl-3 pr-3 pt-1 pb-1 lg:rotate-6">ui/ux</div>
        <div class="lg:absolute border border-[#234bff] bg-[#e1e6ff] text-[#234bff] top-1/2 right-4 rounded-xl pl-3 pr-3 pt-1 pb-1 lg:rotate-6">site internet</div>
        <div class="lg:absolute border border-[#ff8623] bg-[#ffe1c9] text-[#ff8623] top-1/2 left-2 rounded-xl pl-3 pr-3 pt-1 pb-1 lg:-rotate-6">realité virtuelle</div>
        <div class="lg:absolute border border-[#23ff5e] bg-[#d1ffdd] text-[#3dcf64] top-20 left-1/3 rounded-xl pl-3 pr-3 pt-1 pb-1 lg:-rotate-8">2D/3D</div>
        <div class="lg:absolute border border-[#2382ff] bg-[#d9e9ff] text-[#2382ff] top-20 right-36 rounded-xl pl-3 pr-3 pt-1 pb-1 lg:-rotate-6">motion design</div>
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

const AnimateInAboutText = ()=>{
    let tl = gsap.timeline({
        delay: .0,
        defaults:{
            ease: 'expo.out',
            duration: 1
        }
    })
    for (let i = 0; i < about.value.children.length; i++) {
        const a = about.value.children[i];
        tl.fromTo(a, {y: 100, opacity: 0, rotate: 12}, {y: 0, opacity: 1, rotate: 0}, i/10)
    }
}

const AnimateCards = ()=>{
    let tl = gsap.timeline({
        delay: .0,
        defaults:{
            ease: 'expo.out',
            duration: 1
        }
    })
    for (let i = 0; i < frames.value.children.length; i++) {
        const f = frames.value.children[i];
        tl.fromTo(f, {y: 100, opacity: 0, rotate: 12}, {y: 0, opacity: 1, rotate: gsap.utils.random(-5, 10), scale: gsap.utils.random(1.05, 1.2)}, i/10)
    }
}

onMounted(()=>{

    HideSplittingText(logotype.value)
    
    let tl = gsap.timeline({
        defaults:{duration: .75},
        onComplete: ()=>{
            AnimateSplittingTextIn(logotype.value)
            AnimateInAboutText()
            // AnimateCards()
        }
    })

    for (let i = 0; i < popups.value.children.length; i++) {
        const p = popups.value.children[i];
        tl.fromTo(p, {scale: 0},{scale: 1, ease: 'elastic'}, i/10)
    }
 
})
</script>