<template>
    <div class="mx-auto container pb-40 pt-20">
        <div class="lg:text-6xl pt-10 pb-10">Des solutions créatives et digitales conçues pour donner à votre marque une présence forte, moderne et mémorable.</div>
        <div class="grid lg:grid-cols-3 gap-8">
            <div class="p-7 border bg-[#fffc]" v-for="pricing, i in pricings.slice(0, 3)">
                <h1 class="text-xl mb-6">{{ pricing.title }}</h1>
                <div class="mb-3 mt-3 text-3xl">{{ pricing.price }}</div>
                <div class="mb-3 mt-3 h-20 font-light">{{ pricing.description }}</div>
                <div class="mb-3 mt-3 opacity-40">{{ pricing.timeline }}</div>
                <div class="mb-3 mt-3">
                    <div class="text-xs opacity-60">Inclus</div>
                    <div v-for="i in pricing.included">
                        {{ i }}
                    </div>
                </div>
             </div>
        </div>
        <div class="grid lg:grid-cols-1 mt-8">
            <div class="p-7 border bg-[#fffc]">
                <h1 class="text-xl mb-6">{{ pricings[pricings.length -1].title }}</h1>
                <div class="mb-3 mt-3 text-3xl">{{ pricings[pricings.length -1].price }}</div>
                <div class="mb-3 mt-3 text-2xl font-light">{{ pricings[pricings.length -1].description }}</div>
                <div class="mb-3 mt-3 opacity-40">{{ pricings[pricings.length -1].timeline }}</div>
                <div class="mb-3 mt-3">
                    <div class="text-xs opacity-60">Inclus</div>
                    <div>
                        <div v-for="i in pricings[pricings.length -1].included">
                            {{ i }}
                        </div>
                    </div>
                </div>
             </div>
        </div>
    </div>
    <Footer></Footer>
</template>

<script setup>
import Footer from '../components/Footer.vue';
import {ref, onMounted} from 'vue'
const pricings = ref([
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
        timeline: '1 à 3 semaines',
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
}
])
</script>