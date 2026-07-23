import { useEffect, useRef } from 'react'

/**
 * WebGL "color bends" shader backdrop — warped, flowing color bands.
 * Ported from react-bits' ColorBends (github.com/DavidHDev/react-bits,
 * src/ts-default/Backgrounds/ColorBends) off its three.js implementation
 * into plain React + raw WebGL, to avoid pulling in three.js for one shader.
 * Fragment-shader math is kept faithful to the original; only the render
 * harness (context setup, uniforms, quad, loop) was rewritten.
 */

const MAX_COLORS = 8

const VERTEX_SHADER = `
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`

const FRAGMENT_SHADER = `
precision highp float;
#define MAX_COLORS 8
uniform vec2 uCanvas;
uniform float uTime;
uniform float uSpeed;
uniform vec2 uRot;
uniform int uColorCount;
uniform vec3 uColors[MAX_COLORS];
uniform int uTransparent;
uniform float uScale;
uniform float uFrequency;
uniform float uWarpStrength;
uniform vec2 uPointer;
uniform float uMouseInfluence;
uniform float uParallax;
uniform float uNoise;
uniform int uIterations;
uniform float uIntensity;
uniform float uBandWidth;
varying vec2 vUv;

void main() {
  float t = uTime * uSpeed;
  vec2 p = vUv * 2.0 - 1.0;
  p += uPointer * uParallax * 0.1;
  vec2 rp = vec2(p.x * uRot.x - p.y * uRot.y, p.x * uRot.y + p.y * uRot.x);
  vec2 q = vec2(rp.x * (uCanvas.x / uCanvas.y), rp.y);
  q /= max(uScale, 0.0001);
  q /= 0.5 + 0.2 * dot(q, q);
  q += 0.2 * cos(t) - 7.56;
  vec2 toward = (uPointer - rp);
  q += toward * uMouseInfluence * 0.2;

  for (int j = 0; j < 5; j++) {
    if (j >= uIterations - 1) break;
    vec2 rr = sin(1.5 * (q.yx * uFrequency) + 2.0 * cos(q * uFrequency));
    q += (rr - q) * 0.15;
  }

  vec3 col = vec3(0.0);
  float a = 1.0;

  if (uColorCount > 0) {
    vec2 s = q;
    vec3 sumCol = vec3(0.0);
    float cover = 0.0;
    for (int i = 0; i < MAX_COLORS; ++i) {
      if (i >= uColorCount) break;
      s -= 0.01;
      vec2 r = sin(1.5 * (s.yx * uFrequency) + 2.0 * cos(s * uFrequency));
      float m0 = length(r + sin(5.0 * r.y * uFrequency - 3.0 * t + float(i)) / 4.0);
      float kBelow = clamp(uWarpStrength, 0.0, 1.0);
      float kMix = pow(kBelow, 0.3);
      float gain = 1.0 + max(uWarpStrength - 1.0, 0.0);
      vec2 disp = (r - s) * kBelow;
      vec2 warped = s + disp * gain;
      float m1 = length(warped + sin(5.0 * warped.y * uFrequency - 3.0 * t + float(i)) / 4.0);
      float m = mix(m0, m1, kMix);
      float w = 1.0 - exp(-uBandWidth / exp(uBandWidth * m));
      sumCol += uColors[i] * w;
      cover = max(cover, w);
    }
    col = clamp(sumCol, 0.0, 1.0);
    a = uTransparent > 0 ? cover : 1.0;
  } else {
    vec2 s = q;
    for (int k = 0; k < 3; ++k) {
      s -= 0.01;
      vec2 r = sin(1.5 * (s.yx * uFrequency) + 2.0 * cos(s * uFrequency));
      float m0 = length(r + sin(5.0 * r.y * uFrequency - 3.0 * t + float(k)) / 4.0);
      float kBelow = clamp(uWarpStrength, 0.0, 1.0);
      float kMix = pow(kBelow, 0.3);
      float gain = 1.0 + max(uWarpStrength - 1.0, 0.0);
      vec2 disp = (r - s) * kBelow;
      vec2 warped = s + disp * gain;
      float m1 = length(warped + sin(5.0 * warped.y * uFrequency - 3.0 * t + float(k)) / 4.0);
      float m = mix(m0, m1, kMix);
      col[k] = 1.0 - exp(-uBandWidth / exp(uBandWidth * m));
    }
    a = uTransparent > 0 ? max(max(col.r, col.g), col.b) : 1.0;
  }

  col *= uIntensity;

  if (uNoise > 0.0001) {
    float n = fract(sin(dot(gl_FragCoord.xy + vec2(uTime), vec2(12.9898, 78.233))) * 43758.5453123);
    col += (n - 0.5) * uNoise;
    col = clamp(col, 0.0, 1.0);
  }

  vec3 rgb = (uTransparent > 0) ? col * a : col;
  gl_FragColor = vec4(rgb, a);
}
`

function hexToRgb01(hex) {
  const clean = hex.replace('#', '')
  return [
    parseInt(clean.slice(0, 2), 16) / 255,
    parseInt(clean.slice(2, 4), 16) / 255,
    parseInt(clean.slice(4, 6), 16) / 255,
  ]
}

function compileShader(gl, type, source) {
  const shader = gl.createShader(type)
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const info = gl.getShaderInfoLog(shader)
    gl.deleteShader(shader)
    throw new Error(info || 'Shader compile failed')
  }
  return shader
}

// Retuned to the portfolio's cyan/flag-green theme instead of upstream's
// example purple, and dialed back so the bands stay a subtle backdrop.
const DEFAULTS = {
  colors: ['#22d3ee', '#0e7490'],
  rotation: 90,
  speed: 0.2,
  scale: 1,
  frequency: 1.0,
  warpStrength: 1,
  mouseInfluence: 1,
  parallax: 0.5,
  noise: 0.15,
  iterations: 1,
  intensity: 0.55,
  bandWidth: 6,
  transparent: true,
  autoRotate: 0,
}

export default function ColorBends({ className = '', ...overrides }) {
  const canvasRef = useRef(null)
  const cfg = { ...DEFAULTS, ...overrides }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let gl
    try {
      gl =
        canvas.getContext('webgl', { antialias: false, alpha: true, premultipliedAlpha: true }) ||
        canvas.getContext('experimental-webgl', { antialias: false, alpha: true, premultipliedAlpha: true })
    } catch {
      gl = null
    }
    if (!gl) return

    let program
    try {
      const vs = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER)
      const fs = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER)
      program = gl.createProgram()
      gl.attachShader(program, vs)
      gl.attachShader(program, fs)
      gl.linkProgram(program)
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        throw new Error(gl.getProgramInfoLog(program) || 'Program link failed')
      }
    } catch (e) {
      console.error('ColorBends: WebGL init failed', e)
      return
    }

    gl.useProgram(program)
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)

    const quad = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, quad)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
    const positionLoc = gl.getAttribLocation(program, 'position')
    gl.enableVertexAttribArray(positionLoc)
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0)

    const u = {
      canvas: gl.getUniformLocation(program, 'uCanvas'),
      time: gl.getUniformLocation(program, 'uTime'),
      speed: gl.getUniformLocation(program, 'uSpeed'),
      rot: gl.getUniformLocation(program, 'uRot'),
      colorCount: gl.getUniformLocation(program, 'uColorCount'),
      colors: gl.getUniformLocation(program, 'uColors'),
      transparent: gl.getUniformLocation(program, 'uTransparent'),
      scale: gl.getUniformLocation(program, 'uScale'),
      frequency: gl.getUniformLocation(program, 'uFrequency'),
      warpStrength: gl.getUniformLocation(program, 'uWarpStrength'),
      pointer: gl.getUniformLocation(program, 'uPointer'),
      mouseInfluence: gl.getUniformLocation(program, 'uMouseInfluence'),
      parallax: gl.getUniformLocation(program, 'uParallax'),
      noise: gl.getUniformLocation(program, 'uNoise'),
      iterations: gl.getUniformLocation(program, 'uIterations'),
      intensity: gl.getUniformLocation(program, 'uIntensity'),
      bandWidth: gl.getUniformLocation(program, 'uBandWidth'),
    }

    const colorArr = cfg.colors.slice(0, MAX_COLORS).map(hexToRgb01)
    const flatColors = new Float32Array(MAX_COLORS * 3)
    colorArr.forEach(([r, g, b], i) => {
      flatColors[i * 3] = r
      flatColors[i * 3 + 1] = g
      flatColors[i * 3 + 2] = b
    })

    let raf = 0
    const startTime = performance.now()
    const pointerTarget = { x: 0, y: 0 }
    const pointerCurrent = { x: 0, y: 0 }

    function resize() {
      const rect = canvas.parentElement.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.max(1, Math.round(rect.width * dpr))
      canvas.height = Math.max(1, Math.round(rect.height * dpr))
      canvas.style.width = rect.width + 'px'
      canvas.style.height = rect.height + 'px'
      gl.viewport(0, 0, canvas.width, canvas.height)
    }

    function onMove(e) {
      const rect = canvas.getBoundingClientRect()
      pointerTarget.x = ((e.clientX - rect.left) / (rect.width || 1)) * 2 - 1
      pointerTarget.y = -(((e.clientY - rect.top) / (rect.height || 1)) * 2 - 1)
    }

    let lastNow = startTime

    function render(now) {
      const dt = Math.min(0.05, (now - lastNow) / 1000)
      lastNow = now
      const elapsed = (now - startTime) / 1000

      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)

      gl.uniform2f(u.canvas, canvas.width, canvas.height)
      gl.uniform1f(u.time, elapsed)
      gl.uniform1f(u.speed, cfg.speed)

      const deg = (cfg.rotation % 360) + cfg.autoRotate * elapsed
      const rad = (deg * Math.PI) / 180
      gl.uniform2f(u.rot, Math.cos(rad), Math.sin(rad))

      gl.uniform1i(u.colorCount, colorArr.length)
      gl.uniform3fv(u.colors, flatColors)
      gl.uniform1i(u.transparent, cfg.transparent ? 1 : 0)
      gl.uniform1f(u.scale, cfg.scale)
      gl.uniform1f(u.frequency, cfg.frequency)
      gl.uniform1f(u.warpStrength, cfg.warpStrength)

      const amt = Math.min(1, dt * 8)
      pointerCurrent.x += (pointerTarget.x - pointerCurrent.x) * amt
      pointerCurrent.y += (pointerTarget.y - pointerCurrent.y) * amt
      gl.uniform2f(u.pointer, pointerCurrent.x, pointerCurrent.y)

      gl.uniform1f(u.mouseInfluence, cfg.mouseInfluence)
      gl.uniform1f(u.parallax, cfg.parallax)
      gl.uniform1f(u.noise, cfg.noise)
      gl.uniform1i(u.iterations, cfg.iterations)
      gl.uniform1f(u.intensity, cfg.intensity)
      gl.uniform1f(u.bandWidth, cfg.bandWidth)

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      if (!reduce) raf = requestAnimationFrame(render)
    }

    resize()
    window.addEventListener('resize', resize)
    if (!reduce) window.addEventListener('pointermove', onMove)
    raf = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
      gl.deleteProgram(program)
      gl.deleteBuffer(quad)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  )
}
