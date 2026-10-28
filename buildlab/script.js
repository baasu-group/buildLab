document.addEventListener("DOMContentLoaded", () => {
  const year = document.querySelector("#current-year");
  if (year) year.textContent = new Date().getFullYear();

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
