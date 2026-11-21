<template>
    <div v-if="document" v-html="html"></div>
</template>

<script setup>
import { computed } from 'vue';
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

const props = defineProps({
    document: Object
})

const escapeAttr = (value = '') => String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

const isVimeo = (uri = '') => uri.includes('player.vimeo.com')

const RenderVimeo = (uri) =>
    `<div class="mb-3 mt-3 w-full relative" style="padding-top:56.25%">` +
        `<iframe class="absolute top-0 left-0 w-full h-full" src="${escapeAttr(uri)}" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" allowfullscreen></iframe>` +
    `</div>`

const RenderAsset = (node) => {
    const fields = node.data.target?.fields
    if (!fields?.file) return ''

    const title = escapeAttr(fields.title)
    const type = fields.file.contentType || ''
    const url = escapeAttr(fields.file.url)

    if (type.startsWith('image/')) {
        return `<img class="mb-3 mt-3 w-full" src="${url}" alt="${title}">`
    }
    if (type.startsWith('video/')) {
        return `<video style="clip-path: inset(1px)" class="mb-3 mt-3 w-full" muted autoplay loop playsinline disablePictureInPicture controlsList="nodownload"><source src="${url}" type="${escapeAttr(type)}"></video>`
    }
    return ''
}

// A paragraph holding only a Vimeo link (plus empty text nodes) is rendered as the video alone, full width
const soloVimeoLink = (paragraph) => {
    const meaningful = paragraph.content.filter((n) => !(n.nodeType === 'text' && n.value.trim() === ''))
    if (meaningful.length === 1 && meaningful[0].nodeType === INLINES.HYPERLINK && isVimeo(meaningful[0].data.uri)) {
        return meaningful[0].data.uri
    }
    return null
}

const options = {
    renderMark: {
        [MARKS.BOLD]: (text) => `<span class="font-['PP_Bold']">${text}</span>`,
        [MARKS.ITALIC]: (text) => `<em class="italic">${text}</em>`,
        [MARKS.UNDERLINE]: (text) => `<span class="underline">${text}</span>`,
        [MARKS.CODE]: (text) => `<code class="px-1 bg-gray-100 rounded">${text}</code>`,
    },

    renderNode: {
        [BLOCKS.EMBEDDED_ASSET]: (node) => `<div data-asset>` + RenderAsset(node) + `</div>`,

        [BLOCKS.PARAGRAPH]: (node, next) => {
            const vimeo = soloVimeoLink(node)
            if (vimeo) return `<div data-asset>` + RenderVimeo(vimeo) + `</div>`
            return `<div class="text-center text-xl lg:w-[70%] mx-auto mt-16 mb-16">${next(node.content)}</div>`
        },

        [BLOCKS.HEADING_1]: (node, next) => `<h1 class="text-center text-5xl lg:w-[70%] mx-auto mt-16 mb-8">${next(node.content)}</h1>`,
        [BLOCKS.HEADING_2]: (node, next) => `<h2 class="text-center text-4xl lg:w-[70%] mx-auto mt-16 mb-8">${next(node.content)}</h2>`,
        [BLOCKS.HEADING_3]: (node, next) => `<h3 class="text-center text-3xl lg:w-[70%] mx-auto mt-12 mb-6">${next(node.content)}</h3>`,
        [BLOCKS.HEADING_4]: (node, next) => `<h4 class="text-center text-2xl lg:w-[70%] mx-auto mt-12 mb-6">${next(node.content)}</h4>`,

        [BLOCKS.UL_LIST]: (node, next) => `<ul class="list-disc list-inside text-center text-xl lg:w-[70%] mx-auto mt-8 mb-8">${next(node.content)}</ul>`,
        [BLOCKS.OL_LIST]: (node, next) => `<ol class="list-decimal list-inside text-center text-xl lg:w-[70%] mx-auto mt-8 mb-8">${next(node.content)}</ol>`,
        // Render list item paragraphs inline, without the big paragraph margins
        [BLOCKS.LIST_ITEM]: (node, next) => `<li class="mt-2 mb-2">${node.content.map((child) =>
            child.nodeType === BLOCKS.PARAGRAPH ? next(child.content) : next([child])
        ).join('')}</li>`,

        [INLINES.HYPERLINK]: (node, next) => {
            const uri = node.data.uri
            if (isVimeo(uri)) return RenderVimeo(uri)
            return `<a class="underline" href="${escapeAttr(uri)}" target="_blank" rel="noopener">${next(node.content)}</a>`
        },
    }
}

const html = computed(() => props.document ? documentToHtmlString(props.document, options) : '')
</script>
