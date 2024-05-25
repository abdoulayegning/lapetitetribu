<script setup>
import { ref, defineProps, onBeforeMount, onMounted, onUpdated } from 'vue';
import { createClient } from 'contentful'
 
const client = createClient({
    space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
    accessToken: import.meta.env.VITE_CONTENTFUL_API_KEY //Only published !!!
    //Preview : yaKRL3ryC8Pr9YLZiDE_tD3L5zGB6CBYxXZzgQkbaLY
})

const clients = ref([])

onBeforeMount(()=>{
    client.getEntries({
        content_type: 'client',
        // limit: props.length 
    })
    .then((entries)=>{
        //check which one has an logo !!
        entries.items.forEach(item => {
        if(item.fields.logo){
            clients.value.push(
                {url:item.fields.logo.fields.file.url, alt:item.fields.logo.fields.title}
            )
        }
       })
    })
}) 
</script>

<template>
    <div class="mx-auto container pt-28 pb-28">
            <h1 class="font-['PP_Monument_Extended'] lg:text-8xl text-center">Friends & Folks</h1>
            <div class="grid grid-cols-3 lg:grid-cols-7 justify-items-end">
                <img v-for="client in clients" class="invert justify-items-center" :src="client.url" alt="">
            </div>
            <div class="lg:flex justify-center">
                <p class="mt-6 lg:w-[70%] font-['DM_Sans'] text-center text-3xl">
                    <!-- Laissez libre cours à votre imagination et décrivez-nous votre vision. Plus vous serez audacieux dans vos descriptions, plus nous pourrons vous surprendre avec des solutions innovantes et hors du commun. -->
                    Nous sommes impatients de vous avoir comme partenaire et de collaborer avec vous pour créer quelque chose de vraiment spectaculaire. 🚀✨
                </p>
            </div>
     </div> 
</template>

<style scoped> 
.remove-grid-item {
    display: none;
}
.wrapper {
    background-color: rgb(24, 24, 24);
    padding-bottom: 5rem;
    padding-top: 5rem;
} 
.title {
    color: white;
    font-size: 3vw;
    text-transform: uppercase;
    text-align: center; 
    display: none;
} 
</style>