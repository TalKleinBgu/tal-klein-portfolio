// Initialize Vercel Web Analytics (visitors, page views, referrers, countries).
// Engagement events live in umami-init.js — Vercel's custom events are Pro-only.
import { inject } from './vercel-analytics.js';
import { isOptedOut } from './analytics-optout.js';

if (!isOptedOut()) {
  // Inject analytics with auto mode detection
  inject({
    mode: 'auto',
    debug: false
  });
}
