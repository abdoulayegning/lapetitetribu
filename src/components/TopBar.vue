<template>
    <div class="fixed w-[85%] pr-12 pl-12 rounded-xl text-xs uppercase gap-0 left-1/2 -translate-x-1/2 mt-1 z-[1000] flex justify-between items-center pt-4 pb-4 text-white mix-blend-difference">
        <div class="menu-btn">Projets</div>
        <!-- <div class="menu-btn">à propos</div> -->
        <div class="font-['PP_Monument_Extended'] lowercase cursor-pointer" @click="router.push('/')">la petite tribu</div>
        <!-- <div class="menu-btn">nos services</div> -->
        <div class="menu-btn flex gap-2 justify-center items-center">
            <a href="mailto:abdoulaye@lapetitetribu.co">email</a>
            <svg width="9" height="10" viewBox="0 0 9 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.38281 6.29193L7.19929 6.27679V2.53616L1.3727 8.38184L0.507812 7.50347L6.36475 1.67294H2.60174V0.506836H8.38281V6.29193Z" fill="white"/>
            </svg>
        </div>
    </div>
    <!-- <div class="uppercase fixed text-xs right-0 rotate-90 z-[1000] top-1/2">{{"Dakar / "+ ' ' +locale}}</div> -->
</template>

<style scoped>
.menu-btn {
@apply border-b border-white pl-4 pr-4 pt-2 pb-1 cursor-pointer
}
</style>

<script setup>
import moment from 'moment-timezone'
import {onMounted, ref} from 'vue'
import {useRouter, useRoute} from 'vue-router'
const router = useRouter()
const route = useRoute()
const locale = ref('')
onMounted(()=>{
    setInterval(()=>{
        locale.value = moment().tz("Africa/Dakar").format('LT')
    }, 1000)
})
</script>