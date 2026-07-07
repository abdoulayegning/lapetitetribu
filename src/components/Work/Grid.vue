<script setup>
import { useRoute, useRouter } from 'vue-router';
import { ref, defineProps, onBeforeMount, onUpdated, onMounted, nextTick, watch } from 'vue';
import { createClient } from 'contentful'
import gsap from 'gsap'

const route = useRoute();
const router = useRouter();
const props = defineProps({
    length: {
        type: String,
        default: 'all'
    }
})

const renderedProjects = ref(null)
const projects = ref(null)

const client = createClient({
    space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
    accessToken: import.meta.env.VITE_CONTENTFUL_API_KEY //Only published !!!
})
 




onBeforeMount(()=>{
    client.getEntries({
        content_type: 'studioWork',
    })
    .then((entries)=>{
        projects.value = entries.items 
        if(props.length != 'all'){
            const shuffledProjects = shuffleArray(projects.value)
            projects.value = shuffledProjects.slice(0, 2)
        }
    })
})

const OnHover = (e)=>{   
    if (e.target.children[1]) {
        const video = e.target.children[1];
        video.style.display = 'block'
        video.play()   
    }
 } 

const OnLeave = (e)=>{ 
    if (e.target.children[1]) {
        const video = e.target.children[1];
        video.style.display = 'none'
        video.pause()   
    }

}

const shuffleArray = (array) => {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
}
    
const go_to = (path)=>{
    const content_homepage = document.getElementById('main-content')
    if(content_homepage){
        gsap.to(content_homepage, {opacity: 0, onComplete: ()=>{
            router.push('/' + path)
        }})
    }
}

const OnHoverWrapper = (e)=>{ 
    // gsap.to(e.target, {scale: 0.95, ease: 'expo.out', y: -10})
    const text = e.target.children[1].children[0]
    // gsap.to(text, {scale: 1.1, x: 10, ease: 'expo.out'})
}

const OnLeaveWrapper = (e)=>{
    // gsap.to(e.target, {scale: 1, ease: 'expo.out'}) 
    const text = e.target.children[1].children[0]
    gsap.to(text, {scale: 1.0, x: 0, ease: 'expo.out'})
}


// watch(projects, async(newProjects)=>{
//     await nextTick()
//     if(newProjects && newProjects.length > 0){
//         if(newProjects.length % 2 != 0){ 
//             renderedProjects.value.children[renderedProjects.value.children.length - 1].classList.add('lg:col-span-2', 'aspect-auto')
//         }
//     }   
// })

onMounted(async()=>{
    
})

</script>

<template> 
<div class="mt-10 mb-10" id="work">
    <div class="mx-auto container"> 
        <div class="grid lg:grid-cols-2 gap-8" ref="renderedProjects">

            <div v-if="projects" @mouseenter="OnHoverWrapper" @mouseleave="OnLeaveWrapper" @click="go_to(p.fields.slug)" class="p-0 bg-gray-200/0 cursor-pointer relative rounded-md" v-for="p in projects"> 

                <div @mouseenter="OnHover" @mouseleave="OnLeave" class="aspect-video w-full relative brightness-75">
                    <img class="w-full h-full object-cover rounded-none" :src="p.fields.imageThumbnail.fields.file.url" alt="">
                    <video class="w-full h-full object-cover rounded-none absolute top-0 left-0 hidden" preload="metadata" muted nocontrols playsInline loop v-if="p.fields.videoThumbnail">
                        <source :src="p.fields.videoThumbnail.fields.file.url">
                    </video>
                </div>

                <div class="text-black mt-4">  
                    <div class="text-sm">{{ p.fields.title }} <span class="mr-1 ml-1">→</span> <span class="opacity-30">{{ p.fields.client.fields.name }}</span></div>
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