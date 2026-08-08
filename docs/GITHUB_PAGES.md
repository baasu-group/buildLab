# GitHub Pages setup

This project is a plain static website. It needs no Node.js, framework, build command, or database.

## 1. Configure the site

Before publishing, edit [`script.js`](../script.js) and replace these values:

```js
const siteConfig = {
  applicationForm: "https://forms.gle/your-application-form",
  feedbackForm: "https://forms.gle/your-feedback-form",
  contactEmail: "mailto:your-email@example.com",
  githubRepo: "https://github.com/your-org/your-repository",
  linkedin: "https://www.linkedin.com/company/your-company",
  discord: "https://discord.gg/your-community",
  calendar: "https://cal.com/your-team/intro",
  resourceDevops: "https://github.com/your-org/your-repository/tree/main/resources/devops",
  resourceAiMl: "https://github.com/your-org/your-repository/tree/main/resources/ai-ml",
};
```

Recommended future links:

- Application form: name, email, track, portfolio, availability, and motivation.
- Feedback form: week, rating, blockers, and suggestions.
- Contact email: general questions and partnerships.
- GitHub: source code and contribution guide.
- LinkedIn/community: announcements and cohort communication.
- Calendar: mentor or orientation conversations.
- Resource links: add roadmaps, documentation, practice work, tools, and project guidance for each field.

Do not put passwords, API keys, private applicant data, or other secrets in this repository. GitHub Pages sites are public.

## 2. Test locally

Open `index.html` in a browser, or run a tiny local server from the repository root:

```bash
python3 -m http.server 8000
```

Then visit <http://localhost:8000>. Check the navigation, every link, mobile layout, and form destinations.

## 3. Push the site to GitHub

Create a GitHub repository, then run these commands from this folder:

```bash
git add index.html styles.css script.js .nojekyll docs/GITHUB_PAGES.md
git commit -m "Add internship GitHub Pages site"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

If `origin` already exists, use `git remote -v` to check it and skip `git remote add origin`.

## 4. Enable GitHub Pages

1. Open the repository on GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select branch **main** and folder **/(root)**.
5. Select **Save**.
6. Wait for the Pages deployment to finish, then open the URL shown in the Pages settings.

For a project repository, the URL normally looks like:

```text
https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/
```

Updates to `main` will publish automatically. GitHub notes that a first publication can take several minutes.

## 5. Optional custom domain

In **Settings → Pages**, enter your domain under **Custom domain** and save it. For an apex domain, configure the four GitHub Pages `A` records at your DNS provider. For a subdomain such as `www`, create a `CNAME` pointing to `YOUR-USERNAME.github.io`.

After DNS and certificate provisioning complete, enable **Enforce HTTPS**. Do not use wildcard DNS records.

## 6. Safe update workflow

```bash
git pull origin main
# edit files and test locally
git add .
git commit -m "Describe the site update"
git push origin main
```

Check **Settings → Pages → Visit site** and the repository’s **Actions** tab if an update does not appear. Browser caching can make a recent CSS or JavaScript change look delayed.

## Useful future additions

- Add a `CNAME` file only when a custom domain is configured from a branch source.
- Add `assets/` for logos and optimized images.
- Add `resources/frontend`, `resources/backend`, `resources/ui-ux`, `resources/qa`, `resources/devops`, and `resources/ai-ml` as the learning library grows.
- Add an `about.html` or `faq.html` only when the homepage becomes too long.
- Add a privacy notice before collecting applicant information.
- Move form handling to a proper form service or backend; GitHub Pages itself does not process submissions.
- Add an accessibility check and link checker to CI as the site grows.

Official references: [GitHub Pages quickstart](https://docs.github.com/en/pages/quickstart), [publishing sources](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site), and [custom domains](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).
