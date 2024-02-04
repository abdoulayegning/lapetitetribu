<script setup>
import { useRoute, useRouter } from 'vue-router';
import { ref, defineProps, onBeforeMount, onUpdated } from 'vue';
import { createClient } from 'contentful'
import gsap from 'gsap'

const route = useRoute();
const router = useRouter();
 

const projects = ref(null)

const client = createClient({
    space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
    accessToken: import.meta.env.VITE_CONTENTFUL_API_KEY //Only published !!!
    //Preview : yaKRL3ryC8Pr9YLZiDE_tD3L5zGB6CBYxXZzgQkbaLY
})
 

onBeforeMount(()=>{
    client.getEntries({
        content_type: 'studioWork',
        // limit: props.length 
    })
    .then((entries)=>{
        projects.value = entries.items 
        console.log(projects.value)
    })
})

const go_to = (path)=>{
    const content_homepage = document.getElementById('content_homepage')
    if(content_homepage){
        gsap.to(content_homepage, {opacity: 0, onComplete: ()=>{
            router.push('/' + path)
        }})
    }
}

</script>

<template> 
<div class="mt-40 mb-20">
    <div class="container mx-auto"> 
        <div class="grid grid-cols-2 gap-6">
            <div @click="go_to(p.fields.slug)" class="pl-6 pt-6 pb-6 cursor-pointer " v-for="p in projects">
                <div>
                    <img :src="p.fields.imageThumbnail.fields.file.url" alt="">
                </div>
                <div class="flex flex-col gap-1 border-t border-gray-300 pt-6 mt-6">  
                    <div class="uppercase font-medium">{{ p.fields.title }}</div> 
                    <div class="uppercase font-medium text-gray-400">{{ p.fields.category }}</div> 
                </div>
            </div>
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