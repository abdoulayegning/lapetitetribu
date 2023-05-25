<script setup>
import { useRoute, useRouter } from 'vue-router';
import { ref, defineProps, onBeforeMount } from 'vue';
import { createClient } from 'contentful'

const route = useRoute();
const router = useRouter();

const props = defineProps({
  length: Number,
  category: String
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
        limit: props.length,
        'fields.category': props.category,
    })
    .then((entries)=>{
        projects.value = entries.items
    })
})
</script>

<template>
    <div class="projects" v-if="projects"> 
        <div class="project" @click="router.push('/' + project.fields.slug)" v-for="project in projects">
            <div>{{ project.fields.title }}</div> 
        </div>
    </div>
</template>

<style scoped>
.projects {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.project {
    margin-left: 1rem;
    margin-right: 1rem;
}
</style>