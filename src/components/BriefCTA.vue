<template>
    <div ref="button" @pointerleave="onLeave" @pointerenter="onEnter" @click="goto('/brief')" 
    class="fixed lg:flex hidden justify-center items-center gap-2 cursor-pointer uppercase tracking-wider text-base bottom-4 right-4 z-[1000] rotate-2 bg-[#08ff08] pl-5 pr-5 pt-1 pb-1 rounded-full">
        <div class="w-4">
            <svg ref="star" class="w-full" width="20" height="20" viewBox="0 0 165 165" fill="none" xmlns="http://www.w3.org/2000/svg">
             <path d="M82.3333 0L56.6042 56.6042L0 82.3333L56.6042 108.062L82.3333 164.667L108.062 108.062L164.667 82.3333L108.062 56.6042" fill="black"/>
            </svg> 
        </div>
        <div>
            Un projet ? <span class="underline">Cliquez ici !</span>
        </div>
    </div>
    <div class="fixed w-full h-full z-[1000] top-0 left-0 pointer-events-none" ref="text">
        <div class="font-['PP_Monument_Extended'] font-light text-4xl w-2/3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center" v-html="Splitting.html({content: 'Hey ! Nous aimerions en savoir + sur ce sur quoi vous travaillez pour nous assurer que nous sommes le partenaire idéal.', by: 'words'})"></div>
    </div>
    <div ref="background" class="fixed bg-[#08ff08] w-0 h-full z-[999]">
    </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import gsap from 'gsap';
import Splitting from 'splitting';
const router = useRouter()
const button = ref(null)
const star = ref(null)
const text = ref(null)
const background = ref(null)

const onEnter = ()=>{ 
    let tl = gsap.timeline({
        defaults: {
            ease: 'elastic.out'
        },
        onComplete: ()=>{
            // background.value.style = 'block'
            // animateTextIn()
        }
    })
    // tl.to(background.value, {width: "100%", ease: 'expo.out'})
    tl.to(button.value, { background: 'black', paddingRight: '2rem', paddingLeft: '2rem', paddingTop: '1rem', paddingBottom: '1rem', ease:'expo.out', color: '#08ff08'}, 'start')
    tl.to(button.value.children[0].children[0].children[0], {fill:  '#08ff08'}, 'start')   
    // tl.totalProgress(1).kill()
}

const animateTextIn = ()=>{
    let textTL = gsap.timeline({
        defaults: {
            duration: 0.65,
            // ease: 'expo.inOut'
            ease: 'steps(2)'
        }
    })
    let children = text.value.children[0].children[0].children
    for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (child.className == 'word') {
            textTL.fromTo(child, {x: -60, opacity: 0}, {x: 0, opacity: 1}, i/100)
        }
    }
}

const animateTextOut = ()=>{
    let textTL = gsap.timeline({
        defaults: {
            duration: 0.25,
            // ease: 'expo.inOut'
            ease: 'steps(2)'
        }
    })
    let children = text.value.children[0].children[0].children
    for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (child.className == 'word') {
            textTL.to(child, {x: -60, opacity: 0}, i/100)
        }
    }
}

const initializeText = ()=>{ 
    let children = text.value.children[0].children[0].children
    for (let i = 0; i < children.length; i++) {
        const child = children[i]; 
        gsap.set(child, {x: -60, opacity: 0}) 
    }
}

const customizeText = ()=>{
    let children = text.value.children[0].children[0].children
 }

const onLeave = ()=>{ 
    let tl = gsap.timeline({
        defaults: {
            ease: 'elastic.out'
        },
        onStart: ()=>{
            // animateTextOut()
        }
    })
    // tl.to(background.value, {width: "0%", ease: 'expo.in'})
    tl.to(button.value, {color: 'black', paddingRight: '1.25rem', paddingLeft: '1.25rem', paddingTop: '0.25rem', paddingBottom: '0.25rem', background: '#08ff08'}, 'start')
    tl.to(button.value.children[0].children[0].children[0], {fill:  '#000'}, 'start')   
}

const goto = (path)=>{
    let tl = gsap.timeline({
        onComplete: ()=>{
            router.push(path)
        }
    })
    let main_content = document.getElementById("main-content")
    if (main_content) {
        tl.to(main_content, {opacity: 0})
    }
}

onMounted(()=>{
    initializeText()
    customizeText()
    gsap.to(star.value, {rotate: 360, duration: 10, transformOrigin: 'center center', repeat: -1})
})
</script>