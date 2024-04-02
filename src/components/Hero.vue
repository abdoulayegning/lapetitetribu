<template>
    <div class="text-center flex justify-center items-center flex-col pt-32 pb-24">
        <div class="text-[9.5vw] font-['PP_Monument_Extended']">la petite tribu</div>
        <div class="lg:w-[50%] text-2xl">
            <span class="font-bold">Studio digital</span> basé à Dakar, Sénégal. 
            Nous créons des <span class="font-bold">expériences digitales interactives</span> 
            pour les marques ambitieuses, <span class="underline">innovantes</span> et surtout <span class="italic">audacieuses</span> !
        </div>
    </div>
    <div ref="keen" class="keen-slider whitespace-nowrap">
        <div class="keen-slider__slide bg-slate-400 h-[140px]" v-for="(i,index) in [0,1,2,3,4,5,6,7,8,9]">
            <div v-if="index == 3"><img src="../assets/carrefour.png" alt=""></div>
            <div v-if="index == 0"><video class="w-full h-full object-cover" muted autoplay loop src="../assets/value.mp4"></video>></div>
            <div v-if="index == 6"><video class="w-full h-full object-cover" muted autoplay loop src="../assets/dc.mp4"></video>></div>
        </div> 
    </div>
</template>

<script setup>
import KeenSlider from 'keen-slider'
import {ref, onMounted} from 'vue'
const keen = ref(null)
onMounted(()=>{
    var animation = { duration: 25000, easing: (t) => t }
    var slider = new KeenSlider(
    keen.value,
    {
        loop: true,
        renderMode: "performance",
        drag: false,
        slides: { origin: "center", perView: 4.5, spacing: 15 },
        // range: {
        //   min: -5,
        //   max: 5,
        // },
        created(s) {
          s.moveToIdx(5, true, animation)
        },
        updated(s) {
          s.moveToIdx(s.track.details.abs + 5, true, animation)
        },
        animationEnded(s) {
          s.moveToIdx(s.track.details.abs + 5, true, animation)
        },
    },
    [
        // add plugins here
    ]
    )
})
</script>