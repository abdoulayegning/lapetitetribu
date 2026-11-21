<template>
    <div class="flex flex-col gap-2 items-center justify-center w-full h-full  pl-10 pr-10">
        <div :style="'background-color: ' + color + ';'" class="rounded-none w-full h-10 flex items-center justify-center text-black bg-blend-difference text-xs" v-for="color in colors">
            {{ color }}
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    colors: Array
})
</script>