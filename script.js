// VINCE PORTFOLIO — UPDATED JAVASCRIPT

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

// Mobile navigation
const menuToggle = $("#menuToggle");
const navLinks = $("#navLinks");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
        const open = navLinks.classList.toggle("open");
        menuToggle.setAttribute("aria-expanded", String(open));
        const icon = $("i", menuToggle);
        if (icon) {
            icon.classList.toggle("fa-bars", !open);
            icon.classList.toggle("fa-xmark", open);
        }
    });

    $$(".nav-link").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
            const icon = $("i", menuToggle);
            if (icon) {
                icon.classList.add("fa-bars");
                icon.classList.remove("fa-xmark");
            }
        });
    });
}

// Theme
const themeToggle = $("#themeToggle");
const savedTheme = localStorage.getItem("vince-theme");
if (savedTheme === "light") document.body.classList.remove("dark-theme");

function updateThemeIcon() {
    const icon = $("i", themeToggle);
    if (!icon) return;
    const dark = document.body.classList.contains("dark-theme");
    icon.classList.toggle("fa-sun", dark);
    icon.classList.toggle("fa-moon", !dark);
}
updateThemeIcon();

themeToggle?.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    localStorage.setItem("vince-theme", document.body.classList.contains("dark-theme") ? "dark" : "light");
    updateThemeIcon();
});

// Typing animation
const typingText = $("#typingText");
const words = ["interactive experiences", "future game projects", "AI / computer vision apps", "developer experiments"];
let wordIndex = 0, charIndex = 0, deleting = false;

function typeEffect() {
    if (!typingText) return;
    const word = words[wordIndex];

    if (!deleting) {
        typingText.textContent = word.slice(0, charIndex + 1);
        charIndex++;
        if (charIndex >= word.length) {
            deleting = true;
            setTimeout(typeEffect, 1400);
            return;
        }
    } else {
        typingText.textContent = word.slice(0, Math.max(0, charIndex - 1));
        charIndex--;
        if (charIndex <= 0) {
            deleting = false;
            wordIndex = (wordIndex + 1) % words.length;
        }
    }
    setTimeout(typeEffect, deleting ? 40 : 75);
}
typeEffect();

// Reveal animation
const revealElements = $$(".reveal");
if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });
    revealElements.forEach(el => observer.observe(el));
} else {
    revealElements.forEach(el => el.classList.add("visible"));
}

// Skill bars
const skillObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const level = entry.target.dataset.level || "0";
        const bar = $(".skill-bar span", entry.target);
        if (bar) bar.style.width = `${level}%`;
        obs.unobserve(entry.target);
    });
}, { threshold: 0.3 });

$$(".skill-card").forEach(card => skillObserver.observe(card));

// Project filtering
const filterButtons = $$(".filter-btn");
const projectCards = $$(".project-card");

filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        const filter = button.dataset.filter;
        projectCards.forEach(card => {
            const categories = (card.dataset.category || "").split(/\s+/);
            card.classList.toggle("hidden", filter !== "all" && !categories.includes(filter));
        });
    });
});

// Subtle 3D card tilt — intentionally no pseudo-element/circle overlay
$$(".tilt-card").forEach(card => {
    card.addEventListener("mousemove", event => {
        if (window.innerWidth < 900) return;
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(900px) rotateX(${(-y * 4).toFixed(2)}deg) rotateY(${(x * 5).toFixed(2)}deg) translateY(-6px)`;
    });
    card.addEventListener("mouseleave", () => {
        card.style.transform = "";
    });
});

// Hero mouse parallax
const heroVisual = $("#heroVisual");
if (heroVisual) {
    heroVisual.addEventListener("mousemove", event => {
        if (window.innerWidth < 900) return;
        const rect = heroVisual.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        heroVisual.style.transform = `translate3d(${x * 8}px, ${y * 8}px, 0)`;
    });
    heroVisual.addEventListener("mouseleave", () => {
        heroVisual.style.transform = "";
    });
}

// Cursor glow
const cursorGlow = $(".cursor-glow");
window.addEventListener("pointermove", event => {
    if (cursorGlow) {
        cursorGlow.style.left = `${event.clientX}px`;
        cursorGlow.style.top = `${event.clientY}px`;
    }
}, { passive: true });

// Achievement image modal
const imageModal = $("#imageModal");
const modalImage = $("#modalImage");
const modalCaption = $("#modalCaption");
const modalClose = $("#modalClose");

function closeImageModal() {
    imageModal?.classList.remove("show");
    imageModal?.setAttribute("aria-hidden", "true");
    if (modalImage) modalImage.src = "";
}

$$(".achievement-card").forEach(card => {
    card.addEventListener("click", () => {
        if (!imageModal || !modalImage) return;
        modalImage.src = card.dataset.image || "";
        if (modalCaption) modalCaption.textContent = card.dataset.title || "";
        imageModal.classList.add("show");
        imageModal.setAttribute("aria-hidden", "false");
    });
});

modalClose?.addEventListener("click", closeImageModal);
imageModal?.addEventListener("click", event => {
    if (event.target === imageModal) closeImageModal();
});

// Terminal
const terminalOutput = $("#terminalOutput");
const terminalForm = $("#terminalForm");
const terminalInput = $("#terminalInput");

const terminalProjects = [
    "01. Warehouse Inventory Management System",
    "02. SysCore",
    "03. Hand Ninja AI",
    "04. Face Tracking AI Scanner",
    "05. QR Code Attendance System"
];

const terminalCommands = {
    help: [
        "AVAILABLE COMMANDS",
        "about     — developer profile",
        "skills    — current technology stack",
        "projects  — featured project list",
        "contact   — contact information",
        "date      — current date",
        "clear     — clear terminal"
    ],
    about: [
        "VINCE PATRICK PARCON MALING",
        "BS Information Technology student",
        "Future Game Developer",
        "Focus: programming, game development, AI, computer vision"
    ],
    skills: [
        "SKILLS",
        "Python       78%",
        "HTML         85%",
        "CSS          82%",
        "JavaScript   76%",
        "Unity        70%",
        "Blender      65%",
        "Computer Vision 68%",
        "Database     64%"
    ],
    projects: [
        "FEATURED PROJECTS",
        ...terminalProjects
    ],
    contact: [
        "CONTACT",
        "Email: vincep899@gmail.com",
        "GitHub: github.com/vincep899-ai",
        "LinkedIn: Vince Patrick Maling"
    ],
    date: [
        `LOCAL DATE: ${new Date().toLocaleDateString()}`
    ]
};

function terminalLine(text, className = "") {
    const line = document.createElement("div");
    line.textContent = text;
    if (className) line.className = className;
    terminalOutput?.appendChild(line);
}

function runCommand(rawCommand) {
    const command = rawCommand.trim().toLowerCase();
    if (!terminalOutput) return;

    if (command === "clear") {
        terminalOutput.innerHTML = "";
        return;
    }

    terminalLine(`vince@portfolio:~$ ${command}`, "cmd");

    if (terminalCommands[command]) {
        terminalCommands[command].forEach((line, index) => {
            terminalLine(line, index === 0 ? "accent" : "");
        });
    } else if (command) {
        terminalLine(`Command not found: ${command}`, "muted");
        terminalLine("Type 'help' to see available commands.", "muted");
    }

    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

terminalForm?.addEventListener("submit", event => {
    event.preventDefault();
    runCommand(terminalInput.value);
    terminalInput.value = "";
});

$$(".terminal-hints button").forEach(button => {
    button.addEventListener("click", () => {
        const command = button.dataset.command || "";
        if (command === "clear") {
            runCommand("clear");
        } else {
            runCommand(command);
        }
        terminalInput?.focus();
    });
});

// Contact form
$("#contactForm")?.addEventListener("submit", event => {
    event.preventDefault();

    const name = $("#contactName")?.value.trim();
    const email = $("#contactEmail")?.value.trim();
    const subject = $("#contactSubject")?.value.trim();
    const message = $("#contactMessage")?.value.trim();

    if (!name || !email || !subject || !message) return;

    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    window.location.href =
        `mailto:vincep899@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
});

// Back to top
const backToTop = $("#backToTop");
window.addEventListener("scroll", () => {
    backToTop?.classList.toggle("show", window.scrollY > 450);
}, { passive: true });

backToTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// Active navigation
const sections = $$("main section[id]");
const navigationLinks = $$(".nav-link");

window.addEventListener("scroll", () => {
    let current = "home";
    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 180) current = section.id;
    });
    navigationLinks.forEach(link => {
        link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
    });
}, { passive: true });

// Toast helper
const toast = $("#toast");
function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2200);
}

// Copyright
const currentYear = $("#currentYear");
if (currentYear) currentYear.textContent = new Date().getFullYear();

// Particle network background
(() => {
    const canvas = $("#particleCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0, height = 0, particles = [];
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function resize() {
        const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = Math.floor(width * dpr);
        canvas.height = Math.floor(height * dpr);
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        const count = Math.max(24, Math.min(width < 700 ? 42 : 80, Math.floor((width * height) / 16000)));
        particles = Array.from({ length: count }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - .5) * .35,
            vy: (Math.random() - .5) * .35,
            r: Math.random() * 1.4 + .6
        }));
        draw();
    }

    function draw() {
        ctx.clearRect(0, 0, width, height);
        const dark = document.body.classList.contains("dark-theme");
        const dot = dark ? "145,185,255" : "57,120,255";
        const line = dark ? "75,135,245" : "57,120,255";
        const maxDistance = width < 700 ? 105 : 145;

        for (const p of particles) {
            if (!reduceMotion) {
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0 || p.x > width) p.vx *= -1;
                if (p.y < 0 || p.y > height) p.vy *= -1;
            }
        }

        for (let i = 0; i < particles.length; i++) {
            const a = particles[i];
            ctx.beginPath();
            ctx.fillStyle = `rgba(${dot},.8)`;
            ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
            ctx.fill();

            for (let j = i + 1; j < particles.length; j++) {
                const b = particles[j];
                const dx = a.x - b.x, dy = a.y - b.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < maxDistance) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(${line},${(1 - dist / maxDistance) * .22})`;
                    ctx.lineWidth = .7;
                    ctx.moveTo(a.x, a.y);
                    ctx.lineTo(b.x, b.y);
                    ctx.stroke();
                }
            }
        }

        if (!reduceMotion) requestAnimationFrame(draw);
    }

    window.addEventListener("resize", resize);
    resize();
})();
