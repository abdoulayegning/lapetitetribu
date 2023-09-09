<template>

    {{ block.fields.columns }}

    <div class="pt-6 pb-6" v-if="block.fields.contentType[0] == 'Embed'">  
        <div v-html="block.fields.embedVideo.content[0].content[0].value"></div>
    </div>

    <div v-else-if="block.fields.contentType[0] == 'Media'">
        
    </div>

</template>

<script setup>
const props = defineProps({
    block: Array,  
})
</script>