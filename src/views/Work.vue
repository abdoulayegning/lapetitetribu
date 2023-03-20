<script setup>
import { ref, onBeforeMount } from 'vue'; 
import List from '../components/Projects/List.vue';
</script>

<template>
  <div>  
    <List :length="3"></List>
  </div>
</template>