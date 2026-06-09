// Initialize Vercel Web Analytics
import { inject } from './vercel-analytics.js';

// Inject analytics with auto mode detection
inject({
  mode: 'auto',
  debug: false
});
