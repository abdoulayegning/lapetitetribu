<template>
    <div ref="message" class="fixed w-full h-screen z-50 border justify-center items-center flex flex-col font-['DM_Sans']">
        <div>Merci ! Nous vous ferons un retour dans les plus brefs délais !</div>
        <div @click="router.push('/')" class="cursor-pointer underline">Retour à l'accueil</div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter()
</script>