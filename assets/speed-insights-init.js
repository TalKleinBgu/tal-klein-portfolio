// Initialize Vercel Speed Insights
import { injectSpeedInsights } from './vercel-speed-insights.js';
import { isOptedOut } from './analytics-optout.js';

if (!isOptedOut()) {
  // Inject speed insights with default settings
  injectSpeedInsights({
    debug: false
  });
}
