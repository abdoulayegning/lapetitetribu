<template>
    <!-- <div class="container mx-auto pt-32 pb-32">
        <div class="uppercase grid grid-cols-1 lg:grid-cols-3 text-2xl gap-3">
            <div @click="openURL('https://instagram/lapetitetribu.co')" class="border text-center p-3 flex justify-center gap-2 cursor-pointer social-link">
                <div>instagram</div>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" 
                    xmlns:xlink="http://www.w3.org/1999/xlink" 
                    aria-hidden="true" role="img" width="1em" height="1em" 
                    viewBox="0 0 24 24" class="iconify iconify--ic">
                    <path fill="currentColor" d="M6 6v2h8.59L5 17.59L6.41 19L16 9.41V18h2V6z"></path>
                    </svg>
                </div>
            </div>
            <div @click="openURL('https://www.linkedin.com/company/11048102/')" class="border text-center p-3 flex justify-center gap-2 cursor-pointer social-link">
                <div>linkedin</div>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" 
                    xmlns:xlink="http://www.w3.org/1999/xlink" 
                    aria-hidden="true" role="img" width="1em" height="1em" 
                    viewBox="0 0 24 24" class="iconify iconify--ic">
                    <path fill="currentColor" d="M6 6v2h8.59L5 17.59L6.41 19L16 9.41V18h2V6z"></path>
                    </svg>
                </div>
            </div> 
            <div @click="openURL('https://vimeo.com/lapetitetribu')" class="border text-center p-3 flex justify-center gap-2 cursor-pointer social-link">
                <div>vimeo</div>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" 
                    xmlns:xlink="http://www.w3.org/1999/xlink" 
                    aria-hidden="true" role="img" width="1em" height="1em" 
                    viewBox="0 0 24 24" class="iconify iconify--ic">
                    <path fill="currentColor" d="M6 6v2h8.59L5 17.59L6.41 19L16 9.41V18h2V6z"></path>
                    </svg>
                </div>
            </div>   
        </div>
        <div class="text-center text-2xl lg:text-[8vw] mt-32 uppercase">
            let's 🙂‍ connect
        </div>
    </div> -->
    <div class="pt-10 pb-10 mt-10">
        <div ref="logotype" class="text-[8.5vw] text-center font-['PP_Monument_Extended'] opacity-20">la petite tribu</div>
    </div>
    <div class="">
        <div class="container mx-auto pt-0 pb-24">

            <div class="flex w-full border-black flex-col lg:flex-row gap-10 lg:mb-14 mb-2">
                 <!-- Button CTA -->
                 <div class="lg:w-1/2"><img class="w-full mx-auto" src="/deck-cta.png" alt=""></div>

                <div class="uppercase flex justify-center items-center text-center flex-col lg:w-1/2">
                    <div class="text-base mb-4">Découvrez nos savoir-faire !</div>
                    <div class="text-xl text-gray-400 mb-4">Téléchargez gratuitement notre présentation pour avoir un aperçu de notre vision et de nos projets !</div>
                    <button @click="openDialog" class="uppercase text-center bg-[#AAFF1F] pb-3 pt-3 pr-6 pl-6 rounded-[10px] mb-3 flex gap-4">
                       <img class="w-4" src="/download.svg" alt="">
                       Télécharger le deck
                    </button>
                </div>

            </div>
    
            <div class="flex flex-col lg:flex-row lg:gap-0 gap-9 uppercase text-base w-full pt-12"> 
    
                <div class="flex gap-8 lg:flex-row flex-col lg:text-left text-center justify-start lg:w-[50%]"> 
                        <div @click="openURL('https://instagram.com/lapetitetribu.co')" class="underline">instagram</div>
                        <div @click="openURL('https://www.linkedin.com/company/11048102/')" class="underline">linkedin</div>
                        <div @click="openURL('https://vimeo.com/lapetitetribu')" class="underline">vimeo</div> 
                        <div @click="openURL('https://instagram/lapetitetribu.co')" class="underline">EMAIL</div> 
                </div>
    
                <div class="lg:text-right text-center lg:w-[50%]">© {{ new Date().getFullYear() }}</div>
    
            </div>
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