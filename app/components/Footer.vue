<template>
    <footer class="lpt-footer border-t border-[#0d0d0d] bg-[#f3f3f1] text-[#0d0d0d]">
        <div class="max-w-[1312px] mx-auto px-5 pt-6 pb-10 lg:p-8 flex flex-col lg:flex-row lg:flex-wrap lg:justify-between lg:items-center gap-4 lg:gap-x-8 text-sm">
            <span class="wordmark text-base">la petite tribu</span>
            <nav aria-label="Réseaux" class="flex flex-wrap gap-x-5 lg:gap-x-6 gap-y-2">
                <a href="https://instagram.com/lapetitetribu.co" target="_blank" rel="noopener" class="footer-link">Instagram</a>
                <a href="https://www.linkedin.com/company/11048102/" target="_blank" rel="noopener" class="footer-link">LinkedIn</a>
                <a href="https://vimeo.com/lapetitetribu" target="_blank" rel="noopener" class="footer-link">Vimeo</a>
                <a href="https://popmyproduct.com" target="_blank" rel="noopener" class="footer-link">Pop My Product</a>
            </nav>
            <span class="text-[#5c5c5c]">© {{ new Date().getFullYear() }}</span>
        </div>
    </footer>
</template>

<style scoped>
.lpt-footer {
    font-family: 'Inter Tight', system-ui, sans-serif;
}
.wordmark {
    font-family: 'Archivo', sans-serif;
    font-stretch: 125%;
    font-weight: 800;
}
.footer-link {
    color: #0d0d0d;
    text-decoration: underline;
    text-underline-offset: 4px;
}
.footer-link:hover {
    color: #5c5c5c;
}
</style>
