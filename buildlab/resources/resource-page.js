document.addEventListener("DOMContentLoaded", () => {
  const catalog = window.resourceCatalog || {};
  const field = new URLSearchParams(window.location.search).get("field");
  const resource = catalog[field];
  const app = document.querySelector("[data-resource-app]");
  const emptyState = document.querySelector("[data-resource-empty]");

  const escapeText = (value) => String(value ?? "");
  const safeUrl = (url) => {
    try {
      const parsed = new URL(url, window.location.href);
      return /^https?:$/.test(parsed.protocol) ? parsed.href : "#";
    } catch (error) {
      return "#";
    }
  };
  const externalLink = (url) => {
    const link = document.createElement("a");
    link.href = safeUrl(url);
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    return link;
  };
  const hostName = (url) => {
    try { return new URL(url).hostname.replace(/^www\./, ""); } catch (error) { return ""; }
  };

  /* Work out what kind of YouTube link this is: a single video, a playlist, or a search page. */
  const parseYouTube = (url) => {
    try {
      const parsed = new URL(url);
      const host = parsed.hostname.replace(/^www\./, "");
      if (host === "youtu.be") return { kind: "video", id: parsed.pathname.slice(1) };
      if (!/(^|\.)youtube\.com$/.test(host)) return { kind: "link" };
      if (parsed.pathname === "/watch" && parsed.searchParams.get("v")) return { kind: "video", id: parsed.searchParams.get("v") };
      if (parsed.pathname === "/playlist" && parsed.searchParams.get("list")) return { kind: "playlist", id: parsed.searchParams.get("list") };
      if (parsed.pathname === "/results") return { kind: "search" };
    } catch (error) { /* fall through */ }
    return { kind: "link" };
  };

  /* ---------- In-page YouTube player ---------- */
  let lastTrigger = null;
  const modal = document.createElement("div");
  modal.className = "video-modal";
  modal.hidden = true;
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("aria-label", "Video player");
  modal.innerHTML = `<div class="video-modal-backdrop" data-video-close></div><div class="video-modal-box"><div class="video-modal-bar"><strong data-video-title></strong><button type="button" class="video-modal-close" data-video-close aria-label="Close video">✕</button></div><div class="video-frame" data-video-frame></div><div class="video-modal-foot"><span>If the video does not play here, open it directly on YouTube.</span><a data-video-yt target="_blank" rel="noopener noreferrer">Watch on YouTube ↗</a></div></div>`;
  document.body.appendChild(modal);

  const closeVideo = () => {
    modal.hidden = true;
    modal.querySelector("[data-video-frame]").replaceChildren(); // stops playback
    document.body.classList.remove("has-video-modal");
    if (lastTrigger) lastTrigger.focus();
  };
  const openVideo = (item, info, trigger) => {
    lastTrigger = trigger;
    const embed = info.kind === "playlist"
      ? `https://www.youtube-nocookie.com/embed/videoseries?list=${encodeURIComponent(info.id)}&autoplay=1&rel=0`
      : `https://www.youtube-nocookie.com/embed/${encodeURIComponent(info.id)}?autoplay=1&rel=0`;
    const iframe = document.createElement("iframe");
    iframe.src = embed;
    iframe.title = item.title;
    iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen";
    iframe.allowFullscreen = true;
    iframe.referrerPolicy = "strict-origin-when-cross-origin";
    modal.querySelector("[data-video-frame]").replaceChildren(iframe);
    modal.querySelector("[data-video-title]").textContent = item.title;
    modal.querySelector("[data-video-yt]").href = safeUrl(item.url);
    modal.hidden = false;
    document.body.classList.add("has-video-modal");
    modal.querySelector(".video-modal-close").focus();
  };
  modal.addEventListener("click", (event) => { if (event.target.closest("[data-video-close]")) closeVideo(); });
  document.addEventListener("keydown", (event) => { if (event.key === "Escape" && !modal.hidden) closeVideo(); });

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
    article.className = "resource-link-card doc-card";
    const link = externalLink(item.url);
    link.className = "resource-link-title";
    link.textContent = item.title;
    link.setAttribute("aria-label", `${item.title} – opens ${hostName(item.url)} in a new tab`);
    const source = document.createElement("span");
    source.className = "resource-link-source";
    source.textContent = `${item.source} · ${item.level}`;
    const reason = document.createElement("p");
    reason.textContent = item.reason;
    const open = externalLink(item.url);
    open.className = "resource-open-doc";
    open.setAttribute("tabindex", "-1");
    open.setAttribute("aria-hidden", "true");
    open.textContent = `Open documentation · ${hostName(item.url)} ↗`;
    article.append(link, source, reason, open);
    // Make the entire card clickable (the title link stays the keyboard/screen-reader target).
    article.addEventListener("click", (event) => {
      if (event.target.closest("a")) return;
      window.open(safeUrl(item.url), "_blank", "noopener,noreferrer");
    });
    docs.appendChild(article);
  });

  const videos = document.querySelector("[data-resource-videos]");
  resource.videos.forEach((item) => {
    const info = parseYouTube(item.url);
    const playable = info.kind === "video" || info.kind === "playlist";
    const article = document.createElement("article");
    article.className = "resource-link-card video-card";

    if (playable) {
      const thumb = document.createElement("button");
      thumb.type = "button";
      thumb.className = "video-thumb";
      thumb.setAttribute("aria-label", `Play video: ${item.title}`);
      if (info.kind === "video") {
        const img = document.createElement("img");
        img.src = `https://i.ytimg.com/vi/${encodeURIComponent(info.id)}/hqdefault.jpg`;
        img.alt = "";
        img.loading = "lazy";
        img.addEventListener("error", () => img.remove());
        thumb.appendChild(img);
      }
      const play = document.createElement("span");
      play.className = "video-play";
      play.textContent = info.kind === "playlist" ? "▶ Playlist" : "▶";
      thumb.appendChild(play);
      thumb.addEventListener("click", () => openVideo(item, info, thumb));
      article.appendChild(thumb);
    }

    const title = playable ? document.createElement("button") : externalLink(item.url);
    if (playable) {
      title.type = "button";
      title.addEventListener("click", () => openVideo(item, info, title));
    }
    title.classList.add("resource-link-title");
    if (playable) title.classList.add("video-title-button");
    title.textContent = playable ? item.title : `${item.title} ↗`;

    const source = document.createElement("span");
    source.className = "resource-link-source";
    source.textContent = `${item.channel} · ${item.level}`;
    const outcome = document.createElement("p");
    outcome.textContent = item.outcome;

    const actions = document.createElement("div");
    actions.className = "video-actions";
    if (playable) {
      const watch = document.createElement("button");
      watch.type = "button";
      watch.className = "video-watch";
      watch.textContent = "▶ Watch here";
      watch.addEventListener("click", () => openVideo(item, info, watch));
      actions.appendChild(watch);
    }
    const yt = externalLink(item.url);
    yt.className = "video-yt-link";
    yt.textContent = info.kind === "search" ? "Browse results on YouTube ↗" : "Open on YouTube ↗";
    actions.appendChild(yt);

    article.append(title, source, outcome, actions);
    videos.appendChild(article);
  });
  document.querySelector("[data-resource-youtube-search]").href = safeUrl(resource.youtubeSearchUrl);

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
