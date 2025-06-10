
<template>

    <div class="mx-auto container pt-1 pb-1">

        <div class="lg:flex flex-col items-center justify-center">

            <p class="mt-1 text-center hidden">
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
 

        <div ref="target" class="grid grid-cols-7">
            <img v-for="client in clients" class="invert justify-items-center" :src="client.url" alt="">
        </div>

     </div> 

</template>

<script setup>
import { ref, defineProps, onBeforeMount, onMounted, onUpdated } from 'vue';
import { createClient } from 'contentful'
import Splitting from 'splitting'
import gsap from 'gsap';
import KeenSlider from 'keen-slider'
import { Carousel, Slide } from 'vue-carousel';

const client = createClient({
    space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
    accessToken: import.meta.env.VITE_CONTENTFUL_API_KEY //Only published !!!
    //Preview : yaKRL3ryC8Pr9YLZiDE_tD3L5zGB6CBYxXZzgQkbaLY
})

const clients = ref([])
const rainbowText = ref(null)
const target = ref(null)

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

let slider = null

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

    slider = KeenSlider(target.value, {
        loop: true,
        slidesPerView: 3,
        spacing: 10,
        breakpoints: {
            '(min-width: 768px)': {
                slidesPerView: 4,
                spacing: 15,
            },
            '(min-width: 1024px)': {
                slidesPerView: 5,
                spacing: 20,
            },
        },
    })

})

onUpdated(()=>{
     slider.update()
})
</script>
 