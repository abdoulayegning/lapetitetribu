<script setup>
import { ref, defineProps, onBeforeMount, onMounted, onUpdated } from 'vue';
import { createClient } from 'contentful'

const props = defineProps({
  length: Number, 
})

const logos = ref(null)
const clients = ref([])  

const client = createClient({
    space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
    accessToken: import.meta.env.VITE_CONTENTFUL_API_KEY //Only published !!!
    //Preview : yaKRL3ryC8Pr9YLZiDE_tD3L5zGB6CBYxXZzgQkbaLY
})
 
onBeforeMount(()=>{ 
        client.getEntries({
            content_type: 'client',
        })
        .then((entries)=>{
            clients.value = entries.items  
        }) 
})

onUpdated(()=>{
    /*let index = 0  
    
    for (let i = 0; i < logos.value.children.length; i++) {
        const element = logos.value.children[i];
        element.style.opacity = 0
    } 
    logos.value.children[index].style.opacity = 1

    setInterval(()=>{
        if (index >= 0 && index < logos.value.children.length - 1) {
            index++
        } else if(index == logos.value.children.length - 1){
            index = 0
        } 

        for (let i = 0; i < logos.value.children.length; i++) {
            const element = logos.value.children[i];
            element.style.opacity = 0
        } 
        logos.value.children[index].style.opacity = 1

    }, 500)*/

}) 
</script>

<template>
    <div class="container mx-auto font-['DM_Sans'] pt-40 lg:pb-40 pb-10">
        <div class="">
            <div class="w-full text-left text-6xl mb-20 uppercase">
                <div>tissons l'expertise</div>
                <div>la passion et l'innovation pour</div>
                <div>créer des expériences captivantes</div>
            </div>
            <div class="lg:w-full h-72 lg:h-auto relative grid grid-cols-4 gap-6">
                <img style="filter: invert(0);" 
                class="mix-blend-difference lg:w-36 mx-auto " 
                v-for="client in clients" :src="client.fields.logo.fields.file.url" alt=""> 
            </div> 
        </div>
        <!-- <div class="container"> 
            <div>
                <div class="title">Good Friends</div> 
            </div>
            <div class="grid">
                <div class="grid-item" v-for="client in clients"> 
                </div>  
            </div>
        </div> -->
    </div>
<!-- 
    Bienvenue dans le monde de [Le nom de votre studio], 
    où des visions extraordinaires prennent vie grâce à la puissance du partenariat. 
    Nous croyons que la collaboration est la clé pour libérer une créativité sans limites et atteindre des résultats remarquables. 
    Nos clients ne sont pas seulement des clients - ce sont nos précieux partenaires dans une aventure inspirante. 
    À chaque projet que nous entreprenons, nous embarquons dans une exploration commune d'idées, de rêves et de possibilités. 
    Ensemble, nous tissons l'expertise, la passion et l'innovation pour créer des expériences captivantes qui laissent une empreinte durable. 
    Découvrez la véritable essence du partenariat chez [Le nom de votre studio] et embarquez avec nous dans une excitante aventure créative. 
-->
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