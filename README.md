# Tal Klein — Portfolio

Personal portfolio site for Tal Klein — Data Scientist & ML Researcher.

Built with vanilla HTML, JavaScript, and Tailwind CSS. No frameworks.

## Run locally

```bash
npm install
npm run build
```

Then open `index.html` (or `npx serve .`). Use `npm run watch` to rebuild on changes.

## Deploy

Hosted on Vercel — every push to `main` redeploys automatically.
`vercel.json` runs `npm run build` to generate `style.css` (which is gitignored).

## Analytics

Two services, because they cover different things. Nothing runs on `localhost`.

- **Vercel Web Analytics + Speed Insights** — visitors, page views, referrers,
  countries, devices, and Core Web Vitals.
- **Umami Cloud** — average visit duration plus the custom engagement events in
  `assets/site-analytics.js`. Vercel's custom events are a Pro-only feature, so
  they live here instead; Umami's free Hobby tier allows 100k events/month.

### Umami setup (required once)

1. Create a website at [cloud.umami.is](https://cloud.umami.is).
2. Copy its **Website ID** from Settings → Websites.
3. Paste it into `WEBSITE_ID` at the top of `assets/umami-init.js`.

Until that ID is set, the tracker is not loaded at all and a note is logged to
the console. Everything else keeps working.

`HOST_URL` pins collection to `cloud.umami.is`. Umami Cloud otherwise auto-detects
a regional collector, and those domains have changed more than once without
notice — pinning keeps the `Content-Security-Policy` in `vercel.json` down to one
allowed origin. If events ever stop arriving, check the browser console for a CSP
violation first: the fix is to add the new collector origin to `connect-src`.

### Excluding my own visits

Open **`https://tal-klein-portfolio.vercel.app/?analytics=off`** once in each
browser/device I use. The choice is stored in `localStorage`, so every later visit
from that browser is invisible to Web Analytics, Speed Insights and Umami alike —
no visitor, no page view, no events. `?analytics=on` undoes it. The query
parameter is stripped from the URL right after it is applied.

Caveats: `localStorage` is per browser profile *and per origin*, so incognito
windows and cleared site data start counting again, and attaching a custom domain
later means opting out again on that domain. Other people's visits are of course
unaffected.

If a custom domain is attached later, update the absolute URLs in `index.html`
(`canonical`, `og:url`, `og:image`, `twitter:image`, the JSON-LD `url`), plus
`sitemap.xml` and `robots.txt` — and redo the opt-out on the new origin.

### Custom events

Sent to Umami. Every event fires at most once per page view, so the counts are
visitor counts rather than click counts.

| Event | Meaning |
| --- | --- |
| `time_10s` … `time_300s` | Reached that many seconds of *active* time (the clock pauses while the tab is hidden). The drop-off between thresholds is the read-time distribution. |
| `session_end` | Best-effort summary at unload: `duration` bucket, `seconds`, max `scroll` %, `sections` reached. |
| `scroll_25` … `scroll_100` | Scroll depth reached. |
| `section_about` … `section_contact` | Section scrolled into view. |
| `project_view` | Project card browsed to in the carousel (`project` property). |
| `visitor_new` / `visitor_returning` | First visit vs. a repeat visit from the same browser. |
| `cv_download`, `contact_email`, `contact_linkedin`, `contact_github` | Intent signals. |
| `email_copied`, `phone_copied`, `page_printed` | Stronger intent — someone is taking the details away with them. |
| `project_github`, `project_dataset`, `carousel_browse`, `theme_toggle` | Interactions. |
| `rage_click` | Three clicks in one spot within a second — something looks clickable but isn't. |
| `deep_read` | Human, 60s+ active, scrolled past 75%. The visit that actually matters. |
| `connection_slow` | Visitor on 2G/3G — context for a bad Speed Insights sample. |

### Telling people from bots

Each visit ends with exactly one verdict event:

| Verdict | Meaning |
| --- | --- |
| `visit_human` | Moved a pointer, touched, typed or scrolled with a wheel. |
| `visit_passive` | Ran JavaScript, never interacted. Usually a scraper; occasionally a real person who opened a tab and walked away. |
| `visit_automated` | Declared itself automation, or looked structurally impossible. `signals` says which checks tripped. |

Supporting events: `human_confirmed` (with `via` and `ms_to_interact`) and
`bot_suspected` (with the `signals` list).

Two layers, because either can be defeated alone. The declarative layer reads
`navigator.webdriver`, headless/bot user-agent strings, empty `navigator.languages`,
and zero-sized window/screen. A stealth scraper can hide all of those — so the
behavioural layer looks for a real pointer movement (with an actual delta, since
some automation dispatches a single synthetic move at 0,0), touch, keypress or
wheel. Verified against headless Chromium both as-is and with the automation
flags patched out.

**This cannot see vulnerability scanners.** `curl`, `nuclei`, `sqlmap` and friends
never execute JavaScript, so they never load this file and never appear in Umami
at all. Requests that never run JS are only visible in the Vercel Firewall and
runtime logs. Treat every verdict here as a strong hint, not proof: privacy
browsers, accessibility tooling and some in-app webviews produce false positives.

Duration is reported as a *funnel of threshold events* rather than a single event
at unload, because unload-time sends are unreliable on mobile. `session_end` is a
bonus, not the source of truth.

A visitor who reads the whole page generates roughly 20 events, so the Hobby plan
event quota covers a few thousand visitors a month. Trim `TIME_THRESHOLDS`,
`SCROLL_MARKS`, or `SECTIONS` at the top of `assets/site-analytics.js` to reduce
that.
