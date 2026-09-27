const fs = require('fs');
const path = require('path');

const arrays = [];
let binaryOffset = 0;
function addAccessor(values, type, componentType, target, min, max) {
  const bytes = Buffer.from(values.buffer, values.byteOffset, values.byteLength);
  const aligned = (binaryOffset + 3) & ~3;
  const padding = Buffer.alloc(aligned - binaryOffset);
  arrays.push(padding, bytes);
  const viewIndex = arrays.views.length;
  arrays.views.push({ buffer: 0, byteOffset: aligned, byteLength: bytes.length, ...(target ? { target } : {}) });
  binaryOffset = aligned + bytes.length;
  const accessor = { bufferView: viewIndex, componentType, count: values.length / ({ SCALAR: 1, VEC2: 2, VEC3: 3, VEC4: 4 }[type]), type };
  if (min) accessor.min = min;
  if (max) accessor.max = max;
  arrays.accessors.push(accessor);
  return arrays.accessors.length - 1;
}
arrays.views = [];
arrays.accessors = [];

function noise(a, b, c) {
  return Math.sin(a * 12.9898 + b * 78.233 + c * 37.719) * 0.5 + Math.sin(a * 3.1 - b * 5.7 + c * 8.3) * 0.25;
}
function colorMix(base, t) {
  return base.map((v, i) => Math.max(0, Math.min(1, v + t * [0.14, 0.15, 0.12][i])));
}
const primitives = [];
function createSurface(name, positions, indices, colorFn) {
  const colors = [];
  for (let i = 0; i < positions.length; i += 3) colors.push(...colorFn(positions[i], positions[i + 1], positions[i + 2]));
  const pMin = [Infinity, Infinity, Infinity], pMax = [-Infinity, -Infinity, -Infinity];
  for (let i = 0; i < positions.length; i += 3) for (let k = 0; k < 3; k++) { pMin[k] = Math.min(pMin[k], positions[i + k]); pMax[k] = Math.max(pMax[k], positions[i + k]); }
  const pos = addAccessor(new Float32Array(positions), 'VEC3', 5126, 34962, pMin, pMax);
  const col = addAccessor(new Float32Array(colors), 'VEC3', 5126, 34962);
  const idx = addAccessor(new Uint32Array(indices), 'SCALAR', 5125, 34963);
  primitives.push({ name, attributes: { POSITION: pos, COLOR_0: col }, indices: idx, material: name === 'meadow' ? 0 : 1, mode: 4 });
}

// A dense, gently rolling meadow: the building district stays level while the
// outer park has subtle natural undulations and a hand-shaped coastline.
const positions = [], indices = [];
const rings = 28, segments = 192;
for (let r = 0; r <= rings; r++) {
  const t = r / rings;
  for (let s = 0; s <= segments; s++) {
    const a = (s / segments) * Math.PI * 2;
    const coast = 11.65 * (1 + 0.028 * Math.sin(a * 5 + 0.6) + 0.018 * Math.sin(a * 9 - 1.1) + 0.012 * Math.cos(a * 13));
    const radius = t * coast;
    const edgeFade = Math.max(0, (t - 0.56) / 0.44);
    const rolling = (Math.sin(a * 3 + radius * 0.55) * 0.036 + Math.sin(a * 7 - radius * 0.33) * 0.018) * edgeFade;
    const localNoise = noise(Math.cos(a) * radius, Math.sin(a) * radius, 0.2) * 0.022 * edgeFade;
    const x = Math.cos(a) * radius, z = Math.sin(a) * radius;
    positions.push(x, 0.38 + rolling + localNoise, z);
    if (r < rings && s < segments) {
      const p = r * (segments + 1) + s, q = p + segments + 1;
      indices.push(p, q, p + 1, p + 1, q, q + 1);
    }
  }
}
createSurface('meadow', positions, indices, (x, y, z) => {
  const grain = noise(x, z, 1.3) * 0.18;
  const base = [0.25, 0.49, 0.24];
  const edge = Math.max(0, (Math.hypot(x, z) - 8.5) / 3.4);
  const c = colorMix(base, grain - edge * 0.045);
  return c;
});

// A single sculpted coastal escarpment with a banded sandstone seam.
const cliffPositions = [], cliffIndices = [];
const cliffRings = 20;
for (let r = 0; r <= cliffRings; r++) {
  const t = r / cliffRings;
  for (let s = 0; s <= segments; s++) {
    const a = (s / segments) * Math.PI * 2;
    const wave = Math.sin(a * 5 + 0.6) * 0.33 + Math.sin(a * 9 - 1.1) * 0.2 + Math.cos(a * 13) * 0.12;
    const topR = 11.65 * (1 + 0.028 * Math.sin(a * 5 + 0.6) + 0.018 * Math.sin(a * 9 - 1.1) + 0.012 * Math.cos(a * 13));
    const bottomR = 10.15 + wave * 0.58;
    const radius = topR * (1 - t) + bottomR * t + Math.sin(t * Math.PI) * wave * 0.18;
    const x = Math.cos(a) * radius, z = Math.sin(a) * radius;
    const y = 0.35 - t * 1.78 + Math.sin(a * 8 + t * 9) * 0.075 * t;
    cliffPositions.push(x, y, z);
    if (r < cliffRings && s < segments) {
      const p = r * (segments + 1) + s, q = p + segments + 1;
      cliffIndices.push(p, p + 1, q, p + 1, q + 1, q);
    }
  }
}
createSurface('coastal-rock', cliffPositions, cliffIndices, (x, y, z) => {
  const grain = noise(x * 0.9, z * 1.1, y * 2) * 0.25;
  const band = Math.sin(y * 15 + Math.sin(Math.atan2(z, x) * 5) * 0.5) * 0.045;
  const base = y < -0.8 ? [0.42, 0.35, 0.27] : [0.57, 0.47, 0.34];
  return colorMix(base, grain + band);
});

const bin = Buffer.concat(arrays);
const gltf = {
  asset: { version: '2.0', generator: 'Tal Klein Portfolio Island Builder' },
  scene: 0, scenes: [{ nodes: [0] }], nodes: [{ mesh: 0, name: 'IslandTerrain' }],
  meshes: [{ name: 'IslandTerrain', primitives }],
  materials: [
    { name: 'Living meadow', pbrMetallicRoughness: { baseColorFactor: [1, 1, 1, 1], metallicFactor: 0, roughnessFactor: 0.96 }, doubleSided: true },
    { name: 'Weathered sandstone and coastal rock', pbrMetallicRoughness: { baseColorFactor: [1, 1, 1, 1], metallicFactor: 0, roughnessFactor: 1 }, doubleSided: true }
  ],
  buffers: [{ byteLength: bin.length }], bufferViews: arrays.views, accessors: arrays.accessors
};
const json = Buffer.from(JSON.stringify(gltf));
const jsonLength = (json.length + 3) & ~3;
const binLength = (bin.length + 3) & ~3;
const header = Buffer.alloc(12); header.writeUInt32LE(0x46546c67, 0); header.writeUInt32LE(2, 4); header.writeUInt32LE(12 + 8 + jsonLength + 8 + binLength, 8);
const jsonHeader = Buffer.alloc(8); jsonHeader.writeUInt32LE(jsonLength, 0); jsonHeader.writeUInt32LE(0x4e4f534a, 4);
const binHeader = Buffer.alloc(8); binHeader.writeUInt32LE(binLength, 0); binHeader.writeUInt32LE(0x004e4942, 4);
const padJson = Buffer.alloc(jsonLength - json.length, 0x20), padBin = Buffer.alloc(binLength - bin.length);
const out = path.join(__dirname, '..', 'assets', 'island-terrain.glb');
fs.writeFileSync(out, Buffer.concat([header, jsonHeader, json, padJson, binHeader, bin, padBin]));
console.log(`Wrote ${out} (${fs.statSync(out).size} bytes)`);
