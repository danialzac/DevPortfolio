const siteConfig = {
    personal: {
        name: "Danial Zac",
        title: "Danial Zac | Developer Portfolio",
        description: "Danial Zac's developer portfolio showcasing full-stack and frontend projects.",
        github: "https://github.com/danialzac",
        linkedin: "https://www.linkedin.com/in/danial-rohman/",
        email: "danialzac@gmail.com",
        resume: {
            href: "assets/cv/CVdania.pdf",
            download: "Danial-Zac-CV.pdf",
        },
    },
    projects: {
        "capstone-project": {
            demo: "https://github.com/danialzac/voltora",
            repo: "https://github.com/danialzac/voltara-backend.git",
            description: "A full-stack platform concept for sharing and exploring electronics builds, designed with structured content, secure access, and room to scale.",
        },
        "spotify-playlist": {
            demo: "https://lucent-maamoul-066f68.netlify.app/",
            repo: "https://github.com/danialzac/spotify-jamming.git",
            description: "A React playlist builder focused on smooth interaction, clean component structure, and a polished listening-flow experience.",
        },
        "airstream-sportswear": {
            demo: "#",
            repo: "https://github.com/danialzac",
            description: "A responsive storefront concept built to practice layout clarity, interface polish, and client-facing interactions such as form validation.",
        },
        "find-your-hat": {
            repo: "https://github.com/danialzac",
            description: "A JavaScript maze game centered on game-state logic, movement rules, and simple mechanics that stay readable and fun.",
        },
        "pokedex": {
            demo: "#",
            repo: "https://github.com/danialzac",
            description: "An interactive Pokedex that uses live API data to turn raw information into a cleaner, more exploratory browsing experience.",
        },
        "colmar-academy": {
            demo: "#",
            repo: "https://github.com/danialzac",
            description: "A responsive academy landing page focused on layout systems, visual hierarchy, and adapting content cleanly across screen sizes.",
        },
    },
};

document.addEventListener("DOMContentLoaded", () => {
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

    document.querySelectorAll('[data-site-field="name"]').forEach((element) => {
        element.textContent = siteConfig.personal.name;
    });

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

    document.querySelectorAll("[data-project-description]").forEach((element) => {
        const projectKey = element.getAttribute("data-project-description");
        const project = siteConfig.projects[projectKey];

        if (project?.description) {
            element.textContent = project.description;
        }
    });

    document.querySelectorAll("[data-project-link]").forEach((element) => {
        const [projectKey, linkType] = element.getAttribute("data-project-link").split(/-(?=[^-]+$)/);
        const project = siteConfig.projects[projectKey];

        if (project?.[linkType]) {
            element.setAttribute("href", project[linkType]);
        }
    });

});
