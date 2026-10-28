/*
 * Add and edit Journal entries here. See docs/JOURNAL_PUBLISHING.md.
 * status: "proposed" shows an idea and its topic page; "draft" stays hidden;
 * "published" shows a card and opens the full article.
 * Keep image files inside buildlab/assets/ and use paths starting with assets/.
 */
window.buildLabJournal = [
  {
    slug: "multi-tenant-saas-lessons",
    status: "proposed",
    category: "Engineering notes",
    title: "Lessons from Building a Multi-Tenant SaaS Platform",
    summary: "Architecture decisions, tenant isolation, authentication, and scaling considerations.",
    image: "assets/journal-architecture.svg",
    imageAlt: "",
    author: "",
    date: "",
    topics: ["Choosing boundaries between tenants", "Authentication and access", "What to measure as usage grows"],
    content: []
  },
  {
    slug: "good-code-review",
    status: "proposed",
    category: "Team culture",
    title: "What Makes a Good Code Review?",
    summary: "How review can improve implementation quality and share engineering knowledge.",
    image: "assets/journal-review.svg",
    imageAlt: "",
    author: "",
    date: "",
    topics: ["Giving useful feedback", "Keeping reviews focused", "Sharing decisions with the team"],
    content: []
  },
  {
    slug: "local-to-production",
    status: "proposed",
    category: "Engineering practice",
    title: "From Local Development to Production",
    summary: "Practical lessons in deployment, environments, and operating software.",
    image: "assets/journal-release.svg",
    imageAlt: "",
    author: "",
    date: "",
    topics: ["Preparing environments", "Checking a release", "Learning from production feedback"],
    content: []
  },
  {
    slug: "learning-to-ship",
    status: "proposed",
    category: "Mentorship",
    title: "From Learning Syntax to Shipping Software",
    summary: "The move from individual exercises to contributing within a team.",
    image: "assets/journal-mentorship.svg",
    imageAlt: "",
    author: "",
    date: "",
    topics: ["Moving beyond exercises", "Working with team feedback", "Taking ownership of a contribution"],
    content: []
  }
];
