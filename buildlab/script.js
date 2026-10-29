document.addEventListener("DOMContentLoaded", () => {
  // Keep older shared links to homepage sections working after the page split.
  if ((location.pathname.endsWith("/") || location.pathname.endsWith("/index.html")) && location.hash) {
    const previousSections = {
      about: "about.html#about", expertise: "expertise.html#expertise",
      "how-we-work": "about.html#how-we-work", pathways: "opportunities.html#pathways",
      mentorship: "mentorship.html#mentorship", journey: "mentorship.html#journey",
      resources: "mentorship.html#resources", contact: "contact.html#contact",
      apply: "mentorship.html#apply", "application-form": "mentorship.html#application-form"
    };
    const destination = previousSections[decodeURIComponent(location.hash.slice(1))];
    if (destination) { location.replace(destination); return; }
  }
  const year = document.querySelector("#current-year");
  if (year) year.textContent = new Date().getFullYear();

  const resourceGroups = [
    { id: "upcoming-webinars", title: "Upcoming webinars", summary: "Live sessions will appear here when a date and topic are confirmed.", items: [] },
    { id: "past-webinars", title: "Past webinars", summary: "Recordings and recaps will appear here after a session is published.", items: [] },
    { id: "blog", title: "Blog", summary: "Engineering journal topics and new writing from BuildLab.", items: [
      { title: "Explore the Engineering Journal", href: "journal.html", note: "Proposed topics are clearly labeled until published." },
      { title: "From learning syntax to shipping software", href: "article.html?slug=learning-to-ship", note: "Proposed article topic" }
    ] },
    { id: "cheat-sheets", title: "Cheat sheets", summary: "Short references you can use while planning and reviewing work.", items: [
      { title: "Project scoping quick reference", href: "library.html#project-scope", note: "Questions for a first project conversation" },
      { title: "Code review quick reference", href: "library.html#code-review", note: "A practical review checklist" }
    ] },
    { id: "tutorials", title: "Tutorials", summary: "Follow a learning path and put each topic into practice.", items: [
      { title: "Frontend engineering learning path", href: "resources/index.html?field=frontend", note: "Topics, videos, and practice tasks" },
      { title: "Backend engineering learning path", href: "resources/index.html?field=backend", note: "Topics, videos, and practice tasks" },
      { title: "AI/ML learning path", href: "resources/index.html?field=ai-ml", note: "Topics, videos, and practice tasks" },
      { title: "All seven mentorship tracks", href: "mentorship.html#resources", note: "Choose the path that fits you" }
    ] },
    { id: "docs", title: "Docs", summary: "Authoritative documentation and BuildLab learning guides.", items: [
      { title: "Browse BuildLab learning paths", href: "mentorship.html#resources", note: "Seven tracks with official documentation" },
      { title: "MDN Web Docs", href: "https://developer.mozilla.org/en-US/docs/Web", note: "Web platform reference" },
      { title: "Python documentation", href: "https://docs.python.org/3/", note: "Official language documentation" },
      { title: "React documentation", href: "https://react.dev/learn", note: "Official React learning guide" }
    ] },
    { id: "podcasts", title: "Podcasts", summary: "BuildLab podcast episodes will appear here when released.", items: [] }
  ];
  const resourcePath = location.pathname.includes("/resources/") ? "../" : "";
  const resourceHref = (href) => /^(https?:|mailto:|#)/.test(href) ? href : resourcePath + href;
  const nav = document.querySelector(".site-nav");
  if (nav) {
    const wrapper = document.createElement("div");
    wrapper.className = "resources-nav";
    const trigger = document.createElement("button");
    trigger.className = "resources-trigger";
    trigger.type = "button";
    trigger.setAttribute("aria-expanded", "false");
    trigger.setAttribute("aria-controls", "resources-popover");
    trigger.textContent = "Resources";
    const panel = document.createElement("div");
    panel.id = "resources-popover";
    panel.className = "resources-popover";
    panel.hidden = true;
    panel.innerHTML = '<div class="resources-popover-list" role="group" aria-label="Resource categories"></div><div class="resources-popover-content" aria-live="polite"></div>';
    const list = panel.querySelector(".resources-popover-list");
    const content = panel.querySelector(".resources-popover-content");
    const renderPreview = (group) => {
      list.querySelectorAll("button").forEach((button) => {
        const active = button.dataset.resourceGroup === group.id;
        button.classList.toggle("is-active", active);
        button.setAttribute("aria-pressed", String(active));
      });
      content.replaceChildren();
      const header = document.createElement("div");
      header.className = "resources-popover-heading";
      const title = document.createElement("span");
      title.textContent = group.title;
      const all = document.createElement("a");
      all.href = resourceHref(`library.html#${group.id}`);
      all.textContent = `See ${group.title.toLowerCase()} →`;
      header.append(title, all);
      const summary = document.createElement("p");
      summary.textContent = group.summary;
      content.append(header, summary);
      if (group.items.length) {
        const links = document.createElement("ul");
        group.items.forEach((item) => {
          const row = document.createElement("li");
          const link = document.createElement("a");
          link.href = resourceHref(item.href);
          link.textContent = item.title;
          if (item.href.startsWith("https:")) { link.target = "_blank"; link.rel = "noopener noreferrer"; }
          row.append(link);
          links.append(row);
        });
        content.append(links);
      } else {
        const empty = document.createElement("div");
        empty.className = "resources-popover-empty";
        empty.textContent = "Nothing published in this category yet. Explore the hub for updates.";
        content.append(empty);
      }
    };
    resourceGroups.forEach((group) => {
      const button = document.createElement("button");
      button.type = "button";
      button.dataset.resourceGroup = group.id;
      button.textContent = group.title;
      button.addEventListener("click", () => renderPreview(group));
      button.addEventListener("mouseenter", () => renderPreview(group));
      list.append(button);
    });
    const allResources = document.createElement("a");
    allResources.href = resourceHref("library.html");
    allResources.className = "resources-all-link";
    allResources.textContent = "See all resources →";
    const mentorshipLink = document.createElement("a");
    mentorshipLink.href = resourceHref("mentorship.html");
    mentorshipLink.className = "resources-mentorship-link";
    mentorshipLink.innerHTML = '<strong>Mentorship at BuildLab</strong><span>Explore the six-month journey and seven learning tracks →</span>';
    list.append(allResources, mentorshipLink);
    wrapper.append(trigger, panel);
    const fallbackLink = nav.querySelector("[data-resources-link]");
    if (fallbackLink) fallbackLink.replaceWith(wrapper);
    else nav.insertBefore(wrapper, nav.querySelector(".nav-cta"));
    renderPreview(resourceGroups[3]);
    const closeResources = () => { panel.hidden = true; trigger.setAttribute("aria-expanded", "false"); };
    trigger.addEventListener("click", () => {
      const opening = panel.hidden;
      panel.hidden = !opening;
      trigger.setAttribute("aria-expanded", String(opening));
    });
    document.addEventListener("click", (event) => { if (!wrapper.contains(event.target)) closeResources(); });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && !panel.hidden) { closeResources(); trigger.focus(); }
    });
    panel.addEventListener("click", (event) => { if (event.target.closest("a")) closeResources(); });
  }

  const categoryGrid = document.querySelector("[data-library-categories]");
  const sectionContainer = document.querySelector("[data-library-sections]");
  if (categoryGrid && sectionContainer) {
    resourceGroups.forEach((group, index) => {
      const category = document.createElement("a");
      category.className = "library-category-card";
      category.href = `#${group.id}`;
      const number = document.createElement("span");
      number.textContent = String(index + 1).padStart(2, "0");
      const title = document.createElement("strong");
      title.textContent = group.title;
      const arrow = document.createElement("span");
      arrow.textContent = "↗";
      category.append(number, title, arrow);
      categoryGrid.append(category);
      const section = document.createElement("section");
      section.className = "library-group";
      section.id = group.id;
      const heading = document.createElement("div");
      heading.className = "library-group-heading";
      const copy = document.createElement("div");
      const eyebrow = document.createElement("p");
      eyebrow.className = "eyebrow";
      eyebrow.textContent = `Resource ${String(index + 1).padStart(2, "0")}`;
      const h2 = document.createElement("h2");
      h2.textContent = group.title;
      const description = document.createElement("p");
      description.textContent = group.summary;
      copy.append(eyebrow, h2, description);
      heading.append(copy);
      section.append(heading);
      if (group.items.length) {
        const cards = document.createElement("div");
        cards.className = "library-item-grid";
        group.items.forEach((item) => {
          const card = document.createElement("a");
          card.className = "library-item";
          card.href = item.href;
          if (item.href.startsWith("https:")) { card.target = "_blank"; card.rel = "noopener noreferrer"; }
          const label = document.createElement("strong");
          label.textContent = `${item.title} ↗`;
          const note = document.createElement("span");
          note.textContent = item.note;
          card.append(label, note);
          cards.append(card);
        });
        section.append(cards);
      } else {
        const empty = document.createElement("div");
        empty.className = "library-empty";
        empty.innerHTML = '<p>No items have been published in this category yet.</p><a href="connect.html#connect-session-interest">Suggest a session topic →</a>';
        section.append(empty);
      }
      if (group.id === "cheat-sheets") {
        const sheets = document.createElement("div");
        sheets.className = "library-cheat-sheets";
        sheets.innerHTML = '<article id="project-scope"><h3>Project scoping quick reference</h3><p>Before proposing a build, write down:</p><ol><li>Who uses the solution and what they need to do.</li><li>How the work happens today and where it breaks down.</li><li>The smallest useful outcome for a first release.</li><li>Existing systems, data, constraints, and decision makers.</li><li>How the team will review progress and agree on next steps.</li></ol><a href="partnerships.html">Explore project partnerships →</a></article><article id="code-review"><h3>Code review quick reference</h3><p>Before approving a change, check:</p><ol><li>Does the change solve the stated problem?</li><li>Are names, boundaries, and error states clear?</li><li>Are accessibility and responsive behavior covered?</li><li>Do tests cover meaningful behavior and likely regressions?</li><li>Can the next contributor understand the decision?</li></ol><a href="mentorship.html#resources">Explore learning paths →</a></article>';
        section.append(sheets);
      }
      sectionContainer.append(section);
    });
    const targetId = decodeURIComponent(location.hash.slice(1));
    if (targetId && document.getElementById(targetId)) {
      requestAnimationFrame(() => document.getElementById(targetId)?.scrollIntoView());
    }
  }

  document.querySelectorAll("[data-resource-card]").forEach((card) => {
    const resource = window.resourceCatalog?.[card.dataset.resourceCard];
    if (!resource) return;
    card.querySelector(".resource-status").textContent = resource.status;
    card.querySelector(".resource-icon").textContent = resource.icon;
    card.querySelector("[data-resource-card-topics]").textContent = resource.topics.length;
    card.querySelector("[data-resource-card-docs]").textContent = resource.docs.length;
    card.querySelector("[data-resource-card-videos]").textContent = resource.videos.length;
  });

  const teamContainer = document.querySelector("#team-profiles");
  const teamEmpty = document.querySelector("#team-empty");
  const approvedTeam = (window.buildLabTeam || []).filter((person) =>
    person.visible === true && person.roleVerified === true && person.name && person.role
  );
  if (teamContainer && approvedTeam.length) {
    document.querySelector("#team").hidden = false;
    teamEmpty.hidden = true;
    approvedTeam.forEach((person) => {
      const card = document.createElement("article");
      card.className = "principle-card team-card";
      const name = document.createElement("h3");
      name.textContent = person.name;
      const role = document.createElement("p");
      role.className = "team-role";
      role.textContent = person.role;
      card.append(name, role);
      if (person.bio) {
        const bio = document.createElement("p");
        bio.textContent = person.bio;
        card.append(bio);
      }
      if (person.url && /^https:\/\//i.test(person.url)) {
        const link = document.createElement("a");
        link.className = "text-link";
        link.href = person.url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = "Professional profile ↗";
        card.append(link);
      }
      teamContainer.append(card);
    });
  }

  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".site-nav");
  if (!menuButton || !navigation) return;
  menuButton.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });
  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navigation.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
});
