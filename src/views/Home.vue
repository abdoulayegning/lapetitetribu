<script setup>
import { onBeforeMount, ref } from 'vue';
import Hero from '../components/Hero.vue';
import Grid from '../components/Work/Grid.vue' 
import Footer from '../components/Footer.vue';
import Services from '../components/Services.vue';
</script>

<template>  
<div id="content_homepage">
    <Hero></Hero>
    <Grid :length="2"></Grid>
    <Services></Services>
    <Footer></Footer> 
</div>
</template>