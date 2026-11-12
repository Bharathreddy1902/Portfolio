"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

/* ---------- glow point shader (shared by neurons, signals, dust) ---------- */
const vert = /* glsl */ `
  attribute float aSize;
  attribute vec3 aColor;
  uniform float uPixelRatio;
  uniform float uTime;
  varying vec3 vColor;
  varying float vTw;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * mv;
    vTw = 0.75 + 0.25 * sin(uTime * 2.0 + position.x * 3.0 + position.y * 5.0);
    gl_PointSize = aSize * uPixelRatio * (260.0 / -mv.z);
    vColor = aColor;
  }
`;
const frag = /* glsl */ `
  uniform float uOpacity;
  varying vec3 vColor;
  varying float vTw;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float core = smoothstep(0.5, 0.0, d);
    float a = pow(core, 2.2) * uOpacity * vTw;
    if (a < 0.01) discard;
    gl_FragColor = vec4(vColor * (1.0 + core), a);
  }
`;

function useGlowMaterial(opacity: number) {
  const { gl } = useThree();
  return useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: vert,
        fragmentShader: frag,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: { uPixelRatio: { value: Math.min(gl.getPixelRatio(), 2) }, uOpacity: { value: opacity }, uTime: { value: 0 } },
      }),
    [gl, opacity],
  );
}

const BLUE = new THREE.Color("#5b9bff");
const VIOLET = new THREE.Color("#a78bfa");
const CYAN = new THREE.Color("#7ee8fa");

/* ---------- deterministic RNG so SSR/CSR and re-renders agree ---------- */
function rng(seed: number) {
  return () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
}

type Graph = { nodes: THREE.Vector3[]; edges: [number, number][]; out: number[][] };

function buildGraph(layers: number[]): Graph {
  const r = rng(42);
  const nodes: THREE.Vector3[] = [];
  const layerIdx: number[][] = [];
  const span = 7.2;
  layers.forEach((count, li) => {
    const x = -span / 2 + (span * li) / (layers.length - 1);
    const radius = 0.9 + 1.4 * Math.sin((Math.PI * (li + 0.5)) / layers.length);
    const ids: number[] = [];
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const rr = radius * (0.75 + r() * 0.35);
      nodes.push(new THREE.Vector3(x + (r() - 0.5) * 0.5, rr * Math.cos(phi) * 0.95, rr * Math.sin(phi) * Math.sin(theta) * 0.9));
      ids.push(nodes.length - 1);
    }
    layerIdx.push(ids);
  });
  const edges: [number, number][] = [];
  const out: number[][] = nodes.map(() => []);
  for (let l = 0; l < layerIdx.length - 1; l++) {
    const a = layerIdx[l], b = layerIdx[l + 1];
    a.forEach((n) => {
      const picks = new Set<number>();
      const k = 3 + Math.floor(r() * 2);
      while (picks.size < Math.min(k, b.length)) picks.add(b[Math.floor(r() * b.length)]);
      picks.forEach((m) => { out[n].push(edges.length); edges.push([n, m]); });
    });
  }
  return { nodes, edges, out };
}

function Network({ mobile, reduce }: { mobile: boolean; reduce: boolean }) {
  const group = useRef<THREE.Group>(null);
  const graph = useMemo(() => buildGraph(mobile ? [5, 8, 10, 8, 5] : [7, 12, 16, 16, 12, 7]), [mobile]);
  const nodeMat = useGlowMaterial(1);
  const pulseMat = useGlowMaterial(1);
  const { viewport } = useThree();

  /* neurons */
  const nodeGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(graph.nodes.length * 3);
    const col = new Float32Array(graph.nodes.length * 3);
    const size = new Float32Array(graph.nodes.length);
    const xs = graph.nodes.map((n) => n.x);
    const minX = Math.min(...xs), maxX = Math.max(...xs);
    graph.nodes.forEach((n, i) => {
      pos.set([n.x, n.y, n.z], i * 3);
      const c = BLUE.clone().lerp(VIOLET, (n.x - minX) / (maxX - minX));
      col.set([c.r, c.g, c.b], i * 3);
      size[i] = 0.55 + ((i * 7919) % 10) / 22;
    });
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("aColor", new THREE.BufferAttribute(col, 3));
    g.setAttribute("aSize", new THREE.BufferAttribute(size, 1));
    return g;
  }, [graph]);

  /* synapses */
  const lineGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(graph.edges.length * 6);
    const col = new Float32Array(graph.edges.length * 6);
    graph.edges.forEach(([a, b], i) => {
      const A = graph.nodes[a], B = graph.nodes[b];
      pos.set([A.x, A.y, A.z, B.x, B.y, B.z], i * 6);
      const ca = BLUE.clone().lerp(VIOLET, (A.x + 3.6) / 7.2);
      const cb = BLUE.clone().lerp(VIOLET, (B.x + 3.6) / 7.2);
      col.set([ca.r, ca.g, ca.b, cb.r, cb.g, cb.b], i * 6);
    });
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("color", new THREE.BufferAttribute(col, 3));
    return g;
  }, [graph]);
  const lineMat = useMemo(() => new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.16, blending: THREE.AdditiveBlending, depthWrite: false }), []);

  /* signals propagating forward through the network */
  const PULSES = mobile ? 26 : 60;
  const pulses = useMemo(() => {
    const r = rng(7);
    const firstLayerEdges = graph.edges.map((_, i) => i);
    return Array.from({ length: PULSES }, () => ({ edge: firstLayerEdges[Math.floor(r() * firstLayerEdges.length)], t: r(), speed: 0.35 + r() * 0.5 }));
  }, [graph, PULSES]);
  const pulseGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(new Float32Array(PULSES * 3), 3));
    const col = new Float32Array(PULSES * 3);
    const size = new Float32Array(PULSES);
    for (let i = 0; i < PULSES; i++) { col.set([CYAN.r, CYAN.g, CYAN.b], i * 3); size[i] = 0.9; }
    g.setAttribute("aColor", new THREE.BufferAttribute(col, 3));
    g.setAttribute("aSize", new THREE.BufferAttribute(size, 1));
    return g;
  }, [PULSES]);

  const tmp = useMemo(() => new THREE.Vector3(), []);
  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const t = state.clock.elapsedTime;
    nodeMat.uniforms.uTime.value = t;
    pulseMat.uniforms.uTime.value = t;

    const posAttr = pulseGeo.getAttribute("position") as THREE.BufferAttribute;
    pulses.forEach((p, i) => {
      p.t += dt * p.speed * (reduce ? 0 : 1);
      if (p.t >= 1) {
        const end = graph.edges[p.edge][1];
        const next = graph.out[end];
        p.edge = next.length ? next[Math.floor(Math.random() * next.length)] : Math.floor(Math.random() * graph.edges.length);
        p.t = 0;
      }
      const [a, b] = graph.edges[p.edge];
      tmp.copy(graph.nodes[a]).lerp(graph.nodes[b], p.t);
      posAttr.setXYZ(i, tmp.x, tmp.y, tmp.z);
    });
    posAttr.needsUpdate = true;

    if (group.current && !reduce) {
      const g = group.current;
      g.rotation.y += (state.pointer.x * 0.45 + Math.sin(t * 0.15) * 0.25 - g.rotation.y) * 0.04;
      g.rotation.x += (-state.pointer.y * 0.25 - g.rotation.x) * 0.04;
      g.position.y = Math.sin(t * 0.6) * 0.08;
    }
  });

  const offsetX = viewport.aspect > 1.15 ? Math.min(2.6, viewport.width * 0.2) : 0;
  const scale = viewport.aspect > 1.15 ? 1 : Math.min(1, viewport.width / 8.5);

  return (
    <group position={[offsetX, mobile ? 1.2 : 0, 0]} scale={scale}>
      <group ref={group} rotation={[0.1, -0.5, 0]}>
        <lineSegments geometry={lineGeo} material={lineMat} />
        <points geometry={nodeGeo} material={nodeMat} />
        <points geometry={pulseGeo} material={pulseMat} />
      </group>
    </group>
  );
}

function Dust({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null);
  const mat = useGlowMaterial(0.55);
  const geo = useMemo(() => {
    const r = rng(99);
    const g = new THREE.BufferGeometry();
    const pos = new Float32Array(count * 3), col = new Float32Array(count * 3), size = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos.set([(r() - 0.5) * 30, (r() - 0.5) * 18, -4 - r() * 14], i * 3);
      const c = [BLUE, VIOLET, CYAN][i % 3];
      col.set([c.r, c.g, c.b], i * 3);
      size[i] = 0.15 + r() * 0.35;
    }
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("aColor", new THREE.BufferAttribute(col, 3));
    g.setAttribute("aSize", new THREE.BufferAttribute(size, 1));
    return g;
  }, [count]);
  useFrame((s) => {
    mat.uniforms.uTime.value = s.clock.elapsedTime;
    if (ref.current) {
      ref.current.rotation.z = s.clock.elapsedTime * 0.01;
      ref.current.position.x += (s.pointer.x * 0.4 - ref.current.position.x) * 0.02;
      ref.current.position.y += (s.pointer.y * 0.25 - ref.current.position.y) * 0.02;
    }
  });
  return <points ref={ref} geometry={geo} material={mat} />;
}

export default function NeuralScene() {
  const wrap = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [env, setEnv] = useState<{ mobile: boolean; reduce: boolean } | null>(null);

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 768px)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnv({ mobile, reduce });
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0 });
    if (wrap.current) io.observe(wrap.current);
    const onVis = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => { io.disconnect(); document.removeEventListener("visibilitychange", onVis); };
  }, []);

  return (
    <div ref={wrap} className="absolute inset-0 opacity-45 md:opacity-100" aria-hidden>
      {env && (
        <Canvas
          dpr={[1, env.mobile ? 1.5 : 1.75]}
          camera={{ position: [0, 0, 9], fov: 50 }}
          gl={{ antialias: !env.mobile, alpha: true, powerPreference: "high-performance" }}
          frameloop={!visible ? "never" : env.reduce ? "demand" : "always"}
          eventSource={typeof document !== "undefined" ? document.body : undefined}
          eventPrefix="client"
        >
          <Network mobile={env.mobile} reduce={env.reduce} />
          <Dust count={env.mobile ? 260 : 700} />
        </Canvas>
      )}
    </div>
  );
}
