# Prototype images — placeholder and prompt strategy

## When prototypes need images

Marketing pages, landing screens, hero sections, testimonials, case studies, editorial content, and trust-building components benefit from high-quality photographic or illustrative assets.

Do not leave these screens empty. Always add a styled placeholder and a ready-to-use image generation prompt.

## When to add image placeholders

Add placeholders when:
- The prototype is a marketing or public-facing landing page
- The component is a hero section with copy + visual pairing
- Trust, credibility, or emotional engagement is a design goal
- The screen would look incomplete or generic without imagery
- Industry/sector context is being communicated visually

Skip placeholders when:
- The prototype is a back-office or RM tool (data-first, not emotion-first)
- The component is a pure data visualization (chart, table, dashboard)
- The screen is mid-flow and imagery would be distracting

## Placeholder implementation

Use a CSS placeholder with:
- a neutral gradient or subtle color wash matching the brand palette
- aspect ratio that fits the layout (16:9 for hero, 4:3 for cards, 1:1 for avatars)
- a centered label: "Image placeholder – see README for prompt"
- semantic class naming (`.hero__image-placeholder`, `.card__image-placeholder`)

Example CSS:

```css
.hero__image-placeholder {
  aspect-ratio: 16 / 9;
  background: linear-gradient(135deg, var(--gray-100) 0%, var(--gray-50) 100%);
  border-radius: var(--radius-2xl);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-tertiary);
  font-size: var(--text-caption-size);
  text-align: center;
  padding: var(--space-6);
}
```

## Prompt format and location

In the prototype's `README.md`, add a section:

```markdown
## Image generation prompts

### Hero image
**Placeholder:** `.hero__image-placeholder` in `index.html`  
**Aspect ratio:** 16:9 (wide)  
**Prompt for Gemini:**

> Photorealistic wide hero image for an SME loan eligibility marketing page: a confident small business owner in a clean bakery workspace reviewing finances on a laptop, natural daylight, premium editorial photography, shallow depth of field, realistic textures, no logos, no readable text, negative space on left for UI text overlay, suitable for a modern fintech landing page, 16:9 aspect ratio.

**Where to place the generated image:** Save as `hero.png` in the prototype folder and update `index.html` to replace the placeholder `<div>` with `<img src="hero.png" alt="Small business owner reviewing finances">`.
```

## Prompt quality rules

Every prompt must specify:
1. **Style:** photorealistic, illustration, editorial, etc.
2. **Subject:** who/what is in the scene (be specific about industry/context)
3. **Composition:** framing, negative space, foreground/background treatment
4. **Lighting:** natural, studio, warm, cool, golden hour, etc.
5. **Constraints:** no logos, no readable text, no brand elements unless specified
6. **Technical requirements:** aspect ratio, orientation
7. **Intended use:** what page/component this is for (helps the generator match tone)

Bad prompt:
> "Business person in office"

Good prompt:
> "Photorealistic image of a confident female restaurant owner in her 40s reviewing financial documents at a wooden table in a modern café interior, warm afternoon natural light through large windows, shallow depth of field with soft background blur, realistic skin tones and textures, no visible brand names or logos, negative space on right side for text overlay, editorial photography style, 16:9 wide format suitable for a fintech SME loan marketing hero section."

## Workflow after prompt is written

1. Add the placeholder to the HTML with a semantic class.
2. Style the placeholder in CSS (gradient, aspect ratio, label).
3. Document the prompt in the prototype's README under a dedicated `## Image generation prompts` section.
4. Include instructions on where to save the generated file and how to wire it into the HTML.
5. Test that the placeholder looks intentional (not broken) if the user opens the prototype before generating the image.

## When I have image generation available

If the session has `GenerateImage` enabled, generate the images immediately and wire them into the prototype. Do not use placeholders. The placeholder strategy is a fallback for when image generation is unavailable.

## Research step

Before deciding what images a prototype needs, consider:
- What is the emotional register of this screen? (Trust-building hero vs. efficiency-focused dashboard.)
- What industry/sector context would make this more credible? (Bakery, warehouse, tech startup office.)
- What comparable fintech products use imagery at this stage? (Revolut landing pages, Wise trust sections, Monzo marketing heroes.)
- Does the imagery clarify the value proposition or is it decoration? If decoration, skip it.
