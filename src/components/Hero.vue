<template>
    
    <!-- <div class="absolute top-0 right-0 left-0 bottom-0" ref="canvas"></div>
    <div class="w-[80%] h-[80dvh] text-6xl text-white" ref="plane">
        the plane
    </div> -->

    <div class="mx-auto container text-left text-4xl lg:text-9xl leading-tight mb-10 pt-40">
        Des projets sur-mesure, qui laissent une empreinte.
    </div>

    <div v-if="false" class="w-full aspect-video hidden">
        <video class="w-full h-full object-cover" muted autoplay loop src="/typos/typos.mp4"></video>
    </div>
 
  
</template>

<script setup>
import KeenSlider from 'keen-slider'
import {ref, onMounted, onUnmounted, nextTick} from 'vue'
import Splitting from 'splitting'
import gsap from 'gsap';
import {AnimateSplittingTextIn, HideSplittingText} from '../js/animations'

import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import title_3d from '../assets/title-3d.gltf?url'

// import {Curtains, Plane} from 'curtainsjs';


// import '../js/blotter.min.js'

const keen = ref(null)
const about = ref(null)
const popups = ref(null)
const logotype = ref(null)
const frames = ref(null)

function createCanvas(){
    const container = document.getElementById('three-canvas')
    if(!container) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(10, container.clientWidth / container.clientHeight, 0.1, 100)
    // camera.position.y = 5
    // camera.position.x = -5
    camera.position.z = 16
    camera.lookAt(scene.position)

    const gridHelper = new THREE.GridHelper(100, 100, 0x888888, 0x444444)
    // scene.add(gridHelper)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(window.devicePixelRatio || 1)
    container.appendChild(renderer.domElement)

    const ambientLight = new THREE.AmbientLight(0xffffff, 9)
    // scene.add(ambientLight)

    const loader = new GLTFLoader()
    let gltfScene = null
    loader.load(
        title_3d,
        (gltf) => {
            const uniformScale = 0.3
            gltfScene = gltf.scene
            const children = gltfScene.children
            gltfScene.scale.set(uniformScale, uniformScale, uniformScale)
            scene.add(gltfScene)

            console.log(gltfScene.position)

            children.forEach(child => {
                const axes = ['x', 'y', 'z']
                const axis = axes[Math.floor(Math.random() * axes.length)]
                const direction = Math.random() < 0.5 ? 1 : -1
                const rotationAmount = 6.28319 + Math.random() * 6.28319

                // gsap.to(child.rotation, {
                //     [axis]: `+=${direction * rotationAmount/1}`,
                //     duration: 20 + Math.random() * 10,
                //     repeat: -1,
                //     ease: "linear"
                // })
            })

            gltf.scene.traverse((child) => {
            if (child.isMesh) {
                const materials = Array.isArray(child.material) ? child.material : [child.material];
                
                const newMaterials = materials.map((oldMat) => {
                const newMat = new THREE.MeshBasicMaterial({
                    map: oldMat.map || null,
                    color: oldMat.color || 0xffffff,
                });
                oldMat.dispose();
                return newMat;
                });

                child.material = Array.isArray(child.material) ? newMaterials : newMaterials[0];
            }
            });
        },
        undefined,
        (error) => {
            console.error('Error loading GLTF model:', error)
        }
    )

    let rafId = null
    function onResize(){
        const w = container.clientWidth
        const h = container.clientHeight
        camera.aspect = w / h
        camera.updateProjectionMatrix()
        renderer.setSize(w, h)
    }

    function animate(){
        renderer.render(scene, camera)
        rafId = requestAnimationFrame(animate)
    }

    window.addEventListener('resize', onResize)
    animate()

    return ()=>{
        window.removeEventListener('resize', onResize)
        if(rafId) cancelAnimationFrame(rafId)
        renderer.dispose()
        if(renderer.domElement && renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement)
    }
}

let disposeThree = null

const plane = ref(null)
const canvas = ref(null)

onMounted(async ()=>{
    await nextTick()
    disposeThree = createCanvas()

    // // "canvas" is the ID of our HTML container element
    // const curtains = new Curtains({
    //     container: canvas.value
    // });

    // const _plane = new Plane(curtains, plane.value);
})

onUnmounted(()=>{
    if(typeof disposeThree === 'function') disposeThree()
})
</script>