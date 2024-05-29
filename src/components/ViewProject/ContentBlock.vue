<template> 

    <div class="embed-block" v-if="block.fields.contentType[0] == 'Embed'">  
         <div v-html="block.fields.embed.content[0].content[0].value"></div>
    </div>

    <div class="media-block" v-else-if="block.fields.contentType[0] == 'Media'">
        <video playsinline="true" muted autoplay loop :src="block.fields.media.fields.file.url"></video>
        <!-- {{block.fields.media.fields.file.url}} -->
    </div>

    <!-- Rich Text -->
    <div class="text-block" v-else-if="block.fields.contentType[0] == 'Text'">
        <!-- <div class="text-center font-['DM_Sans'] font-normal text-xl lg:pr-32 lg:pl-32" v-for="node in block.fields.text.content">
            <div v-for="n in node.content" class="pt-2 pb-2">
                
                <div v-if="n.nodeType == 'text'">
                    <div v-html="n.value"></div>
                </div> 
                
                <div class="text-base" v-if="n.nodeType == 'hyperlink'">  
                    <a class=" pr-0 pl-0 pt-1 pb-1 rounded-none border-b border-black uppercase font-['PP_Neue_Machina_Plain'] " :href="n.data.uri">{{ n.content[0].value }}</a>
                </div> 
                
            </div> 
        </div> -->
        <div style="text-align: center; font-size: 24px; font-family: DM Sans;" v-html="documentToHtmlString(block.fields.text)"></div>
        <!-- <div style="" v-html="getRichTextEntityLinks(block.fields.text)"></div> -->
        <!-- {{ documentToHtmlString(block.fields.text) }} -->
    </div> 


</template>

<script setup>
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { BLOCKS, MARKS } from '@contentful/rich-text-types';
import { getRichTextEntityLinks } from '@contentful/rich-text-links';
import { onMounted } from 'vue';

const props = defineProps({
    block: Object,  
})
onMounted(()=>{
     
})
</script>

<style scoped>
.embed-block {
    @apply mt-6 mb-6
}

.media-block {
    @apply mt-6 mb-6 w-full
}
.media-block video {
    width: 100%;
}
.text-block {
    @apply mt-16 mb-16 
}
</style>