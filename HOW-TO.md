# 📖 How my portfolio works (the whole thing, simply)

My live website: **https://danialzac.github.io/DevPortfolio/**

---

## ⚡ The only thing I ever need to do

**To put changes online → double-click `PUBLISH.command`.**

That's it. It saves my work, uploads it, and my website updates itself in about a minute. No typing, no git.

---

## 🧠 How it works (30-second version)

```
I edit my files  →  double-click PUBLISH  →  GitHub rebuilds my site  →  it's live
```

- My whole site lives in this folder.
- GitHub keeps a copy (the "backup + web host").
- A robot on GitHub (called an "Action") rebuilds the live site every time I publish. I never touch it — it just runs.

**One file does the automation:** `.github/workflows/deploy.yml`. I don't need to open it. It just works.

---

## ➕ How to add a new project (the seamless way)

**In my other chat** (where I built the project): I paste the block from
`PROJECT-HANDOFF-PROMPT.md`. It hands me back a clean package.

**In my portfolio chat:** I paste that package and say *"Add this to my portfolio
and settle everything."* It adds the card, saves the demo, records a demo video,
audits the links, and publishes — automatically. I just build; it settles the rest.

(Under the hood this is the `portfolio-publish` skill in `.claude/skills/`.)

If I ever want to know what happens by hand:

1. The project's words + links live in **one file**: `assets/js/site-config.js`
2. The project's card lives in **`index.html`**
3. If it has a live demo, the demo page goes in **`demos/`**

Then double-click **PUBLISH**. Done.

---

## ✅ Rules that keep it looking pro (for hiring managers / clients)

- **No dead links.** Every "View Demo" / "GitHub Repo" button must actually open something. A broken link makes me look careless. If a link isn't ready yet, it shows "Demo soon" instead — that's fine.
- **One "Featured Build" only.** The featured badge means *the* standout project. More than one dilutes it.
- **Same name everywhere.** My site says "Danial Zac" — every demo and page should match.
- **Real projects only.** Better to show 5 solid ones than 10 half-finished.

---

## 🆘 If something looks wrong

- Site didn't update? Check **https://github.com/danialzac/DevPortfolio/actions** — a green ✓ means it published. A red ✗ means ask Claude.
- Not sure about anything? Just ask Claude to look — everything is saved and reversible.
