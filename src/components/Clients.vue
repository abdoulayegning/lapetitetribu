<script setup>
import { ref, defineProps, onBeforeMount, onMounted, onUpdated } from 'vue';
import { createClient } from 'contentful'
import Splitting from 'splitting'
import gsap from 'gsap';

const client = createClient({
    space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
    accessToken: import.meta.env.VITE_CONTENTFUL_API_KEY //Only published !!!
    //Preview : yaKRL3ryC8Pr9YLZiDE_tD3L5zGB6CBYxXZzgQkbaLY
})

const clients = ref([])
const rainbowText = ref(null)

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

onMounted(()=>{
    let rainbow = gsap.timeline({repeat: -1, yoyo: true})

    const chars = rainbowText.value.children[0].children[0].children

    for (let i = 0; i < chars.length; i++) {
        const el = chars[i];
        rainbow.fromTo(el, {color: 'black'}, {color: 'red'}, i/10)  
        rainbow.fromTo(el, {color: 'green'}, {color: 'blue'}, (i/10) + 0.35)  
        rainbow.fromTo(el, {color: 'purple'}, {color: 'orange'}, (i/10) + 0.4)  
        rainbow.fromTo(el, {color: 'pink'}, {color: 'black'}, (i/10) + 0.45)  
    } 

 })
</script>

<template>
    <div class="mx-auto container pt-10 pb-10">
        <div class="lg:flex flex-col items-center justify-center">
            <p class="mt-6 lg:w-[70%] font-['DM_Sans'] text-center lg:text-3xl text-xl">
                <!-- Laissez libre cours à votre imagination et décrivez-nous votre vision. Plus vous serez audacieux dans vos descriptions, plus nous pourrons vous surprendre avec des solutions innovantes et hors du commun. -->
                Nous sommes impatients de vous avoir comme partenaire et de collaborer avec vous pour créer quelque chose de vraiment <span ref="rainbowText" v-html="Splitting.html({content:`authentique`, by:'chars'})"></span>. 🚀✨
            </p>
            
            <div v-if="false" ref="button" @pointerleave="onLeave" @pointerenter="onEnter" @click="goto('/brief')" 
            class="flex lg:hidden justify-center items-center gap-2 cursor-pointer uppercase tracking-wider text-base rotate-0 bg-[#08ff08] pl-5 pr-5 pt-2 pb-2 rounded-full mt-5">
                <div class="w-4">
                    <svg ref="star" class="w-full" width="20" height="20" viewBox="0 0 165 165" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M82.3333 0L56.6042 56.6042L0 82.3333L56.6042 108.062L82.3333 164.667L108.062 108.062L164.667 82.3333L108.062 56.6042" fill="black"/>
                    </svg> 
                </div>
                <div class="leading-none">
                    Un projet ? <span class="underline">Cliquez ici !</span>
                </div>
            </div>

        </div>
        <div class="grid grid-cols-3 lg:grid-cols-7 justify-items-end">
            <img v-for="client in clients" class="invert justify-items-center" :src="client.url" alt="">
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