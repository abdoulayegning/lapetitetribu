<template>
    <section id="projets" class="scroll-mt-24 max-w-[1312px] mx-auto px-5 lg:px-8 pt-[88px] lg:pt-36">
        <div class="lg:grid lg:grid-cols-12 lg:gap-x-6 lg:items-end mb-8 lg:mb-16">
            <h2 class="lg:col-span-6 m-0 mb-4 lg:mb-0 text-[44px] lg:text-[clamp(40px,5vw,72px)] leading-[0.95] tracking-[-0.04em] font-medium">Projets</h2>
            <div role="group" aria-label="Filtrer les projets" class="lg:col-start-7 lg:col-span-6 flex flex-wrap gap-x-5 lg:gap-x-6 gap-y-2 lg:justify-end">
                <button v-for="f in filters" :key="f.id" type="button" :aria-pressed="f.selected" @click="pick(f.id)"
                    class="filter min-h-[44px] p-0 border-0 bg-transparent cursor-pointer text-base lg:text-lg"
                    :class="f.selected ? 'is-selected' : ''">
                    {{ f.label }}<sup class="hidden lg:inline text-[11px] ml-[3px]">{{ f.count }}</sup>
                </button>
            </div>
        </div>

        <!-- Desktop: rows alternate two equal cards, then one full-width card. All 16:9, no parallax. -->
        <div class="hidden lg:flex flex-col gap-14 pb-16">
            <div v-for="(row, r) in rows" :key="filter + r" class="flex flex-wrap items-start gap-x-8 gap-y-10">
                <NuxtLink v-for="p in row" :key="p.slug" :to="'/' + p.slug" :id="'projet-' + p.slug"
                    class="card group no-underline flex flex-col gap-3.5 min-w-0 flex-[1_1_320px]">
                    <div class="relative overflow-hidden bg-[#1c1c1c] aspect-video">
                        <img v-if="p.image" class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]" :src="p.image + '?w=' + (row.length === 1 ? 2400 : 1400) + '&fm=webp&q=80'" :alt="p.title" loading="lazy">
                    </div>
                    <div class="flex flex-col gap-0.5">
                        <span class="text-[15px] font-medium leading-tight text-[#4a4a4a]">{{ p.client }}</span>
                        <span class="text-xl font-semibold leading-tight tracking-[-0.02em] text-[#0d0d0d]">{{ p.title }}</span>
                    </div>
                </NuxtLink>
            </div>
        </div>

        <!-- Mobile: one column, every card full width and aligned, 16:9 -->
        <div class="lg:hidden flex flex-col gap-10">
            <NuxtLink v-for="p in mobileList" :key="p.slug" :to="'/' + p.slug" :id="'projet-m-' + p.slug" class="no-underline flex flex-col gap-3">
                <div class="bg-[#1c1c1c] overflow-hidden aspect-video">
                    <img v-if="p.image" class="w-full h-full object-cover" :src="p.image + '?w=900&fm=webp&q=80'" :alt="p.title" loading="lazy">
                </div>
                <div class="flex flex-col gap-0.5">
                    <span class="text-sm font-medium leading-tight text-[#4a4a4a]">{{ p.client }}</span>
                    <span class="text-[17px] font-semibold leading-tight tracking-[-0.02em] text-[#0d0d0d]">{{ p.title }}</span>
                </div>
            </NuxtLink>
            <button v-if="!showAll && list.length > 4" type="button" @click="showAll = true"
                class="self-start min-h-[44px] p-0 border-0 bg-transparent text-base font-semibold text-[#0d0d0d] underline underline-offset-[6px] cursor-pointer">Tous les projets</button>
        </div>
    </section>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from 'vue';

const client = useContentful()

const projects = ref([])
const filter = ref('all')
const showAll = ref(false)

// Categories are free text in Contentful ("Motion / Animation 2D", "UX/UI, Développement"…):
// a project can sit in several filters.
const CATS = {
    jeu: /advergame|gaming|gamification|jeu|game/i,
    web: /ux|ui|web|site|d[ée]veloppement|portfolio/i,
    motion: /motion|animation|sound/i,
}
const DEFS = [
    { id: 'all', label: 'Tous' },
    { id: 'jeu', label: 'Jeux' },
    { id: 'web', label: 'Web' },
    { id: 'motion', label: 'Motion' },
]
const inCat = (p, id) => id === 'all' || CATS[id].test(p.category)

const filters = computed(() => DEFS.map((d) => ({
    ...d,
    count: projects.value.filter((p) => inCat(p, d.id)).length,
    selected: filter.value === d.id,
})))

const list = computed(() => projects.value.filter((p) => inCat(p, filter.value)))

// Row rhythm: two equal cards, then one full-width card, repeat
const rows = computed(() => {
    const out = []
    for (let i = 0, r = 0; i < list.value.length; r++) {
        const n = r % 2 === 0 ? 2 : 1
        out.push(list.value.slice(i, i + n))
        i += n
    }
    return out
})

const mobileList = computed(() => (showAll.value ? list.value : list.value.slice(0, 4)))

const pick = (id) => {
    filter.value = id
    showAll.value = false
}

// Used by the clients sentence: show all projects, then scroll to the card
const jumpTo = async (slug) => {
    filter.value = 'all'
    showAll.value = true
    await nextTick()
    const desktop = window.matchMedia('(min-width: 1024px)').matches
    const el = document.getElementById((desktop ? 'projet-' : 'projet-m-') + slug)
    if (el) el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'center' })
}
defineExpose({ jumpTo })

let reduced = false

const asset = (a) => (a?.fields?.file?.url ? 'https:' + a.fields.file.url : null)

onMounted(async () => {
    reduced = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches)

    const entries = await client.getEntries({
        content_type: 'studioWork',
        select: 'fields.title,fields.slug,fields.client,fields.category,fields.imageThumbnail',
        order: '-sys.createdAt',
    })
    projects.value = entries.items.map((e) => ({
        slug: e.fields.slug,
        title: e.fields.title,
        client: e.fields.client?.fields?.name || '',
        category: e.fields.category || '',
        image: asset(e.fields.imageThumbnail),
    }))
})
</script>

<style scoped>
section {
    font-family: 'Inter Tight', system-ui, sans-serif;
}
.filter {
    font-family: 'Inter Tight', sans-serif;
    font-weight: 500;
    color: #5c5c5c;
}
.filter.is-selected {
    font-weight: 600;
    color: #0d0d0d;
    text-decoration: underline;
    text-underline-offset: 8px;
    text-decoration-thickness: 2px;
}
</style>
