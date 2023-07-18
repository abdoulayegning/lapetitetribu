<script setup>
import { useRoute, useRouter } from 'vue-router';
import { ref, defineProps, onBeforeMount, onUpdated } from 'vue';
import { createClient } from 'contentful'
import gsap from 'gsap'

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

const ids = []

onBeforeMount(()=>{
    client.getEntries({
        content_type: 'project',
        limit: props.length 
    })
    .then((entries)=>{
        projects.value = entries.items 
        entries.items.forEach(element => { 
            ids.push(element.sys.id)
        });
    })
})

onUpdated(()=>{
    ids.forEach(id => {

        let thumb = document.getElementById(id).children[1]
        let noise = document.getElementById(id).children[0]
        const duration = 0.25
        const noise_opacity = 0.25
        //mouse hover
        document.getElementById(id).addEventListener('mouseenter', ()=>{ 
            gsap.to(noise, {opacity: noise_opacity, duration: duration})
            gsap.to(thumb, {opacity: 1, duration: duration})
        })
        //mouse out
        document.getElementById(id).addEventListener('mouseleave', ()=>{ 
            gsap.to(noise, {opacity: 0})
            gsap.to(thumb, {opacity: 0})
        })
    })
})

</script>

<template> 
    <div class="links" v-if="projects"> 
        <div @click="router.push('/' + project.fields.slug)" :id="project.sys.id" class="link" v-for="project in projects"> 
            <div class="link-noise">
                <img src="../../assets/noise.png" alt="">
            </div>
            <div class="link-thumbnail">
                <img :src="project.fields.thumbnail.fields.file.url" alt="">
            </div>
            <div class="container link-content">
                <div>{{ project.fields.title }}</div>  
            </div>
        </div>
    </div>
</template>

<style scoped>
.links {
width: 100%;
}

.link {
    width: 100%; 
    border-top: 1px solid rgb(0, 0, 0); 
    text-transform: uppercase;
    font-size: 4vw;
    padding: 1.5rem 0 1rem 0 ; 
    transition: 0.25s;
    cursor: pointer;
    position: relative;
}
.link:hover {
    /*background-color: black;*/
    color: white; 
    padding-top: 4rem;
    padding-bottom: 4rem;
 }

.link-content {
    z-index: 100;
}

.link-thumbnail {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -100; 
    opacity: 0;
}

.link-thumbnail img {
    filter: contrast(100%) saturate(0) brightness(50%);
    width: 100%;
    height: 100%;
    object-fit: cover; 
}

.link-noise {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -50; 
    mix-blend-mode: soft-light;
    opacity: 0;
}

.link-noise img {
    width: 100%;
    height: 100%;
    object-fit: cover; 
}
 
</style>