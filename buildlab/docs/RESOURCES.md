# BuildLab resource hub

The public resource hub is `library.html`. Its categories, popup previews, and resource links are defined in the `resourceGroups` array near the top of `script.js`. The shared navigation has a normal Resources link in each page's HTML; JavaScript turns that link into the two-panel popup.

## Categories

The hub displays upcoming webinars, past webinars, blog, cheat sheets, tutorials, docs, and podcasts. A category with no published items shows an empty state. Do not add a webinar, recording, or podcast until its title and destination are confirmed. Keep journal proposals labeled as proposals until published.

To add a resource, put a `{ title, href, note }` item in the matching group's `items` array. Use a real local page or public URL. External links open in a new tab. The category's `id` creates its `library.html#...` anchor; keep existing IDs stable so shared links continue to work.

The two built-in cheat sheets are written directly in `script.js` under the `cheat-sheets` section. The tutorial and docs links lead to the existing mentorship learning paths. `mentorship.html` is linked from the hub hero, the popup, and the closing section.

## Check before publishing

Preview `library.html` and open Resources from the navigation. Switch all seven categories using mouse and keyboard, follow a preview link, and close the popup with Escape and an outside click. Check the hub at desktop and mobile widths, confirm all local links and anchors resolve, and verify empty categories do not imply an event or episode exists.
