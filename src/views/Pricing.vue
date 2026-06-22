<template>
    <div v-if="contactForm" class="border fixed bg-gray-100 w-full h-screen z-10 flex justify-center items-center">
        <div class="mx-auto container lg:pl-60 lg:pr-60">
            <div></div>
            <form class="flex flex-col gap-4" action="https://api.web3forms.com/submit" method="POST">
                <input type="hidden" name="access_key" value="ec632a69-de8c-4fe2-864a-b63001799fe3" />
                <input type="hidden" name="subject" value="Let's talk about your project!" />
                <input type="hidden" name="redirect" value="https://google.com/">
                <input type="hidden" name="from_name" value="La Petite Tribu" />
                <input class="p-3.5 outline-none" type="text" name="name" placeholder="Votre nom">
                <input class="p-3.5 outline-none" type="text" name="company" placeholder="Votre entreprise">
                <input class="p-3.5 outline-none" type="email" name="email" placeholder="Votre email">
                <textarea class="p-3.5 resize-none outline-none" name="message" placeholder="Votre message"></textarea>
                <div class="flex gap-4">
                    <button class="border w-1/2 pt-4 pb-4 bg-black text-white" type="submit">Envoyer</button>
                    <button class="border w-1/2 pt-4 pb-4" @click="contactForm = false">Fermer</button>
                </div>
            </form>
        </div>
    </div>
    <div class="mx-auto container pb-40 pt-20">
        <div class="lg:text-6xl text-3xl pt-10 pb-10">Des solutions créatives et digitales conçues pour donner à votre marque une présence forte, moderne et mémorable.</div>
        <div class="grid lg:grid-cols-3 gap-8">
            <div class="p-7 border bg-[#fffc] relative" v-for="pricing, i in pricings.slice(0, 3)">
                <h1 class="text-xl mb-6">{{ pricing.title }}</h1>
                <div class="mb-3 mt-3 text-3xl">{{ pricing.price }}</div>
                <div class="mb-3 mt-3 h-20 font-light">{{ pricing.description }}</div>
                <div class="text-xs opacity-60">Délai</div>
                <div class="mb-3 opacity-40">{{ pricing.timeline }}</div>
                <div class="mb-3 mt-3">
                    <div class="text-xs opacity-60">Inclus</div>
                    <div v-for="i in pricing.included">
                        {{ i }}
                    </div>
                </div>
                <div class="absolute bottom-4 right-4 w-10 aspect-square bg-black text-white flex justify-center items-center cursor-pointer" @click="contactForm = true">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><!-- Icon from Material Design Icons by Pictogrammers - https://github.com/Templarian/MaterialDesign/blob/master/LICENSE --><path fill="white" d="M20 2H4a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2"/></svg>
                </div>
             </div>
        </div>
        <div class="grid lg:grid-cols-1 gap-8 mt-8">
            <div class="p-7 border bg-[#fffc] relative">
                <h1 class="text-xl mb-6">{{ pricings[pricings.length-2].title }}</h1>
                <div class="mb-3 mt-3 text-3xl">{{ pricings[pricings.length-2].price }}</div>
                <div class="mb-3 mt-3 text-2xl font-light">{{ pricings[pricings.length-2].description }}</div>
                <div class="text-xs opacity-60">Délai</div>
                <div class="mb-3 opacity-40">{{ pricings[pricings.length-2].timeline }}</div>
                <div class="mb-3 mt-3">
                    <div class="text-xs opacity-60">Inclus</div>
                    <div>
                        <div v-for="i in pricings[pricings.length -1].included">
                            {{ i }}
                        </div>
                    </div>
                </div>
                <div class="absolute bottom-4 right-4 w-10 aspect-square bg-black text-white flex justify-center items-center cursor-pointer" @click="contactForm = true">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><!-- Icon from Material Design Icons by Pictogrammers - https://github.com/Templarian/MaterialDesign/blob/master/LICENSE --><path fill="white" d="M20 2H4a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2"/></svg>
                </div>
            </div>

            <div class="p-7 border bg-[#fffc] relative">
                <h1 class="text-xl mb-6">{{ pricings[pricings.length-1].title }}</h1>
                <div class="mb-3 mt-3 text-3xl">{{ pricings[pricings.length-1].price }}</div>
                <div class="mb-3 mt-3 text-2xl font-light">{{ pricings[pricings.length-1].description }}</div>
                <div class="text-xs opacity-60">Délai</div>
                <div class="mb-3 mt-0 opacity-40">{{ pricings[pricings.length-1].timeline }}</div>
                <div class="mb-3 mt-3">
                    <div class="text-xs opacity-60">Inclus</div>
                    <div>
                        <div v-for="i in pricings[pricings.length-1].included">
                            {{ i }}
                        </div>
                    </div>
                </div>
                <div class="absolute bottom-4 right-4 w-10 aspect-square bg-black text-white flex justify-center items-center cursor-pointer" @click="contactForm = true">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><!-- Icon from Material Design Icons by Pictogrammers - https://github.com/Templarian/MaterialDesign/blob/master/LICENSE --><path fill="white" d="M20 2H4a2 2 0 0 0-2 2v18l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2"/></svg>
                </div>
            </div>
        </div>
    </div>
    <Footer></Footer>
</template>

<script setup>
import Footer from '../components/Footer.vue';
import {ref, onMounted} from 'vue'
const contactForm = ref(false)
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
    }
])
</script>