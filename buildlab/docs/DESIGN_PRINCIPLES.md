# BuildLab website design principles

Reference reviewed: [Ship That Code](https://shipthatcode.com/) on 28 October 2026. This is a guide to the *principles* that make its homepage clear and memorable. Do not copy its layout, source code, imagery, words, logo, or claims.

## What works in the reference

1. **A clear first screen.** A short headline, a specific explanation, one dominant action, and a product demonstration establish the offer quickly.
2. **Visible evidence.** The example interface shows what the product does. It is more useful than a generic illustration.
3. **Strong hierarchy.** Large display text, smaller body copy, compact labels, and restrained accent color guide the eye.
4. **A distinct rhythm.** A dark introduction moves into lighter content. Changes in alignment, section width, and spacing prevent a long page from feeling like a stack of identical boxes.
5. **A focused action.** The primary button matches the page's audience and next step. Supporting links are quieter.
6. **Concrete language.** The reference names the actual experience and the outcome. Its numbers and verification claims belong only to that site.

## Translate these principles to BuildLab

| Principle | BuildLab application |
| --- | --- |
| Clear first screen | State who the page is for, the problem or opportunity, and one useful next action. Keep the exact brand line “Learn together. Build something real.” where it fits the page. |
| Evidence | Show an approved project screenshot, real article image, learning path, or a functional form. Label planned and ongoing work accurately. If evidence is not approved, use a simple diagram or text instead of a fake product screen. |
| Hierarchy | Keep the existing readable sans-serif typography. Use larger headlines and tighter supporting copy. A contrasting display face can be tested later, but it needs to work across pages and scripts before adoption. |
| Rhythm | Alternate navy, white, and soft blue sections. Use editorial rows, lists, or a single feature panel where they explain content better than repeated cards. Keep generous space around the main message and less between related items. |
| Action | Give each page one main CTA tied to its audience: discuss a project, ask about a business problem, explore mentorship, or read a journal entry. |
| Concrete language | Name the visitor's task and what BuildLab can actually do. Avoid invented results, certificates, clients, metrics, technologies, speakers, and dates. |

## BuildLab visual rules

- Keep the logo and current navy, blue, and yellow identity. Current CSS tokens are in `styles.css`: navy `#102a43`, deep navy `#081b2c`, blue `#2f80ed`, yellow `#f8c94a`, and soft background `#f5f8fb`.
- Use yellow to highlight a key phrase or primary action, not every line or card.
- Prefer one strong visual or content example per section. Avoid decorative boxes that repeat the same message.
- Use the existing components when they work. Change layout only where it improves reading order or makes the action clearer.
- Keep responsive layouts deliberate: readable line lengths, no horizontal scrolling, touch-friendly controls, and no cropped headline or form fields.
- Preserve semantic headings, visible labels, focus states, meaningful alt text, and reduced-motion behavior.

## Content and trust rules

- BuildLab is a professional engineering team with a collaborative learning culture. Mentorship remains visible without making the whole site look like an internship advertisement.
- Keep the parent organization's name private on public pages, as requested by the owner.
- Projects, contributor roles, services, session details, and article authors need approval before publication.
- Do not borrow Ship That Code's course counts, pass rates, verification language, certificates, or product examples. They do not describe BuildLab.

## Quick review before a change ships

Can a first-time visitor answer these in five seconds: **Is this for me? What can I do here? What happens if I click?** If not, shorten the copy and strengthen the hierarchy before adding more visual detail.
