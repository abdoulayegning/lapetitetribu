<template> 

    <div id="loader" ref="loader" class="bg-[#F5F5F5] hidden w-full h-full fixed z-[1000] flex-col justify-center items-center gap-2 font-['DM_Sans']">
        <svg ref="star" class="w-full mb-4" width="20" height="20" viewBox="0 0 165 165" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M82.3333 0L56.6042 56.6042L0 82.3333L56.6042 108.062L82.3333 164.667L108.062 108.062L164.667 82.3333L108.062 56.6042" fill="black"/>
        </svg> 
        <div class="text-4xl">Nous vous revenons dans les + brefs délais !</div>
        <div class="text-base text-gray-400 flex justify-center items-center gap-1 cursor-pointer underline">
            retour à l'accueil
        </div>
    </div>

    <!-- action="https://submit-form.com/gSsFqdNRj" -->

    <div class="mt-20">
        <form ref="form" class="flex flex-col gap-4 w-full items-center" action="null"> 
            <div>
                <input type="text"> 
            </div>
            <div>
                <input type="email" name="email" />
            </div>
            <div>
                <textarea name="" id="" cols="30" rows="10"></textarea>
            </div>

            <input type="hidden" name="_email.subject" value="Nouveau message du formulaire contact !" />

            <button type="submit">Envoyer</button>
        </form>
    </div>

</template>

<script setup>
import gsap from 'gsap'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';
const router = useRouter()
const star = ref(null)
const form = ref(null)
const loader = ref(null)
const name = ref('')

onMounted(()=>{
    gsap.to(star.value, {rotate: 360, duration: 2, repeat: -1, ease: 'linear'})
    
    form.value.onsubmit = ()=>{
       loader.value.style.dispay = 'flex'
    }
})
</script>