// Initialize Vercel Web Analytics
import { inject } from './vercel-analytics.js';
import { isOptedOut } from './analytics-optout.js';

if (!isOptedOut()) {
  // Inject analytics with auto mode detection
  inject({
    mode: 'auto',
    debug: false
  });

  // Engagement events (time on page, scroll depth, interactions)
  import('./site-analytics.js');
}
