<template>
    <div>
        <button @click="SendMessage">send email</button>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { SendMessage } from '../js/email'
const router = useRouter()
</script>