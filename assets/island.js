/**
 * 🏝️ Tal Klein's 3D Career Island
 * Inspired by acrokat.me — Handcrafted, minimalist, low-poly interactive world
 * Uses local Three.js (no CDN dependencies)
 */

(function () {
  'use strict';

  let scene, camera, renderer, controls;
  let canvas, container;
  let landmarks = [];
  let clickableObjects = [];
  let hoveredLandmark = null;
  let isOrbiting = true;
  let oceanMesh;
  let basketballMesh, basketballBasePos, isShooting = false;
  let puppyTailMesh, puppyHeadMesh;
  let cowHeadMesh;
  let beaconLight, beaconMesh;

  // Landmark Data matching Tal's career and personal journey
  const LANDMARKS = {
    bgu: {
      id: 'bgu',
      title: 'Ben-Gurion University',
      tag: 'Education · M.Sc & B.Sc',
      subtitle: 'Data Engineering & NLP (GPA 92, Meitar Excellence)',
      icon: '🎓',
      focusPos: { x: -0.5, y: 1.5, z: -1.0 },
      camPos: { x: 3, y: 8, z: 9 },
      desc: 'Graduated B.Sc. in Data Engineering and completed M.Sc. in Software & Information Systems Engineering specializing in Data Science & NLP. Honored as a Meitar Excellence Program Fellow with a 92 GPA.',
      bullets: [
        'M.Sc. Thesis: LLM-driven structured fact extraction and causal inference in legal judgments',
        'B.Sc. Data Engineering: Core algorithms, distributed data architectures, and statistical foundations',
        'Meitar Excellence Program fellow (top-tier graduate research scholarship)'
      ],
      stats: [
        { v: '92', k: 'M.Sc. GPA' },
        { v: 'BGU', k: 'Alma Mater' },
        { v: 'מיתר', k: 'Excellence' }
      ],
      jumpTarget: '#education'
    },
    legalAi: {
      id: 'legalAi',
      title: 'Legal AI & Bias Research',
      tag: 'Research Publication',
      subtitle: 'Springer · Artificial Intelligence and Law (2026)',
      icon: '⚖️',
      focusPos: { x: 7.2, y: 1.5, z: 1.5 },
      camPos: { x: 12, y: 7, z: 10 },
      desc: 'Master’s thesis research: "Examining Bias in Sentencing Decisions with LLM-Powered Control over the Facts." Currently under peer review at Springer’s AI and Law journal.',
      bullets: [
        'End-to-end NLP pipeline parsing 6,000+ unstructured Hebrew court verdicts',
        'GPT-5-mini batch inference extracting 30+ structured legal attributes with 0.92 F1 score',
        'Counterfactual causal modeling examining racial and demographic sentencing disparities'
      ],
      stats: [
        { v: '6,000+', k: 'Verdicts' },
        { v: '0.92', k: 'F1 Score' },
        { v: 'Springer', k: 'Under Review' }
      ],
      jumpTarget: '#education'
    },
    codeLab: {
      id: 'codeLab',
      title: 'The Builder’s Tech Hub',
      tag: 'Production ML & Systems',
      subtitle: 'Search Engines, Multimodal AI & Speech',
      icon: '💻',
      focusPos: { x: 3.5, y: 1.8, z: 7.5 },
      camPos: { x: 8, y: 7, z: 16 },
      desc: 'Full-stack machine learning engineering: scaling search over millions of documents, multimodal audio-text agreement pipelines, and real-time deep learning systems.',
      bullets: [
        'Wikipedia-Scale IR Engine: 6.4M pages, BM25, TF-IDF, PageRank on GCP, 8× latency speedup',
        'Hebrew Dialogue Silence Tagging: AssemblyAI + Gemini pipeline, Cohen’s Kappa 0.69',
        'Speech Emotion Recognition: Wav2Vec2 & HuBERT fine-tuning, 81.3% test accuracy'
      ],
      stats: [
        { v: '6.4M', k: 'Pages' },
        { v: '8×', k: 'Speedup' },
        { v: '7+', k: 'Projects' }
      ],
      jumpTarget: '#projects'
    },
    farm: {
      id: 'farm',
      title: 'The Heritage Farm',
      tag: 'Roots & Heritage',
      subtitle: 'Family Dairy Farm (רפת)',
      icon: '🐄',
      focusPos: { x: 7.5, y: 1.2, z: -6.5 },
      camPos: { x: 13, y: 6, z: -2 },
      desc: 'Growing up with a family dairy farm instilled an unshakeable work ethic, early mornings, and a deep appreciation for real-world operations behind the data.',
      bullets: [
        'Learned that consistency, patience, and meticulous care yield reliable results',
        'Grounded perspective: keeping high-level AI models tethered to practical realities',
        'Proud heritage that balances cutting-edge tech with timeless agricultural grit'
      ],
      stats: [
        { v: '🐄', k: 'Dairy Roots' },
        { v: '🌾', k: 'Discipline' },
        { v: '🚜', k: 'Heritage' }
      ],
      jumpTarget: '#about'
    },
    guideDog: {
      id: 'guideDog',
      title: 'Guide-Dog Puppy Haven',
      tag: 'Volunteering & Service',
      subtitle: 'Israel Guide Dog Center for the Blind',
      icon: '🦮',
      focusPos: { x: -6.8, y: 1.2, z: -6.5 },
      camPos: { x: -11, y: 6, z: -1 },
      desc: 'Volunteer Puppy Raiser dedicating 16 months (Jan 2025 – May 2026) to socialize and obedience-train a future guide dog for visually impaired individuals.',
      bullets: [
        'Daily positive-reinforcement conditioning and public-access exposure training',
        'High empathy, responsibility, and emotional discipline',
        'Deep commitment to community and giving back beyond professional work'
      ],
      image: './assets/guide-dog.webp',
      stats: [
        { v: '16 mo', k: 'Dedication' },
        { v: '100%', k: 'Commitment' },
        { v: '🦮', k: 'Guide Dog' }
      ],
      jumpTarget: '#experience'
    },
    basketball: {
      id: 'basketball',
      title: 'Streetball Half-Court',
      tag: 'Sports & Passion',
      subtitle: 'NBA, Euroleague & Maccabi Tel Aviv',
      icon: '🏀',
      focusPos: { x: -7.5, y: 1.0, z: 4.8 },
      camPos: { x: -12, y: 6, z: 11 },
      desc: 'Lifelong basketball enthusiast. Whether watching Maccabi in the Euroleague, following the NBA, or playing on the blacktop, the court is where focus, teamwork, and quick decision-making come alive.',
      bullets: [
        'Sportsmanship, fast court vision, and rapid tactical pivots under pressure',
        'Great mental reset that recharges creative engineering stamina',
        'Click the basketball on the court to launch a swish shot!'
      ],
      stats: [
        { v: '🏀', k: 'Maccabi/NBA' },
        { v: '⚡', k: 'Energy' },
        { v: '🎯', k: 'Swish' }
      ],
      jumpTarget: '#about'
    },
    idf: {
      id: 'idf',
      title: 'IDF Communications Outpost',
      tag: 'Leadership & Service',
      subtitle: 'Communications & Operations NCO (2017–2020)',
      icon: '📻',
      focusPos: { x: -2.8, y: 1.4, z: -10.5 },
      camPos: { x: 2, y: 7, z: -4 },
      desc: 'Communications & Operations NCO in the IDF. Managed high-tempo tactical communications networks, led a small specialist squad, and ensured mission-critical uptime.',
      bullets: [
        'Maintained reliability across high-priority hardware and encrypted radio channels',
        'Team leadership, mentorship, and clear communication under intense pressure',
        'Problem diagnosis, emergency triage, and operational resilience'
      ],
      stats: [
        { v: '3 Yrs', k: 'Service' },
        { v: '24/7', k: 'Readiness' },
        { v: '🎖️', k: 'NCO Lead' }
      ],
      jumpTarget: '#experience'
    },
    pier: {
      id: 'pier',
      title: 'Coastal Pier & Sailboat',
      tag: 'Nature & Travel',
      subtitle: 'Beaches, Hiking & Exploration',
      icon: '⛵',
      focusPos: { x: -11.5, y: 0.5, z: -0.5 },
      camPos: { x: -16, y: 5, z: 6 },
      desc: 'Love for the sea, Mediterranean coastlines, trekking trails, and backpacking trips. Stepping into the open outdoors clears the mind and sparks fresh architectural thinking.',
      bullets: [
        'Hiking trails from northern ridges to southern desert canyons',
        'Connection to the ocean as the ultimate source of calm and perspective',
        'Balancing deep technical concentration with outdoor exploration'
      ],
      stats: [
        { v: '🌊', k: 'Coast' },
        { v: '🥾', k: 'Trails' },
        { v: '☀️', k: 'Outdoors' }
      ],
      jumpTarget: '#about'
    }
  };

  // --- Initialize Scene ---
  function init() {
    container = document.getElementById('islandCanvasContainer');
    canvas = document.getElementById('islandCanvas');
    if (!container || !canvas || typeof THREE === 'undefined') {
      console.warn('Three.js or canvas not ready.');
      return;
    }

    // 1. Scene with soft minimalist pastel sky (matching acrokat.me)
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xEBF4F2); // Soft minty serene pastel
    scene.fog = new THREE.FogExp2(0xEBF4F2, 0.007);

    // 2. Camera with pleasant angled isometric perspective
    const aspect = container.clientWidth / container.clientHeight;
    camera = new THREE.PerspectiveCamera(36, aspect, 0.5, 600);
    // Framed closer and angled to showcase the buildings and paths
    camera.position.set(16, 17, 24);

    // 3. Renderer
    renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      powerPreference: 'high-performance',
      alpha: true
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.18;

    // 4. OrbitControls
    if (typeof THREE.OrbitControls !== 'undefined') {
      controls = new THREE.OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.target.set(1.0, 1.2, 0);
      controls.minDistance = 12;
      controls.maxDistance = 65;
      controls.maxPolarAngle = Math.PI / 2.15;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 0.5;
    }

    // 5. Lighting: Warm bright sun + soft fill
    const hemiLight = new THREE.HemisphereLight(0xFFFFFF, 0x86EFAC, 0.9);
    hemiLight.position.set(0, 50, 0);
    scene.add(hemiLight);

    const sun = new THREE.DirectionalLight(0xFFFAF0, 1.55);
    sun.position.set(30, 42, 22);
    sun.castShadow = true;
    sun.shadow.mapSize.width = 2048;
    sun.shadow.mapSize.height = 2048;
    sun.shadow.camera.near = 10;
    sun.shadow.camera.far = 130;
    const d = 22;
    sun.shadow.camera.left = -d;
    sun.shadow.camera.right = d;
    sun.shadow.camera.top = d;
    sun.shadow.camera.bottom = -d;
    sun.shadow.bias = -0.0004;
    scene.add(sun);

    const ambient = new THREE.AmbientLight(0xFFFFFF, 0.38);
    scene.add(ambient);

    // 6. Build the Crafted Island World
    buildOceanWater();
    buildIslandGround();
    buildRoadsAndPaths();
    buildPerimeterRocks();
    buildPierAndBoat();
    buildFloraAndCherryTrees();
    buildStreetLamps();

    // 7. Build All Landmarks
    buildBguBuilding();
    buildLegalAiCourthouse();
    buildTechLabBuilding();
    buildHeritageBarnAndCow();
    buildGuideDogHaven();
    buildBasketballCourt();
    buildIdfRadioOutpost();

    // 8. Interaction & Listeners
    setupInteraction();
    window.addEventListener('resize', onWindowResize);

    // 9. Start Loop
    animate(0);
  }

  // --- Ocean Water Surface: Luminous Turquoise Ring ---
  function buildOceanWater() {
    const geo = new THREE.CircleGeometry(26, 48);
    const mat = new THREE.MeshStandardMaterial({
      color: 0x38BDF8, // Luminous tropical sea
      roughness: 0.12,
      metalness: 0.1,
      transparent: true,
      opacity: 0.82,
      flatShading: true
    });
    oceanMesh = new THREE.Mesh(geo, mat);
    oceanMesh.rotation.x = -Math.PI / 2;
    oceanMesh.position.y = 0.45;
    oceanMesh.receiveShadow = true;
    scene.add(oceanMesh);
  }

  // --- Island Ground: Organic sculpted plateau with grass and sand ---
  function buildIslandGround() {
    const island = new THREE.Group();

    // Sand/Rock base
    const sandGeo = new THREE.CylinderGeometry(14.5, 17.5, 1.4, 36);
    const sPos = sandGeo.attributes.position;
    for (let i = 0; i < sPos.count; i++) {
      const x = sPos.getX(i);
      const z = sPos.getZ(i);
      const dist = Math.sqrt(x * x + z * z);
      const angle = Math.atan2(z, x);
      const noise = Math.sin(angle * 4) * 0.7 + Math.cos(angle * 7) * 0.4;
      if (dist > 5) {
        sPos.setX(i, x + Math.cos(angle) * noise);
        sPos.setZ(i, z + Math.sin(angle) * noise);
      }
    }
    sandGeo.computeVertexNormals();
    const sandMat = new THREE.MeshStandardMaterial({ color: 0xD4B982, roughness: 0.9, flatShading: true });
    const sandMesh = new THREE.Mesh(sandGeo, sandMat);
    sandMesh.position.y = 0.2;
    sandMesh.receiveShadow = true;
    island.add(sandMesh);

    // Lush Emerald Grass Top
    const grassGeo = new THREE.CylinderGeometry(13.2, 14.5, 1.2, 36);
    const gPos = grassGeo.attributes.position;
    for (let i = 0; i < gPos.count; i++) {
      const x = gPos.getX(i);
      const y = gPos.getY(i);
      const z = gPos.getZ(i);
      const dist = Math.sqrt(x * x + z * z);
      const angle = Math.atan2(z, x);
      const noise = Math.sin(angle * 4) * 0.5 + Math.cos(angle * 6) * 0.3;
      if (dist > 4) {
        gPos.setX(i, x + Math.cos(angle) * noise);
        gPos.setZ(i, z + Math.sin(angle) * noise);
      }
      if (y > 0) {
        const hill = Math.max(0, 1 - (dist / 13)) * 0.7;
        gPos.setY(i, y + hill);
      }
    }
    grassGeo.computeVertexNormals();
    const grassMat = new THREE.MeshStandardMaterial({ color: 0x48BB78, roughness: 0.75, flatShading: true });
    const grassMesh = new THREE.Mesh(grassGeo, grassMat);
    grassMesh.position.y = 1.05;
    grassMesh.receiveShadow = true;
    grassMesh.castShadow = true;
    island.add(grassMesh);

    scene.add(island);
  }

  // --- Winding Cobblestone Road Connecting Everything ---
  function buildRoadsAndPaths() {
    const roadMat = new THREE.MeshStandardMaterial({ color: 0xE2E8F0, roughness: 0.95, flatShading: true });

    // Main central courtyard plaza
    const plaza = new THREE.Mesh(new THREE.CylinderGeometry(4.2, 4.2, 0.08, 16), roadMat);
    plaza.position.set(0, 1.85, 0);
    plaza.receiveShadow = true;
    scene.add(plaza);

    // Path segments connecting outward
    const pathSegments = [
      { x: 3.5, z: 1.2, r: 1.8 },
      { x: 5.5, z: 2.2, r: 1.6 },
      { x: 2.5, z: 5.2, r: 1.5 },
      { x: -3.5, z: 2.2, r: 1.6 },
      { x: -5.5, z: 3.8, r: 1.5 },
      { x: 4.8, z: -3.8, r: 1.7 },
      { x: -4.5, z: -3.8, r: 1.6 },
      { x: -7.5, z: 0.5, r: 1.5 },
      { x: -9.5, z: -0.2, r: 1.4 } // Leads to pier
    ];

    pathSegments.forEach(p => {
      const tile = new THREE.Mesh(new THREE.CylinderGeometry(p.r, p.r, 0.06, 10), roadMat);
      tile.position.set(p.x, 1.82, p.z);
      tile.receiveShadow = true;
      scene.add(tile);
    });
  }

  // --- Perimeter Rocky Cliffs (like Kat's island boulders) ---
  function buildPerimeterRocks() {
    const rockMat = new THREE.MeshStandardMaterial({ color: 0xA38870, roughness: 0.9, flatShading: true });
    const rockData = [
      { x: -14.5, z: 3.0, s: 1.6 },
      { x: -14.0, z: -5.0, s: 1.8 },
      { x: -10.5, z: -12.0, s: 1.7 },
      { x: 0.5, z: -15.5, s: 2.0 },
      { x: 10.5, z: -11.5, s: 1.8 },
      { x: 14.5, z: -3.5, s: 1.9 },
      { x: 14.0, z: 5.5, s: 1.7 },
      { x: 8.5, z: 13.0, s: 1.9 },
      { x: -2.0, z: 14.5, s: 1.8 },
      { x: -9.5, z: 11.5, s: 1.6 }
    ];

    rockData.forEach(r => {
      const geo = new THREE.DodecahedronGeometry(r.s, 0);
      const mesh = new THREE.Mesh(geo, rockMat);
      mesh.position.set(r.x, 0.6, r.z);
      mesh.rotation.set(r.x, r.z, 0.5);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      scene.add(mesh);
    });
  }

  // --- Wooden Pier & Sailboat ---
  function buildPierAndBoat() {
    const woodMat = new THREE.MeshStandardMaterial({ color: 0x854D0E, roughness: 0.85, flatShading: true });

    // Wooden deck extending into water
    const pier = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.18, 1.4), woodMat);
    pier.position.set(-11.5, 0.35, -0.5);
    pier.castShadow = true;
    pier.receiveShadow = true;
    scene.add(pier);

    // Pilings (posts) in water
    for (let px of [-13.2, -11.5, -9.8]) {
      for (let pz of [-1.0, 0.0]) {
        const post = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.9, 6), woodMat);
        post.position.set(px, 0.05, pz);
        post.castShadow = true;
        scene.add(post);
      }
    }

    // Cute Sailboat docked at pier
    const boatGroup = new THREE.Group();
    boatGroup.position.set(-13.8, 0.15, 0.8);
    boatGroup.rotation.y = 0.35;

    // Hull
    const hullMat = new THREE.MeshStandardMaterial({ color: 0xF8FAFC, roughness: 0.5 });
    const hullBottom = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.45, 0.9), hullMat);
    hullBottom.castShadow = true;
    boatGroup.add(hullBottom);

    const blueTrim = new THREE.Mesh(new THREE.BoxGeometry(2.05, 0.1, 0.94), new THREE.MeshStandardMaterial({ color: 0x2563EB }));
    blueTrim.position.y = 0.18;
    boatGroup.add(blueTrim);

    // Mast
    const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 2.2, 6), woodMat);
    mast.position.set(0.1, 1.1, 0);
    boatGroup.add(mast);

    // Sail
    const sailGeo = new THREE.ConeGeometry(0.7, 1.6, 3);
    sailGeo.rotateZ(-Math.PI / 2);
    const sailMat = new THREE.MeshStandardMaterial({ color: 0xFFFFFF, roughness: 0.4, side: THREE.DoubleSide });
    const sail = new THREE.Mesh(sailGeo, sailMat);
    sail.position.set(0.45, 1.2, 0);
    sail.castShadow = true;
    boatGroup.add(sail);

    scene.add(boatGroup);
    registerLandmark(boatGroup, LANDMARKS.pier, 2.2);
  }

  // --- Flora: Deciduous Trees & Pink Cherry Blossoms (Acrokat style) ---
  function buildFloraAndCherryTrees() {
    const trees = [
      // Cherry Blossom Trees (Pink)
      { x: -3.5, z: -5.5, type: 'cherry', s: 1.2 },
      { x: 3.8, z: -7.5, type: 'cherry', s: 1.1 },
      { x: -8.0, z: -2.5, type: 'cherry', s: 1.15 },
      { x: 8.5, z: 6.5, type: 'cherry', s: 1.2 },
      // Green Leafy Trees
      { x: -2.5, z: 7.5, type: 'green', s: 1.3 },
      { x: -6.5, z: 8.0, type: 'green', s: 1.1 },
      { x: 8.5, z: -2.0, type: 'green', s: 1.25 },
      { x: 2.0, z: -12.5, type: 'green', s: 1.2 },
      { x: -6.0, z: -11.0, type: 'green', s: 1.05 }
    ];

    trees.forEach(t => {
      const tree = createStylizedTree(t.type, t.s);
      tree.position.set(t.x, 1.8, t.z);
      scene.add(tree);
    });
  }

  function createStylizedTree(type, scale = 1) {
    const tree = new THREE.Group();
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x6B4226, roughness: 0.9, flatShading: true });
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.18 * scale, 0.25 * scale, 1.5 * scale, 6), trunkMat);
    trunk.position.y = 0.75 * scale;
    trunk.castShadow = true;
    tree.add(trunk);

    const foliageColor = type === 'cherry' ? 0xF472B6 : 0x48BB78;
    const foliageMat = new THREE.MeshStandardMaterial({ color: foliageColor, roughness: 0.7, flatShading: true });

    // Multi-puff cloud foliage
    const puffOffsets = [
      { x: 0, y: 1.7, z: 0, r: 0.8 },
      { x: 0.35, y: 1.9, z: 0.2, r: 0.65 },
      { x: -0.3, y: 1.8, z: -0.25, r: 0.65 },
      { x: 0, y: 2.2, z: 0, r: 0.6 }
    ];

    puffOffsets.forEach(p => {
      const puff = new THREE.Mesh(new THREE.DodecahedronGeometry(p.r * scale, 0), foliageMat);
      puff.position.set(p.x * scale, p.y * scale, p.z * scale);
      puff.castShadow = true;
      tree.add(puff);
    });

    return tree;
  }

  // --- Street Lamps Along Pathway ---
  function buildStreetLamps() {
    const lampPositions = [
      { x: -1.8, z: 2.2 },
      { x: 2.2, z: 2.2 },
      { x: -4.5, z: 1.5 },
      { x: 4.8, z: -1.5 }
    ];

    const poleMat = new THREE.MeshStandardMaterial({ color: 0x1E293B, metalness: 0.8, roughness: 0.3 });
    const bulbMat = new THREE.MeshBasicMaterial({ color: 0xFEF08A });

    lampPositions.forEach(p => {
      const lamp = new THREE.Group();
      lamp.position.set(p.x, 1.8, p.z);

      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.05, 1.8, 6), poleMat);
      post.position.y = 0.9;
      post.castShadow = true;
      lamp.add(post);

      const head = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.24, 0.24), bulbMat);
      head.position.y = 1.8;
      lamp.add(head);

      const cap = new THREE.Mesh(new THREE.ConeGeometry(0.22, 0.15, 4), poleMat);
      cap.rotation.y = Math.PI / 4;
      cap.position.y = 1.98;
      lamp.add(cap);

      scene.add(lamp);
    });
  }

  // =========================================================================
  // 🏛️ LANDMARKS: Rich, charming, crafted low-poly buildings
  // =========================================================================

  // 1. 🎓 Ben-Gurion University Academic Hall
  function buildBguBuilding() {
    const data = LANDMARKS.bgu;
    const group = new THREE.Group();
    group.position.set(data.focusPos.x, data.focusPos.y, data.focusPos.z);

    const stoneMat = new THREE.MeshStandardMaterial({ color: 0xE5D0B5, roughness: 0.8, flatShading: true }); // Warm limestone
    const roofMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.6, flatShading: true });
    const winMat = new THREE.MeshStandardMaterial({ color: 0x38BDF8, roughness: 0.2, metalness: 0.5 });
    const doorMat = new THREE.MeshStandardMaterial({ color: 0x78350F, roughness: 0.7 });

    // Main 2-story building body
    const body = new THREE.Mesh(new THREE.BoxGeometry(3.8, 2.2, 2.4), stoneMat);
    body.position.y = 1.1;
    body.castShadow = true;
    group.add(body);

    // Sloped Tile Roof
    const roof = new THREE.Mesh(new THREE.ConeGeometry(2.8, 1.1, 4), roofMat);
    roof.rotation.y = Math.PI / 4;
    roof.position.y = 2.75;
    roof.castShadow = true;
    group.add(roof);

    // Center Bell / Clock Tower
    const tower = new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.8, 1.2), stoneMat);
    tower.position.set(0, 2.6, 0.4);
    tower.castShadow = true;
    group.add(tower);

    const towerCap = new THREE.Mesh(new THREE.ConeGeometry(0.9, 1.1, 4), roofMat);
    towerCap.rotation.y = Math.PI / 4;
    towerCap.position.set(0, 4.0, 0.4);
    towerCap.castShadow = true;
    group.add(towerCap);

    // Clock Face
    const clock = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.05, 12), new THREE.MeshBasicMaterial({ color: 0xFFFFFF }));
    clock.rotation.x = Math.PI / 2;
    clock.position.set(0, 3.0, 1.02);
    group.add(clock);

    // Front Windows Grid
    for (let wx of [-1.3, -0.6, 0.6, 1.3]) {
      for (let wy of [0.7, 1.5]) {
        const win = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.48, 0.05), winMat);
        win.position.set(wx, wy, 1.22);
        group.add(win);
      }
    }

    // Entrance Arch & Double Doors
    const door = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.95, 0.08), doorMat);
    door.position.set(0, 0.48, 1.22);
    group.add(door);

    // Entrance Steps
    const steps = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.2, 0.8), stoneMat);
    steps.position.set(0, 0.1, 1.5);
    steps.receiveShadow = true;
    group.add(steps);

    scene.add(group);
    registerLandmark(group, data, 4.8);
  }

  // 2. ⚖️ Legal AI Research Courthouse (Springer)
  function buildLegalAiCourthouse() {
    const data = LANDMARKS.legalAi;
    const group = new THREE.Group();
    group.position.set(data.focusPos.x, data.focusPos.y, data.focusPos.z);
    group.rotation.y = -0.3;

    const marbleMat = new THREE.MeshStandardMaterial({ color: 0xF8FAFC, roughness: 0.4, flatShading: true });
    const blueMat = new THREE.MeshStandardMaterial({ color: 0x1E3A8A, roughness: 0.6 });
    const goldMat = new THREE.MeshStandardMaterial({ color: 0xF59E0B, metalness: 0.8, roughness: 0.2 });

    // Main courthouse body
    const body = new THREE.Mesh(new THREE.BoxGeometry(3.4, 2.2, 2.6), blueMat);
    body.position.y = 1.1;
    body.castShadow = true;
    group.add(body);

    // Neoclassical Columns in front
    for (let cx of [-1.2, -0.4, 0.4, 1.2]) {
      const col = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.14, 2.1, 8), marbleMat);
      col.position.set(cx, 1.05, 1.4);
      col.castShadow = true;
      group.add(col);
    }

    // Triangular Pediment Roof
    const pediment = new THREE.Mesh(new THREE.ConeGeometry(2.4, 0.9, 4), marbleMat);
    pediment.rotation.y = Math.PI / 4;
    pediment.position.set(0, 2.5, 0.4);
    pediment.castShadow = true;
    group.add(pediment);

    // Gold Scales of Justice Emblem on pediment
    const scales = new THREE.Mesh(new THREE.TorusGeometry(0.24, 0.04, 6, 12), goldMat);
    scales.position.set(0, 2.4, 1.55);
    group.add(scales);

    // Front marble steps
    const steps = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.25, 1.0), marbleMat);
    steps.position.set(0, 0.12, 1.5);
    group.add(steps);

    scene.add(group);
    registerLandmark(group, data, 3.8);
  }

  // 3. 💻 The Builder's Tech Hub (Production ML)
  function buildTechLabBuilding() {
    const data = LANDMARKS.codeLab;
    const group = new THREE.Group();
    group.position.set(data.focusPos.x, data.focusPos.y, data.focusPos.z);
    group.rotation.y = -0.4;

    const frameMat = new THREE.MeshStandardMaterial({ color: 0x0F172A, roughness: 0.3, metalness: 0.6 });
    const glassMat = new THREE.MeshStandardMaterial({ color: 0x38BDF8, roughness: 0.1, metalness: 0.8 });
    const glowMat = new THREE.MeshBasicMaterial({ color: 0x60A5FA });

    // 3-tier stepped modern tech office
    const tier1 = new THREE.Mesh(new THREE.BoxGeometry(3.2, 1.2, 2.6), frameMat);
    tier1.position.y = 0.6;
    tier1.castShadow = true;
    group.add(tier1);

    const win1 = new THREE.Mesh(new THREE.BoxGeometry(3.25, 0.6, 2.65), glassMat);
    win1.position.y = 0.65;
    group.add(win1);

    const tier2 = new THREE.Mesh(new THREE.BoxGeometry(2.6, 1.1, 2.2), frameMat);
    tier2.position.y = 1.75;
    tier2.castShadow = true;
    group.add(tier2);

    const win2 = new THREE.Mesh(new THREE.BoxGeometry(2.65, 0.55, 2.25), glassMat);
    win2.position.y = 1.75;
    group.add(win2);

    // Rooftop Server Antenna & Tech Hub Glow Sign
    const sign = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.3, 0.08), glowMat);
    sign.position.set(0, 2.45, 1.12);
    group.add(sign);

    scene.add(group);
    registerLandmark(group, data, 3.5);
  }

  // 4. 🐄 The Heritage Farm & Dairy Barn (רפת המשפחה)
  function buildHeritageBarnAndCow() {
    const data = LANDMARKS.farm;
    const group = new THREE.Group();
    group.position.set(data.focusPos.x, data.focusPos.y, data.focusPos.z);
    group.rotation.y = 0.35;

    const barnRed = new THREE.MeshStandardMaterial({ color: 0xB91C1C, roughness: 0.8, flatShading: true });
    const barnWhite = new THREE.MeshStandardMaterial({ color: 0xF8FAFC, roughness: 0.6 });
    const roofMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.7 });

    // Traditional Dutch Country Barn
    const barn = new THREE.Mesh(new THREE.BoxGeometry(2.8, 1.8, 2.2), barnRed);
    barn.position.set(0, 0.9, -0.4);
    barn.castShadow = true;
    group.add(barn);

    // Sloped Gambrel Roof
    const roof = new THREE.Mesh(new THREE.ConeGeometry(2.3, 1.1, 4), roofMat);
    roof.rotation.y = Math.PI / 4;
    roof.position.set(0, 2.3, -0.4);
    roof.castShadow = true;
    group.add(roof);

    // White Cross-Braces on Barn Door
    const door = new THREE.Mesh(new THREE.BoxGeometry(1.1, 1.2, 0.06), barnWhite);
    door.position.set(0, 0.6, 0.72);
    group.add(door);

    // Silo (Metal Grain Tower)
    const siloMat = new THREE.MeshStandardMaterial({ color: 0x94A3B8, metalness: 0.6, roughness: 0.3 });
    const silo = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.65, 2.6, 12), siloMat);
    silo.position.set(-1.8, 1.3, -0.4);
    silo.castShadow = true;
    group.add(silo);
    const siloDome = new THREE.Mesh(new THREE.SphereGeometry(0.65, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2), siloMat);
    siloDome.position.set(-1.8, 2.6, -0.4);
    group.add(siloDome);

    // Low-Poly Spotted Cow Grazing in Front
    const cowGroup = new THREE.Group();
    cowGroup.position.set(0.6, 0.1, 1.1);
    cowGroup.rotation.y = -Math.PI / 5;

    const cowWhite = new THREE.MeshStandardMaterial({ color: 0xF8FAFC, roughness: 0.7, flatShading: true });
    const cowBlack = new THREE.MeshStandardMaterial({ color: 0x0F172A, roughness: 0.8 });
    const cowPink = new THREE.MeshStandardMaterial({ color: 0xF472B6, roughness: 0.6 });

    const cBody = new THREE.Mesh(new THREE.BoxGeometry(0.65, 0.55, 1.0), cowWhite);
    cBody.position.y = 0.45;
    cBody.castShadow = true;
    cowGroup.add(cBody);

    const spot = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.3, 0.4), cowBlack);
    spot.position.set(0.2, 0.5, 0.1);
    cowGroup.add(spot);

    // Legs
    for (let lx of [-0.22, 0.22]) {
      for (let lz of [-0.35, 0.35]) {
        const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.4, 6), cowWhite);
        leg.position.set(lx, 0.2, lz);
        leg.castShadow = true;
        cowGroup.add(leg);
      }
    }

    // Head (Animated Grazing)
    cowHeadMesh = new THREE.Group();
    cowHeadMesh.position.set(0, 0.65, 0.55);
    const cHead = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.36, 0.4), cowWhite);
    cowHeadMesh.add(cHead);
    const snout = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.18, 0.2), cowPink);
    snout.position.set(0, -0.09, 0.24);
    cowHeadMesh.add(snout);
    cowGroup.add(cowHeadMesh);

    group.add(cowGroup);

    scene.add(group);
    registerLandmark(group, data, 3.4);
  }

  // 5. 🦮 Guide-Dog Puppy Haven
  function buildGuideDogHaven() {
    const data = LANDMARKS.guideDog;
    const group = new THREE.Group();
    group.position.set(data.focusPos.x, data.focusPos.y, data.focusPos.z);
    group.rotation.y = 0.4;

    const houseWood = new THREE.MeshStandardMaterial({ color: 0x92400E, roughness: 0.85, flatShading: true });
    const roofWood = new THREE.MeshStandardMaterial({ color: 0x451A03, roughness: 0.8 });

    // Wooden Cottage / Doghouse
    const house = new THREE.Mesh(new THREE.BoxGeometry(2.0, 1.4, 1.8), houseWood);
    house.position.set(0, 0.7, -0.5);
    house.castShadow = true;
    group.add(house);

    const roof = new THREE.Mesh(new THREE.ConeGeometry(1.8, 0.9, 4), roofWood);
    roof.rotation.y = Math.PI / 4;
    roof.position.set(0, 1.8, -0.5);
    roof.castShadow = true;
    group.add(roof);

    // Front arch door
    const door = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.9, 0.1), new THREE.MeshBasicMaterial({ color: 0x1A120B }));
    door.position.set(0, 0.45, 0.42);
    group.add(door);

    // Puppy in Training (with signature blue guide-dog service vest!)
    const pupGroup = new THREE.Group();
    pupGroup.position.set(0.7, 0.1, 0.6);
    pupGroup.rotation.y = -Math.PI / 4;

    const pupGold = new THREE.MeshStandardMaterial({ color: 0xD97706, roughness: 0.8, flatShading: true });
    const vestBlue = new THREE.MeshStandardMaterial({ color: 0x2563EB, roughness: 0.6, flatShading: true });

    // Body in blue service vest
    const pBody = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.45, 0.75), vestBlue);
    pBody.position.y = 0.35;
    pBody.castShadow = true;
    pupGroup.add(pBody);

    // Legs
    for (let lx of [-0.18, 0.18]) {
      for (let lz of [-0.25, 0.25]) {
        const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.35, 6), pupGold);
        leg.position.set(lx, 0.17, lz);
        pupGroup.add(leg);
      }
    }

    // Head
    puppyHeadMesh = new THREE.Group();
    puppyHeadMesh.position.set(0, 0.58, 0.4);
    const head = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.32, 0.36), pupGold);
    head.castShadow = true;
    puppyHeadMesh.add(head);

    // Floppy ears
    for (let ex of [-0.2, 0.2]) {
      const ear = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.24, 0.14), pupGold);
      ear.position.set(ex, -0.05, 0);
      puppyHeadMesh.add(ear);
    }
    const snout = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.16, 0.18), pupGold);
    snout.position.set(0, -0.06, 0.24);
    puppyHeadMesh.add(snout);
    pupGroup.add(puppyHeadMesh);

    // Tail (Wags in animation loop)
    puppyTailMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.02, 0.35, 6), pupGold);
    puppyTailMesh.position.set(0, 0.48, -0.38);
    puppyTailMesh.rotation.x = -Math.PI / 4;
    pupGroup.add(puppyTailMesh);

    group.add(pupGroup);

    scene.add(group);
    registerLandmark(group, data, 2.8);
  }

  // 6. 🏀 Streetball Half-Court
  function buildBasketballCourt() {
    const data = LANDMARKS.basketball;
    const group = new THREE.Group();
    group.position.set(data.focusPos.x, data.focusPos.y, data.focusPos.z);
    group.rotation.y = 0.25;

    // Court Surface: Maccabi Blue + Gold Key
    const court = new THREE.Mesh(new THREE.BoxGeometry(4.8, 0.1, 4.2), new THREE.MeshStandardMaterial({ color: 0x1E3A8A, roughness: 0.6 }));
    court.position.y = 0.05;
    court.receiveShadow = true;
    group.add(court);

    const keyMesh = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.12, 2.2), new THREE.MeshStandardMaterial({ color: 0xF59E0B, roughness: 0.6 }));
    keyMesh.position.set(0, 0.06, -0.9);
    group.add(keyMesh);

    // Hoop Post & Backboard
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 2.8, 8), new THREE.MeshStandardMaterial({ color: 0x0F172A, metalness: 0.7 }));
    pole.position.set(0, 1.4, -1.9);
    pole.castShadow = true;
    group.add(pole);

    const bb = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.95, 0.05), new THREE.MeshStandardMaterial({ color: 0xF8FAFC }));
    bb.position.set(0, 2.4, -1.8);
    bb.castShadow = true;
    group.add(bb);

    const rim = new THREE.Mesh(new THREE.TorusGeometry(0.24, 0.025, 8, 16), new THREE.MeshStandardMaterial({ color: 0xEF4444 }));
    rim.rotation.x = Math.PI / 2;
    rim.position.set(0, 2.15, -1.5);
    group.add(rim);

    // Basketball (Clickable Easter Egg)
    basketballBasePos = new THREE.Vector3(0.9, 0.25, 0.8);
    basketballMesh = new THREE.Mesh(new THREE.SphereGeometry(0.2, 14, 14), new THREE.MeshStandardMaterial({ color: 0xEA580C, roughness: 0.5 }));
    basketballMesh.position.copy(basketballBasePos);
    basketballMesh.castShadow = true;
    group.add(basketballMesh);

    scene.add(group);
    registerLandmark(group, data, 3.2);
  }

  // 🏀 Shoot Hoop Animation
  function triggerBasketballShot() {
    if (isShooting || !basketballMesh) return;
    isShooting = true;
    const start = basketballBasePos.clone();
    const hoop = new THREE.Vector3(0, 2.2, -1.5);
    const apex = new THREE.Vector3(0.4, 3.8, -0.3);
    const duration = 1100;
    const startTime = performance.now();

    function updateShot(now) {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      if (t < 0.65) {
        const subT = t / 0.65;
        const x = (1 - subT) * (1 - subT) * start.x + 2 * (1 - subT) * subT * apex.x + subT * subT * hoop.x;
        const y = (1 - subT) * (1 - subT) * start.y + 2 * (1 - subT) * subT * apex.y + subT * subT * hoop.y;
        const z = (1 - subT) * (1 - subT) * start.z + 2 * (1 - subT) * subT * apex.z + subT * subT * hoop.z;
        basketballMesh.position.set(x, y, z);
      } else {
        const bounceT = (t - 0.65) / 0.35;
        const dropY = Math.max(0.25, hoop.y - (bounceT * 2.5) + Math.sin(bounceT * Math.PI) * 0.35);
        basketballMesh.position.set(hoop.x, dropY, hoop.z);
      }
      basketballMesh.rotation.x += 0.25;

      if (t < 1) {
        requestAnimationFrame(updateShot);
      } else {
        setTimeout(() => {
          basketballMesh.position.copy(basketballBasePos);
          isShooting = false;
        }, 600);
      }
    }
    requestAnimationFrame(updateShot);
  }

  // 7. 📻 IDF Radio Outpost
  function buildIdfRadioOutpost() {
    const data = LANDMARKS.idf;
    const group = new THREE.Group();
    group.position.set(data.focusPos.x, data.focusPos.y, data.focusPos.z);

    // Tactical Olive Tent
    const tentMat = new THREE.MeshStandardMaterial({ color: 0x4B5320, roughness: 0.9, flatShading: true });
    const tent = new THREE.Mesh(new THREE.ConeGeometry(1.5, 1.4, 4), tentMat);
    tent.rotation.y = Math.PI / 4;
    tent.position.y = 0.7;
    tent.castShadow = true;
    group.add(tent);

    // Communications Tower Mast
    const mastMat = new THREE.MeshStandardMaterial({ color: 0x94A3B8, metalness: 0.7, roughness: 0.3 });
    const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.16, 4.4, 8), mastMat);
    mast.position.set(1.4, 2.2, -0.6);
    mast.castShadow = true;
    group.add(mast);

    // Dish
    const dish = new THREE.Mesh(new THREE.SphereGeometry(0.35, 10, 6, 0, Math.PI * 2, 0, Math.PI / 3), mastMat);
    dish.position.set(1.4, 3.2, -0.6);
    dish.rotation.x = Math.PI / 3;
    group.add(dish);

    // Blinking Beacon
    beaconMesh = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 8), new THREE.MeshBasicMaterial({ color: 0xEF4444 }));
    beaconMesh.position.set(1.4, 4.45, -0.6);
    group.add(beaconMesh);

    beaconLight = new THREE.PointLight(0xEF4444, 1.0, 4);
    beaconLight.position.set(1.4, 4.5, -0.6);
    group.add(beaconLight);

    scene.add(group);
    registerLandmark(group, data, 4.6);
  }

  // --- Register Landmark with Floating Marker ---
  function registerLandmark(group, data, heightOffset = 3.5) {
    // Elegant floating marker capsule
    const marker = new THREE.Group();
    marker.position.set(0, heightOffset, 0);

    const pinMat = new THREE.MeshStandardMaterial({
      color: 0x0F172A, // Sleek dark slate capsule
      roughness: 0.3,
      metalness: 0.2
    });
    const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.32, 14, 14), pinMat);
    sphere.castShadow = true;
    marker.add(sphere);

    const cone = new THREE.Mesh(new THREE.ConeGeometry(0.2, 0.38, 8), pinMat);
    cone.position.y = -0.28;
    cone.rotation.x = Math.PI;
    marker.add(cone);

    group.add(marker);

    group.userData = {
      isLandmark: true,
      data: data,
      marker: marker,
      baseY: heightOffset,
      seed: Math.random() * 10
    };

    landmarks.push(group);

    // Enable raycasting
    group.traverse(child => {
      if (child.isMesh) {
        child.userData = { parentLandmark: group };
        clickableObjects.push(child);
      }
    });
  }

  // --- Interaction & Controls ---
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  function setupInteraction() {
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('click', onClick);
    canvas.addEventListener('touchstart', onTouchStart, { passive: true });

    // Switch to Classic Resume View
    const classicBtn = document.getElementById('switchToClassicBtn');
    if (classicBtn) classicBtn.addEventListener('click', () => switchViewMode('classic'));

    // Switch to 3D Island
    const islandBtn = document.getElementById('switchToIslandBtn');
    if (islandBtn) islandBtn.addEventListener('click', () => switchViewMode('island'));

    const navIslandBtn = document.getElementById('navIslandBtn');
    if (navIslandBtn) navIslandBtn.addEventListener('click', () => switchViewMode('island'));

    const mmIslandBtn = document.getElementById('mmIslandBtn');
    if (mmIslandBtn) {
      mmIslandBtn.addEventListener('click', () => {
        const burger = document.getElementById('burger');
        if (burger && burger.getAttribute('aria-expanded') === 'true') burger.click();
        switchViewMode('island');
      });
    }

    // Acrokat-style Minimal Bottom Pill Controls: [ ⏸ / ▶ ] and [ ↺ ]
    const pauseBtn = document.getElementById('pauseIslandBtn');
    if (pauseBtn) {
      pauseBtn.addEventListener('click', () => {
        isOrbiting = !isOrbiting;
        if (controls) controls.autoRotate = isOrbiting;
        pauseBtn.textContent = isOrbiting ? 'Ⅱ' : '▶';
        pauseBtn.setAttribute('aria-label', isOrbiting ? 'Pause motion' : 'Play motion');
      });
    }

    const resetBtn = document.getElementById('resetIslandBtn');
    if (resetBtn) resetBtn.addEventListener('click', resetCamera);

    // Modal Close
    const closeBtn = document.getElementById('landmarkCloseBtn');
    const modalBackdrop = document.getElementById('landmarkModalClose');
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

    // Esc closes modal or switches view
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const modal = document.getElementById('landmarkModal');
        if (modal && modal.classList.contains('active')) {
          closeModal();
        } else {
          switchViewMode('classic');
        }
      }
    });
  }

  function onMouseMove(event) {
    const rect = canvas.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(clickableObjects, false);

    if (intersects.length > 0) {
      const hit = intersects[0].object;
      const landmark = hit.userData.parentLandmark;
      if (landmark) {
        canvas.style.cursor = 'pointer';
        if (hoveredLandmark !== landmark) {
          if (hoveredLandmark && hoveredLandmark.userData.marker) hoveredLandmark.userData.marker.scale.set(1, 1, 1);
          hoveredLandmark = landmark;
          if (landmark.userData.marker) landmark.userData.marker.scale.set(1.35, 1.35, 1.35);
        }
        return;
      }
    }

    canvas.style.cursor = 'default';
    if (hoveredLandmark) {
      if (hoveredLandmark.userData.marker) hoveredLandmark.userData.marker.scale.set(1, 1, 1);
      hoveredLandmark = null;
    }
  }

  function onClick(event) {
    const rect = canvas.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(clickableObjects, false);

    if (intersects.length > 0) {
      const hit = intersects[0].object;
      const landmark = hit.userData.parentLandmark;
      if (landmark) selectLandmark(landmark);
    }
  }

  function onTouchStart(e) {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      mouse.x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((touch.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(clickableObjects, false);
      if (intersects.length > 0) {
        const hit = intersects[0].object;
        const landmark = hit.userData.parentLandmark;
        if (landmark) selectLandmark(landmark);
      }
    }
  }

  // --- Select Landmark & Open Details Drawer ---
  function selectLandmark(landmark) {
    const data = landmark.userData.data;
    if (!data) return;

    if (data.id === 'basketball') triggerBasketballShot();

    // Smooth camera framing
    focusCamera(data.focusPos, data.camPos);

    // Open Modal
    openModal(data);
  }

  function focusCamera(targetPos, offsetPos) {
    if (!controls) return;
    const startTarget = controls.target.clone();
    const endTarget = new THREE.Vector3(targetPos.x, targetPos.y, targetPos.z);
    const startPos = camera.position.clone();
    const endPos = new THREE.Vector3(targetPos.x + offsetPos.x, targetPos.y + offsetPos.y, targetPos.z + offsetPos.z);

    const duration = 650;
    const startTime = performance.now();

    function lerp(now) {
      const t = Math.min((now - startTime) / duration, 1);
      const ease = 0.5 - Math.cos(t * Math.PI) / 2;
      controls.target.lerpVectors(startTarget, endTarget, ease);
      camera.position.lerpVectors(startPos, endPos, ease);
      if (t < 1) requestAnimationFrame(lerp);
    }
    requestAnimationFrame(lerp);
  }

  function resetCamera() {
    if (!controls) return;
    focusCamera({ x: 0.5, y: 1.5, z: 0 }, { x: 21.5, y: 26.5, z: 30 });
  }

  // --- Modal Drawer Logic ---
  function openModal(data) {
    const modal = document.getElementById('landmarkModal');
    if (!modal) return;

    document.getElementById('modalIcon').textContent = data.icon;
    document.getElementById('modalTag').textContent = data.tag;
    document.getElementById('modalTitle').textContent = data.title;
    document.getElementById('modalSubtitle').textContent = data.subtitle;

    let body = `<p class="landmark-modal-desc">${data.desc}</p>`;

    if (data.image) {
      body += `<div class="landmark-modal-img"><img src="${data.image}" alt="${data.title}" /></div>`;
    }

    if (data.bullets && data.bullets.length) {
      body += `<ul class="landmark-modal-bullets">`;
      data.bullets.forEach(b => { body += `<li>${b}</li>`; });
      body += `</ul>`;
    }

    if (data.stats && data.stats.length) {
      body += `<div class="landmark-modal-stats">`;
      data.stats.forEach(s => {
        body += `<div class="stat-pill"><span class="v">${s.v}</span><span class="k">${s.k}</span></div>`;
      });
      body += `</div>`;
    }

    document.getElementById('modalContent').innerHTML = body;

    let footer = ``;
    if (data.jumpTarget) {
      footer += `<button type="button" class="landmark-jump-btn" data-jump="${data.jumpTarget}">
        <span>Open in Full Resume</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
      </button>`;
    }
    document.getElementById('modalFooter').innerHTML = footer;

    const jumpBtn = modal.querySelector('.landmark-jump-btn');
    if (jumpBtn) {
      jumpBtn.addEventListener('click', () => {
        const target = jumpBtn.getAttribute('data-jump');
        closeModal();
        switchViewMode('classic');
        setTimeout(() => {
          const el = document.querySelector(target);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 350);
      });
    }

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
  }

  function closeModal() {
    const modal = document.getElementById('landmarkModal');
    if (modal) {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
    }
  }

  // --- Dual Mode Switcher ---
  function switchViewMode(mode) {
    const islandView = document.getElementById('islandView');
    const floatingIslandBtn = document.getElementById('switchToIslandBtn');

    if (mode === 'classic') {
      if (islandView) {
        islandView.classList.add('hidden-view');
        islandView.setAttribute('aria-hidden', 'true');
      }
      if (floatingIslandBtn) floatingIslandBtn.style.display = 'flex';
      try { localStorage.setItem('portfolio-view-mode', 'classic'); } catch (_) {}
      document.body.style.overflow = 'auto';
    } else {
      if (islandView) {
        islandView.classList.remove('hidden-view');
        islandView.setAttribute('aria-hidden', 'false');
      }
      if (floatingIslandBtn) floatingIslandBtn.style.display = 'none';
      try { localStorage.setItem('portfolio-view-mode', 'island'); } catch (_) {}
      document.body.style.overflow = 'hidden';
      onWindowResize();
    }
  }

  function onWindowResize() {
    if (!container || !renderer || !camera) return;
    const w = container.clientWidth;
    const h = container.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  // --- Animation Loop ---
  function animate(time) {
    requestAnimationFrame(animate);

    const sec = time * 0.001;

    // Orbit
    if (controls) controls.update();

    // Floating Markers Bobbing
    landmarks.forEach(lm => {
      const marker = lm.userData.marker;
      if (marker) {
        marker.position.y = lm.userData.baseY + Math.sin(sec * 2.5 + lm.userData.seed) * 0.16;
        marker.rotation.y = sec * 0.8 + lm.userData.seed;
      }
    });

    // Ocean Waves
    if (oceanMesh) {
      const pos = oceanMesh.geometry.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const u = pos.getX(i);
        const v = pos.getY(i);
        const z = Math.sin(u * 0.3 + sec * 1.4) * 0.08 + Math.cos(v * 0.3 + sec * 1.1) * 0.08;
        pos.setZ(i, z);
      }
      oceanMesh.geometry.computeVertexNormals();
      oceanMesh.geometry.attributes.position.needsUpdate = true;
    }

    // Puppy Tail Wag
    if (puppyTailMesh) puppyTailMesh.rotation.z = Math.sin(sec * 10) * 0.35;

    // Cow Grazing
    if (cowHeadMesh) cowHeadMesh.rotation.x = Math.sin(sec * 1.8) * 0.12;

    // Beacon Pulse
    if (beaconLight && beaconMesh) {
      const p = (Math.sin(sec * 5) + 1) / 2;
      beaconLight.intensity = p > 0.6 ? 1.5 : 0.2;
      beaconMesh.material.color.setHex(p > 0.6 ? 0xEF4444 : 0x7F1D1D);
    }

    renderer.render(scene, camera);
  }

  // Launch when DOM is ready
  function start() {
    const savedMode = (function () {
      try {
        if (window.location.hash === '#classic') return 'classic';
        if (window.location.hash === '#island') return 'island';
        return localStorage.getItem('portfolio-view-mode') || 'island';
      } catch (_) {
        return 'island';
      }
    })();

    init();

    if (savedMode === 'classic') {
      switchViewMode('classic');
    } else {
      switchViewMode('island');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }

})();
