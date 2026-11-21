import { fileURLToPath } from 'node:url'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  css: [
    '~/assets/styles/style.css',
    '~/assets/styles/global.css',
    '~/assets/styles/layouts.css',
    'swiper/css',
    '~/assets/pp-neue-montreal/style.css',
    'keen-slider/keen-slider.min.css',
    'splitting/dist/splitting.css',
    'splitting/dist/splitting-cells.css',
  ],

  // CommonJS packages whose imports break during SSR
  build: {
    transpile: ['gsap', '@contentful/rich-text-types', '@contentful/rich-text-html-renderer', 'contentful-rich-text-vue-renderer'],
  },

  vite: {
    $server: {
      resolve: {
        alias: [
          { find: /^splitting$/, replacement: fileURLToPath(new URL('./app/js/stubs/splitting.js', import.meta.url)) },
        ],
      },
    },
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  // Values are read from the existing VITE_* variables at build time,
  // and can be overridden at runtime with NUXT_PUBLIC_* variables.
  runtimeConfig: {
    public: {
      contentfulSpaceId: process.env.VITE_CONTENTFUL_SPACE_ID,
      contentfulApiKey: process.env.VITE_CONTENTFUL_API_KEY, // Only published !!!
      web3formsAccessKey: process.env.VITE_WEB3FORMS_ACCESS_KEY,
    },
  },

  app: {
    rootAttrs: {
      class: 'relative overflow-x-hidden',
    },
    head: {
      htmlAttrs: { lang: 'en' },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1.0',
      title: 'La Petite Tribu ® - Motion, Digital, Branding',
      meta: [
        { name: 'title', content: 'La Petite Tribu ® - Motion, Digital, Branding' },
        { name: 'description', content: "Studio digital basé à Dakar, Sénégal. Créateur d'expériences digitales interactives pour les marques ambitieuses, innovantes et surtout audacieuses !" },
        { name: 'keywords', content: 'site internet, design, animation 2d, animation 3d, wordpress, html, css, dakar, senegal, nuxt, vue, art, landing page, ecommerce, site vitrine' },
        { name: 'robots', content: 'index, follow' },
        { name: 'language', content: 'French' },
        { name: 'author', content: 'Abdoulaye GNING / La Petite Tribu' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Urbanist:ital,wght@0,100..900;1,100..900&display=swap' },
      ],
      script: [
        // Google Tag Manager
        { innerHTML: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-PQMZQHP5');` },
        { src: 'https://kit.fontawesome.com/1dd68e2cb0.js', crossorigin: 'anonymous' },
        // Microsoft Clarity
        { innerHTML: `(function(c,l,a,r,i,t,y){
c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
})(window, document, "clarity", "script", "o7a7ivowth");` },
        // Google tag (gtag.js)
        { src: 'https://www.googletagmanager.com/gtag/js?id=G-BZ1DL8HQFP', async: true },
        { innerHTML: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-BZ1DL8HQFP');` },
        // LinkedIn Insight
        { tagPosition: 'bodyClose', innerHTML: `_linkedin_partner_id = "2447561";
window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
window._linkedin_data_partner_ids.push(_linkedin_partner_id);` },
        { tagPosition: 'bodyClose', innerHTML: `(function(l) {
if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
window.lintrk.q=[]}
var s = document.getElementsByTagName("script")[0];
var b = document.createElement("script");
b.type = "text/javascript";b.async = true;
b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
s.parentNode.insertBefore(b, s);})(window.lintrk);` },
      ],
      noscript: [
        // Google Tag Manager (noscript)
        { tagPosition: 'bodyOpen', innerHTML: '<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PQMZQHP5" height="0" width="0" style="display:none;visibility:hidden"></iframe>' },
        { tagPosition: 'bodyClose', innerHTML: '<img height="1" width="1" style="display:none;" alt="" src="https://px.ads.linkedin.com/collect/?pid=2447561&fmt=gif" />' },
      ],
    },
  },
})
