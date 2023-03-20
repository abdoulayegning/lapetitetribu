<script setup>
import { useRoute, useRouter } from 'vue-router';
import { ref, defineProps, onBeforeMount } from 'vue';
import { createClient } from 'contentful'

const route = useRoute();
const router = useRouter();

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
    })
    .then((entries)=>{
        projects.value = entries.items
    })
})
</script>

<template>
    <div class="links" v-if="projects"> 
        <div @click="router.push('/' + project.fields.slug)" class="link" v-for="project in projects">
            <div>{{ project.fields.title }}</div> 
        </div>
    </div>
</template>

<style scoped>

.links {
width: 100%;
}

.link {
    width: 100%; 
    border-bottom: 1px solid rgb(0, 0, 0);
    text-transform: uppercase;
    font-size: 4vw;
    padding: 1.5rem 0 1rem 0 ; 
    transition: 0.25s;
    cursor: pointer;
}
 .link:hover {
    background-color: black;
    color: white;
    padding-left: 1.25rem;
 }

</style>