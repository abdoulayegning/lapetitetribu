<script setup>
import { onBeforeMount, onMounted, ref } from 'vue';
import List from '../components/Projects/List.vue';
import Clients from '../components/Clients.vue';
import Header from '../components/Header.vue'
import About from '../components/About.vue';
import Services from '../components/Services.vue';
</script>

<template>  
    <div>  
        <Header></Header>
        <About></About>
        <Services></Services>
        <Clients></Clients>
        <List :length="3"></List>
    </div>  
</template>