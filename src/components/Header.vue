<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const router = useRouter()
const route = useRoute()
 </script>

<template>

    <div class="w-full h-20 fixed top-0 z-[150] mix-blend-difference text-white">
        <div class="container mx-auto h-full">
            <div class="flex justify-between items-center h-full">
                <div @click="router.push('/')">
                    <div class="text-base font-['PP_Monument_Extended'] lg:text-center">
                        la petite tribu
                    </div>
                </div>
                <div class="flex text-base gap-4">
                    <div class="border-white cursor-pointer" @click="router.push('/')" :class="route.path == '/' ? `border-b` : `border-none`">Work</div>
                    <div class="border-white cursor-pointer" @click="router.push('/pricing')" :class="route.path == '/pricing' ? `border-b` : `border-none`">Tarifs</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>   
</style>