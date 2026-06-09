# Tal Klein — Portfolio

## Local preview

```bash
npm install
npm run build
```

Then open `index.html` in a browser (or serve with `npx serve .`).

To watch for changes during development:

```bash
npm run watch
```

## Deploy (Vercel)

Push to GitHub, connect the repo in Vercel. `vercel.json` configures everything:
- **Build command:** `npm run build`
- **Output directory:** `.` (project root)

`style.css` is generated at build time and is gitignored.

## After deploy

Search `index.html` for `<!-- TODO: replace after deploy -->` and fill in your canonical URL and OG image path.
