<template>
    <div class="mt-60 mb-60" v-if="items"> 
        <div class="mx-auto container"> 
            <div class="font-medium text-6xl text-center">{{ items.title }}</div>
            <div class="mt-12 mb-12 grid lg:grid-cols-2 text-center">
                <div>
                    <h2 class=" font-light text-xl font-['DM_Sans'] opacity-40">Client</h2>
                    <h1 class=" font-medium text-xl font-['DM_Sans'] ">{{ items.client.fields.name }}</h1>
                </div>
                <div>
                    <h2 class=" font-light text-xl font-['DM_Sans'] opacity-40">Type de projet</h2>
                    <h1 class=" font-medium text-xl font-['DM_Sans'] ">{{ items.category }}</h1>
                </div>
            </div>
            <!-- <div v-html="documentToHtmlString(items.content, options)"></div> -->
            <!-- <RenderRichText :document="items"></RenderRichText> -->
             <div v-for="block in items.blocks"> 
                <ContentBlock :block="block"/>
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
    if (type == "image/jpeg" || type == "image/png" || type == "image/webm" || type == "image/gif") {
        return `<img src="` + url + `" alt="` + title + `">`
    } else if (type == "video/mp4") {
        // return `<video src="` + url + `" alt="` + title + `">`
            return `<video muted autoplay loop playsinline disablePictureInPicture controlsList="nodownload"><source src="` + url + `" type="video/mp4"></video>`
    }
}

const options = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node) => `<div>` + RenderAsset(node) + `</div>`
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
        console.log(items.value.content)
     }) 
})
 

onMounted(()=>{  
})

</script>

