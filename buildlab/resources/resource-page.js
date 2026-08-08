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

  document.title = `${resource.title} | Engineering Internship`;
  document.querySelector("[data-resource-icon]").textContent = resource.icon;
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
    article.append(link, source, outcome);
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
