<template>
    <!-- Closing CTA (homepage and project pages) -->
    <section id="contact" class="scroll-mt-24 max-w-[1312px] mx-auto px-5 lg:px-8 pt-[104px] pb-14 lg:pt-40 lg:pb-[120px] lg:grid lg:grid-cols-12 lg:gap-x-6">
        <h2 class="lg:col-span-12 m-0 text-[44px] lg:text-[clamp(44px,6.6vw,96px)] leading-[0.95] tracking-[-0.045em] font-medium">
            <span class="block">Un template, tout le monde en a.</span>
            <span class="block pl-[22%] lg:pl-[25%] mt-1.5 lg:mt-0">Une expérience, <em class="font-['Georgia',serif] font-normal">on s'en souvient.</em></span>
        </h2>
        <div class="lg:col-start-4 lg:col-span-9 mt-10 lg:mt-14 flex flex-col items-start gap-3 lg:flex-row lg:flex-wrap lg:items-center lg:gap-x-8">
            <!-- Email form off until Bird is configured: WhatsApp becomes the main button -->
            <NuxtLink v-if="formEnabled" :to="{ path: '/pricing', query: { form: 'true' } }" class="inline-flex items-center min-h-[56px] px-7 bg-[#0d0d0d] text-white hover:text-white hover:bg-[#2a2a2a] text-[17px] font-semibold no-underline">Démarrer un projet</NuxtLink>
            <a v-else href="https://wa.me/+221778109390" target="_blank" rel="noopener" class="inline-flex items-center min-h-[56px] px-7 bg-[#0d0d0d] text-white hover:text-white hover:bg-[#2a2a2a] text-[17px] font-semibold no-underline">Démarrer un projet</a>
            <a v-if="formEnabled" href="https://wa.me/+221778109390" target="_blank" rel="noopener" class="min-h-[44px] inline-flex items-center text-base lg:text-[17px] font-semibold text-[#0d0d0d] underline underline-offset-[6px] hover:text-[#5c5c5c]">WhatsApp</a>
        </div>
    </section>
</template>

<script setup>
const formEnabled = !!useRuntimeConfig().public.contactForm
</script>
