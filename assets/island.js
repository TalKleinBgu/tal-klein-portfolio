/**
 * 🏝️ Tal Klein — High-Precision 3D Career & Life Island (acrokat.me architectural aesthetic)
 * Built with Three.js + procedural CanvasTextures (brickwork, roof shingles, cobblestones,
 * multi-pane lit windows, stone cornices, rooftop garden planters, river & stone bridge,
 * 3D architectural signboards, cherry blossoms, and interactive career landmarks).
 */

(function () {
  'use strict';

  const LANDMARKS = {
    bgu_campus: {
      id: 'bgu_campus',
      tag: 'Academic Excellence · B.Sc. & M.Sc.',
      title: 'Ben-Gurion University Hall',
      subtitle: 'Software & Information Systems Engineering · Beer Sheva',
      icon: '🎓',
      desc: 'After military service, I began a seven-year academic and research journey at Ben-Gurion University of the Negev, earning my B.Sc. (Cum Laude) and M.Sc. (GPA 92) while teaching hundreds of engineering students.',
      stats: [
        { v: '92', k: 'M.Sc. GPA' },
        { v: '89.4', k: 'B.Sc. Cum Laude' },
        { v: '2020–26', k: 'Teaching Assistant' }
      ],
      bullets: [
        'My M.Sc. thesis analyzes temporal dynamics in judicial ruling citations using NLP.',
        'I received the Meitar Legal-Tech Center Research Excellence Fellowship.',
        'I taught "Introduction to Artificial Intelligence" and "Technological Entrepreneurship".'
      ],
      jumpSection: '#experience',
      jumpLabel: 'View Academic Journey in Classic CV'
    },
    research_hq: {
      id: 'research_hq',
      tag: 'Published AI Research · DeepMind-Style HQ',
      title: 'AI & Legal NLP Research HQ',
      subtitle: 'Co-Advisor: Prof. Mark Last · Springer AI & Law',
      icon: '🏛️',
      desc: 'The central architectural landmark on the island: where large language models, citation network dynamics, and causal inference converge to uncover hidden temporal shifts in judicial history.',
      stats: [
        { v: '86%', k: 'Best F1 Score' },
        { v: '185K', k: 'Court Rulings' },
        { v: 'Q1', k: 'Springer Journal' }
      ],
      bullets: [
        'I built a Legal-HeBERT + BiLSTM classifier that outperformed standard transformers by 7 F1 points.',
        'I engineered a pipeline to parse 185,000 Hebrew Supreme Court rulings.',
        'I used Difference-in-Differences causal inference to measure shifts in legal doctrine.'
      ],
      jumpSection: '#projects',
      jumpLabel: 'Explore Research & Publications'
    },
    tech_hub: {
      id: 'tech_hub',
      tag: 'Production Engineering · Deep Learning',
      title: 'The Builder’s Tech Lab',
      subtitle: 'Search Engines, Multimodal AI & High-Scale Systems',
      icon: '💻',
      desc: 'From indexing 6.4 million Wikipedia articles in GCP to building real-time speech diarization and reinforcement learning agents, this modern timber-and-glass studio showcases hands-on systems engineering.',
      stats: [
        { v: '6.4M+', k: 'Docs Indexed' },
        { v: '0.67s', k: 'Mean Latency' },
        { v: '100%', k: 'Recall@10' }
      ],
      bullets: [
        'I built a Wikipedia search engine with custom inverted indexes and BM25 + PageRank on Google Cloud.',
        'I developed real-time speaker diarization and a Whisper transcription pipeline.',
        'I worked on multimodal genre classification and autonomous Deep Q-Network agents.'
      ],
      jumpSection: '#projects',
      jumpLabel: 'See All 6 Engineering Projects'
    },
    puppy_haven: {
      id: 'puppy_haven',
      tag: 'Community & Volunteering',
      title: 'Guide-Dog Puppy Haven',
      subtitle: 'Israel Guide Dog Center for the Blind',
      icon: '🦮',
      image: './assets/guide-dog.webp',
      desc: 'One of my most meaningful experiences outside engineering was raising and training a future guide dog from eight weeks old for over a year, including bringing the puppy to lectures, labs, and daily outings.',
      stats: [
        { v: '1+ Yr', k: 'Full-Time Foster' },
        { v: '24/7', k: 'Training & Care' },
        { v: '100%', k: 'Heart & Impact' }
      ],
      bullets: [
        'I fostered and trained a guide-dog puppy with the Israel Guide Dog Center for the Blind.',
        'I taught foundational obedience, calm navigation in busy campuses, and obstacle awareness.',
        'I helped prepare the puppy for formal guide-dog certification.'
      ],
      jumpSection: '#about',
      jumpLabel: 'Read More in About Me'
    },
    basketball_court: {
      id: 'basketball_court',
      tag: 'Passion & Team Spirit',
      title: 'Maccabi & NBA Streetball Court',
      subtitle: 'Yellow-and-Blue Hardwood · Click to Shoot a 3-Pointer!',
      icon: '🏀',
      desc: 'I play pickup basketball and follow the NBA, EuroLeague, and Maccabi Tel Aviv. The game keeps me thinking about strategy, tempo, and teamwork.',
      stats: [
        { v: 'NBA', k: '& EuroLeague' },
        { v: 'MTA', k: 'Yellow & Blue' },
        { v: '3PT', k: 'Swish Animation' }
      ],
      bullets: [
        'I have played basketball for years and follow the NBA and EuroLeague.',
        'I bring court vision, unselfish teamwork, and focus to engineering teams.',
        'Interactive Easter Egg: Clicking the court triggers a high-arcing 3-point swish into the net!'
      ],
      jumpSection: '#about',
      jumpLabel: 'Switch to Classic Portfolio'
    },
    dairy_barn: {
      id: 'dairy_barn',
      tag: 'Family Roots & Work Ethic',
      title: 'The Heritage Dairy Barn',
      subtitle: 'Agricultural Roots · Grounded Problem Solving',
      icon: '🐄',
      desc: 'Growing up on my family dairy farm taught me to work hard, take ownership, and solve practical problems without shortcuts.',
      stats: [
        { v: '05:00', k: 'Early Mornings' },
        { v: '100%', k: 'Grit & Ownership' },
        { v: 'Roots', k: 'Family Farm' }
      ],
      bullets: [
        'I grew up helping run the family dairy farm and learned responsibility, resilience, and teamwork early.',
        'I bring that practical mindset to academic research and engineering.',
        'My farm roots keep me focused on real-world execution.'
      ],
      jumpSection: '#about',
      jumpLabel: 'Learn More About Me'
    },
    idf_outpost: {
      id: 'idf_outpost',
      tag: 'Military Service · 2015–2018',
      title: 'IDF C4I Tactical Comms Outpost',
      subtitle: 'Combat Communications & Crypto Systems · Full Honors',
      icon: '📡',
      desc: 'I began developing technical leadership under pressure as a Combat Communications Specialist in the Israel Defense Forces, managing encrypted RF networks and field command infrastructure.',
      stats: [
        { v: '3 Yrs', k: 'Full Service' },
        { v: 'C4I', k: 'Encrypted Comms' },
        { v: '24/7', k: 'Mission Critical' }
      ],
      bullets: [
        'I maintained and troubleshot mission-critical encrypted communication networks and tactical relays.',
        'I trained field operators and commanders on reliable C4I hardware and protocols.',
        'I completed my service with full honors before beginning engineering studies at Ben-Gurion University.'
      ],
      jumpSection: '#experience',
      jumpLabel: 'View Full Timeline'
    },
    coastal_pier: {
      id: 'coastal_pier',
      tag: 'Nature, Beaches & Travel',
      title: 'The Mediterranean Pier & Cove',
      subtitle: 'Beaches, Trails & Open Horizons',
      icon: '⛵',
      desc: 'Beyond datasets and neural networks, I recharge by the sea, hike nature trails, and explore new coastlines around the world.',
      stats: [
        { v: 'Sea', k: '& Coastlines' },
        { v: 'Trails', k: 'Nature & Hiking' },
        { v: 'Open', k: 'To New Opportunities' }
      ],
      bullets: [
        'I love the beach, outdoor trails, and traveling to discover new landscapes and cultures.',
        'Currently open to Data Scientist, ML Engineer, and AI Researcher roles.',
        'Let’s connect over coffee, basketball, or machine learning!'
      ],
      jumpSection: '#contact',
      jumpLabel: 'Get in Touch with Me'
    }
  };

  let scene, camera, renderer, controls;
  let islandGroup;
  let terrainFallbackGroup;
  let raycaster, mouse;
  let interactiveTargets = [];
  let landmarkGroups = {};
  let landmarkPins = [];
  let oceanMesh = null;
  let animWaterRipple = null;
  let hoveredLandmarkId = null;
  let isIslandVisible = true;
  let isPaused = false;
  let clock;

  // Animated elements
  let animBasketball = null;
  let ballShotProgress = -1;
  let animBoat = null;
  let animRowBoat = null;
  let animPuppy = null;
  let animCows = [];
  let animCar = null;
  let animTreeGroups = [];
  let radarDish = null;
  let beaconMat = null;
  let riverMesh = null;

  // Camera default state — a wide isometric view that keeps the full island in frame.
  const DEFAULT_CAM_POS = { x: 20.6, y: 15.8, z: 24.6 };
  const DEFAULT_TARGET = { x: 0.9, y: 1.15, z: 0.5 };
  let cameraTargetPos = null;
  let controlsTargetLook = null;
  let isCameraTransitioning = false;
  // Save camera state before landmark zoom so we can restore on modal close
  let savedCameraPos = null;
  let savedCameraTarget = null;
  // Track hovered group for bounce scale animation
  let hoveredGroup = null;

  // ─── Procedural High-Resolution Texture Generators ─────────────────────────
  function createBrickMaterial(brickHex, mortarHex, repeatX = 4, repeatY = 4) {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = mortarHex || '#D6D3D1';
    ctx.fillRect(0, 0, 512, 512);

    const rows = 16;
    const cols = 8;
    const rowH = 512 / rows;
    const colW = 512 / cols;
    const mortar = 3;

    const baseColor = new THREE.Color(brickHex);

    for (let r = 0; r < rows; r++) {
      const offset = (r % 2) * (colW / 2);
      for (let c = -1; c <= cols; c++) {
        const variation = (Math.sin(r * 13.7 + c * 7.3) * 0.045);
        const col = baseColor.clone().offsetHSL(0, variation * 0.5, variation);
        ctx.fillStyle = '#' + col.getHexString();
        ctx.fillRect(c * colW + offset + mortar, r * rowH + mortar, colW - mortar * 2, rowH - mortar * 2);

        // Subtle highlight on top edge of brick
        ctx.fillStyle = 'rgba(255,255,255,0.08)';
        ctx.fillRect(c * colW + offset + mortar, r * rowH + mortar, colW - mortar * 2, 2);
      }
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(repeatX, repeatY);
    return new THREE.MeshStandardMaterial({
      map: tex,
      bumpMap: tex,
      bumpScale: 0.03,
      roughness: 0.82,
      metalness: 0.04
    });
  }

  function createRoofShingleMaterial(baseHex, repeatX = 4, repeatY = 3) {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    const baseColor = new THREE.Color(baseHex);
    ctx.fillStyle = '#' + baseColor.getHexString();
    ctx.fillRect(0, 0, 256, 256);

    const rows = 12;
    const cols = 8;
    const rH = 256 / rows;
    const cW = 256 / cols;

    for (let r = 0; r < rows; r++) {
      const off = (r % 2) * (cW / 2);
      for (let c = -1; c <= cols; c++) {
        const v = (Math.cos(r * 9.1 + c * 5.7) * 0.04);
        const col = baseColor.clone().offsetHSL(0, 0, v);
        ctx.fillStyle = '#' + col.getHexString();
        ctx.fillRect(c * cW + off + 1, r * rH + 1, cW - 2, rH - 2);
        ctx.fillStyle = 'rgba(0,0,0,0.22)';
        ctx.fillRect(c * cW + off, (r + 1) * rH - 2, cW, 2);
      }
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(repeatX, repeatY);
    return new THREE.MeshStandardMaterial({
      map: tex,
      bumpMap: tex,
      bumpScale: 0.025,
      roughness: 0.68,
      metalness: 0.12
    });
  }

  function createCobbleMaterial(repeatX = 6, repeatY = 2) {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#C9C3B7';
    ctx.fillRect(0, 0, 512, 512);

    const stones = [
      '#E7E1D5', '#D8D2C6', '#ECE6DA', '#CFC9BD', '#E0D9CD', '#D5D0C5'
    ];
    const rows = 9;
    const cols = 9;
    const rH = 512 / rows;
    const cW = 512 / cols;

    for (let r = 0; r < rows; r++) {
      const off = (r % 2) * (cW * 0.45);
      for (let c = -1; c <= cols; c++) {
        const seed = Math.abs((r * 17 + c * 29 + 48) % stones.length);
        const x = c * cW + off + 4 + ((r + c) % 3) * 2;
        const y = r * rH + 4 + ((r * 2 + c) % 4) * 2;
        const w = cW - 9 - ((r + c) % 4) * 2;
        const h = rH - 9 - ((r * 3 + c) % 3) * 2;
        ctx.fillStyle = stones[seed];
        ctx.beginPath();
        ctx.roundRect(x, y, w, h, 10 + (r + c) % 7);
        ctx.fill();
        ctx.strokeStyle = 'rgba(116,108,96,0.22)';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.strokeStyle = 'rgba(255,255,255,0.28)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x + 8, y + 3);
        ctx.lineTo(x + w - 10, y + 3);
        ctx.stroke();
      }
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(repeatX, repeatY);
    return new THREE.MeshStandardMaterial({
      map: tex,
      bumpMap: tex,
      bumpScale: 0.028,
      roughness: 0.85,
      metalness: 0.02
    });
  }

  function createSignBoardMesh(width, height, drawCallback) {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = Math.round(512 * (height / width));
    const ctx = canvas.getContext('2d');

    // Crisp white enamel background with subtle warm border
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#CBD5E1';
    ctx.lineWidth = 8;
    ctx.strokeRect(4, 4, canvas.width - 8, canvas.height - 8);

    drawCallback(ctx, canvas.width, canvas.height);

    const tex = new THREE.CanvasTexture(canvas);
    tex.anisotropy = 4;

    const signGroup = new THREE.Group();
    // Dark backing frame
    const frame = new THREE.Mesh(
      new THREE.BoxGeometry(width + 0.08, height + 0.08, 0.08),
      new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.5 })
    );
    signGroup.add(frame);

    const face = new THREE.Mesh(
      new THREE.PlaneGeometry(width, height),
      new THREE.MeshStandardMaterial({ map: tex, roughness: 0.3, metalness: 0.05 })
    );
    face.position.z = 0.045;
    signGroup.add(face);

    return signGroup;
  }

  function drawGitHubMark(ctx, centerX, centerY, size, color) {
    const mark = new Path2D('M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z');
    const scale = size / 24;
    ctx.save();
    ctx.translate(centerX - size / 2, centerY - size / 2);
    ctx.scale(scale, scale);
    ctx.fillStyle = color;
    ctx.fill(mark);
    ctx.restore();
  }

  // ─── Architectural Sub-Components (Windows, Planters, Trees, Lamps) ────────
  const frameMatWhite = new THREE.MeshStandardMaterial({ color: 0xF8FAFC, roughness: 0.5 });
  const frameMatDark = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.45 });
  const stoneCorniceMat = new THREE.MeshStandardMaterial({ color: 0xE7E5E4, roughness: 0.7 });
  const glassWarmLitMat = new THREE.MeshStandardMaterial({
    color: 0xFEF08A,
    emissive: 0xFACC15,
    emissiveIntensity: 0.55,
    roughness: 0.2
  });
  const glassSoftLitMat = new THREE.MeshStandardMaterial({
    color: 0xFDE68A,
    emissive: 0xF59E0B,
    emissiveIntensity: 0.35,
    roughness: 0.25
  });
  const glassSlateMat = new THREE.MeshStandardMaterial({
    color: 0x475569,
    roughness: 0.15,
    metalness: 0.65
  });

  /**
   * Builds an acrokat-style multi-pane recessed architectural window with sill,
   * outer frame, muntin crossbars, and warm lit or reflective glass.
   */
  function createMultiPaneWindow(w, h, isLit = true, darkFrame = false) {
    const win = new THREE.Group();
    const fMat = darkFrame ? frameMatDark : frameMatWhite;

    // Outer frame box
    const outer = new THREE.Mesh(new THREE.BoxGeometry(w, h, 0.08), fMat);
    win.add(outer);

    // Glass pane slightly recessed
    const gMat = isLit ? (Math.random() > 0.35 ? glassWarmLitMat : glassSoftLitMat) : glassSlateMat;
    const glass = new THREE.Mesh(new THREE.BoxGeometry(w - 0.1, h - 0.1, 0.05), gMat);
    glass.position.z = 0.025;
    win.add(glass);

    // Vertical & horizontal muntin bars
    const vBar = new THREE.Mesh(new THREE.BoxGeometry(0.035, h - 0.08, 0.07), fMat);
    vBar.position.z = 0.03;
    win.add(vBar);

    const hBar = new THREE.Mesh(new THREE.BoxGeometry(w - 0.08, 0.035, 0.07), fMat);
    hBar.position.z = 0.03;
    win.add(hBar);

    // Protruding stone windowsill at bottom
    const sill = new THREE.Mesh(new THREE.BoxGeometry(w + 0.08, 0.06, 0.14), stoneCorniceMat);
    sill.position.set(0, -h / 2 - 0.02, 0.03);
    win.add(sill);

    // Top lintel
    const lintel = new THREE.Mesh(new THREE.BoxGeometry(w + 0.06, 0.06, 0.11), stoneCorniceMat);
    lintel.position.set(0, h / 2 + 0.02, 0.02);
    win.add(lintel);

    return win;
  }

  /**
   * Builds a stone planter box filled with lush green bushes & flower accents
   * (just like the rooftop and terrace planters in acrokat.me).
   */
  function createPlanterBox(length = 1.2, width = 0.45) {
    const group = new THREE.Group();
    const box = new THREE.Mesh(
      new THREE.BoxGeometry(length, 0.32, width),
      new THREE.MeshStandardMaterial({ color: 0xD6D3D1, roughness: 0.8 })
    );
    box.position.y = 0.16;
    box.castShadow = true;
    box.receiveShadow = true;
    group.add(box);

    const soil = new THREE.Mesh(
      new THREE.BoxGeometry(length - 0.08, 0.05, width - 0.08),
      new THREE.MeshStandardMaterial({ color: 0x57534E, roughness: 0.95 })
    );
    soil.position.y = 0.31;
    group.add(soil);

    const greens = [0x4D9B6A, 0x3D8458, 0x62B07E, 0x529E71];
    const count = Math.max(3, Math.floor(length * 3.5));
    for (let i = 0; i < count; i++) {
      const r = 0.16 + (i % 2) * 0.04;
      const bush = new THREE.Mesh(
        new THREE.SphereGeometry(r, 16, 12),
        new THREE.MeshStandardMaterial({ color: greens[i % greens.length], roughness: 0.78 })
      );
      const t = count === 1 ? 0 : (i / (count - 1) - 0.5) * (length - 0.24);
      bush.position.set(t, 0.38 + (i % 2) * 0.04, ((i % 3) - 1) * 0.04);
      bush.castShadow = true;
      group.add(bush);
    }
    return group;
  }

  /**
   * Builds a vintage wrought-iron streetlamp with a glowing warm lantern.
   */
  function createStreetLamp(x, y, z) {
    const lamp = new THREE.Group();
    lamp.position.set(x, y, z);

    const ironMat = new THREE.MeshStandardMaterial({ color: 0x1E293B, roughness: 0.4, metalness: 0.6 });
    const base = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.13, 0.25, 8), ironMat);
    base.position.y = 0.125;
    lamp.add(base);

    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.05, 1.45, 8), ironMat);
    pole.position.y = 0.85;
    pole.castShadow = true;
    lamp.add(pole);

    const lantern = new THREE.Mesh(
      new THREE.CylinderGeometry(0.14, 0.09, 0.28, 6),
      glassWarmLitMat
    );
    lantern.position.y = 1.65;
    lamp.add(lantern);

    const cap = new THREE.Mesh(new THREE.ConeGeometry(0.17, 0.14, 6), ironMat);
    cap.position.y = 1.84;
    lamp.add(cap);

    return lamp;
  }

  // ─── Initialize Three.js Scene ─────────────────────────────────────────────
  function initIsland() {
    const canvas = document.getElementById('islandCanvas');
    if (!canvas || typeof THREE === 'undefined') return;

    clock = new THREE.Clock();
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xF0F4F1);
    // Keep the far shoreline atmospheric without washing miniature details out.
    scene.fog = new THREE.FogExp2(0xF0F4F1, 0.0065);

    const w = window.innerWidth || 1440;
    const h = window.innerHeight || 900;

    // 32° FOV gives an orthographic-like architectural diorama feel with zero fisheye distortion
    camera = new THREE.PerspectiveCamera(32, w / h, 0.5, 200);
    camera.position.set(DEFAULT_CAM_POS.x, DEFAULT_CAM_POS.y, DEFAULT_CAM_POS.z);

    renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(w, h, true);
    // The full-screen scene is expensive on high-DPI displays. Capping its
    // render scale keeps orbiting and hover feedback responsive.
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;

    if (THREE.OrbitControls) {
      controls = new THREE.OrbitControls(camera, renderer.domElement);
      controls.target.set(DEFAULT_TARGET.x, DEFAULT_TARGET.y, DEFAULT_TARGET.z);
      controls.enableDamping = true;
      controls.dampingFactor = 0.06;
      controls.maxPolarAngle = Math.PI / 2 - 0.05;
      controls.minPolarAngle = Math.PI / 7;
      controls.minDistance = 10;
      controls.maxDistance = 42;
      controls.autoRotate = false;

      controls.addEventListener('start', () => {
        isCameraTransitioning = false;
      });
    }

    setupLights();

    islandGroup = new THREE.Group();
    // Slight shift to the right so the left editorial text ("Tal Klein.") never overlaps buildings
    islandGroup.position.set(1.6, -0.4, 0);
    scene.add(islandGroup);

    buildIslandBase();
    loadIslandTerrainGlb();
    buildRiverAndStoneBridge();
    registerBlenderLandmarkHotspots();

    // The complete landscape, landmark architecture, farm, pet yard, roads,
    // trees, street furniture, court, and pier are authored in Blender.
    buildOcean();
    buildFloatingLabels();
    buildVignetteOverlay();

    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2(-999, -999);

    bindEvents();
    animate();
  }

  // Load the authored island terrain as a compact binary glTF. The procedural
  // base stays visible until the asset is ready, so slow or offline requests
  // never leave a hole under the buildings.
  async function loadIslandTerrainGlb() {
    try {
      const response = await fetch('./assets/island-terrain.glb?v=8', { cache: 'force-cache' });
      if (!response.ok) throw new Error(`Terrain model request failed: ${response.status}`);
      const buffer = await response.arrayBuffer();
      const view = new DataView(buffer);
      if (view.getUint32(0, true) !== 0x46546c67 || view.getUint32(4, true) !== 2) throw new Error('Invalid GLB header');
      let offset = 12, gltf = null, binary = null;
      while (offset < buffer.byteLength) {
        const length = view.getUint32(offset, true), type = view.getUint32(offset + 4, true);
        offset += 8;
        if (type === 0x4e4f534a) gltf = JSON.parse(new TextDecoder().decode(new Uint8Array(buffer, offset, length)).trim());
        if (type === 0x004e4942) binary = buffer.slice(offset, offset + length);
        offset += length;
      }
      if (!gltf || !binary) throw new Error('GLB data chunks are missing');
      const componentArray = (accessor) => {
        const info = gltf.accessors[accessor];
        const bufferViewInfo = gltf.bufferViews[info.bufferView];
        const bytesPerElement = info.componentType === 5125 || info.componentType === 5126 ? 4 : 2;
        const start = (bufferViewInfo.byteOffset || 0) + (info.byteOffset || 0);
        const typed = info.componentType === 5125 ? Uint32Array : info.componentType === 5126 ? Float32Array : Uint16Array;
        const componentCount = { SCALAR: 1, VEC2: 2, VEC3: 3, VEC4: 4 }[info.type];
        return new typed(binary.slice(start, start + info.count * componentCount * bytesPerElement));
      };
      const terrain = new THREE.Group();
      let meadowTexture = null;
      const grassCanvas = document.createElement('canvas');
      grassCanvas.width = grassCanvas.height = 512;
      const grassCtx = grassCanvas.getContext('2d');
      grassCtx.fillStyle = '#F4F8E9';
      grassCtx.fillRect(0, 0, 512, 512);
      let seed = 93821;
      const random = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
      const grassMarks = ['rgba(49,91,43,0.23)','rgba(105,139,65,0.20)','rgba(226,218,160,0.24)','rgba(67,112,52,0.16)'];
      for (let i = 0; i < 9000; i++) {
        const x = random() * 512, y = random() * 512;
        const radius = 0.55 + random() * 2.2;
        grassCtx.fillStyle = grassMarks[i % grassMarks.length];
        grassCtx.beginPath();
        grassCtx.ellipse(x, y, radius * (1.1 + random()), radius * 0.58, random() * Math.PI, 0, Math.PI * 2);
        grassCtx.fill();
      }
      meadowTexture = new THREE.CanvasTexture(grassCanvas);
      meadowTexture.wrapS = meadowTexture.wrapT = THREE.RepeatWrapping;
      meadowTexture.repeat.set(1.5, 1.5);
      meadowTexture.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
      for (const primitive of gltf.meshes[0].primitives) {
        const geometry = new THREE.BufferGeometry();
        // Blender's glTF exporter writes the scene in glTF's Y-up coordinate system.
        const vertexPositions = componentArray(primitive.attributes.POSITION);
        geometry.setAttribute('position', new THREE.BufferAttribute(vertexPositions, 3));
        if (primitive.attributes.COLOR_0 !== undefined) {
          const colorAccessor = gltf.accessors[primitive.attributes.COLOR_0];
          const rawColors = componentArray(primitive.attributes.COLOR_0);
          const colorStride = rawColors.length / (vertexPositions.length / 3);
          const colors = new Float32Array(vertexPositions.length);
          for (let i = 0; i < colors.length / 3; i++) {
            // Blender exports vertex colors as normalized UNSIGNED_SHORT. The
            // stored integers must be divided by their component range before
            // Three.js uses them as linear color multipliers; otherwise the
            // whole terrain clips to white.
            const scale = colorAccessor.normalized && colorAccessor.componentType === 5123 ? 1 / 65535 : 1;
            colors[i * 3] = rawColors[i * colorStride] * scale;
            colors[i * 3 + 1] = rawColors[i * colorStride + 1] * scale;
            colors[i * 3 + 2] = rawColors[i * colorStride + 2] * scale;
          }
          geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        }
        if (primitive.indices !== undefined) geometry.setIndex(new THREE.BufferAttribute(componentArray(primitive.indices), 1));
        const isMeadow = primitive.material === 0;
        if (isMeadow) {
          const uvs = new Float32Array(vertexPositions.length / 3 * 2);
          for (let i = 0; i < vertexPositions.length / 3; i++) {
            uvs[i * 2] = vertexPositions[i * 3] / 20 + 0.5;
            uvs[i * 2 + 1] = vertexPositions[i * 3 + 2] / 20 + 0.5;
          }
          geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
        }
        geometry.computeVertexNormals();
        const material = isMeadow
          ? new THREE.MeshStandardMaterial({ map: meadowTexture, vertexColors: true, roughness: 0.98, metalness: 0, side: THREE.DoubleSide })
          : new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 1, metalness: 0, side: THREE.DoubleSide });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.name = isMeadow ? 'GLB meadow terrain' : 'GLB sculpted coastal cliffs';
        mesh.visible = true;
        mesh.receiveShadow = true;
        mesh.castShadow = !isMeadow;
        terrain.add(mesh);
      }
      islandGroup.add(terrain);
      if (terrainFallbackGroup) {
        terrainFallbackGroup.children.forEach((object) => {
          object.visible = false;
          if (object.geometry) object.geometry.dispose();
          if (object.material) object.material.dispose();
        });
      }
    } catch (error) {
      console.warn('Using procedural island terrain fallback:', error);
    }
  }

  function setupLights() {
    const hemiLight = new THREE.HemisphereLight(0xFFFFFF, 0x8C7C6D, 0.65);
    hemiLight.position.set(0, 35, 0);
    scene.add(hemiLight);

    const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.45);
    scene.add(ambientLight);

    // Warm sunlit directional light casting crisp architectural shadows
    const sunLight = new THREE.DirectionalLight(0xFFF6D9, 1.45);
    sunLight.position.set(22, 34, 16);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 5;
    sunLight.shadow.camera.far = 70;
    const d = 15;
    sunLight.shadow.camera.left = -d;
    sunLight.shadow.camera.right = d;
    sunLight.shadow.camera.top = d;
    sunLight.shadow.camera.bottom = -d;
    sunLight.shadow.bias = -0.0005;
    sunLight.shadow.radius = 2.5;
    scene.add(sunLight);

    // Soft cool fill from opposite side to illuminate brick details in shadow
    const fillLight = new THREE.DirectionalLight(0xBAE6FD, 0.55);
    fillLight.position.set(-20, 15, -16);
    scene.add(fillLight);

    // Subtle rim light from behind for depth
    const rimLight = new THREE.DirectionalLight(0xFFEDD5, 0.45);
    rimLight.position.set(5, 10, -25);
    scene.add(rimLight);

    // Warm-toned bounce light from below
    const bounceLight = new THREE.PointLight(0xFCD34D, 0.35, 30);
    bounceLight.position.set(0, 0.5, 0);
    scene.add(bounceLight);
  }

  // ─── Multi-Tier Sculpted Island Base ───────────────────────────────────────
  function buildIslandBase() {
    terrainFallbackGroup = new THREE.Group();
    terrainFallbackGroup.name = 'Procedural terrain fallback';
    islandGroup.add(terrainFallbackGroup);
    // Procedural vibrant meadow grass texture
    const gCanvas = document.createElement('canvas');
    gCanvas.width = 512;
    gCanvas.height = 512;
    const gCtx = gCanvas.getContext('2d');
    gCtx.fillStyle = '#4D985B';
    gCtx.fillRect(0, 0, 512, 512);
    let grassSeed = 47291;
    const grassRandom = () => {
      grassSeed = (grassSeed * 16807) % 2147483647;
      return (grassSeed - 1) / 2147483646;
    };
    const grassFlecks = ['rgba(139,190,106,0.25)', 'rgba(31,93,50,0.13)', 'rgba(218,210,128,0.12)', 'rgba(230,239,187,0.1)'];
    for (let i = 0; i < 7600; i++) {
      const x = grassRandom() * 512, y = grassRandom() * 512;
      const radius = 0.5 + grassRandom() * 2.1;
      gCtx.fillStyle = grassFlecks[i % grassFlecks.length];
      gCtx.beginPath();
      gCtx.ellipse(x, y, radius * (1.1 + grassRandom()), radius * 0.7, grassRandom() * Math.PI, 0, Math.PI * 2);
      gCtx.fill();
    }
    const grassTex = new THREE.CanvasTexture(gCanvas);
    grassTex.wrapS = THREE.RepeatWrapping;
    grassTex.wrapT = THREE.RepeatWrapping;
    grassTex.repeat.set(2.4, 2.4);
    grassTex.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());

    // A softly irregular, stratified limestone edge reads as sculpted terrain.
    const rockGeo = new THREE.CylinderGeometry(12.0, 9.2, 2.3, 96, 8);
    const rockPositions = rockGeo.attributes.position;
    for (let i = 0; i < rockPositions.count; i++) {
      const x = rockPositions.getX(i), y = rockPositions.getY(i), z = rockPositions.getZ(i);
      const radius = Math.max(Math.hypot(x, z), 1);
      const angle = Math.atan2(z, x);
      const variation = Math.sin(angle * 7 + y * 1.8) * 0.11 + Math.sin(angle * 13 - y * 2.2) * 0.045;
      const scale = 1 + variation / radius;
      rockPositions.setXYZ(i, x * scale, y + Math.sin(angle * 5) * 0.035, z * scale);
    }
    rockGeo.computeVertexNormals();

    const stoneCanvas = document.createElement('canvas');
    stoneCanvas.width = 512;
    stoneCanvas.height = 512;
    const stoneCtx = stoneCanvas.getContext('2d');
    stoneCtx.fillStyle = '#9A8A72';
    stoneCtx.fillRect(0, 0, 512, 512);
    for (let i = 0; i < 3200; i++) {
      const x = (i * 197) % 512, y = (i * 311 + Math.floor(i / 7) * 13) % 512;
      const radius = 1 + (i % 6) * 0.7;
      stoneCtx.fillStyle = i % 3 === 0 ? 'rgba(238,225,199,0.18)' : 'rgba(54,44,32,0.10)';
      stoneCtx.beginPath();
      stoneCtx.ellipse(x, y, radius * 1.8, radius, (i % 11) * 0.17, 0, Math.PI * 2);
      stoneCtx.fill();
    }
    const stoneTex = new THREE.CanvasTexture(stoneCanvas);
    stoneTex.wrapS = THREE.RepeatWrapping;
    stoneTex.wrapT = THREE.RepeatWrapping;
    stoneTex.repeat.set(3, 1.5);
    stoneTex.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
    const rockMat = new THREE.MeshStandardMaterial({ map: stoneTex, color: 0xE4D1B1, roughness: 0.96, bumpMap: stoneTex, bumpScale: 0.055 });
    const rockMesh = new THREE.Mesh(rockGeo, rockMat);
    rockMesh.position.y = -1.35;
    rockMesh.receiveShadow = true;
    terrainFallbackGroup.add(rockMesh);

    // Individual shoreline stones break up the straight-sided island silhouette.
    const shoreStoneGeo = new THREE.IcosahedronGeometry(0.95, 1);
    for (let i = 0; i < 24; i++) {
      const angle = (i / 24) * Math.PI * 2;
      const stone = new THREE.Mesh(shoreStoneGeo, rockMat);
      const radial = 12.05 + Math.sin(i * 4.1) * 0.16;
      const size = 0.9 + ((i * 7) % 5) * 0.07;
      stone.position.set(Math.cos(angle) * radial, -0.53 + Math.sin(i * 2.7) * 0.08, Math.sin(angle) * radial);
      stone.scale.set(size * 1.5, size * 0.78, size * 1.12);
      stone.rotation.set(Math.sin(i * 1.6) * 0.22, angle, Math.cos(i * 2.3) * 0.18);
      stone.castShadow = true;
      stone.receiveShadow = true;
      terrainFallbackGroup.add(stone);
    }

    // 2. Warm limestone bevel beneath the grass edge
    const sandGeo = new THREE.CylinderGeometry(12.35, 11.9, 0.44, 64);
    const sandMat = new THREE.MeshStandardMaterial({ map: stoneTex, color: 0xB9A98E, roughness: 0.92, bumpMap: stoneTex, bumpScale: 0.025 });
    const sandMesh = new THREE.Mesh(sandGeo, sandMat);
    sandMesh.position.y = -0.18;
    sandMesh.receiveShadow = true;
    terrainFallbackGroup.add(sandMesh);

    // 3. Main vibrant spring-meadow grass plateau
    const grassGeo = new THREE.CylinderGeometry(11.9, 12.2, 0.52, 64);
    const grassMat = new THREE.MeshStandardMaterial({
      map: grassTex,
      color: 0x58B36E,
      roughness: 0.85
    });
    const grassMesh = new THREE.Mesh(grassGeo, grassMat);
    grassMesh.name = 'Procedural meadow plateau';
    grassMesh.position.y = 0.12;
    grassMesh.receiveShadow = true;
    terrainFallbackGroup.add(grassMesh);

    // Scattered wildflower patches across the meadow
    const flowerColors = [0xF472B6, 0xFBBF24, 0xA78BFA, 0xF87171, 0x34D399, 0x60A5FA];
    for (let i = 0; i < 48; i++) {
      const angle = (i / 48) * Math.PI * 2 + i * 0.618;
      const dist = 3.6 + (i % 6) * 1.3 + Math.sin(i * 3.7) * 0.9;
      const fx = Math.cos(angle) * dist;
      const fz = Math.sin(angle) * dist;
      if (Math.abs(fx) < 2.5 && Math.abs(fz) < 2.5) continue;
      const flower = new THREE.Mesh(
        new THREE.SphereGeometry(0.06 + (i % 3) * 0.02, 6, 6),
        new THREE.MeshStandardMaterial({ color: flowerColors[i % flowerColors.length], roughness: 0.6 })
      );
      flower.position.set(fx, 0.38, fz);
      terrainFallbackGroup.add(flower);
    }

    // Low ground-cover bushes scattered around
    const bushGreen = [0x3D8458, 0x4D9B6A, 0x2D6A4F];
    for (let i = 0; i < 24; i++) {
      const angle = (i / 24) * Math.PI * 2 + 0.3;
      const dist = 5.2 + (i % 5) * 1.3;
      const bx = Math.cos(angle) * dist;
      const bz = Math.sin(angle) * dist;
      if (Math.abs(bx) < 3 && Math.abs(bz) < 3) continue;
      const bush = new THREE.Mesh(
        new THREE.DodecahedronGeometry(0.18 + (i % 3) * 0.06, 1),
        new THREE.MeshStandardMaterial({ color: bushGreen[i % bushGreen.length], roughness: 0.8 })
      );
      bush.position.set(bx, 0.42, bz);
      bush.castShadow = true;
      terrainFallbackGroup.add(bush);
    }
  }

  // ─── Winding River, Coastal Bay & Arched Stone Bridge (like acrokat.me) ────
  function buildRiverAndStoneBridge() {
    const waterMat = new THREE.MeshStandardMaterial({
      color: 0x63BBC0,
      roughness: 0.24,
      metalness: 0.08
    });
    const flowCanvas = document.createElement('canvas');
    flowCanvas.width = 256;
    flowCanvas.height = 256;
    const flowCtx = flowCanvas.getContext('2d');
    flowCtx.fillStyle = '#FFFFFF';
    flowCtx.fillRect(0, 0, 256, 256);
    for (let i = 0; i < 150; i++) {
      const x = Math.random() * 256;
      const y = Math.random() * 256;
      flowCtx.beginPath();
      flowCtx.moveTo(x, y);
      flowCtx.quadraticCurveTo(x + 5, y - 2 + Math.random() * 4, x + 12 + Math.random() * 24, y);
      flowCtx.strokeStyle = i % 3 === 0 ? 'rgba(255,255,255,0.8)' : 'rgba(38,126,139,0.22)';
      flowCtx.lineWidth = 1 + Math.random() * 2;
      flowCtx.lineCap = 'round';
      flowCtx.stroke();
    }
    const flowTexture = new THREE.CanvasTexture(flowCanvas);
    flowTexture.wrapS = THREE.RepeatWrapping;
    flowTexture.wrapT = THREE.RepeatWrapping;
    waterMat.map = flowTexture;

    // One continuous curved watercourse, with a soft stone edge beneath it.
    const riverGroup = new THREE.Group();
    const riverPath = new THREE.CatmullRomCurve3([
      new THREE.Vector3(1.6, 0, -2.0),
      new THREE.Vector3(1.6, 0, -0.4),
      new THREE.Vector3(2.5, 0, 0.9),
      new THREE.Vector3(4.1, 0, 2.0),
      new THREE.Vector3(4.9, 0, 3.2),
      new THREE.Vector3(5.7, 0, 4.25),
      new THREE.Vector3(7.4, 0, 5.65)
    ], false, 'catmullrom', 0.22);
    function createRiverRibbon(width, y) {
      const segments = 72;
      const positions = new Float32Array((segments + 1) * 2 * 3);
      const uvs = new Float32Array((segments + 1) * 2 * 2);
      const indices = [];
      for (let i = 0; i <= segments; i++) {
        const t = i / segments;
        const center = riverPath.getPointAt(t);
        const tangent = riverPath.getTangentAt(t).normalize();
        const px = -tangent.z, pz = tangent.x;
        const halfWidth = width * (0.86 + 0.14 * Math.sin(Math.PI * t));
        const left = i * 6, uv = i * 4;
        positions[left] = center.x + px * halfWidth / 2;
        positions[left + 1] = y;
        positions[left + 2] = center.z + pz * halfWidth / 2;
        positions[left + 3] = center.x - px * halfWidth / 2;
        positions[left + 4] = y;
        positions[left + 5] = center.z - pz * halfWidth / 2;
        uvs[uv] = t * 8; uvs[uv + 1] = 0;
        uvs[uv + 2] = t * 8; uvs[uv + 3] = 1;
        if (i < segments) {
          const a = i * 2;
          indices.push(a, a + 2, a + 1, a + 1, a + 2, a + 3);
        }
      }
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
      geometry.setIndex(indices);
      geometry.computeVertexNormals();
      return geometry;
    }
    const bank = new THREE.Mesh(createRiverRibbon(1.74, 0.385), createCobbleMaterial(3, 2));
    bank.receiveShadow = true;
    riverGroup.add(bank);
    const riverWater = new THREE.Mesh(createRiverRibbon(1.34, 0.405), waterMat);
    riverWater.userData.isWater = true;
    riverWater.receiveShadow = true;
    riverGroup.add(riverWater);
    riverMesh = riverGroup;
    islandGroup.add(riverGroup);

    // Arched Stone Footbridge crossing the river at (3.1, 0.38, 1.1)
    const bridge = new THREE.Group();
    bridge.position.set(3.1, 0.38, 1.1);
    bridge.rotation.y = 0.98;

    const cobbleMat = createCobbleMaterial(2, 1);
    const archShape = new THREE.Shape();
    archShape.moveTo(-1.15, 0.14);
    archShape.quadraticCurveTo(0, 0.47, 1.15, 0.14);
    archShape.lineTo(1.15, 0.02);
    archShape.quadraticCurveTo(0, 0.3, -1.15, 0.02);
    archShape.closePath();
    const deck = new THREE.Mesh(new THREE.ExtrudeGeometry(archShape, { depth: 1.25, bevelEnabled: false, curveSegments: 12 }), cobbleMat);
    deck.position.set(0, 0, -0.625);
    deck.castShadow = true;
    deck.receiveShadow = true;
    bridge.add(deck);

    // Side stone parapets with posts
    [-0.56, 0.56].forEach(zOff => {
      const parapet = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.36, 0.12), stoneCorniceMat);
      parapet.position.set(0, 0.44, zOff);
      parapet.castShadow = true;
      bridge.add(parapet);

      [-1.08, 0, 1.08].forEach(xOff => {
        const pillar = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.48, 0.2), stoneCorniceMat);
        pillar.position.set(xOff, 0.48, zOff);
        pillar.castShadow = true;
        bridge.add(pillar);
      });
    });

    islandGroup.add(bridge);
  }

  // ─── Cobblestone Roads & Plazas ────────────────────────────────────────────
  function buildCobblestoneRoads() {
    const cobbleMat = createCobbleMaterial(8, 2);
    const plazaMat = createCobbleMaterial(4, 4);

    // Central plaza in front of AI & Legal NLP HQ
    const mainPlaza = new THREE.Mesh(new THREE.CylinderGeometry(3.0, 3.05, 0.06, 32), plazaMat);
    mainPlaza.position.set(-0.2, 0.37, 1.4);
    mainPlaza.receiveShadow = true;
    islandGroup.add(mainPlaza);

    const paths = [
      // Avenue from HQ Plaza to BGU Hall & IDF terrace
      { x: -2.2, y: 0.37, z: -1.8, w: 1.3, l: 5.6, rot: 0.48 },
      // Path extending into BGU Upper Courtyard
      { x: -3.8, y: 0.37, z: -4.4, w: 1.2, l: 3.4, rot: 0.32 },
      // Avenue from HQ Plaza to Builder's Tech Hub
      { x: -3.8, y: 0.37, z: 0.8, w: 1.2, l: 5.6, rot: 1.42 },
      // Avenue from HQ Plaza to Streetball Court
      { x: -2.8, y: 0.37, z: 3.8, w: 1.2, l: 5.0, rot: 0.72 },
      // Avenue across Stone Bridge to Puppy Haven & Dairy Barn
      { x: 3.2, y: 0.37, z: 1.0, w: 1.2, l: 6.4, rot: -1.2 },
      // Path from Bridge to Dairy Barn
      { x: 5.4, y: 0.37, z: -1.8, w: 1.15, l: 5.2, rot: -0.28 },
      // Path leading south to the Coastal Pier and Water Descent
      { x: 4.8, y: 0.37, z: 3.8, w: 1.2, l: 4.2, rot: 0.42 }
    ];

    paths.forEach(p => {
      const road = new THREE.Mesh(new THREE.BoxGeometry(p.w, 0.06, p.l), cobbleMat);
      road.position.set(p.x, p.y, p.z);
      road.rotation.y = p.rot;
      road.receiveShadow = true;
      islandGroup.add(road);

      // Stone curb edges
      [-p.w / 2 - 0.05, p.w / 2 + 0.05].forEach(cOff => {
        const curb = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, p.l), stoneCorniceMat);
        curb.position.set(
          p.x + Math.cos(p.rot) * cOff,
          p.y + 0.01,
          p.z - Math.sin(p.rot) * cOff
        );
        curb.rotation.y = p.rot;
        islandGroup.add(curb);
      });
    });

    // Stone park benches along the cobblestone avenues
    const benchMat = new THREE.MeshStandardMaterial({ color: 0x78716C, roughness: 0.75 });
    const benchWood = new THREE.MeshStandardMaterial({ color: 0x92400E, roughness: 0.8 });
    [[-1.8, 0.37, 2.6, 0.48], [1.0, 0.37, 2.4, -0.3], [-4.2, 0.37, 2.2, 1.2]].forEach(([bx, by, bz, brot]) => {
      const bench = new THREE.Group();
      bench.position.set(bx, by, bz);
      bench.rotation.y = brot;
      [-0.075, 0, 0.075].forEach(z => {
        const slat = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.045, 0.065), benchWood);
        slat.position.set(0, 0.25, z);
        slat.castShadow = true;
        bench.add(slat);
      });
      [-0.28, -0.18, -0.08].forEach(y => {
        const slat = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.06, 0.045), benchWood);
        slat.position.set(0, 0.44 + y, -0.105);
        slat.castShadow = true;
        bench.add(slat);
      });
      [-0.3, 0.3].forEach(x => {
        const leg = new THREE.Mesh(new THREE.BoxGeometry(0.045, 0.27, 0.28), benchMat);
        leg.position.set(x, 0.12, 0);
        bench.add(leg);
        const backSupport = new THREE.Mesh(new THREE.BoxGeometry(0.045, 0.48, 0.04), benchMat);
        backSupport.position.set(x, 0.36, -0.12);
        bench.add(backSupport);
      });
      islandGroup.add(bench);
    });
  }

  function registerInteractive(group, landmarkId) {
    group.userData.landmarkId = landmarkId;
    group.userData.baseY = group.position.y;
    group.userData.baseScale = 1.0;
    landmarkGroups[landmarkId] = group;
    group.traverse(child => {
      if (child.isMesh) {
        child.userData.landmarkId = landmarkId;
        interactiveTargets.push(child);
      }
    });
  }

  // Invisible hit volumes preserve the site's hover labels, focus camera, and
  // landmark dialogs while the visible architecture comes from the Blender GLB.
  function registerBlenderLandmarkHotspots() {
    const spots = [
      ['research_hq', -0.2, 1.2, 4.1, 4.6, 3.3, 4.8],
      ['bgu_campus', -4.2, -5.4, 4.3, 4.8, 3.0, 4.4],
      ['tech_hub', -7.4, -0.4, 3.5, 4.0, 3.0, 3.8],
      ['dairy_barn', 6.4, -2.7, 4.8, 3.2, 4.3, 2.8],
      ['puppy_haven', 6.2, 2.3, 4.6, 3.8, 4.6, 2.6],
      ['idf_outpost', 1.4, -6.6, 2.5, 5.6, 2.5, 5.5],
      ['coastal_pier', 4.4, 9.0, 2.1, 3.0, 5.4, 2.7],
      ['basketball_court', -5.6, 5.4, 3.8, 1.4, 2.8, 1.5]
    ];
    const invisible = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false, side: THREE.DoubleSide });
    spots.forEach(([id, x, z, width, height, depth, labelHeight]) => {
      const group = new THREE.Group();
      group.position.set(x, 0.36, z);
      const proxy = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), invisible);
      proxy.position.y = height / 2;
      proxy.castShadow = false;
      proxy.receiveShadow = false;
      group.add(proxy);
      islandGroup.add(group);
      registerInteractive(group, id);
      group.userData.labelOffset = new THREE.Vector3(0, labelHeight, 0);
    });
  }

  // ─── 1. Foreground Centerpiece: AI & Legal NLP HQ (Google DeepMind style) ──
  function buildResearchHQ() {
    const group = new THREE.Group();
    group.position.set(-0.2, 0.36, 1.2);
    group.rotation.y = 0.18;

    const brickMat = createBrickMaterial('#8C4A32', '#E2DDD5', 4, 3);
    const roofMat = createRoofShingleMaterial('#334155', 4, 4);

    // Stone foundation plinth
    const plinth = new THREE.Mesh(new THREE.BoxGeometry(3.7, 0.32, 2.7), stoneCorniceMat);
    plinth.position.y = 0.16;
    plinth.castShadow = true;
    plinth.receiveShadow = true;
    group.add(plinth);

    // 3-story main brick facade block
    const bodyW = 3.5;
    const bodyH = 2.85;
    const bodyD = 2.5;
    const body = new THREE.Mesh(new THREE.BoxGeometry(bodyW, bodyH, bodyD), brickMat);
    body.position.y = 0.32 + bodyH / 2;
    body.castShadow = true;
    body.receiveShadow = true;
    group.add(body);

    // Stone cornices separating Floor 1, Floor 2, Floor 3, and Roof Crown
    [1.18, 2.08, 3.18].forEach((yPos, idx) => {
      const overhang = idx === 2 ? 0.22 : 0.12;
      const cornice = new THREE.Mesh(
        new THREE.BoxGeometry(bodyW + overhang, idx === 2 ? 0.16 : 0.1, bodyD + overhang),
        stoneCorniceMat
      );
      cornice.position.y = yPos;
      cornice.castShadow = true;
      group.add(cornice);
    });

    // Flat roof terrace with dark slate deck & parapet wall
    const roofDeck = new THREE.Mesh(new THREE.BoxGeometry(bodyW - 0.1, 0.1, bodyD - 0.1), roofMat);
    roofDeck.position.y = 3.25;
    group.add(roofDeck);

    // Rooftop garden planters (like the greenery on top of the DeepMind building in acrokat!)
    const p1 = createPlanterBox(1.3, 0.42);
    p1.position.set(-0.9, 3.28, 0.85);
    group.add(p1);

    const p2 = createPlanterBox(1.3, 0.42);
    p2.position.set(0.9, 3.28, 0.85);
    group.add(p2);

    const p3 = createPlanterBox(1.2, 0.42);
    p3.position.set(-0.9, 3.28, -0.85);
    group.add(p3);

    // Glass AI skylight atrium on roof
    const skylight = new THREE.Mesh(
      new THREE.BoxGeometry(1.3, 0.45, 0.95),
      glassWarmLitMat
    );
    skylight.position.set(0.6, 3.5, -0.2);
    group.add(skylight);

    // Multi-pane windows across all 3 floors (Front, Back, Left, Right)
    const floorYs = [0.76, 1.64, 2.58];
    const colXs = [-1.2, -0.4, 0.4, 1.2];
    floorYs.forEach((fy, fIdx) => {
      colXs.forEach((cx, cIdx) => {
        // Skip ground floor center for grand entrance doors
        if (fIdx === 0 && (cIdx === 1 || cIdx === 2)) return;
        const isLit = (fIdx + cIdx) % 2 === 0 || (fIdx === 1 && cIdx === 2);
        const winFront = createMultiPaneWindow(0.54, 0.64, isLit, false);
        winFront.position.set(cx, fy, bodyD / 2 + 0.03);
        group.add(winFront);

        const winBack = createMultiPaneWindow(0.54, 0.64, !isLit, false);
        winBack.position.set(cx, fy, -bodyD / 2 - 0.03);
        winBack.rotation.y = Math.PI;
        group.add(winBack);
      });

      // Side facade windows
      [-0.65, 0.65].forEach((cz, sIdx) => {
        const winLeft = createMultiPaneWindow(0.54, 0.64, (fIdx + sIdx) % 2 === 0, false);
        winLeft.position.set(-bodyW / 2 - 0.03, fy, cz);
        winLeft.rotation.y = -Math.PI / 2;
        group.add(winLeft);

        const winRight = createMultiPaneWindow(0.54, 0.64, (fIdx + sIdx) % 2 === 1, false);
        winRight.position.set(bodyW / 2 + 0.03, fy, cz);
        winRight.rotation.y = Math.PI / 2;
        group.add(winRight);
      });
    });

    // Grand Entrance Portico & Double Glass Doors
    const portico = new THREE.Mesh(new THREE.BoxGeometry(1.45, 0.95, 0.28), stoneCorniceMat);
    portico.position.set(0, 0.75, bodyD / 2 + 0.12);
    group.add(portico);

    const doorFrame = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.78, 0.32), frameMatDark);
    doorFrame.position.set(0, 0.68, bodyD / 2 + 0.13);
    group.add(doorFrame);

    const doorGlass = new THREE.Mesh(new THREE.BoxGeometry(0.96, 0.7, 0.34), glassWarmLitMat);
    doorGlass.position.set(0, 0.68, bodyD / 2 + 0.14);
    group.add(doorGlass);

    // Crisp 3D Signboard above the ground floor portico (like "Google DeepMind" in acrokat.me!)
    const hqSign = createSignBoardMesh(2.25, 0.52, (ctx, w, h) => {
      // Blue & Gold AI Sparkle Icon on left
      ctx.fillStyle = '#1D4ED8';
      ctx.beginPath();
      ctx.roundRect(24, 22, 74, h - 44, 14);
      ctx.fill();

      ctx.fillStyle = '#FACC15';
      ctx.font = 'bold 46px Georgia, serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('✦', 61, h / 2);

      // Crisp Editorial Title
      ctx.fillStyle = '#0F172A';
      ctx.font = 'bold 40px "Plus Jakarta Sans", Arial, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('AI & Legal NLP', 116, h / 2 - 12);

      ctx.fillStyle = '#2563EB';
      ctx.font = '700 24px "Plus Jakarta Sans", Arial, sans-serif';
      ctx.fillText('Springer · AI & Law Lab', 116, h / 2 + 24);
    });
    hqSign.position.set(0, 1.24, bodyD / 2 + 0.24);
    group.add(hqSign);

    // Fabric canopy awnings over ground-floor windows
    const awningMat = new THREE.MeshStandardMaterial({ color: 0x1E3A8A, roughness: 0.6, side: THREE.DoubleSide });
    [-1.2, 1.2].forEach(ax => {
      const awning = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.04, 0.32), awningMat);
      awning.position.set(ax, 1.12, bodyD / 2 + 0.18);
      awning.rotation.x = -0.15;
      awning.castShadow = true;
      group.add(awning);
    });

    // Front entrance planters
    const epL = createPlanterBox(0.75, 0.38);
    epL.position.set(-1.15, 0.32, bodyD / 2 + 0.28);
    group.add(epL);

    const epR = createPlanterBox(0.75, 0.38);
    epR.position.set(1.15, 0.32, bodyD / 2 + 0.28);
    group.add(epR);

    registerInteractive(group, 'research_hq');
    islandGroup.add(group);
  }

  // ─── 2. Ben-Gurion University Hall (University of Michigan style) ──────────
  function buildBGUHall() {
    const group = new THREE.Group();
    group.position.set(-4.2, 0.36, -5.4);
    group.rotation.y = 0.32;

    const sandstoneBrick = createBrickMaterial('#C89D70', '#EFECE6', 4, 3);
    const slateRoofMat = createRoofShingleMaterial('#293548', 5, 3);

    // Stone steps & foundation
    const base = new THREE.Mesh(new THREE.BoxGeometry(4.0, 0.3, 2.5), stoneCorniceMat);
    base.position.y = 0.15;
    base.castShadow = true;
    base.receiveShadow = true;
    group.add(base);

    // Main 2.5-story Academic Hall
    const hallW = 3.7;
    const hallH = 2.15;
    const hallD = 2.2;
    const hall = new THREE.Mesh(new THREE.BoxGeometry(hallW, hallH, hallD), sandstoneBrick);
    hall.position.y = 0.3 + hallH / 2;
    hall.castShadow = true;
    hall.receiveShadow = true;
    group.add(hall);

    // Stone belt courses
    [1.25, 2.42].forEach(y => {
      const belt = new THREE.Mesh(new THREE.BoxGeometry(hallW + 0.16, 0.11, hallD + 0.16), stoneCorniceMat);
      belt.position.y = y;
      group.add(belt);
    });

    // Twin corner collegiate towers (like Michigan hall in acrokat.me)
    [-1.48, 1.48].forEach(tx => {
      const tower = new THREE.Mesh(new THREE.BoxGeometry(0.88, 2.65, 2.38), sandstoneBrick);
      tower.position.set(tx, 0.3 + 2.65 / 2, 0);
      tower.castShadow = true;
      group.add(tower);

      const spire = new THREE.Mesh(new THREE.ConeGeometry(0.68, 1.05, 4), slateRoofMat);
      spire.position.set(tx, 0.3 + 2.65 + 0.52, 0);
      spire.rotation.y = Math.PI / 4;
      spire.castShadow = true;
      group.add(spire);
    });

    // Pitched Gable Roof over the main hall
    const roofPrism = new THREE.Mesh(new THREE.ConeGeometry(2.15, 1.1, 4), slateRoofMat);
    roofPrism.scale.set(1.35, 1, 0.85);
    roofPrism.rotation.y = Math.PI / 4;
    roofPrism.position.y = 2.98;
    roofPrism.castShadow = true;
    group.add(roofPrism);

    // Multi-pane windows across BGU Hall
    [0.82, 1.78].forEach((wy, fIdx) => {
      [-1.48, -0.62, 0.62, 1.48].forEach((wx, cIdx) => {
        const win = createMultiPaneWindow(0.48, 0.62, (fIdx + cIdx) % 2 === 0, false);
        win.position.set(wx, wy, hallD / 2 + 0.12);
        group.add(win);
      });
    });

    // Grand Double Wooden Doors with stone archway
    const arch = new THREE.Mesh(new THREE.BoxGeometry(0.95, 1.05, 0.25), stoneCorniceMat);
    arch.position.set(0, 0.8, hallD / 2 + 0.08);
    group.add(arch);

    const woodDoor = new THREE.Mesh(
      new THREE.BoxGeometry(0.72, 0.86, 0.28),
      new THREE.MeshStandardMaterial({ color: 0x5C3A21, roughness: 0.7 })
    );
    woodDoor.position.set(0, 0.74, hallD / 2 + 0.1);
    group.add(woodDoor);

    // Prominent Rooftop 3D Crest Signboard ("BGU · M.Sc. 92" like the blue/yellow "M" on Michigan!)
    const bguSign = createSignBoardMesh(1.9, 0.62, (ctx, w, h) => {
      ctx.fillStyle = '#0F2942';
      ctx.fillRect(10, 10, w - 20, h - 20);

      // BGU's orange emblem, paired with a small white flame mark.
      ctx.fillStyle = '#F07832';
      ctx.beginPath();
      ctx.arc(62, h / 2, 39, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.moveTo(62, h / 2 + 25);
      ctx.bezierCurveTo(35, h / 2 + 2, 58, h / 2 - 4, 54, h / 2 - 26);
      ctx.bezierCurveTo(78, h / 2 - 9, 89, h / 2 + 13, 62, h / 2 + 25);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(61, h / 2 + 13);
      ctx.bezierCurveTo(52, h / 2 + 2, 62, h / 2 - 3, 65, h / 2 - 14);
      ctx.bezierCurveTo(77, h / 2 - 1, 72, h / 2 + 10, 61, h / 2 + 13);
      ctx.fill();

      ctx.fillStyle = '#FFFFFF';
      ctx.font = '800 44px "Plus Jakarta Sans", Arial, sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('BEN-GURION', 114, h / 2 - 16);

      ctx.fillStyle = '#FCD34D';
      ctx.font = '700 25px "Plus Jakarta Sans", Arial, sans-serif';
      ctx.fillText('B.Sc. & M.Sc. (GPA 92)', 114, h / 2 + 24);
    });
    bguSign.position.set(0, 2.85, hallD / 2 + 0.18);
    group.add(bguSign);

    registerInteractive(group, 'bgu_campus');
    islandGroup.add(group);
  }

  // ─── 3. The Builder's Tech Lab (Modern Wood & Steel Pavilion) ─────
  function buildTechHub() {
    const group = new THREE.Group();
    group.position.set(-7.4, 0.36, -0.4);
    group.rotation.y = 0.65;

    const cedarBrick = createBrickMaterial('#B46535', '#78350F', 3, 3);
    const steelMat = new THREE.MeshStandardMaterial({ color: 0x1E293B, roughness: 0.35, metalness: 0.6 });

    // Lower modern architectural wing
    const wing1 = new THREE.Mesh(new THREE.BoxGeometry(2.8, 1.65, 2.1), cedarBrick);
    wing1.position.set(0, 0.825, 0);
    wing1.castShadow = true;
    wing1.receiveShadow = true;
    group.add(wing1);

    // Upper cantilevered glass & steel studio box
    const wing2 = new THREE.Mesh(new THREE.BoxGeometry(2.1, 1.15, 1.85), steelMat);
    wing2.position.set(-0.25, 2.15, -0.05);
    wing2.castShadow = true;
    group.add(wing2);

    // Overhanging flat architectural roof slabs
    const roof1 = new THREE.Mesh(new THREE.BoxGeometry(3.1, 0.14, 2.35), stoneCorniceMat);
    roof1.position.set(0, 1.68, 0);
    roof1.castShadow = true;
    group.add(roof1);

    const roof2 = new THREE.Mesh(new THREE.BoxGeometry(2.35, 0.14, 2.1), stoneCorniceMat);
    roof2.position.set(-0.25, 2.75, -0.05);
    roof2.castShadow = true;
    group.add(roof2);

    // Large floor-to-ceiling curtain wall windows
    [-0.8, 0, 0.8].forEach((wx, idx) => {
      const w1 = createMultiPaneWindow(0.66, 0.95, idx !== 1, true);
      w1.position.set(wx, 0.88, 1.07);
      group.add(w1);
    });

    [-0.65, 0.15].forEach((wx, idx) => {
      const w2 = createMultiPaneWindow(0.68, 0.72, true, true);
      w2.position.set(wx, 2.18, 0.9);
      group.add(w2);
    });

    // Neutral Tech/Engineering Signboard
    const techSign = createSignBoardMesh(2.05, 0.55, (ctx, w, h) => {
      // GitHub mark on a quiet rounded tile.
      ctx.fillStyle = '#F1F5F9';
      ctx.beginPath();
      ctx.roundRect(18, h / 2 - 42, 82, 84, 14);
      ctx.fill();
      drawGitHubMark(ctx, 59, h / 2, 54, '#172033');

      ctx.fillStyle = '#0F172A';
      ctx.font = '800 38px "Plus Jakarta Sans", Arial, sans-serif';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.fillText('Builder’s Lab', 105, h / 2 - 12);

      ctx.fillStyle = '#0284C7';
      ctx.font = '700 23px "Plus Jakarta Sans", Arial, sans-serif';
      ctx.fillText('6.4M Docs · Speech & RL', 105, h / 2 + 22);
    });
    techSign.position.set(0.15, 1.98, 1.08);
    group.add(techSign);

    // Rooftop terrace planter
    const tp = createPlanterBox(0.9, 0.4);
    tp.position.set(0.95, 1.75, 0.5);
    group.add(tp);

    registerInteractive(group, 'tech_hub');
    islandGroup.add(group);
  }

  // ─── 4. The Heritage Dairy Barn (Timber, Silo & Paddock) ──────────────────
  function buildDairyBarn() {
    const group = new THREE.Group();
    group.position.set(6.6, 0.36, -4.0);
    group.rotation.y = -0.38;

    // Warm timber siding, with individually shaded vertical boards.
    const woodCanvas = document.createElement('canvas');
    woodCanvas.width = 512;
    woodCanvas.height = 512;
    const woodCtx = woodCanvas.getContext('2d');
    woodCtx.fillStyle = '#A65F37';
    woodCtx.fillRect(0, 0, 512, 512);
    for (let x = 0; x < 512; x += 32) {
      woodCtx.fillStyle = x % 64 === 0 ? '#B87246' : '#99542F';
      woodCtx.fillRect(x, 0, 29, 512);
      woodCtx.fillStyle = 'rgba(244,202,156,0.16)';
      woodCtx.fillRect(x + 3, 0, 2, 512);
      woodCtx.fillStyle = 'rgba(58,31,22,0.18)';
      woodCtx.fillRect(x + 28, 0, 4, 512);
    }
    const woodTex = new THREE.CanvasTexture(woodCanvas);
    woodTex.wrapS = THREE.RepeatWrapping;
    woodTex.wrapT = THREE.RepeatWrapping;
    woodTex.repeat.set(2, 1);
    const redBarnMat = new THREE.MeshStandardMaterial({ map: woodTex, color: 0xE6C0A0, roughness: 0.9, bumpMap: woodTex, bumpScale: 0.025 });
    const roofShingle = createRoofShingleMaterial('#3F3F46', 4, 3);

    // A broad, low timber dairy barn with a clear gable roof.
    const barn = new THREE.Mesh(new THREE.BoxGeometry(3.5, 1.8, 2.55), redBarnMat);
    barn.position.y = 0.9;
    barn.castShadow = true;
    barn.receiveShadow = true;
    group.add(barn);

    const roofLeft = new THREE.Mesh(new THREE.BoxGeometry(1.96, 0.14, 2.82), roofShingle);
    roofLeft.position.set(-0.82, 2.2, 0);
    roofLeft.rotation.z = 0.38;
    roofLeft.castShadow = true;
    group.add(roofLeft);
    const roofRight = new THREE.Mesh(new THREE.BoxGeometry(1.96, 0.14, 2.82), roofShingle);
    roofRight.position.set(0.82, 2.2, 0);
    roofRight.rotation.z = -0.38;
    roofRight.castShadow = true;
    group.add(roofRight);

    const gableShape = new THREE.Shape();
    gableShape.moveTo(-1.76, 1.78);
    gableShape.lineTo(1.76, 1.78);
    gableShape.lineTo(0, 2.56);
    gableShape.closePath();
    const gable = new THREE.Mesh(new THREE.ShapeGeometry(gableShape), new THREE.MeshStandardMaterial({ color: 0xA65F37, roughness: 0.88, side: THREE.DoubleSide }));
    gable.position.z = 1.286;
    gable.castShadow = true;
    group.add(gable);

    // Wide double doors and a small loft window make the barn read at a glance.
    const door = new THREE.Mesh(new THREE.BoxGeometry(1.14, 1.16, 0.08), new THREE.MeshStandardMaterial({ color: 0x5E3827, roughness: 0.84 }));
    door.position.set(0, 0.61, 1.33);
    group.add(door);
    const doorSeam = new THREE.Mesh(new THREE.BoxGeometry(0.035, 1.08, 0.02), new THREE.MeshStandardMaterial({ color: 0x3D2B24, roughness: 0.86 }));
    doorSeam.position.set(0, 0.61, 1.38);
    group.add(doorSeam);
    const loftWindow = createMultiPaneWindow(0.52, 0.38, false, false);
    loftWindow.position.set(0, 2.08, 1.31);
    group.add(loftWindow);

    // Side windows
    [-0.55, 0.55].forEach(zOff => {
      const sw = createMultiPaneWindow(0.46, 0.48, true, false);
      sw.position.set(-1.34, 0.95, zOff);
      sw.rotation.y = -Math.PI / 2;
      group.add(sw);
    });

    // Compact corrugated feed silo with a service ladder.
    const siloMat = new THREE.MeshStandardMaterial({ color: 0xAEB9B7, roughness: 0.52, metalness: 0.34 });
    const silo = new THREE.Mesh(new THREE.CylinderGeometry(0.48, 0.5, 2.35, 32, 1), siloMat);
    silo.position.set(-2.12, 1.18, -0.35);
    silo.castShadow = true;
    group.add(silo);

    const siloDome = new THREE.Mesh(
      new THREE.SphereGeometry(0.49, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2),
      new THREE.MeshStandardMaterial({ color: 0x8D9B9A, roughness: 0.46, metalness: 0.3 })
    );
    siloDome.position.set(-2.12, 2.35, -0.35);
    group.add(siloDome);

    const ladderMat = new THREE.MeshStandardMaterial({ color: 0x4B5B5A, roughness: 0.48, metalness: 0.55 });
    [-2.38, -2.02].forEach(x => {
      const rail = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 1.9, 8), ladderMat);
      rail.position.set(x, 1.1, 0.14);
      group.add(rail);
    });
    for (let rung = 0; rung < 8; rung++) {
      const step = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.36, 8), ladderMat);
      step.rotation.z = Math.PI / 2;
      step.position.set(-2.2, 0.28 + rung * 0.23, 0.14);
      group.add(step);
    }

    // A roomy timber paddock with a clear gate, rails, and room for the herd.
    const fenceMat = new THREE.MeshStandardMaterial({ color: 0xE7D8B8, roughness: 0.82 });
    const fencePostXs = [0.65, 1.55, 2.45, 3.35, 4.25];
    const fencePostZs = [0.45, 1.3, 2.15, 3.0, 3.75];
    fencePostXs.forEach(x => [0.45, 3.75].forEach(z => {
      const post = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.58, 0.11), fenceMat);
      post.position.set(x, 0.29, z);
      post.castShadow = true;
      group.add(post);
    }));
    fencePostZs.forEach(z => [0.65, 4.25].forEach(x => {
      const post = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.58, 0.11), fenceMat);
      post.position.set(x, 0.29, z);
      post.castShadow = true;
      group.add(post);
    }));
    const fenceRailMat = new THREE.MeshStandardMaterial({ color: 0x9A6A43, roughness: 0.88 });
    [0.2, 0.44].forEach(y => {
      // Leave the middle of the front rail open as a small gate.
      [[1.48, 0.45, 1.62], [3.58, 0.45, 1.34], [2.45, 3.75, 3.62]].forEach(([x, z, length]) => {
        const rail = new THREE.Mesh(new THREE.BoxGeometry(length, 0.065, 0.055), fenceRailMat);
        rail.position.set(x, y, z);
        group.add(rail);
      });
      [0.65, 4.25].forEach(x => {
        const rail = new THREE.Mesh(new THREE.BoxGeometry(0.055, 0.065, 3.3), fenceRailMat);
        rail.position.set(x, y, 2.1);
        group.add(rail);
      });
    });

    // Smooth low-poly Holsteins with modeled heads, markings, hooves and ears.
    function makeCow(cx, cz, rotY) {
      const cow = new THREE.Group();
      cow.position.set(cx, 0, cz);
      cow.rotation.y = rotY;
      const white = new THREE.MeshStandardMaterial({ color: 0xF6F1E7, roughness: 0.86 });
      const black = new THREE.MeshStandardMaterial({ color: 0x26302F, roughness: 0.9 });
      const pink = new THREE.MeshStandardMaterial({ color: 0xD9918A, roughness: 0.8 });
      const hoof = new THREE.MeshStandardMaterial({ color: 0x4A3930, roughness: 0.9 });
      const body = new THREE.Mesh(new THREE.SphereGeometry(0.43, 18, 12), white);
      body.scale.set(1.28, 0.82, 0.78);
      body.position.set(0, 0.52, 0);
      body.castShadow = true;
      cow.add(body);

      [[-0.26, 0.58, 0.28, 0.23, 0.23, 0.08], [0.08, 0.65, 0.28, 0.21, 0.14, 0.08], [-0.1, 0.48, -0.28, 0.25, 0.2, 0.07], [0.32, 0.46, -0.27, 0.17, 0.17, 0.07]].forEach(([x, y, z, sx, sy, sz]) => {
        const patch = new THREE.Mesh(new THREE.SphereGeometry(1, 12, 8), black);
        patch.scale.set(sx, sy, sz);
        patch.position.set(x, y, z);
        cow.add(patch);
      });

      const neck = new THREE.Mesh(new THREE.SphereGeometry(0.26, 14, 10), white);
      neck.scale.set(0.72, 1.18, 0.78);
      neck.position.set(0.4, 0.62, 0);
      neck.rotation.z = -0.32;
      cow.add(neck);
      const head = new THREE.Mesh(new THREE.SphereGeometry(0.25, 16, 12), white);
      head.scale.set(0.9, 1.0, 0.82);
      head.position.set(0.63, 0.75, 0);
      head.castShadow = true;
      cow.add(head);
      const muzzle = new THREE.Mesh(new THREE.SphereGeometry(0.14, 14, 10), pink);
      muzzle.scale.set(1.15, 0.72, 1.0);
      muzzle.position.set(0.82, 0.62, 0);
      cow.add(muzzle);
      [-1, 1].forEach(side => {
        const ear = new THREE.Mesh(new THREE.SphereGeometry(0.1, 10, 8), black);
        ear.scale.set(1.4, 0.55, 0.72);
        ear.position.set(0.51, 0.9, side * 0.2);
        ear.rotation.y = side * 0.35;
        cow.add(ear);
        const eye = new THREE.Mesh(new THREE.SphereGeometry(0.025, 8, 6), hoof);
        eye.position.set(0.73, 0.78, side * 0.19);
        cow.add(eye);
      });

      [[-0.34, -0.18], [-0.34, 0.18], [0.32, -0.18], [0.32, 0.18]].forEach(([x, z]) => {
        const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.05, 0.31, 10), white);
        leg.position.set(x, 0.19, z);
        leg.castShadow = true;
        cow.add(leg);
        const foot = new THREE.Mesh(new THREE.CylinderGeometry(0.058, 0.06, 0.085, 10), hoof);
        foot.position.set(x, 0.045, z);
        cow.add(foot);
      });
      const udder = new THREE.Mesh(new THREE.SphereGeometry(0.105, 12, 8), pink);
      udder.scale.set(1.1, 0.55, 0.95);
      udder.position.set(-0.1, 0.27, 0);
      cow.add(udder);
      const tail = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.035, 0.38, 8), white);
      tail.position.set(-0.54, 0.61, 0);
      tail.rotation.z = -0.46;
      cow.add(tail);
      const tailTip = new THREE.Mesh(new THREE.SphereGeometry(0.045, 8, 6), black);
      tailTip.position.set(-0.68, 0.43, 0);
      cow.add(tailTip);
      return cow;
    }

    const cows = [makeCow(1.72, 1.25, 0.35), makeCow(3.05, 2.8, -0.65), makeCow(3.55, 1.55, 1.15)];
    animCows.push(...cows);
    group.add(...cows);

    // A simple wooden feed rack helps the pasture feel lived in.
    const rackWood = new THREE.MeshStandardMaterial({ color: 0x795539, roughness: 0.88 });
    const feedTrough = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.16, 0.24), rackWood);
    feedTrough.position.set(2.48, 0.34, 0.78);
    feedTrough.castShadow = true;
    group.add(feedTrough);
    [-0.38, 0.38].forEach(x => {
      const leg = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.34, 0.07), rackWood);
      leg.position.set(2.48 + x, 0.17, 0.78);
      group.add(leg);
    });

    registerInteractive(group, 'dairy_barn');
    islandGroup.add(group);
  }

  // ─── 5. Guide-Dog Puppy Haven (Kennel + Yard & Realistic Golden Retriever) ─
  function buildPuppyHaven() {
    const group = new THREE.Group();
    group.position.set(6.5, 0.36, 1.2);
    group.rotation.y = -0.55;

    const woodDark = new THREE.MeshStandardMaterial({ color: 0x92400E, roughness: 0.82 });
    const woodLight = new THREE.MeshStandardMaterial({ color: 0xB45309, roughness: 0.78 });
    const roofMat = createRoofShingleMaterial('#C2410C', 3, 2);

    // ── Doghouse / Kennel ──
    const houseBase = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.95, 1.0), woodLight);
    houseBase.position.set(0, 0.475, 0);
    houseBase.castShadow = true;
    houseBase.receiveShadow = true;
    group.add(houseBase);

    // Gabled roof
    const roofL = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.06, 0.58), roofMat);
    roofL.position.set(0, 0.99, -0.24);
    roofL.rotation.x = -0.42;
    roofL.castShadow = true;
    group.add(roofL);
    const roofR = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.06, 0.58), roofMat);
    roofR.position.set(0, 0.99, 0.24);
    roofR.rotation.x = 0.42;
    roofR.castShadow = true;
    group.add(roofR);
    const ridge = new THREE.Mesh(new THREE.BoxGeometry(1.3, 0.08, 0.08), new THREE.MeshStandardMaterial({ color: 0x7C2D12, roughness: 0.7 }));
    ridge.position.set(0, 1.22, 0);
    group.add(ridge);

    // Arch entrance
    const archBg = new THREE.Mesh(new THREE.BoxGeometry(0.52, 0.62, 0.12), woodDark);
    archBg.position.set(0, 0.34, 0.52);
    group.add(archBg);
    const archHole = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.14, 12, 1, true, Math.PI, Math.PI),
      new THREE.MeshStandardMaterial({ color: 0x1E293B }));
    archHole.rotation.z = Math.PI / 2;
    archHole.position.set(0, 0.52, 0.52);
    group.add(archHole);

    // Nameplate
    const plate = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.18, 0.05),
      new THREE.MeshStandardMaterial({ color: 0xFCD34D, roughness: 0.4 }));
    plate.position.set(0, 0.88, 0.52);
    group.add(plate);

    // ── Small fenced garden yard ──
    const yardLawn = new THREE.Mesh(
      new THREE.PlaneGeometry(1.62, 1.05),
      new THREE.MeshStandardMaterial({ color: 0x72A861, roughness: 0.98 })
    );
    yardLawn.rotation.x = -Math.PI / 2;
    yardLawn.position.set(0, 0.018, 1.95);
    yardLawn.receiveShadow = true;
    group.add(yardLawn);
    const fenceMatW = new THREE.MeshStandardMaterial({ color: 0xF5F5F4, roughness: 0.75 });
    const yardPosts = [
      [-0.82, 1.4], [0.82, 1.4], [-0.82, 2.5], [0.82, 2.5], [0, 2.5]
    ];
    yardPosts.forEach(([px, pz]) => {
      const p = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.48, 0.08), fenceMatW);
      p.position.set(px, 0.24, pz);
      p.castShadow = true;
      group.add(p);
    });
    const rail1 = new THREE.Mesh(new THREE.BoxGeometry(1.68, 0.06, 0.06), fenceMatW);
    rail1.position.set(0, 0.35, 2.5);
    group.add(rail1);
    const rail2 = new THREE.Mesh(new THREE.BoxGeometry(1.68, 0.06, 0.06), fenceMatW);
    rail2.position.set(0, 0.16, 2.5);
    group.add(rail2);
    [0.2, 0.35].forEach(y => [-0.82, 0.82].forEach(px => {
      const side = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, 1.14), fenceMatW);
      side.position.set(px, y, 1.95);
      group.add(side);
    }));

    // Water bowl
    const bowl = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.09, 0.08, 10),
      new THREE.MeshStandardMaterial({ color: 0x94A3B8, roughness: 0.3, metalness: 0.5 }));
    bowl.position.set(0.45, 0.04, 1.8);
    group.add(bowl);
    const water = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.03, 10),
      new THREE.MeshStandardMaterial({ color: 0x38BDF8, roughness: 0.1 }));
    water.position.set(0.45, 0.07, 1.8);
    group.add(water);

    // ── Realistic Golden Retriever (more organic shapes) ──
    const puppy = new THREE.Group();
    puppy.position.set(0.2, 0, 1.9);
    puppy.rotation.y = -1.0;

    const goldenMat = new THREE.MeshStandardMaterial({ color: 0xD97706, roughness: 0.6 });
    const goldenLightMat = new THREE.MeshStandardMaterial({ color: 0xFBBF24, roughness: 0.55 });
    const darkMat = new THREE.MeshStandardMaterial({ color: 0x1C1917 });
    const noseMat = new THREE.MeshStandardMaterial({ color: 0x292524, roughness: 0.3 });

    // Body — use sphere for roundness
    const body = new THREE.Mesh(new THREE.SphereGeometry(0.22, 10, 8), goldenMat);
    body.scale.set(1.45, 0.85, 0.9);
    body.position.y = 0.28;
    body.castShadow = true;
    puppy.add(body);

    // Belly lighter patch
    const belly = new THREE.Mesh(new THREE.SphereGeometry(0.16, 8, 6), goldenLightMat);
    belly.scale.set(0.9, 0.65, 0.8);
    belly.position.set(0, 0.22, 0);
    puppy.add(belly);

    // Neck
    const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.13, 0.18, 8), goldenMat);
    neck.position.set(0.28, 0.36, 0);
    neck.rotation.z = -0.5;
    puppy.add(neck);

    // Head
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.16, 10, 8), goldenMat);
    head.scale.set(1.1, 0.95, 1.0);
    head.position.set(0.42, 0.46, 0);
    head.castShadow = true;
    puppy.add(head);

    // Snout
    const snout = new THREE.Mesh(new THREE.SphereGeometry(0.09, 8, 6), goldenLightMat);
    snout.scale.set(1.3, 0.75, 0.9);
    snout.position.set(0.55, 0.42, 0);
    puppy.add(snout);

    // Nose
    const nose = new THREE.Mesh(new THREE.SphereGeometry(0.038, 8, 8), noseMat);
    nose.position.set(0.64, 0.45, 0);
    puppy.add(nose);

    // Eyes
    [-0.07, 0.07].forEach(ez => {
      const eye = new THREE.Mesh(new THREE.SphereGeometry(0.025, 7, 7), darkMat);
      eye.position.set(0.55, 0.5, ez);
      puppy.add(eye);
      const shine = new THREE.Mesh(new THREE.SphereGeometry(0.008, 5, 5),
        new THREE.MeshStandardMaterial({ color: 0xFFFFFF }));
      shine.position.set(0.57, 0.51, ez + 0.01);
      puppy.add(shine);
    });

    // Floppy ears
    [-0.12, 0.12].forEach(ez => {
      const ear = new THREE.Mesh(new THREE.SphereGeometry(0.1, 7, 6), goldenMat);
      ear.scale.set(0.45, 1.1, 0.65);
      ear.position.set(0.37, 0.38, ez * 1.4);
      puppy.add(ear);
    });

    // Blue guide vest
    const vestMat = new THREE.MeshStandardMaterial({ color: 0x1D4ED8, roughness: 0.45 });
    const vest = new THREE.Mesh(new THREE.SphereGeometry(0.18, 8, 6), vestMat);
    vest.scale.set(1.2, 0.8, 0.95);
    vest.position.set(0.04, 0.3, 0);
    puppy.add(vest);

    // Tail — curved cylinder
    const tail = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.045, 0.3, 8), goldenMat);
    tail.position.set(-0.3, 0.38, 0);
    tail.rotation.z = -0.7;
    puppy.add(tail);

    // 4 Legs — rounded cylinders
    [[-0.15, -0.1], [-0.15, 0.1], [0.15, -0.1], [0.15, 0.1]].forEach(([lx, lz]) => {
      const upper = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.05, 0.14, 8), goldenMat);
      upper.position.set(lx, 0.15, lz);
      puppy.add(upper);
      const lower = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.045, 0.12, 8), goldenMat);
      lower.position.set(lx, 0.04, lz);
      puppy.add(lower);
      const paw = new THREE.Mesh(new THREE.SphereGeometry(0.048, 7, 5), goldenLightMat);
      paw.scale.set(1.1, 0.6, 1.2);
      paw.position.set(lx, -0.02, lz);
      puppy.add(paw);
    });

    animPuppy = puppy;
    group.add(puppy);

    registerInteractive(group, 'puppy_haven');
    islandGroup.add(group);
  }

  // ─── 6. Streetball Half-Court (Maccabi / NBA Hardwood, Hoop & Swish Ball) ─
  function buildBasketballCourt() {
    const group = new THREE.Group();
    group.position.set(-5.6, 0.37, 5.4);
    group.rotation.y = 0.42;

    // Court Canvas Texture with crisp painted 3-point arc, free-throw key & center lines
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    // Warm maple hardwood / pro court surface with Royal Blue outer apron
    ctx.fillStyle = '#1E3A8A';
    ctx.fillRect(0, 0, 512, 512);

    ctx.fillStyle = '#EAB308';
    ctx.fillRect(24, 24, 464, 464);

    ctx.fillStyle = '#D97706';
    ctx.fillRect(34, 34, 444, 444);

    // Subtle hardwood plank lines
    ctx.strokeStyle = 'rgba(120, 53, 15, 0.18)';
    ctx.lineWidth = 2;
    for (let x = 34; x < 478; x += 18) {
      ctx.beginPath(); ctx.moveTo(x, 34); ctx.lineTo(x, 478); ctx.stroke();
    }

    // Royal Blue Painted Key (Maccabi / NBA style)
    ctx.fillStyle = '#1D4ED8';
    ctx.fillRect(176, 34, 160, 190);

    // White Court Lines
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 8;
    ctx.strokeRect(34, 34, 444, 444);
    ctx.strokeRect(176, 34, 160, 190);

    // Free-throw circle
    ctx.beginPath();
    ctx.arc(256, 224, 68, 0, Math.PI * 2);
    ctx.stroke();

    // 3-Point Arc
    ctx.beginPath();
    ctx.arc(256, 85, 205, 0.15 * Math.PI, 0.85 * Math.PI);
    ctx.stroke();

    const courtTex = new THREE.CanvasTexture(canvas);
    courtTex.anisotropy = 4;

    const slab = new THREE.Mesh(
      new THREE.BoxGeometry(3.5, 0.1, 3.1),
      new THREE.MeshStandardMaterial({ map: courtTex, roughness: 0.45 })
    );
    slab.position.y = 0.05;
    slab.receiveShadow = true;
    slab.castShadow = true;
    group.add(slab);

    // Pro Stanchion Pole, Tempered Glass Backboard, Breakaway Rim & Net
    const poleMat = new THREE.MeshStandardMaterial({ color: 0x0F172A, metalness: 0.7, roughness: 0.3 });
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.07, 1.95, 12), poleMat);
    pole.position.set(0, 0.98, -1.42);
    pole.castShadow = true;
    group.add(pole);

    const arm = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 0.42), poleMat);
    arm.position.set(0, 1.82, -1.22);
    group.add(arm);

    // Backboard with white frame and red shooter's square
    const board = new THREE.Mesh(
      new THREE.BoxGeometry(1.12, 0.74, 0.05),
      new THREE.MeshStandardMaterial({ color: 0xFFFFFF, roughness: 0.15 })
    );
    board.position.set(0, 1.85, -1.0);
    board.castShadow = true;
    group.add(board);

    const shooterSq = new THREE.Mesh(
      new THREE.BoxGeometry(0.38, 0.28, 0.06),
      new THREE.MeshStandardMaterial({ color: 0xEF4444 })
    );
    shooterSq.position.set(0, 1.76, -0.99);
    group.add(shooterSq);

    // Orange Rim & White Net
    const rim = new THREE.Mesh(
      new THREE.TorusGeometry(0.19, 0.025, 12, 24),
      new THREE.MeshStandardMaterial({ color: 0xEA580C, metalness: 0.4 })
    );
    rim.rotation.x = Math.PI / 2;
    rim.position.set(0, 1.62, -0.78);
    group.add(rim);

    const net = new THREE.Mesh(
      new THREE.CylinderGeometry(0.18, 0.11, 0.28, 14, 2, true),
      new THREE.MeshStandardMaterial({ color: 0xF8FAFC, wireframe: true })
    );
    net.position.set(0, 1.48, -0.78);
    group.add(net);

    // Orange Basketball (animates into the hoop!)
    const ball = new THREE.Mesh(
      new THREE.SphereGeometry(0.15, 20, 20),
      new THREE.MeshStandardMaterial({ color: 0xEA580C, roughness: 0.45 })
    );
    ball.position.set(0.45, 0.26, 0.65);
    ball.castShadow = true;
    animBasketball = ball;
    group.add(ball);

    registerInteractive(group, 'basketball_court');
    islandGroup.add(group);
  }

  // ─── 7. IDF C4I Tactical Comms Outpost (Radar & Blinking Beacon) ──────────
  function buildIDFOutpost() {
    const group = new THREE.Group();
    group.position.set(1.4, 0.36, -6.6);
    group.rotation.y = -0.15;

    const bunkerBrick = createBrickMaterial('#64748B', '#94A3B8', 3, 2);
    const bunker = new THREE.Mesh(new THREE.BoxGeometry(1.9, 1.05, 1.5), bunkerBrick);
    bunker.position.y = 0.525;
    bunker.castShadow = true;
    bunker.receiveShadow = true;
    group.add(bunker);

    const bunkerRoof = new THREE.Mesh(new THREE.BoxGeometry(2.05, 0.12, 1.65), stoneCorniceMat);
    bunkerRoof.position.y = 1.08;
    group.add(bunkerRoof);

    // Lit Tactical Command Windows
    [-0.45, 0.45].forEach(wx => {
      const win = createMultiPaneWindow(0.48, 0.36, true, true);
      win.position.set(wx, 0.65, 0.76);
      group.add(win);
    });

    // Tall Steel Lattice Radio & Radar Tower
    const steelMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.65, roughness: 0.35 });
    const tower = new THREE.Mesh(
      new THREE.CylinderGeometry(0.12, 0.42, 2.85, 4, 4, true),
      new THREE.MeshStandardMaterial({ color: 0x475569, wireframe: true })
    );
    tower.position.set(0, 2.45, -0.1);
    group.add(tower);

    const coreMast = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.07, 3.0, 8), steelMat);
    coreMast.position.set(0, 2.5, -0.1);
    group.add(coreMast);

    // Rotating Parabolic Radar Dish
    const dishGroup = new THREE.Group();
    dishGroup.position.set(0, 3.35, -0.1);
    const dish = new THREE.Mesh(
      new THREE.SphereGeometry(0.38, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.45),
      frameMatWhite
    );
    dish.rotation.x = Math.PI * 0.35;
    dishGroup.add(dish);
    radarDish = dishGroup;
    group.add(dishGroup);

    // Red Aviation Beacon at tip
    beaconMat = new THREE.MeshStandardMaterial({
      color: 0xEF4444,
      emissive: 0xEF4444,
      emissiveIntensity: 1.0
    });
    const beacon = new THREE.Mesh(new THREE.SphereGeometry(0.09, 12, 12), beaconMat);
    beacon.position.set(0, 4.05, -0.1);
    group.add(beacon);

    registerInteractive(group, 'idf_outpost');
    islandGroup.add(group);
  }

  // ─── 8. Coastal Pier, Sandy Beach & Sailboat ──────────────────────────────
  function buildCoastalPier() {
    const group = new THREE.Group();
    group.position.set(4.4, 0.36, 5.7);
    group.rotation.y = -0.35;

    const woodMat = new THREE.MeshStandardMaterial({ color: 0x9A6538, roughness: 0.86 });
    const plankMat = new THREE.MeshStandardMaterial({ color: 0xBB8A55, roughness: 0.88 });
    const pierLength = 4.8;
    const pierWidth = 1.28;

    // A continuous timber walkway leaves the shore and reaches into open water.
    const deck = new THREE.Mesh(new THREE.BoxGeometry(pierWidth, 0.14, pierLength), woodMat);
    deck.position.set(0, 0.15, pierLength / 2 - 0.12);
    deck.castShadow = true;
    deck.receiveShadow = true;
    group.add(deck);

    // Individual deck boards make the pier read clearly at the island's scale.
    for (let z = -0.18; z <= pierLength - 0.12; z += 0.3) {
      const plank = new THREE.Mesh(new THREE.BoxGeometry(pierWidth - 0.04, 0.035, 0.26), plankMat);
      plank.position.set(0, 0.239, z);
      plank.castShadow = true;
      group.add(plank);
    }

    // Heavy piles continue below the deck to the sea surface.
    [0.05, 1.45, 2.9, 4.25].forEach(z => [-0.52, 0.52].forEach(x => {
      const pile = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.09, 1.25, 10), woodMat);
      pile.position.set(x, -0.48, z);
      pile.castShadow = true;
      group.add(pile);
    }));

    // A small moored sailboat floats just off the end of the pier.
    const boat = new THREE.Group();
    boat.position.set(1.12, -0.78, 4.35);
    boat.rotation.y = 0.28;
    const hullMat = new THREE.MeshStandardMaterial({ color: 0xE9E2D4, roughness: 0.55 });
    const hullShape = new THREE.Shape();
    hullShape.moveTo(-0.3, -0.78);
    hullShape.quadraticCurveTo(-0.38, -0.1, -0.28, 0.55);
    hullShape.quadraticCurveTo(0, 0.94, 0.28, 0.55);
    hullShape.quadraticCurveTo(0.38, -0.1, 0.3, -0.78);
    hullShape.quadraticCurveTo(0, -0.92, -0.3, -0.78);
    const hullGeometry = new THREE.ExtrudeGeometry(hullShape, {
      depth: 0.17,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 1,
      bevelSize: 0.035,
      bevelThickness: 0.025
    });
    hullGeometry.rotateX(Math.PI / 2);
    const hull = new THREE.Mesh(hullGeometry, hullMat);
    hull.position.y = 0.16;
    hull.castShadow = true;
    boat.add(hull);

    [-0.29, 0.29].forEach(x => {
      const gunwale = new THREE.Mesh(new THREE.BoxGeometry(0.045, 0.055, 1.55), woodMat);
      gunwale.position.set(x, 0.2, -0.02);
      boat.add(gunwale);
    });
    [-0.35, 0.28].forEach(z => {
      const seat = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.045, 0.12), plankMat);
      seat.position.set(0, 0.18, z);
      boat.add(seat);
    });

    const mast = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.024, 1.55, 8), woodMat);
    mast.position.set(0, 0.78, 0);
    boat.add(mast);

    const sailMat = new THREE.MeshStandardMaterial({ color: 0xFFFDF4, roughness: 0.92, side: THREE.DoubleSide });
    const mainSailShape = new THREE.Shape();
    mainSailShape.moveTo(0.04, 0.06);
    mainSailShape.lineTo(0.68, 0.1);
    mainSailShape.lineTo(0.06, 1.32);
    mainSailShape.closePath();
    const mainSail = new THREE.Mesh(new THREE.ShapeGeometry(mainSailShape), sailMat);
    mainSail.position.set(0, 0.12, 0.04);
    mainSail.castShadow = true;
    boat.add(mainSail);

    const frontSailShape = new THREE.Shape();
    frontSailShape.moveTo(0.02, 0.08);
    frontSailShape.lineTo(0.02, 0.9);
    frontSailShape.lineTo(-0.45, 0.1);
    frontSailShape.closePath();
    const frontSail = new THREE.Mesh(new THREE.ShapeGeometry(frontSailShape), sailMat);
    frontSail.position.set(0, 0.1, 0.05);
    boat.add(frontSail);

    animBoat = boat;
    group.add(boat);

    registerInteractive(group, 'coastal_pier');
    islandGroup.add(group);
  }

  // ─── Lush Cherry Blossom Trees, Cypress Trees, Lamps & Yellow Car ─────────
  function buildTreesAndStreetFurniture() {
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x5C4033, roughness: 0.9 });
    const sakuraColors = [0xF9A8D4, 0xF472B6, 0xFBCFE8, 0xFCE7F3];
    const greenColors = [0x3D8458, 0x4D9B6A, 0x62B07E, 0x2D6A4F];

    function addMultiClusterTree(x, y, z, scale, isSakura) {
      const tree = new THREE.Group();
      tree.position.set(x, y, z);
      tree.scale.setScalar(scale);

      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.18, 1.15, 8), trunkMat);
      trunk.position.y = 0.55;
      trunk.castShadow = true;
      tree.add(trunk);

      // Branching limbs
      [[-0.2, 0.95, 0.1, 0.4], [0.22, 0.98, -0.1, -0.4], [0, 1.05, 0.2, 0.35]].forEach(([bx, by, bz, rz]) => {
        const branch = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.08, 0.55, 6), trunkMat);
        branch.position.set(bx, by, bz);
        branch.rotation.z = rz;
        tree.add(branch);
      });

      const palette = isSakura ? sakuraColors : greenColors;
      const puffs = [
        [0, 1.52, 0, 0.58],
        [-0.38, 1.32, 0.22, 0.46],
        [0.4, 1.34, -0.18, 0.48],
        [0.18, 1.38, 0.36, 0.44],
        [-0.24, 1.42, -0.34, 0.45],
        [-0.45, 1.18, -0.12, 0.38],
        [0.44, 1.2, 0.24, 0.38],
        [0, 1.28, -0.42, 0.36],
        [0, 1.72, 0.08, 0.42]
      ];
      puffs.forEach((p, idx) => {
        const sphere = new THREE.Mesh(
          new THREE.SphereGeometry(p[3], 16, 12),
          new THREE.MeshStandardMaterial({ color: palette[idx % palette.length], roughness: 0.72 })
        );
        sphere.position.set(p[0], p[1], p[2]);
        sphere.castShadow = true;
        sphere.receiveShadow = true;
        tree.add(sphere);
      });

      // Fallen pink blossom petals on the lawn under Sakura trees
      if (isSakura) {
        for (let i = 0; i < 6; i++) {
          const ang = (i / 6) * Math.PI * 2 + x;
          const dist = 0.4 + (i % 3) * 0.22;
          const petal = new THREE.Mesh(
            new THREE.CircleGeometry(0.08, 6),
            new THREE.MeshStandardMaterial({ color: 0xF9A8D4, roughness: 0.6 })
          );
          petal.rotation.x = -Math.PI / 2;
          petal.position.set(Math.cos(ang) * dist, 0.02, Math.sin(ang) * dist);
          tree.add(petal);
        }
      }

      animTreeGroups.push(tree);
      islandGroup.add(tree);
    }

    // Realistic Apple Tree with bright red fruit (just like in acrokat.me reference)
    function addAppleTree(x, y, z, scale) {
      const tree = new THREE.Group();
      tree.position.set(x, y, z);
      tree.scale.setScalar(scale);

      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.15, 1.0, 8), trunkMat);
      trunk.position.y = 0.5;
      trunk.castShadow = true;
      tree.add(trunk);

      const b1 = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.06, 0.45, 6), trunkMat);
      b1.position.set(0.15, 0.8, 0.1);
      b1.rotation.z = -0.5;
      tree.add(b1);

      const appleGreens = [0x4EA866, 0x3E9154, 0x66BE7A];
      const puffs = [
        [0, 1.35, 0, 0.52],
        [-0.25, 1.2, 0.18, 0.42],
        [0.28, 1.25, -0.15, 0.44],
        [0.1, 1.3, 0.28, 0.4]
      ];
      puffs.forEach((p, idx) => {
        const sphere = new THREE.Mesh(
          new THREE.SphereGeometry(p[3], 16, 12),
          new THREE.MeshStandardMaterial({ color: appleGreens[idx % appleGreens.length], roughness: 0.75 })
        );
        sphere.position.set(p[0], p[1], p[2]);
        sphere.castShadow = true;
        tree.add(sphere);
      });

      const appleMat = new THREE.MeshStandardMaterial({ color: 0xDC2626, roughness: 0.35 });
      const apples = [
        [-0.32, 1.15, 0.22],
        [0.32, 1.1, -0.12],
        [0.12, 1.12, 0.35],
        [-0.15, 1.05, -0.28],
        [0.22, 1.38, 0.18],
        [-0.2, 1.35, -0.18]
      ];
      apples.forEach(([ax, ay, az]) => {
        const apple = new THREE.Mesh(new THREE.SphereGeometry(0.055, 12, 10), appleMat);
        apple.position.set(ax, ay, az);
        apple.castShadow = true;
        tree.add(apple);
      });

      animTreeGroups.push(tree);
      islandGroup.add(tree);
    }

    // Place dense Cherry Blossom, Apple & Evergreen Trees around the island
    addAppleTree(-3.6, 0.36, 1.5, 1.15);                // Apple tree near Tech Hub path (matching reference photo!)
    addAppleTree(0.8, 0.36, 2.5, 1.05);                 // Apple tree near central plaza
    addMultiClusterTree(2.8, 0.36, -1.8, 1.22, true);   // Prominent Sakura between HQ & Barn
    addMultiClusterTree(-3.5, 0.36, 2.2, 1.18, true);   // Sakura between HQ, Tech Hub & Court
    addMultiClusterTree(2.2, 0.36, 3.6, 1.1, true);     // Sakura near River Bridge
    addMultiClusterTree(-6.4, 0.36, -3.8, 1.15, true);  // Sakura beside BGU Hall
    addMultiClusterTree(8.2, 0.36, -0.8, 1.1, true);    // Sakura east of Puppy Haven

    addMultiClusterTree(-1.0, 0.36, -7.2, 1.2, false); // Lush green tree north ridge
    addMultiClusterTree(4.2, 0.36, -5.8, 1.12, false);  // Green tree near Dairy Silo
    addMultiClusterTree(-8.2, 0.36, 1.8, 1.1, false);   // Green tree west ridge
    addMultiClusterTree(-1.8, 0.36, 6.5, 1.08, false);  // Green tree south coast

    // Vintage Streetlamps along the Cobblestone Avenues
    const lamps = [
      [-1.5, 0.36, 2.2],
      [1.3, 0.36, 1.8],
      [-2.4, 0.58, -1.6],
      [2.2, 0.36, 0.2],
      [4.1, 0.36, 1.7],
      [-4.5, 0.37, 2.8]
    ];
    lamps.forEach(([lx, ly, lz]) => {
      islandGroup.add(createStreetLamp(lx, ly, lz));
    });

    // Cute Yellow Miniature Car on the Cobblestone Avenue (just like the yellow car in acrokat.me!)
    const car = new THREE.Group();
    car.position.set(-2.3, 0.4, 1.15);
    car.rotation.y = 0.55;

    const carYellow = new THREE.MeshStandardMaterial({ color: 0xFACC15, roughness: 0.3, metalness: 0.2 });
    const chassis = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.24, 0.42), carYellow);
    chassis.position.y = 0.18;
    chassis.castShadow = true;
    car.add(chassis);

    const cabin = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.2, 0.36), frameMatWhite);
    cabin.position.set(-0.04, 0.36, 0);
    cabin.castShadow = true;
    car.add(cabin);

    const wheelMat = new THREE.MeshStandardMaterial({ color: 0x1E293B, roughness: 0.8 });
    [[-0.22, -0.21], [-0.22, 0.21], [0.22, -0.21], [0.22, 0.21]].forEach(([wx, wz]) => {
      const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.06, 12), wheelMat);
      wheel.rotation.x = Math.PI / 2;
      wheel.position.set(wx, 0.09, wz);
      car.add(wheel);
    });
    animCar = car;
    islandGroup.add(car);
  }

  // ─── Surrounding Ocean & Waterside Descent ─────────────────────────────────
  function buildOcean() {
    const oceanGeo = new THREE.PlaneGeometry(240, 240, 32, 32);

    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createLinearGradient(0, 0, 1024, 1024);
    grad.addColorStop(0, '#C3EAEB');
    grad.addColorStop(0.4, '#83CED2');
    grad.addColorStop(0.85, '#65B9C1');
    grad.addColorStop(1, '#A8DDE0');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 1024, 1024);

    for (let i = 0; i < 1900; i++) {
      const x = Math.random() * 1024;
      const y = Math.random() * 1024;
      const length = 5 + Math.random() * 32;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.quadraticCurveTo(x + length * 0.35, y - 2 + Math.random() * 4, x + length, y);
      ctx.strokeStyle = i % 4 === 0 ? `rgba(255,255,255,${0.12 + Math.random() * 0.23})` : `rgba(47,133,143,${0.05 + Math.random() * 0.12})`;
      ctx.lineWidth = 0.6 + Math.random() * 1.8;
      ctx.lineCap = 'round';
      ctx.stroke();
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(5, 5);

    const oceanMat = new THREE.MeshStandardMaterial({
      map: tex,
      color: 0xFFFFFF,
      roughness: 0.25,
      metalness: 0.04,
      transparent: true,
      opacity: 0.94
    });

    oceanMesh = new THREE.Mesh(oceanGeo, oceanMat);
    oceanMesh.rotation.x = -Math.PI / 2;
    oceanMesh.position.y = -0.92;
    oceanMesh.receiveShadow = true;
    scene.add(oceanMesh);

    // Shore surf ripple rings around the island base
    const rippleMat = new THREE.MeshBasicMaterial({
      color: 0xE4FAF8,
      transparent: true,
      opacity: 0.38,
      side: THREE.DoubleSide
    });
    const shoreRing = new THREE.Mesh(new THREE.RingGeometry(12.4, 14.2, 64), rippleMat);
    shoreRing.rotation.x = -Math.PI / 2;
    shoreRing.position.set(1.6, -0.89, 0);
    scene.add(shoreRing);
    animWaterRipple = shoreRing;

    // The pier above is the single shoreline access point; avoid a second dock
    // and rowboat overlapping it.
  }

  // Descent from island edge down into water + low moored rowboat
  function buildWaterDescent() {
    const descentGroup = new THREE.Group();
    descentGroup.position.set(6.8, 0, 5.0);
    descentGroup.rotation.y = -0.45;

    const stoneMat = stoneCorniceMat;
    const woodMat = new THREE.MeshStandardMaterial({ color: 0x854D0E, roughness: 0.85 });

    // Stone steps descending from island terrace (y = 0.36) down into water (y = -0.75)
    const numSteps = 7;
    for (let i = 0; i < numSteps; i++) {
      const stepY = 0.3 - (i * 0.16);
      const stepZ = 0.3 + (i * 0.32);
      const step = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.18, 0.4), stoneMat);
      step.position.set(0, stepY, stepZ);
      step.receiveShadow = true;
      step.castShadow = true;
      descentGroup.add(step);

      if (i % 2 === 0) {
        [-0.78, 0.78].forEach(rx => {
          const post = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.65, 8), woodMat);
          post.position.set(rx, stepY + 0.35, stepZ);
          descentGroup.add(post);
        });
      }
    }

    // Wooden handrails
    [-0.78, 0.78].forEach(rx => {
      const rail = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 2.5, 8), woodMat);
      rail.position.set(rx, -0.05, 1.25);
      rail.rotation.x = 0.45;
      descentGroup.add(rail);
    });

    // Floating wooden pontoon dock at water level
    const pontoon = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.15, 2.6), woodMat);
    pontoon.position.set(0.2, -0.78, 3.4);
    pontoon.castShadow = true;
    pontoon.receiveShadow = true;
    descentGroup.add(pontoon);

    // Mooring posts
    [[-0.9, 2.4], [0.9, 2.4], [-0.9, 4.4], [0.9, 4.4]].forEach(([px, pz]) => {
      const p = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.5, 8), woodMat);
      p.position.set(px + 0.2, -0.55, pz);
      descentGroup.add(p);
    });

    // Classic small wooden rowboat moored to the dock
    const rowboat = new THREE.Group();
    rowboat.position.set(1.8, -0.82, 3.6);
    rowboat.rotation.y = 0.8;

    const boatWood = new THREE.MeshStandardMaterial({ color: 0x78350F, roughness: 0.75 });
    const rHull = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.32, 1.6), boatWood);
    rHull.position.y = 0.12;
    rHull.castShadow = true;
    rowboat.add(rHull);

    const rSeat = new THREE.Mesh(new THREE.BoxGeometry(0.64, 0.05, 0.25), woodMat);
    rSeat.position.set(0, 0.2, 0);
    rowboat.add(rSeat);

    // Wooden oars
    const oarMat = new THREE.MeshStandardMaterial({ color: 0xD97706, roughness: 0.6 });
    [-0.45, 0.45].forEach((ox, idx) => {
      const oar = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 1.1, 6), oarMat);
      oar.position.set(ox, 0.25, 0);
      oar.rotation.z = (idx === 0 ? 0.35 : -0.35);
      oar.rotation.x = 0.2;
      rowboat.add(oar);
    });

    animRowBoat = rowboat;
    descentGroup.add(rowboat);

    islandGroup.add(descentGroup);
  }

  // ─── 3D Floating Landmark Pins (acrokat.me style) ─────────────────────────
  function buildFloatingLabels() {
    const container = document.getElementById('islandPins');
    if (!container) return;
    container.innerHTML = '';
    landmarkPins = [];

    const pinDefs = [
      { id: 'bgu_campus', label: 'Ben-Gurion' },
      { id: 'research_hq', label: 'AI Research' },
      { id: 'tech_hub', label: "Builder's Lab" },
      { id: 'dairy_barn', label: 'Dairy Farm' },
      { id: 'puppy_haven', label: 'Guide Dog' },
      { id: 'idf_outpost', label: 'IDF Comms' },
      { id: 'coastal_pier', label: 'The Pier' }
      // Basketball court is omitted intentionally per user request!
    ];

    pinDefs.forEach(p => {
      const pinEl = document.createElement('div');
      pinEl.className = 'island-pin';
      pinEl.dataset.landmark = p.id;
      pinEl.innerHTML = `
        <div class="island-pin-card">${p.label}</div>
        <div class="island-pin-dot"></div>
      `;

      pinEl.addEventListener('mouseenter', () => {
        hoveredLandmarkId = p.id;
        renderer.domElement.style.cursor = 'pointer';
      });
      pinEl.addEventListener('mouseleave', () => {
        if (hoveredLandmarkId === p.id) hoveredLandmarkId = null;
      });
      pinEl.addEventListener('click', (e) => {
        e.stopPropagation();
        if (LANDMARKS[p.id] && landmarkGroups[p.id]) {
          focusCameraOnLandmark(landmarkGroups[p.id]);
          openLandmarkModal(LANDMARKS[p.id]);
        }
      });

      container.appendChild(pinEl);
      landmarkPins.push({ id: p.id, el: pinEl });
    });
  }

  function buildVignetteOverlay() {
    const vig = document.getElementById('islandVignette');
    if (vig) vig.style.opacity = '0.4';
  }

  // ─── Events, Raycasting & View Switching ───────────────────────────────────
  function bindEvents() {
    const canvas = renderer.domElement;
    let pointerDownPos = { x: 0, y: 0 };

    canvas.addEventListener('pointerdown', e => {
      pointerDownPos.x = e.clientX;
      pointerDownPos.y = e.clientY;
    });

    canvas.addEventListener('pointermove', e => {
      if (!isIslandVisible) return;
      const rect = canvas.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      checkHover();
    });

    canvas.addEventListener('pointerup', e => {
      if (!isIslandVisible) return;
      const dx = e.clientX - pointerDownPos.x;
      const dy = e.clientY - pointerDownPos.y;
      if (Math.hypot(dx, dy) > 6) return;

      const rect = canvas.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const hits = raycaster.intersectObjects(interactiveTargets, false);
      if (hits.length > 0) {
        const landmarkId = hits[0].object.userData.landmarkId;
        if (landmarkId && LANDMARKS[landmarkId]) {
          if (landmarkId === 'basketball_court') {
            ballShotProgress = 0;
          }
          focusCameraOnLandmark(hits[0].object);
          openLandmarkModal(LANDMARKS[landmarkId]);
        }
      }
    });

    window.addEventListener('resize', onWindowResize);

    // Water motion / reset controls
    const pauseBtn = document.getElementById('pauseIslandBtn');
    if (pauseBtn) {
      pauseBtn.addEventListener('click', () => {
        isPaused = !isPaused;
        pauseBtn.textContent = isPaused ? '▶' : 'Ⅱ';
        pauseBtn.setAttribute('aria-label', isPaused ? 'Play water and scene motion' : 'Pause water and scene motion');
        pauseBtn.title = isPaused ? 'Play water and scene motion' : 'Pause water and scene motion';
      });
    }

    const resetBtn = document.getElementById('resetIslandBtn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        closeLandmarkModal();
        cameraTargetPos = new THREE.Vector3(DEFAULT_CAM_POS.x, DEFAULT_CAM_POS.y, DEFAULT_CAM_POS.z);
        controlsTargetLook = new THREE.Vector3(DEFAULT_TARGET.x, DEFAULT_TARGET.y, DEFAULT_TARGET.z);
        isCameraTransitioning = true;
      });
    }

    // View Toggles (3D Island <-> Classic CV View)
    const switchToClassicBtn = document.getElementById('switchToClassicBtn');
    const switchToIslandBtn = document.getElementById('switchToIslandBtn');
    const navIslandBtn = document.getElementById('navIslandBtn');
    const mmIslandBtn = document.getElementById('mmIslandBtn');

    if (switchToClassicBtn) switchToClassicBtn.addEventListener('click', () => switchToClassicView());
    if (switchToIslandBtn) switchToIslandBtn.addEventListener('click', () => switchToIslandView());
    if (navIslandBtn) navIslandBtn.addEventListener('click', () => switchToIslandView());
    if (mmIslandBtn) mmIslandBtn.addEventListener('click', () => switchToIslandView());

    // Modal Close
    const closeBtn = document.getElementById('landmarkCloseBtn');
    const closeBackdrop = document.getElementById('landmarkModalClose');
    if (closeBtn) closeBtn.addEventListener('click', closeLandmarkModal);
    if (closeBackdrop) closeBackdrop.addEventListener('click', closeLandmarkModal);

    window.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeLandmarkModal();
    });
  }

  function checkHover() {
    raycaster.setFromCamera(mouse, camera);
    const hits = raycaster.intersectObjects(interactiveTargets, false);

    if (hits.length > 0) {
      const id = hits[0].object.userData.landmarkId;
      renderer.domElement.style.cursor = 'pointer';

      // Find the top-level group for this hit so we can scale it
      let obj = hits[0].object;
      while (obj.parent && obj.parent !== islandGroup && obj.parent !== scene) obj = obj.parent;
      if (obj !== hoveredGroup) {
        if (hoveredGroup) hoveredGroup._targetScale = 1.0;
        hoveredGroup = obj;
        hoveredGroup._targetScale = 1.055;
      }

      if (id !== hoveredLandmarkId) {
        hoveredLandmarkId = id;
      }
    } else {
      renderer.domElement.style.cursor = 'grab';
      if (hoveredGroup) { hoveredGroup._targetScale = 1.0; hoveredGroup = null; }
      if (hoveredLandmarkId !== null) {
        hoveredLandmarkId = null;
      }
    }
  }

  function focusCameraOnLandmark(mesh) {
    const worldPos = new THREE.Vector3();
    mesh.getWorldPosition(worldPos);

    // Save current camera state so we can return to exactly this view on modal close
    savedCameraPos = camera.position.clone();
    savedCameraTarget = controls ? controls.target.clone() : new THREE.Vector3(DEFAULT_TARGET.x, DEFAULT_TARGET.y, DEFAULT_TARGET.z);

    controlsTargetLook = worldPos.clone().add(new THREE.Vector3(0, 0.6, 0));
    const offset = new THREE.Vector3(9.5, 7.5, 11.5);
    cameraTargetPos = worldPos.clone().add(offset);
    isCameraTransitioning = true;
    if (controls) controls.autoRotate = false;
  }

  function openLandmarkModal(data) {
    const modal = document.getElementById('landmarkModal');
    if (!modal) return;

    document.getElementById('modalIcon').textContent = data.icon;
    document.getElementById('modalTag').textContent = data.tag;
    document.getElementById('modalTitle').textContent = data.title;
    document.getElementById('modalSubtitle').textContent = data.subtitle;

    let html = '';
    if (data.image) {
      html += `<div class="landmark-modal-img"><img src="${data.image}" alt="${data.title}" loading="lazy"></div>`;
    }
    html += `<p class="landmark-modal-desc">${data.desc}</p>`;

    if (data.stats && data.stats.length) {
      html += `<div class="landmark-modal-stats">`;
      data.stats.forEach(s => {
        html += `<div class="stat-pill"><span class="v">${s.v}</span><span class="k">${s.k}</span></div>`;
      });
      html += `</div>`;
    }

    if (data.bullets && data.bullets.length) {
      html += `<ul class="landmark-modal-bullets">`;
      data.bullets.forEach(b => {
        html += `<li>${b}</li>`;
      });
      html += `</ul>`;
    }

    document.getElementById('modalContent').innerHTML = html;

    const footer = document.getElementById('modalFooter');
    footer.innerHTML = `
      <button type="button" class="landmark-jump-btn" id="modalJumpBtn">
        <span>${data.jumpLabel || 'View in Classic Portfolio'}</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 12h14m-7-7 7 7-7 7"/></svg>
      </button>
    `;

    const jumpBtn = document.getElementById('modalJumpBtn');
    if (jumpBtn) {
      jumpBtn.addEventListener('click', () => {
        closeLandmarkModal();
        switchToClassicView(data.jumpSection);
      });
    }

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
  }

  function closeLandmarkModal() {
    const modal = document.getElementById('landmarkModal');
    if (!modal) return;
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    // Restore previous camera position and look target so view doesn't get stuck in zoom
    if (savedCameraPos && savedCameraTarget) {
      cameraTargetPos = savedCameraPos.clone();
      controlsTargetLook = savedCameraTarget.clone();
      isCameraTransitioning = true;
      savedCameraPos = null;
      savedCameraTarget = null;
    }
    if (controls) controls.autoRotate = false;
  }

  function switchToClassicView(targetSelector) {
    const islandView = document.getElementById('islandView');
    if (islandView) islandView.classList.add('hidden-view');
    isIslandVisible = false;
    document.body.style.overflow = '';

    if (targetSelector) {
      setTimeout(() => {
        const el = document.querySelector(targetSelector);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 220);
    }
  }

  function switchToIslandView() {
    const islandView = document.getElementById('islandView');
    if (islandView) islandView.classList.remove('hidden-view');
    isIslandVisible = true;
    document.body.style.overflow = 'hidden';
    onWindowResize();
  }

  function onWindowResize() {
    if (!camera || !renderer) return;
    const w = window.innerWidth || 1440;
    const h = window.innerHeight || 900;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, true);
  }

  // ─── Main Animation Loop ──────────────────────────────────────────────────
  function animate() {
    requestAnimationFrame(animate);
    if (!isIslandVisible || !renderer) return;

    // Safeguard: ensure canvas always matches full viewport dimensions
    const w = window.innerWidth;
    const h = window.innerHeight;
    const canvas = renderer.domElement;
    if (w > 0 && h > 0 && (Math.abs(canvas.clientWidth - w) > 2 || Math.abs(canvas.clientHeight - h) > 2)) {
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, true);
    }

    const t = clock ? clock.getElapsedTime() : performance.now() * 0.001;

    if (isCameraTransitioning && cameraTargetPos && controlsTargetLook && controls) {
      camera.position.lerp(cameraTargetPos, 0.06);
      controls.target.lerp(controlsTargetLook, 0.06);
      if (camera.position.distanceTo(cameraTargetPos) < 0.15) {
        isCameraTransitioning = false;
      }
    }

    if (controls) controls.update();

    // Smooth building scale bounce and rise on hover
    Object.values(landmarkGroups).forEach(grp => {
      const isHovered = (grp.userData.landmarkId === hoveredLandmarkId);
      const targetScale = isHovered ? 1.055 : 1.0;
      const targetY = (grp.userData.baseY !== undefined ? grp.userData.baseY : 0.36) + (isHovered ? 0.12 : 0);
      const scale = grp.scale.x + (targetScale - grp.scale.x) * 0.14;
      grp.scale.set(scale, scale, scale);
      grp.position.y += (targetY - grp.position.y) * 0.14;
    });

    // Project 3D floating landmark pins to screen space (acrokat style)
    if (landmarkPins.length > 0 && camera) {
      const tempV = new THREE.Vector3();
      const w = window.innerWidth;
      const h = window.innerHeight;
      landmarkPins.forEach(pin => {
        const grp = landmarkGroups[pin.id];
        if (!grp) return;
        grp.getWorldPosition(tempV);
        tempV.add(grp.userData.labelOffset);
        tempV.project(camera);

        const isHovered = hoveredLandmarkId === pin.id;
        if (tempV.z > 1.0 || !isHovered) {
          pin.el.style.opacity = '0';
          pin.el.style.pointerEvents = 'none';
        } else {
          const sx = (tempV.x * 0.5 + 0.5) * w;
          const sy = (-(tempV.y * 0.5) + 0.5) * h;
          pin.el.style.opacity = '1';
          pin.el.style.pointerEvents = 'auto';
          pin.el.style.transform = `translate3d(${Math.round(sx)}px, ${Math.round(sy)}px, 0) translate(-50%, -100%)`;
        }
      });
    }

    // Dynamic tilt-shift / side blur vignette that intensifies during zoom-in
    const vig = document.getElementById('islandVignette');
    if (vig && camera && controls) {
      const dist = camera.position.distanceTo(controls.target);
      const factor = Math.max(0.22, Math.min(0.58, 0.78 - (dist / 60)));
      vig.style.opacity = factor.toFixed(2);
    }

    if (!isPaused) {
      // Gentle boat bobbing on the water
      if (animBoat) {
        animBoat.position.y = -0.78 + Math.sin(t * 2.2) * 0.035;
        animBoat.rotation.z = Math.sin(t * 1.6) * 0.05;
      }

      // Wooden rowboat bobbing near the water descent dock
      if (animRowBoat) {
        animRowBoat.position.y = -0.82 + Math.sin(t * 2.4 + 1.2) * 0.03;
        animRowBoat.rotation.z = Math.sin(t * 1.8 + 0.5) * 0.04;
      }

      // Shore surf ripple pulsing
      if (animWaterRipple) {
        const rScale = 1.0 + Math.sin(t * 1.5) * 0.022;
        animWaterRipple.scale.set(rScale, rScale, 1);
      }

      // Slow texture drift gives the bay and river visible water flow.
      if (oceanMesh && oceanMesh.material.map) {
        oceanMesh.material.map.offset.x = t * 0.003;
        oceanMesh.material.map.offset.y = t * 0.0015;
      }

      // Guide dog puppy happy bounce
      if (animPuppy) {
        animPuppy.position.y = Math.abs(Math.sin(t * 3.5)) * 0.05;
        animPuppy.rotation.y = -1.0 + Math.sin(t * 2.0) * 0.1;
      }

      // Dairy cows subtle grazing motion
      animCows.forEach((cow, idx) => {
        cow.rotation.z = Math.sin(t * 1.4 + idx * 2) * 0.025;
      });

      // Radar dish rotation & blinking aviation beacon
      if (radarDish) {
        radarDish.rotation.y = t * 0.85;
      }
      if (beaconMat) {
        beaconMat.emissiveIntensity = 0.4 + Math.abs(Math.sin(t * 4.0)) * 0.9;
      }

      // Gentle wind sway on tree canopies
      animTreeGroups.forEach((tree, idx) => {
        const phase = idx * 1.7;
        tree.rotation.z = Math.sin(t * 0.8 + phase) * 0.018;
        tree.rotation.x = Math.cos(t * 0.6 + phase * 0.7) * 0.012;
      });

      // Animated water shimmer on the river
      if (riverMesh) {
        riverMesh.traverse(child => {
          if (child.isMesh && child.material && child.material.color) {
            if (child.userData.isWater) {
              child.material.roughness = 0.2 + Math.sin(t * 1.8) * 0.035;
              child.material.metalness = 0.06 + Math.sin(t * 2.4) * 0.025;
              if (child.material.map) child.material.map.offset.x = t * 0.02;
            }
          }
        });
      }

      // Basketball 3-Point Swish Shot or Idle Dribble
      if (animBasketball) {
        if (ballShotProgress >= 0) {
          ballShotProgress += 0.022;
          const p = ballShotProgress;
          if (p <= 1.0) {
            // Parabolic arc from 3-point line (0.45, 0.26, 0.65) to rim (0, 1.62, -0.78)
            animBasketball.position.x = 0.45 * (1 - p);
            animBasketball.position.z = 0.65 * (1 - p) + (-0.78) * p;
            animBasketball.position.y = 0.26 * (1 - p) + 1.62 * p + Math.sin(p * Math.PI) * 1.65;
            animBasketball.rotation.x -= 0.18;
          } else if (p <= 1.45) {
            // Drop cleanly through the net
            const dp = (p - 1.0) / 0.45;
            animBasketball.position.set(0, 1.62 - dp * 1.36, -0.78);
          } else {
            ballShotProgress = -1;
          }
        } else {
          animBasketball.position.set(0.45, 0.22 + Math.abs(Math.sin(t * 4.2)) * 0.26, 0.65);
        }
      }
    }

    renderer.render(scene, camera);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      document.body.style.overflow = 'hidden';
      initIsland();
    });
  } else {
    document.body.style.overflow = 'hidden';
    initIsland();
  }
})();
