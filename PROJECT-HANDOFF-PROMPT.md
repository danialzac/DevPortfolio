# 📤 Project → Portfolio handoff

When I finish a project in another chat and want it on my portfolio, I copy the
block below and paste it into that other chat. It produces a clean package that
my portfolio chat can drop in with zero back-and-forth.

**Then** I bring the filled result to my portfolio chat and say:
*"Add this to my portfolio and settle everything."*

---

## 👇 COPY FROM HERE INTO THE OTHER CHAT

```
I want to add this project to my developer portfolio. Produce a clean handoff
package I can paste into my portfolio chat. Fill in EVERY field exactly in this
format, then follow the two rules at the bottom.

PROJECT_KEY:   (short-kebab-case, e.g. "rtt-exam-drill")
TITLE:         (display name, e.g. "RTT Exam Drill")
EYEBROW:       (a short category label, e.g. "Frontend App", "Backend API",
                "Accessibility Build" — NOT "Featured Build" unless I say so)
TECH_STACK:    (comma-separated, e.g. React, Node.js, MongoDB)
ONE_LINER:     (one plain sentence: what it does)
DESCRIPTION:   (1–2 sentences: what it does + what engineering skill it shows —
                written for a hiring manager, not a tutorial)
DEMO_TYPE:     (choose one:
                 - "standalone-html"  → it's a single self-contained .html file
                 - "live-url"         → it's hosted somewhere; give the URL
                 - "repo-only"        → no live demo, just source)
DEMO_URL:      (the live URL if DEMO_TYPE is live-url; otherwise write "none")
REPO_URL:      (GitHub URL, or "none" if not pushed yet)

RULE 1 — If DEMO_TYPE is "standalone-html", also output the FULL, final HTML of
the app in one code block, ready to save as demos/PROJECT_KEY/index.html. Make
sure any visible author/footer name says "Danial Zac" (a copyright line may use
"Muhammad Danial bin Saifulrohman"). No external build step — pure HTML/CSS/JS.

RULE 2 — Keep every claim truthful. Don't invent links or features. If something
isn't ready, say "none" so my portfolio chat shows a tidy "Demo soon" instead of
a broken link.
```

## ☝️ COPY TO HERE

---

## What my portfolio chat does with it (so I don't have to)
Once I paste the filled package here, it automatically:
1. Adds the project card to `index.html` + an entry in `assets/js/site-config.js`
2. Saves the demo app to `demos/<key>/index.html` (if standalone-html)
3. Records a ~15-second demo video for the card
4. Audits every link (no dead links, one "Featured", name consistency)
5. Publishes → live in ~1 min at https://danialzac.github.io/DevPortfolio/

I just build. It settles the rest.
