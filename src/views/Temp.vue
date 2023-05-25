<script setup>
import { onBeforeMount, ref } from 'vue';
import Header from '../components/Header.vue';
import ComingSoon from '../components/ComingSoon.vue' 
import Grid from '../components/Projects/Grid.vue';
</script>

<template> 

    <div style="position: fixed; width: 100%;">
        <Header></Header>
    </div>

    <TagLine></TagLine>

    <div class="container">
        <Grid></Grid>
    </div> 

</template>