/**
 * ╔══════════════════════════════════════════════════════════════════╗
 * ║  site-config.js — The control room. Change stuff here, not HTML. ║
 * ║  site-config.js — Bilik kawalan. Ubah kat sini, bukan dalam HTML.║
 * ║                                                                  ║
 * ║  siteConfig{}     → all personal info + project links in one box ║
 * ║  DOMContentLoaded → runs AFTER the HTML is fully loaded          ║
 * ║                     Jalankan SELEPAS HTML habis dimuatkan        ║
 * ║  querySelectorAll → finds every element with a matching label    ║
 * ║                     Cari semua elemen dengan label yang sepadan  ║
 * ║                                                                  ║
 * ║  Why one config file? So you update your GitHub link ONCE        ║
 * ║  and every button on the page updates automatically.             ║
 * ║  Kenapa? Supaya ubah sekali, semua tempat update sendiri.        ║
 * ║  Malas itu kebijaksanaan. (Laziness is engineering wisdom.)      ║
 * ╚══════════════════════════════════════════════════════════════════╝
 */

// This object is the main "single source of truth" for personal info and project links.
// If you need to update name, resume, GitHub, or project URLs, start here first.
// WHY: Centralizing repeated content here makes the HTML easier to maintain and easier to explain in interviews.
// EDIT: When updating the portfolio later, change this file first before touching repeated values in HTML.
const siteConfig = {
    personal: {
        // EDIT: These values control visible identity, metadata, and contact links across the whole site.
        name: "Danial Zac",
        title: "Danial Zac | Developer Portfolio",
        description: "Danial Zac's portfolio: full-stack developer, financial-services professional, and technical educator building dependable software with real-world context.",
        github: "https://github.com/danialzac",
        linkedin: "https://www.linkedin.com/in/danial-rohman/",
        email: "danialzac@gmail.com",
        resume: {
            href: "assets/cv/CVdania.pdf",
            download: "Danial-Zac-CV.pdf",
        },
    },
    projects: {
        // EDIT: Each project key must match the data-project-* names used in index.html.
        "capstone-project": {
            demo: "https://github.com/danialzac/voltora",
            repo: "https://github.com/danialzac/voltara-backend.git",
            description: "A full-stack platform build used to strengthen secure access, structured content, and backend integration across a project designed with room to grow.",
        },
        "spotify-playlist": {
            demo: "https://lucent-maamoul-066f68.netlify.app/",
            repo: "https://github.com/danialzac/spotify-jamming.git",
            description: "A React build focused on cleaner component structure, state handling, and a smoother playlist-creation flow from search to save.",
        },
        "airstream-sportswear": {
            demo: "#",
            repo: "https://github.com/danialzac",
            description: "A responsive storefront project used to practise layout polish, merchandising flow, and customer-facing interactions such as forms and navigation.",
        },
        "find-your-hat": {
            repo: "https://github.com/danialzac",
            description: "A JavaScript game build created to practise logic flow, game-state handling, and clearer control over player movement and win-loss conditions.",
        },
        "pokedex": {
            demo: "#",
            repo: "https://github.com/danialzac",
            description: "An API-based project used to strengthen data fetching, response handling, and a cleaner way to present live information to users.",
        },
        "diamond-lite": {
            demo: "#",
            repo: "#",
            description: "A luxury storefront build completed to practice premium presentation, clearer browsing flow, and a more polished checkout-style experience.",
        },
        "prayer-pattern-viewer": {
            demo: "assets/media/prayer-pattern-viewer-demo.mp4",
            repo: "#",
            description: "A reflection-focused product build exploring calmer interface design, protected summaries, and how the same idea can be implemented across different backend stacks.",
        },
        "colmar-academy": {
            demo: "#",
            repo: "https://github.com/danialzac",
            description: "A responsive layout project focused on stronger page structure, visual hierarchy, and cleaner adaptation across desktop and mobile screens.",
        },
        "todo-api": {
            demo: "#",
            repo: "https://github.com/danialzac/todoapplication",
            description: "A RESTful Todo API built with Java Spring Boot and MySQL to practise CRUD operations, validation, and cleaner backend data persistence.",
        },
        "student-management": {
            demo: "#",
            repo: "https://github.com/danialzac/Project-StudentGen-student-management-system-",
            description: "A Java console application for student enrollment, course registration, and grading, built to practise OOP structure, service separation, and testable logic.",
        },
        "kopi-connect": {
            demo: "#",
            repo: "https://github.com/danialzac/kopi-connect",
            description: "A Singapore mental-health service finder with an emotion-aware chatbot that maps users to real local support options through a lightweight frontend-only build.",
        },
    },
};

// ── WHY "DOMContentLoaded"? ─────────────────────────────────────────
// JavaScript runs fast. Sometimes TOO fast — before the HTML even exists.
// JS berlari laju. Kadang terlalu laju — HTML pun belum wujud lagi!
// DOMContentLoaded = "wait for the HTML to finish loading, THEN run this"
// Macam tunggu nasi masak dulu sebelum nak makan. Sabar sikit.
// If you skip this, your JS tries to find elements that don't exist yet.
// Kalau skip ni, JS cuba cari elemen yang belum ada. Error je hasilnya.
// ────────────────────────────────────────────────────────────────────
// Opens modal AND pre-selects $5 so visitor has a clear action path immediately
// WHY: Zero selection = decision paralysis. Pre-selecting $5 lowers the barrier.
// Buka modal DAN pilih $5 terus supaya pelawat tahu apa yang patut dibuat.
function openModal() {
    document.getElementById('paynow-modal').classList.add('is-open');
    // Small delay so the modal animation plays first, then the pill highlights
    setTimeout(() => pickAmount(5), 80);
}

// Closes modal and shows the thank you toast briefly
// Tutup modal dan tunjuk toast ucapan terima kasih
function closeModal() {
    document.getElementById('paynow-modal').classList.remove('is-open');
    const toast = document.getElementById('thankyou-toast');
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
}

// Switches between PayNow and TNG QR panels in the modal
// Tukar antara panel PayNow dan TNG dalam modal
function switchQR(type) {
    document.getElementById('qr-paynow').hidden = (type !== 'paynow');
    document.getElementById('qr-tng').hidden = (type !== 'tng');
    document.querySelectorAll('.qr-pick').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`.qr-pick[onclick="switchQR('${type}')"]`).classList.add('active');
}

// Highlights selected amount and updates the hint text
// WHY: Works both from click events AND when called programmatically (openModal pre-select)
// Boleh dipanggil dari klik ATAU dari kod — dua-dua jalan.
function pickAmount(amount) {
    document.querySelectorAll('.amount-pill').forEach(btn => btn.classList.remove('active'));
    // Use click target if available, otherwise find the button by its onclick value
    const activeBtn = (window.event && window.event.currentTarget)
        || document.querySelector(`.amount-pill[onclick="pickAmount(${amount})"]`);
    if (activeBtn) activeBtn.classList.add('active');

    // WHY: Specific, personal copy converts better than generic "thank you" text.
    // Each line answers "what does MY money actually do?" — the #1 question before giving.
    const purposes = {
        5:   '☕ Enter $5 in your app — a small gesture that helps keep the learning momentum going.',
        15:  '📖 Enter $15 in your app — helps cover course material, tools, or practice resources.',
        30:  '🖥️ Enter $30 in your app — supports hosting, subscriptions, and continued project work.',
        50:  '🎓 Enter $50 in your app — goes a long way toward a new course or certification cost.',
        100: '🚀 Enter $100 in your app — meaningful support for deeper learning and more serious project time.',
        200: '👑 Enter $200 in your app — generous support that meaningfully backs the next stage of growth.',
    };

    document.getElementById('amount-hint').textContent = purposes[amount] || `Enter $${amount} in your banking app`;
}

document.addEventListener("DOMContentLoaded", () => {
    // These first lines keep the browser title and SEO tags in sync with the config above.
    // WHY: This avoids one common portfolio problem where the visible content changes but metadata is forgotten.
    document.title = siteConfig.personal.title;

    const descriptionMeta = document.querySelector('meta[name="description"]');
    if (descriptionMeta) {
        descriptionMeta.setAttribute("content", siteConfig.personal.description);
    }

    const authorMeta = document.querySelector('meta[name="author"]');
    if (authorMeta) {
        authorMeta.setAttribute("content", siteConfig.personal.name);
    }

    const ogTitleMeta = document.querySelector('meta[property="og:title"]');
    if (ogTitleMeta) {
        ogTitleMeta.setAttribute("content", siteConfig.personal.title);
    }

    const ogDescriptionMeta = document.querySelector('meta[property="og:description"]');
    if (ogDescriptionMeta) {
        ogDescriptionMeta.setAttribute("content", siteConfig.personal.description);
    }

    // This replaces any HTML element marked with data-site-field="name".
    // WHY: One data attribute can update many repeated spots at once.
    document.querySelectorAll('[data-site-field="name"]').forEach((element) => {
        element.textContent = siteConfig.personal.name;
    });

    // This updates repeated personal links such as resume, email, GitHub, and LinkedIn.
    // EDIT: Add another branch here if you create a new reusable contact link type later.
    document.querySelectorAll("[data-site-link]").forEach((element) => {
        const linkType = element.getAttribute("data-site-link");

        if (linkType === "resume") {
            element.setAttribute("href", siteConfig.personal.resume.href);
            element.setAttribute("download", siteConfig.personal.resume.download);
        }

        if (linkType === "email") {
            element.setAttribute("href", `mailto:${siteConfig.personal.email}`);
        }

        if (linkType === "github") {
            element.setAttribute("href", siteConfig.personal.github);
        }

        if (linkType === "linkedin") {
            element.setAttribute("href", siteConfig.personal.linkedin);
        }
    });

    // This lets project summaries live in one config file instead of inside every HTML card.
    // WHY: Project copy changes often, so this keeps edits safer and faster.
    document.querySelectorAll("[data-project-description]").forEach((element) => {
        const projectKey = element.getAttribute("data-project-description");
        const project = siteConfig.projects[projectKey];

        if (project?.description) {
            element.textContent = project.description;
        }
    });

    // Each project link name ends with "-demo" or "-repo".
    // We split that value so we can look up the correct URL in the config above.
    // WHY: This pattern keeps the HTML clean while still letting each card point to different URLs.
    // ── THE REGEX EXPLAINED (don't panic) ───────────────────────────
    // /-(?=[^-]+$)/ means: "split at the LAST hyphen only"
    // Maksudnya: "pisah pada sempang TERAKHIR sahaja"
    // Example: "capstone-project-demo" → ["capstone-project", "demo"]
    // Contoh:   "spotify-playlist-repo" → ["spotify-playlist", "repo"]
    // The ?= part is a "lookahead" — it checks ahead without consuming.
    // Bahagian ?= adalah "pandang ke hadapan" — tengok tanpa makan aksara.
    // You don't need to memorise this. Just know what it produces. Relax.
    // Tak perlu hafal ni. Tahu apa yang dihasilkan je sudah. Tenang!
    // ─────────────────────────────────────────────────────────────────
    document.querySelectorAll("[data-project-link]").forEach((element) => {
        const [projectKey, linkType] = element.getAttribute("data-project-link").split(/-(?=[^-]+$)/);
        const project = siteConfig.projects[projectKey];

        if (project?.[linkType]) {
            const url = project[linkType];
            element.setAttribute("href", url);

            // WHY: Some projects are still being finalized, so this turns placeholder links into intentional
            // "coming soon" states instead of making the UI feel broken.
            // EDIT: Replace "#" in the project config with a real URL later and the button will return to normal automatically.
            if (url === "#") {
                element.classList.add("is-disabled");
                element.setAttribute("aria-disabled", "true");
                element.addEventListener("click", (event) => event.preventDefault());

                if (linkType === "demo") {
                    element.textContent = "Demo soon";
                }

                if (linkType === "repo") {
                    element.textContent = "Repo soon";
                }
            } else {
                element.classList.remove("is-disabled");
                element.removeAttribute("aria-disabled");
            }
        }
    });

});
