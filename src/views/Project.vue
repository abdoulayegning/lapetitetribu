<template>
    <div v-if="items"> 
        <div class="mx-auto container"> 
            <div class="font-medium mt-16 text-6xl">{{ items.title }}</div>
            <div class="mt-12 mb-12 grid grid-cols-2">
                <div>
                    <div class=" font-light text-xl font-['DM_Sans'] opacity-40">Client</div>
                    <div class=" font-medium text-2xl font-['DM_Sans']">{{ items.client.fields.name }}</div>
                </div>
                <div>
                    <div class=" font-light text-xl font-['DM_Sans'] opacity-40">Type de projet</div>
                    <div class=" font-medium text-2xl font-['DM_Sans']">{{ items.category }}</div>
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

