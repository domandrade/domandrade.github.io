# domandrade.github.io

Personal website for **Dominic Andrade** — senior at Niagara University studying Sport Management & Tourism Event Management.

Live site: https://domandrade.github.io

## Stack
Plain HTML, CSS, and vanilla JS. No build step — GitHub Pages serves the files directly from `main`.

## Pages
- `index.html` — hero, intro, highlights
- `experience.html` — experience timeline, education, certifications, skills
- `resume.html` — full résumé (with Download PDF + Print)
- `contact.html` — email, LinkedIn, contact form (mailto)
- `404.html` — friendly fallback

The downloadable PDF lives at `assets/Dominic-Andrade-Resume.pdf`. Drop the latest résumé PDF there whenever it changes — no other code updates needed.

## Interactive extras
- `⌘K` / `Ctrl+K` command palette (jump to any page, toggle theme, email, LinkedIn)
- Light / dark theme toggle (persisted to `localStorage`)
- Scroll-reveal animations and count-up stats
- Cursor-follow glow on devices with hover
- Animated marquee of teams & orgs

## Local preview
Just open `index.html` in a browser, or serve the folder:

```
python -m http.server 8080
```
