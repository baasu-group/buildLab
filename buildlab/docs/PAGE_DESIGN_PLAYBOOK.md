# BuildLab page design playbook

Use [DESIGN_PRINCIPLES.md](DESIGN_PRINCIPLES.md) for the source ideas and guardrails. This playbook turns them into a repeatable process for future updates. It is guidance, not a request to rebuild every page at once.

## 1. Write the page brief first

For each page, record:

- **Audience:** one primary visitor group.
- **Question:** what they arrived needing to understand or solve.
- **Proof:** a real project, approved image, working resource, process, or precise explanation available today.
- **Action:** one main next step and its actual destination.
- **Claim check:** who can verify each service, project status, number, role, or outcome.

Then write a headline, one supporting paragraph, and a CTA. Remove repeated descriptions before changing the layout.

## 2. Match the page to its audience

| Page | First screen should answer | Best evidence or next step |
| --- | --- | --- |
| Home | What is BuildLab, and who builds here? | Shared brand message, clear paths to expertise, collaboration, mentorship, and business sessions. |
| Expertise | What business problems can BuildLab discuss and help solve? | Four concise solution areas; link to a project conversation. Do not present internship tracks as proof of delivery capability. |
| About | How do professionals and emerging contributors work together? | Specific working practices and verified team details when approved. |
| Opportunities | Which path fits my role? | Distinct routes for professionals, emerging developers, and organizations. |
| Partnerships | How would a project conversation begin? | Scope questions, process, and the dedicated inquiry form. |
| Connect | Can I describe my business problem without technical language? | Relatable problems, a short inquiry form, then a separate secondary sessions area. |
| Mentorship | What does the six-month program involve? | Actual tracks, timeline, resources, and application path. |
| Journal | What can I read now? | Published articles with real authors and images; label proposed topics clearly. |
| Resources | Which learning path should I follow? | Existing track content and working links. |

## 3. Choose a layout pattern

- **Problem → response → action:** useful for Connect and Partnerships.
- **Statement → evidence → action:** useful for Home and Expertise.
- **Editorial list:** useful for Opportunities, process steps, and article summaries. Use borders and spacing instead of a card around every item.
- **Detailed guide:** useful for Mentorship, Resources, and Journal articles. Favor a readable column and clear section anchors.

Only add an interactive demonstration when it represents a real, working BuildLab feature. A static screenshot needs permission to publish and descriptive alt text. Avoid mock data that could be mistaken for a shipped product or client result.

## 4. Build and verify

1. Edit the relevant HTML and page-specific CSS. Reuse shared navigation, buttons, form styles, and colors.
2. Check the first screen at desktop, tablet, and narrow mobile widths. Verify the primary CTA is visible and the headline does not clip.
3. Read the page aloud without design. Remove repeated phrases and unfamiliar terms for the target visitor.
4. Follow the CTA, fill every form, and inspect success and error behavior. Do not show success before the server confirms a submission.
5. Check links, anchors, metadata, heading order, keyboard access, focus outlines, contrast, and image loading.
6. Confirm that published claims and media have approval. Keep private organization details out of public files.

## Avoid when applying the reference

- Recreating Ship That Code's code editor, course interface, colors, typography, illustration, or copy merely because they look distinctive.
- Introducing counters, testimonials, client logos, certificates, or project outcomes without evidence.
- Adding a second primary CTA beside every paragraph.
- Changing all pages to the same hero and card grid. Each audience needs a clear path, while the brand system stays consistent.
