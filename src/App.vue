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

// This is the status of the form
// It can be one of the following:
/*
closed: Form is closed
opened: Form is open
is-submitting: Form is being submitted
submitted: Form has been submitted
*/

const formStatus = ref('closed')

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
 
function openExternalLink(url) {
  window.open(url, '_blank', 'noopener,noreferrer');
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
            <div><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 1024 1024"><!-- Icon from Element Plus by Element Plus - https://github.com/element-plus/element-plus-icons/blob/main/packages/svg/package.json --><path fill="#68ba32" d="M512 64a448 448 0 1 1 0 896a448 448 0 0 1 0-896m-55.808 536.384l-99.52-99.584a38.4 38.4 0 1 0-54.336 54.336l126.72 126.72a38.27 38.27 0 0 0 54.336 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336z"/></svg></div>
            Nous avons bien reçu votre message,<br> nous vous répondrons dans les plus brefs délais !

            <div @click="formStatus = 'closed'" class="font-medium mt-10 w-fit border-black border-b cursor-pointer opacity-100">Fermer</div>
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

  <div class="fixed bottom-20 left-0 z-40 flex flex-col gap-1">

    <div class="cursor-pointer" @click="initializeForm">
  
      <div class="flex justify-center items-center gap-3 pt-3 pb-3 pr-6 pl-6 bg-white duration-300 text">
        <div class="hidden lg:block">Let's Talk</div>
        <div class="w-auto"><svg class="w-full h-full" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><!-- Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE --><path fill="#000" d="M18.175 17H15q-.425 0-.712-.288T14 16t.288-.712T15 15h3.175l-.9-.9Q17 13.825 17 13.413t.3-.713q.275-.275.7-.275t.7.275l2.6 2.6q.125.125.2.312t.075.388t-.075.387t-.2.313l-2.6 2.6q-.275.275-.687.288T17.3 19.3q-.275-.275-.275-.7t.275-.7zM4 17q-.825 0-1.412-.587T2 15V5q0-.825.588-1.412T4 3h13q.825 0 1.413.588T19 5v4.075q0 .4-.3.7t-.7.3q-.425 0-.712-.288T17 9.076V6.4L10.4 11L4 6.425V15h7.075q.425 0 .713.288t.287.712t-.287.713t-.713.287zM5.45 5l4.95 3.55L15.5 5zM4 15V5z"/></svg></div>
      </div>
  
    </div>

    <!-- Social -->

    <div class="cursor-pointer" @click="openExternalLink('https://www.instagram.com/lapetitetribu.co/')">

      <div class="w-fit pt-3 pb-3 pr-3 pl-3 bg-white duration-300 text">

        <div><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><!-- Icon from Feather Icon by Megumi Hano - https://github.com/feathericon/feathericon/blob/master/LICENSE --><path fill="#000" fill-rule="evenodd" d="M12 2c-2.716 0-3.056.012-4.123.06c-1.064.049-1.791.218-2.427.465a4.9 4.9 0 0 0-1.772 1.153A4.9 4.9 0 0 0 2.525 5.45c-.247.636-.416 1.363-.465 2.427C2.011 8.944 2 9.284 2 12s.011 3.056.06 4.123c.049 1.064.218 1.791.465 2.427a4.9 4.9 0 0 0 1.153 1.772a4.9 4.9 0 0 0 1.772 1.153c.636.247 1.363.416 2.427.465c1.067.048 1.407.06 4.123.06s3.056-.012 4.123-.06c1.064-.049 1.791-.218 2.427-.465a4.9 4.9 0 0 0 1.772-1.153a4.9 4.9 0 0 0 1.153-1.772c.247-.636.416-1.363.465-2.427c.048-1.067.06-1.407.06-4.123s-.012-3.056-.06-4.123c-.049-1.064-.218-1.791-.465-2.427a4.9 4.9 0 0 0-1.153-1.772a4.9 4.9 0 0 0-1.772-1.153c-.636-.247-1.363-.416-2.427-.465C15.056 2.012 14.716 2 12 2m0 1.802c2.67 0 2.986.01 4.04.058c.976.045 1.505.207 1.858.344c.466.182.8.399 1.15.748c.35.35.566.684.748 1.15c.136.353.3.882.344 1.857c.048 1.055.058 1.37.058 4.041c0 2.67-.01 2.986-.058 4.04c-.045.976-.208 1.505-.344 1.858a3.1 3.1 0 0 1-.748 1.15c-.35.35-.684.566-1.15.748c-.353.136-.882.3-1.857.344c-1.054.048-1.37.058-4.041.058c-2.67 0-2.987-.01-4.04-.058c-.976-.045-1.505-.208-1.858-.344a3.1 3.1 0 0 1-1.15-.748a3.1 3.1 0 0 1-.748-1.15c-.137-.353-.3-.882-.344-1.857c-.048-1.055-.058-1.37-.058-4.041c0-2.67.01-2.986.058-4.04c.045-.976.207-1.505.344-1.858c.182-.466.399-.8.748-1.15c.35-.35.684-.566 1.15-.748c.353-.137.882-.3 1.857-.344c1.055-.048 1.37-.058 4.041-.058m0 11.531a3.333 3.333 0 1 1 0-6.666a3.333 3.333 0 0 1 0 6.666m0-8.468a5.135 5.135 0 1 0 0 10.27a5.135 5.135 0 0 0 0-10.27m6.538-.203a1.2 1.2 0 1 1-2.4 0a1.2 1.2 0 0 1 2.4 0"/></svg></div>

      </div>
  
    </div>

    <div class="cursor-pointer" @click="openExternalLink('https://vimeo.com/lapetitetribu')">

      <div class="w-fit pt-3 pb-3 pr-3 pl-3 bg-white duration-300 text">

        <div><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><!-- Icon from Material Design Icons by Pictogrammers - https://github.com/Templarian/MaterialDesign/blob/master/LICENSE --><path fill="#000" d="M22 7.42c-.09 1.95-1.45 4.62-4.08 8.02C15.2 19 12.9 20.75 11 20.75c-1.15 0-2.14-1.08-2.95-3.25c-.55-1.96-1.05-3.94-1.61-5.92c-.6-2.16-1.24-3.24-1.94-3.24c-.14 0-.66.32-1.56.95L2 8.07c1-.87 1.96-1.74 2.92-2.61c1.32-1.14 2.31-1.74 2.96-1.8c1.56-.16 2.52.92 2.88 3.2c.39 2.47.66 4 .81 4.6c.43 2.04.93 3.04 1.48 3.04c.42 0 1.05-.64 1.89-1.97q1.26-1.98 1.35-3.03q.18-1.71-1.35-1.71c-.48 0-.97.11-1.48.33c.98-3.23 2.86-4.8 5.63-4.71c2.06.06 3.03 1.4 2.91 4.01"/></svg></div>

      </div>
  
    </div>

    <div class="cursor-pointer" @click="openExternalLink('https://www.linkedin.com/company/la-petite-tribu/')">

      <div class="w-fit pt-3 pb-3 pr-3 pl-3 bg-white duration-300 text">

        <div><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><!-- Icon from BoxIcons by Atisa - https://creativecommons.org/licenses/by/4.0/ --><path d="M20 3H4a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM8.339 18.337H5.667v-8.59h2.672v8.59zM7.003 8.574a1.548 1.548 0 1 1 0-3.096a1.548 1.548 0 0 1 0 3.096zm11.335 9.763h-2.669V14.16c0-.996-.018-2.277-1.388-2.277c-1.39 0-1.601 1.086-1.601 2.207v4.248h-2.667v-8.59h2.56v1.174h.037c.355-.675 1.227-1.387 2.524-1.387c2.704 0 3.203 1.778 3.203 4.092v4.71z" fill="#000"/></svg></div>

      </div>
  
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
