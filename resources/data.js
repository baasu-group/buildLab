/*
 * Internship learning catalogue.
 * Keep this file content-only so new resources can be added without changing
 * the resource page layout. All links are public and free to access.
 */
window.resourceCatalog = {
  frontend: {
    slug: "frontend",
    title: "Frontend Engineering",
    shortTitle: "Frontend",
    icon: "</>",
    status: "Available",
    phase: "Months 1–6",
    summary: "Build accessible, responsive interfaces that connect cleanly to real APIs and feel ready for real users.",
    stack: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Tailwind CSS"],
    topics: [
      { title: "Web foundations", description: "Semantic HTML, CSS layout, responsive behavior, browser basics, and modern JavaScript.", phase: "Months 1–2" },
      { title: "React fundamentals", description: "Components, JSX, props, state, events, hooks, rendering, and component composition.", phase: "Months 1–2" },
      { title: "Next.js application structure", description: "App Router, layouts, loading states, errors, metadata, routing, and server/client boundaries.", phase: "Months 2–3" },
      { title: "UI systems with Tailwind", description: "Reusable patterns, responsive layouts, tokens, states, and maintainable utility classes.", phase: "Months 2–3" },
      { title: "Forms and API integration", description: "Validation, loading and error states, pagination, authentication flows, and REST API consumption.", phase: "Months 3–4" },
      { title: "Accessibility and performance", description: "Keyboard navigation, semantics, WCAG basics, performance budgets, images, and perceived speed.", phase: "Months 3–4" },
      { title: "Testing and quality", description: "Component behavior, browser flows, API-backed UI, regression coverage, and release checks.", phase: "Months 4–5" },
      { title: "Production delivery", description: "Pull requests, code review, environment configuration, deployment, monitoring, and handoff.", phase: "Months 5–6" }
    ],
    docs: [
      { title: "MDN HTML", url: "https://developer.mozilla.org/en-US/docs/Web/HTML", source: "MDN Web Docs", level: "Foundation", reason: "Use semantic, accessible markup as the base of every screen." },
      { title: "MDN CSS", url: "https://developer.mozilla.org/en-US/docs/Web/CSS", source: "MDN Web Docs", level: "Foundation", reason: "Learn layout, responsive design, selectors, and browser behavior." },
      { title: "MDN JavaScript Guide", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide", source: "MDN Web Docs", level: "Foundation", reason: "Build the language fundamentals needed for React work." },
      { title: "React Learn", url: "https://react.dev/learn", source: "Official React documentation", level: "Core", reason: "Learn modern React with components, state, events, and hooks." },
      { title: "React API Reference", url: "https://react.dev/reference/react", source: "Official React documentation", level: "Reference", reason: "Use the authoritative reference while building reusable UI." },
      { title: "Next.js Learn", url: "https://nextjs.org/learn", source: "Official Next.js documentation", level: "Core", reason: "Build a full-stack dashboard while learning routing, data, auth, and accessibility." },
      { title: "Next.js App Router", url: "https://nextjs.org/docs/app", source: "Official Next.js documentation", level: "Reference", reason: "Use the current App Router patterns during project implementation." },
      { title: "Tailwind CSS documentation", url: "https://tailwindcss.com/docs", source: "Official Tailwind CSS documentation", level: "Core", reason: "Create consistent responsive interfaces with utility-first CSS." },
      { title: "Web accessibility basics", url: "https://web.dev/learn/accessibility", source: "web.dev", level: "Production", reason: "Turn accessibility into a normal part of frontend delivery." },
      { title: "Playwright installation and testing", url: "https://playwright.dev/docs/intro", source: "Official Playwright documentation", level: "Testing", reason: "Automate real browser journeys across modern browsers." }
    ],
    videos: [
      { title: "Next.js for Beginners – Full Course", url: "https://www.youtube.com/watch?v=1WmNXEVia8I", channel: "freeCodeCamp.org", outcome: "Build and deploy a full-stack Next.js app with routing, data, APIs, and deployment.", level: "Core project" },
      { title: "Hands-On React Using Real World Projects", url: "https://www.youtube.com/watch?v=tlHyG8fAEHs", channel: "ProCodrr", outcome: "Practice component composition, search, filtering, and a real UI flow.", level: "Practice" },
      { title: "React Course – Beginner’s Tutorial", url: "https://www.youtube.com/watch?v=bMknfKXIFA8", channel: "freeCodeCamp.org", outcome: "Strengthen React fundamentals through a complete beginner course.", level: "Foundation" },
      { title: "Tailwind CSS Full Course for Beginners", url: "https://www.youtube.com/watch?v=UBOj6rqRUME", channel: "Dave Gray", outcome: "Create responsive layouts and reusable styling patterns with Tailwind CSS.", level: "Practice" }
    ],
    youtubeSearchUrl: "https://www.youtube.com/results?search_query=React+Next.js+Tailwind+CSS+real+world+project",
    practiceTasks: [
      { title: "Build an accessible dashboard shell", brief: "Create a responsive layout with navigation, page header, empty states, and keyboard-friendly interactions.", deliverable: "A reviewed dashboard shell with responsive screenshots and an accessibility checklist.", projectApplication: "Becomes the visual foundation for the Team Management Platform." },
      { title: "Connect a task list to an API", brief: "Implement loading, success, empty, error, search, filtering, and pagination states against a REST endpoint.", deliverable: "A working task list with a short API integration note and tests for key states.", projectApplication: "Directly supports task management, search, and pagination." },
      { title: "Ship a reviewed feature", brief: "Open a pull request, respond to review comments, fix a regression, and document the final change.", deliverable: "Merged pull request with screenshots, review notes, and a release checklist.", projectApplication: "Practices the real delivery workflow used in Months 4–6." }
    ]
  },
  backend: {
    slug: "backend",
    title: "Backend Engineering",
    shortTitle: "Backend",
    icon: "⌘",
    status: "Available",
    phase: "Months 1–6",
    summary: "Design secure, testable APIs and data models that support real product workflows and changing requirements.",
    stack: ["Python", "Django", "Django REST Framework", "PostgreSQL", "REST APIs"],
    topics: [
      { title: "Python foundations", description: "Clean functions, modules, exceptions, data structures, testing, and readable code.", phase: "Months 1–2" },
      { title: "Django project structure", description: "Projects, apps, settings, URLs, views, admin, migrations, and environment configuration.", phase: "Months 1–2" },
      { title: "Models and relational data", description: "Entities, relationships, constraints, migrations, querysets, indexes, and transactions.", phase: "Months 2–3" },
      { title: "REST API design", description: "Resources, serializers, status codes, pagination, filtering, validation, and consistent errors.", phase: "Months 2–3" },
      { title: "Authentication and permissions", description: "Identity, sessions or tokens, role-based access, object-level permissions, and secure defaults.", phase: "Months 3–4" },
      { title: "Testing and documentation", description: "Unit tests, API tests, fixtures, contract thinking, OpenAPI documentation, and regression coverage.", phase: "Months 3–4" },
      { title: "Performance and security", description: "Query efficiency, caching basics, input validation, secrets, logging, and common web risks.", phase: "Months 4–5" },
      { title: "Production operations", description: "Gunicorn, Docker, PostgreSQL configuration, health checks, migrations, and deployment handoff.", phase: "Months 5–6" }
    ],
    docs: [
      { title: "The Python Tutorial", url: "https://docs.python.org/3/tutorial/", source: "Official Python documentation", level: "Foundation", reason: "Build the language foundation required for clean backend code." },
      { title: "PEP 8 style guide", url: "https://peps.python.org/pep-0008/", source: "Python Enhancement Proposals", level: "Practice", reason: "Use a shared style standard during reviews." },
      { title: "Django first tutorial", url: "https://docs.djangoproject.com/en/stable/intro/tutorial01/", source: "Official Django documentation", level: "Core", reason: "Learn Django by building a small real application." },
      { title: "Django models", url: "https://docs.djangoproject.com/en/stable/topics/db/models/", source: "Official Django documentation", level: "Core", reason: "Model the team, membership, and task domain correctly." },
      { title: "Django authentication", url: "https://docs.djangoproject.com/en/stable/topics/auth/", source: "Official Django documentation", level: "Security", reason: "Understand users, groups, permissions, and secure identity flows." },
      { title: "Django testing", url: "https://docs.djangoproject.com/en/stable/topics/testing/", source: "Official Django documentation", level: "Testing", reason: "Turn business rules into repeatable automated checks." },
      { title: "DRF Quickstart", url: "https://www.django-rest-framework.org/tutorial/quickstart/", source: "Official Django REST Framework documentation", level: "Core", reason: "Build serializers, viewsets, routers, permissions, and pagination." },
      { title: "DRF API guide", url: "https://www.django-rest-framework.org/api-guide/", source: "Official Django REST Framework documentation", level: "Reference", reason: "Use the authoritative API reference while implementing features." },
      { title: "PostgreSQL tutorial", url: "https://www.postgresql.org/docs/current/tutorial.html", source: "Official PostgreSQL documentation", level: "Database", reason: "Practice relational design, SQL, joins, and transactions." },
      { title: "Django deployment checklist", url: "https://docs.djangoproject.com/en/stable/howto/deployment/checklist/", source: "Official Django documentation", level: "Production", reason: "Review the security and configuration work required before release." }
    ],
    videos: [
      { title: "Python Django Framework Full Course", url: "https://www.youtube.com/watch?v=cI3FOYIMSYE", channel: "freeCodeCamp.org", outcome: "Learn Django fundamentals by following a complete application build.", level: "Foundation" },
      { title: "Django REST Framework Full Course", url: "https://www.youtube.com/watch?v=c708Nf0cB9I", channel: "freeCodeCamp.org", outcome: "Practice building REST APIs, serializers, views, and authentication.", level: "Core project" },
      { title: "PostgreSQL Tutorial Full Course", url: "https://www.youtube.com/watch?v=qw--VYLpxG4", channel: "freeCodeCamp.org", outcome: "Strengthen SQL, relational modeling, joins, and database fundamentals.", level: "Database" },
      { title: "Django REST API project search", url: "https://www.youtube.com/results?search_query=Django+REST+Framework+production+API+project", channel: "YouTube search", outcome: "Find current production-oriented Django REST project walkthroughs.", level: "Explore" }
    ],
    youtubeSearchUrl: "https://www.youtube.com/results?search_query=Python+Django+DRF+PostgreSQL+real+world+project",
    practiceTasks: [
      { title: "Model teams and memberships", brief: "Design users, teams, memberships, roles, and constraints with migrations and seed data.", deliverable: "An ERD, migrations, model tests, and a short decision record.", projectApplication: "Creates the domain foundation for role-based team management." },
      { title: "Build a secure task API", brief: "Implement task CRUD with serializers, permissions, filtering, pagination, and consistent errors.", deliverable: "Documented endpoints with API tests for allowed and denied actions.", projectApplication: "Becomes the main backend capability for the product." },
      { title: "Prepare a production release", brief: "Containerize the API, configure environment variables, add health checks, and document deployment steps.", deliverable: "Docker setup, release checklist, and rollback notes.", projectApplication: "Practices the operational work required for Months 4–6." }
    ]
  },
  "ui-ux": {
    slug: "ui-ux",
    title: "UI/UX Design",
    shortTitle: "UI/UX",
    icon: "✦",
    status: "Available",
    phase: "Months 1–6",
    summary: "Turn real user problems into clear flows, usable interfaces, and implementation-ready design systems.",
    stack: ["Figma", "User research", "Prototyping", "Design systems", "Accessibility"],
    topics: [
      { title: "Problem framing", description: "Understand users, constraints, business goals, assumptions, and measurable outcomes.", phase: "Months 1–2" },
      { title: "Research and synthesis", description: "Plan interviews, collect evidence, identify patterns, and write useful insights.", phase: "Months 1–2" },
      { title: "Information architecture", description: "Create navigation, content hierarchy, user journeys, and task flows.", phase: "Months 2–3" },
      { title: "Wireframes and prototypes", description: "Move from low-fidelity structure to testable, realistic interaction flows.", phase: "Months 2–3" },
      { title: "Visual systems in Figma", description: "Use components, variables, layout rules, typography, color, and states consistently.", phase: "Months 3–4" },
      { title: "Usability and accessibility", description: "Test with users, identify friction, and design for different abilities and contexts.", phase: "Months 3–4" },
      { title: "Developer handoff", description: "Document behavior, edge cases, responsive rules, content, and acceptance criteria.", phase: "Months 4–5" },
      { title: "Design QA and iteration", description: "Compare implementation with intent, log gaps, prioritize fixes, and refine the system.", phase: "Months 5–6" }
    ],
    docs: [
      { title: "Figma Help Center", url: "https://help.figma.com/hc/en-us", source: "Official Figma documentation", level: "Foundation", reason: "Learn the tool workflows used for shared design work." },
      { title: "Figma components guide", url: "https://help.figma.com/hc/en-us/articles/360038662654-Guide-to-components-in-Figma", source: "Official Figma documentation", level: "Core", reason: "Create reusable components and variants instead of one-off screens." },
      { title: "Figma auto layout guide", url: "https://help.figma.com/hc/en-us/articles/360040451373-Guide-to-auto-layout", source: "Official Figma documentation", level: "Core", reason: "Design layouts that adapt to content and implementation constraints." },
      { title: "Figma variables guide", url: "https://help.figma.com/hc/en-us/articles/14506821864087-Guide-to-variables-in-Figma", source: "Official Figma documentation", level: "Systems", reason: "Use variables for scalable tokens and modes." },
      { title: "Accessibility fundamentals", url: "https://www.w3.org/WAI/fundamentals/accessibility-intro/", source: "W3C Web Accessibility Initiative", level: "Production", reason: "Design products that work for people with different abilities." },
      { title: "WCAG 2.2 quick reference", url: "https://www.w3.org/WAI/WCAG22/quickref/", source: "W3C Web Accessibility Initiative", level: "Reference", reason: "Use concrete accessibility success criteria during design review." },
      { title: "Ten usability heuristics", url: "https://www.nngroup.com/articles/ten-usability-heuristics/", source: "Nielsen Norman Group", level: "Usability", reason: "Use a practical heuristic checklist to find interaction problems." },
      { title: "Material 3 foundations", url: "https://m3.material.io/foundations", source: "Material Design", level: "Systems", reason: "Study a mature public design system and its foundations." },
      { title: "Designing for developers", url: "https://www.nngroup.com/articles/design-developer-handoff/", source: "Nielsen Norman Group", level: "Handoff", reason: "Make design decisions clear and actionable for implementation." },
      { title: "Web forms accessibility", url: "https://www.w3.org/WAI/tutorials/forms/", source: "W3C Web Accessibility Initiative", level: "Practice", reason: "Design usable, correctly labeled forms for the product." }
    ],
    videos: [
      { title: "Figma UI UX Design Tutorial for Beginners", url: "https://www.youtube.com/watch?v=ezldKx-jPag", channel: "freeCodeCamp.org", outcome: "Practice creating layouts, components, and a complete interface in Figma.", level: "Foundation" },
      { title: "Figma for Beginners", url: "https://www.youtube.com/results?search_query=Figma+for+beginners+design+systems+components", channel: "YouTube search", outcome: "Find current component, auto-layout, and design-system walkthroughs.", level: "Core" },
      { title: "UX Research and Design Process", url: "https://www.youtube.com/results?search_query=UX+research+user+flows+wireframes+real+project", channel: "YouTube search", outcome: "Compare practical research and product-design workflows.", level: "Practice" },
      { title: "Design Systems in Figma", url: "https://www.youtube.com/results?search_query=Figma+design+system+variables+components+tutorial", channel: "YouTube search", outcome: "Explore current approaches to scalable visual systems.", level: "Systems" }
    ],
    youtubeSearchUrl: "https://www.youtube.com/results?search_query=UI+UX+Figma+real+world+project+design+system",
    practiceTasks: [
      { title: "Map the team task journey", brief: "Interview or role-play users, identify their goals, and map the current and improved task flow.", deliverable: "Research notes, assumptions, journey map, and prioritized design problem.", projectApplication: "Creates evidence for the platform’s core navigation and task workflow." },
      { title: "Create a responsive design system", brief: "Build colors, type, spacing, buttons, forms, cards, and states with Figma components.", deliverable: "A published Figma library and usage notes for developers.", projectApplication: "Gives frontend interns a consistent implementation source of truth." },
      { title: "Run design QA", brief: "Compare a built screen with the approved design across states and breakpoints.", deliverable: "Annotated QA report with severity, evidence, and recommended fixes.", projectApplication: "Makes design quality part of the real release workflow." }
    ]
  },
  qa: {
    slug: "qa",
    title: "Quality Assurance",
    shortTitle: "QA",
    icon: "✓",
    status: "Available",
    phase: "Months 1–6",
    summary: "Build confidence in every release through risk-based testing, clear defect reporting, and repeatable quality checks.",
    stack: ["Test design", "API testing", "Playwright", "Bug tracking", "CI quality gates"],
    topics: [
      { title: "Quality mindset", description: "Understand risk, acceptance criteria, quality ownership, and prevention over late inspection.", phase: "Months 1–2" },
      { title: "Test planning", description: "Turn requirements into test scenarios, cases, data, environments, and exit criteria.", phase: "Months 1–2" },
      { title: "Functional and exploratory testing", description: "Test happy paths, edge cases, permissions, errors, and unknown risks systematically.", phase: "Months 2–3" },
      { title: "API testing", description: "Validate status codes, schemas, authentication, permissions, data changes, and failure behavior.", phase: "Months 2–3" },
      { title: "Defect reporting", description: "Write reproducible bugs with impact, evidence, environment, severity, and expected behavior.", phase: "Months 3–4" },
      { title: "Browser automation", description: "Create reliable browser tests with locators, fixtures, isolation, traces, and reports.", phase: "Months 3–4" },
      { title: "Regression and release quality", description: "Build smoke suites, release checklists, risk reviews, and triage routines.", phase: "Months 4–5" },
      { title: "Quality in CI", description: "Run useful checks on pull requests and make failures actionable for the whole team.", phase: "Months 5–6" }
    ],
    docs: [
      { title: "Playwright introduction", url: "https://playwright.dev/docs/intro", source: "Official Playwright documentation", level: "Automation", reason: "Learn browser testing with isolation, assertions, and reports." },
      { title: "Playwright running tests", url: "https://playwright.dev/docs/running-tests", source: "Official Playwright documentation", level: "Practice", reason: "Run, debug, filter, and inspect tests across browsers." },
      { title: "Playwright API testing", url: "https://playwright.dev/docs/api-testing", source: "Official Playwright documentation", level: "API", reason: "Test REST APIs and prepare server state directly." },
      { title: "Postman test scripts", url: "https://learning.postman.com/docs/tests-and-scripts/write-scripts/test-scripts/", source: "Postman Learning Center", level: "API", reason: "Practice approachable API assertions and workflow checks." },
      { title: "OWASP Web Security Testing Guide", url: "https://owasp.org/www-project-web-security-testing-guide/", source: "OWASP", level: "Security", reason: "Learn how security risks are tested in real web applications." },
      { title: "Selenium documentation", url: "https://www.selenium.dev/documentation/", source: "Official Selenium documentation", level: "Reference", reason: "Understand a widely used browser automation ecosystem." },
      { title: "GitHub Actions CI", url: "https://docs.github.com/en/actions/automating-builds-and-tests/building-and-testing", source: "GitHub Docs", level: "CI", reason: "Run quality checks automatically on repository changes." },
      { title: "Django testing", url: "https://docs.djangoproject.com/en/stable/topics/testing/", source: "Official Django documentation", level: "Backend", reason: "Understand how backend tests protect business rules." },
      { title: "HTTP response status codes", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status", source: "MDN Web Docs", level: "API", reason: "Interpret API behavior and report failures precisely." },
      { title: "Testing Library guiding principles", url: "https://testing-library.com/docs/guiding-principles/", source: "Testing Library", level: "Frontend", reason: "Write tests around user behavior instead of implementation details." }
    ],
    videos: [
      { title: "Playwright API Testing Tutorial", url: "https://www.youtube.com/watch?v=4-E5PVM4LuI", channel: "Test Automation 101", outcome: "Write API tests, validate responses, handle auth, and connect testing to CI/CD.", level: "API automation" },
      { title: "Playwright testing for beginners", url: "https://www.youtube.com/watch?v=H2-5ecFwHHQ", channel: "LambdaTest", outcome: "Learn browser automation, locators, assertions, and practical test structure.", level: "Foundation" },
      { title: "Postman API testing tutorial", url: "https://www.youtube.com/results?search_query=Postman+API+testing+test+scripts+beginner", channel: "YouTube search", outcome: "Find current API testing workflows and assertion examples.", level: "API" },
      { title: "Software testing real-world project", url: "https://www.youtube.com/results?search_query=software+testing+real+world+project+bug+report+test+case", channel: "YouTube search", outcome: "Compare practical test planning, bug reporting, and regression workflows.", level: "Practice" }
    ],
    youtubeSearchUrl: "https://www.youtube.com/results?search_query=QA+testing+Playwright+API+testing+real+world+project",
    practiceTasks: [
      { title: "Write a risk-based test plan", brief: "Turn the team-management requirements into risks, scenarios, test data, and release priorities.", deliverable: "Test plan with traceability to product requirements and acceptance criteria.", projectApplication: "Defines quality work before implementation starts." },
      { title: "Test the permissions matrix", brief: "Exercise member, manager, and admin actions across UI and API paths, including denied cases.", deliverable: "Permission test suite and reproducible defect reports.", projectApplication: "Protects one of the product’s most important business rules." },
      { title: "Create a release quality gate", brief: "Automate smoke coverage, publish a report in CI, and define what blocks a release.", deliverable: "CI test workflow, report, and release checklist.", projectApplication: "Builds release confidence for the Months 4–6 project phase." }
    ]
  },
  devops: {
    slug: "devops",
    title: "DevOps and Delivery",
    shortTitle: "DevOps",
    icon: "⚙",
    status: "Available",
    phase: "Months 2–6",
    summary: "Make software delivery repeatable, observable, and safe from a developer laptop to a shared environment.",
    stack: ["Git", "GitHub", "Docker", "GitHub Actions", "Linux", "Deployment"],
    topics: [
      { title: "Git collaboration", description: "Branches, commits, pull requests, reviews, conflict resolution, and useful history.", phase: "Months 1–2" },
      { title: "Linux and environments", description: "Processes, files, permissions, environment variables, logs, and shell-based workflows.", phase: "Months 2–3" },
      { title: "Docker fundamentals", description: "Images, containers, Dockerfiles, volumes, networks, and reproducible development.", phase: "Months 2–3" },
      { title: "Docker Compose", description: "Run the frontend, backend, database, and supporting services together locally.", phase: "Months 3–4" },
      { title: "Continuous integration", description: "Build, lint, test, cache dependencies, and report status on pull requests.", phase: "Months 3–4" },
      { title: "Secrets and environments", description: "Separate local, staging, and production configuration without exposing credentials.", phase: "Months 4–5" },
      { title: "Deployment and observability", description: "Health checks, logs, metrics basics, failure diagnosis, and safe rollbacks.", phase: "Months 5–6" },
      { title: "Delivery ownership", description: "Document runbooks, release responsibilities, and the operational handoff.", phase: "Months 5–6" }
    ],
    docs: [
      { title: "Pro Git book", url: "https://git-scm.com/book/en/v2", source: "Official Git documentation", level: "Foundation", reason: "Build reliable version-control habits for team development." },
      { title: "GitHub flow", url: "https://docs.github.com/en/get-started/using-github/github-flow", source: "GitHub Docs", level: "Collaboration", reason: "Use a lightweight branch and pull-request workflow." },
      { title: "Docker getting started", url: "https://docs.docker.com/get-started/", source: "Official Docker documentation", level: "Core", reason: "Learn containers through practical application workflows." },
      { title: "Containerize a Django application", url: "https://docs.docker.com/guides/django/", source: "Docker Guides", level: "Project", reason: "Connect Docker, Django, PostgreSQL, and Compose in a realistic stack." },
      { title: "GitHub Actions concepts", url: "https://docs.github.com/en/actions/get-started/understand-github-actions", source: "GitHub Docs", level: "CI/CD", reason: "Understand workflows, jobs, runners, and reusable actions." },
      { title: "GitHub Actions CI", url: "https://docs.github.com/en/actions/automating-builds-and-tests/building-and-testing", source: "GitHub Docs", level: "CI", reason: "Build and test changes automatically on pull requests." },
      { title: "The Twelve-Factor App", url: "https://12factor.net/", source: "12factor.net", level: "Production", reason: "Learn portable principles for configuration and deployment." },
      { title: "Kubernetes concepts", url: "https://kubernetes.io/docs/concepts/", source: "Official Kubernetes documentation", level: "Operations", reason: "Understand the platform concepts behind container orchestration." },
      { title: "OWASP secrets management", url: "https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html", source: "OWASP", level: "Security", reason: "Avoid leaking credentials through code and automation." },
      { title: "Prometheus getting started", url: "https://prometheus.io/docs/prometheus/latest/getting_started/", source: "Official Prometheus documentation", level: "Observability", reason: "Understand the basics of metrics and service monitoring." }
    ],
    videos: [
      { title: "Docker and Kubernetes Full Course", url: "https://www.youtube.com/watch?v=3c-iBn73dDE", channel: "TechWorld with Nana", outcome: "Understand containers, images, Dockerfiles, and orchestration concepts.", level: "Core" },
      { title: "GitHub Actions tutorial", url: "https://www.youtube.com/watch?v=R8_veQiYBjI", channel: "TechWorld with Nana", outcome: "Create CI workflows that build and test software automatically.", level: "CI/CD" },
      { title: "DevOps project with Docker and CI/CD", url: "https://www.youtube.com/results?search_query=DevOps+Docker+GitHub+Actions+real+world+project", channel: "YouTube search", outcome: "Find current end-to-end delivery projects and compare approaches.", level: "Project" },
      { title: "Linux and deployment fundamentals", url: "https://www.youtube.com/results?search_query=Linux+deployment+Docker+production+beginner", channel: "YouTube search", outcome: "Practice the operational concepts needed to support a deployed service.", level: "Foundation" }
    ],
    youtubeSearchUrl: "https://www.youtube.com/results?search_query=DevOps+Docker+GitHub+Actions+CI+CD+real+world+project",
    practiceTasks: [
      { title: "Containerize the development stack", brief: "Run the application and PostgreSQL locally with reproducible configuration and health checks.", deliverable: "Dockerfiles, Compose file, setup instructions, and troubleshooting notes.", projectApplication: "Makes onboarding and cross-track integration reliable." },
      { title: "Add pull-request CI", brief: "Run formatting, tests, and basic security checks for every pull request.", deliverable: "GitHub Actions workflow with clear pass/fail output.", projectApplication: "Creates a quality gate before changes enter the shared product." },
      { title: "Write a production runbook", brief: "Document deployment, environment variables, logs, health checks, rollback, and common incidents.", deliverable: "A versioned runbook tested by another intern.", projectApplication: "Builds real operational ownership before final handoff." }
    ]
  },
  "ai-ml": {
    slug: "ai-ml",
    title: "AI and Machine Learning",
    shortTitle: "AI/ML",
    icon: "◎",
    status: "Available",
    phase: "Months 2–6",
    summary: "Learn enough data and AI engineering to build small, explainable, evaluated features responsibly.",
    stack: ["Python", "NumPy", "pandas", "scikit-learn", "LLM APIs", "Evaluation"],
    topics: [
      { title: "Python data foundations", description: "Work with arrays, tabular data, notebooks, files, and reproducible environments.", phase: "Months 1–2" },
      { title: "Data preparation", description: "Collect, clean, validate, split, document, and protect data before modeling.", phase: "Months 2–3" },
      { title: "ML fundamentals", description: "Features, labels, training, validation, overfitting, baselines, and metrics.", phase: "Months 2–3" },
      { title: "Model evaluation", description: "Choose useful metrics, inspect errors, compare baselines, and communicate uncertainty.", phase: "Months 3–4" },
      { title: "AI product integration", description: "Design safe API boundaries, structured outputs, fallbacks, latency budgets, and cost awareness.", phase: "Months 3–4" },
      { title: "Prompting and workflows", description: "Write clear instructions, constrain outputs, use tools safely, and version prompts.", phase: "Months 4–5" },
      { title: "Responsible AI", description: "Privacy, security, bias, misuse, human review, transparency, and data minimization.", phase: "Months 4–5" },
      { title: "AI feature operations", description: "Evaluate changes, monitor quality, handle failures, and document known limitations.", phase: "Months 5–6" }
    ],
    docs: [
      { title: "NumPy quickstart", url: "https://numpy.org/doc/stable/user/quickstart.html", source: "Official NumPy documentation", level: "Data", reason: "Learn the array operations behind scientific Python." },
      { title: "pandas getting started", url: "https://pandas.pydata.org/docs/getting_started/intro_tutorials/", source: "Official pandas documentation", level: "Data", reason: "Practice loading, cleaning, joining, and analyzing data." },
      { title: "scikit-learn getting started", url: "https://scikit-learn.org/stable/getting_started.html", source: "Official scikit-learn documentation", level: "ML", reason: "Build a first reproducible machine-learning workflow." },
      { title: "Google Machine Learning Crash Course", url: "https://developers.google.com/machine-learning/crash-course", source: "Google for Developers", level: "ML", reason: "Study practical ML concepts, exercises, and evaluation." },
      { title: "Hugging Face course", url: "https://huggingface.co/learn", source: "Hugging Face", level: "AI", reason: "Learn modern model and NLP workflows with practical examples." },
      { title: "OpenAI API overview", url: "https://platform.openai.com/docs/overview", source: "Official OpenAI documentation", level: "AI integration", reason: "Understand API-based AI features, structured outputs, and production considerations." },
      { title: "NIST AI Risk Management Framework", url: "https://www.nist.gov/itl/ai-risk-management-framework", source: "NIST", level: "Responsible AI", reason: "Use a credible framework for identifying and managing AI risks." },
      { title: "ML model evaluation", url: "https://scikit-learn.org/stable/modules/model_evaluation.html", source: "Official scikit-learn documentation", level: "Evaluation", reason: "Choose and interpret metrics rather than relying on a single score." },
      { title: "Google ML fairness", url: "https://developers.google.com/machine-learning/crash-course/fairness", source: "Google for Developers", level: "Responsible AI", reason: "Understand how data and model decisions can create unfair outcomes." },
      { title: "OWASP Machine Learning Security Top 10", url: "https://owasp.org/www-project-machine-learning-security-top-10/", source: "OWASP", level: "Security", reason: "Recognize common security risks in ML systems." }
    ],
    videos: [
      { title: "But what is a neural network?", url: "https://www.youtube.com/watch?v=aircAruvnKk", channel: "3Blue1Brown", outcome: "Build an intuitive understanding of neural networks and gradient-based learning.", level: "Foundation" },
      { title: "Machine Learning for Everybody", url: "https://www.youtube.com/watch?v=i_LwzRVP7bg", channel: "freeCodeCamp.org", outcome: "Follow a beginner-friendly practical introduction to machine learning.", level: "Core" },
      { title: "Machine learning project workflow", url: "https://www.youtube.com/results?search_query=machine+learning+project+data+cleaning+evaluation+Python", channel: "YouTube search", outcome: "Compare complete workflows from data preparation through evaluation.", level: "Project" },
      { title: "Responsible AI and LLM evaluation", url: "https://www.youtube.com/results?search_query=responsible+AI+LLM+evaluation+production+tutorial", channel: "YouTube search", outcome: "Explore current approaches to safety, evaluation, and production AI quality.", level: "Production" }
    ],
    youtubeSearchUrl: "https://www.youtube.com/results?search_query=AI+ML+Python+responsible+AI+real+world+project",
    practiceTasks: [
      { title: "Create a small evaluated dataset", brief: "Define a useful product question, collect safe sample data, document assumptions, and create a baseline.", deliverable: "Dataset card, notebook, validation checks, and baseline result.", projectApplication: "Builds disciplined data habits before adding AI to the product." },
      { title: "Prototype an AI-assisted feature", brief: "Design a constrained feature with structured output, fallback behavior, privacy rules, and human review.", deliverable: "Working prototype, prompt or model version, evaluation examples, and limitations.", projectApplication: "Shows how AI can support team work without hiding risk." },
      { title: "Build an evaluation and incident plan", brief: "Define quality metrics, failure categories, red-team cases, monitoring signals, and rollback behavior.", deliverable: "Evaluation set, scorecard, risk register, and release decision.", projectApplication: "Prepares an AI feature for responsible real-world use." }
    ]
  }
};
