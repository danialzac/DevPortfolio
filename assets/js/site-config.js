// This object is the main "single source of truth" for personal info and project links.
// If you need to update name, resume, GitHub, or project URLs, start here first.
// WHY: Centralizing repeated content here makes the HTML easier to maintain and easier to explain in interviews.
// EDIT: When updating the portfolio later, change this file first before touching repeated values in HTML.
const siteConfig = {
    personal: {
        // EDIT: These values control visible identity, metadata, and contact links across the whole site.
        name: "Danial Zac",
        title: "Danial Zac | Developer Portfolio",
        description: "Danial Zac's developer portfolio featuring completed full-stack and frontend projects built to learn, ship, and grow.",
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
            description: "A full-stack platform completed to learn how structured content, secure access, and backend integration come together in a project designed to grow over time.",
        },
        "spotify-playlist": {
            demo: "https://lucent-maamoul-066f68.netlify.app/",
            repo: "https://github.com/danialzac/spotify-jamming.git",
            description: "A React project completed to strengthen component structure, state handling, and smoother user flows around playlist creation.",
        },
        "airstream-sportswear": {
            demo: "#",
            repo: "https://github.com/danialzac",
            description: "A storefront practice build completed to improve responsive layout work, interface polish, and simple customer-facing interactions such as form validation.",
        },
        "find-your-hat": {
            repo: "https://github.com/danialzac",
            description: "A JavaScript game project completed to practice logic flow, game-state handling, and code that stays simple enough to follow.",
        },
        "pokedex": {
            demo: "#",
            repo: "https://github.com/danialzac",
            description: "An API-based project completed to learn how live data can be fetched, organized, and presented in a way that feels more usable and exploratory.",
        },
        "diamond-lite": {
            demo: "#",
            repo: "#",
            description: "A luxury storefront build completed to practice premium presentation, clearer browsing flow, and a more polished checkout-style experience.",
        },
        "prayer-pattern-viewer": {
            demo: "assets/media/prayer-pattern-viewer-demo.mp4",
            repo: "#",
            description: "A prayer reflection project completed to explore calm product design, protected summaries, and how the same idea can be built across different backend stacks.",
        },
        "colmar-academy": {
            demo: "#",
            repo: "https://github.com/danialzac",
            description: "A responsive layout project completed to strengthen page structure, visual hierarchy, and cleaner adaptation across screen sizes.",
        },
    },
};

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
