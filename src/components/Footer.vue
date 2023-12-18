<template>
    <div class="container mx-auto pt-20 pb-20">
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
        <div class="text-center text-2xl lg:text-[8vw] mt-20 uppercase">
            let's 🙂‍ connect
        </div>
    </div>
</template>

<script setup>
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
</script>