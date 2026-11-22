<template>

    <div @click="router.push('/')" class="fixed left-0 top-1/2 -translate-y-1/2 pt-4 pb-4 pr-2 pl-2 text-xl bg-black text-white cursor-pointer">←</div>

    <div class="mt-60 mb-60" v-if="items">
        <div class="mx-auto container">
            <div class="font-light text-6xl text-center">{{ items.title }}</div>
            <div class="mt-12 mb-12 grid lg:grid-cols-1 gap-10 text-center">
                <div>
                    <h2 class="font-light opacity-40 text-base">Client</h2>
                    <h1 class="text-base mt-0">{{ items.client?.fields?.name }}</h1>
                </div>
                <div>
                    <h2 class="text-base opacity-40">Savoir-faire</h2>
                    <h1 class="text-base mt-0">{{ items.category }}</h1>
                </div>
            </div>

            <RenderRichText v-if="items.content" :document="items.content" />
        </div>
    </div>

    <div class="mx-auto container">Ces projets pourraient vous intéresser <span class="ml-6">↓</span></div>
    <Grid :length="'recommendation'"></Grid>

    <Footer></Footer>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue';
import Grid from '../components/Work/Grid.vue';
import Footer from '../components/Footer.vue';
import RenderRichText from '../components/RenderRichText.vue';

//gsap
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
// Browser only: on the server GSAP would start a setTimeout at module load, which Cloudflare Workers forbids
if (import.meta.client) gsap.registerPlugin(ScrollTrigger)

const router = useRouter()
const route = useRoute()

const client = useContentful()

const items = ref(null)


onMounted(()=>{

    client.getEntries({
        content_type: 'studioWork',
        'fields.slug': route.params.slug,
        // Only the fields the page uses (`blocks` and `embed` are deprecated)
        select: 'sys.id,fields.title,fields.slug,fields.client,fields.content,fields.imageThumbnail,fields.videoThumbnail,fields.category',
        limit: 1,
    })
    .then(async(entries)=>{
        if (!entries.items.length) return
        items.value = entries.items[0].fields
        await nextTick()
        // all data-asset
        const assets = document.querySelectorAll('[data-asset]')
        assets.forEach((asset)=>{
            gsap.fromTo(asset, {opacity: 0, y: 150}, {opacity: 1, y: 0, duration: 1, scrollTrigger: {
                trigger: asset,
                scrub: false
            }})
        })
    })

})

</script>
