<template>
    <!-- bg-[rgba(0,0,0,0.75)] -->

    <div ref="dialog" id="dialog-wrapper" class="fixed z-[1200] top-0 left-0 w-full h-full font-['DM_Sans'] hidden justify-center items-center">

        <div class="bg-[#AAFF1F] rounded-[10px] flex flex-col gap-5 justify-center items-center p-16 lg:w-[50vw] text-center">
            <div class="w-72"><img class="w-full" src="/deck-cta.png" alt=""></div>
            <div class="text-2xl">Hop ! Une derniére étape.</div> 
            <div class="w-[50%]"><input v-model="fullname" class="bg-transparent border-black border-b text-center w-full pt-3 pb-3" type="text" placeholder="Prénom(s) & Nom"></div>
            <div class="w-[50%]"><input v-model="email" class="bg-transparent border-black border-b text-center w-full pt-3 pb-3" type="email" placeholder="Votre email"></div>
            <div @click="openLink" :class="fullname !== '' && email !== '' ? `bg-[#fff] flex gap-3 pb-3 pt-3 pr-6 pl-6 rounded-[10px] mb-3 pointer-events-all` : `bg-[#fff] opacity-50 flex gap-3 pb-3 pt-3 pr-6 pl-6 rounded-[10px] mb-3 pointer-events-none`">
                <div><img class="w-4" src="/download.svg" alt=""></div>
                <button>Télécharger le deck</button>
            </div> 
            <div class="text-xs cursor-pointer underline" @click="cancelCTA">Annuler</div>
        </div>
        

    </div>

    <div ref="deck" id="deck-wrapper" class="bg-white lg:hidden hidden flex-col justify-center items-center w-72 text- p-6 fixed z-[1000] bottom-6 right-6">
       
        <!-- Image CTA -->
        <div class="w-full p-5"><img class="w-full" src="/deck-cta.png" alt=""></div>
       
        <!-- Button CTA -->
        <div class="mb-1">Découvrez nos savoir-faire !</div>

        <div class="bg-[#AAFF1F] flex gap-3 pb-3 pt-3 pr-6 pl-6 mb-3">
            <div><img class="w-4" src="/download.svg" alt=""></div>
            <button class="" @click="openDialog">Télécharger le deck</button>
        </div>

        <div class="text-xs text-gray-400 cursor-pointer mt-1 underline" @click="closeCTA">Peut être plus tard !</div>

    </div> 

</template>

<script setup>
import { onMounted, ref } from 'vue';
import { addNewDeckDownload } from '../js/firebase'
import gsap from 'gsap'
const deck = ref(null)
const dialog = ref(null)
const mm = gsap.matchMedia()
const enableBtn = ref(false)
const fullname = ref('')
const email = ref('')

const openLink = ()=>{
    addNewDeckDownload(email.value, fullname.value)
    // window.open('./La_Petite_Tribu_Deck.pdf')
}

const cancelCTA = ()=>{
    gsap.to(dialog.value, {opacity: 0, onComplete:()=>{dialog.value.style.display = 'none'}})
}

const closeCTA = ()=>{
    let target = deck.value
    gsap.to(target, {rotate: 80, x: window.innerWidth/4, ease:'expo.in', duration: .85, onComplete: ()=>{target.style.display = 'none'}})
}

const openDialog = ()=>{
    let target = deck.value
    gsap.to(target, {rotate: 80, x: window.innerWidth/4, ease:'expo.in', duration: .85, 

        onComplete: ()=>{
            target.style.display = 'none'
            gsap.fromTo(dialog.value, {y: window.innerHeight}, {y: 0, ease: 'expo.out', duration: 1.3, onStart:()=>{dialog.value.style.display = 'flex'}})
        },
        
        onStart: ()=>{
            // target.style.display = 'none'
        },

    })
}

onMounted(()=>{

    let target = deck.value
    gsap.set(target, {transformOrigin: 'right bottom'})

    mm.add("(min-width: 1024px)", ()=>{
        gsap.fromTo(target, {scale: 0, rotate: 80, x: 300}, {scale: 1, delay: .5, rotate: 0, x: 0, ease:'expo.out', onStart: ()=>{target.style.display = 'flex'}})
    })

    mm.add("(max-width: 1024px)", ()=>{
        gsap.set(target, {display: 'none'})
    })
     
})
</script>