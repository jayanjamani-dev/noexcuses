# noexcuses.

*by the mind game — @jayandred*

A 30-day spin-the-wheel fitness challenge. Static site, installable to your iPhone home screen (PWA), works offline, no backend. Plain HTML/CSS/vanilla JS + `<canvas>`.

## Files

```
index.html              markup
styles.css               brand system + layout
app.js                    wheel logic, spin animation, audio, persistence, story export
manifest.webmanifest      PWA manifest
sw.js                     service worker (offline app shell caching)
icons/                    app icons (192/512, regular + maskable)
```

No build step. Just static files.

## Run locally

Open `index.html` directly, or serve it (recommended, so the service worker registers correctly):

```bash
npx serve .
# or
python3 -m http.server 8080
```

## Deploy

**Netlify Drop** — drag the whole `noexcuses` folder onto https://app.netlify.com/drop

**Vercel**
```bash
npm i -g vercel@latest
vercel
```

**GitHub Pages**
```bash
git init
git add .
git commit -m "noexcuses"
git branch -M main
git remote add origin <your-repo-url>
git push -u origin main
```
Then enable Pages in the repo settings, pointing at the `main` branch root.

## Add to Home Screen (iPhone)

1. Open the deployed URL in Safari.
2. Tap the **Share** icon.
3. Tap **Add to Home Screen**.
4. Open it from the home screen icon — it launches full-screen, no browser chrome, and works with no signal.

## How it works

- **Spin** decides the winning wedge first, then animates the wheel to land it under the pointer, with a wind-up, swoosh, ratchet ticks, and a finish flourish (flash, shockwave, screen-shake, pointer recoil, sound).
- **No re-spin.** Landing = the workout. The only action on the result card is **commit**.
- Committing locks the activity into a **mission bar** with **cross it off** and **save story**. You can't spin again until you cross off the current mission.
- **Mysteries** (`🎁`) never reveal their real name, place, or note anywhere on screen or in exported stories.
- Progress (`DAY NN / 30`, crossed-off count, wheel strike-throughs) persists in `localStorage` and survives reloads/app restarts.
- **save story** exports a 1080×1920 PNG of the stopped wheel + result card, ready for Instagram stories.
- If your browser supports `MediaRecorder` on canvas, an optional **record clip** button appears near the spin button to capture a ~5s spin+land `.webm` clip (best-effort, iOS Safari support varies).

## Boss finish (optional)

`BOSS_INDEX` in `app.js` is wired to day 30 (`workout with a stranger`) as the finale peak. Change it if you want a different activity to be the closer — see the `TODO(boss finish)` comment above the `ACTIVITIES` array.

## Reset

The **reset** link (footer, and on the finale screen) wipes all 30 days of progress after a confirmation prompt.
