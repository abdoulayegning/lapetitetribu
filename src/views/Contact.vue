<template> 
    <div class="w-full h-screen grid grid-cols-2">
        <div></div>
        <div class="grid grid-cols-4 w-full gap-6 border justify-center items-center p-6">
            <input class="lg:col-span-2" placeholder="Prénom(s) et nom" type="text" v-model="name"/>
            <input class="lg:col-span-2" placeholder="Entreprise" type="text" v-model="company"/>
        </div>
    </div>  
</template>

<style scoped>
input {
    border: 1px solid #0003;
    padding: 0.5rem;
    border-radius: 0.25rem;
    width: 100%;
}
</style>

<script setup>
import gsap from 'gsap'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';
const router = useRouter()
// const star = ref(null)
// const form = ref(null)
// const loader = ref(null) 

async function submitForm(){
    // const response = await fetch("https://api.spike.ac/f/fb7ecf/MwPec0", {
    // method: "POST",
    // headers: { "Content-Type": "application/json" },
    // body: JSON.stringify({ name: "John", email: "john@example.com", message: "Hello!" }),
    // })
}

onMounted(()=>{
    // gsap.to(star.value, {rotate: 360, duration: 2, repeat: -1, ease: 'linear'})
    
    // form.value.onsubmit = ()=>{
    //    loader.value.style.dispay = 'flex'
    // }
})
</script>