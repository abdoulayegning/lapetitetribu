<template>
    <div class="container mx-auto" ref="container"> 

        <div class="grid grid-cols-2 gap-16" id="items">

            <div @click="router.push('/' + i.fields.slug)" class="font-['DM_Sans'] cursor-pointer relative h-[65vh] bg-black" v-for="i,j in response"> 
                <div class="w-full h-full absolute opacity-60 z-20">
                    <video class="w-full h-full object-cover" v-if="i.fields.videoThumbnail" muted loop autoplay playsinline :src="i.fields.videoThumbnail.fields.file.url"></video>
                </div>
                <div class="h-full w-full opacity-100 absolute z-20"> 
                    <img v-if="i.fields.imageThumbnail" class="w-full h-full object-cover" :src="i.fields.imageThumbnail.fields.file.url" alt=""> 
                    <img v-else class="w-full h-full object-cover" src="https://picsum.photos/2000/2000" alt=""> 
                </div> 
                <div class="text-white lg:w-1/2 text-4xl uppercase mt-4 absolute z-40 bottom-6 left-6 text-left">
                    <span class="border-b-4">{{i.fields.title}}</span>
                    <h2 class="text-gray-400 font-['DM_Sans'] mt-3">{{i.fields.category}}</h2>  
                </div>
            </div>  

        </div>

    </div>
</template>

<script setup>
import { onBeforeMount, onMounted, onUpdated, ref } from 'vue';
import { gsap, ScrollTrigger } from 'gsap/all' 
import { createClient } from 'contentful'
import {useRouter} from 'vue-router'
const client = createClient({
    space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
    accessToken: import.meta.env.VITE_CONTENTFUL_API_KEY //Only published !!!
    //Preview : yaKRL3ryC8Pr9YLZiDE_tD3L5zGB6CBYxXZzgQkbaLY
})

const response = ref(null)
const router =useRouter()

gsap.registerPlugin(ScrollTrigger)
const container = ref(null)
const grid = ref(null)

onBeforeMount(()=>{ 
    client.getEntries({
        content_type: 'studioWork',
         
    })
    .then((entries)=>{ 
       response.value = entries.items
       console.log(response.value)
    }) 
})

onUpdated(()=>{
    const items = document.getElementById('items').children
})
</script>