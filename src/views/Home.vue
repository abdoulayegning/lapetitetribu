<script setup>
import { onBeforeMount, ref } from 'vue';
import Header from '../components/Header.vue';
import ComingSoon from '../components/ComingSoon.vue'
import TagLine from '../components/TagLine.vue';
import Projects from '../components/Projects.vue';
</script>

<template>  
    <div style="position: fixed; width: 100%;"><Header></Header></div>
    <TagLine></TagLine>
    <div class="container">
        <Projects length=10></Projects>
    </div>
</template>