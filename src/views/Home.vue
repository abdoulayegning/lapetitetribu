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
    <div class="container mx-auto">
        <div class="text-8xl uppercase mt-32" style="border-bottom: 0px solid black;"> 
            <h1 class="font-['PP_Neue_Machina_Plain']">nos derniers</h1>
            <h1 class="font-['PP_Neue_Machina_Plain']">projets</h1>  
        </div>
    </div>
    <Grid :length="2"></Grid>
    <Services></Services>
    <Footer></Footer> 
</div>
</template>