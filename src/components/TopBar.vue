<template>
    <div class="fixed top-0 left-0 w-full flex justify-between items-center pt-4 pb-4 pr-4 pl-4 text-white mix-blend-difference">
        <div class="uppercase">Vous avez un projet ?</div>
        <!-- <div class="flex">menu</div> -->
        <div class="uppercase">{{"Dakar / "+ ' ' +locale}}</div>
    </div>
</template>

<script setup>
import moment from 'moment-timezone'
import {onMounted, ref} from 'vue'
const locale = ref('')
onMounted(()=>{
    setInterval(()=>{
        locale.value = moment().tz("Africa/Dakar").format('LT')
    }, 1000)
})
</script>