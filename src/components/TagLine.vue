<template>
    <div class="tagline full-viewport">  
        <div class="tagline-items">
            <div>créateurs</div>
            <div style="font-weight: 800">d’expériences</div>
            <div>digitales</div> 
        </div> 
    </div>
</template>

<style scoped>
 

.tagline-items { 
    width: var(--container-width);;
    margin: 0 auto;
    height: 100%;
    display: flex;
    align-items: start;
    justify-content: center;
    flex-direction: column;
}

.tagline-items div {
    font-size: 9vw; 
}
</style>

<script setup>
import { ref } from 'vue';
</script>