---
name: portfolio-publish
description: >
  Add, update, audit, and publish projects on Danial's developer portfolio
  (DevPortfolio / danialzac.github.io). Use whenever the user pastes a project
  (code, links, or details) to "put on the portfolio", asks to add/update a
  project card, generate a demo video, check for dead/broken links, or publish
  the site. Handles the whole flow end-to-end so the user doesn't touch code.
---

# Portfolio Publish — the end-to-end runbook

The user builds projects in OTHER chats, then hands them to this repo to be
turned into a clean, impressive, working portfolio card + demo — and published.
Your job: **settle everything with minimal questions.** The user wants zero
stress and baby-simple involvement. Make sensible calls, then report what you did.

**Commit signature:** every commit message ends with `via: dani` (no AI/tool
mentions — this is a hard rule from user memory).

Live site: **https://danialzac.github.io/DevPortfolio/**

---

## The 5 phases

### 1. Intake
Get: project name, one-line what-it-does, tech stack, links (repo + live demo),
and whether there's a self-contained demo file (a single HTML app) or just a repo.
If the user pastes a full standalone HTML app, that IS the demo — host it locally
(phase 3). If details are missing, ask ONCE using the handoff template
(`PROJECT-HANDOFF-PROMPT.md` at repo root) — don't interrogate.

### 2. Wire up the card + config
Two files, always kept in sync:

- **`assets/js/site-config.js`** → add an entry under `projects`. Key is
  kebab-case and MUST match the card's `data-project-*` names.
  ```js
  "my-project-key": {
    demo: "demos/my-project-key/index.html",   // or live URL, or "#" for "Demo soon"
    repo: "https://github.com/danialzac/...",  // real repo, or a folder in DevPortfolio
    description: "1–2 sentences: what it does + what skill it shows.",
  },
  ```
- **`index.html`** → add a `.project-card` block (copy an existing visible one).
  Insert it BEFORE the `<!-- ... hidden ... -->` cards. Pattern:
  ```html
  <div class="project-card">
    <video class="project-image" controls muted playsinline preload="metadata">
      <source src="assets/media/my-project-key-demo.mp4" type="video/mp4">
      Your browser does not support the video tag.
    </video>
    <div class="project-details">
      <div>
        <span class="project-eyebrow">Accessibility Build</span> <!-- see rules -->
        <h3>My Project</h3>
        <p data-project-description="my-project-key"></p>
        <ul class="toolused"><li>React</li>...</ul>
      </div>
      <div class="project-links">
        <a data-project-link="my-project-key-demo" href="#">View Demo</a>
        <a data-project-link="my-project-key-repo" href="...">GitHub Repo</a>
      </div>
    </div>
  </div>
  ```
  The JS (`site-config.js`) overrides text + hrefs on load. Also set the fallback
  `href` in the HTML to the real value (not the dead one) so it survives JS-off.
  A `demo`/`repo` of `"#"` auto-renders as a greyed "Demo soon" / "Repo soon".

### 3. Standalone demo page (if the project is a single HTML app)
Save it to `demos/<project-key>/index.html`. It becomes the live "View Demo"
link (`demo: "demos/<project-key>/index.html"`). If the app has a separate repo,
the "GitHub Repo" link can point at the folder inside DevPortfolio instead of a
new repo: `https://github.com/danialzac/DevPortfolio/tree/main/demos/<project-key>`.
Make the demo's visible author/footer name match the site ("Danial Zac").

### 4. Generate the demo video (makes cards look real)
Cards look flat without a video. Auto-generate a ~15s screen-capture:

1. `scripts/capture-video.js` (in this skill) drives the app in headless Chrome
   with an on-screen cursor and saves PNG frames. **Edit the `SEQUENCE` array**
   for the specific app's buttons/selectors, and set `APP` + `OUT` paths.
2. Run it in a temp dir with `puppeteer-core` installed:
   ```bash
   mkdir -p /tmp/vidcap/frames && cd /tmp/vidcap && npm init -y >/dev/null && \
     npm install puppeteer-core >/dev/null
   node /path/to/this/skill/scripts/capture-video.js
   ```
3. Stitch to web-ready mp4:
   ```bash
   ffmpeg -y -framerate 4 -i /tmp/vidcap/frames/f%03d.png \
     -vf "scale=1280:-2:flags=lanczos" -c:v libx264 -pix_fmt yuv420p \
     -crf 23 -preset veryfast -movflags +faststart \
     assets/media/<project-key>-demo.mp4
   ```
4. Point the card's `<video><source src>` at that mp4.

**Sandbox notes (important):** the Preview MCP server and `python3 -m http.server`
FAIL here (cwd/permission errors). Load the app via `file://` in Puppeteer instead
— self-contained HTML files load fine that way. Chrome is at
`/Applications/Google Chrome.app/Contents/MacOS/Google Chrome`. ffmpeg is installed.

### 5. Audit, then publish
**Audit before publishing — dead links are the #1 trust-killer for hiring
managers/clients.** Run:
```bash
# check every real demo/repo URL resolves (200/3xx = ok, 404 = fix or hide)
curl -sL -o /dev/null -w "%{http_code}  %{url_effective}\n" --max-time 10 "<url>"
```
Then verify the "impressive but simple" rules below. Fix issues (or hide a card
whose links are all dead by adding the `hidden` attribute) BEFORE publishing.

Publish = commit (ending `via: dani`) + `git push origin main`. Deploy is
automatic via `.github/workflows/deploy.yml` (~1 min to go live). The user can
also just double-click `PUBLISH.command`. Always give them the live URL after.

---

## The "impressive but simple" rules (enforce these)
- **No dead links.** Every visible "View Demo"/"GitHub Repo" must open something.
  Not ready → set to `"#"` (renders "Demo soon"). All links dead → hide the card.
- **Exactly ONE "Featured Build".** The flagship only. Others get descriptive
  eyebrows ("Accessibility Build", "Backend API", "Frontend App", etc.).
- **One name everywhere.** Site says "Danial Zac" — every demo footer/page matches.
  (Legal name "Muhammad Danial bin Saifulrohman" is fine only in copyright lines.)
- **Real, finished projects only.** 5 solid > 10 half-built. Prefer a live demo
  over a repo-only link; a "View Demo" that opens a repo should say "Source" or
  get a real hosted demo.
- Keep the repo lean: never commit `learning-app/`, `*.bak`, `.DS_Store`, or other
  separate projects living in the folder (already in `.gitignore`). Don't `git add -A`
  blindly — stage the specific files you changed.

## Repo map (quick reference)
- `index.html` — all cards + page sections
- `assets/js/site-config.js` — single source of truth for project text + links
- `demos/<key>/index.html` — hosted standalone demo apps
- `assets/media/<key>-demo.mp4` — project card videos
- `.github/workflows/deploy.yml` — the ONE workflow (push to main → live)
- `PUBLISH.command` — user's double-click publish button
- `HOW-TO.md` — the user's plain-English guide
- `PROJECT-HANDOFF-PROMPT.md` — paste-into-other-chats prompt that produces intake
