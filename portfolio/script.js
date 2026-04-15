// Default portfolio data (with creative tagline)
const DEFAULT_DATA = {
    tagline: "✨ vision crafter",
    name: "Manideep Gembali",
    title: "Computer Science Engineering Student",
    bio: "First-year engineering student at LPU, passionate about web dev, Python, and creative coding. Building future-ready experiences.",
    about: "I am a passionate Computer Science Engineering student with a strong foundation in Python, HTML, and CSS. Focused on expanding skills in full-stack development and solving real-world problems through elegant interfaces. Constantly exploring new tech and open-source.",
    skills: ["Python", "HTML5", "CSS3", "JavaScript", "React.js", "Tailwind CSS", "Git"],
    education: [
        { degree: "SSC (10th)", institution: "Thammi Naidu Concept School", year: "2022", score: "84.3%" },
        { degree: "Intermediate (12th)", institution: "Sri Viswa Junior College", year: "2024", score: "96.3%" },
        { degree: "B.Tech Computer Science", institution: "Lovely Professional University", year: "2024 - 2028", score: "Pursuing" }
    ],
    projects: [
        { title: "Nebula Portfolio UI", desc: "Responsive editable portfolio with glassmorphism & live customization." },
        { title: "TaskFlow Manager", desc: "Productivity web app with drag-drop and local storage persistence." },
        { title: "AI Image Gallery", desc: "Creative frontend using unsplash API and micro-interactions." }
    ],
    contact: {
        phone: "+91 9392569961",
        email: "manideepgembali9@gmail.com",
        location: "Parvathipuram, Andhra Pradesh",
        github: "github.com/ManideepGembali9",
        linkedin: "linkedin.com/in/manideep-gembali",
        resumeUrl: ""
    },
    avatarUrl: "https://ui-avatars.com/api/?background=8b5cf6&color=fff&rounded=true&bold=true&size=120&name=MD",
    footerYear: "2026",
    logoText: "✦ Eclipse"
};

let portfolio = JSON.parse(localStorage.getItem("creative_portfolio_final"));
if (!portfolio) {
    portfolio = JSON.parse(JSON.stringify(DEFAULT_DATA));
    saveData();
}

function saveData() {
    localStorage.setItem("creative_portfolio_final", JSON.stringify(portfolio));
}

function escapeHtml(str) {
    if (!str) return "";
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

// Render everything
function renderAll() {
    // Tagline
    const taglineElem = document.getElementById("creativeTagline");
    if (taglineElem) taglineElem.innerText = portfolio.tagline || "✨ vision crafter";
    
    document.getElementById("displayName").innerText = portfolio.name;
    document.getElementById("displayTitle").innerText = portfolio.title;
    document.getElementById("displayBio").innerText = portfolio.bio;
    document.getElementById("displayAbout").innerText = portfolio.about;
    document.getElementById("contactPhone").innerText = portfolio.contact.phone;
    document.getElementById("contactEmail").innerText = portfolio.contact.email;
    document.getElementById("contactLocation").innerText = portfolio.contact.location;
    document.getElementById("contactGithub").innerText = portfolio.contact.github;
    document.getElementById("contactLinkedin").innerText = portfolio.contact.linkedin;
    document.getElementById("footerYear").innerText = portfolio.footerYear;
    document.getElementById("logoDisplay").innerText = portfolio.logoText;
    document.getElementById("avatarImg").src = portfolio.avatarUrl;
    
    const resumeLinkSpan = document.getElementById("resumeLinkDisplay");
    if (resumeLinkSpan) {
        resumeLinkSpan.innerText = portfolio.contact.resumeUrl ? "Resume ready (click button)" : "Resume available for download";
    }
    
    // Skills
    const skillsContainer = document.getElementById("skillsListContainer");
    skillsContainer.innerHTML = "";
    portfolio.skills.forEach(skill => {
        const chip = document.createElement("div");
        chip.className = "skill-chip";
        chip.innerText = skill;
        skillsContainer.appendChild(chip);
    });
    
    // Education
    const eduContainer = document.getElementById("educationContainer");
    eduContainer.innerHTML = "";
    portfolio.education.forEach(edu => {
        const card = document.createElement("div");
        card.className = "edu-card";
        card.innerHTML = `
            <div class="edu-degree">${escapeHtml(edu.degree)}</div>
            <div class="edu-institution">${escapeHtml(edu.institution)}</div>
            <div class="edu-year"><i class="far fa-calendar-alt"></i> ${escapeHtml(edu.year)}</div>
            <div class="edu-score"><i class="fas fa-star-of-life"></i> ${escapeHtml(edu.score || "—")}</div>
        `;
        eduContainer.appendChild(card);
    });
    
    // Projects
    const projContainer = document.getElementById("projectsContainer");
    projContainer.innerHTML = "";
    portfolio.projects.forEach(proj => {
        const card = document.createElement("div");
        card.className = "project-card";
        card.innerHTML = `<div class="project-title">${escapeHtml(proj.title)}</div><div style="color:#475569;">${escapeHtml(proj.desc)}</div>`;
        projContainer.appendChild(card);
    });
}

// Populate modal with current data
function populateModal() {
    document.getElementById("editTagline").value = portfolio.tagline || "";
    document.getElementById("editName").value = portfolio.name;
    document.getElementById("editTitle").value = portfolio.title;
    document.getElementById("editBio").value = portfolio.bio;
    document.getElementById("editAbout").value = portfolio.about;
    document.getElementById("editSkills").value = portfolio.skills.join(", ");
    document.getElementById("editEducation").value = JSON.stringify(portfolio.education, null, 2);
    document.getElementById("editProjects").value = JSON.stringify(portfolio.projects, null, 2);
    document.getElementById("editPhone").value = portfolio.contact.phone;
    document.getElementById("editEmail").value = portfolio.contact.email;
    document.getElementById("editLocation").value = portfolio.contact.location;
    document.getElementById("editGithub").value = portfolio.contact.github;
    document.getElementById("editLinkedin").value = portfolio.contact.linkedin;
    document.getElementById("editResumeUrl").value = portfolio.contact.resumeUrl || "";
    document.getElementById("editAvatarUrl").value = portfolio.avatarUrl;
    document.getElementById("editFooterYear").value = portfolio.footerYear;
    document.getElementById("editLogoText").value = portfolio.logoText;
}

function saveFromModal() {
    const newSkills = document.getElementById("editSkills").value.split(",").map(s => s.trim()).filter(s => s);
    let newEdu = [];
    try {
        newEdu = JSON.parse(document.getElementById("editEducation").value);
        if (!Array.isArray(newEdu)) throw new Error();
    } catch(e) { newEdu = portfolio.education; }
    
    let newProjects = [];
    try {
        newProjects = JSON.parse(document.getElementById("editProjects").value);
        if (!Array.isArray(newProjects)) throw new Error();
    } catch(e) { newProjects = portfolio.projects; }
    
    portfolio.tagline = document.getElementById("editTagline").value.trim() || "✨ vision crafter";
    portfolio.name = document.getElementById("editName").value.trim() || portfolio.name;
    portfolio.title = document.getElementById("editTitle").value.trim() || portfolio.title;
    portfolio.bio = document.getElementById("editBio").value.trim() || portfolio.bio;
    portfolio.about = document.getElementById("editAbout").value.trim() || portfolio.about;
    portfolio.skills = newSkills.length ? newSkills : portfolio.skills;
    portfolio.education = newEdu;
    portfolio.projects = newProjects;
    portfolio.contact.phone = document.getElementById("editPhone").value.trim() || portfolio.contact.phone;
    portfolio.contact.email = document.getElementById("editEmail").value.trim() || portfolio.contact.email;
    portfolio.contact.location = document.getElementById("editLocation").value.trim() || portfolio.contact.location;
    portfolio.contact.github = document.getElementById("editGithub").value.trim() || portfolio.contact.github;
    portfolio.contact.linkedin = document.getElementById("editLinkedin").value.trim() || portfolio.contact.linkedin;
    portfolio.contact.resumeUrl = document.getElementById("editResumeUrl").value.trim();
    portfolio.avatarUrl = document.getElementById("editAvatarUrl").value.trim() || DEFAULT_DATA.avatarUrl;
    portfolio.footerYear = document.getElementById("editFooterYear").value.trim() || "2026";
    portfolio.logoText = document.getElementById("editLogoText").value.trim() || "✦ Eclipse";
    
    saveData();
    renderAll();
    closeModal();
}

function resetToDefault() {
    portfolio = JSON.parse(JSON.stringify(DEFAULT_DATA));
    saveData();
    renderAll();
    closeModal();
}

// Resume download handler
function handleResumeDownload() {
    const resumeUrl = portfolio.contact.resumeUrl;
    if (resumeUrl && resumeUrl.trim() !== "") {
        window.open(resumeUrl, "_blank");
    } else {
        // Generate a simple text resume as PDF fallback
        const content = `RESUME - ${portfolio.name}\n\n${portfolio.title}\n\nAbout: ${portfolio.about}\n\nEducation:\n${portfolio.education.map(e => `- ${e.degree} from ${e.institution} (${e.year}) - ${e.score}`).join('\n')}\n\nSkills: ${portfolio.skills.join(", ")}\n\nContact: ${portfolio.contact.email} | ${portfolio.contact.phone}`;
        const blob = new Blob([content], { type: "application/pdf" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${portfolio.name.replace(/\s/g, "_")}_Resume.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
}

// Modal controls
const modal = document.getElementById("editModal");
const openBtn = document.getElementById("settingsFab");
const closeBtn = document.getElementById("closeModalBtn");

function openModal() {
    populateModal();
    modal.style.display = "flex";
}
function closeModal() {
    modal.style.display = "none";
}

openBtn.addEventListener("click", openModal);
closeBtn.addEventListener("click", closeModal);
window.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });

document.getElementById("saveSettingsBtn").addEventListener("click", saveFromModal);
document.getElementById("resetDefaultBtn").addEventListener("click", resetToDefault);
document.getElementById("resumeDownloadBtn").addEventListener("click", handleResumeDownload);

// Dark mode toggle
let darkMode = false;
const themeBtn = document.getElementById("themeToggle");
themeBtn.addEventListener("click", () => {
    if (!darkMode) {
        document.body.style.background = "#0f111a";
        document.body.style.color = "#f1f5f9";
        const elements = document.querySelectorAll(".about-card, .contact-wrapper, .project-card, .edu-card, .skill-chip, .edit-note");
        elements.forEach(el => {
            el.style.backgroundColor = "#1e293b";
            el.style.color = "#e2e8f0";
            el.style.borderColor = "#334155";
        });
        themeBtn.innerHTML = "<i class='fas fa-sun'></i>";
    } else {
        document.body.style.background = "radial-gradient(circle at 10% 30%, #f8fafc, #eef2ff)";
        document.body.style.color = "#0a0c1a";
        const elements = document.querySelectorAll(".about-card, .contact-wrapper, .project-card, .edu-card, .skill-chip, .edit-note");
        elements.forEach(el => {
            el.style.backgroundColor = "";
            el.style.color = "";
            el.style.borderColor = "";
        });
        themeBtn.innerHTML = "<i class='fas fa-moon'></i>";
    }
    darkMode = !darkMode;
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        const href = this.getAttribute("href");
        if (href === "#") return;
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: "smooth" });
        }
    });
});

// Initial render
renderAll();
// Avatar fallback
document.getElementById("avatarImg").onerror = () => {
    document.getElementById("avatarImg").src = "https://ui-avatars.com/api/?background=6d28d9&color=fff&name=User";
};
