/* Umami Cloud — engagement analytics (time on page, scroll depth, interactions).
   Vercel Web Analytics keeps doing visitors/page views, but its custom events are
   a Pro-only feature, so the engagement events live here instead. Umami's free
   Hobby tier covers 100k events/month, which is far more than this site needs.

   SETUP: create a website at https://cloud.umami.is, copy its Website ID from
   Settings -> Websites, and paste it below. Until then nothing is sent.

   Note on HOST_URL: Umami Cloud auto-detects a regional collector, and those
   domains have changed more than once without notice. Setting host-url pins
   collection to one domain so the site's Content-Security-Policy only has to
   allow that single origin. */

import { isOptedOut } from './analytics-optout.js';

const WEBSITE_ID = 'REPLACE_WITH_UMAMI_WEBSITE_ID';
const HOST_URL = 'https://cloud.umami.is';

const configured = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(WEBSITE_ID);

if (isOptedOut()) {
  // analytics-optout.js already logged why
} else if (!configured) {
  console.info(
    '[analytics] Umami website ID not set — engagement events are disabled. ' +
    'Add it in assets/umami-init.js (see the README).'
  );
} else {
  const script = document.createElement('script');
  script.defer = true;
  script.src = `${HOST_URL}/script.js`;
  script.dataset.websiteId = WEBSITE_ID;
  script.dataset.hostUrl = HOST_URL;
  script.onerror = () => {
    console.info('[analytics] Umami script blocked or unreachable — engagement events will not be sent.');
  };
  document.head.appendChild(script);

  import('./site-analytics.js');
}
