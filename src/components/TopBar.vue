<template>
    <div class="fixed w-[85%] pr-12 pl-12 uppercase gap-0 left-1/2 -translate-x-1/2 mt-1 z-[800] flex lg:justify-between justify-center items-center pt-4 pb-4 text-black gap-5">
         <div class="font-['PP_Monument_Extended'] lowercase cursor-pointer" @click="router.push('/')">la petite tribu</div>
        <!-- <div class="flex gap-8 text-base font-['DM_Sans']">
            <div>projets</div>
            <div>services</div>
            <div>à propos</div>
        </div> -->
         <div class="menu-btn" ref="deckDownloadButton">
            <svg class="w-5 lg:hidden" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 242.7-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7 288 32zM64 352c-35.3 0-64 28.7-64 64l0 32c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-32c0-35.3-28.7-64-64-64l-101.5 0-45.3 45.3c-25 25-65.5 25-90.5 0L165.5 352 64 352zm368 56a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"/></svg>
            <a class="no-underline text-black hidden lg:block" href="/La Petite Tribu - Deck.pdf" download="La Petite Tribu - Deck">Télécharger le <u>deck</u> !</a>
        </div>
    </div>
    <!-- <div class="uppercase fixed text-xs right-0 rotate-90 z-[1000] top-1/2">{{"Dakar / "+ ' ' +locale}}</div> -->
</template>

<style scoped>
.menu-btn {
@apply backdrop-blur-sm text-base bg-[#08ff08] text-black lg:rounded-full rounded-xl -rotate-2 pt-2 pb-2 lg:pr-[40px] lg:pl-[40px] pr-3 pl-3;
}
</style>

<script setup>
import moment from 'moment-timezone'
import {onMounted, ref} from 'vue'
import {useRouter, useRoute} from 'vue-router'
import gsap from 'gsap'
const router = useRouter()
const route = useRoute()
const locale = ref('')
const deckDownloadButton = ref(null)
const scrollToWork = ref(null)
defineExpose({
    scrollToWork
})
onMounted(()=>{
    setInterval(()=>{
        locale.value = moment().tz("Africa/Dakar").format('LT')
    }, 1000)

    deckDownloadButton.value.addEventListener('mouseover', (e)=>{
         let tl = gsap.timeline({
            defaults:{ease: 'elastic.out', duration: 0.75}
        }) 
        tl.to(deckDownloadButton.value, {paddingLeft: '45px', paddingRight: '45px', backgroundColor: '#000'}, 'default')
        tl.to(deckDownloadButton.value.children[1], {color: '#08ff08'}, 'default')
    })
    deckDownloadButton.value.addEventListener('mouseleave', (e)=>{
        let tl = gsap.timeline({
            defaults:{ease: 'elastic.out', duration: 0.75}
        })
        tl.to(deckDownloadButton.value, {paddingLeft: '40px', paddingRight: '40px', backgroundColor: '#08ff08'}, 'default')
        tl.to(deckDownloadButton.value.children[1], {color: '#000'}, 'default')
    })
})
</script>