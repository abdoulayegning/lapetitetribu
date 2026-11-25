<template>
    <div v-if="document">
        <template v-for="(s, i) in sections" :key="i">

            <!-- Text: consecutive paragraphs / lists, label column on desktop (from a heading, when there is one) -->
            <section v-if="s.type === 'text'" class="max-w-[1312px] mx-auto px-5 lg:px-8 pt-16 lg:pt-[120px] lg:grid lg:grid-cols-12 lg:gap-x-6">
                <span v-if="s.label" class="block mb-5 lg:mb-0 lg:col-span-2 lg:pt-[10px] text-xs lg:text-[13px] font-semibold tracking-[0.08em] uppercase text-[#5c5c5c]">{{ s.label }}</span>
                <div class="rt-text lg:col-start-3 lg:col-span-8 flex flex-col gap-5 lg:gap-7" v-html="s.html"></div>
            </section>

            <!-- Project film: a paragraph holding only a player.vimeo.com link -->
            <section v-else-if="s.type === 'vimeo'" class="max-w-[1312px] mx-auto lg:px-8 pt-16 lg:pt-[120px]">
                <div data-asset class="relative w-full aspect-video bg-[#0d0d0d]">
                    <iframe class="absolute inset-0 w-full h-full" :src="s.src" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" allowfullscreen title="Film du projet"></iframe>
                </div>
            </section>

            <!-- Embedded assets: full width, one after another, at their own ratio -->
            <section v-else class="max-w-[1312px] mx-auto px-5 lg:px-8 pt-12 lg:pt-[120px]">
                <figure data-asset class="m-0">
                    <img v-if="s.type === 'image'" class="block w-full h-auto" :src="s.url" :alt="s.alt" :width="s.width" :height="s.height" loading="lazy">
                    <video v-else class="block w-full h-auto" style="clip-path: inset(1px)" :src="s.url" muted autoplay loop playsinline disablePictureInPicture controlsList="nodownload"></video>
                </figure>
            </section>

        </template>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

const props = defineProps({
    document: Object,
    // URL of the hero media: the same asset in the body is not shown twice
    skipUrl: String,
})

const escapeAttr = (value = '') => String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

const isVimeo = (uri = '') => uri.includes('player.vimeo.com')

const RenderVimeo = (uri) =>
    `<span class="block relative w-full aspect-video my-3">` +
        `<iframe class="absolute inset-0 w-full h-full" src="${escapeAttr(uri)}" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" allowfullscreen></iframe>` +
    `</span>`

// Text inside a section: marks, lists and links (a Vimeo link inside a sentence still becomes the player)
const options = {
    renderMark: {
        [MARKS.BOLD]: (text) => `<strong>${text}</strong>`,
        [MARKS.ITALIC]: (text) => `<em>${text}</em>`,
        [MARKS.UNDERLINE]: (text) => `<span class="underline">${text}</span>`,
        [MARKS.CODE]: (text) => `<code>${text}</code>`,
    },
    renderNode: {
        [BLOCKS.PARAGRAPH]: (node, next) => `<p>${next(node.content)}</p>`,
        [BLOCKS.UL_LIST]: (node, next) => `<ul>${next(node.content)}</ul>`,
        [BLOCKS.OL_LIST]: (node, next) => `<ol>${next(node.content)}</ol>`,
        [BLOCKS.LIST_ITEM]: (node, next) => `<li>${node.content.map((child) =>
            child.nodeType === BLOCKS.PARAGRAPH ? next(child.content) : next([child])
        ).join('')}</li>`,
        [INLINES.HYPERLINK]: (node, next) => {
            const uri = node.data.uri
            if (isVimeo(uri)) return RenderVimeo(uri)
            return `<a href="${escapeAttr(uri)}" target="_blank" rel="noopener">${next(node.content)}&nbsp;↗</a>`
        },
    }
}

const toHtml = (nodes) => documentToHtmlString({ nodeType: BLOCKS.DOCUMENT, data: {}, content: nodes }, options)

const plainText = (node) => (node.content || []).map((n) => n.nodeType === 'text' ? n.value : plainText(n)).join('')

const isEmptyParagraph = (node) => node.content.every((n) => n.nodeType === 'text' && n.value.trim() === '')

// A paragraph holding only a Vimeo link (plus empty text nodes) is the project film
const soloVimeoLink = (node) => {
    const meaningful = node.content.filter((n) => !(n.nodeType === 'text' && n.value.trim() === ''))
    if (meaningful.length === 1 && meaningful[0].nodeType === INLINES.HYPERLINK && isVimeo(meaningful[0].data.uri)) {
        return meaningful[0].data.uri
    }
    return null
}

const assetSection = (node) => {
    const fields = node.data.target?.fields
    if (!fields?.file) return null
    const type = fields.file.contentType || ''
    const image = fields.file.details?.image
    const base = { url: fields.file.url, alt: fields.title || '', width: image?.width, height: image?.height }
    if (type.startsWith('image/')) return { type: 'image', ...base }
    if (type.startsWith('video/')) return { type: 'video', ...base }
    return null
}

// Walks `content` in order: consecutive text blocks form one section,
// a heading labels the text that follows it, empty paragraphs are skipped.
const sections = computed(() => {
    const out = []
    let text = []
    let label = ''
    const flush = () => {
        if (text.length) out.push({ type: 'text', label, html: toHtml(text) })
        text = []
        label = ''
    }

    for (const node of props.document?.content || []) {
        if (node.nodeType.startsWith('heading-')) {
            flush()
            label = plainText(node)
        } else if (node.nodeType === BLOCKS.PARAGRAPH) {
            if (isEmptyParagraph(node)) continue
            const vimeo = soloVimeoLink(node)
            if (vimeo) {
                flush()
                out.push({ type: 'vimeo', src: vimeo })
            } else {
                text.push(node)
            }
        } else if (node.nodeType === BLOCKS.EMBEDDED_ASSET) {
            flush()
            const asset = assetSection(node)
            if (asset && asset.url !== props.skipUrl) out.push(asset)
        } else if ([BLOCKS.UL_LIST, BLOCKS.OL_LIST, BLOCKS.QUOTE].includes(node.nodeType)) {
            text.push(node)
        }
    }
    flush()
    return out
})
</script>

<style scoped>
.rt-text :deep(p),
.rt-text :deep(li) {
    margin: 0;
    font-size: 21px;
    line-height: 1.35;
    letter-spacing: -0.015em;
    color: #2a2a2a;
    white-space: pre-line;
}
@media (min-width: 1024px) {
    .rt-text :deep(p),
    .rt-text :deep(li) {
        font-size: clamp(24px, 2.4vw, 34px);
        line-height: 1.3;
        letter-spacing: -0.02em;
    }
}
.rt-text :deep(strong) {
    font-weight: 600;
    color: #0d0d0d;
}
.rt-text :deep(em) {
    font-style: italic;
}
.rt-text :deep(a) {
    color: #0d0d0d;
    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-underline-offset: 6px;
}
.rt-text :deep(a:hover) {
    color: #5c5c5c;
}
.rt-text :deep(ul) {
    list-style: disc;
    padding-left: 1.2em;
}
.rt-text :deep(ol) {
    list-style: decimal;
    padding-left: 1.2em;
}
</style>
