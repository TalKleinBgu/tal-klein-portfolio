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

Vercel Web Analytics and Speed Insights, plus custom engagement events sent from
`assets/site-analytics.js`. Nothing runs on `localhost`.

### Excluding my own visits

Open **`https://talklein.dev/?analytics=off`** once in each browser/device I use.
The choice is stored in `localStorage`, so every later visit from that browser is
invisible to both Web Analytics and Speed Insights — no visitor, no page view, no
events. `?analytics=on` undoes it. The query parameter is stripped from the URL
right after it is applied.

Caveats: it is per browser profile, so incognito windows and cleared site data
start counting again, and other people's visits are of course unaffected.

### Custom events

Every event fires at most once per page view, so the counts in the Vercel
dashboard are visitor counts rather than click counts.

| Event | Meaning |
| --- | --- |
| `time_10s` … `time_300s` | Reached that many seconds of *active* time (the clock pauses while the tab is hidden). The drop-off between thresholds is the read-time distribution. |
| `session_end` | Best-effort summary at unload: `duration` bucket, `seconds`, max `scroll` %, `sections` reached. |
| `scroll_25` … `scroll_100` | Scroll depth reached. |
| `section_about` … `section_contact` | Section scrolled into view. |
| `project_view` | Project card browsed to in the carousel (`project` property). |
| `visitor_new` / `visitor_returning` | First visit vs. a repeat visit from the same browser. |
| `cv_download`, `contact_email`, `contact_linkedin`, `contact_github` | Intent signals. |
| `project_github`, `project_dataset`, `carousel_browse`, `theme_toggle` | Interactions. |

Duration is reported as a *funnel of threshold events* rather than a single event
at unload, because unload-time sends are unreliable on mobile. `session_end` is a
bonus, not the source of truth.

A visitor who reads the whole page generates roughly 20 events, so the Hobby plan
event quota covers a few thousand visitors a month. Trim `TIME_THRESHOLDS`,
`SCROLL_MARKS`, or `SECTIONS` at the top of `assets/site-analytics.js` to reduce
that.
