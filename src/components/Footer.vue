<script setup> 
import { WebGLRenderer, PerspectiveCamera, Scene, PlaneGeometry, ShaderMaterial, Mesh, TextureLoader } from 'three';
import { gsap } from 'gsap'
import {onMounted, ref} from 'vue'
import { ScrollTrigger, ScrollToPlugin } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

import logo_image from '../assets/logo.png'
const sketch = ref(null)
const scrollToTop = ()=>{
    gsap.to(window, {duration: 6, scrollTo: 0})
}

onMounted(()=>{
    const scene = new Scene();
    const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new WebGLRenderer({alpha: true})
    renderer.setSize(window.innerWidth, window.innerHeight)
    sketch.value.appendChild(renderer.domElement)

    const geometry = new PlaneGeometry(1.5, 1.5, 20, 20)
    const material = new ShaderMaterial({ 
        uniforms: {
            logo: {value: new TextureLoader().load(logo_image)},
            time: {value: 0},
            bending: {value: 3},
            chromatic: {value: 0.5},
        },
        fragmentShader: `
        float mod289(float x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
        vec4 mod289(vec4 x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
        vec4 perm(vec4 x){return mod289(((x * 34.0) + 1.0) * x);}

        float noise(vec3 p){
            vec3 a = floor(p);
            vec3 d = p - a;
            d = d * d * (3.0 - 2.0 * d);

            vec4 b = a.xxyy + vec4(0.0, 1.0, 0.0, 1.0);
            vec4 k1 = perm(b.xyxy);
            vec4 k2 = perm(k1.xyxy + b.zzww);

            vec4 c = k2 + a.zzzz;
            vec4 k3 = perm(c);
            vec4 k4 = perm(c + 1.0);

            vec4 o1 = fract(k3 * (1.0 / 41.0));
            vec4 o2 = fract(k4 * (1.0 / 41.0));

            vec4 o3 = o2 * d.z + o1 * (1.0 - d.z);
            vec2 o4 = o3.yw * d.x + o3.xz * (1.0 - d.x);

            return o4.y * d.y + o4.x * (1.0 - d.y);
        }
        
        varying vec3 vPos;
        varying vec2 vUv;
        uniform float chromatic;
        uniform float time;
        uniform sampler2D logo;
        
        void main(){
            vec2 uv = vUv;

            float t = time * chromatic;
            
            vec3 n_rgb = vec3(noise(vPos + t)) * vec3(noise(vPos - (t * 0.05) ));
            vec3 col_rgb = texture(logo, mix(n_rgb.xy, uv, 0.95)).rgb;
            
            vec3 n_r = vec3(noise(vPos + t)) * vec3(noise(vPos - (t * 0.06) ));
            vec3 col_r = vec3(
                texture(logo, mix(n_r.xy, uv, 0.95)).r,
                0.,
                0.
                );
                
                vec3 n_g = vec3(noise(vPos + t)) * vec3(noise(vPos - (t * 0.05) ));
                vec3 col_g = vec3(
                    0.,
                    texture(logo, mix(n_g.xy, uv, 0.95)).g,
                    0.
                    );
                    
                    vec3 n_b = vec3(noise(vPos + t)) * vec3(noise(vPos - (t * 0.25) ));
                    vec3 col_b = vec3(
                        0.,
                0.,
                texture(logo, mix(n_b.xy, uv, 0.95)).b
                );
                
                gl_FragColor = vec4(col_r + col_g + col_b, 1.);
            }
            `,
            vertexShader: `
            varying vec2 vUv;
            varying vec3 vPos;
            uniform float bending;
            void main(){ 
            vUv = uv;
            vPos = position;

            float distFromCenter = abs( 
                (modelMatrix * vec4(position, 1.0)).x
                );
            vec3 newpos = position;
            newpos.y *= 1.0 + bending * pow(distFromCenter, 2.0);

            gl_Position = projectionMatrix * modelViewMatrix * vec4(newpos, 1.0); 
        }
        `,
        transparent: true,
        wireframe: false
    })
    const mesh = new Mesh(geometry, material)
    mesh.position.x = 1.5/2
    scene.add(mesh)

    camera.position.z = 1.5;

    gsap.ticker.add((time)=>{ 
        renderer.render(scene, camera)
        material.uniforms.time.value = time
    })

    window.addEventListener('resize', ()=>{
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth, window.innerHeight )
    })

    let footer_tl = gsap.timeline({
        scrollTrigger: {
            trigger: sketch.value,
            scrub: true
        }
    })
    footer_tl.fromTo(mesh.scale, {x: 2, y: 2}, {x: 0.75, y: 0.75, duration: 6, ease:'Expo.easeOut'}, 'a')
    footer_tl.to(material.uniforms.bending, {value: 0, duration: 6, ease:'Expo.easeOut'}, 'a')
})
</script>

<template>
    <div class="h-screen relative"> 

        <div class="absolute z-40 w-full h-screen">

            <div class="container mx-auto">
                <div class="flex justify-center items-center w-full h-screen">
                    <div class="lg:w-1/2 w-full lg:text-7xl text-4xl mix-blend-difference text-white font-['DM_Sans']">
                        Créeons ensemble des expériences mémorables...
                        <br>
                        <div class="font-medium mt-7 text-sm leading-tight rounded-full">
                            Je voudrais collaborer avec votre studio.
                        </div>  
                    </div> 
                    <div class="lg:w-1/2 lg:block w-0 hidden"></div>
                </div>
            </div> 

        </div>

        <div style="background-color: rgb(0, 0, 0);" 
        class="absolute w-full h-full top-0 left-0" ref="sketch"> 
        </div>

        <div class="absolute -translate-x-1/2 bottom-10 left-1/2 
        text-white font-['DM_Sans'] text-sm flex flex-row  text-center lg:gap-8 gap-3">
            <div><font-awesome-icon icon="fa-brands fa-instagram" /></div>
            <div><font-awesome-icon icon="fa-brands fa-linkedin-in" /></div>
            <div class="underline font-medium">abdoulaye@lapetitetribu.co</div>
        </div>
        

        <div class="z-[1000] absolute left-1/2 -translate-x-1/2 top-10 text-white font-['DM_Sans'] text-sm flex gap-8 cursor-pointer">
            <div @pointerdown="scrollToTop" class="underline font-medium">Scroller en haut</div> 
        </div>

        
    </div>
</template>

<style scoped>
</style>