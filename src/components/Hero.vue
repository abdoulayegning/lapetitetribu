<template>

    <div class="w-full lg:h-screen relative p-8 bg-black text-white">
        
        <div ref="logotype" class="lg:text-[7.45vw] text-[7vw] mt-10 font-['PP_Monument_Extended'] text-center" v-html="Splitting.html({content: 'la petite tribu', by: 'chars'})"></div>
        
        <div ref="about" class="text-xl text-center mt-10 font-['DM_Sans']">
            <div class="opacity-0"><span class="font-bold">Studio digital</span> basé à Dakar, Sénégal. </div> 
            <div class="opacity-0">Des <span class="font-bold">expériences digitales interactives</span></div>
            <div class="opacity-0">pour des marques ambitieuses, <span class="underline">innovantes</span> et surtout <span class="italic">audacieuses</span> !</div>
        </div>  

        <div ref="frames" class="flex w-full mt-28 lg:mb-0 mb-16 gap-5">
            <div :class="`opacity-0 lg:w-[calc(100%/6)] w-full h-72 rounded-xl`"><video class="w-full h-full rounded-xl object-cover" muted autoplay loop playsinline disable-picture-in-picture="true " disablePictureInPicture src="../assets/canalplus.mp4"></video></div>
            <div :class="`opacity-0 lg:w-[calc(100%/6)] w-full h-72 rounded-xl`"><img class="w-full h-full rounded-xl object-cover" src="../assets/portal.png" alt=""></div>
            <div :class="`opacity-0 lg:w-[calc(100%/6)] w-full h-72 rounded-xl`"><img class="w-full h-full rounded-xl object-cover" src="../assets/carrefour.png" alt=""></div>
            <div :class="`opacity-0 lg:w-[calc(100%/6)] w-full h-72 rounded-xl lg:block hidden`"><img class="w-full h-full rounded-xl object-cover" src="../assets/sekou.png" alt=""></div>
            <div :class="`opacity-0 lg:w-[calc(100%/6)] w-full h-72 rounded-xl lg:block hidden`"><video class="w-full h-full rounded-xl object-cover" muted autoplay loop playsinline disable-picture-in-picture="true " disablePictureInPicture src="/loop-wsx.mp4"></video></div>
            <div :class="`opacity-0 lg:w-[calc(100%/6)] w-full h-72 rounded-xl lg:block hidden`"><video class="w-full h-full rounded-xl object-cover" muted autoplay loop playsinline disable-picture-in-picture="true " disablePictureInPicture src="../assets/interactive.mp4"></video></div>
        </div>

    </div>
    
    

    <div ref="popups" class="w-full font-['DM_Sans'] uppercase lg:text-xl text-base lg:absolute lg:top-8 left-0 lg:h-screen hidden grid-cols-3">
        <div class="lg:absolute border border-[#ff2390] bg-[#ffe1f0] text-[#ff2390] top-20 left-28 rounded-xl pl-3 pr-3 pt-1 pb-1 lg:rotate-6">ui/ux</div>
        <div class="lg:absolute border border-[#234bff] bg-[#e1e6ff] text-[#234bff] top-1/2 right-4 rounded-xl pl-3 pr-3 pt-1 pb-1 lg:rotate-6">site internet</div>
        <div class="lg:absolute border border-[#ff8623] bg-[#ffe1c9] text-[#ff8623] top-1/2 left-2 rounded-xl pl-3 pr-3 pt-1 pb-1 lg:-rotate-6">realité virtuelle</div>
        <div class="lg:absolute border border-[#23ff5e] bg-[#d1ffdd] text-[#3dcf64] top-20 left-1/3 rounded-xl pl-3 pr-3 pt-1 pb-1 lg:-rotate-8">2D/3D</div>
        <div class="lg:absolute border border-[#2382ff] bg-[#d9e9ff] text-[#2382ff] top-20 right-36 rounded-xl pl-3 pr-3 pt-1 pb-1 lg:-rotate-6">motion design</div>
    </div>
 

    <!-- div ref="keen" class="keen-slider whitespace-nowrap pointer-events-none">
    <div v-if="index == 0"><video class="w-full h-[190px] object-cover" muted autoplay loop playsinline disable-picture-in-picture="true " disablePictureInPicture src="../assets/value.mp4"></video></div>
        <div class="keen-slider__slide bg-slate-400 h-[190px]" v-for="(i,index) in [0,1,2,3,4,5,6,7,8,9]">
            <div v-if="index == 8"><img class="w-full h-[190px] object-cover" src="../assets/dingding.png" alt=""></div>
        </div> 
    </div --->
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
            AnimateCards()
        }
    })

    for (let i = 0; i < popups.value.children.length; i++) {
        const p = popups.value.children[i];
        tl.fromTo(p, {scale: 0},{scale: 1, ease: 'elastic'}, i/10)
    }

    // (min-width: 1024px)
    var animation = { duration: 25000, easing: (t) => t }
    var slider = new KeenSlider(
    keen.value,
    {
        loop: true,
        renderMode: "performance",
        drag: false,
        breakpoints: {
            '(max-width: 1024px)': { 
                slides: { origin: "center", perView: 1.25, spacing: 10 },
            },
        },
        slides: { origin: "center", perView: 4.5, spacing: 15 },
        // range: {
        //   min: -5,
        //   max: 5,
        // },
        created(s) {
          s.moveToIdx(5, true, animation)
        },
        updated(s) {
          s.moveToIdx(s.track.details.abs + 5, true, animation)
        },
        animationEnded(s) {
          s.moveToIdx(s.track.details.abs + 5, true, animation)
        },
    },
    [
        // add plugins here
    ]
    )

    for (let i = 0; i < frames.value.children.length; i++) {
        const f = frames.value.children[i];
        gsap.set(f, { rotate: gsap.utils.random(-2.5, 2.5), scale: gsap.utils.random(1.05, 1.2)}) 
    }
})
</script>