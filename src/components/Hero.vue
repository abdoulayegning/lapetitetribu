<template>  
    <div class=" border-red-500 relative" ref="lines"> 

        <div class="absolute bottom-10 left-1/2 mix-blend-difference border-red-600 w-10 z-[60]">
            <svg version="1.1" id="Layer_3" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                viewBox="0 0 68.1 92.1" style="enable-background:new 0 0 68.1 92.1;" xml:space="preserve">
            <polygon class="fill-white" points="3.1,57.5 34.1,88.5 34.1,88.4 34.1,88.4 65,57.5 62.2,54.7 36.1,80.8 36.1,3.6 32.1,3.6 32.1,80.8 
                6,54.7 "/>
            </svg>
        </div>

        <video muted autoplay loop class="lg:hidden block absolute h-screen w-full object-cover" ref="video" src="../assets/value.mp4"></video>

        <div ref="sketch" class="absolute border-red-600 w-full h-full lg:block hidden z-50"></div>
        <!-- <video ref="headerVideoA" class="absolute z-50 lg:w-[20em] w-40 right-0 lg:bottom-16 lg:right-16 rotate-6" muted loop autoplay src="../assets/couro-teaser.mp4"></video> -->
        <!-- <video ref="headerVideoB" class="absolute z-50 lg:w-[30em] w-52 lg:bottom-40 bottom-0 lg:left-16 -rotate-3" muted loop autoplay src="../assets/DC.mp4"></video> -->
        <div data-graphics="text-line" :style="'left: -' + (j*30) + 'px' + '; opacity: ' + (j*0.01)" class="flex relative" ref="line" v-for="i,j in [0,1,2,3,4,5,6,8,9,10]">
            <div class="h-[10vh]" v-for="i in [0,1,2,3,4,5,6]">
                <svg class="h-full" x="0px" y="0px"
                    viewBox="0 0 1065 62" style="enable-background:new 0 0 1065 62;" xml:space="preserve">
                <path d="M1050.8,54.1c-2.2,0.9-4.5,1.4-6.7,1.4c-3.6,0-6.8-0.6-9.6-1.9c-2.9-1.2-5.3-3-7.2-5.1c-2-2.2-3.5-4.7-4.5-7.7
                    c-1-2.9-1.6-6.1-1.6-9.5c0-3.5,0.5-6.7,1.6-9.7c1-3,2.6-5.6,4.5-7.8c2-2.2,4.4-4,7.2-5.2c2.9-1.3,6.1-1.9,9.6-1.9
                    c2.4,0,4.7,0.4,7,1.1c2.2,0.7,4.3,1.8,6.1,3.2c1.8,1.4,3.3,3.1,4.5,5.2c1.2,2,1.9,4.4,2.2,7.1h-9.8c-0.6-2.6-1.8-4.6-3.5-5.9
                    c-1.7-1.3-3.9-2-6.3-2c-2.3,0-4.3,0.4-5.9,1.3c-1.6,0.9-2.9,2.1-3.9,3.6c-1,1.5-1.7,3.2-2.2,5.1c-0.5,1.9-0.7,3.9-0.7,5.9
                    c0,2,0.2,3.9,0.7,5.7c0.5,1.9,1.2,3.5,2.2,5c1,1.5,2.3,2.7,3.9,3.6c1.6,0.9,3.6,1.3,5.9,1.3c3.4,0,6-0.9,7.9-2.6
                    c1.9-1.7,2.9-4.2,3.2-7.5h-10.3v-7.6h19.6v25.2h-6.5l-1-5.3C1055.1,51.6,1053.1,53.2,1050.8,54.1z M984.9,7.8l19.5,31.3h0.1V7.8h9.6
                    v46.7h-10.3l-19.4-31.2h-0.1v31.2h-9.6V7.8H984.9z M86.3,7.8l10.9,32.1h0.1l10.3-32.1h14.4v46.7h-9.6V21.4h-0.1L101,54.5h-7.9
                    L81.6,21.8h-0.1v32.8h-9.6V7.8H86.3z M130.7,21.7c1-3,2.6-5.6,4.5-7.8c2-2.2,4.4-4,7.2-5.2c2.9-1.3,6.1-1.9,9.6-1.9
                    c3.6,0,6.8,0.6,9.7,1.9c2.8,1.3,5.2,3,7.2,5.2c2,2.2,3.5,4.8,4.5,7.8c1,3,1.6,6.2,1.6,9.7c0,3.4-0.5,6.6-1.6,9.5
                    c-1,2.9-2.6,5.5-4.5,7.7c-2,2.2-4.4,3.9-7.2,5.1c-2.8,1.2-6.1,1.9-9.7,1.9c-3.6,0-6.8-0.6-9.6-1.9c-2.9-1.2-5.3-3-7.2-5.1
                    c-2-2.2-3.5-4.7-4.5-7.7c-1-2.9-1.6-6.1-1.6-9.5C129.1,27.9,129.7,24.6,130.7,21.7z M140.1,37.1c0.5,1.9,1.2,3.5,2.2,5
                    c1,1.5,2.3,2.7,3.9,3.6c1.6,0.9,3.6,1.3,5.9,1.3c2.3,0,4.3-0.4,5.9-1.3c1.6-0.9,2.9-2.1,3.9-3.6s1.7-3.1,2.2-5
                    c0.5-1.9,0.7-3.8,0.7-5.7c0-2-0.2-4-0.7-5.9c-0.5-1.9-1.2-3.6-2.2-5.1s-2.3-2.7-3.9-3.6c-1.6-0.9-3.6-1.3-5.9-1.3
                    c-2.3,0-4.3,0.4-5.9,1.3c-1.6,0.9-2.9,2.1-3.9,3.6c-1,1.5-1.7,3.2-2.2,5.1c-0.5,1.9-0.7,3.9-0.7,5.9
                    C139.4,33.3,139.6,35.2,140.1,37.1z M178.4,16.5V7.8h38.2v8.6h-14v38h-10.3v-38H178.4z M232.2,7.8v46.7H222V7.8H232.2z M240.8,21.7
                    c1-3,2.6-5.6,4.5-7.8c2-2.2,4.4-4,7.2-5.2c2.9-1.3,6.1-1.9,9.6-1.9c3.6,0,6.8,0.6,9.7,1.9c2.8,1.3,5.2,3,7.2,5.2
                    c2,2.2,3.5,4.8,4.5,7.8c1,3,1.6,6.2,1.6,9.7c0,3.4-0.5,6.6-1.6,9.5c-1,2.9-2.6,5.5-4.5,7.7c-2,2.2-4.4,3.9-7.2,5.1
                    c-2.8,1.2-6.1,1.9-9.7,1.9c-3.6,0-6.8-0.6-9.6-1.9c-2.9-1.2-5.3-3-7.2-5.1c-2-2.2-3.5-4.7-4.5-7.7c-1-2.9-1.6-6.1-1.6-9.5
                    C239.2,27.9,239.8,24.6,240.8,21.7z M250.2,37.1c0.5,1.9,1.2,3.5,2.2,5c1,1.5,2.3,2.7,3.9,3.6c1.6,0.9,3.6,1.3,5.9,1.3
                    s4.3-0.4,5.9-1.3c1.6-0.9,2.9-2.1,3.9-3.6s1.7-3.1,2.2-5c0.5-1.9,0.7-3.8,0.7-5.7c0-2-0.2-4-0.7-5.9c-0.5-1.9-1.2-3.6-2.2-5.1
                    s-2.3-2.7-3.9-3.6c-1.6-0.9-3.6-1.3-5.9-1.3s-4.3,0.4-5.9,1.3c-1.6,0.9-2.9,2.1-3.9,3.6c-1,1.5-1.7,3.2-2.2,5.1
                    c-0.5,1.9-0.7,3.9-0.7,5.9C249.5,33.3,249.7,35.2,250.2,37.1z M302.3,7.8l19.5,31.3h0.1V7.8h9.6v46.7h-10.3l-19.4-31.2h-0.1v31.2
                    h-9.6V7.8H302.3z M381.7,22.8l2.5,7.1l-10.9,3.6l6.8,9l-6.1,4.5l-6.8-9.5l-6.4,9.5l-6.2-4.5l6.8-9l-10.7-3.6l2.5-7.1l10.4,4V15.3
                    h7.4v11.5L381.7,22.8z M699.5,22.8l2.5,7.1l-10.9,3.6l6.8,9l-6.1,4.5l-6.8-9.5l-6.4,9.5l-6.2-4.5l6.8-9l-10.7-3.6l2.5-7.1l10.4,4
                    V15.3h7.4v11.5L699.5,22.8z M423.6,7.8c3,0,5.8,0.5,8.4,1.4c2.6,1,4.8,2.4,6.7,4.3c1.9,1.9,3.4,4.3,4.4,7.2
                    c1.1,2.9,1.6,6.3,1.6,10.1c0,3.4-0.4,6.5-1.3,9.4c-0.9,2.9-2.2,5.4-4,7.5c-1.8,2.1-4,3.7-6.6,4.9c-2.6,1.2-5.7,1.8-9.3,1.8h-20.1
                    V7.8H423.6z M422.9,45.9c1.5,0,2.9-0.2,4.3-0.7c1.4-0.5,2.6-1.3,3.7-2.4c1.1-1.1,2-2.6,2.6-4.3c0.7-1.8,1-4,1-6.5
                    c0-2.4-0.2-4.5-0.7-6.4c-0.5-1.9-1.2-3.5-2.3-4.9c-1-1.4-2.4-2.4-4.2-3.1s-3.8-1.1-6.4-1.1h-7.3v29.4H422.9z M462.2,7.8v46.7H452
                    V7.8H462.2z M498.9,54.1c-2.2,0.9-4.5,1.4-6.7,1.4c-3.6,0-6.8-0.6-9.6-1.9c-2.9-1.2-5.3-3-7.2-5.1c-2-2.2-3.5-4.7-4.5-7.7
                    c-1-2.9-1.6-6.1-1.6-9.5c0-3.5,0.5-6.7,1.6-9.7c1-3,2.6-5.6,4.5-7.8c2-2.2,4.4-4,7.2-5.2c2.9-1.3,6.1-1.9,9.6-1.9
                    c2.4,0,4.7,0.4,7,1.1c2.2,0.7,4.3,1.8,6.1,3.2c1.8,1.4,3.3,3.1,4.5,5.2c1.2,2,1.9,4.4,2.2,7.1H502c-0.6-2.6-1.8-4.6-3.5-5.9
                    c-1.7-1.3-3.9-2-6.3-2c-2.3,0-4.3,0.4-5.9,1.3c-1.6,0.9-2.9,2.1-3.9,3.6c-1,1.5-1.7,3.2-2.2,5.1c-0.5,1.9-0.7,3.9-0.7,5.9
                    c0,2,0.2,3.9,0.7,5.7c0.5,1.9,1.2,3.5,2.2,5c1,1.5,2.3,2.7,3.9,3.6c1.6,0.9,3.6,1.3,5.9,1.3c3.4,0,6-0.9,7.9-2.6
                    c1.9-1.7,2.9-4.2,3.2-7.5h-10.3v-7.6h19.6v25.2H506l-1-5.3C503.1,51.6,501.1,53.2,498.9,54.1z M531.1,7.8v46.7h-10.3V7.8H531.1z
                    M536.5,16.5V7.8h38.2v8.6h-14v38h-10.3v-38H536.5z M597.3,7.8l17.5,46.7h-10.7l-3.5-10.4h-17.5l-3.7,10.4h-10.3l17.7-46.7H597.3z
                    M597.9,36.5L592,19.3h-0.1l-6.1,17.1H597.9z M629.1,7.8v38h22.7v8.6h-33V7.8H629.1z M742.5,7.8c2.2,0,4.2,0.2,6.1,0.6
                    c1.8,0.4,3.4,1,4.7,1.9c1.3,0.9,2.3,2.1,3,3.6c0.7,1.5,1.1,3.3,1.1,5.5c0,2.4-0.5,4.3-1.6,5.9c-1.1,1.6-2.6,2.9-4.7,3.9
                    c2.9,0.8,5,2.3,6.4,4.3c1.4,2.1,2.1,4.6,2.1,7.5c0,2.4-0.5,4.4-1.4,6.1c-0.9,1.7-2.1,3.1-3.7,4.2c-1.5,1.1-3.3,1.9-5.3,2.4
                    c-2,0.5-4,0.8-6.1,0.8h-22.6V7.8H742.5z M741.2,26.7c1.8,0,3.3-0.4,4.5-1.3c1.2-0.9,1.8-2.3,1.8-4.2c0-1.1-0.2-2-0.6-2.7
                    c-0.4-0.7-0.9-1.2-1.6-1.6c-0.7-0.4-1.4-0.7-2.3-0.8c-0.8-0.2-1.7-0.2-2.6-0.2h-9.6v10.9H741.2z M741.8,46.5c1,0,2-0.1,2.9-0.3
                    c0.9-0.2,1.7-0.5,2.4-1c0.7-0.5,1.3-1.1,1.7-1.9c0.4-0.8,0.6-1.8,0.6-3c0-2.4-0.7-4.1-2-5.1c-1.4-1-3.1-1.5-5.4-1.5h-11.2v12.8
                    H741.8z M791.8,7.8c2.1,0,4,0.3,5.7,1c1.7,0.7,3.1,1.6,4.3,2.8c1.2,1.2,2.1,2.5,2.7,4.1c0.6,1.5,0.9,3.2,0.9,5
                    c0,2.7-0.6,5.1-1.7,7.1c-1.2,2-3,3.5-5.7,4.6v0.1c1.3,0.3,2.3,0.9,3.1,1.6c0.8,0.7,1.5,1.6,2,2.5c0.5,1,0.9,2.1,1.1,3.2
                    c0.2,1.2,0.4,2.4,0.5,3.5c0,0.7,0.1,1.6,0.1,2.6c0,1,0.1,2,0.2,3.1c0.1,1,0.3,2,0.5,3c0.2,0.9,0.6,1.7,1.1,2.4h-10.3
                    c-0.6-1.5-0.9-3.2-1-5.3c-0.1-2-0.3-4-0.6-5.9c-0.4-2.4-1.1-4.2-2.2-5.4c-1.1-1.1-3-1.7-5.6-1.7h-10.3v18.2h-10.3V7.8H791.8z
                    M788.1,28.9c2.4,0,4.1-0.5,5.3-1.6c1.2-1,1.8-2.7,1.8-5.1c0-2.3-0.6-3.9-1.8-4.9c-1.2-1-2.9-1.5-5.3-1.5h-11.2v13.1H788.1z
                    M837.1,7.8l17.5,46.7h-10.7l-3.5-10.4h-17.5l-3.7,10.4h-10.3l17.7-46.7H837.1z M837.7,36.5l-5.9-17.1h-0.1l-6.1,17.1H837.7z
                    M868.8,7.8l19.5,31.3h0.1V7.8h9.6v46.7h-10.3l-19.4-31.2h-0.1v31.2h-9.6V7.8H868.8z M927.2,7.8c3,0,5.8,0.5,8.4,1.4
                    c2.6,1,4.8,2.4,6.7,4.3c1.9,1.9,3.4,4.3,4.4,7.2c1.1,2.9,1.6,6.3,1.6,10.1c0,3.4-0.4,6.5-1.3,9.4c-0.9,2.9-2.2,5.4-4,7.5
                    c-1.8,2.1-4,3.7-6.6,4.9c-2.6,1.2-5.7,1.8-9.3,1.8H907V7.8H927.2z M926.4,45.9c1.5,0,2.9-0.2,4.3-0.7c1.4-0.5,2.6-1.3,3.7-2.4
                    c1.1-1.1,2-2.6,2.6-4.3c0.7-1.8,1-4,1-6.5c0-2.4-0.2-4.5-0.7-6.4c-0.5-1.9-1.2-3.5-2.3-4.9c-1-1.4-2.4-2.4-4.1-3.1
                    c-1.7-0.7-3.8-1.1-6.4-1.1h-7.3v29.4H926.4z M965.7,7.8v46.7h-10.3V7.8H965.7z"/>
                <g>
                    <polygon points="49.7,22.8 52.2,29.9 41.4,33.5 48.2,42.5 42.1,47 35.3,37.5 28.9,47 22.7,42.5 29.5,33.5 18.8,29.9 21.3,22.8 31.7,26.8 31.7,15.3 39.1,15.3 39.1,26.8"/>
                </g>
                </svg> 
            </div>
        </div>
    </div>
</template>

<style scoped> 
.st0{fill:#FFFFFF;} 
</style>

<script setup> 
import { 
    ref, 
    onMounted, 
    onUpdated } 
from 'vue';

import { 
    Scene, PerspectiveCamera, WebGLRenderer, 
    PlaneGeometry, ShaderMaterial, Mesh, Vector2,
    Clock, VideoTexture
} from 'three'
import { InteractionManager } from 'three.interactive';
import gsap from 'gsap';
const lines = ref(null)
const sketch = ref(null)
const video = ref(null)
const logoLChar = ref(null)
const headerVideoA = ref(null)
const headerVideoB = ref(null)

class Sketch{
    constructor(){
        const width = window.innerWidth;
        const height = window.innerHeight;
        this.scene = new Scene()
        this.camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
        this.renderer = new WebGLRenderer({alpha:true, antialias: true})
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        if (sketch.value) {
            sketch.value.appendChild(this.renderer.domElement)
        }
        this.interactionManager = new InteractionManager(this.renderer, this.camera, this.renderer.domElement)
        const geometry = new PlaneGeometry(16/1.5, 9/1.5, 35, 15 );
        this.material = new ShaderMaterial({ 
            wireframe: false,
            uniforms: {
                uTime: {value: 0.0, type: 'f'}, 
                uMouse: { value: new Vector2() },
                uWave : { value: 15. },
                uNoiseIntensity : { value: 0    },
                uTexture: {value: new VideoTexture(video.value)}
            },
            vertexShader:`
            varying vec2 vUv;
            varying vec3 vPosition;
            uniform vec2 uMouse;
            uniform float uTime;
            uniform float uWave;
            void main(){
                vUv = uv;
                
                float dist = distance(uv - 0.5, vec2(uMouse.x, 0.)); 
                
                vPosition = position;
                
                vec3 warp = position;
                
                warp.y += (sin(uTime + warp.x) * uWave) * 0.05;
                
                vec3 newPosition = mix(position, warp, 1. - smoothstep(0.15, 0.65, dist)); 
                
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.);
            }
            `,
            fragmentShader:` 
            float rand(vec2 n) { 
                return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
            }

            float noise(vec2 p){
                vec2 ip = floor(p);
                vec2 u = fract(p);
                u = u*u*(3.0-2.0*u);
                
                float res = mix(
                    mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),
                    mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),u.y);
                return res*res;
            }

            float mixColor(float threshold, float a, float b){
                float result = mix(a, b, threshold);
                return result;
            }

            varying vec2 vUv;
            varying vec3 vPosition;
            uniform vec2 uMouse;
            uniform float uTime;
            uniform float uNoiseIntensity;
            uniform sampler2D uTexture;

            void main(){

                vec2 uv = vUv; 

                float dist = distance(uv - 0.5, uMouse); 

                vec3 position = vPosition; 

                float n = noise(uv * 5. + (uTime));

                vec2 distortUv = mix(uv, vec2(n), ((1. - dist)/3.) * uNoiseIntensity);

                vec3 videoTexture = texture2D(uTexture, distortUv).rgb;

                float videoTexture_r = texture2D(uTexture, mix(distortUv, uv, 0.5)).r;
                float videoTexture_g = texture2D(uTexture, mix(distortUv, uv, 0.45)).g;
                float videoTexture_b = texture2D(uTexture, mix(distortUv, uv, 0.75)).b;

                gl_FragColor = vec4(videoTexture 
                + vec3(videoTexture_r/6., 0., 0.) 
                + vec3(0., videoTexture_g/5., 0.) 
                + vec3(0., 0., videoTexture_g)/10., 1.); 

            } 
            `,
        })
        this.material.needsUpdate = true
        this.mesh = new Mesh(geometry, this.material)
        this.scene.add(this.mesh)

        this.interactionManager.add(this.mesh);
 

        this.mesh.addEventListener('mouseover', (event) => {  
            this.material.uniforms.uNoiseIntensity.value = .65 
        }); 

        this.mesh.addEventListener('mouseleave', (event) => {  
            this.material.uniforms.uNoiseIntensity.value = 0 
        }); 

        this.camera.position.z = 5; 

        // Update mouse position when the mouse moves
        document.addEventListener('mousemove', (event) => {
            // Normalize mouse position to range [-1, 1]
            let x =  (event.clientX / window.innerWidth) * 2 - 1;
            let y = -(event.clientY / window.innerHeight) * 2 + 1;
            gsap.to(this.material.uniforms.uMouse.value, {x: x, y: y, duration: .85}) 
        });

        this.clock = new Clock()

        video.value.play()

        gsap.ticker.add(()=>{
            this.renderer.render(this.scene, this.camera)
            this.material.uniforms.uTime.value = this.clock.getElapsedTime()
            this.interactionManager.update();
        })
    }
}

onMounted(()=>{

    // let images = gsap.timeline({
    //     onComplete: ()=>{
    //         document.addEventListener('mousemove', (e)=>{
    //             const smooth = 0.05
    //             const dX = (e.clientX - window.innerWidth/2) * smooth
    //             const dY = (e.clientY - window.innerHeight/2) * smooth
    //             gsap.to(headerVideoA.value, {rotate: dX * 0.25})
    //             gsap.to(headerVideoB.value, {rotate: -dX * 0.25})
    //             gsap.to(headerVideoA.value, {x: dX, y: dY, rotate: dX})
    //             gsap.to(headerVideoB.value, {x: dX, y: dY}) 
    //         })
    //     }
    // })

    // images.fromTo(headerVideoA.value, {x: window.innerWidth/2, rotate: 80}, {x: 0, rotate: 10, duration: 1.5, ease: 'expo.inOut'}, 'default')
    // images.fromTo(headerVideoB.value, {x: -window.innerWidth/2, rotate: 80}, {x: 0, rotate: -10, duration: 1.5, ease: 'expo.inOut'}, 'default')
    for (let i = 0; i < lines.value.children.length; i++) {
        const e = lines.value.children[i];
        if (e.getAttribute('data-graphics') == 'text-line') { 
            gsap.to(e, {x: "-=400", duration: 4 + i, repeat: -1, yoyo: true, ease: 'expo.inOut'})
        }
    }

    new Sketch()
 
})

onUpdated(()=>{
 })
</script>