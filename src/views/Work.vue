<script setup>
import { ref, onBeforeMount } from 'vue'; 
import List from '../components/Projects/List.vue';
import Clients from '../components/Clients.vue';
import Header from '../components/Header.vue'
import About from '../components/About.vue';
</script>

<template>
  <div>  
    <Header></Header>
    <About></About>
    <List :length="3"></List>
    <Clients></Clients>
  </div>
</template>