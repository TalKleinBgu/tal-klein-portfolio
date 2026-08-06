/* Engagement analytics, sent to Umami as custom events.
   Umami already reports average visit duration on its own; these events add the
   distribution behind that average plus what people actually did.

   Design notes:
   - Time is *active* time: the clock pauses while the tab is hidden.
   - Duration is reported as a funnel of threshold events (time_10s, time_30s, …)
     rather than one event at unload, because unload-time sends are unreliable on
     mobile. The drop-off between thresholds is the read-time distribution.
   - Every event fires at most once per page view, so the counts are visitor
     counts, not click counts. */

const TIME_THRESHOLDS = [10, 30, 60, 120, 300]; // seconds
const SCROLL_MARKS = [25, 50, 75, 100];         // percent
const SECTIONS = ['about', 'experience', 'projects', 'skills', 'contact'];
const VISIT_KEY = 'analytics-seen';

/* ── Delivery ────────────────────────────────────────────────────────────
   window.umami only exists once the tracker script has loaded, and events can
   fire before that, so queue anything sent too early and flush it on arrival. */
const queued = [];

function send(name, data) {
  try { window.umami.track(name, data); } catch { /* never let analytics break the page */ }
}

function flush() {
  while (queued.length) send(...queued.shift());
}

if (!window.umami) {
  const started = Date.now();
  const poll = setInterval(() => {
    if (window.umami) { clearInterval(poll); flush(); }
    else if (Date.now() - started > 15000) { clearInterval(poll); queued.length = 0; }
  }, 200);
}

const sent = new Set();

function once(name, data, key = name) {
  if (sent.has(key)) return;
  sent.add(key);
  if (window.umami) send(name, data);
  else queued.push([name, data]);
}

/* ── New vs returning ────────────────────────────────────────────────── */
try {
  const seen = localStorage.getItem(VISIT_KEY);
  once(seen ? 'visitor_returning' : 'visitor_new');
  localStorage.setItem(VISIT_KEY, String(Date.now()));
} catch { /* private mode */ }

/* ── Active time on page ─────────────────────────────────────────────── */
let activeMs = 0;
let runningSince = document.visibilityState === 'visible' ? performance.now() : null;

function pause() {
  if (runningSince === null) return;
  activeMs += performance.now() - runningSince;
  runningSince = null;
}

function resume() {
  if (runningSince === null) runningSince = performance.now();
}

function activeSeconds() {
  const pending = runningSince === null ? 0 : performance.now() - runningSince;
  return Math.round((activeMs + pending) / 1000);
}

const last = TIME_THRESHOLDS[TIME_THRESHOLDS.length - 1];
const timeTimer = setInterval(() => {
  if (document.visibilityState !== 'visible') return;
  const seconds = activeSeconds();
  for (const t of TIME_THRESHOLDS) {
    if (seconds >= t) once(`time_${t}s`);
  }
  if (seconds >= last) clearInterval(timeTimer);
}, 5000);

/* ── Scroll depth ────────────────────────────────────────────────────── */
let maxScroll = 0;
let scrollQueued = false;

function scrollPercent() {
  const doc = document.documentElement;
  const scrollable = doc.scrollHeight - window.innerHeight;
  if (scrollable <= 0) return 100;
  return Math.max(0, Math.min(100, Math.round((window.scrollY / scrollable) * 100)));
}

function measureScroll() {
  scrollQueued = false;
  const pct = scrollPercent();
  if (pct <= maxScroll) return;
  maxScroll = pct;
  for (const mark of SCROLL_MARKS) {
    if (pct >= mark) once(`scroll_${mark}`);
  }
}

addEventListener('scroll', () => {
  if (scrollQueued) return;
  scrollQueued = true;
  requestAnimationFrame(measureScroll);
}, { passive: true });

measureScroll();

/* ── Which sections actually got read ────────────────────────────────── */
let sectionsSeen = 0;

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      const id = entry.target.id;
      if (!sent.has(`section_${id}`)) sectionsSeen++;
      once(`section_${id}`);
      observer.unobserve(entry.target);
    }
  }, { threshold: 0.35 });

  for (const id of SECTIONS) {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  }
}

/* ── Which project cards get browsed to in the carousel ──────────────── */
function projectName(el) {
  const card = el.closest('.pcard');
  const title = card && card.querySelector('h3.title');
  const text = (title && title.textContent) || el.getAttribute('aria-label') || '';
  return text.trim().slice(0, 60) || 'unknown';
}

if ('IntersectionObserver' in window) {
  const viewport = document.getElementById('carousel');
  const cards = document.querySelectorAll('#track .pcard');
  if (viewport && cards.length) {
    // The carousel slides cards with translateX inside a clipping viewport, so
    // using it as the IntersectionObserver root reports the card on screen.
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const name = projectName(entry.target);
        once('project_view', { project: name }, `project_view:${name}`);
        observer.unobserve(entry.target);
      }
    }, { root: viewport, threshold: 0.6 });

    for (const card of cards) observer.observe(card);
  }
}

/* ── Interactions worth knowing about ────────────────────────────────── */

document.addEventListener('click', (event) => {
  const link = event.target.closest('a, button');
  if (!link) return;

  if (link.matches('.nav-cv, .mm-dl, .cv-download') || link.hasAttribute('download')) {
    once('cv_download');
    return;
  }
  if (link.matches('.project-git')) {
    once('project_github', { project: projectName(link) }, `project_github:${projectName(link)}`);
    return;
  }
  if (link.matches('.project-hf')) {
    once('project_dataset', { project: projectName(link) }, `project_dataset:${projectName(link)}`);
    return;
  }
  if (link.id === 'themeBtn') {
    // This runs in the capture phase, before the theme actually flips.
    const from = document.documentElement.getAttribute('data-theme');
    once('theme_toggle', { to: from === 'dark' ? 'light' : 'dark' });
    return;
  }
  if (link.id === 'railPrev' || link.id === 'railNext') {
    once('carousel_browse');
    return;
  }

  const href = link.getAttribute('href') || '';
  if (href.startsWith('mailto:')) once('contact_email');
  else if (href.includes('linkedin.com')) once('contact_linkedin');
  else if (href.includes('github.com')) once('contact_github');
}, { passive: true, capture: true });

/* ── Best-effort session summary at unload ───────────────────────────── */
function durationBucket(seconds) {
  if (seconds < 10) return '0-10s';
  if (seconds < 30) return '10-30s';
  if (seconds < 60) return '30-60s';
  if (seconds < 120) return '1-2m';
  if (seconds < 300) return '2-5m';
  return '5m+';
}

addEventListener('pagehide', () => {
  pause();
  const seconds = activeSeconds();
  once('session_end', {
    duration: durationBucket(seconds),
    seconds,
    scroll: maxScroll,
    sections: sectionsSeen
  });
}, { once: true });

addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'hidden') pause();
  else resume();
});
