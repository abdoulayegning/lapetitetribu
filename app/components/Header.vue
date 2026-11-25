<script setup>
import { ref, computed, watch } from 'vue';

const route = useRoute()
const open = ref(false)

// Close the mobile menu whenever the page (or the #anchor) changes
watch(() => route.fullPath, () => { open.value = false })

// Project pages are the catch-all /[slug] routes: "Projets" is underlined there
const onProjectPage = computed(() => !['/', '/pricing', '/brief', '/contact', '/work'].includes(route.path))
</script>

<template>
    <header class="lpt-header sticky top-0 z-[150] bg-[rgba(243,243,241,0.94)] backdrop-blur-md text-[#0d0d0d]">
        <div class="max-w-[1312px] mx-auto h-16 lg:h-auto lg:min-h-[88px] px-5 lg:px-8 flex items-center justify-between gap-x-8 gap-y-4 flex-wrap">
            <NuxtLink to="/" class="wordmark no-underline text-[#0d0d0d] hover:text-[#0d0d0d] text-lg lg:text-[22px]">la petite tribu</NuxtLink>

            <!-- Desktop navigation -->
            <nav aria-label="Navigation principale" class="hidden lg:flex items-center flex-wrap gap-x-8 gap-y-2">
                <NuxtLink to="/#projets" class="nav-link" :class="onProjectPage ? 'is-current' : ''" :aria-current="onProjectPage ? 'page' : undefined">Projets</NuxtLink>
                <NuxtLink to="/#services" class="nav-link">Services</NuxtLink>
                <NuxtLink to="/pricing" class="nav-link" :class="route.path === '/pricing' ? 'is-current' : ''" :aria-current="route.path === '/pricing' ? 'page' : undefined">Tarifs</NuxtLink>
                <NuxtLink :to="{ path: '/pricing', query: { form: 'true' } }" class="nav-link font-semibold underline underline-offset-[6px]">Démarrer un projet ↗</NuxtLink>
            </nav>

            <!-- Mobile menu button -->
            <button type="button" class="lg:hidden min-w-[44px] h-11 border-0 bg-transparent text-[#0d0d0d] text-[15px] font-semibold underline underline-offset-[6px] cursor-pointer"
                :aria-expanded="open" :aria-label="open ? 'Fermer le menu' : 'Ouvrir le menu'" @click="open = !open">
                {{ open ? 'Fermer' : 'Menu' }}
            </button>
        </div>

        <!-- Mobile menu: full screen under the bar -->
        <nav v-if="open" aria-label="Navigation principale" class="lg:hidden fixed top-16 inset-x-0 bottom-0 bg-[#f3f3f1] px-5 py-6 flex flex-col overflow-y-auto">
            <NuxtLink to="/#projets" class="menu-link"><span>Projets</span><span class="menu-num">01</span></NuxtLink>
            <NuxtLink to="/#services" class="menu-link pl-[15%]"><span>Services</span><span class="menu-num">02</span></NuxtLink>
            <NuxtLink to="/pricing" class="menu-link pl-[30%]"><span>Tarifs</span><span class="menu-num">03</span></NuxtLink>
            <NuxtLink :to="{ path: '/pricing', query: { form: 'true' } }" class="mt-8 flex items-center justify-center min-h-[56px] bg-[#0d0d0d] text-white hover:text-white text-[17px] font-semibold no-underline">Démarrer un projet</NuxtLink>
        </nav>
    </header>
</template>

<style scoped>
.lpt-header {
    font-family: 'Inter Tight', system-ui, sans-serif;
}
.wordmark {
    font-family: 'Archivo', sans-serif;
    font-stretch: 125%;
    font-weight: 800;
}
.nav-link {
    font-size: 15px;
    font-weight: 500;
    color: #0d0d0d;
    text-decoration: none;
}
.nav-link:hover {
    color: #5c5c5c;
}
.nav-link.is-current {
    font-weight: 600;
    text-decoration: underline;
    text-underline-offset: 6px;
    text-decoration-thickness: 2px;
}
.menu-link {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    padding-top: 14px;
    padding-bottom: 14px;
    border-bottom: 1px solid #c9c9c4;
    font-size: 40px;
    font-weight: 500;
    letter-spacing: -0.03em;
    color: #0d0d0d;
    text-decoration: none;
}
.menu-num {
    font-size: 13px;
    color: #5c5c5c;
}
</style>
