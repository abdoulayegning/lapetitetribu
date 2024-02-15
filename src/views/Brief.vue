<template> 
    <div class="w-full pb-40 pt-32 mx-auto container">
        {{ entry }}
        <div class="uppercase mb-2 grid lg:grid-cols-2 gap-3">
            <input v-model="name" placeholder="prénom(s) & nom" class="bg-transparent border-black border-b uppercase text-center" type="text" name="" id="">
            <input v-model="company" placeholder="Votre entreprise" class="bg-transparent border-black border-b uppercase text-center" type="text" name="" id="">
            <input v-model="email" placeholder="Email" class="bg-transparent border-black border-b uppercase text-center" type="text" name="" id="">
            <input v-model="phone" placeholder="Téléphone" class="bg-transparent border-black border-b uppercase text-center" type="text" name="" id="">
        </div> 
        <div class="uppercase mb-3 text-center mt-10 font-semibold">Nombre d'employés dans votre entreprise</div>
        <div class="grid lg:grid-cols-3 gap-3 uppercase justify-center" ref="companySize">
             <div :data-company-size="size" class="btn" v-for="size in sizes">{{ size }}</div>
          </div>
        <!-- Projet -->
        <div class="uppercase mb-3 mt-10 text-center font-bold">sur quel type de projet voulez vous collaborer avec nous ?</div>
        <div class="grid lg:grid-cols-3 gap-3 uppercase justify-center" ref="services">
            <div class="btn">un site e-commerce</div>
            <div class="btn">une landing page</div>
            <div class="btn">un mini-jeu fun</div>
            <div class="btn">un site portfolio</div>
            <div class="btn">une vidéo animée</div>
            <div class="btn">faire mon branding</div>
        </div>


    </div>
</template>

<style scoped>
.btn {
    @apply pt-2 pb-2 pr-12 pl-12 border rounded-full text-center cursor-pointer hover:bg-black hover:text-white
}
</style>

<script setup> 
import { onMounted, ref } from 'vue';

const services = ref(null)
const companySize = ref(null)
const sizes = ['1-10', '10-30', "+30"]
const name = ref('')
const company = ref('')
const email = ref('')
const phone = ref('')

let entry = ref(
    {
        name: name, 
        company: company,
        email: email,
        phone: phone,
        service: '',
        companySize: ''
    },
)
 
onMounted(()=>{ 

    for (let i = 0; i < services.value.children.length; i++) {
        const element = services.value.children[i];
        element.addEventListener('click', (e)=>{
            let selected = e.target.innerHTML
            entry.value.service = selected
        })
    }

    for (let i = 0; i < companySize.value.children.length; i++) {
        const element = companySize.value.children[i];
        element.addEventListener('click', (e)=>{
            let selected = e.target.innerHTML
            entry.value.companySize = selected
        })
    }
})

</script>

<style scoped>
select, input, textarea {
    width: 100%;
    margin: 1em 0 1em 0;
    padding: 1rem;
} 
</style>