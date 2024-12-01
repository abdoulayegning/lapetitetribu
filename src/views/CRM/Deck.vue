<template>
    <div class="pt-32 mx-auto container">
        <div>Téléchargements du Deck</div>
        <div v-if="downloads">
            <div v-for="d in downloads" class="flex gap-3 bg-gray-200 pt-3 pb-3 pl-3 pr-3 mt-1 mb-1">
                <div class="w-1/3">{{d.fullname}}</div>
                <div class="w-1/3">{{d.email}}</div>
                <div class="w-1/3">{{d.date}}</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { getDeckDownloadList } from '../../js/firebase';
const downloads = ref(null)
onMounted(() => {
    getDeckDownloadList(downloads);
});
</script>