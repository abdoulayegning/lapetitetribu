<script setup>
import { onBeforeMount, ref } from 'vue';
import { createClient } from 'contentful'

const client = createClient({
    space: '3dsoyu63dy91',
    accessToken: 'fRA4jX66in_xDQqVFN8_xQNNxc36wHXnT_r9GLWaipI' //Only published !!!
    //Preview : yaKRL3ryC8Pr9YLZiDE_tD3L5zGB6CBYxXZzgQkbaLY
})

onBeforeMount(()=>{
    client.getEntries({
        content_type: 'project'
    })
    .then((entries)=>{
        //console.log(entries.items)
    })
})

</script>

<template>
    <div style="width: 100%; height: 100vh; position: fixed; display: flex; justify-content: center; align-items: center; flex-direction: column;">
        <iframe src="https://giphy.com/embed/VHqNByVFRv1vEmg4qN" width="480" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
        <div style="margin-top: 1em;">Evidemment, on est en contruction !</div>
    </div>
</template>