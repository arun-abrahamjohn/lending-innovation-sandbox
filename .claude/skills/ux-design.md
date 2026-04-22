# UX Design — Business Lending Flows

## Principles for high-stakes financial flows

**Trust before conversion.** In lending, the applicant is sharing sensitive business data and accepting legal obligations. Every interaction must reinforce that the lender is competent, secure, and acting in the applicant's interest. Trust is built through visual precision, consistent behaviour, and honest communication — not reassurance copy.

**Clarity over completeness.** Never show all available information at once to demonstrate thoroughness. Show what the user needs to act now. Everything else is progressive disclosure. If a screen requires scrolling to read before acting, it has too much on it.

**Irreversibility must be explicit.** Lending applications have legal weight. Before any submission, identity commitment, or credit query, the user must understand what they are about to do and its consequences. This is both a UX requirement and a regulatory one (GDPR, Wwft).

**Reduce cognitive load at the hardest moments.** The most cognitively demanding part of a lending application is financial information — not because the applicant doesn't know their own numbers, but because they are anxious about judgement. Minimise extraneous decisions at this point: single-column layout, minimal navigation, no distracting secondary actions.

**Honesty about uncertainty.** Credit decisions are probabilistic. If a system cannot give a definitive answer, say so clearly and explain what will happen next. Vague copy like "we'll be in touch" is worse than "a credit analyst will review your application within 2 business days."

---

## Multi-step application flow structure

**Chunking principle.** Group fields by cognitive theme, not database schema. Good chunks: "Tell us about your business" / "What do you need?" / "Your financials" / "Confirm and submit." Bad chunks: "Step 1 of 8: General Information."

**Typical lending application stages:**
1. Eligibility pre-check (fast, low-commitment, often before account creation)
2. Business identification (KVK lookup, UBO declaration)
3. Loan parameters (amount, purpose, term)
4. Financial information (accounts, bank statements, tax returns)
5. Identity verification (if not already done via account)
6. Review and declaration
7. Submission and status

**Validation timing.** Validate inline on blur, not on keystroke. For format errors (IBAN, KVK number) validate immediately after blur. For eligibility-type errors (loan amount too high, sector excluded) validate after the full step is submitted — never interrupt mid-field. Show all errors for a step at once (top-of-form summary + inline) rather than one at a time.

**Error handling.** Every error message must tell the user what is wrong, why it matters, and what to do. "Invalid input" is never acceptable. "KVK number must be 8 digits — check your company registration document." Errors on submission should scroll to the first error automatically.

**Progress saving.** Multi-step flows must feel safe to leave. If progress is saved, say so explicitly ("Your progress is automatically saved"). If it is not, warn before navigation away.

**Navigation between steps.** Allow backward navigation at all times. Forward navigation only after step validation passes. Clearly distinguish "Save and continue" (primary) from "Back" (secondary, no validation required).

---

## Decision points in lending UX

**Eligibility gates.** Run lightweight eligibility checks (sector exclusions, minimum turnover, geography) before collecting sensitive data. If an applicant is ineligible, tell them early with a clear reason and, where possible, an alternative path. Never collect a full application from an ineligible applicant.

**Document upload.** State clearly what documents are needed and why, before the upload step. Show a checklist with status per document type. Support partial progress (some documents uploaded, more to add). Show upload errors inline per file, not as a page error.

**Identity verification.** iDIN or equivalent — this is a separate external flow. Clearly communicate the handoff: "You'll be taken to your bank to verify your identity. This takes about 2 minutes. You'll return here when it's done." On return, confirm success before proceeding.

**Decision screens.** The credit decision is the emotional peak of the journey. Design accordingly:
- Approved: lead with the approval, show key terms clearly, then conditions and next steps
- Conditional: acknowledge approval first, then list conditions clearly, then explain what the applicant needs to do
- Declined: lead with empathy, give specific reasons (to the extent legally permitted), offer alternatives or appeal route
- Manual review: be specific about what happens, who reviews, and when the applicant will hear

---

## Designing for business owners

Business owners are not consumers. They are:
- **Time-poor** — they will abandon applications that take unexpectedly long. Show estimated completion time upfront and keep it honest.
- **Financially literate** — they understand balance sheets, cash flow, and loan mechanics. Do not over-explain basic concepts. Do explain your specific product's mechanics clearly.
- **Risk-aware** — they are thinking about personal guarantees, security, and what happens if the business can't repay. Surface this information proactively, do not bury it.
- **Sceptical of automated decisions** — many have been declined before or had poor experiences with bank bureaucracy. Earn trust; do not assume it.

For relationship manager-mediated flows (RM enters data on behalf of client): the UX goal shifts from persuasion to efficiency. RMs know the products, know the requirements. They need speed, keyboard navigation, and clear validation — not explanatory copy.

---

## Communicating uncertainty

**Conditional approval** — show a clear visual distinction from full approval (different banner colour, different iconography). List each condition as a discrete item with its status. Never imply a conditional approval is "basically approved."

**Manual review pending** — show a realistic time estimate, not a vague promise. Show what the applicant can do while waiting (gather documents, contact their RM). Show a way to check status or be notified.

**Credit score / risk tier communication** — in Dutch SME lending, risk tier is rarely communicated directly to the applicant. If surfaced, use plain language tiers (e.g., "standard pricing" / "enhanced review required") not raw scores.

**Data quality warnings** — if the system detects potential issues with submitted data (turnover inconsistent with accounts, sector mismatch), surface this as an information flag, not an error. Give the applicant the opportunity to clarify.

---

## Accessibility for form-heavy financial interfaces

- All form fields must have a visible `<label>` — never `placeholder` as the only label
- Error messages must be associated to their field via `aria-describedby`
- Required fields must be marked both visually and with `aria-required="true"`
- Focus management on step transitions: move focus to the new step heading, not the top of page
- Progress indicators must communicate current step to screen readers via `aria-current="step"`
- Colour alone must never convey state — pair all status colours with iconography and text
- Document upload: announce upload progress and completion to screen readers via `aria-live`
- Decision banners: use `role="alert"` for declined/conditional outcomes so screen readers announce them immediately
- Minimum touch targets: 44×44px for all interactive elements (tablet support)
- Reading level: legal and financial disclosures are required to be plain language under AFM conduct rules; do not exceed a B2 reading level for explanatory copy

---

## Annotating flows and wireframes for stakeholder review

Each flow annotation must answer:
1. **What is the user trying to do at this step?** (goal)
2. **What does the system know at this point?** (data state)
3. **What decisions does the system make here?** (logic)
4. **What can go wrong and what happens?** (error paths)
5. **What regulatory constraint shapes this screen?** (compliance note)

For lending flows, always annotate:
- Which data is collected at this step and why
- Whether a credit query is triggered (affects BKR record)
- Where human review can intervene
- What the applicant is committing to legally

---

## Linear vs branching flows

**Use linear flows** for: the main application path, any flow with a clear sequence of dependencies (you can't complete step 3 without step 2's data), compliance-driven sequences where order matters.

**Use branching flows** for: eligibility pre-check (branch to ineligible path early), entity type routing (sole trader vs BV have different field sets), product selection (different products have different information requirements), UBO declaration (branch depth depends on ownership structure).

**Design branching flows** with explicit decision points that the applicant understands. Never let the applicant reach a branch outcome that feels arbitrary or unexplained.

---

## Key mental models

**The applicant's emotional journey:**
Optimism (early) → Anxiety (data/financial disclosure) → Impatience (waiting) → Relief or Disappointment (decision) → Action (post-decision). Design each stage for its emotional register, not just its functional requirements.

**The underwriter's information needs:**
Underwriters need to verify identity, confirm financial capacity, assess sector risk, understand loan purpose, and satisfy AML requirements. Every field in an application exists because an underwriter or a regulation requires it. If you cannot explain why a field is there, it should not be there.

**The compliance officer's audit requirements:**
Every screen, every disclosure, every consent must leave a traceable record. Timestamps, version numbers on T&Cs shown, IP addresses at submission. In prototypes, simulate this with mock audit trail data — it shapes what fields and interactions need to exist.
