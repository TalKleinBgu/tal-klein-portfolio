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
    deepmind: {
      id: 'deepmind',
      name: 'Data Scientist & ML Engineer',
      logo: './assets/acrokat/brands/deepmind.svg',
      role: 'Data Scientist & ML Researcher · Socially Embedded Lab, BGU (2024 – Present)',
      cardDesc: 'End-to-end NLP pipeline extracting 30+ structured features from 4,000+ Hebrew court verdicts (0.92 F1) & causal inference',
      tag: 'Current Role & Springer Publication · Beer Sheva',
      title: 'Data Scientist & Machine Learning Engineer',
      subtitle: 'Socially Embedded Lab, Ben-Gurion University · 2024 – Present',
      icon: '🧠',
      desc: 'Specializing in GenAI, LLMs, deep learning, production-scale NLP pipelines, RAG architectures, and causal inference. Currently leading LLM-driven feature extraction and causal sentencing analysis at BGU, with our paper under review at Artificial Intelligence and Law (Springer, 2026).',
      stats: [
        { v: '0.92', k: 'F1 Score' },
        { v: '4,000+', k: 'Court Verdicts' },
        { v: '+11pp', k: 'Accuracy ↑' },
        { v: '30+', k: 'Features' }
      ],
      bullets: [
        'Built an end-to-end NLP pipeline extracting 30+ structured features from 4,000+ unstructured Hebrew court verdicts using GPT-5-mini batch inference.',
        'Designed and iteratively refined extraction prompts through error analysis on a held-out dev set, improving accuracy by 11 percentage points over a zero-shot baseline.',
        'Conducted causal inference using propensity score matching with Rosenbaum bounds and E-value sensitivity analyses.',
        'Publication under review (Springer AI & Law, 2026): "Examining Bias in Sentencing Decisions with LLM-Powered Control over the Facts" (Klein, T., et al.).'
      ],
      jumpSection: '#experience',
      jumpLabel: 'View Research & Career in Classic CV'
    },

    michigan: {
      id: 'michigan',
      name: 'Ben-Gurion University',
      logo: './assets/acrokat/brands/bgu-icon.svg',
      role: 'M.Sc. Software & Information Systems Eng. (GPA 92) · B.Sc. Data Eng. (GPA 86)',
      cardDesc: 'Meitar Excellence Program M.Sc. (2024–2026, GPA 92) & B.Sc. in Data Engineering (2021–2025, GPA 86) at BGU',
      tag: 'Education · Ben-Gurion University of the Negev',
      title: 'Ben-Gurion University of the Negev',
      subtitle: 'M.Sc. (Meitar Excellence, GPA 92) & B.Sc. Data Engineering (GPA 86)',
      icon: '🎓',
      desc: 'Completed my B.Sc. in Data Engineering (2021–2025, GPA 86) and M.Sc. in Software & Information Systems Engineering (2024–2026, GPA 92, Meitar Excellence Program) at Ben-Gurion University of the Negev, specializing in Data Science, LLMs, and Natural Language Processing.',
      stats: [
        { v: '92', k: 'M.Sc. GPA' },
        { v: 'Meitar', k: 'Excellence Prog.' },
        { v: '86', k: 'B.Sc. GPA' }
      ],
      bullets: [
        'M.Sc. in Software & Information Systems Engineering (2024 – 2026): GPA 92, Meitar Excellence Program, Specialization in Data Science & NLP.',
        'M.Sc. Thesis: LLM-driven feature extraction and causal inference for sentencing analysis in Hebrew court verdicts.',
        'B.Sc. in Data Engineering (2021 – 2025): GPA 86, covering Machine Learning, Deep Learning, NLP, Explainable ML (XAI), Information Retrieval, and Big Data.'
      ],
      jumpSection: '#education',
      jumpLabel: 'View Full Academic Education'
    },

    github: {
      id: 'github',
      name: 'GitHub & ML Projects',
      logo: './assets/acrokat/brands/github.svg',
      role: '7 Production & Research ML Projects · Open Source',
      cardDesc: '6.4M-doc Wikipedia IR Engine (8× speedup), Gemma-3 12B QLoRA Fine-Tuning (0.71 F1), DictaBERT Legal Classifier (91% acc) & Multimodal AI',
      tag: 'Selected Work · github.com/TalKleinBgu',
      title: 'GitHub & Selected ML Engineering Projects',
      subtitle: 'LLMs, Fine-Tuning, Information Retrieval, Vision & Audio',
      icon: '🐙',
      desc: 'Hands-on machine learning repositories spanning parameter-efficient LLM fine-tuning (LoRA/QLoRA), large-scale search engines on GCP, Hebrew legal & dialogue NLP, and multimodal vision/audio architectures.',
      stats: [
        { v: '6.4M', k: 'IR Docs (1.24s)' },
        { v: '0.71', k: 'Gemma-3 LoRA F1' },
        { v: '91%', k: 'DictaBERT Acc.' }
      ],
      bullets: [
        'Wikipedia-Scale IR Engine: Hybrid BM25, TF-IDF & PageRank search over 6.4M pages on GCP, cutting query latency from 9.8s → 1.24s (8× speedup).',
        'Parameter-Efficient Fine-Tuning of Gemma-3 12B: 22-run LoRA/QLoRA ablation sweep lifting grounded QA Answer F1 from 0.03 to 0.71 (−15% perplexity).',
        'Hebrew Legal Paragraph Classifier (91% accuracy across 4,271 paragraphs with AlephBERT/DictaBERT vs. GPT-4) & "The Sound of Silence" Hugging Face dataset (315 segments, 1,425 labels).',
        'Multimodal Next-Frame Video Prediction (YOLO + BLIP-2 on UCF101), Melody-Conditioned LSTM Lyric Generation, and BGU Campus Bi-A* Pathfinding on OpenStreetMap.'
      ],
      jumpSection: '#projects',
      jumpLabel: 'Explore All 7 Projects'
    },

    helpdesk: {
      id: 'helpdesk',
      name: 'Matrix · IT Support & Help Desk',
      logo: './assets/acrokat/brands/helpdesk-icon.svg',
      role: 'IT Support & Help Desk · Matrix Israel (2020 – 2021)',
      cardDesc: 'Technical support and troubleshooting for enterprise clients across hardware, software, and network issues with rapid diagnosis',
      tag: 'Career Experience · Matrix Israel (2020 – 2021)',
      title: 'IT Support & Help Desk · Matrix Israel',
      subtitle: 'Enterprise Technical Support & Troubleshooting · Center, Israel',
      icon: '🎧',
      desc: 'At Matrix Israel (2020–2021), I provided technical support and troubleshooting for enterprise clients across hardware, software, and network infrastructure, resolving high-priority help-desk tickets with rapid diagnosis and clear communication.',
      stats: [
        { v: 'Matrix', k: 'Israel' },
        { v: '2020–21', k: 'Center, Israel' },
        { v: 'IT Ops', k: 'Enterprise SLA' }
      ],
      bullets: [
        'Provided technical support and troubleshooting for enterprise clients across hardware, software, and network issues.',
        'Resolved help-desk tickets with a focus on rapid diagnosis and clear communication.',
        'Developed hands-on production debugging and systems reliability skills across complex enterprise environments.'
      ],
      jumpSection: '#experience',
      jumpLabel: 'View Matrix Role in Classic CV'
    },

    microsoft: {
      id: 'microsoft',
      name: 'IDF Communications & Operations',
      logo: './assets/acrokat/brands/microsoft.svg',
      role: 'Communications & Operations NCO · Israel Defense Forces (2017 – 2020)',
      cardDesc: 'Managed mission-critical communications systems, operational coordination, and team training in a high-tempo environment',
      tag: 'Military Service · IDF (2017 – 2020)',
      title: 'Communications & Operations NCO · IDF',
      subtitle: 'Israel Defense Forces · Tel Aviv, Israel (2017 – 2020)',
      icon: '📡',
      desc: 'Served as a Communications & Operations NCO in the Israel Defense Forces (2017–2020, Tel Aviv), managing mission-critical communications infrastructure and leading operational coordination in a high-tempo environment.',
      stats: [
        { v: 'IDF', k: 'Comms & Ops NCO' },
        { v: '2017–20', k: 'Tel Aviv, Israel' },
        { v: '24/7', k: 'Critical Infra' }
      ],
      bullets: [
        'Managed communications systems and operational coordination in a high-tempo environment.',
        'Led and trained a small team, ensuring reliability of mission-critical infrastructure.',
        'Instilled strong leadership, composure under pressure, and operational ownership.'
      ],
      jumpSection: '#experience',
      jumpLabel: 'View IDF Service in Classic CV'
    },

    blaze: {
      id: 'blaze',
      name: 'Dairy Farm, Guide Dog & Basketball',
      logo: './assets/acrokat/brands/dairy-icon.svg',
      role: 'Guide-Dog Puppy Raiser (2025–2026) · Family Farm & Basketball',
      cardDesc: 'Raised and socialized a guide-dog puppy for 1.5 years (Israel Guide Dog Center), family dairy farm roots & lifelong basketball fan',
      tag: 'Volunteering & Personal Life · Israel',
      title: 'Guide-Dog Puppy Raiser, Family Farm & Basketball',
      subtitle: 'Israel Guide Dog Center for the Blind (Jan 2025 – May 2026)',
      icon: '🐕‍🦺',
      image: './assets/guide-dog.webp',
      desc: 'Off the clock: volunteered as a Guide-Dog Puppy Raiser for the Israel Guide Dog Center for the Blind (Jan 2025 – May 2026), grew up with a strong work ethic around our family dairy farm, and love playing and watching basketball (big Deni Avdija fan — click the basketball on the court to shoot a 3-pointer!).',
      stats: [
        { v: '1.5 Yrs', k: 'Guide-Dog Raiser' },
        { v: '2025–26', k: 'Volunteering' },
        { v: 'Hoops', k: 'Basketball & Farm' }
      ],
      bullets: [
        'Volunteer · Guide-Dog Puppy Raiser (Jan 2025 – May 2026): Raised and socialized a guide-dog puppy for 1.5 years with the Israel Guide Dog Center for the Blind.',
        'Trained the puppy in basic obedience and public-access skills under a professional instructor, bringing him to BGU lectures and labs.',
        'Grew up around our family dairy farm and play basketball regularly (click the basketball on the court to shoot a 3-pointer!).'
      ],
      jumpSection: '#about',
      jumpLabel: 'Read More in About & Volunteering'
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
