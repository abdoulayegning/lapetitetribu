<template>
    <div class="container mx-auto pt-48 pb-48 text-xl">

        <p class="mb-8 font-['DM_Sans'] w-full text-center pl-32 pr-32">
                L’une des entreprises leader du secteur du mobile money Wave Mobile Money voudrait déployer un « advergame » en ligne dans le but d’accroître la capitale sympathie et d'améliorer encore plus le trafic digital.
        </p>

        <div class="grid grid-cols-1 lg:grid-cols-3 text-center font-['DM_Sans']">
            <div>
                <div class="text-gray-400 font-['PP_Neue_Machina_Plain'] uppercase text-xs">Type de projet</div>
                <div>Jeu vidéo</div>
                <div>Activation digital</div>
            </div>
            <div>
                <div class="text-gray-400 font-['PP_Neue_Machina_Plain'] uppercase text-xs">Rôles</div>
                <div>Conception de jeu & UX/UI</div>
                <div>Direction artistique & créative</div>
                <div>Prototype & Développement</div> 
                <div>Déploiement</div>
            </div>
            <div>
                <div class="text-gray-400 font-['PP_Neue_Machina_Plain'] uppercase text-xs">Crédits</div>
                <div>Wave Digital Finance</div> 
            </div>
        </div>
         
        
         
        
        <div class="mt-24">
            <div style="padding:56.25% 0 0 0;position:relative;"><iframe src="https://player.vimeo.com/video/1034507359?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write" style="position:absolute;top:0;left:0;width:100%;height:100%;" title="La Petite Tribu x Wave Sénégal - Summer Xeweul 2024 - Case Study"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>
        </div>

        <div class="text-3xl text-center font-['DM_Sans'] font-bold">Mécaniques inspirées d’un classique</div>
        <div class="mt-8 mb-24 text-xl text-center font-['DM_Sans'] font-medium">
            Garder les mécaniques de Tetris sur la logique de la construction tout en faisant le rappel du nom de la marque.
            Le joueur a pour but d'écrire le mot « Wave » à l’horizontal, ce qui fait monter au niveau supérieur et pour corser l'expérience la vitesse du jeu s'accélérate au fil des niveaux.
        </div> 

        <div class="mt-10 mb-10">
            <img src="/wave-summer-xeweul/screenshot-1.png" alt="">
        </div>

        <div class="mt-10 mb-10">
            <img src="/wave-summer-xeweul/screenshot-2.png" alt="">
        </div>

        <div class="mt-10 mb-10">
            <img src="/wave-summer-xeweul/screenshot-3.png" alt="">
        </div>

        <div class="mt-10 mb-10">
            <img src="/wave-summer-xeweul/screenshot-4.png" alt="">
        </div>

        <div class="mt-16 grid grid-cols-3 gap-4 font-['DM_Sans']">
            <img src="/wave-summer-xeweul/mobile-src-1.jpg" alt="">
            <img src="/wave-summer-xeweul/mobile-src-2.jpg" alt="">
            <img src="/wave-summer-xeweul/mobile-src-3.jpg" alt="">
        </div>

        <div class="text-4xl font-bold mt-20 text-center font-['DM_Sans']">Quelques chiffres...</div>

        <div class="mt-16 grid lg:grid-cols-4 font-['DM_Sans'] text-center">
            <div>
                <div class="">Nombre de joueurs</div>
                <div class="text-4xl font-bold mt-3">+2000</div>
            </div>
            <div>
                <div class="">Durée d'engagement</div>
                <div class="text-4xl font-bold mt-3">5 à 10 minutes</div>
            </div>
            <div>
                <div class="">Utilisateurs actifs par minute</div>
                <div class="text-4xl font-bold mt-3">+10</div>
            </div> 
            <div>
                <div class="">Utilisateurs sur mobile</div>
                <div class="text-4xl font-bold mt-3">+95%</div>
            </div> 
        </div>

        <p class="mt-8 w-full text-center pl-32 pr-32 font-['DM_Sans'] mb-10">
            Un fort engagement a été noté par la communauté <u>Instagram</u> de Wave.
        </p>

        <div class="mt-16">
            <img src="/wave-summer-xeweul/bundle.png" alt="">
        </div>

        <div class="grid lg:grid-cols-2 font-['DM_Sans']">
            <div class="">
                <h4 class="underline text-center mb-7">Typographie</h4>
                <img src="/wave-summer-xeweul/typo.png" alt="">
            </div> 
            <div>
                <h4 class="underline text-center mb-7">Palette</h4>
                <Palette :colors="['#6FC3F1', '#5352D6', '#CAEAFD', '#F5E398', '#4549D4']"></Palette>
            </div>
        </div>

    </div>
</template>

<script setup>
import Palette from '../../components/Palette.vue'
</script>