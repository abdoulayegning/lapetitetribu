<template> 

    <div class="embed-block" v-if="block.fields.contentType[0] == 'Embed'">  
         <div v-html="block.fields.embed.content[0].content[0].value"></div>
    </div>

    <div class="media-block" v-else-if="block.fields.contentType[0] == 'Media'">
        <video playsinline="true" muted autoplay loop :src="block.fields.media.fields.file.url"></video>
        <!-- {{block.fields.media.fields.file.url}} -->
    </div>

    <div class="text-block" v-else-if="block.fields.contentType[0] == 'Text'">
        <div class="lg:w-3/4 font-['DM_Sans'] font-normal text-2xl" v-for="node in block.fields.text.content">
             <div v-for="n in node.content">

                <div v-if="n.nodeType == 'text'">
                    <div v-html="n.value"></div>
                </div> 

                <div class="text-base tracking-wide mt-5" v-if="n.nodeType == 'hyperlink'">  
                    <a class=" pr-0 pl-0 pt-1 pb-1 rounded-none border-b border-black uppercase font-['PP_Neue_Machina_Plain'] " :href="n.data.uri">{{ n.content[0].value }}</a>
                </div> 
                
            </div> 
        </div>
    </div> 

</template>

<script setup>
const props = defineProps({
    block: Object,  
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