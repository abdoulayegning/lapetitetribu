<template>
   

        <div class="container mx-auto pt-0 pb-10">

            <div class="flex justify-between items-center gap-4">
                
                <button @click="openDialog" class="uppercase text-center rounded-[10px] mb-3 flex gap-4 items-center">
                    <img class="w-4" src="/download.svg" alt="">
                    Télécharger le deck
                </button>
    
                <!-- <div ref="logotype" class="text-3xl text-center font-['PP_Monument_Extended'] opacity-20">la petite tribu</div> -->
        
                <div class="flex gap-8 lg:flex-row flex-col lg:text-left uppercase text-center justify-start"> 
                    <div @click="openURL('https://instagram.com/lapetitetribu.co')" class="underline">instagram</div>
                    <div @click="openURL('https://www.linkedin.com/company/11048102/')" class="underline">linkedin</div>
                    <div @click="openURL('https://vimeo.com/lapetitetribu')" class="underline">vimeo</div> 
                    <div @click="openURL('https://instagram/lapetitetribu.co')" class="underline">EMAIL</div> 
                </div> 
                
                <div class="lg:text-right text-center">© {{ new Date().getFullYear() }}</div>

            </div>

        </div> 
 
</template>

<script setup>
import { addNewDeckDownload } from '../js/firebase'
import gsap from 'gsap';

const openDialog = ()=>{
    let target = document.getElementById('deck-wrapper')
    gsap.to(target, {rotate: 80, x: window.innerWidth/4, ease:'expo.in', duration: .85, 

        onComplete: ()=>{
            target.style.display = 'none'
            gsap.fromTo(document.getElementById('dialog-wrapper'), {y: window.innerHeight}, {y: 0, ease: 'expo.out', duration: 1.3, onStart:()=>{
                document.getElementById('dialog-wrapper').style.display = 'flex'
            }})
        },
        
        onStart: ()=>{
            // target.style.display = 'none'
        },

    })
}

const openURL = (url)=>{
    window.open(url)
}
</script>

<!-- <script setup>
import { onMounted } from 'vue';
import {gsap} from 'gsap'
 

const openURL = (url)=>{
    window.open(url)
}

onMounted(()=>{
    const socialLinks = document.querySelectorAll('.social-link')

    
    for (let i = 0; i < socialLinks.length; i++) {
        const s = socialLinks[i];
        s.addEventListener('pointerenter', ()=>{
            gsap.to(s, {backgroundColor: 'black'})
            gsap.to(s.children[0], {color: 'white'})
            gsap.to(s.children[1], {rotate: 360, transformOrigin: 'center center'})
            gsap.to('path', {fill: 'white'})
        })
        s.addEventListener('pointerleave', ()=>{
            gsap.to(s, {backgroundColor: 'transparent'})
            gsap.to(s.children[0], {color: 'black'})
            gsap.to(s.children[1], {rotate: 0, transformOrigin: 'center center'})
            gsap.to('path', {fill: 'black'})
        })
    }
})
</script> -->