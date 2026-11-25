<template>
    <div class="project-page bg-[#f3f3f1] text-[#0d0d0d] min-h-screen">
        <main v-if="items" id="top">

            <!-- Title on the asymmetric grid, meta in a ruled column -->
            <section class="max-w-[1312px] mx-auto px-5 lg:px-8 pt-8 lg:pt-[72px] lg:grid lg:grid-cols-12 lg:gap-x-6 lg:gap-y-14">
                <div class="flex justify-between items-center mb-7 lg:mb-0 lg:col-span-2 lg:flex-col lg:items-start lg:justify-start lg:gap-2.5 lg:pt-4">
                    <NuxtLink to="/" class="min-h-[44px] inline-flex items-center text-sm font-semibold no-underline text-[#0d0d0d] hover:text-[#5c5c5c]">← Projets</NuxtLink>
                    <span v-if="position" class="text-xs lg:text-[13px] font-semibold tracking-[0.08em] uppercase text-[#5c5c5c]">{{ position.index }} / {{ position.total }}</span>
                </div>

                <h1 class="lg:col-start-3 lg:col-span-10 m-0 text-[44px] lg:text-[clamp(44px,6.4vw,96px)] leading-[0.95] tracking-[-0.045em] font-medium">{{ items.title }}</h1>

                <dl class="mt-8 ml-[22%] lg:mt-0 lg:ml-0 lg:col-start-8 lg:col-span-5 border-t border-[#0d0d0d]">
                    <div v-if="items.client?.fields?.name" class="py-2.5 lg:py-3.5 border-b border-[#c9c9c4] flex flex-col gap-0.5 lg:grid lg:grid-cols-[120px_minmax(0,1fr)] lg:gap-4">
                        <dt class="text-xs lg:text-sm text-[#5c5c5c]">Client</dt>
                        <dd class="m-0 text-[15px] lg:text-[17px] font-medium">{{ items.client.fields.name }}</dd>
                    </div>
                    <div v-if="skills" class="py-2.5 lg:py-3.5 border-b border-[#c9c9c4] flex flex-col gap-0.5 lg:grid lg:grid-cols-[120px_minmax(0,1fr)] lg:gap-4">
                        <dt class="text-xs lg:text-sm text-[#5c5c5c]">Savoir-faire</dt>
                        <dd class="m-0 text-[15px] lg:text-[17px] font-medium">{{ skills }}</dd>
                    </div>
                </dl>
            </section>

            <!-- Hero: videoThumbnail (autoplay loop), else imageThumbnail; both cover a 16:9 frame -->
            <section v-if="hero" aria-label="Visuel principal" class="max-w-[1312px] mx-auto lg:px-8 pt-10 lg:pt-[72px]">
                <div data-asset class="bg-[#141414]">
                    <video v-if="hero.isVideo" class="block w-full aspect-video object-cover" :src="hero.url" muted autoplay loop playsinline disablePictureInPicture controlsList="nodownload"></video>
                    <img v-else class="block w-full aspect-video object-cover" :src="hero.url" :alt="hero.alt" :width="hero.width" :height="hero.height">
                </div>
            </section>

            <!-- Rich-text content, in Contentful order -->
            <RenderRichText v-if="items.content" :document="items.content" :skip-url="hero?.url" />

            <!-- Next project -->
            <section v-if="nextProject" aria-label="Projet suivant" class="max-w-[1312px] mx-auto px-5 lg:px-8 pt-24 lg:pt-40">
                <NuxtLink :to="'/' + nextProject.slug" class="no-underline text-[#0d0d0d] flex flex-col gap-1.5 lg:grid lg:grid-cols-12 lg:gap-x-6 lg:gap-y-3 pt-6 pb-8 lg:pt-10 lg:pb-14 border-t border-b border-[#0d0d0d] group">
                    <span class="lg:col-span-2 lg:pt-3.5 text-xs lg:text-[13px] font-semibold tracking-[0.08em] uppercase text-[#5c5c5c]">Projet suivant</span>
                    <span class="lg:col-start-3 lg:col-span-10 flex flex-col gap-2 mt-2 lg:mt-0">
                        <span class="text-sm lg:text-[15px] font-medium text-[#4a4a4a]">{{ nextProject.client }}</span>
                        <span class="text-4xl lg:text-[clamp(36px,5vw,72px)] leading-[0.95] tracking-[-0.04em] font-medium group-hover:text-[#5c5c5c]">{{ nextProject.title }} →</span>
                    </span>
                </NuxtLink>
            </section>

            <ClosingCTA />
        </main>

        <Footer></Footer>
    </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, nextTick } from 'vue';
import Footer from '../components/Footer.vue';
import RenderRichText from '../components/RenderRichText.vue';
import ClosingCTA from '../components/ClosingCTA.vue';

//gsap
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
// Browser only: on the server GSAP would start a setTimeout at module load, which Cloudflare Workers forbids
if (import.meta.client) gsap.registerPlugin(ScrollTrigger)

const route = useRoute()
const client = useContentful()

const items = ref(null)
const projects = ref([])

// "UX & UI / Développement / Advergame" → "UX & UI · Développement · Advergame"
const skills = computed(() => (items.value?.category || '').split(/\s*[\/,]\s*/).filter(Boolean).join(' · '))

// videoThumbnail first, imageThumbnail when there is no video
const hero = computed(() => {
    const asset = items.value?.videoThumbnail || items.value?.imageThumbnail
    const file = asset?.fields?.file
    if (!file) return null
    return {
        url: file.url,
        alt: asset.fields.title || items.value.title,
        isVideo: (file.contentType || '').startsWith('video/'),
        width: file.details?.image?.width,
        height: file.details?.image?.height,
    }
})

const position = computed(() => {
    const i = projects.value.findIndex((p) => p.slug === route.params.slug)
    if (i < 0) return null
    const pad = (n) => String(n).padStart(2, '0')
    return { i, index: pad(i + 1), total: pad(projects.value.length) }
})

const nextProject = computed(() => {
    if (!position.value || projects.value.length < 2) return null
    return projects.value[(position.value.i + 1) % projects.value.length]
})

const animateAssets = async () => {
    await nextTick()
    document.querySelectorAll('[data-asset]').forEach((asset) => {
        gsap.fromTo(asset, { opacity: 0, y: 150 }, { opacity: 1, y: 0, duration: 1, scrollTrigger: { trigger: asset, scrub: false } })
    })
}

const load = async (slug) => {
    const entries = await client.getEntries({
        content_type: 'studioWork',
        'fields.slug': slug,
        // Only the fields the page uses (`blocks` and `embed` are deprecated)
        select: 'sys.id,fields.title,fields.slug,fields.client,fields.content,fields.imageThumbnail,fields.videoThumbnail,fields.category',
        limit: 1,
    })
    if (!entries.items.length) return
    items.value = entries.items[0].fields
    animateAssets()
}

const loadProjects = async () => {
    const entries = await client.getEntries({
        content_type: 'studioWork',
        select: 'fields.title,fields.slug,fields.client',
        order: '-sys.createdAt',
    })
    projects.value = entries.items.map((e) => ({ slug: e.fields.slug, title: e.fields.title, client: e.fields.client?.fields?.name || '' }))
}

onMounted(() => {
    load(route.params.slug)
    loadProjects()
})

// "Projet suivant" stays on this page component: reload when the slug changes
watch(() => route.params.slug, (slug) => {
    if (!slug) return
    items.value = null
    window.scrollTo(0, 0)
    load(slug)
})
</script>

<style scoped>
.project-page {
    font-family: 'Inter Tight', system-ui, sans-serif;
}
</style>
