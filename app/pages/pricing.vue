<template>
    <div v-if="formEnabled && (contactForm || route.query.form == 'true')" class="border fixed bg-gray-100 w-full h-screen z-10 flex justify-center items-center">
        <div class="mx-auto container lg:pl-60 lg:pr-60">
            <div></div>
            <div v-if="sendState === 'sent'" class="flex flex-col gap-6 text-xl">
                Nous avons bien reçu votre message, nous vous répondrons dans les plus brefs délais !
                <button type="button" class="border w-1/2 pt-4 pb-4 text-base" @click="closeForm">Fermer</button>
            </div>
            <form v-else class="flex flex-col gap-4" @submit.prevent="sendContact">
                <input v-model="contactName" class="p-3.5 outline-none" type="text" name="name" placeholder="Votre nom" autocomplete="name" required>
                <input v-model="contactCompany" class="p-3.5 outline-none" type="text" name="company" placeholder="Votre entreprise" autocomplete="organization" required>
                <input v-model="contactEmail" class="p-3.5 outline-none" type="email" name="email" placeholder="Votre email" autocomplete="email" required>
                <textarea v-model="contactMessage" class="p-3.5 resize-none outline-none" name="message" placeholder="Votre message" required></textarea>
                <!-- Honeypot: hidden from people, filled by bots -->
                <input v-model="honeypot" type="text" name="website" tabindex="-1" autocomplete="off" aria-hidden="true" class="hidden">
                <div v-if="contactName && contactCompany && contactEmail && contactMessage" class="flex gap-4">
                    <button class="border w-1/2 pt-4 pb-4 bg-black text-white disabled:opacity-50" type="submit" :disabled="sendState === 'sending'">{{ sendState === 'sending' ? 'Envoi…' : 'Envoyer' }}</button>
                    <button class="border w-1/2 pt-4 pb-4" type="button" @click="closeForm">Fermer</button>
                </div>
                <div v-else>
                    Veuillez remplir tous les champs pour envoyer le formulaire
                </div>
                <p v-if="sendState === 'error'" role="alert" class="text-red-700">L'envoi a échoué. Réessayez, ou écrivez-nous sur WhatsApp.</p>
            </form>
        </div>
    </div>
    <div class="pricing-page bg-[#f3f3f1] text-[#0d0d0d]">
        <main id="top">
            <!-- Intro -->
            <section class="max-w-[1312px] mx-auto px-5 lg:px-8 pt-12 lg:pt-24 lg:grid lg:grid-cols-12 lg:gap-x-6">
                <p class="lg:col-span-2 m-0 mb-5 lg:mb-0 lg:pt-[22px] text-xs lg:text-[13px] font-semibold tracking-[0.08em] uppercase text-[#5c5c5c]">Tarifs</p>
                <h1 class="lg:col-start-3 lg:col-span-10 m-0 text-[48px] lg:text-[clamp(48px,7.8vw,112px)] leading-[0.95] tracking-[-0.045em] font-medium">
                    <span class="block">Un prix clair.</span>
                    <span class="block pl-[22%] lg:pl-[18%] mt-1.5 lg:mt-0">Un projet <em class="font-['Georgia',serif] font-normal">sur mesure.</em></span>
                </h1>
                <p class="ml-[22%] lg:ml-0 lg:col-start-8 lg:col-span-5 mt-7 lg:mt-14 mb-0 text-base lg:text-[19px] leading-[1.45] text-[#3d3d3d]">Chaque offre est un point de départ. On ajuste le périmètre ensemble, avant de commencer.</p>
            </section>

            <!-- Offers: one row each on the asymmetric grid -->
            <section aria-label="Offres" class="max-w-[1312px] mx-auto px-5 lg:px-8 pt-[72px] lg:pt-[120px]">
                <article v-for="(p, i) in pricings" :key="p.title" class="border-t border-[#0d0d0d] pt-6 pb-9 lg:pt-10 lg:pb-14 flex flex-col gap-3.5 lg:grid lg:grid-cols-12 lg:gap-6">
                    <div class="flex justify-between gap-3 text-[13px] lg:text-sm lg:col-span-2 lg:flex-col lg:justify-start lg:gap-2">
                        <span class="font-semibold leading-[1.3] lg:order-2">{{ p.tagline }}</span>
                        <span class="text-[#5c5c5c] lg:order-1">{{ num(i) }}</span>
                    </div>
                    <div class="lg:col-start-3 lg:col-span-4 flex flex-col gap-3.5 lg:gap-4">
                        <h2 class="m-0 text-[34px] lg:text-[clamp(30px,3.2vw,44px)] leading-none tracking-[-0.035em] font-medium">{{ p.title }}</h2>
                        <p class="m-0 text-[15px] lg:text-[17px] leading-normal text-[#3d3d3d]">{{ p.description }}</p>
                    </div>
                    <!-- Mobile: price first, then the list behind a toggle -->
                    <div class="lg:hidden ml-[22%] flex flex-col gap-1">
                        <span class="text-[22px] font-semibold tracking-[-0.02em]">{{ p.price }}</span>
                        <span class="text-sm text-[#5c5c5c]">{{ p.timeline }}</span>
                    </div>
                    <button type="button" class="lg:hidden self-start min-h-[44px] p-0 border-0 bg-transparent text-[#0d0d0d] text-[15px] font-semibold underline underline-offset-[6px] cursor-pointer"
                        :aria-expanded="open === i" :aria-controls="'inclus-' + i" @click="open = open === i ? null : i">
                        {{ open === i ? 'Masquer le détail' : 'Ce qui est inclus (' + p.included.length + ')' }}
                    </button>
                    <ul :id="'inclus-' + i" aria-label="Inclus" class="m-0 p-0 list-none flex-col lg:flex lg:col-start-7 lg:col-span-3" :class="open === i ? 'flex' : 'hidden'">
                        <li v-for="item in p.included" :key="item" class="py-2 border-b border-[#d6d6d1] text-[15px]">{{ item }}</li>
                    </ul>
                    <div class="lg:col-start-10 lg:col-span-3 flex flex-col gap-1.5" :style="{ '--offset': OFFSETS[i % OFFSETS.length] }">
                        <span class="hidden lg:block text-[26px] font-semibold tracking-[-0.02em] leading-[1.1] lg:pt-[var(--offset)]">{{ p.price }}</span>
                        <span class="hidden lg:block text-[15px] text-[#5c5c5c]">{{ p.timeline }}</span>
                        <button type="button" class="lg:self-start lg:mt-[18px] flex items-center justify-center min-h-[52px] lg:min-h-[48px] px-[22px] border-0 bg-[#0d0d0d] text-white hover:bg-[#2a2a2a] text-base lg:text-[15px] font-semibold cursor-pointer" @click="startProject">Demander un devis</button>
                    </div>
                </article>
                <div class="border-t border-[#0d0d0d]"></div>
            </section>

            <!-- Closing CTA -->
            <section id="contact" class="max-w-[1312px] mx-auto px-5 lg:px-8 pt-[104px] pb-14 lg:pt-40 lg:pb-[120px] lg:grid lg:grid-cols-12 lg:gap-x-6">
                <h2 class="lg:col-span-12 m-0 text-[40px] lg:text-[clamp(44px,6.6vw,96px)] leading-[0.95] tracking-[-0.045em] font-medium">
                    <span class="block">Votre projet ne rentre pas dans une case ?</span>
                    <span class="block pl-[22%] lg:pl-[25%] mt-1.5 lg:mt-0">Tant mieux, <em class="font-['Georgia',serif] font-normal">parlons-en.</em></span>
                </h2>
                <div class="lg:col-start-4 lg:col-span-9 mt-10 lg:mt-14 flex flex-col items-start gap-3 lg:flex-row lg:flex-wrap lg:items-center lg:gap-x-8">
                    <button type="button" class="inline-flex items-center min-h-[56px] px-7 border-0 bg-[#0d0d0d] text-white hover:bg-[#2a2a2a] text-[17px] font-semibold cursor-pointer" @click="startProject">Démarrer un projet</button>
                    <a v-if="formEnabled" href="https://wa.me/+221778109390" target="_blank" rel="noopener" class="min-h-[44px] inline-flex items-center text-base lg:text-[17px] font-semibold text-[#0d0d0d] underline underline-offset-[6px] hover:text-[#5c5c5c]">WhatsApp</a>
                </div>
            </section>
        </main>
    </div>
    <Footer></Footer>
</template>

<script setup>
import Footer from '../components/Footer.vue';
import {ref, onMounted} from 'vue'
const route = useRoute()
// Email form off until Bird is configured: the buttons open WhatsApp instead
const formEnabled = !!useRuntimeConfig().public.contactForm
const startProject = () => {
    if (formEnabled) contactForm.value = true
    else window.open('https://wa.me/+221778109390', '_blank', 'noopener,noreferrer')
}
const contactForm = ref(false)
const open = ref(null) // mobile: which offer shows its list
const num = (i) => String(i + 1).padStart(2, '0')
// Staggered price column on desktop keeps the grid's rhythm
const OFFSETS = ['0px', '48px', '16px', '64px']
const contactName = ref('')
const contactCompany = ref('')
const contactEmail = ref('')
const contactMessage = ref('')
const honeypot = ref('')
const sendState = ref('idle') // idle | sending | sent | error
let submissionId = null

const sendContact = async () => {
    if (sendState.value === 'sending') return
    sendState.value = 'sending'
    // Same id on a retry, so Bird doesn't deliver the message twice
    submissionId = submissionId || crypto.randomUUID()
    try {
        await $fetch('/api/contact', {
            method: 'POST',
            body: { name: contactName.value, company: contactCompany.value, email: contactEmail.value, message: contactMessage.value, website: honeypot.value, submissionId },
        })
        sendState.value = 'sent'
        submissionId = null
        contactName.value = contactCompany.value = contactEmail.value = contactMessage.value = ''
    } catch (e) {
        sendState.value = 'error'
    }
}

// Also drops ?form=true, which keeps the form open
const closeForm = () => {
    contactForm.value = false
    if (sendState.value === 'sent') sendState.value = 'idle'
    if (route.query.form) navigateTo({ path: route.path, query: {} }, { replace: true })
}
const pricings = ref([
    {
        tagline: 'Expérience interactive',
        title: 'Mini-jeu publicitaire',
        description: `Création de mini-jeux web interactifs conçus pour engager votre audience et dynamiser vos campagnes marketing.`,
        price: 'À partir de 3200€',
        timeline: '3 à 5 semaines',
        included: [
            `Concept & game design`,
            `Développement PixiJS`,
            `Animations & effets visuels`,
            `Responsive mobile & desktop`,
            `Intégration branding`,
            `Optimisation des performances`,
            `Déploiement web`,
        ]
    },

    {
        tagline: 'Présence digitale premium',
        title: 'Site internet',
        description: `Conception et développement d’un site moderne, performant et pensé pour valoriser votre activité.`,
        price: 'À partir de 2500€',
        timeline: '5 à 7 semaines',
        included: [
            `Wireframing`,
            `UX/UI Design`,
            `Développement responsive`,
            `Optimisation SEO`,
            `Déploiement`,
            `CMS administrable`,
        ],
        addons: [
            {
                label: '',
                content: ''
            }
        ]
    },

    {
        tagline: 'Image de marque',
        title: 'Identité visuelle',
        description: `Création d’une identité visuelle cohérente et mémorable pour renforcer votre marque.`,
        price: 'À partir de 2200€',
        timeline: '2 à 3 semaines',
        included: [
            `Direction artistique`,
            `Création de logo`,
            `Palette de couleurs`,
            `Typographie`,
            `Charte graphique`,
        ],
        addons: [
            {
                label: '',
                content: ''
            }
        ]
    },

    {
        tagline: 'Motion & storytelling',
        title: 'Motion design',
        description: `Animations modernes et dynamiques pour présenter vos produits, services ou concepts.`,
        price: 'À partir de 2800€',
        timeline: '3 à 4 semaines',
        included: [
            `Storyboard`,
            `Motion design`,
            `Sound design`,
            `Export haute qualité`,
            `Formats réseaux sociaux`,
        ],
        addons: [
            {
                label: '',
                content: ''
            }
        ]
    },
    /*
    {
        tagline: 'All-In-One',
        title: 'Combo',
        description: `Une offre complète réunissant identité visuelle, site internet et motion design pour construire une présence de marque cohérente et impactante.`,
        price: 'À partir de 6500€',
        timeline: '4 à 8 semaines',
        included: [
            `Direction artistique`,
            `Identité visuelle complète`,
            `Wireframing & UX/UI`,
            `Développement responsive`,
            `Optimisation SEO`,
            `CMS administrable`,
            `Storyboard`,
            `Motion design`,
            `Sound design`,
            `Exports réseaux sociaux`,
        ],
        addons: [
            {
                label: '',
                content: ''
            }
        ]
    },
    */

])
</script>

<style scoped>
.pricing-page {
    font-family: 'Inter Tight', system-ui, sans-serif;
}
</style>