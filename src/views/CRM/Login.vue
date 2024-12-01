<template>
    <div class="w-full h-screen flex justify-center items-center flex-col gap-5">
        <div><input v-model="email" placeholder="Email" class="p-3" type="email"></div>
        <div><input v-model="password" placeholder="Mot de passe" class="p-3" type="password"></div>
        <button @click="signIn(email, password)">Se connecter</button>
        {{ email }}
        {{ password }}
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { signIn } from '../../js/firebase'
const email = ref('')
const password = ref('')
</script>