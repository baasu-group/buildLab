# GitHub Pages setup

This project is a plain static website. It needs no Node.js, framework, build command, or database.

The resource catalogue is available through URLs such as:

```text
buildlab/resources/index.html?field=frontend
buildlab/resources/index.html?field=backend
buildlab/resources/index.html?field=ui-ux
buildlab/resources/index.html?field=qa
buildlab/resources/index.html?field=devops
buildlab/resources/index.html?field=ai-ml
```

## 1. Configure the site

Before publishing, edit [`buildlab/script.js`](../buildlab/script.js) and replace these values:

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

Recommended site links:

- Application form: name, email, track, portfolio, availability, and motivation.
- Feedback form: week, rating, blockers, and suggestions.
- Contact email: general questions and partnerships.
- GitHub: source code and contribution guide.
- LinkedIn/community: announcements and cohort communication.
- Calendar: mentor or orientation conversations.
- Resource links: add roadmaps, documentation, practice work, tools, and project guidance for each field.

The resource content lives in [`buildlab/resources/data.js`](../buildlab/resources/data.js). Add topics, documentation, videos, search links, and practice tasks there; the shared page at [`buildlab/resources/index.html`](../buildlab/resources/index.html) renders the selected field automatically.

Each field should keep the same content shape: 6–8 topics, 8–12 documentation links, 3–5 direct video or playlist links, one YouTube search link, and 3 practice tasks.

Do not put passwords, API keys, private applicant data, or other secrets in this repository. GitHub Pages sites are public.

## 2. Test locally

Open `buildlab/index.html` in a browser, or run a tiny local server from the repository root:

```bash
python3 -m http.server 8000
```

Then visit <http://localhost:8000>. The root URL redirects to `buildlab/`. Check the navigation, every link, mobile layout, and form destinations.

## 3. Push the site to GitHub

Create a GitHub repository, then run these commands from this folder:

```bash
git add .
git commit -m "Add internship GitHub Pages site"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

If `origin` already exists, use `git remote -v` to check it and skip `git remote add origin`.

## 4. Enable gated GitHub Pages deployment

1. Open the repository on GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **GitHub Actions**.
4. Push the workflow at [`.github/workflows/pages.yml`](../.github/workflows/pages.yml), or run it from the repository’s **Actions** tab.
5. Wait for the Pages deployment to finish, then open the URL shown in the Pages settings.

The workflow uploads `buildlab/` as the artifact root. This makes `buildlab/index.html` the homepage of the Pages site; the URL does not include `/buildlab/`.

The workflow listens for `main` pushes that change `buildlab/**` or the deployment workflow itself. Intern code and resource changes outside `buildlab/` do not start a deployment. Its deployment job also runs only when the GitHub actor is exactly `basan-ta` or `baasu-group`:

```yaml
if: ${{ github.ref == 'refs/heads/main' && (github.actor == 'basan-ta' || github.actor == 'baasu-group') }}
```

An intern’s push can still create a workflow run, but the deployment job will be skipped and the public site will not change. GitHub usernames are checked; display names and commit email addresses do not count. Do not use `github.repository_owner` for this gate because it is always `baasu-group` for this repository.

For a project repository, the URL normally looks like:

```text
https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/
```

Only an authorized `main` push, or a manual run started by an authorized actor, will publish automatically. GitHub notes that a first publication can take several minutes.

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

If an authorized push is skipped, confirm that the person pushed using the GitHub account `basan-ta` or that the repository owner is running the workflow as `baasu-group`. Do not select `/docs` or try to select `/buildlab` in branch mode; GitHub branch publishing supports only the repository root or `/docs`. Use **GitHub Actions** so the workflow can publish `buildlab/` as the site root. If every `main` push is still publishing, change the Pages source from **Deploy from a branch** to **GitHub Actions**.

## Useful future additions

- Add a `CNAME` file only when a custom domain is configured from a branch source.
- Add `assets/` for logos and optimized images.
- Add `resources/frontend`, `resources/backend`, `resources/ui-ux`, `resources/qa`, `resources/devops`, and `resources/ai-ml` as the learning library grows.
- Add an `about.html` or `faq.html` only when the homepage becomes too long.
- Add a privacy notice before collecting applicant information.
- Move form handling to a proper form service or backend; GitHub Pages itself does not process submissions.
- Add an accessibility check and link checker to CI as the site grows.

Official references: [GitHub Pages custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages), [job conditions](https://docs.github.com/en/actions/how-tos/write-workflows/choose-when-workflows-run/control-jobs-with-conditions?apiVersion=2022-11-28), [publishing sources](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site), and [custom domains](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).
