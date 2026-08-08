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
  document.querySelector("#current-year").textContent = new Date().getFullYear();

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

  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector(".site-nav");
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
