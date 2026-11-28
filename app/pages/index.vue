<script setup>
import { ref } from 'vue';
import HeroTagline from '../components/HeroTagline.vue';
import ProjectGrid from '../components/ProjectGrid.vue';
import ClosingCTA from '../components/ClosingCTA.vue';
import Footer from '../components/Footer.vue';

// Email form off until Bird is configured (NUXT_PUBLIC_CONTACT_FORM)
const formEnabled = !!useRuntimeConfig().public.contactForm

const grid = ref(null)

// Client links in the intro sentence: show all projects, then scroll to the card
const jump = (slug) => grid.value?.jumpTo(slug)

const SERVICES = [
    { n: '01', title: 'Gamification', text: 'Jeux en ligne, concours et expériences jouables. Votre audience ne regarde plus votre marque : elle joue avec.' },
    { n: '02', title: 'Sites & UX/UI', text: 'Landing pages, sites vitrines, portfolios. Pensés pour convertir, construits pour durer.' },
    { n: '03', title: 'Motion design', text: 'Animation 2D, packshots, habillages. Ce qui bouge se remarque.' },
    { n: '04', title: 'Identité visuelle', text: 'Une identité cohérente et mémorable. On vous reconnaît avant de lire votre nom.' },
]
const TARIFS = [
    { title: 'Mini-jeu publicitaire', price: '3200€' },
    { title: 'Site internet', price: '2500€' },
    { title: 'Motion design', price: '2800€' },
    { title: 'Identité visuelle', price: '2200€' },
]
</script>

<template>
    <div id="main-content" class="home bg-[#f3f3f1] text-[#0d0d0d]">
        <main id="top">

            <!-- Hero: headline broken across an asymmetric 12-col grid -->
            <section class="max-w-[1312px] mx-auto px-5 lg:px-8 pt-12 lg:pt-24 lg:grid lg:grid-cols-12 lg:gap-x-6">
                <p class="lg:col-span-2 m-0 mb-5 lg:mb-0 lg:pt-[22px] text-xs lg:text-[13px] font-semibold tracking-[0.08em] uppercase text-[#5c5c5c]">Digital <br class="hidden lg:block">&amp; gamification</p>
                <div class="lg:col-start-3 lg:col-span-10">
                    <HeroTagline />
                </div>
                <div class="lg:col-span-4 lg:row-start-2 mt-8 lg:mt-16 flex flex-col gap-6 lg:gap-[22px]">
                    <p class="m-0 max-w-[300px] lg:max-w-none text-[17px] lg:text-[19px] leading-[1.45] text-[#3d3d3d]">Sites, jeux de marque et motion design. On transforme l'attention en engagement.</p>
                    <div class="flex flex-wrap gap-3">
                        <a v-if="formEnabled" href="#contact" class="inline-flex items-center min-h-[52px] px-[26px] bg-[#0d0d0d] text-white hover:text-white hover:bg-[#2a2a2a] text-base font-semibold no-underline">Lancer une partie</a>
                        <a href="#projets" class="hidden lg:inline-flex items-center min-h-[52px] px-[22px] text-base font-semibold text-[#0d0d0d] underline underline-offset-[6px] hover:text-[#5c5c5c]">Voir les projets</a>
                    </div>
                </div>
                <ol aria-label="Services" class="lg:col-start-8 lg:col-span-5 lg:row-start-2 mt-12 ml-[22%] lg:mt-16 lg:ml-0 p-0 list-none border-t border-[#0d0d0d]">
                    <li v-for="s in SERVICES" :key="s.n" class="flex justify-between py-3 lg:py-3.5 border-b border-[#c9c9c4] text-[17px] lg:text-xl font-medium">
                        <span>{{ s.title }}</span><span class="text-[13px] lg:text-sm text-[#5c5c5c]">{{ s.n }}</span>
                    </li>
                </ol>
            </section>

            <!-- Clients -->
            <section aria-label="Ils nous font confiance" class="max-w-[1312px] mx-auto px-5 lg:px-8 pt-[88px] lg:pt-24 lg:grid lg:grid-cols-12 lg:gap-x-6">
                <p class="lg:col-span-2 m-0 mb-4 lg:mb-0 text-xs lg:text-[13px] font-semibold tracking-[0.08em] uppercase text-[#5c5c5c]">Ils ont joué <br class="hidden lg:block">avec nous</p>
                <p class="lg:col-start-3 lg:col-span-8 m-0 text-2xl lg:text-[clamp(24px,2.6vw,36px)] leading-[1.2] tracking-[-0.025em] text-[#3d3d3d]">
                    On a fait jouer les supporters avec <strong class="font-semibold text-[#0d0d0d]">Kirène</strong>,
                    décoché des flèches de Cupidon pour <strong class="font-semibold text-[#0d0d0d]">Orange</strong>
                    et mis l'été de <a href="#projet-wave-summer-xeweul" class="client-link" @click.prevent="jump('wave-summer-xeweul')">Wave</a> en mouvement.
                </p>
            </section>

            <!-- Work: filter + staggered rows (real projects from Contentful) -->
            <ProjectGrid ref="grid" />

            <!-- Services: detailed rows -->
            <section id="services" class="scroll-mt-24 max-w-[1312px] mx-auto px-5 lg:px-8 pt-[88px] lg:pt-24">
                <h2 class="m-0 mb-6 lg:mb-12 pl-[22%] lg:pl-[16.6%] text-[44px] lg:text-[clamp(40px,5vw,72px)] leading-[0.95] tracking-[-0.04em] font-medium">Ce qu'on fait</h2>
                <div class="border-t border-[#0d0d0d]">
                    <div v-for="s in SERVICES" :key="s.n" class="flex flex-col gap-2 py-5 pb-6 lg:grid lg:grid-cols-12 lg:gap-x-6 lg:gap-y-3 lg:pt-8 lg:pb-10 border-b border-[#c9c9c4]">
                        <span class="lg:col-span-2 lg:pt-2 text-[13px] lg:text-sm text-[#5c5c5c]">{{ s.n }}</span>
                        <h3 class="lg:col-start-3 lg:col-span-5 m-0 text-[28px] lg:text-[clamp(28px,3vw,40px)] font-medium tracking-[-0.03em]">{{ s.title }}</h3>
                        <p class="lg:col-start-8 lg:col-span-5 m-0 text-[15px] lg:text-[17px] leading-normal text-[#3d3d3d]">{{ s.text }}</p>
                    </div>
                </div>
            </section>

            <!-- Tarifs + product, offset pair -->
            <section id="tarifs" class="scroll-mt-24 max-w-[1312px] mx-auto px-5 lg:px-8 pt-[72px] lg:pt-[120px] flex flex-col gap-8 lg:grid lg:grid-cols-12 lg:gap-x-6 lg:items-start">
                <div class="lg:col-span-7 flex flex-col gap-2.5 lg:gap-4">
                    <h2 class="m-0 text-[28px] lg:text-[32px] font-medium tracking-[-0.03em]">Tarifs</h2>
                    <p class="m-0 text-[15px] lg:text-[17px] leading-[1.6] text-[#3d3d3d]"><template v-for="t in TARIFS" :key="t.title">{{ t.title }} — <span class="lg:hidden">dès</span><span class="hidden lg:inline">à partir de</span> {{ t.price }}<br></template></p>
                    <NuxtLink to="/pricing" class="self-start min-h-[44px] inline-flex items-center text-[15px] lg:text-base font-semibold text-[#0d0d0d] underline underline-offset-[6px] hover:text-[#5c5c5c]">Voir le détail</NuxtLink>
                </div>
                <a href="https://popmyproduct.com" target="_blank" rel="noopener" class="ml-[22%] lg:ml-0 lg:col-start-9 lg:col-span-4 lg:mt-16 no-underline flex flex-col gap-2.5 lg:gap-3.5 p-5 lg:p-6 bg-[#e2fb5a] text-[#0d0d0d] hover:text-[#0d0d0d]">
                    <span class="text-xs lg:text-[13px] font-semibold tracking-[0.08em] uppercase">Notre produit</span>
                    <span class="text-lg lg:text-2xl font-semibold tracking-[-0.02em] leading-[1.15]">Pop My Product — des visuels produits générés par IA ↗</span>
                </a>
            </section>

            <ClosingCTA />
        </main>

        <Footer />
    </div>
</template>

<style scoped>
.home {
    font-family: 'Inter Tight', system-ui, sans-serif;
}
.client-link {
    font-weight: 600;
    color: #0d0d0d;
    text-decoration: underline;
    text-decoration-thickness: 2px;
    text-underline-offset: 6px;
}
.client-link:hover {
    color: #5c5c5c;
}
</style>
