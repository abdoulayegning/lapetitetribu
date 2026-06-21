<template>
    <div class="mt-60 mb-60" v-if="items"> 
        <div class="mx-auto container"> 
            <div class="font-light text-6xl text-center">{{ items.title }}</div>
            <div class="mt-12 mb-12 grid lg:grid-cols-1 gap-10 text-center">
                <div>
                    <h2 class="font-light opacity-40 text-base">Client</h2>
                    <h1 class="text-base mt-0">{{ items.client.fields.name }}</h1>
                </div>
                <div>
                    <h2 class="text-base opacity-40">Savoir-faire</h2>
                    <h1 class="text-base mt-0">{{ items.category }}</h1>
                </div>
            </div> 

            <!-- If there is a Vimeo or Youtube Iframe -->
            <div class="" v-if="items.embed">
                <div v-html="items.embed"></div>
            </div>
            
            <div class="" v-if="items.content">
                <div v-html="documentToHtmlString(items.content, options)"></div>
            </div>


            <div v-else>
                <!-- Only if CONTENT OBJECT doesn't exist -->
                <div v-for="block in items.blocks"> 
                    <ContentBlock :block="block"/>
                </div> 
            </div>

 
        </div>
    </div>

    <Footer></Footer>
</template>
 
<script setup>
import { ref, onBeforeMount, onMounted, onUpdated, nextTick } from 'vue'; 
import { useRoute, useRouter } from 'vue-router'
import { createClient } from 'contentful' 
import ContentBlock from '../components/ViewProject/ContentBlock.vue';
import Footer from '../components/Footer.vue';
// import RenderRichText  from '../components/RenderRichText.vue'
import { BLOCKS, MARKS } from '@contentful/rich-text-types';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

//gsap
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const RenderAsset = (node)=>{
    
    const title = node.data.target.fields.title
    const type = node.data.target.fields.file.contentType
    const url = node.data.target.fields.file.url

    if (type == "image/jpeg" || type == "image/png" || type == "image/webp" || type == "image/gif") {
        return `<img class="mb-3 mt-3 w-full" src="` + url + `" alt="` + title + `">`
    } else if (type == "video/mp4" || type == "video/webm") {
        return `<video style="clip-path: inset(1px)" class="mb-3 mt-3" muted autoplay loop playsinline disablePictureInPicture controlsList="nodownload"><source src="` + url + `" type="video/mp4"></video>`
    }

}

const options = {
  renderMark: {
    [MARKS.BOLD]: (text) => `<span class="font-['PP_Bold']">${text}</span>`,
    [MARKS.ITALIC]: (text) => `<em class="italic">${text}</em>`,
    [MARKS.UNDERLINE]: (text) => `<span class="underline">${text}</span>`,
    [MARKS.CODE]: (text) => `<code class="px-1 bg-gray-100 rounded">${text}</code>`,
  },

  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node) => `<div data-asset>` + RenderAsset(node) + `</div>`,
    [BLOCKS.PARAGRAPH]: (node, next) => `<div class="text-center text-xl lg:w-[70%] mx-auto mt-16 mb-16">${next(node.content)}</div>`
   }
}

const router = useRouter()
const route = useRoute()

const client = createClient({
    space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
    accessToken: import.meta.env.VITE_CONTENTFUL_API_KEY //Only published !!!
    //Preview : yaKRL3ryC8Pr9YLZiDE_tD3L5zGB6CBYxXZzgQkbaLY
})
 
const items = ref(null)
 

onMounted(()=>{  

    client.getEntries({
        content_type: 'studioWork',
        'fields.slug': route.params.slug,
    })
    .then(async(entries)=>{ 
        items.value = entries.items[0].fields
        await nextTick()
        // all data-asset
        const assets = document.querySelectorAll('[data-asset]')
        console.log('assets', assets)
        assets.forEach((asset)=>{
            gsap.fromTo(asset, {opacity: 0, y: 150}, {opacity: 1, y: 0, duration: 1, scrollTrigger: {
                trigger: asset, 
                scrub: false
            }})
        })
    }) 
    
})

</script>

