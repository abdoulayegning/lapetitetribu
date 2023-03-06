<script setup>
import { ref } from 'vue';
</script>

<template>
    <div class="container">
        <div class="header">
            <div><router-link to="/">Index</router-link></div>
            <div><router-link to="/work">Projets</router-link></div>
            <div><router-link to="/contact">Contact</router-link></div>
        </div>
    </div>
</template>

<style scoped>
    .header {
        position: fixed; 
        font-family: FK Grotesk Mono;
    }
</style>