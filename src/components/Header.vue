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
                    <div class="lg:text-3xl text-xl font-['PP_Monument_Extended'] lg:text-center cursor-pointer">
                        la petite tribu
                    </div>
                </div>
                <div class="flex text-base gap-4">
                    <div class="border-white cursor-pointer" @click="router.push('/')" :class="route.path == '/' ? `border-b` : `border-none`">Projets</div>
                    <div class="border-white cursor-pointer" @click="router.push('/pricing')" :class="route.path == '/pricing' ? `border-b` : `border-none`">Tarifs</div>
                    <!-- <a href="mailto:abdoulaye@lapetitetribu.co">abdoulaye@lapetitetribu.co</a> -->
                    <div class="border-white cursor-pointer" @click="router.push('/pricing?form=true')">Let's chat !</div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>   
</style>