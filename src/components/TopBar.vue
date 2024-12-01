<template>

    <div class="fixed w-[85%] pr-12 pl-12 uppercase left-1/2 -translate-x-1/2 mt-1 z-[800] flex lg:justify-between justify-center items-center pt-4 pb-4 text-black gap-5">
        <div class="font-['PP_Monument_Extended'] lowercase cursor-pointer" @click="router.push('/')">la petite tribu</div>
        <div class="menu-btn hidden" ref="deckDownloadButton" @click="OpenMenu">
          <span class="material-symbols-outlined">menu</span>
        </div>
    </div>

    <div class="hidden items-center p-10 w-full h-[100dvh] bg-[#000] z-[1500] fixed text-[#08ff08]" ref="menu">
        <div class="absolute right-6 top-6 cursor-pointer" @click="CloseMenu">
          <span class="material-symbols-outlined text-3xl text-[#08ff08]">arrow_right_alt</span>
        </div>
        <div class="text-4xl">Tonton ! le menu n'est pas prêt !</div>
    </div>
    <!-- <div class="uppercase fixed text-xs right-0 rotate-90 z-[1000] top-1/2">{{"Dakar / "+ ' ' +locale}}</div> -->
</template>

<style scoped>
.menu-btn {
@apply cursor-pointer backdrop-blur-sm text-base bg-[#08ff08] text-black rounded-none -rotate-2 pt-2 pb-1 pr-[15px] pl-[15px];
}
</style>

<script setup>
import moment from 'moment-timezone'
import {onMounted, ref} from 'vue'
import {useRouter} from 'vue-router'
import gsap from 'gsap'
const router = useRouter()
const locale = ref('')
const deckDownloadButton = ref(null)
const scrollToWork = ref(null)

const menu = ref(null)

function OpenMenu(){
    menu.value.style.display = "flex"
}

function CloseMenu(){
    menu.value.style.display = "none"
}

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
        tl.to(deckDownloadButton.value, {paddingLeft: '20px', paddingRight: '20px', backgroundColor: '#000'}, 'default')
        tl.to(deckDownloadButton.value.children[0], {color: '#08ff08'}, 'default')
    })

    deckDownloadButton.value.addEventListener('mouseleave', (e)=>{
        let tl = gsap.timeline({
            defaults:{ease: 'elastic.out', duration: 0.75}
        })
        tl.to(deckDownloadButton.value, {paddingLeft: '15px', paddingRight: '15px', backgroundColor: '#08ff08'}, 'default')
        tl.to(deckDownloadButton.value.children[0], {color: '#000'}, 'default')
    })
})
</script>