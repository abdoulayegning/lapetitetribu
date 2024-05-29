<template> 
    <div ref="message" class="fixed w-full h-screen z-50 border justify-center items-center hidden opacity-0 font-['DM_Sans']">
        <div>Veuillez patienter...</div>
    </div>
    <div ref="main_content">
        <div class="mx-auto container pt-28">
                <h1 class="font-['PP_Monument_Extended'] lg:text-8xl text-center">Friends & Folks</h1>
                <div class="grid grid-cols-3 lg:grid-cols-7 justify-items-end">
                    <img v-for="client in clients" class="invert justify-items-center" :src="client.url" alt="">
                </div>
                <div class="lg:flex justify-center">
                    <p class="mt-6 lg:w-[70%] font-['DM_Sans'] text-center text-3xl">
                        <!-- Laissez libre cours à votre imagination et décrivez-nous votre vision. Plus vous serez audacieux dans vos descriptions, plus nous pourrons vous surprendre avec des solutions innovantes et hors du commun. -->
                        Vous avez une idée géniale qui vous trotte dans la tête ? Un projet créatif qui n'attend que d'être réalisé ? Vous êtes au bon endroit ! Préparez-vous à transformer vos concepts en réalité avec notre de brief.</p>
                </div>
         </div>
        <div class="w-full pb-40 pt-32 lg:pl-24 lg:pr-24 mx-auto container">
             <div class="uppercase mb-2 flex flex-col text-left gap-1">
                 <input ref="name" placeholder="PRÉNOM(S) & NOM" class="bg-transparent border-black border-b" type="text" name="" id="">
                 <input ref="company" placeholder="VOTRE ENTREPRISE" class="bg-transparent border-black border-b" type="text" name="" id="">
                 <input ref="email" placeholder="EMAIL" class="bg-transparent border-black border-b" type="text" name="" id="">
                 <input ref="phone" placeholder="TÉLÉPHONE" class="bg-transparent border-black border-b" type="text" name="" id="">
                 <input ref="budget" placeholder="BUDGET" class="bg-transparent lg:col-span-2 border-black border-b" type="number" name="" id="">
                </div> 
                <div class="uppercase mb-3 mt-10 font-semibold">Nombre d'employés dans votre entreprise ?</div>
                <div class="w-full uppercase">
                    <select class="uppercase appearance-none" id="" ref="companySize">
                        <option value="" disabled>Choisissez un effectif aproximatif</option>
                        <option class="" v-for="size in sizes">{{ size }}</option>
                    </select>
                </div>
                <!-- Projet -->
                <div class="uppercase mb-3 mt-10 font-bold">sur quel type de projet voulez vous collaborer avec nous ?</div>
                <select class="background-transparent uppercase focus:border-none appearance-none" ref="services">
                    <option value="" disabled>Choisissez le type de projet</option>
                    <option class="">un site vitrine</option>
                    <option class="">une landing page</option>
                    <option class="">mini-jeu fun</option>
                    <option class="">filtre pour snapchat</option>
                    <option class="">site portfolio</option>
                    <option class="">vidéo animée en 2D</option>
                </select>
                
                <div class="uppercase mb-3 mt-10 font-bold">Quels sont vos délais ?</div>
                <select class="background-transparent uppercase focus:border-none appearance-none" ref="deadline">
                    <option class="">Dans un mois</option>
                    <option class="">Dans trois mois</option>
                    <option class="">Dans 6 mois</option>
                    <option class="">Plus de 6 mois</option>
                </select>
                
                <textarea ref="description" placeholder="DÉCRIVEZ-NOUS BRIÉVEMENT VOTRE PROJET ?" class="bg-transparent border-black border-b" type="text" name="" id=""></textarea>
    
                <div ref="alert" class="uppercase text-red-500 mt-10 text-xs opacity-0">
                    * Remplissez toutes les champs pour envoyer
                </div>
    
    
             <button @click="SendBriefToDatabase()" class="bg-gray-600 uppercase text-white pl-8 pr-8 mt-4 pb-2 pt-2">
                envoyer
             </button>
    
         </div>
    </div>
</template> 

<script setup> 
import { onBeforeMount, onMounted, ref } from 'vue';
import gsap from 'gsap';
import { firebaseApp } from '../js/firebase'
import { getFirestore, doc, setDoc, addDoc, collection } from "firebase/firestore";
import { createClient } from 'contentful'
import KeenSlider from 'keen-slider'
//


const client = createClient({
    space: import.meta.env.VITE_CONTENTFUL_SPACE_ID,
    accessToken: import.meta.env.VITE_CONTENTFUL_API_KEY //Only published !!!
    //Preview : yaKRL3ryC8Pr9YLZiDE_tD3L5zGB6CBYxXZzgQkbaLY
})

//#region data
const sizes = ['1-10', '10-30', "+30"]
const message = ref(null)
const main_content = ref(null)
const keen = ref(null)
const name = ref(null)
const email = ref(null)
const phone = ref(null)
const budget = ref(null)
const company = ref(null)
const services = ref(null)
const companySize = ref(null)
const description = ref(null)
const deadline = ref(null)
const alert = ref(null) 
const firestore = getFirestore()
//#endregion 

const SendBriefToDatabase = async ()=>{

    if(name.value.value !== '' && company.value.value !== '' && email.value.value !== '' && budget.value.value !== '' && phone.value.value !== '' && services.value.value !== '' && companySize.value.value !== '' && description.value.value !== '' && deadline.value.value !== ''){
        
        //Get the data
        let data = 
        {
            name: name.value.value, 
            company: company.value.value,
            email: email.value.value,
            budget: budget.value.value,
            phone: phone.value.value,
            service: services.value.value,
            companySize: companySize.value.value,
            description: description.value.value,
            deadline: deadline.value.value
        }

        gsap.to(main_content.value, {opacity: 0, onComplete: ()=>{main_content.value.style.display = 'none'}})
        gsap.to(message.value, {opacity: 1, delay: 1, onStart: ()=>{message.value.style.display = 'flex'}})

        // add the document with a random uid
        try {
        const docRef = await addDoc(collection(firestore, "briefs"), data).then(()=>{

        })
        // console.log("Document written with ID: ", docRef.id);
        } 
        
        //Check for error if applicable
        catch (e) {
        console.error("Error adding document: ", e);
        } 
    } 
        
    else 

    {
        alert.value.style.opacity = 1
    }
}

const clients = ref([])

onBeforeMount(()=>{
    client.getEntries({
        content_type: 'client',
        // limit: props.length 
    })
    .then((entries)=>{
        //check which one has an logo !!
        entries.items.forEach(item => {
        if(item.fields.logo){
            clients.value.push(
                {url:item.fields.logo.fields.file.url, alt:item.fields.logo.fields.title}
            )
        }
       })
    })
})

onMounted(()=>{   

var animation = { duration: 25000, easing: (t) => t }
    var slider = new KeenSlider(
    keen.value,
    {
        loop: true,
        // renderMode: "performance",
        drag: false,
        breakpoints: {
            '(max-width: 1024px)': { 
          slides: { origin: "center", perView: 1.25, spacing: 10 },
            },
        },
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

<style scoped>
select, input, textarea {
    width: 100%;
    margin: 1em 0 1em 0;
    padding: 1rem;
} 

input:focus,
select:focus,
textarea:focus,
button:focus {
    outline: none;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>