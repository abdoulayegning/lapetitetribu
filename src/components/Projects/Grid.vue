<script setup> 
import { ref, defineProps, onBeforeMount } from 'vue';
import { createClient } from 'contentful'

const props = defineProps({
  length: Number, 
})

const projects = ref([]) 

const client = createClient({
    space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
    accessToken: import.meta.env.VITE_CONTENTFUL_API_KEY //Only published !!!
    //Preview : yaKRL3ryC8Pr9YLZiDE_tD3L5zGB6CBYxXZzgQkbaLY
})
 
onBeforeMount(()=>{ 
        client.getEntries({
            content_type: 'project',
            limit: props.length, 
        })
        .then((entries)=>{
            projects.value = entries.items 
        }) 
})
</script>

<template>
    <div class="projects" v-if="projects"> 
        <div class="project" v-for="project in projects">
            <div v-if="project.fields.thumbnail == null"><img src="https://e1.pxfuel.com/desktop-wallpaper/717/436/desktop-wallpaper-blank-blueprint-background-blueprint.jpg" alt=""></div>
            <div class="project-text-wrapper">
                <div>
                    <div>{{ project.fields.title }}</div>
                    <div>{{ project.fields.category[0] }}</div> 
                </div>
                <div class="project-client">{{ project.fields.client.fields.name}}</div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.projects {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
}

.project {
    padding: 2rem;
}

.project img{
    width: 100%;
}
.project-client {
    align-self: flex-start;
}
.project-text-wrapper {
    display: flex;
}
</style>