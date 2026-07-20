<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const router = useRouter()
const route = useRoute()
 </script>

<template>
    <div class="w-full h-20 fixed top-0 z-[150] mix-blend-difference text-white lg:mt-0 mt-5">
        <div class="container mx-auto h-full">
            <div class="flex justify-between lg:items-center items-start h-full">
                <div @click="router.push('/')">
                    <img class="lg:w-60 w-40 h-auto" src="/logo-lpt-white.svg" alt="Logo">
                </div>
                <div class="flex flex-col lg:flex-row text-base lg:gap-4">
                    <div class="border-white cursor-pointer" @click="router.push('/')" :class="route.path == '/' ? `lg:border-b` : `border-none`">Projets</div>
                    <div class="border-white cursor-pointer" @click="router.push('/pricing')" :class="route.path == '/pricing' ? `lg:border-b` : `border-none`">Tarifs</div>
                    <a class="no-underline text-white" href="mailto:abdoulaye@lapetitetribu.co">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"><!-- Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE --><path fill="currentColor" d="M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h10.1q-.1.5-.1 1t.1 1H4l8 5l3.65-2.275q.35.325.763.563t.862.412L12 13L4 8v10h16V9.9q.575-.125 1.075-.35T22 9v9q0 .825-.587 1.413T20 20zM4 6v12zm15 2q-1.25 0-2.125-.875T16 5t.875-2.125T19 2t2.125.875T22 5t-.875 2.125T19 8"/></svg>
                    </a>
                    <!-- <div class="border-white cursor-pointer" @click="router.push('/pricing?form=true')">Let's chat !</div> -->
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>   
</style>