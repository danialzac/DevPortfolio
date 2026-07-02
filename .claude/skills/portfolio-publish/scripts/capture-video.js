/* ═══════════════════════════════════════════════════════════════════════
   capture-video.js — record a portfolio demo app clicking itself.
   Drives a self-contained HTML app in headless Chrome with an on-screen
   cursor, saves PNG frames to /tmp/vidcap/frames. Then stitch with ffmpeg:

     ffmpeg -y -framerate 4 -i /tmp/vidcap/frames/f%03d.png \
       -vf "scale=1280:-2:flags=lanczos" -c:v libx264 -pix_fmt yuv420p \
       -crf 23 -preset veryfast -movflags +faststart \
       assets/media/<project-key>-demo.mp4

   SETUP (run once, in a temp dir so the repo stays clean):
     mkdir -p /tmp/vidcap/frames && cd /tmp/vidcap
     npm init -y >/dev/null && npm install puppeteer-core >/dev/null

   USAGE: edit APP, OUT, and the SEQUENCE array below for the target app,
   then:  node /abs/path/to/this/skill/scripts/capture-video.js
   ═══════════════════════════════════════════════════════════════════════ */

const puppeteer = require('puppeteer-core');

// ---- EDIT THESE PER PROJECT --------------------------------------------
const APP = 'file:///Users/danial/Desktop/DZ.github.io-master/demos/<PROJECT-KEY>/index.html';
const OUT = '/tmp/vidcap/frames';
const VW = 900, VH = 680;                    // viewport (app is usually ≤760px wide)
// SEQUENCE: each step is [cssSelector, waitMsAfterClick]. The script moves the
// cursor to the element, holds, clicks, waits, holds on the result. Add a plain
// number instead of an array to just pause+hold (no click) on the current screen.
const SEQUENCE = [
  2,                                // linger on the opening screen
  ['#goCards', 700],                // e.g. a "Start" button
  ['#flip', 700],                   // reveal something
  2,                                // linger
  ['[data-mode="roleplay"]', 800],  // switch a tab
  ['.doreveal', 700],
  ['[data-mode="hooks"]', 800],
  ['[data-mode="home"]', 800],      // loop back to start
];
// ------------------------------------------------------------------------

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const sleep = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME, headless: 'new',
    args: [`--window-size=${VW},${VH}`, '--hide-scrollbars', '--force-device-scale-factor=2'],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: VW, height: VH, deviceScaleFactor: 2 });
  await page.goto(APP, { waitUntil: 'networkidle0' });
  await sleep(1200); // let web fonts settle

  // Inject a fake cursor so the video reads as "a user clicking".
  await page.evaluate(() => {
    const c = document.createElement('div');
    c.id = '__cursor';
    c.style.cssText = `position:fixed;width:22px;height:22px;z-index:99999;pointer-events:none;
      left:-40px;top:-40px;transition:left .35s ease,top .35s ease;
      background:radial-gradient(circle at 35% 35%,#fff,#111);border-radius:50%;
      box-shadow:0 2px 8px rgba(0,0,0,.4),0 0 0 3px rgba(245,179,1,.6);`;
    document.body.appendChild(c);
  });

  let n = 0;
  const shot = async (copies = 1) => {
    for (let i = 0; i < copies; i++)
      await page.screenshot({ path: `${OUT}/f${String(n++).padStart(3, '0')}.png` });
  };
  const moveTo = async (sel) => {
    await page.evaluate((s) => {
      const el = document.querySelector(s); if (!el) return;
      const r = el.getBoundingClientRect(), cur = document.getElementById('__cursor');
      cur.style.left = (r.left + r.width / 2 - 11) + 'px';
      cur.style.top = (r.top + r.height / 2 - 11) + 'px';
      el.scrollIntoView({ block: 'center', behavior: 'instant' });
    }, sel);
    await sleep(450);
  };

  await shot(3); // opening frame
  for (const step of SEQUENCE) {
    if (typeof step === 'number') { await sleep(500); await shot(step); continue; }
    const [sel, wait = 700] = step;
    await moveTo(sel);
    await shot(2);                          // cursor hovering
    await page.click(sel).catch(() => {});
    await sleep(wait);
    await shot(3);                          // result
  }
  console.log('Captured ' + n + ' frames to ' + OUT);
  await browser.close();
})();
