<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const router = useRouter()
const route = useRoute()
 </script>

<template>

    <div class="w-full h-32 container fixed -translate-x-1/2 left-1/2 top-8 z-[150]">
        <div class="flex justify-between">
        <div @click="router.push('/')">
            <div class="text-base font-['PP_Monument_Extended'] lg:text-center">
                la petite tribu
            </div>
        </div>
        <div class="flex text-base gap-4">
            <div class="border-black cursor-pointer" @click="router.push('/')" :class="route.path == '/' ? `border-b` : `border-none`">Work</div>
            <div class="border-black cursor-pointer" @click="router.push('/pricing')" :class="route.path == '/pricing' ? `border-b` : `border-none`">Tarifs</div>
         </div>
        </div>
    </div>
</template>

<style scoped>   
</style>