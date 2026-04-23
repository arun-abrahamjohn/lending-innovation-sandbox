# Lending Prototyping Environment

## Purpose
This workspace is for rapid prototyping of business lending flows for Dutch FSI clients. All work is web-based (HTML, CSS, vanilla JS, or lightweight frameworks). No backend. All interactions are mocked.

## How This Workspace Is Organised
- `design-system/` — token system, component library, and the living design system reference page
- `prototypes/` — each prototype lives in its own subfolder with its own README
- `shared/` — reset, layout grid, and utility JS used across everything
- `.claude/skills/` — domain skill files Claude reads before working in that domain

## Rules Claude Must Always Follow

### Language
All output defaults to English. This covers all UI copy, labels, placeholder text, error messages, helper text, mock data, code comments, README files, and any other written content in this workspace. Do not use Dutch in any prototype or component unless explicitly instructed for a specific task.

### Design aesthetic
Do not produce generic AI-generated UI patterns. This means: no ShadCN defaults, no Tailwind component kit aesthetics, no slate-gray sidebars with purple accent buttons, no Inter font on white cards with rounded corners and subtle shadows as a default gesture. Every component and prototype must have a deliberate, considered aesthetic point of view. FSI interfaces should feel precise, legible, and authoritative — not sterile and template-like. Make specific choices about typography pairings, spatial rhythm, and surface treatment. If a decision feels like the path of least resistance, it is probably wrong. When in doubt: more considered, not more decorated.

The quality bar for UI craft is Shift Nudge level. This means: optical alignment over mechanical alignment, type hierarchies that actually work at a glance, spacing that feels intentional rather than uniform, interactive states that are visibly distinct without being loud, and components that look like a human made a considered decision at every dimension. Concretely: label sizes and weights must create real hierarchy; input heights, padding, and border treatment must feel refined not default; status colours must be calibrated and accessible, not straight out of a palette; empty states and loading states must be designed, not afterthoughts. Every pixel-level decision should be defensible.

### Before any UI work
Read `.claude/skills/ui-design.md` before writing any component or screen.

### Before building any lending/financial component (configurator, calculator, decision screen, balance display, etc.)
Additionally read `.claude/skills/fintech-ui-patterns.md` for the specific pattern for that component type.

### Before any flow or journey work
Read `.claude/skills/ux-design.md` and `.claude/skills/service-design.md`.

### Before any form, decision logic, or eligibility check
Read `.claude/skills/regulation.md` to apply correct Dutch/EU constraints.

### Before any product, pricing, or mock data work
Read `.claude/skills/business-knowledge.md`.

### Token system
Always use design tokens. Never hardcode hex values, font sizes, spacing values, or border radii in component files. All values must reference CSS custom properties defined in `design-system/tokens/`.

Token hierarchy:
1. `base.css` — raw scale values (colours, type scale, spacing scale, radii, elevation). Never reference directly in components.
2. `semantic.css` — purpose aliases that map base tokens to intent (e.g. `--color-action-primary`, `--color-feedback-error`). Reference these in layouts and most components.
3. `component.css` — per-component overrides that reference semantic tokens. Use only when a component needs a scoped variation.

### Design system page
Every new component must be added to `design-system/index.html`. This page is the single source of truth for what exists. It must show: the component itself, its variants, the token references it uses, and usage guidance.

### Prototypes
Every prototype lives in `prototypes/[prototype-name]/`. It must include:
- `index.html` — entry point
- `README.md` — what this prototype tests, what decisions it explores, and what assumptions are mocked
- Any prototype-specific CSS or JS files

Prototypes import from `../../design-system/tokens/` and `../../shared/` using relative paths. They do not duplicate token definitions.

### Mock data
All mock data (applicant profiles, loan products, decision outputs) must be defined in a `mock-data.js` file within the prototype folder and imported into the prototype. Keep mock data realistic and within plausible Dutch FSI ranges.

### White-label architecture
The token system is white-label ready. Brand switching is achieved by overriding semantic tokens at the `:root` level via a brand theme file. When creating a new prototype for a specific brand, create a `brand-[name].css` file in the prototype folder and apply it as the last stylesheet. Never modify base or semantic tokens for brand changes.

## Current Prototypes
- `prototypes/sme-loan-application/` — Multi-step SME term loan application, desktop-first, relationship manager UI. Covers KVK lookup, loan parameters, document upload, review, and decision screen.
- `prototypes/sme-origination-flow/` — Full 6-step SME loan origination flow ending at indicative pre-offer. RM desktop UI. Covers loan configurator, KVK lookup, Wwft/UBO compliance, financial inputs, dossier review, and conditional pre-offer decision banner.
- `prototypes/financial-health-snapshot/` — Single-screen RM analytical view of SME applicant financial health. Data visualisation prototype using ApexCharts: revenue/EBITDA combo, DSCR gauge, amortization area chart, balance sheet donut.

## Current Components
- button — primary, secondary, tertiary, ghost, destructive, accent; xs/sm/md/lg/xl sizes; pill-shaped; all interactive states
- input — text input with prefix/suffix, label above; all states including error/success
- select — native select, styled to match input; all states
- textarea — multi-line input with character count; all states
- checkbox — single and group; includes indeterminate state
- radio — group and card-style radio variant
- badge — success/warning/error/info/neutral/brand/dark; sm/md; filled, subtle, outline, solid styles; count and removable modifiers; animated dot
- card — default, elevated, interactive, glass; sm/md/lg/xl padding; header/body/footer regions (variants kept lean — status color is the badge/alert's job)
- data-table — sortable columns (visual), row hover, selection, sticky header, empty state; `cell--numeric` (semibold, primary) and `cell--numeric-secondary` for percentages
- progress-steps — horizontal and vertical step indicator; 3–7 steps; upcoming/active/completed/error states
- alert — info/success/warning/error; dismissible; with/without icon; bordered, compact, banner variants
- modal — sm/md/lg; header/body/footer; focus trap pattern
- tooltip — CSS-only; top/bottom/left/right positions
- tag-input — tokenised multi-value text input
- file-upload — drop zone with file list; idle/drag/uploading/complete/error states
- toggle — sm/md/lg pill switch; with-icons variant; toggle group
- tabs — default underline, pills, underline minimal, contained segmented; horizontal/vertical; sm/md/lg sizes
- dropdown — menu with items/dividers/group labels; positions (bottom/top/left/right); destructive item; search, footer; sm/lg sizes
- accordion — default, bordered, separated, flush variants; sm/lg sizes; left-icon support
- avatar — xs/sm/md/lg/xl/2xl; circle/rounded; brand color variant; status indicator (online/offline/busy/away); stacked group; notification badge; clickable
- skeleton — text/title/avatar/button placeholders; shimmer animation
- toast — dark-card default with colored accent stripe (success/error/warning/info/neutral/brand); subtle variant for embedded contexts; compact modifier; actions and auto-dismiss progress
- pagination — default, bordered, minimal, compact, lg, pill variants; prev/next, ellipsis, page-size selector, info, jump-to-page
- loan-configurator — lending-specific; hero amount, slider with quick-select chips, segmented term, dark result panel with trust copy; iwoca/Revolut-inspired
- decision-banner — lending-specific; approved/conditional/declined/review variants; hero loan amount with quiet supporting terms row; timeline for review state
- summary-card — lending-specific; hero amount with scaled currency glyph, supporting value grid, total-cost footer; default + compact + dark variants
