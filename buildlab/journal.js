/* Journal list and article rendering. Content is always inserted as text. */
document.addEventListener("DOMContentLoaded", () => {
  const entries = Array.isArray(window.buildLabJournal) ? window.buildLabJournal : [];
  const publishable = (entry) => entry.slug && entry.title && entry.author && entry.date && Array.isArray(entry.content) && entry.content.length;
  const visible = entries.filter((entry) => entry.status === "proposed" || (entry.status === "published" && publishable(entry)));
  const safeImage = (path) => typeof path === "string" && /^assets\/[a-z0-9/_-]+\.(svg|png|jpe?g|webp|avif)$/i.test(path);

  function cover(entry, lazy = true) {
    const wrapper = document.createElement("div");
    wrapper.className = "journal-image";
    const image = document.createElement("img");
    image.src = safeImage(entry.image) ? entry.image : "assets/journal-architecture.svg";
    image.alt = entry.imageAlt || "";
    image.width = 960;
    image.height = 600;
    image.decoding = "async";
    if (lazy) image.loading = "lazy";
    wrapper.append(image);
    return wrapper;
  }

  function story(entry, className = "") {
    const article = document.createElement("article");
    article.className = `journal-story ${className}`.trim();
    article.append(cover(entry, className !== "journal-story-featured"));
    const body = document.createElement("div");
    body.className = "journal-story-body";
    const label = document.createElement("span");
    label.className = "journal-label";
    label.textContent = `${entry.status === "published" ? "Published" : "Proposed"} · ${entry.category || "Engineering Journal"}`;
    const heading = document.createElement("h3");
    heading.textContent = entry.title;
    const summary = document.createElement("p");
    summary.textContent = entry.summary || "";
    body.append(label, heading, summary);
    if (entry.slug) {
      const link = document.createElement("a");
      link.className = "journal-read-link";
      link.href = `article.html?slug=${encodeURIComponent(entry.slug)}`;
      link.textContent = entry.status === "published" ? "Read article ↗" : "Explore topic ↗";
      link.setAttribute("aria-label", `${entry.status === "published" ? "Read" : "Explore"} ${entry.title}`);
      body.append(link);
    }
    article.append(body);
    return article;
  }

  const featured = document.querySelector("[data-journal-featured]");
  if (featured) {
    featured.replaceChildren();
    const more = document.querySelector("[data-journal-more]");
    more.replaceChildren();
    if (visible.length) {
      featured.append(story(visible[0], "journal-story-featured"));
      const side = document.createElement("div");
      side.className = "journal-side-grid";
      visible.slice(1, 3).forEach((entry) => side.append(story(entry)));
      if (side.childElementCount) featured.append(side);
      visible.slice(3).forEach((entry) => more.append(story(entry)));
      more.hidden = visible.length <= 3;
    } else {
      const empty = document.createElement("p");
      empty.className = "section-note";
      empty.textContent = "Journal stories are being prepared.";
      featured.append(empty);
      more.hidden = true;
    }
  }

  const articleRoot = document.querySelector("[data-journal-article]");
  if (!articleRoot) return;
  const slug = new URLSearchParams(location.search).get("slug");
  const entry = entries.find((item) => item.slug === slug && (item.status === "proposed" || (item.status === "published" && publishable(item))));
  if (!entry) {
    articleRoot.innerHTML = '<div class="container journal-article-empty"><h1>Article not available.</h1><p>This article has not been published.</p><a class="text-link" href="journal.html">Back to the Journal ↗</a></div>';
    document.title = "Article not available | BuildLab";
    return;
  }
  document.title = `${entry.title} | BuildLab Journal`;
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) metaDescription.content = entry.summary || entry.title;
  articleRoot.replaceChildren();
  const container = document.createElement("div");
  container.className = "container journal-article-container";
  const back = document.createElement("a");
  back.className = "journal-back";
  back.href = "journal.html";
  back.textContent = "← Engineering Journal";
  const label = document.createElement("p");
  label.className = "eyebrow";
  label.textContent = entry.category || "Engineering Journal";
  const title = document.createElement("h1");
  title.textContent = entry.title;
  const summary = document.createElement("p");
  summary.className = "journal-article-summary";
  summary.textContent = entry.summary || "";
  container.append(back, label, title, summary);
  if (entry.status === "published") {
    const byline = document.createElement("p");
    byline.className = "journal-byline";
    const date = /^\d{4}-\d{2}-\d{2}$/.test(entry.date) ? new Date(`${entry.date}T00:00:00Z`) : null;
    const dateLabel = date && !Number.isNaN(date.getTime()) ? date.toLocaleDateString("en", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" }) : entry.date;
    byline.textContent = `By ${entry.author} · ${dateLabel}`;
    container.append(byline);
  } else {
    const status = document.createElement("p");
    status.className = "journal-topic-status";
    status.textContent = "Proposed topic · Article in preparation";
    container.append(status);
  }
  container.append(cover(entry, false));
  const content = document.createElement("div");
  content.className = "journal-article-body";
  if (entry.status === "proposed") {
    const intro = document.createElement("p");
    intro.textContent = "This is a topic we plan to explore in the BuildLab Engineering Journal. The full article will be added after the work and editorial review are complete.";
    content.append(intro);
    if (Array.isArray(entry.topics) && entry.topics.length) {
      const heading = document.createElement("h2");
      heading.textContent = "What we plan to cover";
      const list = document.createElement("ul");
      entry.topics.forEach((topic) => { const item = document.createElement("li"); item.textContent = topic; list.append(item); });
      content.append(heading, list);
    }
  }
  (entry.status === "published" ? entry.content : []).forEach((block) => {
    if (block.type === "heading" && block.text) {
      const heading = document.createElement("h2");
      heading.textContent = block.text;
      content.append(heading);
    } else if (block.type === "paragraph" && block.text) {
      const paragraph = document.createElement("p");
      paragraph.textContent = block.text;
      content.append(paragraph);
    } else if (block.type === "image" && safeImage(block.src)) {
      const figure = document.createElement("figure");
      const image = document.createElement("img");
      image.src = block.src;
      image.alt = block.alt || "";
      image.loading = "lazy";
      image.decoding = "async";
      figure.append(image);
      if (block.caption) {
        const caption = document.createElement("figcaption");
        caption.textContent = block.caption;
        figure.append(caption);
      }
      content.append(figure);
    }
  });
  container.append(content);
  articleRoot.append(container);
});
