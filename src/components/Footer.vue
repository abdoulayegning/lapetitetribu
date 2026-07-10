<template>
   

        <div class="container mx-auto pt-10 pb-10">

            <div class="lg:flex lg:justify-between lg:items-start grid grid-cols-1 gap-4">

                <img class="w-40 h-auto" src="/logo-lpt-black.svg" alt="Logo">
                        
                <div>
                    <div class="opacity-40 mb-4 text-xs">Social</div>
                    <div @click="openURL('https://instagram.com/lapetitetribu.co')">Instagram</div>
                    <div @click="openURL('https://www.linkedin.com/company/11048102/')">LinkedIn</div>
                </div>

                <div>
                    <div class="opacity-40 mb-4 text-xs">Nos produits</div>
                    <div @click="openURL('https://popmyproduct.com/')" class="flex items-center gap-3">
                       <div><img class="w-7" src="/popmyproduct-icon.png" alt=""></div>
                       <div>Pop My Product</div>
                    </div>
                </div>
    
                <!-- <div ref="logotype" class="text-3xl text-center font-['PP_Monument_Extended'] opacity-20">la petite tribu</div> -->
        
                <div v-if="false" class="flex gap-8 lg:flex-row flex-col lg:text-left uppercase text-center justify-start"> 
                    <div @click="openURL('https://instagram.com/lapetitetribu.co')" class="underline">instagram</div>
                    <div @click="openURL('https://www.linkedin.com/company/11048102/')" class="underline">linkedin</div>
                    <div @click="openURL('https://vimeo.com/lapetitetribu')" class="underline">vimeo</div> 
                    <div @click="openURL('https://instagram/lapetitetribu.co')" class="underline">EMAIL</div> 
                </div> 
                
                <div class="lg:text-right">© {{ new Date().getFullYear() }}</div>

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