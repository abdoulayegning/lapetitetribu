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
                    <a class="no-underline text-white" href="mailto:abdoulaye@lapetitetribu.co">Let's chat !</a>
                    <!-- <div class="border-white cursor-pointer" @click="router.push('/pricing?form=true')">Let's chat !</div> -->
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>   
</style>