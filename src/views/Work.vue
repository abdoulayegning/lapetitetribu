<script setup>
import { ref, onBeforeMount } from 'vue'; 
import { createClient } from 'contentful'

const client = createClient({
    space: '3dsoyu63dy91',
    accessToken: 'fRA4jX66in_xDQqVFN8_xQNNxc36wHXnT_r9GLWaipI' //Only published !!!
    //Preview : yaKRL3ryC8Pr9YLZiDE_tD3L5zGB6CBYxXZzgQkbaLY
})

onBeforeMount(()=>{
    client.getEntries({
        content_type: 'project',
        //'fields.slug': slug,
    })
    .then((entries)=>{
        //console.log(entries.items)
    })
})
</script>

<template>
  <div>  
  </div>
</template>