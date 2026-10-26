/* Replace the placeholder values below before publishing. */
const siteConfig = {
  applicationForm: "", // Example: https://forms.gle/your-application-form
  feedbackForm: "", // Example: https://forms.gle/your-feedback-form
  contactEmail: "mailto:baasugroup@gmail.com",
  githubRepo: "https://github.com/baasu-group/learning-resources",
  linkedin: "", // Example: https://www.linkedin.com/company/your-company
  discord: "", // Example: https://discord.gg/your-community
  calendar: "", // Example: https://cal.com/your-team/intro
  resourceFrontend: "INT-026-08-01/Frontend_Resources/README.md",
  resourceBackend: "INT-026-08-01/Backend_resources/README.md",
  resourceUiUx: "INT-026-08-01/UI_UX_resources/README.md",
  resourceQa: "INT-026-08-01/QA_esources/README.md",
  resourceDevops: "", // Example: https://github.com/baasu-group/learning-resources/tree/main/resources/devops
  resourceAiMl: "", // Example: https://github.com/baasu-group/learning-resources/tree/main/resources/ai-ml
};

document.addEventListener("DOMContentLoaded", () => {
  const year = document.querySelector("#current-year");
  if (year) year.textContent = new Date().getFullYear();

  document.querySelectorAll("[data-link]").forEach((element) => {
    const destination = siteConfig[element.dataset.link];
    if (destination) {
      element.href = destination;
      if (/^https?:\/\//i.test(destination)) {
        element.target = "_blank";
        element.rel = "noopener noreferrer";
      }
    }
  });

  document.querySelectorAll("[data-resource-card]").forEach((card) => {
    const resource = window.resourceCatalog?.[card.dataset.resourceCard];
    if (!resource) return;
    card.querySelector(".resource-status").textContent = resource.status;
    const iconEl = card.querySelector(".resource-icon");
    if (iconEl && !iconEl.querySelector("svg")) iconEl.textContent = resource.icon;
    card.querySelector("[data-resource-card-topics]").textContent = resource.topics.length;
    card.querySelector("[data-resource-card-docs]").textContent = resource.docs.length;
    card.querySelector("[data-resource-card-videos]").textContent = resource.videos.length;
  });

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

/* ---------- Application Form ---------- */
const SCRIPT_URL = "http://localhost:8001/api/apply-public/"; // change to the live address before publishing

const applyDialog = document.querySelector("#apply-dialog");
const applyForm = document.querySelector("#apply-form");

if (applyDialog && applyForm) {
  const formStatus = document.querySelector("#form-status");
  const applySuccess = document.querySelector("#apply-success");
  const submitButton = applyForm.querySelector("button[type=submit]");

  document.querySelectorAll('[data-link="applicationForm"]').forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      applyForm.hidden = false;     
      applySuccess.hidden = true;    
      formStatus.textContent = "";
      applyDialog.showModal();
    });
  });

  document.addEventListener("click", (event) => {
    if (event.target.closest("[data-close-dialog]")) {
      event.preventDefault();
      applyDialog.close();
      return;
    }
    if (event.target === applyDialog) applyDialog.close();
  });

  applyForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!applyForm.checkValidity()) {
      formStatus.textContent = "Please fill in all required fields.";
      return;
    }

    const data = Object.fromEntries(new FormData(applyForm));
    submitButton.disabled = true;
    formStatus.textContent = "Sending...";

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 15000); // give up after 15 seconds

    try {
      const response = await fetch(SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(data),
        signal: controller.signal,
      });
      const result = await response.json();
      if (!result.ok) throw new Error(result.error || "Failed");

      applyForm.reset();
      formStatus.textContent = "";
      applyForm.hidden = true;
      applySuccess.hidden = false;
    } catch (error) {
      console.error(error);
      formStatus.textContent =
        error.name === "AbortError"
          ? "This is taking too long. Please try again."
          : "Sorry, something went wrong. Please try again.";
    } finally {
      clearTimeout(timer);
      submitButton.disabled = false;
    }
  });
}

