<template>
    <div></div>
</template>

<script setup>
import { ref, onBeforeMount, onMounted } from 'vue'; 

async function submitForm(){

    const response = await fetch("https://api.web3forms.com/submit", {
    
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
    body: JSON.stringify({
        access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY, 
        //values
    }),

    })

 const result = await response.json();

 if (result.success) {
    alert("Form submitted successfully");
 } else {
    alert("Form submission failed");
 }

}
</script>