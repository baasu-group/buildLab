document.addEventListener("DOMContentLoaded", () => {
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
    link.href = "#connect-interest";
    link.textContent = "Register interest ↗";
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
