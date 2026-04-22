# Fintech UI Patterns — Component-Specific Deep Dives

Read this **in addition to** `ui-design.md` when building any component specific to financial/lending flows. This file captures the patterns that separate amateur financial UI from what shipping fintechs actually look like.

Reference aesthetic: **Revolut, Wise, Monzo, Klarna, Cash App, Robinhood**, executed with **Uber/Linear** craft precision.

---

## Required research step — before building any component

Before writing a single line of code for a requested component, **research how the best fintechs actually handle this use case.** Do not skip this. The skill files contain principles; the research contains current-state best practice.

**Research process:**

1. **Identify 3–5 reference companies** that ship this exact component. For a loan configurator: Revolut Credit, Wise Borrow, Klarna, iwoca, Funding Circle, Shopify Capital. For a decision screen: Klarna, Affirm, Revolut, Monzo overdraft. For a balance card: Revolut, Monzo, N26, Cash App.

2. **Use the web search tool** (or web fetch on product pages, walkthrough videos, or recent UI screenshots from sources like Mobbin, Dribbble-filtered-to-real-products, or recent Medium teardowns) to find current (within 18 months) examples of each reference.

3. **Extract the pattern consensus.** What do 3+ of them do the same way? That is the pattern. Examples:
   - Hero amount is huge (80–120px) and centered → pattern
   - Slider fill is the brand color; thumb is brand-colored or white-with-brand-border → pattern
   - Term selection uses a segmented control or a horizontal scroll of pills → pattern
   - Monthly payment shown in a dark contrast block below the inputs → pattern

4. **Extract the deliberate differences.** Where do they diverge, and why? (E.g., Revolut uses a single big amount input with no slider; Wise uses slider + input combined.) Pick the approach that best fits the use case at hand.

5. **Summarise the brief** before writing code: "The pattern is X, with these specific choices: [list]. The anti-patterns to avoid are [list]. The hero element is [X]. The one earned color moment is [Y]." Only then write code.

**Why this matters:** The difference between a competent financial UI and a template-y one is almost always that the competent one is informed by what the current leaders actually do. Principles without reference produce 2019-era Bootstrap card patterns. Research-informed principles produce current-gen fintech craft.

**If web research is unavailable in the current environment**, fall back on your own training knowledge but be explicit: "Based on my knowledge of Revolut's credit flow circa 2024, the pattern is X..." Then proceed. Never skip the research step — either do it, or explicitly declare you're using prior knowledge.

---

## Loan configurator / Amount picker

The "how much, how long" widget that opens most lending flows. Revolut's credit slider is the canonical reference.

### Structure (top to bottom)

1. **Hero amount display** (unambiguous focal point)
2. **Amount slider** (minimal chrome, branded thumb)
3. **Term selector** (segmented control)
4. **Purpose selector** (optional — category cards)
5. **Result panel** (dark block, monthly payment as hero)
6. **Primary CTA** (pill button, brand-colored)

### Hero amount specifics

- Size: `clamp(3rem, 10vw, 6rem)` — minimum 48px on mobile, 96px on desktop
- Weight: `700` (bold). Never regular.
- Letter-spacing: `-0.03em`
- Line-height: `1`
- Color: near-black (`--color-text-primary`)
- Tabular figures: required
- Currency symbol: ~40% the size of the number, `--color-text-tertiary` or `gray-400`, medium weight, baseline-aligned
- **Centered** (amount display is the one place centered text is correct — it's a hero moment)

Structure:
```html
<div class="configurator__hero">
  <span class="configurator__amount">
    <span class="configurator__currency">€</span>125.000
  </span>
</div>
```

### Slider specifics

**This is where most implementations fail.** Native `<input type="range">` is tricky.

**Rules:**
- Use a single `<input type="range">` — do not layer pseudo-elements underneath it (they desync).
- Apply the fill gradient to the input's `background`:
  ```css
  background: linear-gradient(
    to right,
    var(--brand-primary) 0%,
    var(--brand-primary) var(--fill),
    var(--gray-200) var(--fill),
    var(--gray-200) 100%
  );
  ```
- The `--fill` custom property is updated via JS on slider `input` event: `this.style.setProperty('--fill', `${percentage}%`)`.
- Track height: 6–8px.
- Thumb: 24–28px, circle, solid brand color OR white-with-brand-border. Must visually sit **on** the track (test both webkit and moz).
- Thumb shadow: use a brand-tinted shadow for emphasis: `box-shadow: 0 2px 8px hsl(var(--brand-primary-h) var(--brand-primary-s) 40% / 0.4)`.
- On hover: scale thumb by 1.1–1.15.
- Focus state: use `outline: 2px solid var(--brand-primary); outline-offset: 4px;` on the input itself — do NOT try to box-shadow the thumb on focus (inconsistent support).
- Below the slider: min and max labels in caption size, gray-400, `tabular-nums`, space-between.

**Anti-patterns:**
- ❌ CSS pseudo-elements for a fake track behind a real input (they go out of sync when the page renders at fractional pixels or on resize)
- ❌ Thumb positioned via `margin-top` hack (breaks on different browsers)
- ❌ Thumb with 3+ nested shadows trying to look "premium" (usually looks cheap)
- ❌ Tick marks on the track (adds noise, rarely useful)
- ❌ Value "floating" above the thumb (cute but brittle and unnecessary when the hero amount is already displayed)

### Term selector specifics

Segmented control pattern. Used for 3–6 discrete options (12/24/36/48/60 months).

- **Container:** background `gray-50` or `gray-100`, `padding: 4px`, `border-radius: 16px`. Flex row.
- **Items:** equal-width via `flex: 1`, transparent background when inactive.
- **Active item:** background `white`, soft shadow `0 1px 3px rgba(0,0,0,0.1)`, slight scale or weight bump. The active item feels **lifted out** of the container.
- **Inactive items:** `gray-500` text. Hover: `gray-100` background (if container is white) or `gray-150` (if container is gray).
- **Content:** bold number (e.g., `36`) with a small "months" label below in uppercase (`letter-spacing: 0.05em`, 10–11px, gray-400). OR, for more information-dense pickers: number + monthly payment for that term.

**Alternative pattern for longer term lists or when 5+ options don't fit:**
Use a horizontal scroll of pill buttons with snap-scroll, not a segmented control. Each pill: rounded-full, padding 12/20, `gray-100` bg, active state = `gray-900` bg with white text.

### Purpose / Category selector

Icon + label cards, 3–6 options, grid layout.

- **Grid:** `repeat(auto-fit, minmax(120px, 1fr))` or a fixed `repeat(4, 1fr)` depending on how many options.
- **Card:** white bg, 2px `gray-200` border, 16–20px radius.
- **Icon:** size 24px in a 40px container (not a huge icon). Container has its own background (subtle gray) and radius (smaller than the card's).
- **Label:** 12–13px, medium or semibold, gray-700.
- **Active state:** card bg becomes `gray-900` (dark inversion) with white label. Icon container becomes brand-colored with brand-contrast icon color. **This is an earned moment of color.**
- **Hover:** border shifts to `gray-300`, no translate or shadow unless animation is a deliberate feature. (Bouncing cards on hover in a financial UI reads as juvenile.)

**Anti-patterns:**
- ❌ Icons without background containers, floating on the card (looks unfinished)
- ❌ Massive icons (48px+) — these look like app launchers, not category cards
- ❌ Brand color on all icons by default (reserve for active state)
- ❌ Gradient borders on active state (aged poorly)

### Result panel (the payoff)

The dark block showing the calculated monthly payment. **This is the earned moment of visual weight.**

- **Background:** `gray-900` or a subtle 135° gradient from `gray-900` to near-black.
- **Padding:** generous (24–48px).
- **Structure:** Small uppercase label → Large payment figure → Small supporting note (optional) → CTA.
- **Hero value:** 32–56px, bold, **brand-colored** (not white). This is where the brand color earns its presence — on the number the user is looking at.
- **Labels:** uppercase, 11–12px, `gray-400` or `rgba(255,255,255,0.5)`, `letter-spacing: 0.08em`.
- **Secondary details** (rate, total interest, total repayment): smaller values in white, labels in 40–50% white. Grid of 3 columns, equal weight.
- **Divider between hero and details:** 1px `rgba(255,255,255,0.1)`.
- **CTA:** full-width or auto-width depending on layout. Pill shape. Brand color fill. Consider a brand-colored shadow glow for emphasis.
- **Disclaimer:** 10–11px, `rgba(255,255,255,0.4)`, below CTA, centered.

**Anti-patterns:**
- ❌ Result panel the same white as the rest of the component (defeats the purpose — no contrast drama)
- ❌ Result panel with a busy pattern or multiple dark blocks (one dark block per component, max)
- ❌ Hero payment value in white (misses the opportunity to let brand color shine)
- ❌ 5+ metrics in the result panel (pick the 3 most important: rate, total interest, total repayment — or just show monthly + total)

---

## Hero balance / amount display (standalone)

Used on account dashboards, decision pages, summary cards.

- Size: 48–120px depending on context (dashboard balance: 72–96px; summary card value: 40–56px)
- Weight: semibold to bold
- Letter-spacing: `-0.02em` to `-0.04em` (the bigger, the tighter)
- Tabular figures
- Currency symbol: 35–50% size, lighter weight, muted color
- Optional: cents in smaller size (70% of the euros portion) — used for precise contexts (checkout, invoice). Not used for round amounts.

Example for a premium balance display:
```
€ 12,458
   .45
```
where `12,458` is 72px/bold and `.45` is 32px/medium in a slightly muted tone.

---

## Decision / Result screens

See `decision-banner.css` for the component. Key pattern rules:

- **Emotional register first.** Approved: confident, celebratory but not gaudy. Declined: composed, not accusatory. Conditional: clear and factual. Review-pending: calm and specific.
- **Hero element is the decision, not the amount.** On approved screens, the approval status is the hero; the amount is secondary. On declined screens, the reason is the hero.
- **Action clarity.** One primary action, at most one secondary. A decision screen with 4 buttons has failed.
- **No icons in the heading.** If the status needs an icon, put it as a small indicator inline with the label, not a 64px illustration. (We learned this from the decision-banner work.)

---

## Form patterns for money

**Currency inputs:**
- Prefix `€` visually integrated with the input (single border box, not two adjacent elements).
- Right-align the number on desktop for amounts (aligns with table columns elsewhere on the page). Left-align on mobile.
- `inputmode="decimal"` for mobile numeric keyboard.
- Format on blur (insert thousand separators), edit as raw on focus.

**Percentage inputs:**
- Suffix `%` (same rule: integrated).
- Step: typically 0.1 or 0.25 for rate inputs.

**Term inputs:**
- Suffix "months" or "mo" depending on space.
- Prefer a slider or segmented control over a raw text input for term (discrete options are faster).

---

## Slider (general pattern for any range input)

Already covered under Loan configurator. The same rules apply to any slider in the system (e.g., risk tolerance, max rate willing to accept, etc.).

Key principle: **never layer pseudo-elements over or under a native range input.** Style the input's own background with a linear-gradient. Manage the fill percentage via a CSS custom property updated from JS.

---

## Summary card / Loan parameter grid

See `summary-card.css`. Key pattern rules:

- **Value is hero, label is subordinate.** 2–3× size difference minimum.
- **Labels uppercase, medium weight, tracked, gray-500.**
- **Values tabular, primary text color.** 
- **Grid alignment matters.** Currency values should right-align if they're in a column; left-align if in a grid where each cell is a distinct item.
- **Headline number** (loan amount): larger than supporting numbers (rate, term, payment). Full-row span at top.
- **Footer for totals:** divider + slightly emphasized row for "total cost of credit."

---

## Progress / Timeline components

See `progress-steps.css` and the decision-banner timeline. Key rules:

- **Steps/nodes align to a consistent vertical axis.** The connector line passes through the center of each step circle — geometry must be precise.
- **Step size: 24–32px.** Numbers or checkmarks inside at ~12–14px.
- **Active step: filled circle, brand or currentColor. Completed: filled with checkmark. Upcoming: outline only.**
- **Connector line: 2px, `gray-200` for upcoming, `currentColor @ 30% opacity` for completed segments.**
- **Text offset:** the text beside a step should align with the **center** of the step circle — `padding-top: 2px` or similar to nudge it into optical alignment.

---

## Toast / Notification

See `toast.css`. Key rules:

- **Dark background is the right default for fintech toasts.** Gives premium feel and doesn't fight with status colors.
- **Status is communicated via the icon color only.** A tinted check, alert, info, or sparkle glyph sits on the dark card. That is enough differentiation.
- **No edge stripes.** Never a 2–4px colored bar on the leading edge of the toast (or any edge). That is a ShadCN/Bootstrap tell and looks like an admin dashboard. Same rule applies to alerts, banners, cards, and any other surface.
- **No colored fill.** The card stays dark across all variants so every toast feels like the same material. Light/colored-background toasts belong only in an embedded `--subtle` variant (e.g. inside a modal).
- **One line of text + optional action link** — don't make toasts into mini-dialogs.
- **Duration: 4–6 seconds for info, persistent for errors (user must dismiss).**

---

## Empty states & Loading

- **Empty states must be designed** — they are screens in their own right, not bugs.
- **Illustration is optional.** If used, it's a simple geometric/line drawing that matches the brand, not a stock illustration.
- **Copy:** one line stating what's empty, one line suggesting what to do. Maximum.
- **Loading states use skeletons, not spinners** — show the shape of what's coming. Spinners are only appropriate for actions <2s.
- **Skeleton animation: shimmer, not pulse.** Shimmer feels like progress; pulse feels like broken content.

---

## The "did I get this right?" check for fintech components

After building, compare your component to its equivalent at Revolut, Wise, Monzo, or Klarna. Specifically:

1. **Pull up the reference.** Google the product feature, find the current live UI (screenshots, product pages, walkthrough videos).
2. **Compare the hero.** Is your hero element as prominent as theirs? Usually the answer is no, and you need to go bigger.
3. **Compare the color discipline.** Is your component using color at the same restraint? Usually theirs is MORE restrained than you think.
4. **Compare the type.** Are your labels as small, tracked, and uppercase as theirs? Is your display typography as tight?
5. **Compare the interactive elements.** Are your buttons, sliders, selectors as refined? Where are the nicks?
6. **Note every difference.** Fix the top 3. Iterate.

The gap between your first attempt and a shipping fintech component is usually:
- Hero too small (fix: 1.5–2× the size)
- Too much color (fix: strip to neutral + one accent)
- Labels too big or not uppercase (fix: shrink + treat)
- No dark contrast moment (fix: add one earned dark block)
- Slider/selector chrome too heavy (fix: remove borders, rely on shape and spacing)
