<template>
    <div class="mt-60 mb-60" v-if="items"> 
        <div class="mx-auto container"> 
            <div class="font-medium text-6xl text-center">{{ items.title }}</div>
            <div class="mt-12 mb-12 grid lg:grid-cols-1 gap-10 text-center">
                <div>
                    <h2 class=" font-light font-['PP_Neue_Machina_Plain'] opacity-40 uppercase text-base">Client</h2>
                    <h1 class=" font-medium text-base font-['PP_Neue_Machina_Plain'] uppercase mt-0">{{ items.client.fields.name }}</h1>
                </div>
                <div>
                    <h2 class=" font-light text-base font-['PP_Neue_Machina_Plain'] opacity-40 uppercase">savoir-faire</h2>
                    <h1 class=" font-medium font-['PP_Neue_Machina_Plain'] uppercase text-base mt-0">{{ items.category }}</h1>
                </div>
            </div>

            <!-- <div v-html="documentToHtmlString(items.content, options)"></div> -->
            <!-- <RenderRichText :document="items"></RenderRichText> -->

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

<style scoped> 
</style>

<script setup>
import { ref, onBeforeMount, onMounted, onUpdated } from 'vue'; 
import { useRoute, useRouter } from 'vue-router'
import { createClient } from 'contentful' 
import ContentBlock from '../components/ViewProject/ContentBlock.vue';
import Footer from '../components/Footer.vue';
// import RenderRichText  from '../components/RenderRichText.vue'
import { BLOCKS } from '@contentful/rich-text-types';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

const RenderAsset = (node)=>{
    
    const title = node.data.target.fields.title
    const type = node.data.target.fields.file.contentType
    const url = node.data.target.fields.file.url

    if (type == "image/jpeg" || type == "image/png" || type == "image/webp" || type == "image/gif") {
        return `<img class="mb-20 mt-20 w-full" src="` + url + `" alt="` + title + `">`
    } else if (type == "video/mp4" || type == "video/webm") {
        // return `<video src="` + url + `" alt="` + title + `">`
        return `<video style="clip-path: inset(1px)" class="mb-20 mt-20" muted autoplay loop playsinline disablePictureInPicture controlsList="nodownload"><source src="` + url + `" type="video/mp4"></video>`
    }

}

const options = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node) => `<div>` + RenderAsset(node) + `</div>`,
    [BLOCKS.PARAGRAPH]: (node, next) => `<div class="text-center font-['DM_Sans'] text-xl lg:w-[70%] mx-auto mt-6 mb-6">${next(node.content)}</div>`
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

onBeforeMount(()=>{
    client.getEntries({
        content_type: 'studioWork',
        'fields.slug': route.params.slug,
    })
    .then((entries)=>{ 
        items.value = entries.items[0].fields
      }) 
})
 

onMounted(()=>{  
})

</script>

