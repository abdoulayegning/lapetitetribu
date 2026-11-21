<template>
    <div class="keen-slider font-['DM_Sans']" ref="wrapper">
        <div v-for="item in list" class="keen-slider__slide text-center pr-6 pl-6">
            <div class="mb-4">{{item.text}}</div>

            <div class="flex gap-3">
                <div class="border w-20 h-20">
                    <img class="w-full h-full object-cover" style="clip-path: circle(30px);" :src="item.image" alt="">
                </div>
                <div>
                    <div>{{item.name}}</div>
                    <div>{{item.position}}</div>
                    <div>{{item.company}}</div>
                </div>
            </div>

        </div> 
    </div>
</template>

<script setup>
import KeenSlider from 'keen-slider'
import { onMounted, ref } from 'vue';
const wrapper = ref(null)
const list = [
    {
        name: 'lorem ipsum', 
        company: 'lorem ipsum', 
        position: 'lorem ipsum', 
        image: '/dingding.png', 
        text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi saepe nisi ipsam architecto voluptate maiores, dolores fugit alias, tenetur, pariatur quisquam rerum suscipit asperiores amet illum iusto reprehenderit? Animi, impedit.`
    },
    {
        name: 'lorem ipsum', 
        company: 'lorem ipsum', 
        position: 'lorem ipsum', 
        image: '/dingding.png', 
        text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi saepe nisi ipsam architecto voluptate maiores, dolores fugit alias, tenetur, pariatur quisquam rerum suscipit asperiores amet illum iusto reprehenderit? Animi, impedit.`
    },
    {
        name: 'lorem ipsum', 
        company: 'lorem ipsum', 
        position: 'lorem ipsum', 
        image: '/dingding.png', 
        text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi saepe nisi ipsam architecto voluptate maiores, dolores fugit alias, tenetur, pariatur quisquam rerum suscipit asperiores amet illum iusto reprehenderit? Animi, impedit.`
    },
    {
        name: 'lorem ipsum', 
        company: 'lorem ipsum', 
        position: 'lorem ipsum', 
        image: '/dingding.png', 
        text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi saepe nisi ipsam architecto voluptate maiores, dolores fugit alias, tenetur, pariatur quisquam rerum suscipit asperiores amet illum iusto reprehenderit? Animi, impedit.`
    },
    {
        name: 'lorem ipsum', 
        company: 'lorem ipsum', 
        position: 'lorem ipsum', 
        image: '/dingding.png', 
        text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi saepe nisi ipsam architecto voluptate maiores, dolores fugit alias, tenetur, pariatur quisquam rerum suscipit asperiores amet illum iusto reprehenderit? Animi, impedit.`
    },
]

let slider = null

onMounted(()=>{
    slider = new KeenSlider(
    wrapper.value,
    {
        slides: {
            perView: 3,
            spacing: 90
        },
        loop: true,
        created: () => {
        // console.log('created')
        },
    },
    [
        // add plugins here
    ]
)
})
</script>