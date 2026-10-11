/* Replace the placeholder values below before publishing. */
const siteConfig = {
  applicationForm: "", // Example: https://forms.gle/your-application-form
  feedbackForm: "", // Example: https://forms.gle/your-feedback-form
  contactEmail: "mailto:baasugroup@gmail.com",
  githubRepo: "https://github.com/baasu-group/learning-resources",
  linkedin: "", // Example: https://www.linkedin.com/company/your-company
  discord: "", // Example: https://discord.gg/your-community
  calendar: "", // Example: https://cal.com/your-team/intro
  resourceFrontend: "resources/index.html?field=frontend",
  resourceBackend: "resources/index.html?field=backend",
  resourceUiUx: "resources/index.html?field=ui-ux",
  resourceQa: "resources/index.html?field=qa",
  resourceDevops: "resources/index.html?field=devops",
  resourceAiMl: "resources/index.html?field=ai-ml",
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
    card.querySelector(".resource-icon").textContent = resource.icon;
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
