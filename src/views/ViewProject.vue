<template>
    <div> 
        <div ref="title_animation" class="title-animation">{{title}}</div>
        <div v-if="response">
            <div class="video-wrapper"> 
                <div ref="video_item" class="video-item" v-html="iframe"></div> 
                <div ref="text_wrapper" class="text-wrapper"> 
                    <div>
                        <div class="label">Client</div>
                        <div class="content-text">{{ client }}</div> 
                    </div>
    
                    <div>
                        <div class="label">Catégorie</div>
                        <div class="content-text">{{ category }}</div> 
                    </div>
    
                    <div>
                        <div class="label">Rôles</div>
                        <div class="content-text">{{ roles }}</div> 
                    </div> 
                </div>
            </div>
        </div>
        <div class="container">
            <Similar 
            :length=similar_count 
            :category=category>
        </Similar>
        </div>
    </div>
</template>

<style scoped>
    .title-animation {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        z-index: 100;
        font-size: 8vw; 
        white-space: nowrap;
        clip-path: inset(0 0);
    }
    .label {
        text-transform: uppercase;
        margin-top: 0.35rem;
        margin-bottom: 0.35rem;
    }

    .content-text{
        text-transform: uppercase;
        font-weight: 700;
    }
    .text-wrapper {
        width: var(--video-width); 
        margin: 1rem 0 1rem 0;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr ;
    }
    .text-wrapper div {
        width: 100%;
    } 
    .video-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 100%; 
        position: relative;
        border: 1px solid red;
        margin-top: 3rem;
    } 
    .video-item { 
        width: var(--video-width);
    }
</style>

<script setup>
import { ref, onBeforeMount, onMounted, onUpdated } from 'vue'; 
import { useRoute, useRouter } from 'vue-router'
import { createClient } from 'contentful'
import gsap from 'gsap'
import SplitType from 'split-type' 
import Similar from '../components/Projects/Similar.vue';

const router = useRouter()
const route = useRoute()

const contentfulClient = createClient({
    space: '3dsoyu63dy91',
    accessToken: 'fRA4jX66in_xDQqVFN8_xQNNxc36wHXnT_r9GLWaipI' //Only published !!!
    //Preview : yaKRL3ryC8Pr9YLZiDE_tD3L5zGB6CBYxXZzgQkbaLY
})

let video_item = ref(null)
let text_wrapper = ref(null)
let response = ref(false)
const similar_count = 3

let title = ref(null)
let client = ref(null)
let category = ref(null)
let iframe = ref(null)
let roles = ref(null)

const title_animation = ref(null)  

onBeforeMount(()=>{
    contentfulClient.getEntries({
        content_type: 'project',
        'fields.slug': route.params.slug,
    })
    .then((entries)=>{ 
        category.value = entries.items[0].fields.category[0]  
        title.value = entries.items[0].fields.title  
        iframe.value = entries.items[0].fields.iframe.content[0].content[0].value
        client.value = entries.items[0].fields.client.fields.name
        roles.value = entries.items[0].fields.roles 
        response.value = true  
 
    }) 
})

onUpdated(()=>{

    gsap.set(video_item.value, {opacity: 0})
    gsap.set(text_wrapper.value, {opacity: 0})

    SplitType.create(title_animation.value, { types: 'chars' }) 
    const textHeight = title_animation.value.getBoundingClientRect().height
    gsap.fromTo('.char', {y: textHeight}, {y: 0, stagger: 0.05, duration: 1, ease: 'power4'}) 
    gsap.to('.char', {y: -textHeight, stagger: 0.05, duration: 1, ease: 'power4', delay: 2, onComplete:()=>{
        let tl = gsap.timeline() 
        tl.fromTo(video_item.value, {opacity: 0, y: 10}, {opacity: 1, y:0 })
        tl.fromTo(text_wrapper.value, {opacity: 0, y: 10}, {opacity: 1, y:0 }, 0.25)
    }}) 
})

onMounted(()=>{  
})

</script>

