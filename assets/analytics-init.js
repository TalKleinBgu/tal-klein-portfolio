// Initialize Vercel Web Analytics
import { inject } from './vercel-analytics.js';

// Inject analytics with auto mode detection
// debug: true enables console logging in development mode
inject({
  mode: 'auto',
  debug: true
});
