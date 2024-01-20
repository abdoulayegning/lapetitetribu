<script setup>
import { onBeforeMount, ref } from 'vue';
import Hero from '../components/Hero.vue';
import List from '../components/Work/List.vue' 
import Footer from '../components/Footer.vue';
import Services from '../components/Services.vue';
</script>

<template>  
<div id="content_homepage">
    <Hero></Hero>
    <List :length="2"></List>
    <Services></Services>
    <Footer></Footer> 
</div>
</template>