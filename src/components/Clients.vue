<script setup>
import { ref, defineProps, onBeforeMount } from 'vue';
import { createClient } from 'contentful'

const props = defineProps({
  length: Number, 
})

const clients = ref([])  

const client = createClient({
    space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
    accessToken: import.meta.env.VITE_CONTENTFUL_API_KEY //Only published !!!
    //Preview : yaKRL3ryC8Pr9YLZiDE_tD3L5zGB6CBYxXZzgQkbaLY
})
 
onBeforeMount(()=>{ 
        client.getEntries({
            content_type: 'client',
        })
        .then((entries)=>{
            clients.value = entries.items 
            console.log(clients.value)
        }) 
})
</script>

<template>
    <div class="wrapper">
        <div class="container"> 
            <div>
                <div class="title">Good Friends</div> 
            </div>
            <div class="grid">
                <div class="grid-item" v-for="client in clients"> 
                    <img :src="client.fields.logo.fields.file.url" alt=""> 
                </div>  
            </div>
        </div>
    </div>
</template>

<style scoped> 
.remove-grid-item {
    display: none;
}
.wrapper {
    background-color: rgb(24, 24, 24);
    padding-bottom: 5rem;
    padding-top: 5rem;
} 
.title {
    color: white;
    font-size: 3vw;
    text-transform: uppercase;
    text-align: center; 
    display: none;
}
.grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
}
.grid-item {
    border: 0px solid red; 
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
}  
.grid img {
    width: 50%; 
}
</style>