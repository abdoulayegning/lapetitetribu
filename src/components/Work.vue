<template>
    <div class="container mx-auto" ref="container"> 

        <div class="grid grid-cols-2 gap-5">

            <div class="font-['DM_Sans'] cursor-pointer relative first:col-span-2 last:col-span-2" v-for="i,j in response"> 
                <div class=" border-red-600 relative bg-black rounded-[40px]"> 
                    <img v-if="i.fields.imageThumbnail" class="opacity-70 w-full h-[65vh] object-cover rounded-[40px]" :src="i.fields.imageThumbnail.fields.file.url" alt=""> 
                    <img v-else class="opacity-50 w-full h-[65vh] object-cover rounded-[40px]" src="https://picsum.photos/2000/2000" alt=""> 
                </div> 
                <div class="text-white uppercase mt-4 text-xl absolute z-40 bottom-10 left-10">
                    <h1>{{i.fields.title}}</h1>
                    <h2 class="text-gray-400 font-['PP_Neue_Machina_Plain']">{{i.fields.category}}</h2>  
                </div>
            </div>  

        </div>

    </div>
</template>

<script setup>
import { onBeforeMount, onMounted, ref } from 'vue';
import { gsap, ScrollTrigger } from 'gsap/all' 
import { createClient } from 'contentful'

const client = createClient({
    space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
    accessToken: import.meta.env.VITE_CONTENTFUL_API_KEY //Only published !!!
    //Preview : yaKRL3ryC8Pr9YLZiDE_tD3L5zGB6CBYxXZzgQkbaLY
})

const response = ref(null)

gsap.registerPlugin(ScrollTrigger)
const container = ref(null)

onBeforeMount(()=>{ 
    client.getEntries({
        content_type: 'studioWork',
    })
    .then((entries)=>{ 
       response.value = entries.items
       console.log(response.value)
    }) 
})

onMounted(()=>{ 
})
</script>