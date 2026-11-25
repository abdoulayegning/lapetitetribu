<template>
    <h1 ref="title" class="relative m-0 text-[48px] lg:text-[clamp(48px,7.8vw,112px)] leading-[0.95] tracking-[-0.045em] font-medium" :style="{ color: glReady ? 'transparent' : '#0d0d0d' }">
        <!-- WebGL layer: redraws the tagline with a ripple + RGB split. The real text stays for screen readers and as fallback. -->
        <canvas ref="canvas" aria-hidden="true" class="absolute pointer-events-none left-[-20px] top-[-24px] w-[calc(100%+40px)] h-[calc(100%+48px)] lg:left-[-48px] lg:top-[-48px] lg:w-[calc(100%+96px)] lg:h-[calc(100%+96px)]"></canvas>
        <span class="block">Une pub, on la zappe.</span>
        <span class="block pl-[22%] lg:pl-[18%] mt-1.5 lg:mt-0">Un jeu, on <em class="font-['Georgia',serif] font-normal">y revient.</em></span>
    </h1>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const title = ref(null)
const canvas = ref(null)
const glReady = ref(false)

let gl = null
let uni = null
let tex = null
let loopId = null
let dirty = true
let touchMode = false
const mouse = { x: -9999, y: -9999 }
let touch = null
const state = { amt: 0, mx: 0.5, my: 0.5 }

const onMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY }
const onTouch = (e) => {
    const p = e.touches && e.touches[0]
    if (p) touch = { x: p.clientX, y: p.clientY, at: performance.now() }
}
const onResize = () => { dirty = true }

// Full-screen quad; vUv has a top-left origin so it matches DOM/canvas coordinates.
const VS = 'attribute vec2 p; varying vec2 vUv; void main(){ vUv = vec2(p.x * 0.5 + 0.5, 0.5 - p.y * 0.5); gl_Position = vec4(p, 0.0, 1.0); }'
// Text alpha sampled 3x with offsets -> RGB split; ripple rings around the pointer; slow idle wave.
const FS = [
    'precision mediump float;',
    'varying vec2 vUv;',
    'uniform sampler2D uTex; uniform vec2 uMouse; uniform vec2 uRes; uniform float uTime; uniform float uAmt;',
    'void main(){',
    '  vec2 uv = vUv;',
    '  vec2 d = uv - uMouse; d.x *= uRes.x / uRes.y;',
    '  float dist = length(d);',
    '  float fall = exp(-dist * 5.0) * uAmt;',
    '  vec2 dir = normalize(d + 1e-4); dir.x *= uRes.y / uRes.x;',
    '  vec2 off = dir * sin(dist * 34.0 - uTime * 6.0) * 0.012 * fall;',
    '  off.y += sin(uv.x * 7.0 + uTime * 1.1) * 0.003;',
    '  vec2 ca = dir * 0.007 * fall + vec2(0.0007, 0.0);',
    '  float aR = texture2D(uTex, uv + off + ca).a;',
    '  float aG = texture2D(uTex, uv + off).a;',
    '  float aB = texture2D(uTex, uv + off - ca).a;',
    '  vec3 bg = vec3(0.953, 0.953, 0.945); vec3 ink = vec3(0.051);',
    '  vec3 col = vec3(mix(bg.r, ink.r, aR), mix(bg.g, ink.g, aG), mix(bg.b, ink.b, aB));',
    '  float a = max(aR, max(aG, aB));',
    '  gl_FragColor = vec4(col * a, a);',
    '}'
].join('\n')

const setup = () => {
    gl = canvas.value.getContext('webgl', { alpha: true, premultipliedAlpha: true, antialias: false })
    if (!gl) return false
    const make = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return s }
    const prog = gl.createProgram()
    gl.attachShader(prog, make(gl.VERTEX_SHADER, VS))
    gl.attachShader(prog, make(gl.FRAGMENT_SHADER, FS))
    gl.linkProgram(prog)
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return false
    gl.useProgram(prog)
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer())
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
    const p = gl.getAttribLocation(prog, 'p')
    gl.enableVertexAttribArray(p)
    gl.vertexAttribPointer(p, 2, gl.FLOAT, false, 0, 0)
    tex = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, tex)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    const cache = {}
    uni = (name) => (cache[name] = cache[name] || gl.getUniformLocation(prog, name))
    return true
}

// Paint the tagline into a 2D canvas word by word, at the exact DOM positions of the real text.
const paintTexture = (rect, dpr) => {
    const off = document.createElement('canvas')
    off.width = canvas.value.width
    off.height = canvas.value.height
    const ctx = off.getContext('2d')
    ctx.scale(dpr, dpr)
    ctx.fillStyle = '#000'
    ctx.textBaseline = 'middle'
    const walker = document.createTreeWalker(title.value, NodeFilter.SHOW_TEXT)
    const range = document.createRange()
    let node
    while ((node = walker.nextNode())) {
        const cs = getComputedStyle(node.parentElement)
        ctx.font = cs.fontStyle + ' ' + cs.fontWeight + ' ' + cs.fontSize + ' ' + cs.fontFamily
        try { ctx.letterSpacing = cs.letterSpacing } catch (e) {}
        const text = node.textContent
        const re = /\S+/g
        let m
        while ((m = re.exec(text))) {
            range.setStart(node, m.index)
            range.setEnd(node, m.index + m[0].length)
            const w = range.getBoundingClientRect()
            if (!w.width) continue
            ctx.fillText(m[0], w.left - rect.left, w.top - rect.top + w.height / 2)
        }
    }
    gl.bindTexture(gl.TEXTURE_2D, tex)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, off)
}

const draw = (t) => {
    const c = canvas.value
    if (!c) return
    const r = c.getBoundingClientRect()
    if (r.bottom < 0 || r.top > window.innerHeight || !r.width) return
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const w = Math.round(r.width * dpr)
    const h = Math.round(r.height * dpr)
    if (c.width !== w || c.height !== h || dirty) {
        c.width = w
        c.height = h
        paintTexture(r, dpr)
        dirty = false
        glReady.value = true // hide DOM ink once GL draws it
    }
    let mx, my, target
    if (touchMode) {
        // No cursor: the ripple wanders along a slow figure-eight, or follows a recent touch.
        mx = 0.5 + 0.38 * Math.sin(t * 0.45)
        my = 0.5 + 0.3 * Math.sin(t * 0.9 + 1.2)
        if (touch && performance.now() - touch.at < 1500) {
            mx = (touch.x - r.left) / r.width
            my = (touch.y - r.top) / r.height
        }
        target = 0.75
    } else {
        mx = (mouse.x - r.left) / r.width
        my = (mouse.y - r.top) / r.height
        target = mx > -0.05 && mx < 1.05 && my > -0.2 && my < 1.2 ? 1 : 0
    }
    state.amt += (target - state.amt) * 0.06
    state.mx += (mx - state.mx) * 0.12
    state.my += (my - state.my) * 0.12
    gl.viewport(0, 0, w, h)
    gl.clearColor(0, 0, 0, 0)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.uniform2f(uni('uMouse'), state.mx, state.my)
    gl.uniform2f(uni('uRes'), r.width, r.height)
    gl.uniform1f(uni('uTime'), t)
    gl.uniform1f(uni('uAmt'), state.amt)
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
}

onMounted(() => {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (!setup()) return
    touchMode = !!(window.matchMedia && window.matchMedia('(hover: none), (pointer: coarse)').matches)
    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('touchstart', onTouch, { passive: true })
    window.addEventListener('touchmove', onTouch, { passive: true })
    window.addEventListener('resize', onResize)
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { dirty = true })
    const t0 = performance.now()
    const loop = () => {
        loopId = requestAnimationFrame(loop)
        draw((performance.now() - t0) / 1000)
    }
    loopId = requestAnimationFrame(loop)
})

onBeforeUnmount(() => {
    window.removeEventListener('mousemove', onMove)
    window.removeEventListener('touchstart', onTouch)
    window.removeEventListener('touchmove', onTouch)
    window.removeEventListener('resize', onResize)
    if (loopId) cancelAnimationFrame(loopId)
    const ext = gl && gl.getExtension('WEBGL_lose_context')
    if (ext) ext.loseContext()
    gl = null
})
</script>
