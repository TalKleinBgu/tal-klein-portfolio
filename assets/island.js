/**
 * 🏝️ Tal Klein — Interactive 3D Career & Life Island (acrokat.me PBR & Shader Diorama)
 * Powered by acrokat-diorama.js (Three.js r186 + PBR brickwork, sandstone, slate,
 * 4-texture blended cobblestones, refined meadow grass shader, triplanar coastal cliffs,
 * custom GLSL wave & sunken river stream shaders, HDR environment lighting, and
 * frosted-glass 3D-anchored cards).
 */

(function () {
  'use strict';

  const PLACES = {
    michigan: {
      id: 'michigan',
      name: 'Ben-Gurion University',
      logo: './assets/acrokat/brands/bgu-icon.svg',
      role: 'M.Sc. (GPA 92) & B.Sc. (Cum Laude)',
      cardDesc: 'Software & Information Systems Engineering, Meitar Legal-Tech Fellow & AI Teaching Assistant',
      tag: 'Academic Excellence · B.Sc. & M.Sc.',
      title: 'Ben-Gurion University of the Negev',
      subtitle: 'Software & Information Systems Engineering · Beer Sheva',
      icon: '🎓',
      desc: 'After military service, I completed a seven-year academic and research journey at Ben-Gurion University of the Negev, earning my B.Sc. (Cum Laude, 89.4) and M.Sc. (GPA 92) while teaching hundreds of engineering students.',
      stats: [
        { v: '92', k: 'M.Sc. GPA' },
        { v: '89.4', k: 'B.Sc. Cum Laude' },
        { v: '2020–26', k: 'Teaching Assistant' }
      ],
      bullets: [
        'M.Sc. thesis analyzing temporal dynamics in judicial ruling citations using Legal NLP and transformers.',
        'Recipient of the prestigious Meitar Legal-Tech Center Research Excellence Fellowship.',
        'Teaching Assistant for "Introduction to Artificial Intelligence" and "Technological Entrepreneurship".'
      ],
      jumpSection: '#experience',
      jumpLabel: 'View Academic Journey in Classic CV'
    },

    deepmind: {
      id: 'deepmind',
      name: 'AI & Legal NLP Research',
      logo: './assets/acrokat/brands/deepmind.svg',
      role: 'M.Sc. AI Researcher · Springer AI & Law',
      cardDesc: 'Legal-HeBERT & BiLSTM transformer pipelines over 185K Supreme Court rulings (86% F1) & causal inference',
      tag: 'Published AI Research · DeepMind-Style HQ',
      title: 'AI & Legal NLP Research HQ',
      subtitle: 'Co-Advisor: Prof. Mark Last · Springer AI & Law (Q1)',
      icon: '🏛️',
      desc: 'The central architectural landmark on the island: where large language models, citation network dynamics, and causal inference converge to uncover hidden temporal shifts in judicial history.',
      stats: [
        { v: '86%', k: 'Best F1 Score' },
        { v: '185K', k: 'Court Rulings' },
        { v: 'Q1', k: 'Springer Journal' }
      ],
      bullets: [
        'Built a Legal-HeBERT + BiLSTM classifier that outperformed standard transformers by 7 F1 points.',
        'Engineered a production NLP pipeline to parse and link 185,000 Hebrew Supreme Court rulings.',
        'Applied Difference-in-Differences causal inference to measure doctrinal shifts over decades.'
      ],
      jumpSection: '#projects',
      jumpLabel: 'Explore Research & Publications'
    },

    microsoft: {
      id: 'microsoft',
      name: 'Cloud AI & IDF C4I',
      logo: './assets/acrokat/brands/microsoft.svg',
      role: 'Data Scientist · IDF C4I Combat Comms',
      cardDesc: 'Distributed search over 6.4M+ docs on Cloud (0.67s latency), Whisper AI & IDF C4I tactical radar systems',
      tag: 'Production Engineering · Cloud AI & IDF C4I',
      title: 'Cloud AI Lab & IDF C4I Comms Tower',
      subtitle: 'Distributed Search, Speech AI & Tactical RF Networks',
      icon: '📡',
      desc: 'Flanked by the IDF C4I Tactical Radar & Communications Tower, this timber-and-glass engineering complex represents both production machine learning at scale (6.4M+ Wikipedia search engine on GCP, real-time Whisper speaker diarization) and mission-critical military communications.',
      stats: [
        { v: '6.4M+', k: 'Docs Indexed' },
        { v: '0.67s', k: 'Search Latency' },
        { v: 'C4I', k: 'IDF Full Honors' }
      ],
      bullets: [
        'Architected a distributed Wikipedia search engine with custom inverted indexes, BM25, and PageRank on Cloud.',
        'Built a real-time speaker diarization and Whisper transcription pipeline with custom voice embeddings.',
        'IDF Combat Communications Specialist (2015–2018): managed encrypted tactical RF networks and field command systems.'
      ],
      jumpSection: '#projects',
      jumpLabel: 'See All 6 Engineering Projects'
    },

    github: {
      id: 'github',
      name: 'GitHub & Open Source',
      logo: './assets/acrokat/brands/github.svg',
      role: 'Machine Learning Engineer',
      cardDesc: 'Open-source ML repositories, RAG architectures, multimodal deep learning & end-to-end AI tools',
      tag: 'Open Source · Deep Learning & GenAI',
      title: 'GitHub & Open Source Studio',
      subtitle: 'github.com/TalKleinBgu · Production ML Codebases',
      icon: '🐙',
      desc: 'Explore hands-on machine learning codebases, retrieval-augmented generation (RAG) architectures, custom PyTorch training loops, and full-stack AI applications.',
      stats: [
        { v: 'PyTorch', k: '& HuggingFace' },
        { v: 'RAG', k: '& LLM Agents' },
        { v: 'Open', k: 'Source Repos' }
      ],
      bullets: [
        'Published end-to-end repositories covering Hebrew NLP, causal inference, information retrieval, and RL.',
        'Specialized in fine-tuning domain-specific encoders (Legal-HeBERT) and modern LLM pipelines.',
        'Clean, reproducible research and engineering codebases ready for production deployment.'
      ],
      jumpSection: '#skills',
      jumpLabel: 'Explore Technical Stack & Projects'
    },

    blaze: {
      id: 'blaze',
      name: 'Dairy Farm, Guide Dog & Court',
      logo: './assets/acrokat/brands/dairy-icon.svg',
      role: 'Family Dairy Farm · Guide-Dog Trainer · Basketball',
      cardDesc: 'Grew up on our family dairy farm with cows, fostered a guide-dog puppy for 1+ year & lifelong basketball player',
      tag: 'Personal Roots · Farm, Guide Dog & Basketball',
      title: 'Family Dairy Barn, Guide-Dog Foster & Half Court',
      subtitle: '05:00 AM Farm Grit · Guide-Dog Puppy · Lifelong Hoops',
      icon: '🐄',
      image: './assets/guide-dog.webp',
      desc: 'Who I am beyond algorithms: growing up working alongside Holstein cows on our family dairy farm, raising and training a future guide-dog puppy for the blind for over a year, and shooting hoops on the basketball court my entire life (click the basketball on the court to shoot a 3-pointer!).',
      stats: [
        { v: 'Dairy', k: 'Family Farm Roots' },
        { v: '1+ Yr', k: 'Guide-Dog Foster' },
        { v: 'Hoops', k: 'Lifelong Player' }
      ],
      bullets: [
        'Raised on a family dairy farm with Holstein cows — instilling 05:00 AM work ethic, ownership, and hands-on problem solving.',
        'Fostered and trained a Golden Retriever guide-dog puppy for 1+ year with the Israel Guide Dog Center, bringing him to BGU lectures and labs daily.',
        'Lifelong basketball player — built for team chemistry, court vision, and clutch execution under pressure.'
      ],
      jumpSection: '#about',
      jumpLabel: 'Read More in About Me'
    }
  };

  let diorama = null;
  let hoveredId = null;
  let selectedId = null;
  let isMotionEnabled = true;

  function initIsland() {
    const islandView = document.getElementById('islandView');
    const worldEl = document.getElementById('islandWorld');
    const anchorEl = document.getElementById('islandAnchor');
    const loadFill = document.getElementById('islandLoadFill');

    if (!islandView || !worldEl || !anchorEl || typeof window.createAcrokatDiorama !== 'function') {
      return;
    }

    const locationButtons = {};
    worldEl.querySelectorAll('[data-location]').forEach((btn) => {
      const locId = btn.getAttribute('data-location');
      locationButtons[locId] = btn;

      btn.addEventListener('mouseenter', () => updateHover(locId));
      btn.addEventListener('mouseleave', () => {
        if (hoveredId === locId) updateHover(null);
      });
      btn.addEventListener('focus', () => updateHover(locId));
      btn.addEventListener('blur', () => {
        if (hoveredId === locId) updateHover(null);
      });
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        selectLocation(locId);
      });
    });

    function updateHover(id) {
      hoveredId = id;
      Object.entries(locationButtons).forEach(([locId, btn]) => {
        if (locId === id && !selectedId) {
          btn.classList.add('hovered');
        } else {
          btn.classList.remove('hovered');
        }
        const label = btn.querySelector('.acro-hover-label');
        if (label) {
          label.hidden = !!selectedId;
        }
      });
    }

    function renderFrostedCard(id) {
      if (!id || !PLACES[id]) {
        anchorEl.innerHTML = '';
        anchorEl.hidden = true;
        return;
      }

      const place = PLACES[id];
      anchorEl.hidden = false;
      anchorEl.innerHTML = `
        <aside class="acro-card" role="dialog" aria-modal="false" aria-labelledby="acro-card-title">
          <button type="button" class="acro-card-close" id="acroCardCloseBtn" aria-label="Close summary">×</button>
          <h2 id="acro-card-title">
            <img src="${place.logo}" alt="">
            <span>${place.name}</span>
          </h2>
          <p class="acro-card-role">${place.role}</p>
          <p class="acro-card-desc">${place.cardDesc}</p>
          <div class="acro-card-actions">
            <button type="button" class="acro-card-more" id="acroCardMoreBtn">Full Story &amp; Metrics →</button>
          </div>
        </aside>
      `;

      const closeBtn = document.getElementById('acroCardCloseBtn');
      if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          dismissSelection();
        });
      }

      const moreBtn = document.getElementById('acroCardMoreBtn');
      if (moreBtn) {
        moreBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          openLandmarkModal(place);
        });
      }
    }

    function selectLocation(id) {
      if (!id || !PLACES[id]) return;
      selectedId = id;
      updateHover(null);
      renderFrostedCard(id);
      if (diorama) {
        diorama.select(id);
      }
    }

    function dismissSelection() {
      selectedId = null;
      renderFrostedCard(null);
      if (diorama) {
        diorama.dismiss();
        diorama.reset();
      }
    }

    // Mount the exact acrokat.me 3D Diorama engine
    try {
      diorama = window.createAcrokatDiorama(worldEl, anchorEl, {
        hover: (id) => {
          updateHover(id);
        },
        select: (id) => {
          selectedId = id;
          updateHover(null);
          renderFrostedCard(id);
        },
        progress: (pct) => {
          if (loadFill) {
            loadFill.style.width = `${Math.max(15, pct)}%`;
          }
        },
        ready: () => {
          if (loadFill) loadFill.style.width = '100%';
          islandView.setAttribute('data-scene-status', 'ready');
          worldEl.setAttribute('aria-busy', 'false');
          worldEl.querySelectorAll('[data-location], [data-bike-bell], [data-lamp-id], [data-camera-hint]').forEach((el) => {
            el.hidden = false;
          });
          anchorEl.hidden = !selectedId;
        },
        failed: () => {
          islandView.setAttribute('data-scene-status', 'ready');
        }
      });
    } catch (err) {
      console.error('Failed to initialize 3D island diorama:', err);
    }

    // Bind bottom pill controls (Pause/Play motion Ⅱ / ▷ and Reset ↺)
    const pauseBtn = document.getElementById('pauseIslandBtn');
    if (pauseBtn) {
      pauseBtn.addEventListener('click', () => {
        isMotionEnabled = !isMotionEnabled;
        pauseBtn.textContent = isMotionEnabled ? 'Ⅱ' : '▷';
        pauseBtn.setAttribute('aria-label', isMotionEnabled ? 'Pause motion' : 'Resume motion');
        pauseBtn.setAttribute('aria-pressed', String(!isMotionEnabled));
        if (diorama) diorama.motion(isMotionEnabled);
      });
    }

    const resetBtn = document.getElementById('resetIslandBtn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        closeLandmarkModal();
        selectedId = null;
        updateHover(null);
        renderFrostedCard(null);
        if (diorama) diorama.reset();
      });
    }

    // Bind Classic CV <-> 3D Island view toggles
    const switchToClassicBtn = document.getElementById('switchToClassicBtn');
    const switchToIslandBtn = document.getElementById('switchToIslandBtn');
    const navIslandBtn = document.getElementById('navIslandBtn');
    const mmIslandBtn = document.getElementById('mmIslandBtn');

    if (switchToClassicBtn) switchToClassicBtn.addEventListener('click', () => switchToClassicView());
    if (switchToIslandBtn) switchToIslandBtn.addEventListener('click', () => switchToIslandView());
    if (navIslandBtn) navIslandBtn.addEventListener('click', () => switchToIslandView());
    if (mmIslandBtn) mmIslandBtn.addEventListener('click', () => switchToIslandView());

    // Bind Modal close events
    const closeBtn = document.getElementById('landmarkCloseBtn');
    const closeBackdrop = document.getElementById('landmarkModalClose');
    if (closeBtn) closeBtn.addEventListener('click', closeLandmarkModal);
    if (closeBackdrop) closeBackdrop.addEventListener('click', closeLandmarkModal);

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const modal = document.getElementById('landmarkModal');
        if (modal && modal.classList.contains('active')) {
          closeLandmarkModal();
        } else if (selectedId) {
          dismissSelection();
        }
      }
    });
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
      data.stats.forEach((s) => {
        html += `<div class="stat-pill"><span class="v">${s.v}</span><span class="k">${s.k}</span></div>`;
      });
      html += `</div>`;
    }

    if (data.bullets && data.bullets.length) {
      html += `<ul class="landmark-modal-bullets">`;
      data.bullets.forEach((b) => {
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
  }

  function switchToClassicView(targetSelector) {
    const islandView = document.getElementById('islandView');
    if (islandView) islandView.classList.add('hidden-view');
    document.body.style.overflow = '';
    if (diorama) diorama.motion(false);

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
    document.body.style.overflow = 'hidden';
    if (diorama && isMotionEnabled) diorama.motion(true);
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
