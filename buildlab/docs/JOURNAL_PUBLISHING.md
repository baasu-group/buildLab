# Add a BuildLab Journal article

You can add an article by editing **one file**: [`buildlab/journal-data.js`](../journal-data.js). The Journal page and article page update automatically. There is no build command or framework.

## 1. Add your entry

Open `buildlab/journal-data.js`. Copy this object, paste it **inside** the `window.buildLabJournal = [ ... ];` list, and add a comma between entries:

```js
{
  slug: "my-first-article",
  status: "draft",
  category: "Engineering notes",
  title: "My First Article",
  summary: "One clear sentence about what readers will learn.",
  image: "assets/journal-architecture.svg",
  imageAlt: "",
  author: "Your Name",
  date: "2026-10-28",
  content: [
    { type: "paragraph", text: "Start with the problem or question." },
    { type: "heading", text: "What we tried" },
    { type: "paragraph", text: "Explain the work and what you learned." }
  ]
}
```

Change the `slug` to a unique, lowercase name with hyphens. Keep the quotes, commas, and brackets. Use a real author name and an actual publication date in `YYYY-MM-DD` format.

## 2. Add an image (optional)

Put an approved image in `buildlab/assets/`, then set `image` to a path such as `assets/my-first-article.webp`. Use a small WebP, AVIF, JPEG, PNG, or SVG file. The card and article page both use this cover image. If no image is ready, leave one of the existing SVG covers in place.

Use `imageAlt` to describe a meaningful photo, screenshot, or diagram. Leave it as `""` for purely decorative art. You can also add an image inside the article:

```js
{ type: "image", src: "assets/my-diagram.webp", alt: "Diagram of the request flow", caption: "The request moves through three services." }
```

Do not upload private client data, credentials, unapproved screenshots, or copyrighted images without permission.

## 3. Preview and publish

1. Keep `status: "draft"` while writing. Drafts do **not** appear on the public Journal.
2. Use `status: "proposed"` for an idea card and a short topic page. Add an optional `topics: ["First topic", "Second topic"]` list to explain what the future article will cover. It is clearly labeled as a proposal.
3. After technical and publication review, set `status: "published"`. A published entry needs a title, author, date, and at least one content block.
4. From the repository root, run `python3 -m http.server 8000`, then open `http://localhost:8000/buildlab/journal.html` and check the card and article on desktop and mobile.
5. Commit and push the changed files to `main`. The existing GitHub Pages workflow publishes changes under `buildlab/` when run by an authorized publisher (`basan-ta` or `baasu-group`). Check the Actions tab and the live Journal after deployment.

If a published card does not open, check that its `slug` is unique, the article has an author, date, and content, and the browser has loaded the latest `journal-data.js`.

## Content blocks

Use any number of these blocks inside `content: [ ... ]`:

```js
{ type: "heading", text: "A section heading" },
{ type: "paragraph", text: "A paragraph of article text." },
{ type: "image", src: "assets/example.webp", alt: "What the image shows", caption: "Optional caption" }
```

The site displays block text safely as plain text. It does not interpret HTML in article content. To add a new paragraph, copy a paragraph block and separate it from the next block with a comma.

For editorial checks, see [EDITORIAL_WORKFLOW.md](./EDITORIAL_WORKFLOW.md).
