<script setup>  
import Lenis from '@studio-freight/lenis'
import { onMounted, ref } from 'vue'
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import TopBar from './components/TopBar.vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()

// const contactBtn = ref(null)

const topbar = ref(null)

gsap.registerPlugin(ScrollTrigger)

const contactForm = ref(false)
const formStatus = ref('submitted')

const name = ref('')
const email = ref('')
const phone = ref('')
const message = ref('')

onMounted(()=>{
 

    const lenis = new Lenis()
    
    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time)=>{
      lenis.raf(time * 1000)
    })

    gsap.ticker.lagSmoothing(0)

    //Contact button
    // contactBtn.value.addEventListener("click", ()=>{
    //   window.open('mailto:abdoulaye@lapetitetribu.co');
    // })
 

    // const redDot = contactBtn.value.children[0]
    // gsap.fromTo(redDot, {opacity: 0}, {opacity: 1, repeat: -1})
    // gsap.fromTo(contactBtn.value, {y: 0}, {y: 10, repeat: -1, yoyo: true, ease: 'power4.inOut'})
})


const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY

async function submitForm() { 
  
  formStatus.value = 'is-submitting';

  const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        name: name.value,
        email: email.value,
        message: message.value,
        phone: phone.value,
      }),
   });

   if(response.ok){
      console.log("Form submitted successfully");
      formStatus.value = 'submitted';
   }

}

function initializeForm() {
  formStatus.value = 'opened'
  name.value = ''
  email.value = ''
  phone.value = ''
  message.value = ''
}
 

</script>

<template>

  <!-- Form -->
  <div v-if="formStatus == ('opened') || formStatus == ('is-submitting')  || formStatus == ('submitted')" class="flex justify-center items-center fixed top-0 left-0 z-[9000] bg-black/40 w-full h-full lg:p-0 p-10">

      <div class="flex lg:flex-row flex-col gap-3 bg-white p-4 lg:w-[600px] w-full h-fit pb-36">

        <form @submit.prevent="submitForm" class="w-full flex flex-col gap-3 p-5">

          <div class="text-4xl mt-5 mb-5 font-['PP_Monument_Extended'] text-center">
            la petite tribu
          </div>

          <div v-if="formStatus == ('is-submitting')" class="text-center flex flex-col items-center justify-center gap-3">
            <div><svg class="animate-spin" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><!-- Icon from MingCute Icon by MingCute Design - https://github.com/Richard9394/MingCute/blob/main/LICENSE --><defs><linearGradient id="mingcuteLoadingLine0" x1="50%" x2="50%" y1="5.271%" y2="91.793%"><stop offset="0%" stop-color="#888888"/><stop offset="100%" stop-color="#888888" stop-opacity=".55"/></linearGradient><linearGradient id="mingcuteLoadingLine1" x1="50%" x2="50%" y1="8.877%" y2="90.415%"><stop offset="0%" stop-color="#888888" stop-opacity="0"/><stop offset="100%" stop-color="#888888" stop-opacity=".55"/></linearGradient></defs><g fill="none"><path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"/><path fill="url(#mingcuteLoadingLine0)" d="M8.886.006a1 1 0 0 1 .22 1.988A8.001 8.001 0 0 0 10 17.944v2c-5.523 0-10-4.476-10-10C0 4.838 3.848.566 8.886.007Z" transform="translate(2 2.055)"/><path fill="url(#mingcuteLoadingLine1)" d="M14.322 1.985a1 1 0 0 1 1.392-.248A9.99 9.99 0 0 1 20 9.945c0 5.523-4.477 10-10 10v-2a8 8 0 0 0 4.57-14.567a1 1 0 0 1-.248-1.393" transform="translate(2 2.055)"/></g></svg></div>
            Veuillez patienter, nous envoyons votre message...
          </div>
          
          <div v-if="formStatus == ('submitted')" class="text-center flex flex-col items-center justify-center gap-3">
            <div><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 1024 1024"><!-- Icon from Element Plus by Element Plus - https://github.com/element-plus/element-plus-icons/blob/main/packages/svg/package.json --><path fill="#888888" d="M512 64a448 448 0 1 1 0 896a448 448 0 0 1 0-896m-55.808 536.384l-99.52-99.584a38.4 38.4 0 1 0-54.336 54.336l126.72 126.72a38.27 38.27 0 0 0 54.336 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336z"/></svg></div>
            Nous avons bien reçu votre message, nous vous répondrons dans les plus brefs délais !
          </div>
  
          <div v-if="formStatus == ('opened')">
            <input class="border-b w-full border-black p-1" placeholder="Votre email" v-model="email" type="email" name="" id="">
          </div>

          <div v-if="formStatus == ('opened')">
            <input class="border-b w-full border-black p-1" placeholder="Votre nom complet" v-model="name" type="text" name="" id="">
          </div>
  
          <div v-if="formStatus == ('opened')">
            <input class="border-b w-full border-black p-1" placeholder="Votre téléphone" v-model="phone" type="number" name="" id="">
          </div>

          <textarea v-if="formStatus == ('opened')" class="border-b w-full border-black p-1" placeholder="Comment pouvons nous vous aider ?" v-model="message" name="" id=""></textarea>

          <div v-if="formStatus == ('opened')" class="flex justify-between items-center">

            <button v-if="email == ''" class="font-medium mt-10 w-fit cursor-pointer">Une adresse email est requise !</button>

            <button v-if="email !== ''" type="submit" class="font-bold mt-10 w-fit border-black border-b-2 cursor-pointer">Envoyer</button>

            <div @click="formStatus = 'closed'" class="font-bold mt-10 w-fit border-black border-b-2 cursor-pointer opacity-30">Annuler</div>

          </div> 
 
        </form> 

      </div>
    
  </div>

  <div class="fixed bottom-20 left-0 z-40 cursor-pointer" @click="initializeForm">

    <div class="flex justify-center items-center gap-3 pt-3 pb-3 pr-6 pl-6 bg-white duration-300">
      <div class="hidden lg:block">Let's Talk</div>
      <div class="w-auto"><svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><!-- Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE --><path fill="#000" d="M18.175 17H15q-.425 0-.712-.288T14 16t.288-.712T15 15h3.175l-.9-.9Q17 13.825 17 13.413t.3-.713q.275-.275.7-.275t.7.275l2.6 2.6q.125.125.2.312t.075.388t-.075.387t-.2.313l-2.6 2.6q-.275.275-.687.288T17.3 19.3q-.275-.275-.275-.7t.275-.7zM4 17q-.825 0-1.412-.587T2 15V5q0-.825.588-1.412T4 3h13q.825 0 1.413.588T19 5v4.075q0 .4-.3.7t-.7.3q-.425 0-.712-.288T17 9.076V6.4L10.4 11L4 6.425V15h7.075q.425 0 .713.288t.287.712t-.287.713t-.713.287zM5.45 5l4.95 3.55L15.5 5zM4 15V5z"/></svg></div>
    </div>

  </div>

  <router-view></router-view> 

</template>

<style scoped> 
input,
textarea { 
  outline: none;
}
/* Remove arrows/spinners from number input fields */
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}
</style>
