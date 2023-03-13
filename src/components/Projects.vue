<script setup>

import { ref, defineProps, onBeforeMount } from 'vue';
import { createClient } from 'contentful'

const props = defineProps({
  length: Number
})

const projects = ref(null)

const client = createClient({
    space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
    accessToken: import.meta.env.VITE_CONTENTFUL_API_KEY //Only published !!!
    //Preview : yaKRL3ryC8Pr9YLZiDE_tD3L5zGB6CBYxXZzgQkbaLY
})


onBeforeMount(()=>{
    client.getEntries({
        content_type: 'project',
        limit: props.length
        //'fields.slug': 'mathydy',
    })
    .then((entries)=>{
        projects.value = entries.items
    })
})
</script>

<template>
    <div v-if="projects"> 
        <div v-for="project in projects">
            {{ project.fields.slug }}
        </div>
    </div>
</template>