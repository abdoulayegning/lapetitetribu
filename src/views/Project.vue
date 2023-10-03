<template>
    <div v-if="items"> 
        <div class="mx-auto container">

            <div class="flex mt-16">
                <div class="w-1/2">
                    <div class="text-black font-['DM_Sans'] w-full text-4xl uppercase mt-0 mb-16 text-left">
                        <span class="border-b-4 border-black">{{items.title}}</span>
                        <h2 class="text-gray-700 font-['DM_Sans'] mt-3">{{items.category}}</h2>  
                    </div>

                    <div class="text-black font-['DM_Sans'] w-full text-4xl uppercase mt-16 mb-16 text-left">
                        <span class="border-b-4 border-black">client</span>
                        <h2 class="text-gray-700 font-['DM_Sans'] mt-3">{{items.client.fields.name}}</h2>  
                    </div>
                </div>

                <div class="text-2xl w-1/2 font-['DM_Sans']"> 
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Suscipit ipsam atque minus quia vel placeat consequatur eaque sunt excepturi nostrum aut, dolorum accusamus nobis nam quas dolore, totam corporis. Vitae? 
                </div>
            </div>  

            <div v-for="block in items.blocks"> 
                <ContentBlock :block="block"/>
            </div> 
            
        </div>
    </div>
</template>

<style scoped>
</style>

<script setup>
import { ref, onBeforeMount, onMounted, onUpdated } from 'vue'; 
import { useRoute, useRouter } from 'vue-router'
import { createClient } from 'contentful' 
import ContentBlock from '../components/ViewProject/ContentBlock.vue';

const router = useRouter()
const route = useRoute()

const client = createClient({
    space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
    accessToken: import.meta.env.VITE_CONTENTFUL_API_KEY //Only published !!!
    //Preview : yaKRL3ryC8Pr9YLZiDE_tD3L5zGB6CBYxXZzgQkbaLY
})
 
const items = ref(null)

onBeforeMount(()=>{
    client.getEntries({
        content_type: 'studioWork',
        'fields.slug': route.params.slug,
    })
    .then((entries)=>{ 
        console.log(entries.items[0].fields) 
        items.value = entries.items[0].fields
    }) 
})
 

onMounted(()=>{  
})

</script>

