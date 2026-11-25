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

        <!-- Desktop: rows of 2 (3:2 then 2:3), all 16:9; the smaller card drifts with the scroll -->
        <div class="hidden lg:flex flex-col gap-14 pb-16">
            <div v-for="(row, r) in rows" :key="filter + r" class="flex flex-wrap items-start gap-x-3 gap-y-10">
                <NuxtLink v-for="p in row" :key="p.slug" :to="'/' + p.slug" :id="'projet-' + p.slug" :data-plx="p.slug"
                    class="card group no-underline block min-w-0" :style="{ flex: p.flex + ' 1 260px' }">
                    <div class="flex flex-col gap-3.5 will-change-transform" :style="{ transform: `translate3d(0, ${drift(p)}px, 0)` }">
                        <!-- Frame clips; the oversized inner layer is the image that slides -->
                        <div class="relative overflow-hidden bg-[#1c1c1c] aspect-video">
                            <div class="absolute inset-x-0 top-[-15%] h-[130%] will-change-transform" :style="{ transform: `translate3d(0, ${inner(p)}%, 0)` }">
                                <img v-if="p.image" class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]" :src="p.image + '?w=1400&fm=webp&q=80'" :alt="p.title" loading="lazy">
                            </div>
                        </div>
                        <div class="flex flex-col gap-0.5">
                            <span class="text-[15px] font-medium leading-tight text-[#4a4a4a]">{{ p.client }}</span>
                            <span class="text-xl font-semibold leading-tight tracking-[-0.02em] text-[#0d0d0d]">{{ p.title }}</span>
                        </div>
                    </div>
                </NuxtLink>
            </div>
        </div>

        <!-- Mobile: one column, staggered widths, 16:9 -->
        <div class="lg:hidden flex flex-col gap-10">
            <NuxtLink v-for="(p, i) in mobileList" :key="p.slug" :to="'/' + p.slug" :id="'projet-m-' + p.slug" class="no-underline flex flex-col gap-3"
                :style="{ width: mobileSizes[i % 3].w, marginLeft: mobileSizes[i % 3].ml }">
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
import { ref, computed, onMounted, onBeforeUnmount, nextTick } from 'vue';

const client = useContentful()

const projects = ref([])
const filter = ref('all')
const showAll = ref(false)
const shifts = ref({})

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

// Two cards per row, alternating 3:2 and 2:3. speed = drift in px at the viewport edge (the large card stays still).
const PATTERNS = [
    [{ flex: 3, speed: 0 }, { flex: 2, speed: -32 }],
    [{ flex: 2, speed: 32 }, { flex: 3, speed: 0 }],
]
const rows = computed(() => {
    const out = []
    for (let i = 0, r = 0; i < list.value.length; r++) {
        const pattern = PATTERNS[r % PATTERNS.length]
        out.push(list.value.slice(i, i + pattern.length).map((p, j) => ({ ...p, ...pattern[j] })))
        i += pattern.length
    }
    return out
})

const mobileSizes = [
    { w: '100%', ml: '0%' },
    { w: '78%', ml: '22%' },
    { w: '86%', ml: '0%' },
]
const mobileList = computed(() => (showAll.value ? list.value : list.value.slice(0, 4)))

const drift = (p) => ((shifts.value[p.slug] || 0) * p.speed).toFixed(1)
const inner = (p) => ((shifts.value[p.slug] || 0) * -9).toFixed(2) // image slides within its frame (max ±9% of the 130% layer)

const pick = async (id) => {
    filter.value = id
    showAll.value = false
    await nextTick()
    measure()
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

/* ---------- Parallax ---------- */

let reduced = false
let raf = null
// d = card centre relative to viewport centre, in viewport heights, clamped to [-1, 1].
const measure = () => {
    if (reduced) return
    const vh = window.innerHeight || 1
    const next = {}
    document.querySelectorAll('[data-plx]').forEach((el) => {
        const r = el.getBoundingClientRect()
        if (!r.height) return
        next[el.getAttribute('data-plx')] = Math.max(-1, Math.min(1, (r.top + r.height / 2 - vh / 2) / vh))
    })
    shifts.value = next
}
const onScroll = () => {
    if (raf) return
    raf = requestAnimationFrame(() => { raf = null; measure() })
}

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
    await nextTick()

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    measure()
})

onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', onScroll)
    if (raf) cancelAnimationFrame(raf)
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
