document.addEventListener("DOMContentLoaded", () => {
  const catalog = window.resourceCatalog || {};
  const field = new URLSearchParams(window.location.search).get("field");
  const resource = catalog[field];
  const app = document.querySelector("[data-resource-app]");
  const emptyState = document.querySelector("[data-resource-empty]");

  const escapeText = (value) => String(value ?? "");
  const externalLink = (url) => {
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    return link;
  };

  if (!resource) {
    app.hidden = true;
    emptyState.hidden = false;
    const choices = document.querySelector("[data-resource-choices]");
    Object.values(catalog).forEach((item) => {
      const link = document.createElement("a");
      link.href = `index.html?field=${encodeURIComponent(item.slug)}`;
      link.textContent = item.title;
      choices.appendChild(link);
    });
    return;
  }

  document.title = `${resource.title} | BuildLab Internship`;
  const svg = (d) => `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
const icons = {
  frontend: svg('<path d="M18 8V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h8"/><path d="M10 19v-3.96 3.15"/><path d="M7 19h5"/><rect width="6" height="10" x="16" y="12" rx="2"/>'),
  backend: svg('<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/>'),
  "ui-ux": svg('<path d="m18 13-.654-4.736a4 4 0 00-2.756-3.266l-9.163-2.9a2 2 0 00-2.017.493l-.82.819a2 2 0 00-.492 2.017l2.9 9.163a4 4 0 003.266 2.756L13 18"/><path d="M18.648 12.352a1.205 1.205 0 011.704 0l1.296 1.296a1.205 1.205 0 010 1.704l-6.296 6.296a1.205 1.205 0 01-1.704 0l-1.296-1.296a1.205 1.205 0 010-1.704z"/><path d="m3 3 6.586 6.586"/><circle cx="11" cy="11" r="2"/>'),
  qa: svg('<path d="M12 20v-9"/><path d="M14 7a4 4 0 0 1 4 4v3a6 6 0 0 1-12 0v-3a4 4 0 0 1 4-4z"/><path d="M14.12 3.88 16 2"/><path d="M21 21a4 4 0 0 0-3.81-4"/><path d="M21 5a4 4 0 0 1-3.55 3.97"/><path d="M22 13h-4"/><path d="M3 21a4 4 0 0 1 3.81-4"/><path d="M3 5a4 4 0 0 0 3.55 3.97"/><path d="M6 13H2"/><path d="m8 2 1.88 1.88"/><path d="M9 7.13V6a3 3 0 1 1 6 0v1.13"/>'),
  devops: svg('<path d="M6 16c5 0 7-8 12-8a4 4 0 0 1 0 8c-5 0-7-8-12-8a4 4 0 1 0 0 8"/>'),
  "ai-ml": svg('<path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M9 13a4.5 4.5 0 0 0 3-4"/><path d="M6.003 5.125A3 3 0 0 0 6.401 6.5"/><path d="M3.477 10.896a4 4 0 0 1 .585-.396"/><path d="M6 18a4 4 0 0 1-1.967-.516"/><path d="M12 13h4"/><path d="M12 18h6a2 2 0 0 1 2 2v1"/><path d="M12 8h8"/><path d="M16 8V5a2 2 0 0 1 2-2"/><circle cx="16" cy="13" r=".5"/><circle cx="18" cy="3" r=".5"/><circle cx="20" cy="21" r=".5"/><circle cx="20" cy="8" r=".5"/>')
};
document.querySelector("[data-resource-icon]").innerHTML = icons[resource.slug] || resource.icon;
  document.querySelector("[data-resource-status]").textContent = resource.status;
  document.querySelector("[data-resource-phase]").textContent = resource.phase;
  document.querySelector("[data-resource-title]").textContent = resource.title;
  document.querySelector("[data-resource-summary]").textContent = resource.summary;
  document.querySelector("[data-resource-stack]").replaceChildren(...resource.stack.map((item) => {
    const tag = document.createElement("span");
    tag.textContent = item;
    return tag;
  }));

  document.querySelectorAll("[data-resource-topic-count]").forEach((node) => { node.textContent = resource.topics.length; });
  document.querySelectorAll("[data-resource-doc-count]").forEach((node) => { node.textContent = resource.docs.length; });
  document.querySelectorAll("[data-resource-video-count]").forEach((node) => { node.textContent = resource.videos.length; });
  document.querySelectorAll("[data-resource-practice-count]").forEach((node) => { node.textContent = resource.practiceTasks.length; });

  const topics = document.querySelector("[data-resource-topics]");
  resource.topics.forEach((topic, index) => {
    const article = document.createElement("article");
    article.className = "topic-card";
    article.innerHTML = `<span class="topic-number">${String(index + 1).padStart(2, "0")}</span><span class="topic-phase">${escapeText(topic.phase)}</span><h3>${escapeText(topic.title)}</h3><p>${escapeText(topic.description)}</p>`;
    topics.appendChild(article);
  });

  const docs = document.querySelector("[data-resource-docs]");
  resource.docs.forEach((item) => {
    const article = document.createElement("article");
    article.className = "resource-link-card";
    const link = externalLink(item.url);
    link.className = "resource-link-title";
    link.textContent = `${item.title} ↗`;
    const source = document.createElement("span");
    source.className = "resource-link-source";
    source.textContent = `${item.source} · ${item.level}`;
    const reason = document.createElement("p");
    reason.textContent = item.reason;
    article.append(link, source, reason);
    docs.appendChild(article);
  });

  const youtubeId = (url) => {
    try {
      const u = new URL(url);
      if (u.hostname.includes("youtube.com")) return u.searchParams.get("v");
      if (u.hostname === "youtu.be") return u.pathname.slice(1);
    } catch (e) { }
    return null;
  };

  const videos = document.querySelector("[data-resource-videos]");
  resource.videos.forEach((item) => {
    const article = document.createElement("article");
    article.className = "resource-link-card video-card";
    const link = externalLink(item.url);
    link.className = "resource-link-title";
    link.textContent = `${item.title} ↗`;
    const source = document.createElement("span");
    source.className = "resource-link-source";
    source.textContent = `${item.channel} · ${item.level}`;
    const outcome = document.createElement("p");
    outcome.textContent = item.outcome;
    const id = youtubeId(item.url);
    const banner = document.createElement("div");
    banner.className = "video-banner" + (id ? "" : " video-banner-empty");
    banner.dataset.label = "Search on YouTube";
    if (id) {
      const img = document.createElement("img");
      img.src = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
      img.alt = "";
      img.loading = "lazy";
      img.onerror = () => img.remove();   // falls back to the navy banner
      banner.appendChild(img);
    }
    const play = document.createElement("span");
    play.className = "video-play";
    play.textContent = "▶";
    banner.appendChild(play);
    article.append(banner, link, source, outcome);
    videos.appendChild(article);
  });
  document.querySelector("[data-resource-youtube-search]").href = resource.youtubeSearchUrl;

  const practice = document.querySelector("[data-resource-practice]");
  resource.practiceTasks.forEach((task, index) => {
    const article = document.createElement("article");
    article.className = "practice-card";
    article.innerHTML = `<span class="practice-number">TASK ${String(index + 1).padStart(2, "0")}</span><h3>${escapeText(task.title)}</h3><p>${escapeText(task.brief)}</p><dl><div><dt>Deliverable</dt><dd>${escapeText(task.deliverable)}</dd></div><div><dt>Project connection</dt><dd>${escapeText(task.projectApplication)}</dd></div></dl>`;
    practice.appendChild(article);
  });

  document.querySelectorAll("[data-resource-tab]").forEach((tab) => {
    tab.addEventListener("click", () => {
      const selected = tab.dataset.resourceTab;
      document.querySelectorAll("[data-resource-tab]").forEach((item) => {
        const active = item === tab;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-selected", String(active));
      });
      document.querySelectorAll("[data-resource-panel]").forEach((panel) => {
        const active = panel.dataset.resourcePanel === selected;
        panel.classList.toggle("is-active", active);
        panel.hidden = !active;
      });
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwTPMIPOcm-7xxE27Ws2D52DvT-ZbihR1CYQ6qCvygpR1TSSc-MM70Bo8ko1OkLNf7d/exec";

  const form = document.querySelector("#apply-form");
  if (!form) return;

  const status = document.querySelector("#form-status");
  const button = form.querySelector("button[type=submit]");
  const say = (text, type) => { status.textContent = text; status.className = "form-status " + (type || ""); };

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (SCRIPT_URL.startsWith("PASTE_")) return say("Add the Apps Script URL in script.js first.", "err");
    if (!form.checkValidity()) return say("Please fill in all required fields correctly.", "err");

    const data = Object.fromEntries(new FormData(form));
    button.disabled = true;
    say("Sending your application...");
    try {
      // text/plain avoids a CORS preflight, which Apps Script does not support
      const res = await fetch(SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!result.ok) throw new Error(result.error || "Failed");
      form.reset();
      say("Thank you! Your application was sent.", "ok");
    } catch (err) {
      console.error(err);
      say("Sorry, something went wrong. Please try again.", "err");
    } finally {
      button.disabled = false;
    }
  });
});
