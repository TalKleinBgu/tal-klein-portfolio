/**
 * 🏝️ Tal Klein's 3D Tropical Career Island
 * Procedural Low-Poly Interactive World built with Three.js
 */

(function () {
  'use strict';

  // State
  let scene, camera, renderer, controls;
  let canvas, container;
  let landmarks = [];
  let clickableObjects = [];
  let hoveredObject = null;
  let isOrbiting = true;
  let currentTheme = 'day';
  let starsMesh, oceanMesh;
  let sunLight, hemiLight, ambientLight;
  let activeAnimationCallbacks = [];
  let isMobile = window.innerWidth < 768;

  // Landmark Definitions
  const LANDMARK_DATA = {
    basketball: {
      id: 'basketball',
      title: 'Streetball Half-Court',
      tag: 'Passions & Life',
      icon: '🏀',
      pos: { x: -9.5, y: 1.3, z: 6.5 },
      desc: 'Lifelong passion for basketball – avid follower of the NBA, Euroleague, and Maccabi Tel Aviv. The court is where I recharge my energy, focus, and drive for teamwork.',
      bullets: [
        'Team sports & competitive spirit translate directly into engineering collaboration',
        'Quick decision-making, fast pivots, and strategic pacing under pressure',
        'Active pickup player – always up for a game!'
      ],
      stats: [
        { v: '🏀', k: 'Maccabi / NBA' },
        { v: '⚡', k: 'Fast Breaks' },
        { v: '🎯', k: 'Focus & Drive' }
      ],
      actionText: 'Shoot a Hoop!',
      jumpTarget: '#about'
    },
    guideDog: {
      id: 'guideDog',
      title: 'Guide-Dog Puppy Haven',
      tag: 'Volunteering & Values',
      icon: '🦮',
      pos: { x: -8.5, y: 1.3, z: -7.5 },
      desc: 'Volunteer Puppy Raiser at the Israel Guide Dog Center for the Blind. Raising, socializing, and obedience-training a future guide dog to provide independence for visually impaired individuals.',
      bullets: [
        'Daily discipline, positive reinforcement, and public access socialization',
        'High empathy, responsibility, and commitment to service beyond tech',
        'Active dedication from Jan 2025 to May 2026'
      ],
      image: './assets/guide-dog.webp',
      stats: [
        { v: '16 mo', k: 'Commitment' },
        { v: '100%', k: 'Dedication' },
        { v: '🦮', k: 'Service Dog' }
      ],
      actionText: 'Pet the Puppy',
      jumpTarget: '#experience'
    },
    farm: {
      id: 'farm',
      title: 'The Heritage Barn',
      tag: 'Roots & Heritage',
      icon: '🐄',
      pos: { x: 8.5, y: 1.3, z: -7.5 },
      desc: 'Growing up with a family dairy farm (רפת) built a deep foundation of hard work, early mornings, and grounded perspective. It connects me to the tangible real-world processes behind the data.',
      bullets: [
        'Early appreciation for biology, operations, and practical problem-solving',
        'Strong work ethic: results come from consistency and careful stewardship',
        'Humility and connection to nature that keeps complex algorithms grounded'
      ],
      stats: [
        { v: '🐄', k: 'Dairy Roots' },
        { v: '🌾', k: 'Hard Work' },
        { v: '🚜', k: 'Family Farm' }
      ],
      actionText: 'Say Hello to Daisy',
      jumpTarget: '#about'
    },
    idf: {
      id: 'idf',
      title: 'IDF Communications Outpost',
      tag: 'Leadership & Service',
      icon: '📻',
      pos: { x: -3.5, y: 1.3, z: -11.5 },
      desc: 'Communications & Operations NCO in the Israel Defense Forces (2017 – 2020). Led and trained a small team responsible for real-time tactical communications infrastructure in high-tempo operational environments.',
      bullets: [
        'Managed critical network reliability and operational coordination',
        'Leadership, mentorship, and mission-first accountability under stress',
        'Troubleshooting and rapid triage of high-priority hardware and protocols'
      ],
      stats: [
        { v: '3 Yrs', k: 'Service' },
        { v: '24/7', k: 'Uptime' },
        { v: '🎖️', k: 'NCO Lead' }
      ],
      actionText: 'Ping Outpost Signal',
      jumpTarget: '#experience'
    },
    bgu: {
      id: 'bgu',
      title: 'Ben-Gurion University Campus',
      tag: 'Academic Excellence',
      icon: '🎓',
      pos: { x: 0, y: 1.5, z: -1 },
      desc: 'Alma mater for both B.Sc. in Data Engineering and M.Sc. in Software & Information Systems Engineering (Specializing in Data Science & NLP). Selected for the prestigious Meitar Excellence Program.',
      bullets: [
        'M.Sc. GPA: 92 (Specialization in Data Science, NLP & Deep Learning)',
        'B.Sc. in Data Engineering with comprehensive systems & algorithms mastery',
        'Meitar Excellence Program fellow (top-tier graduate research track)'
      ],
      stats: [
        { v: '92', k: 'M.Sc. GPA' },
        { v: 'BGU', k: 'Meitar Fellow' },
        { v: 'B.Sc+M.Sc', k: 'Data Eng.' }
      ],
      actionText: 'Inspect Academic Path',
      jumpTarget: '#education'
    },
    legalAi: {
      id: 'legalAi',
      title: 'Legal AI & Bias Research Desk',
      tag: 'Published Research',
      icon: '⚖️',
      pos: { x: 8.5, y: 1.3, z: 2.5 },
      desc: 'Master’s research: "Examining Bias in Sentencing Decisions with LLM-Powered Control over the Facts." Under review at Springer’s Artificial Intelligence and Law journal (2026).',
      bullets: [
        'Built an end-to-end NLP pipeline parsing 6,000+ unstructured Hebrew court verdicts',
        'Leveraged GPT-5-mini batch inference extracting 30+ structured legal factors with 0.92 F1',
        'Causal inference and counterfactual fact-control analyzing judicial disparities'
      ],
      stats: [
        { v: '6,000+', k: 'Verdicts' },
        { v: '0.92', k: 'F1 Score' },
        { v: 'Springer', k: 'AI & Law' }
      ],
      actionText: 'Explore Research Paper',
      jumpTarget: '#education'
    },
    codeLab: {
      id: 'codeLab',
      title: 'The Builder’s Tech Hub',
      tag: 'Engineering & Code',
      icon: '💻',
      pos: { x: 4.8, y: 1.3, z: 9.2 },
      desc: 'Production-grade machine learning pipelines, search algorithms, and full-stack multimodal AI. From Wikipedia-scale search to speech emotion classification and Hebrew dialogue tagging.',
      bullets: [
        'Wikipedia-Scale IR Engine over 6.4M pages (BM25, TF-IDF, PageRank on GCP, 8× speedup)',
        'Hebrew Dialogue Silence Tagging with AssemblyAI & Gemini (Cohen’s Kappa 0.69)',
        'Speech Emotion Recognition (Wav2Vec2, HuBERT, 81.3% accuracy across 7 emotions)'
      ],
      stats: [
        { v: '6.4M', k: 'Documents' },
        { v: '8×', k: 'Speedup' },
        { v: '7+', k: 'Production Projs' }
      ],
      actionText: 'View GitHub Projects',
      jumpTarget: '#projects'
    },
    beach: {
      id: 'beach',
      title: 'Wanderer’s Coast',
      tag: 'Nature & Travel',
      icon: '🏖️',
      pos: { x: -12.5, y: 0.9, z: -0.5 },
      desc: 'Love for the outdoors, Mediterranean and tropical beaches, trekking, and nature trips. Stepping away from screens to explore landscapes clears the mind and sparks fresh architectural thinking.',
      bullets: [
        'Hiking trails and coastal exploration across Israel and abroad',
        'Sun, sea, and open skies as the ultimate mental reset',
        'Belief in balanced living: deep technical focus paired with vibrant outdoors'
      ],
      stats: [
        { v: '🌊', k: 'Coastlines' },
        { v: '🥾', k: 'Hiking' },
        { v: '☀️', k: 'Nature' }
      ],
      actionText: 'Enjoy the Breeze',
      jumpTarget: '#about'
    }
  };

  // Color Palettes for Time of Day
  const THEMES = {
    day: {
      sky: 0xBAE6FD,
      fog: 0xBAE6FD,
      ocean: 0x0284C7,
      oceanOpacity: 0.82,
      sunColor: 0xFFFDF0,
      sunIntensity: 1.35,
      sunPos: { x: 30, y: 45, z: 25 },
      hemiSky: 0xE0F2FE,
      hemiGround: 0x047857,
      hemiIntensity: 0.7,
      starsVisible: false
    },
    sunset: {
      sky: 0x7C3AED,
      fog: 0xC084FC,
      ocean: 0xD97706,
      oceanOpacity: 0.75,
      sunColor: 0xF97316,
      sunIntensity: 1.6,
      sunPos: { x: -45, y: 18, z: 25 },
      hemiSky: 0xFDBA74,
      hemiGround: 0x4C1D95,
      hemiIntensity: 0.6,
      starsVisible: true
    },
    night: {
      sky: 0x060913,
      fog: 0x0A0F1D,
      ocean: 0x0C192E,
      oceanOpacity: 0.9,
      sunColor: 0x60A5FA,
      sunIntensity: 0.45,
      sunPos: { x: 20, y: 40, z: -25 },
      hemiSky: 0x1E293B,
      hemiGround: 0x020617,
      hemiIntensity: 0.35,
      starsVisible: true
    }
  };

  // Initialize Three.js Island
  function initIsland() {
    container = document.getElementById('islandCanvasContainer');
    canvas = document.getElementById('islandCanvas');
    if (!container || !canvas || typeof THREE === 'undefined') return;

    // 1. Scene & Fog
    scene = new THREE.Scene();
    scene.background = new THREE.Color(THEMES[currentTheme].sky);
    scene.fog = new THREE.FogExp2(THEMES[currentTheme].fog, 0.009);

    // 2. Camera
    const aspect = container.clientWidth / container.clientHeight;
    camera = new THREE.PerspectiveCamera(40, aspect, 0.5, 500);
    camera.position.set(0, 26, 42);

    // 3. Renderer
    renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    // 4. Orbit Controls
    if (typeof THREE.OrbitControls !== 'undefined') {
      controls = new THREE.OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.target.set(0, 1.8, 0);
      controls.minDistance = 14;
      controls.maxDistance = 75;
      controls.maxPolarAngle = Math.PI / 2.12; // Prevent camera from going underwater
      controls.autoRotate = false;
      controls.autoRotateSpeed = 0.5;
    }

    // 5. Lighting
    buildLighting();

    // 6. World Meshes
    buildStars();
    buildOcean();
    buildIslandTerrain();
    buildFlora();
    buildAllLandmarks();

    // 7. Raycasting & Interaction
    setupInteraction();

    // 8. Event Listeners
    window.addEventListener('resize', onWindowResize);

    // 9. Animation Loop
    animate(0);
  }

  // --- Lighting Setup ---
  function buildLighting() {
    const theme = THEMES[currentTheme];

    hemiLight = new THREE.HemisphereLight(theme.hemiSky, theme.hemiGround, theme.hemiIntensity);
    hemiLight.position.set(0, 50, 0);
    scene.add(hemiLight);

    sunLight = new THREE.DirectionalLight(theme.sunColor, theme.sunIntensity);
    sunLight.position.set(theme.sunPos.x, theme.sunPos.y, theme.sunPos.z);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 10;
    sunLight.shadow.camera.far = 120;
    const d = 26;
    sunLight.shadow.camera.left = -d;
    sunLight.shadow.camera.right = d;
    sunLight.shadow.camera.top = d;
    sunLight.shadow.camera.bottom = -d;
    sunLight.shadow.bias = -0.0005;
    scene.add(sunLight);

    ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.25);
    scene.add(ambientLight);
  }

  // --- Stars for Sunset & Night ---
  function buildStars() {
    const starCount = 350;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const radius = 100 + Math.random() * 80;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI * 0.45;
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.cos(phi) + 10;
      positions[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({
      color: 0xFFFFFF,
      size: 1.4,
      transparent: true,
      opacity: THEMES[currentTheme].starsVisible ? 0.85 : 0
    });
    starsMesh = new THREE.Points(geometry, material);
    scene.add(starsMesh);
  }

  // --- Ocean Water Surface ---
  function buildOcean() {
    const geometry = new THREE.PlaneGeometry(160, 160, 48, 48);
    const material = new THREE.MeshStandardMaterial({
      color: THEMES[currentTheme].ocean,
      roughness: 0.1,
      metalness: 0.15,
      transparent: true,
      opacity: THEMES[currentTheme].oceanOpacity,
      flatShading: true
    });
    oceanMesh = new THREE.Mesh(geometry, material);
    oceanMesh.rotation.x = -Math.PI / 2;
    oceanMesh.position.y = -0.15;
    oceanMesh.receiveShadow = true;
    scene.add(oceanMesh);
  }

  // --- Sculpted Island Terrain ---
  function buildIslandTerrain() {
    const islandGroup = new THREE.Group();

    // 1. Sandy Beach Ring
    const sandGeo = new THREE.CylinderGeometry(17.5, 21.5, 1.6, 42);
    // Perturb vertices for organic coastline
    const pos = sandGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = pos.getZ(i);
      const angle = Math.atan2(z, x);
      const dist = Math.sqrt(x * x + z * z);
      const noise = Math.sin(angle * 5) * 0.9 + Math.cos(angle * 8) * 0.5;
      if (dist > 8) {
        pos.setX(i, x + Math.cos(angle) * noise);
        pos.setZ(i, z + Math.sin(angle) * noise);
      }
      if (y < 0) pos.setY(i, y - 0.4);
    }
    sandGeo.computeVertexNormals();

    const sandMat = new THREE.MeshStandardMaterial({
      color: 0xE8D5A3,
      roughness: 0.9,
      metalness: 0.05,
      flatShading: true
    });
    const sandMesh = new THREE.Mesh(sandGeo, sandMat);
    sandMesh.position.y = 0.4;
    sandMesh.receiveShadow = true;
    islandGroup.add(sandMesh);

    // 2. Lush Green Plateau
    const grassGeo = new THREE.CylinderGeometry(15, 17.5, 1.8, 36);
    const gPos = grassGeo.attributes.position;
    for (let i = 0; i < gPos.count; i++) {
      const x = gPos.getX(i);
      const y = gPos.getY(i);
      const z = gPos.getZ(i);
      const angle = Math.atan2(z, x);
      const dist = Math.sqrt(x * x + z * z);
      const noise = Math.sin(angle * 4) * 0.7 + Math.cos(angle * 7) * 0.4;
      if (dist > 6) {
        gPos.setX(i, x + Math.cos(angle) * noise);
        gPos.setZ(i, z + Math.sin(angle) * noise);
      }
      if (y > 0) {
        // Subtle central rolling hill
        const hill = Math.max(0, 1 - (dist / 14)) * 0.9;
        gPos.setY(i, y + hill);
      }
    }
    grassGeo.computeVertexNormals();

    const grassMat = new THREE.MeshStandardMaterial({
      color: 0x34D399,
      roughness: 0.8,
      metalness: 0.05,
      flatShading: true
    });
    const grassMesh = new THREE.Mesh(grassGeo, grassMat);
    grassMesh.position.y = 1.0;
    grassMesh.receiveShadow = true;
    grassMesh.castShadow = true;
    islandGroup.add(grassMesh);

    // 3. Sandy Shoreline Inner Paths
    buildPaths(islandGroup);

    scene.add(islandGroup);
  }

  function buildPaths(group) {
    const pathMat = new THREE.MeshStandardMaterial({
      color: 0xD4B982,
      roughness: 0.95,
      flatShading: true
    });

    const pathCoords = [
      { x: 0, z: 4, r: 2.8 },
      { x: -4, z: 5, r: 1.8 },
      { x: 4, z: -3, r: 2.2 },
      { x: -4, z: -5, r: 2.0 }
    ];

    pathCoords.forEach(p => {
      const stoneGeo = new THREE.CylinderGeometry(p.r, p.r * 1.1, 0.1, 8);
      const stone = new THREE.Mesh(stoneGeo, pathMat);
      stone.position.set(p.x, 1.95, p.z);
      stone.receiveShadow = true;
      group.add(stone);
    });
  }

  // --- Flora: Palm Trees & Coastal Rocks ---
  function buildFlora() {
    const treePositions = [
      { x: -13.5, z: 4, s: 1.1, r: 0.3 },
      { x: -14, z: -4, s: 1.2, r: -0.4 },
      { x: -5, z: 12.5, s: 1.0, r: 0.2 },
      { x: 12, z: 10, s: 1.15, r: -0.5 },
      { x: 13.5, z: -2, s: 1.05, r: 0.4 },
      { x: 11, z: -12, s: 0.95, r: -0.2 },
      { x: -10, z: -12, s: 1.1, r: 0.6 },
      { x: 1, z: 13, s: 1.2, r: -0.1 }
    ];

    treePositions.forEach(p => {
      const tree = createPalmTree(p.s, p.r);
      tree.position.set(p.x, 1.5, p.z);
      scene.add(tree);
    });

    // Coastal decorative boulders
    const rockMat = new THREE.MeshStandardMaterial({ color: 0x94A3B8, roughness: 0.9, flatShading: true });
    const rockPositions = [
      { x: -15, z: 1, s: 0.8 },
      { x: -13, z: 9, s: 1.2 },
      { x: 14, z: 5, s: 0.9 },
      { x: 7, z: -14, s: 1.1 },
      { x: -7, z: -15, s: 0.7 }
    ];
    rockPositions.forEach(r => {
      const geo = new THREE.DodecahedronGeometry(r.s, 0);
      const rock = new THREE.Mesh(geo, rockMat);
      rock.position.set(r.x, 0.4, r.z);
      rock.rotation.set(Math.random(), Math.random(), Math.random());
      rock.castShadow = true;
      rock.receiveShadow = true;
      scene.add(rock);
    });
  }

  function createPalmTree(scale = 1, lean = 0.2) {
    const tree = new THREE.Group();
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x78350F, roughness: 0.9, flatShading: true });
    const leafMat = new THREE.MeshStandardMaterial({ color: 0x16A34A, roughness: 0.7, flatShading: true, side: THREE.DoubleSide });

    // Curved Trunk
    let currentY = 0;
    let currentOffset = 0;
    const segments = 6;
    for (let i = 0; i < segments; i++) {
      const segH = 0.7 * scale;
      const topR = (0.28 - (i * 0.03)) * scale;
      const botR = (0.34 - (i * 0.03)) * scale;
      const geo = new THREE.CylinderGeometry(topR, botR, segH, 6);
      const mesh = new THREE.Mesh(geo, trunkMat);
      mesh.position.y = currentY + segH / 2;
      mesh.position.x = currentOffset;
      mesh.rotation.z = lean * (i / segments);
      mesh.castShadow = true;
      tree.add(mesh);

      currentY += segH;
      currentOffset += Math.sin(lean) * segH * 0.5;
    }

    // Crown of Fronds
    const frondCount = 7;
    for (let f = 0; f < frondCount; f++) {
      const angle = (f / frondCount) * Math.PI * 2;
      const frondGeo = new THREE.ConeGeometry(0.7 * scale, 2.4 * scale, 4);
      frondGeo.translate(0, 1.2 * scale, 0);
      const frond = new THREE.Mesh(frondGeo, leafMat);
      frond.position.set(currentOffset, currentY, 0);
      frond.rotation.y = angle;
      frond.rotation.z = Math.PI / 3;
      frond.castShadow = true;
      tree.add(frond);
    }

    // Coconuts
    const coconutMat = new THREE.MeshStandardMaterial({ color: 0x451A03, roughness: 0.8 });
    for (let c = 0; c < 3; c++) {
      const nut = new THREE.Mesh(new THREE.DodecahedronGeometry(0.22 * scale, 0), coconutMat);
      const cAngle = (c / 3) * Math.PI * 2;
      nut.position.set(currentOffset + Math.cos(cAngle) * 0.25, currentY - 0.1, Math.sin(cAngle) * 0.25);
      tree.add(nut);
    }

    return tree;
  }

  // --- Build All 8 Interactive Landmarks ---
  function buildAllLandmarks() {
    buildBasketballCourt();
    buildGuideDogHaven();
    buildHeritageBarn();
    buildIdfOutpost();
    buildBguCampus();
    buildLegalAiLab();
    buildCodeLab();
    buildWandererBeach();
  }

  // 🏀 1. Streetball Half-Court
  let basketballMesh, basketballBasePos, isShooting = false;
  function buildBasketballCourt() {
    const data = LANDMARK_DATA.basketball;
    const group = new THREE.Group();
    group.position.set(data.pos.x, data.pos.y, data.pos.z);

    // Court Surface (Maccabi / NBA electric blue + golden key)
    const courtGeo = new THREE.BoxGeometry(6.2, 0.15, 5.2);
    const courtMat = new THREE.MeshStandardMaterial({ color: 0x1E3A8A, roughness: 0.6, flatShading: true });
    const court = new THREE.Mesh(courtGeo, courtMat);
    court.position.y = 0.08;
    court.receiveShadow = true;
    group.add(court);

    // Key area (Gold)
    const keyGeo = new THREE.BoxGeometry(2.4, 0.17, 2.8);
    const keyMat = new THREE.MeshStandardMaterial({ color: 0xF59E0B, roughness: 0.6, flatShading: true });
    const keyMesh = new THREE.Mesh(keyGeo, keyMat);
    keyMesh.position.set(0, 0.09, -1.1);
    group.add(keyMesh);

    // Pole & Backboard
    const poleGeo = new THREE.CylinderGeometry(0.08, 0.08, 3.2, 8);
    const poleMat = new THREE.MeshStandardMaterial({ color: 0x1E293B, metalness: 0.7, roughness: 0.3 });
    const pole = new THREE.Mesh(poleGeo, poleMat);
    pole.position.set(0, 1.6, -2.4);
    pole.castShadow = true;
    group.add(pole);

    const bbGeo = new THREE.BoxGeometry(1.6, 1.1, 0.06);
    const bbMat = new THREE.MeshStandardMaterial({ color: 0xF8FAFC, roughness: 0.4 });
    const backboard = new THREE.Mesh(bbGeo, bbMat);
    backboard.position.set(0, 2.7, -2.25);
    backboard.castShadow = true;
    group.add(backboard);

    // Rim & Net
    const rimGeo = new THREE.TorusGeometry(0.3, 0.03, 8, 16);
    const rimMat = new THREE.MeshStandardMaterial({ color: 0xEF4444, metalness: 0.5 });
    const rim = new THREE.Mesh(rimGeo, rimMat);
    rim.rotation.x = Math.PI / 2;
    rim.position.set(0, 2.4, -1.9);
    group.add(rim);

    const netGeo = new THREE.ConeGeometry(0.28, 0.5, 8, 1, true);
    const netMat = new THREE.MeshStandardMaterial({ color: 0xFFFFFF, wireframe: true });
    const net = new THREE.Mesh(netGeo, netMat);
    net.position.set(0, 2.15, -1.9);
    group.add(net);

    // Basketball (Interactive)
    const ballGeo = new THREE.SphereGeometry(0.24, 16, 16);
    const ballMat = new THREE.MeshStandardMaterial({ color: 0xEA580C, roughness: 0.6 });
    basketballMesh = new THREE.Mesh(ballGeo, ballMat);
    basketballBasePos = new THREE.Vector3(1.2, 0.32, 1.0);
    basketballMesh.position.copy(basketballBasePos);
    basketballMesh.castShadow = true;
    group.add(basketballMesh);

    registerLandmark(group, data);
  }

  // 🏀 Basketball Shot Easter Egg
  function triggerBasketballShot() {
    if (isShooting || !basketballMesh) return;
    isShooting = true;

    const start = basketballBasePos.clone();
    const hoop = new THREE.Vector3(0, 2.45, -1.9);
    const apex = new THREE.Vector3(0.6, 4.2, -0.4);
    const duration = 1200; // ms
    const startTime = performance.now();

    function updateShot(now) {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);

      if (t < 0.65) {
        // Curve to hoop
        const subT = t / 0.65;
        // Quadratic bezier start -> apex -> hoop
        const p0 = start;
        const p1 = apex;
        const p2 = hoop;
        const x = (1 - subT) * (1 - subT) * p0.x + 2 * (1 - subT) * subT * p1.x + subT * subT * p2.x;
        const y = (1 - subT) * (1 - subT) * p0.y + 2 * (1 - subT) * subT * p1.y + subT * subT * p2.y;
        const z = (1 - subT) * (1 - subT) * p0.z + 2 * (1 - subT) * subT * p1.z + subT * subT * p2.z;
        basketballMesh.position.set(x, y, z);
      } else {
        // Drop & Bounce
        const bounceT = (t - 0.65) / 0.35;
        const dropY = Math.max(0.32, hoop.y - (bounceT * 2.8) + (Math.sin(bounceT * Math.PI) * 0.4));
        basketballMesh.position.set(hoop.x, dropY, hoop.z);
      }

      basketballMesh.rotation.x += 0.2;

      if (t < 1) {
        requestAnimationFrame(updateShot);
      } else {
        setTimeout(() => {
          basketballMesh.position.copy(basketballBasePos);
          isShooting = false;
        }, 800);
      }
    }

    requestAnimationFrame(updateShot);
  }

  // 🦮 2. Guide Dog Haven
  let puppyTailMesh, puppyHeadMesh;
  function buildGuideDogHaven() {
    const data = LANDMARK_DATA.guideDog;
    const group = new THREE.Group();
    group.position.set(data.pos.x, data.pos.y, data.pos.z);

    // Wooden Doghouse
    const houseMat = new THREE.MeshStandardMaterial({ color: 0x92400E, roughness: 0.8, flatShading: true });
    const roofMat = new THREE.MeshStandardMaterial({ color: 0x451A03, roughness: 0.8, flatShading: true });
    const bodyGeo = new THREE.BoxGeometry(1.8, 1.4, 1.6);
    const house = new THREE.Mesh(bodyGeo, houseMat);
    house.position.set(0, 0.7, -0.6);
    house.castShadow = true;
    group.add(house);

    // Pitched Roof
    const roofGeo = new THREE.ConeGeometry(1.6, 0.8, 4);
    roofGeo.rotateY(Math.PI / 4);
    const roof = new THREE.Mesh(roofGeo, roofMat);
    roof.position.set(0, 1.75, -0.6);
    roof.castShadow = true;
    group.add(roof);

    // Entrance Arch (Dark)
    const doorMat = new THREE.MeshBasicMaterial({ color: 0x1E1B18 });
    const door = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.9, 0.1), doorMat);
    door.position.set(0, 0.45, 0.21);
    group.add(door);

    // Cute Low-Poly Puppy with Blue Service Vest
    const pupGroup = new THREE.Group();
    pupGroup.position.set(0.7, 0.2, 0.6);
    pupGroup.rotation.y = -Math.PI / 4;

    const pupGold = new THREE.MeshStandardMaterial({ color: 0xD97706, roughness: 0.8, flatShading: true });
    const vestBlue = new THREE.MeshStandardMaterial({ color: 0x2563EB, roughness: 0.6, flatShading: true });

    // Pup Body (Vest in middle)
    const pBody = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.5, 0.85), vestBlue);
    pBody.position.y = 0.35;
    pBody.castShadow = true;
    pupGroup.add(pBody);

    // Legs
    for (let lx of [-0.2, 0.2]) {
      for (let lz of [-0.3, 0.3]) {
        const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.35, 6), pupGold);
        leg.position.set(lx, 0.17, lz);
        leg.castShadow = true;
        pupGroup.add(leg);
      }
    }

    // Head
    puppyHeadMesh = new THREE.Group();
    puppyHeadMesh.position.set(0, 0.65, 0.45);

    const headGeo = new THREE.BoxGeometry(0.42, 0.38, 0.42);
    const head = new THREE.Mesh(headGeo, pupGold);
    head.castShadow = true;
    puppyHeadMesh.add(head);

    // Floppy Ears
    const earGeo = new THREE.BoxGeometry(0.1, 0.3, 0.16);
    for (let ex of [-0.23, 0.23]) {
      const ear = new THREE.Mesh(earGeo, pupGold);
      ear.position.set(ex, -0.05, 0);
      puppyHeadMesh.add(ear);
    }
    // Snout & Nose
    const snout = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.18, 0.22), pupGold);
    snout.position.set(0, -0.08, 0.28);
    puppyHeadMesh.add(snout);
    const nose = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 0.08), new THREE.MeshBasicMaterial({ color: 0x000000 }));
    nose.position.set(0, -0.04, 0.39);
    puppyHeadMesh.add(nose);

    pupGroup.add(puppyHeadMesh);

    // Tail (Animated)
    puppyTailMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.03, 0.4, 6), pupGold);
    puppyTailMesh.position.set(0, 0.55, -0.45);
    puppyTailMesh.rotation.x = -Math.PI / 4;
    pupGroup.add(puppyTailMesh);

    // Food Bowl
    const bowl = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.15, 0.12, 12), new THREE.MeshStandardMaterial({ color: 0xEF4444 }));
    bowl.position.set(-0.6, 0.06, 0.8);
    group.add(bowl);

    group.add(pupGroup);
    registerLandmark(group, data);
  }

  // 🐄 3. The Heritage Barn (Family Dairy Farm)
  let cowHeadMesh;
  function buildHeritageBarn() {
    const data = LANDMARK_DATA.farm;
    const group = new THREE.Group();
    group.position.set(data.pos.x, data.pos.y, data.pos.z);

    // Red Barn with White Cross-Beams
    const barnRed = new THREE.MeshStandardMaterial({ color: 0xDC2626, roughness: 0.7, flatShading: true });
    const barnWhite = new THREE.MeshStandardMaterial({ color: 0xF8FAFC, roughness: 0.6, flatShading: true });
    const barnRoof = new THREE.MeshStandardMaterial({ color: 0x1E293B, roughness: 0.8, flatShading: true });

    const barnBody = new THREE.Mesh(new THREE.BoxGeometry(2.8, 1.8, 2.2), barnRed);
    barnBody.position.set(0, 0.9, -0.5);
    barnBody.castShadow = true;
    group.add(barnBody);

    // Roof
    const roof = new THREE.Mesh(new THREE.ConeGeometry(2.3, 1.1, 4), barnRoof);
    roof.rotation.y = Math.PI / 4;
    roof.position.set(0, 2.3, -0.5);
    roof.castShadow = true;
    group.add(roof);

    // Silo (Metal Tower)
    const siloMat = new THREE.MeshStandardMaterial({ color: 0x94A3B8, metalness: 0.6, roughness: 0.4, flatShading: true });
    const siloBody = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.7, 2.8, 14), siloMat);
    siloBody.position.set(-1.9, 1.4, -0.5);
    siloBody.castShadow = true;
    group.add(siloBody);
    const siloDome = new THREE.Mesh(new THREE.SphereGeometry(0.7, 14, 8, 0, Math.PI * 2, 0, Math.PI / 2), siloMat);
    siloDome.position.set(-1.9, 2.8, -0.5);
    group.add(siloDome);

    // Cute Low-Poly Spotted Cow
    const cowGroup = new THREE.Group();
    cowGroup.position.set(0.6, 0.2, 1.0);
    cowGroup.rotation.y = -Math.PI / 6;

    const cowWhite = new THREE.MeshStandardMaterial({ color: 0xF8FAFC, roughness: 0.8, flatShading: true });
    const cowBlack = new THREE.MeshStandardMaterial({ color: 0x0F172A, roughness: 0.8, flatShading: true });
    const cowPink = new THREE.MeshStandardMaterial({ color: 0xF472B6, roughness: 0.7 });

    const cBody = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.6, 1.1), cowWhite);
    cBody.position.y = 0.5;
    cBody.castShadow = true;
    cowGroup.add(cBody);

    // Random black spots on cow
    const spot = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.35, 0.4), cowBlack);
    spot.position.set(0.22, 0.55, 0.1);
    cowGroup.add(spot);

    // Legs
    for (let lx of [-0.25, 0.25]) {
      for (let lz of [-0.4, 0.4]) {
        const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.45, 6), cowWhite);
        leg.position.set(lx, 0.22, lz);
        cowGroup.add(leg);
      }
    }

    // Head
    cowHeadMesh = new THREE.Group();
    cowHeadMesh.position.set(0, 0.8, 0.65);
    const cHead = new THREE.Mesh(new THREE.BoxGeometry(0.44, 0.42, 0.45), cowWhite);
    cowHeadMesh.add(cHead);
    const snout = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.22, 0.24), cowPink);
    snout.position.set(0, -0.1, 0.28);
    cowHeadMesh.add(snout);
    // Horns
    for (let hx of [-0.18, 0.18]) {
      const horn = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.22, 6), cowBlack);
      horn.position.set(hx, 0.3, 0);
      horn.rotation.z = hx > 0 ? -0.3 : 0.3;
      cowHeadMesh.add(horn);
    }
    cowGroup.add(cowHeadMesh);

    group.add(cowGroup);
    registerLandmark(group, data);
  }

  // 📻 4. IDF Communications Outpost
  let beaconLight, beaconMesh;
  function buildIdfOutpost() {
    const data = LANDMARK_DATA.idf;
    const group = new THREE.Group();
    group.position.set(data.pos.x, data.pos.y, data.pos.z);

    // Tactical Bunker / Comms Tent
    const tentMat = new THREE.MeshStandardMaterial({ color: 0x4D5E39, roughness: 0.9, flatShading: true }); // Army Olive
    const tent = new THREE.Mesh(new THREE.ConeGeometry(1.6, 1.4, 4), tentMat);
    tent.rotation.y = Math.PI / 4;
    tent.position.set(0, 0.7, 0);
    tent.castShadow = true;
    group.add(tent);

    // High Radio Mast (Antenna)
    const mastMat = new THREE.MeshStandardMaterial({ color: 0xCBD5E1, metalness: 0.8, roughness: 0.2 });
    const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.18, 4.6, 8), mastMat);
    mast.position.set(1.4, 2.3, -0.8);
    mast.castShadow = true;
    group.add(mast);

    // Radar dish on mast
    const dishMat = new THREE.MeshStandardMaterial({ color: 0x64748B, metalness: 0.5, side: THREE.DoubleSide });
    const dish = new THREE.Mesh(new THREE.SphereGeometry(0.4, 12, 6, 0, Math.PI * 2, 0, Math.PI / 3), dishMat);
    dish.position.set(1.4, 3.2, -0.8);
    dish.rotation.x = Math.PI / 3;
    group.add(dish);

    // Blinking Aviation Beacon on top
    const beaconMat = new THREE.MeshBasicMaterial({ color: 0xEF4444 });
    beaconMesh = new THREE.Mesh(new THREE.SphereGeometry(0.14, 8, 8), beaconMat);
    beaconMesh.position.set(1.4, 4.65, -0.8);
    group.add(beaconMesh);

    beaconLight = new THREE.PointLight(0xEF4444, 1.2, 5);
    beaconLight.position.set(1.4, 4.7, -0.8);
    group.add(beaconLight);

    registerLandmark(group, data);
  }

  // 🎓 5. Ben-Gurion University Campus
  function buildBguCampus() {
    const data = LANDMARK_DATA.bgu;
    const group = new THREE.Group();
    group.position.set(data.pos.x, data.pos.y, data.pos.z);

    // Modern Desert-Stone Academic Hall
    const stoneMat = new THREE.MeshStandardMaterial({ color: 0xF1F5F9, roughness: 0.6, flatShading: true });
    const glassMat = new THREE.MeshStandardMaterial({ color: 0x38BDF8, roughness: 0.1, metalness: 0.7 });

    const hall = new THREE.Mesh(new THREE.BoxGeometry(3.6, 2.0, 2.6), stoneMat);
    hall.position.set(0, 1.0, 0);
    hall.castShadow = true;
    group.add(hall);

    // Glass Windows Strip
    const glass = new THREE.Mesh(new THREE.BoxGeometry(3.65, 0.6, 1.4), glassMat);
    glass.position.set(0, 1.2, 0);
    group.add(glass);

    // Classical Columns in front
    for (let cx of [-1.4, -0.7, 0.7, 1.4]) {
      const col = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.14, 2.0, 8), stoneMat);
      col.position.set(cx, 1.0, 1.4);
      col.castShadow = true;
      group.add(col);
    }

    // Portico Roof
    const portico = new THREE.Mesh(new THREE.BoxGeometry(3.8, 0.3, 1.2), stoneMat);
    portico.position.set(0, 2.1, 1.2);
    group.add(portico);

    // Graduation Mortarboard on Roof
    const capMat = new THREE.MeshStandardMaterial({ color: 0x0F172A, roughness: 0.5 });
    const capTop = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.08, 1.2), capMat);
    capTop.position.set(0, 2.5, 0);
    capTop.rotation.y = Math.PI / 4;
    group.add(capTop);

    const skull = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 0.3, 12), capMat);
    skull.position.set(0, 2.3, 0);
    group.add(skull);

    // Gold Tassel
    const goldMat = new THREE.MeshStandardMaterial({ color: 0xF59E0B, metalness: 0.8 });
    const tassel = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 8), goldMat);
    tassel.position.set(0.4, 2.45, 0.4);
    group.add(tassel);

    registerLandmark(group, data);
  }

  // ⚖️ 6. Legal AI Research Desk
  let gavelMesh;
  function buildLegalAiLab() {
    const data = LANDMARK_DATA.legalAi;
    const group = new THREE.Group();
    group.position.set(data.pos.x, data.pos.y, data.pos.z);

    // Marble Research Pedestal
    const marbleMat = new THREE.MeshStandardMaterial({ color: 0xE2E8F0, roughness: 0.3, flatShading: true });
    const pedestal = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.6, 1.2, 16), marbleMat);
    pedestal.position.set(0, 0.6, 0);
    pedestal.castShadow = true;
    group.add(pedestal);

    // Stack of Law Books
    const bookColors = [0x1E3A8A, 0x991B1B, 0x065F46];
    bookColors.forEach((col, i) => {
      const book = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.16, 1.1), new THREE.MeshStandardMaterial({ color: col }));
      book.position.set(-0.35, 1.28 + (i * 0.17), 0.2);
      book.rotation.y = (i * 0.15);
      group.add(book);
    });

    // Sound Block (Gavel Base)
    const woodMat = new THREE.MeshStandardMaterial({ color: 0x78350F, roughness: 0.5 });
    const soundBlock = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.38, 0.12, 12), woodMat);
    soundBlock.position.set(0.4, 1.26, -0.2);
    group.add(soundBlock);

    // Judge's Gavel (Interactive)
    gavelMesh = new THREE.Group();
    gavelMesh.position.set(0.4, 1.45, -0.2);

    const gHandle = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.8, 8), woodMat);
    gHandle.rotation.x = Math.PI / 2;
    gavelMesh.add(gHandle);
    const gHead = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.36, 10), woodMat);
    gHead.position.set(0, 0, -0.4);
    gHead.rotation.z = Math.PI / 2;
    gavelMesh.add(gHead);

    group.add(gavelMesh);

    // Glowing AI Neural Core (Hologram)
    const coreGeo = new THREE.IcosahedronGeometry(0.3, 0);
    const coreMat = new THREE.MeshBasicMaterial({ color: 0x60A5FA, wireframe: true });
    const aiCore = new THREE.Mesh(coreGeo, coreMat);
    aiCore.position.set(0, 2.2, 0);
    group.add(aiCore);

    registerLandmark(group, data);
  }

  // ⚖️ Gavel Strike Animation
  function triggerGavelStrike() {
    if (!gavelMesh) return;
    const startY = gavelMesh.position.y;
    const startRotX = gavelMesh.rotation.x;

    let progress = 0;
    function anim() {
      progress += 0.08;
      if (progress < Math.PI) {
        gavelMesh.position.y = startY + Math.sin(progress) * 0.4;
        gavelMesh.rotation.x = startRotX - Math.sin(progress) * 0.6;
        requestAnimationFrame(anim);
      } else {
        gavelMesh.position.y = startY;
        gavelMesh.rotation.x = startRotX;
      }
    }
    requestAnimationFrame(anim);
  }

  // 💻 7. The Builder's Tech Hub
  let serverLedMesh;
  function buildCodeLab() {
    const data = LANDMARK_DATA.codeLab;
    const group = new THREE.Group();
    group.position.set(data.pos.x, data.pos.y, data.pos.z);

    // Cloud Server Rack
    const rackMat = new THREE.MeshStandardMaterial({ color: 0x0F172A, roughness: 0.3, metalness: 0.7 });
    const rack = new THREE.Mesh(new THREE.BoxGeometry(1.6, 2.6, 1.2), rackMat);
    rack.position.set(0, 1.3, -0.4);
    rack.castShadow = true;
    group.add(rack);

    // Blinking Server Slots
    const ledMat = new THREE.MeshBasicMaterial({ color: 0x22C55E });
    serverLedMesh = new THREE.Group();
    for (let r = 0; r < 6; r++) {
      const slot = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.15, 0.05), new THREE.MeshStandardMaterial({ color: 0x1E293B }));
      slot.position.set(0, 0.5 + (r * 0.35), 0.22);
      serverLedMesh.add(slot);

      for (let d = -0.45; d <= 0.45; d += 0.3) {
        const led = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.06, 0.03), ledMat);
        led.position.set(d, 0.5 + (r * 0.35), 0.25);
        serverLedMesh.add(led);
      }
    }
    group.add(serverLedMesh);

    // Developer Desk & Monitors
    const deskMat = new THREE.MeshStandardMaterial({ color: 0xE2E8F0, roughness: 0.6 });
    const desk = new THREE.Mesh(new THREE.BoxGeometry(2.0, 0.1, 1.0), deskMat);
    desk.position.set(0, 0.8, 0.9);
    group.add(desk);

    // Dual Monitors
    const monMat = new THREE.MeshBasicMaterial({ color: 0x38BDF8 });
    const mon1 = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.5, 0.04), monMat);
    mon1.position.set(-0.45, 1.2, 0.9);
    mon1.rotation.y = 0.2;
    group.add(mon1);

    const mon2 = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.5, 0.04), monMat);
    mon2.position.set(0.45, 1.2, 0.9);
    mon2.rotation.y = -0.2;
    group.add(mon2);

    registerLandmark(group, data);
  }

  // 🏖️ 8. Wanderer's Coast
  function buildWandererBeach() {
    const data = LANDMARK_DATA.beach;
    const group = new THREE.Group();
    group.position.set(data.pos.x, data.pos.y, data.pos.z);

    // Striped Beach Umbrella
    const poleMat = new THREE.MeshStandardMaterial({ color: 0xF8FAFC, metalness: 0.5 });
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 2.4, 8), poleMat);
    pole.position.set(0, 1.2, 0);
    pole.rotation.z = 0.15;
    pole.castShadow = true;
    group.add(pole);

    const coneGeo = new THREE.ConeGeometry(1.6, 0.6, 8);
    const canopyMat = new THREE.MeshStandardMaterial({ color: 0xEF4444, flatShading: true });
    const canopy = new THREE.Mesh(coneGeo, canopyMat);
    canopy.position.set(0.18, 2.3, 0);
    canopy.rotation.z = 0.15;
    canopy.castShadow = true;
    group.add(canopy);

    // Beach Lounger (Chair)
    const loungerMat = new THREE.MeshStandardMaterial({ color: 0x3B82F6, flatShading: true });
    const lounger = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.15, 1.6), loungerMat);
    lounger.position.set(0.7, 0.25, 0.6);
    lounger.rotation.y = Math.PI / 4;
    lounger.castShadow = true;
    group.add(lounger);

    // Surfboard in Sand
    const surfMat = new THREE.MeshStandardMaterial({ color: 0xF59E0B, roughness: 0.3 });
    const surfGeo = new THREE.BoxGeometry(0.5, 2.0, 0.08);
    const surf = new THREE.Mesh(surfGeo, surfMat);
    surf.position.set(-0.8, 0.8, 0.3);
    surf.rotation.z = -0.3;
    surf.rotation.y = 0.4;
    surf.castShadow = true;
    group.add(surf);

    registerLandmark(group, data);
  }

  // --- Register Landmark with Floating 3D Badge Pin ---
  function registerLandmark(group, data) {
    // Floating Marker Pin
    const pinGroup = new THREE.Group();
    pinGroup.position.set(0, 3.8, 0);

    const pinMat = new THREE.MeshStandardMaterial({
      color: 0x2563EB,
      roughness: 0.2,
      metalness: 0.1
    });
    const pinCapsule = new THREE.Mesh(new THREE.SphereGeometry(0.42, 14, 14), pinMat);
    pinCapsule.castShadow = true;
    pinGroup.add(pinCapsule);

    // Pointer Cone
    const cone = new THREE.Mesh(new THREE.ConeGeometry(0.25, 0.5, 10), pinMat);
    cone.position.y = -0.35;
    cone.rotation.x = Math.PI;
    pinGroup.add(cone);

    group.add(pinGroup);

    // Store references
    group.userData = {
      isLandmark: true,
      data: data,
      pinGroup: pinGroup,
      basePinY: 3.8,
      seed: Math.random() * 10
    };

    scene.add(group);
    landmarks.push(group);

    // Collect meshes for raycasting
    group.traverse(child => {
      if (child.isMesh) {
        child.userData = { parentLandmark: group };
        clickableObjects.push(child);
      }
    });
  }

  // --- Raycasting & Hover / Click Interactions ---
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  function setupInteraction() {
    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('click', onClick);
    canvas.addEventListener('touchstart', onTouchStart, { passive: true });

    // UI Buttons
    const classicBtn = document.getElementById('switchToClassicBtn');
    if (classicBtn) classicBtn.addEventListener('click', () => switchViewMode('classic'));

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

    const resetCamBtn = document.getElementById('resetIslandCamBtn');
    if (resetCamBtn) resetCamBtn.addEventListener('click', resetCamera);

    const tourBtn = document.getElementById('tourIslandBtn');
    if (tourBtn) {
      tourBtn.addEventListener('click', () => {
        isOrbiting = !isOrbiting;
        tourBtn.classList.toggle('active', isOrbiting);
        if (controls) controls.autoRotate = isOrbiting;
      });
    }

    // Time theme buttons
    document.querySelectorAll('.island-time-toggle .time-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.island-time-toggle .time-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const theme = btn.getAttribute('data-time');
        setLightingTheme(theme);
      });
    });

    // Modal Close
    const closeBtn = document.getElementById('landmarkCloseBtn');
    const modalBackdrop = document.getElementById('landmarkModalClose');
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (modalBackdrop) modalBackdrop.addEventListener('click', closeModal);

    // Keyboard navigation (Esc closes modal or returns to classic)
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const modal = document.getElementById('landmarkModal');
        if (modal && modal.classList.contains('active')) {
          closeModal();
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
        if (hoveredObject !== landmark) {
          if (hoveredObject) unhoverLandmark(hoveredObject);
          hoveredObject = landmark;
          hoverLandmark(landmark);
        }
        return;
      }
    }

    canvas.style.cursor = 'default';
    if (hoveredObject) {
      unhoverLandmark(hoveredObject);
      hoveredObject = null;
    }
  }

  function hoverLandmark(landmark) {
    const pin = landmark.userData.pinGroup;
    if (pin) pin.scale.set(1.3, 1.3, 1.3);
  }

  function unhoverLandmark(landmark) {
    const pin = landmark.userData.pinGroup;
    if (pin) pin.scale.set(1.0, 1.0, 1.0);
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
      if (landmark) {
        selectLandmark(landmark);
      }
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

  // --- Select Landmark & Show Modal ---
  function selectLandmark(landmark) {
    const data = landmark.userData.data;
    if (!data) return;

    // Trigger unique Easter egg
    if (data.id === 'basketball') triggerBasketballShot();
    if (data.id === 'legalAi') triggerGavelStrike();

    // Smooth camera focus
    focusCameraOn(landmark.position);

    // Open Modal
    openModal(data);
  }

  function focusCameraOn(targetPos) {
    if (!controls) return;
    const startTarget = controls.target.clone();
    const endTarget = targetPos.clone().add(new THREE.Vector3(0, 1.5, 0));
    const duration = 650;
    const startTime = performance.now();

    function lerpCam(now) {
      const t = Math.min((now - startTime) / duration, 1);
      const ease = 0.5 - Math.cos(t * Math.PI) / 2; // smoothInOut
      controls.target.lerpVectors(startTarget, endTarget, ease);
      if (t < 1) requestAnimationFrame(lerpCam);
    }
    requestAnimationFrame(lerpCam);
  }

  function resetCamera() {
    if (!controls) return;
    const startPos = camera.position.clone();
    const endPos = new THREE.Vector3(0, 26, 42);
    const startTarget = controls.target.clone();
    const endTarget = new THREE.Vector3(0, 1.8, 0);
    const duration = 800;
    const startTime = performance.now();

    function lerpReset(now) {
      const t = Math.min((now - startTime) / duration, 1);
      const ease = 0.5 - Math.cos(t * Math.PI) / 2;
      camera.position.lerpVectors(startPos, endPos, ease);
      controls.target.lerpVectors(startTarget, endTarget, ease);
      if (t < 1) requestAnimationFrame(lerpReset);
    }
    requestAnimationFrame(lerpReset);
  }

  // --- Modal Logic ---
  function openModal(data) {
    const modal = document.getElementById('landmarkModal');
    if (!modal) return;

    document.getElementById('modalIcon').textContent = data.icon;
    document.getElementById('modalTag').textContent = data.tag;
    document.getElementById('modalTitle').textContent = data.title;

    let bodyHtml = `<p class="landmark-modal-desc">${data.desc}</p>`;

    if (data.image) {
      bodyHtml += `<div class="landmark-modal-img"><img src="${data.image}" alt="${data.title}" loading="lazy" /></div>`;
    }

    if (data.bullets && data.bullets.length) {
      bodyHtml += `<ul class="landmark-modal-bullets">`;
      data.bullets.forEach(b => { bodyHtml += `<li>${b}</li>`; });
      bodyHtml += `</ul>`;
    }

    if (data.stats && data.stats.length) {
      bodyHtml += `<div class="landmark-modal-stats">`;
      data.stats.forEach(s => {
        bodyHtml += `<div class="stat-pill"><span class="v">${s.v}</span><span class="k">${s.k}</span></div>`;
      });
      bodyHtml += `</div>`;
    }

    document.getElementById('modalContent').innerHTML = bodyHtml;

    // Footer actions
    let footerHtml = ``;
    if (data.jumpTarget) {
      footerHtml += `<button type="button" class="landmark-jump-btn" data-jump="${data.jumpTarget}">
        <span>Open Section in Classic View</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
      </button>`;
    }
    document.getElementById('modalFooter').innerHTML = footerHtml;

    const jumpBtn = modal.querySelector('.landmark-jump-btn');
    if (jumpBtn) {
      jumpBtn.addEventListener('click', () => {
        const target = jumpBtn.getAttribute('data-jump');
        closeModal();
        switchViewMode('classic');
        setTimeout(() => {
          const el = document.querySelector(target);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 400);
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

  // --- Lighting & Theme Transitions ---
  function setLightingTheme(themeName) {
    if (!THEMES[themeName]) return;
    currentTheme = themeName;
    const theme = THEMES[themeName];

    // Background & Fog
    scene.background.setHex(theme.sky);
    scene.fog.color.setHex(theme.fog);

    // Ocean
    if (oceanMesh) {
      oceanMesh.material.color.setHex(theme.ocean);
      oceanMesh.material.opacity = theme.oceanOpacity;
    }

    // Sunlight
    if (sunLight) {
      sunLight.color.setHex(theme.sunColor);
      sunLight.intensity = theme.sunIntensity;
      sunLight.position.set(theme.sunPos.x, theme.sunPos.y, theme.sunPos.z);
    }

    // Hemisphere Light
    if (hemiLight) {
      hemiLight.color.setHex(theme.hemiSky);
      hemiLight.groundColor.setHex(theme.hemiGround);
      hemiLight.intensity = theme.hemiIntensity;
    }

    // Stars
    if (starsMesh) {
      starsMesh.material.opacity = theme.starsVisible ? 0.85 : 0;
    }
  }

  // --- View Mode Switcher: 🏝️ Island vs 📄 Classic ---
  function switchViewMode(mode) {
    const islandView = document.getElementById('islandView');
    const mainContent = document.getElementById('mainContent');
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

  // --- Window Resize Handling ---
  function onWindowResize() {
    if (!container || !renderer || !camera) return;
    const w = container.clientWidth;
    const h = container.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  // --- Render & Animation Loop ---
  function animate(time) {
    requestAnimationFrame(animate);

    const seconds = time * 0.001;

    // 1. Controls
    if (controls) controls.update();

    // 2. Bob Floating Marker Pins
    landmarks.forEach(lm => {
      const pin = lm.userData.pinGroup;
      if (pin) {
        const seed = lm.userData.seed;
        pin.position.y = lm.userData.basePinY + Math.sin(seconds * 2.5 + seed) * 0.22;
        pin.rotation.y = seconds * 0.8 + seed;
      }
    });

    // 3. Ocean Waves Animation
    if (oceanMesh) {
      const pos = oceanMesh.geometry.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const u = pos.getX(i);
        const v = pos.getY(i);
        const z = Math.sin(u * 0.4 + seconds * 1.5) * 0.12 + Math.cos(v * 0.4 + seconds * 1.2) * 0.12;
        pos.setZ(i, z);
      }
      oceanMesh.geometry.computeVertexNormals();
      oceanMesh.geometry.attributes.position.needsUpdate = true;
    }

    // 4. Puppy Tail Wag
    if (puppyTailMesh) {
      puppyTailMesh.rotation.z = Math.sin(seconds * 9) * 0.35;
    }

    // 5. Cow Head Grazing
    if (cowHeadMesh) {
      cowHeadMesh.rotation.x = Math.sin(seconds * 1.5) * 0.12;
    }

    // 6. Blinking Aviation Beacon
    if (beaconLight && beaconMesh) {
      const pulse = (Math.sin(seconds * 5) + 1) / 2;
      beaconLight.intensity = pulse > 0.6 ? 1.6 : 0.2;
      beaconMesh.material.color.setHex(pulse > 0.6 ? 0xEF4444 : 0x7F1D1D);
    }

    renderer.render(scene, camera);
  }

  // Self Initialization on DOM Load
  document.addEventListener('DOMContentLoaded', () => {
    // Check initial preference: URL hash or localStorage
    const savedMode = (function () {
      try {
        if (window.location.hash === '#classic') return 'classic';
        if (window.location.hash === '#island') return 'island';
        return localStorage.getItem('portfolio-view-mode') || 'island';
      } catch (_) {
        return 'island';
      }
    })();

    initIsland();

    if (savedMode === 'classic') {
      switchViewMode('classic');
    } else {
      switchViewMode('island');
    }
  });

})();
