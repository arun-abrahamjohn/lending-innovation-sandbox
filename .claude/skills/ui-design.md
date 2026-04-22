# UI Design — Component and Visual System

## Reference aesthetic — what "world-class" means here

The quality bar is modern fintech craft at the level of **Revolut, Wise, Monzo, Klarna, Cash App, and Robinhood**, executed with the precision and restraint of **Uber, Linear, and Stripe**. When in doubt, ask: "Would a designer at any of these companies ship this?" If no, redesign.

**What that aesthetic concretely means:**

- **Numbers are the stars of financial UI.** Balances, amounts, rates, totals — these are what the user came for. They should be 4–10× the size of any surrounding label. A €125.000 figure in a loan configurator is not a heading — it is the hero. Treat it with the same reverence a weather app gives the current temperature.
- **Restrained palette, bold use of neutral contrast.** Top fintech UIs use brand color in tiny, strategic doses — an active state, a CTA, a critical status indicator. The rest is black, white, and grayscale. When everything is colored, nothing is. If your component has more than ~10% brand color by area, cut it.
- **Dark contrast blocks are an earned moment.** A black/near-black panel inside a white component (like the result of a calculator, or the total of a checkout) is a premium move — but only works when the rest is quiet. If your component has three dark blocks, none of them are special.
- **Typography carries the mood.** Tight tracking, confident weight contrasts, tabular figures. The difference between a Revolut screen and a generic SaaS screen is 70% typography.
- **Micro-details matter disproportionately.** A 2px-off slider thumb, a label in the wrong weight, a currency symbol the wrong size — these are the things that make a UI feel "off" even when the user can't articulate why. Fix them.

**What to avoid — "uninspired defaults":**

- ShadCN-default grays with purple/blue accents
- Bootstrap-era "card with icon and title" patterns with generic Font Awesome icons
- Progress bars as decoration rather than information
- Gradients used as background fill (gradients are used for emphasis on specific surfaces: a pill button, a hero number, a single result panel — never as generic decoration)
- Equal-weight hierarchy where label and value are similar sizes
- Rounded corners everywhere at the same radius (a world-class UI uses 3–5 different radii purposefully: pill for buttons, softer for inputs, larger for cards, huge for hero containers)
- Centered everything (centered text is appropriate for hero moments and empty states, not for forms or lists)
- **Colored edge stripes / vertical accent bars on the left of cards, toasts, alerts, or banners.** This is the ShadCN/Bootstrap-era tell. It is lazy and always looks like an admin dashboard. Communicate variant through the icon color (primary technique), the icon glyph itself, and the copy. Never use a 2–4px colored strip glued to the leading edge. The same rule applies to right-edge stripes, top stripes, and bottom stripes — any "tape on the edge" pattern is out.

---

## The three-tier token system

This project uses a strict three-tier CSS custom property hierarchy. Violating the tier boundary is the most common source of inconsistency.

**Tier 1 — Base (`tokens/base.css`):** Raw scale values. `--gray-200`, `--font-size-lg`, `--space-6`. These are the atoms of the system — they have no semantic meaning. **Never reference base tokens directly in component or layout CSS.** Their only consumer is the semantic tier.

**Tier 2 — Semantic (`tokens/semantic.css`):** Intent-mapped aliases. `--color-text-primary`, `--color-action-primary`, `--color-feedback-error-bg`. These tell you *what the value is for*, not what it literally is. **This is the layer you write against in components and layouts.** When you write `color: var(--color-text-primary)`, it works in every brand theme without change.

**Tier 3 — Component (`tokens/component.css`):** Per-component custom properties, namespace-prefixed. `--button-height-md`, `--input-border-width`, `--card-padding`. These reference semantic tokens and exist so individual components have a single place to tune their geometry without hunting through component CSS. Reference these only within the relevant component's CSS file.

**White-label:** Brand theme files override semantic tokens at `:root`. They never touch base tokens (those are the raw scale; changing them would shift the entire system) and never touch component tokens directly (those are downstream of semantic tokens and will update automatically).

---

## Typography rules

**Scale:** The type scale is a 1.250 major third modular scale from a 16px base. This means each step up is ×1.25. Do not invent intermediate sizes — use what exists on the scale.

**Hierarchy that actually works:** A type hierarchy is not just different sizes — it is size + weight + colour + spacing working together. These combinations create hierarchy:
- Display / hero: largest size, regular or medium weight, tight line-height, loose letter-spacing — used sparingly
- Heading 1–2: large sizes, semibold, tight line-height — page and section titles
- Heading 3–4: medium sizes, semibold or medium, snug line-height — card titles, step headings
- Body large: for introductory copy, decision context, and long-form content
- Body base: the default. 99% of body copy uses this.
- Body small: secondary copy, fine print, supplementary detail
- Label large: form section headings, data table column headers
- Label base: field labels, button text, tab labels
- Label small: helper text, character counts, metadata
- Caption: timestamps, footnotes, version numbers

**Critical rules:**
- Never set body text in semibold or bold. Reserve weight for hierarchy.
- Display and heading styles use `--letter-spacing-tight` or `--letter-spacing-normal`. Body text uses `--letter-spacing-normal`. Never apply wide letter-spacing to body text.
- Line-height on headings: use `--line-height-tight` or `--line-height-snug`. On body text: `--line-height-normal` or `--line-height-relaxed`. Loose line-height on headings is a common mistake that makes pages feel flabby.
- Measure (line length): target 60–75 characters for body text. Use `max-width` on text containers, not on the grid.

**Font pairing for FSI:** The default pairing is a geometric sans for display/headings and a humanist sans for body text. This creates authority (geometric) with warmth and legibility (humanist). Mono is for data values, KVK numbers, IBANs, and code snippets only.

---

## Typography for numbers — the hero treatment

Financial UI is a typography problem. Numbers are the content; labels are packaging.

**Hero numbers (balances, amounts, decision figures):**
- **Size:** 64–120px (`clamp(3rem, 10vw, 7rem)`). The larger end for primary landing/decision moments, smaller for components-in-flow.
- **Weight:** `bold` or `semibold`. Never regular for hero numbers — they must feel substantial.
- **Letter-spacing:** Tight (`-0.02em` to `-0.04em`). Default tracking makes big numbers look thin and weak.
- **Line-height:** `1` or `0.9`. Default line-height creates floating space above big numbers.
- **`font-variant-numeric: tabular-nums`** — always. Non-tabular numbers wobble when updating live (e.g., slider-driven values).
- **Color:** Pure `--color-text-primary` (near-black). Never use a gray for hero numbers — they must command.

**Currency symbol treatment:**
- The `€` or `$` is **not** the same size as the number. Scale it to ~40–50% of the number's size, and set it to a lighter weight and a secondary color (gray-400/500). This creates the classic "big number, small symbol" premium pattern used by Revolut, Wise, Monzo.
- Align it to the **baseline** or **top** of the numerical digits, not centered — centered looks amateur.
- Example: for a `€125.000` hero at 5rem/bold, the `€` is 2rem/medium in gray-400.

**Supporting numbers (totals, rates, secondary amounts):**
- Size: 20–32px, semibold. Still tabular figures.
- Color: primary text.
- Pair with a small uppercase label (11–12px, medium weight, gray-500, letter-spacing 0.05–0.1em).

**Live-updating numbers (sliders, calculators):**
- MUST use `font-variant-numeric: tabular-nums` to prevent width jitter.
- Consider a subtle scale-pulse or fade transition on change. Never a "count-up" animation unless it's the reveal of a final value.
- Never debounce display — update instantly as the source changes.

**Decimal and thousand separators:**
- For Dutch FSI: thousand separator is `.` (dot), decimal is `,` (comma). `€125.000` (125 thousand), `€125,50` (125 and 50 cents).
- For hero numbers on a decision page, decimals are often omitted if the amount is a round figure: `€125.000` not `€125.000,00`.
- When rates are displayed, two decimal places: `5.40%` — even for whole numbers (`5.00%`, not `5%`), because it signals precision.

**Anti-patterns for numbers:**
- ❌ Using mono font for financial figures. Mono is for IBANs, KVK numbers, reference codes — not prices. Use tabular figures in the display font instead.
- ❌ Currency symbol at the same size as the number (looks like a spreadsheet).
- ❌ Lowercase labels next to numbers ("monthly payment" in sentence case under a big number — should be `MONTHLY PAYMENT` in 11px uppercase).
- ❌ A hero number and its supporting text in the same color and weight.
- ❌ A hero number sized smaller than a button on the same screen. If the button is bigger than the balance, the design is wrong.

---

## Surfaces and materials — when to use what

A component has at most **3 surface levels**. More than that and hierarchy collapses.

**Level 0 — Page canvas (`--color-background-page`):** Quiet, neutral. Usually `gray-50` on light mode. The background of everything.

**Level 1 — Component surface (`--color-background-surface`):** The component body. White in light mode. Subtle shadow or border to lift from the page. This is 80% of your UI.

**Level 2 — Emphasis surface (dark block, gradient, or colored block):** Used **once per component, max**. This is where the user's eye goes. Examples:
- The result panel of a calculator (dark background, brand-colored hero number)
- The total section of an order summary (dark inset panel)
- The selected state of an option card (dark background with white text — inverts the hierarchy to draw the eye)

**When to use a dark contrast block:**
- The final value/result of a calculation
- The "selected" state of a critical choice
- The footer of a summary with the grand total
- Never as decoration. Never on more than one region per component.

**When to use gradients:**
- **On hero text** (gradient-clip onto a number): earned, used sparingly, creates delight
- **On a primary CTA button:** acceptable if the brand gradient is defined
- **On a dark panel** (subtle 135° gradient from near-black to true black): creates depth without being flashy
- **Never as a full-component background** unless the whole aesthetic is built around that gradient (a hero landing block, e.g.)
- **Never as a border** — gradient borders are a 2022 trend that ages badly

**Shadow philosophy:**
- Shadows communicate Z-depth, nothing else. Never use shadow for "style."
- FSI shadows must be **subtle**: `0 1px 3px rgba(0,0,0,0.04)` is often enough for a card. If you can clearly see the shadow and think "nice shadow," it is too much.
- Colored shadows (a shadow tinted with brand color) are acceptable only on primary CTA buttons and only as a "this is the most important thing" signal. One per screen, max.
- Dark mode: shadows don't work. Use a 1px border of `gray-800` or `gray-700` plus a subtle inset glow if needed.

**Border philosophy:**
- Borders delineate. They do not decorate.
- A default card uses either a subtle shadow OR a subtle border — not both.
- 1px borders look sharp; 2px borders look chunky. Use 2px only for the active state of a selectable card (to announce "this is selected" without color alone).
- Dashed borders are reserved for empty states and drop zones. Never elsewhere.

---

## Visual hierarchy — concrete rules

Hierarchy is not "bigger for more important." It is a specific ratio of size, weight, color, and space.

**The 4× rule:** The most important element in a region should be at least **4× the visual weight** of its supporting content. Visual weight = size × weight × contrast. For a loan hero with `€125.000`:
- Hero number: 80px, bold, primary text (near-black). Visual weight ≈ `80 × 700 × 100% = 56,000`
- Supporting label ("How much do you need?"): 14px, medium, gray-500. Visual weight ≈ `14 × 500 × 40% = 2,800`
- Ratio: 20:1 ✓

If the ratio is less than 4:1, the hero isn't a hero.

**The 3-weight rule:** A well-designed component uses **3 distinct type weights**. Usually: bold (hero numbers, CTAs), medium (labels, active states), regular (body, supporting). More than 3 weights becomes muddy; fewer than 3 is flat.

**The 80/15/5 color rule (approximately):**
- 80% neutral (white, grays, near-black)
- 15% one secondary color (often a specific gray, or a muted brand)
- 5% accent (primary CTA, active state, hero number accent)

If you look at your component and see roughly equal amounts of green, blue, red, yellow — you have failed. Mute everything except the one thing that must pop.

**Spacing as hierarchy:**
- Related elements are clustered (gap of 4–8px)
- Distinct groups are separated (gap of 24–48px)
- Section breaks are loud (gap of 64px+, or a divider + padding)
- Equal spacing between unequal things creates false equivalence. If section A is more important than section B, give it more breathing room above it.

---

## Colour usage

**Semantic over brand tokens in components.** Never write `color: var(--color-primary-600)` in a component. Write `color: var(--color-action-primary)`. The semantic token is what changes between brands; the component stays the same.

**Status colours are calibrated, not raw.** The semantic status colours are specifically chosen for:
- Sufficient contrast against both the status background and white page
- Distinguishability from each other for colour-vision-deficient users
- Appropriate emotional temperature (error red must read as error, not brand)

**Status colour usage rules:**
- Use the `*-bg` token for filled badges and alert backgrounds
- Use the `*-border` token for bordered badges and alert borders
- Use the `*-icon` token for status icons (slightly more saturated for legibility at small sizes)
- Use the `*-text` token for any text on a white or surface background — never use the raw colour token for text, as contrast may fail
- Pair every status colour with an icon — do not rely on colour alone to communicate state

**Backgrounds and surfaces:**
- `--color-background-page`: the page canvas. Use for `<body>`.
- `--color-background-surface`: cards, panels, sidebars that sit on the page.
- `--color-background-surface-raised`: elements that float above the surface (modals, dropdowns).
- `--color-background-surface-sunken`: inset areas (table row backgrounds, input inner backgrounds in certain states).
- Never mix surface levels arbitrarily — maintain a consistent visual stack.

**Interactive colour states must be visibly distinct.** The difference between default and hover, and between hover and active, must be perceptible without relying on cursor change. Typically: default → hover is a one-step darken; hover → active is another one-step darken. Disabled is a significant lightening, not just a slight opacity change.

---

## FSI component patterns

**Data tables** are the workhorse of lending back-office interfaces. Rules: sticky header (never lose context on scroll), row hover (shows the row is scannable/clickable), sortable column indicators are visual-only by default, numerical data right-aligned, currency always formatted with currency symbol and 2 decimal places, empty state must be designed (not just blank), loading state must use skeleton rows (not spinner).

**Summary cards** in lending show loan parameters (amount, rate, term, payment). These must be scannable at a glance — the RM or applicant should be able to confirm the key numbers in 3 seconds. Use a grid layout with clear label/value hierarchy. Values are the hero, labels are subordinate. Never bury a monthly payment figure in prose.

**Progress indicators** for multi-step flows must: show total step count, show current position, show completion status for passed steps, never truncate step labels on desktop. On tablet, abbreviate step labels before hiding them.

**Decision banners** are an emotional communication as much as an information component. Approved: green accent, prominent loan amount, next steps clearly ordered. Declined: composed and non-accusatory tone, reason given clearly, next step or appeal route offered. These are not generic alerts dressed up — they must be specifically designed for the lending decision context.

**Input groups** in financial forms: prefix for currency symbol (€), suffix for percentage (%), unit labels for term (months). The prefix/suffix must be visually part of the input, not a separate element. Height, border-radius, and border must be continuous.

**Document upload zones** need: clear allowed file types, clear size limit, drag-and-drop + click-to-browse fallback, per-file upload progress, per-file error state, file list with remove capability, and total file count/size summary.

**Accordion disclosures** for terms and conditions, fee schedules, and covenant lists: always show a clear expand/collapse affordance, never use accordion for content the applicant must read to proceed (show inline instead), track which sections have been expanded for compliance audit purposes.

---

## Elevation and layering

Elevation communicates Z-position in the interface. Use it consistently:

- **Level 0 — Page:** the canvas. No shadow.
- **Level 1 — Surface:** cards, table containers, sidebar. `--elevation-card`
- **Level 2 — Raised:** sticky headers, focus rings on elevated elements. `--elevation-sticky`
- **Level 3 — Overlay:** dropdowns, tooltips, popovers. `--elevation-dropdown`
- **Level 4 — Modal:** modal dialogs, drawer panels. `--elevation-modal`
- **Level 5 — Toast:** notification toasts that float above all content. Use `--z-toast`.

Shadows in FSI interfaces must be subtle. No coloured shadows, no oversized spread. The shadow communicates hierarchy, not decorativeness. If you can clearly see a shadow and think "that's a nice shadow", it is probably too much.

---

## Responsive behaviour

These prototypes are **desktop-first** for relationship manager use (1280px+ viewport, typically dual-monitor setups). However, they must be usable on tablet (768px–1024px) for field meetings.

**Desktop (1024px+):** Full layout with sidebar navigation, multi-column form layouts where appropriate (2-column for address fields, label+value grids for summary data).

**Tablet (768px–1024px):** Single-column form layouts, navigation moves to top bar or hamburger. Summary grids reflow to 2 columns. Tables gain horizontal scroll on overflow. Decision banners maintain full information — no content is hidden.

**Mobile (<768px):** Not a primary target. Ensure the page is at minimum usable (not broken) but do not optimise for it.

Never use arbitrary breakpoints. Use the three defined breakpoints in `shared/layout.css` consistently.

---

## Motion

**Motion serves state change, not decoration.** Every transition must communicate something: a panel sliding in, a step advancing, a form submitting, an error appearing.

**Rules:**
- Use `--transition-fast` (100ms) for micro-interactions: hover states on buttons, focus ring appearance
- Use `--transition-base` (200ms) for state changes: error messages appearing, checkbox checking, badge colour changes
- Use `--transition-slow` (350ms) for structural changes: modal opening, step transitions, drawer sliding in
- Never animate layout properties (width, height, top, left) — use transform and opacity instead
- Respect `prefers-reduced-motion` — wrap all transitions in a `@media (prefers-reduced-motion: no-preference)` query or use a global override

---

## White-label considerations

**Changes between brands:** colour (brand-primary, brand-secondary, action colours), logo, typography (font-family tokens), and potentially button radius (some brands are sharper, some more rounded).

**Stays constant between brands:** layout structure, spacing scale, component geometry (heights, padding), information hierarchy, iconography system, elevation model, grid.

This means: never build a component that relies on a specific colour being present. Every component must look coherent with any hue assigned to the action and brand tokens. Test this by mentally substituting red for blue — if the component breaks conceptually, the semantic tokens are not being used correctly.

---

## Documenting a component for the design system page

Every component entry in `design-system/index.html` must include:

1. **Component name** — as an H2 anchor
2. **Description** — one or two sentences: what it is, when to use it, what distinguishes it from similar components
3. **Live rendered variants** — all visual variants in their default state
4. **Live rendered states** — for each relevant interactive state (hover, focus, active, disabled, error, loading)
5. **Token reference table** — a small table listing: token name, tier (semantic/component), value at default theme
6. **Usage guidance** — 2–4 bullet points covering: required attributes/classes, accessibility requirements, common mistakes
7. **HTML snippet** — a `<pre><code>` block with the minimum markup for a working instance

The design system page must use the design system's own tokens and components to render itself. If the design system page looks bad, the system has a problem.

---

## Quality gates — run through these before declaring a component "done"

Before considering any component complete, answer each of these. If the answer to any is no or uncertain, iterate before shipping.

**Hero & hierarchy**
- [ ] Is there a single, unambiguous hero element in the component? (Not two co-equal things.)
- [ ] Is the hero at least 4× the visual weight of supporting content?
- [ ] Are there exactly 3 distinct type weights in the component? (Not 2, not 5.)
- [ ] If you squinted at the component, could you tell in <1 second what it is for?

**Numbers (if applicable)**
- [ ] Are financial figures set in tabular numerals (`font-variant-numeric: tabular-nums`)?
- [ ] If there's a hero number, is it 60px+ with tight letter-spacing and bold/semibold weight?
- [ ] Is the currency symbol scaled smaller and in a muted color relative to the number?
- [ ] Are Dutch number conventions respected (`.` thousand, `,` decimal)?

**Color**
- [ ] Is brand/accent color used on ≤10% of the component's visible area?
- [ ] Is there exactly one attention-grabbing element (dark block, gradient, brand fill)? Not zero, not three.
- [ ] Would the component still communicate hierarchy if rendered in grayscale?

**Surfaces & depth**
- [ ] Does the component use ≤3 surface levels (page → surface → emphasis)?
- [ ] Are shadows subtle enough that they're felt but not noticed?
- [ ] Are borders used for delineation, not decoration? No border + shadow on the same element.

**Interactive states**
- [ ] Do default → hover → active → focus states each look visibly distinct from each other?
- [ ] Is the focus state visible without relying on cursor change (keyboard user test)?
- [ ] Does the active/selected state of a selectable element use more than color to indicate selection?

**Typography**
- [ ] No body text set in semibold or bold?
- [ ] No wide letter-spacing on body text?
- [ ] Headings use tight or snug line-height? Body uses normal or relaxed?
- [ ] Labels for numbers are in uppercase with `letter-spacing: 0.05–0.1em` (the fintech-standard label treatment)?

**Craft & defensibility**
- [ ] Every radius is intentional? (Buttons pill, inputs soft, cards larger, hero containers huge — not all the same.)
- [ ] Every spacing value comes from the scale? (No `padding: 7px`, `margin-top: 13px`.)
- [ ] If you removed one element, would the component feel incomplete? If you removed two, would it still work? (Test for superfluous elements.)
- [ ] Would a designer at Revolut, Wise, or Monzo ship this? If you can't confidently say yes, iterate.

**Component-specific patterns**
- [ ] If this is a financial/lending component, check `fintech-ui-patterns.md` for the relevant pattern (configurator, calculator, decision screen, etc.) and verify compliance with that pattern's specific rules.

---

## Common failure modes — if the component feels "off"

If you've built a component and it feels wrong but you can't say why, check these in order:

1. **The hero isn't hero enough.** Double the size of the biggest element. Almost always fixes "feels flat."
2. **Too many focal points.** Count elements competing for attention. Remove color/weight/size from all but one.
3. **Everything is the same corner radius.** Vary it: pill for interactive, soft for inputs, larger for cards.
4. **Icons and labels are in boring cards.** Ask: is this card adding information, or just being a card? If just being a card, remove the card — make the icon + label inline or in a cleaner grid.
5. **A slider looks broken.** Native `<input type="range">` needs specific CSS for track + thumb, in both `-webkit-` and `-moz-` prefixes. Use a gradient on the input's `background` with a CSS variable for the fill position — do not layer pseudo-elements behind a real input (they go out of sync). Test in both browsers.
6. **Brand color is everywhere.** Count pixels. If brand color covers more than ~10% of the visible area, strip it back to accents only.
7. **Labels are too big.** Fintech labels for numbers are 10–12px, uppercase, medium weight, gray-500. Not 14px title case.
8. **Dark blocks don't feel premium, they feel heavy.** They only work if the surrounding context is airy and quiet. If the rest of the component is busy, a dark block adds noise — it doesn't add drama.

---

## How to look at your own work critically

After building anything, before declaring done:

1. **Screenshot it.** You see different things in a screenshot than in the live DOM.
2. **Zoom out to 50%.** Squint. Can you still see the hero? Is the hierarchy preserved?
3. **Zoom in to 200%.** Are there any hairline misalignments? Slider thumb centered on the track? Icon centered in its container?
4. **Compare side-by-side with a reference.** Pull up the equivalent Revolut/Wise/Monzo screen. Honestly assess the gap.
5. **Ask: what would I change if I had one more hour?** Those things are probably what should have been done in the first hour.
6. **Ask: is this the best I can do?** If no, iterate. If you're not sure, iterate — you would know if it was.
