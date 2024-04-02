<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import moment from 'moment-timezone'
const router = useRouter()
const route = useRoute()
const time = ref('')
function updateTime() {
  var now = new Date();
  var hours = now.getHours();
  var minutes = now.getMinutes();
  var seconds = now.getSeconds();

  // Add leading zeros if necessary
  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;

  var timeString = hours + ':' + minutes + ':' + seconds;

  let m = moment().tz("Africa/Dakar").format('LT')
  // Display the time
  time.value = m;
}


onMounted(async()=>{ 
    // Update the time every second
    setInterval(updateTime, 1000);
    
    // Initial call to display the time immediately
    updateTime();

})
</script>

<template>
    <div class="w-full h-32 container fixed -translate-x-1/2 left-1/2 top-8 z-[150]">
        <div class="flex justify-between">
           <div class="w-24 left-20 bg-white border-black cursor-pointer" @click="router.push('/')">
               <svg x="0px" y="0px"
                   viewBox="0 0 300 300" style="enable-background:new 0 0 300 300;" xml:space="preserve">
               <g id="logo-full">
                   <g>
                       <path d="M54.1,95c-2.5,0-4-1.3-4-3.9V64.9h7.8v23.3h14.5V95H54.1z"/>
                       <path d="M81.5,95l9.6-30.1h14.2l9.6,30.1h-8.3l-2.8-9.1H92.4L89.6,95H81.5z M94.6,79.1h7.2l-3.6-11.5L94.6,79.1z"/>
                       <path d="M50.2,162.7v-30.1H62c9.4,0,13.6,3.2,13.6,11c0,7.7-4.2,10.9-13.6,10.9h-4.1v8.3H50.2z M57.9,147.6h4.6
                           c3.8,0,5.4-1,5.4-4.1c0-3.2-1.7-4.2-5.4-4.2h-4.6V147.6z"/>
                       <path d="M86.2,162.7v-30.1h24v6.8H94.1v5h14v6.4h-14v5.1h16.1v6.8H86.2z"/>
                       <path d="M120.3,132.5h27.1v6.8h-9.7v23.3H130v-23.3h-9.7V132.5z"/>
                       <path d="M157.6,132.5h21.5v6.8h-6.9v16.5h6.9v6.9h-21.5v-6.8h6.9v-16.5h-6.9V132.5z"/>
                       <path d="M189.2,132.5h27.1v6.8h-9.7v23.3h-7.7v-23.3h-9.7L189.2,132.5L189.2,132.5z"/>
                       <path d="M227,162.7v-30.1h24v6.8h-16.2v5h14v6.4h-14v5.1H251v6.8H227z"/>
                       <path d="M48.8,204.9h27.1v6.8h-9.7v23.3h-7.7v-23.3h-9.7V204.9z"/>
                       <path d="M86.6,235.1v-30.1h13.3c6.8,0,13.5,1.4,13.5,8c0,4.8-3.2,6.9-6.3,7.6h1.1c4.1,0,5.6,2.6,5.6,5.4v9.2H106v-10.2H94.4v10.2
                           H86.6z M94.4,218.1h5.5c3.5,0,5.8-0.1,5.8-3.2c0-3.1-2.5-3.2-5.8-3.2h-5.5V218.1z"/>
                       <path d="M124.5,204.9H146v6.8h-6.9v16.5h6.9v6.9h-21.5v-6.8h6.9v-16.5h-6.9V204.9z"/>
                       <path d="M157.7,235.1v-30.1h13c8.4,0,12.6,1.5,12.6,7.3c0,5.1-3.4,6.5-5.6,7c5,0.5,7.9,3.1,7.9,7.8c0,7-6.4,8.1-14.5,8.1
                           L157.7,235.1L157.7,235.1z M165.6,228.4h5.9c4,0,6.2,0.1,6.2-3s-2.3-3-6.2-3h-5.9V228.4z M165.6,216.4h6c2.4,0,4.3,0.2,4.3-2.6
                           c0-2.7-1.7-2.6-4.3-2.6h-6V216.4z"/>
                       <path d="M195.4,223.9v-18.9h7.8v15.2c0,5.3,0,8.6,6.2,8.6c6.2,0,6.3-3.4,6.3-8.6v-15.2h7.8v18.9c0,7.6-4.9,11.7-14.1,11.7
                           C200.3,235.6,195.4,231.5,195.4,223.9z"/>
                   </g>
               </g>
               <g class="hidden" ref="logoBlackSolid" id="black-solid">
                   <rect y="-5" width="300" height="305"/>
               </g>
               <g class="hidden" ref="logoLChar" id="logo-l">
                   <path class="st0" d="M113.2,227.6c-13,0-20.5-6.8-20.5-20V72.4h40.1v119.9h74.6v35.2H113.2z"/>
               </g>
               </svg>
           </div>
           <div class="uppercase">
            Dakar ({{time}})
           </div>
        </div>
    </div>
</template>

<style scoped>   
</style>