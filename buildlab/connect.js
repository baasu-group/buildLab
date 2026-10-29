document.addEventListener("DOMContentLoaded", () => {
  const businessForm = document.querySelector("#connect-business-form");
  const campaignKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
  const pageParams = new URLSearchParams(location.search);
  const attributionStore = "buildlab-business-attribution";
  let attribution = { landing_page: location.pathname, ...Object.fromEntries(campaignKeys.map((key) => [key, ""])) };
  try {
    attribution = { ...attribution, ...JSON.parse(sessionStorage.getItem(attributionStore) || "{}") };
    if (campaignKeys.some((key) => pageParams.has(key))) {
      attribution.landing_page = location.pathname;
      for (const key of campaignKeys) attribution[key] = pageParams.get(key) || "";
    }
    sessionStorage.setItem(attributionStore, JSON.stringify(attribution));
  } catch {
    for (const key of campaignKeys) {
      if (pageParams.has(key)) attribution[key] = pageParams.get(key) || "";
    }
  }
  const setLeadField = (name, value) => {
    const field = businessForm?.elements.namedItem(name);
    if (field) field.value = value;
  };
  const fillAttribution = () => {
    setLeadField("landing_page", attribution.landing_page);
    for (const key of campaignKeys) setLeadField(key, attribution[key] || "");
  };
  fillAttribution();
  document.addEventListener("click", (event) => {
    const link = event.target.closest?.("a[data-lead-source]");
    if (!link) return;
    setLeadField("lead_source", link.dataset.leadSource);
    setLeadField("selected_challenge", link.dataset.leadChallenge || "");
    const topic = businessForm?.elements.namedItem("need");
    if (topic && [...topic.options].some((option) => option.value === link.dataset.leadChallenge)) {
      topic.value = link.dataset.leadChallenge;
    }
  });
  const scrollToSection = (hash) => {
    const section = document.querySelector(hash);
    if (!section) return;
    if (section.tagName === "DETAILS") section.open = true;
    section.scrollIntoView({ block: "start", behavior: "instant" });
    history.replaceState(null, "", location.pathname + location.search);
  };

  document.addEventListener("click", (event) => {
    const link = event.target.closest?.('a[href="#connect-inquiry"], a[href="#connect-sessions"], a[href="#connect-session-interest"]');
    if (!link) return;
    event.preventDefault();
    scrollToSection(link.getAttribute("href"));
  });
  if (["#connect-inquiry", "#connect-sessions", "#connect-session-interest", "#connect-interest"].includes(location.hash)) {
    const destination = location.hash === "#connect-interest" ? "#connect-inquiry" : location.hash;
    requestAnimationFrame(() => scrollToSection(destination));
  }

  const sendForm = (form, successText) => {
    if (!form) return;
    const feedback = form.querySelector(".connect-form-feedback");
    const button = form.querySelector('button[type="submit"]');
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      if (form === businessForm) fillAttribution();
      feedback.hidden = true;
      feedback.classList.remove("is-success");
      button.disabled = true;
      try {
        const payload = Object.fromEntries(new FormData(form).entries());
        const response = await fetch(form.action, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(payload)
        });
        const result = await response.json();
        if (!response.ok || (result.success !== true && result.success !== "true")) {
          throw new Error("Submission was not confirmed");
        }
        form.reset();
        feedback.textContent = successText;
        feedback.classList.add("is-success");
      } catch {
        feedback.textContent = "Your message could not be sent. Please try again or email buildlab.np@gmail.com.";
      } finally {
        feedback.hidden = false;
        button.disabled = false;
      }
    });
  };

  sendForm(
    document.querySelector("#connect-business-form"),
    "Thanks for reaching out! We've received your details and will contact you."
  );
  sendForm(
    document.querySelector("#connect-session-form"),
    "Thanks for your interest! We've received your message. This is not a confirmed booking."
  );

  const list = document.querySelector("#connect-session-list");
  const empty = document.querySelector("#connect-empty");
  const sessionField = document.querySelector("#connect-session-field");
  const sessionSelect = document.querySelector("#connect-session");
  if (!list || !empty || !sessionField || !sessionSelect) return;

  const sessions = (window.buildLabConnectSessions || []).filter((session) =>
    session && session.status === "upcoming" && session.id && session.title &&
    session.topic && /^\d{4}-\d{2}-\d{2}$/.test(session.date || "") &&
    /^\d{2}:\d{2}$/.test(session.time || "") && session.timeZone &&
    session.format && session.description &&
    !Number.isNaN(new Date(`${session.date}T${session.time}:00`).getTime())
  );
  if (!sessions.length) return;
  empty.hidden = true;
  sessionField.hidden = false;

  sessions.forEach((session) => {
    const article = document.createElement("article");
    article.className = "connect-session";
    const details = document.createElement("div");
    const label = document.createElement("p");
    label.className = "eyebrow";
    label.textContent = `${session.topic} · Upcoming`;
    const title = document.createElement("h3");
    title.textContent = session.title;
    const description = document.createElement("p");
    description.textContent = session.description;
    details.append(label, title, description);

    const meta = document.createElement("div");
    meta.className = "connect-session-meta";
    const date = new Date(`${session.date}T${session.time}:00`);
    const dateLabel = document.createElement("strong");
    dateLabel.textContent = new Intl.DateTimeFormat("en", { day: "numeric", month: "long", year: "numeric" }).format(date);
    const timeLabel = document.createElement("span");
    timeLabel.textContent = `${session.time} · ${session.timeZone}`;
    const formatLabel = document.createElement("span");
    formatLabel.textContent = session.format;
    const link = document.createElement("a");
    link.href = "#connect-session-interest";
    link.textContent = "Register session interest ↗";
    const sessionLabel = `${session.title} (${session.date})`;
    link.addEventListener("click", () => { sessionSelect.value = sessionLabel; });
    meta.append(dateLabel, timeLabel, formatLabel, link);
    article.append(details, meta);
    list.append(article);

    const option = document.createElement("option");
    option.value = sessionLabel;
    option.textContent = sessionLabel;
    sessionSelect.append(option);
  });
});
