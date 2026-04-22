# Service Design — Dutch Business Lending

## The full end-to-end lending service

The business lending service has seven macro-stages. Each stage has distinct actors, systems, and failure modes. Prototypes typically focus on one or two stages but must be designed with awareness of the whole.

**1. Awareness**
How the SME learns about the lender's product. Channels: relationship manager outreach, comparison platforms (Funding Options, Fundbox aggregators), word of mouth, bank app upsell. Not typically prototyped, but the entry point affects what the applicant already knows on arrival.

**2. Pre-qualification / Eligibility check**
Lightweight check before full application. Inputs: company type, sector, years trading, approximate turnover, loan amount. Output: eligible / potentially eligible / not eligible. This stage must be fast (2–3 minutes) and low-commitment — no credit query, no data stored without consent. Many applicants drop out here if excluded; a good exit experience matters.

**3. Application**
The core data collection stage. Sub-stages: business identification (KVK lookup, UBO declaration), loan parameters, financial data upload, identity verification, declarations and consents. This is the primary prototyping domain for this workspace.

**4. Processing / Underwriting**
Back-stage stage. Credit analyst reviews the application, requests additional information if needed, runs credit models, assesses sector and collateral. The applicant experiences this as a waiting state with status updates. The relationship manager may be active in this stage managing the file.

**5. Credit Decision**
The application receives a decision: approved, conditionally approved, referred to committee, declined. In larger deals, a credit committee convenes. In automated/small-ticket lending, a model makes the decision with human review on exceptions. The decision is communicated to the applicant and RM simultaneously in well-designed systems.

**6. Offer and Acceptance**
If approved: a formal credit offer is issued (kredietofferte) with full terms. The applicant has a reflection period. Acceptance triggers conditions fulfilment (additional documents, signing, account setup). Disbursement follows conditions being met.

**7. Live loan management**
Repayment schedule, account management, early repayment options, covenant monitoring, annual review. Renewal triggers a new application flow, often pre-populated from existing data.

---

## Key actors and their roles

**SME applicant** — the business owner or director making the application. May or may not be financially sophisticated. Time-constrained. Emotionally invested. May be applying alongside an accountant.

**Accountant / Bookkeeper** — often assists SME in preparing financial documents and sometimes in the application itself. May have a delegated portal access. Rarely appears in prototype flows but their involvement explains why financial documents are pre-formatted to specific standards.

**Relationship manager (RM)** — bank employee who manages the client relationship. In assisted lending flows, the RM enters data on behalf of the client or co-navigates the application. The RM knows the products and the system — design for their efficiency, not for their education.

**Credit analyst** — assesses the application against credit policy. Works in back-office systems not typically prototyped in this workspace. Needs: complete and structured data, clear document library, flagged exceptions, and a traceable decision trail.

**Compliance officer** — reviews applications for AML/KYC completeness, PEP flags, sector exclusions, and data quality. Often works from a queue of flagged applications. Needs: clear audit trail, UBO documentation, PEP screening results, source of funds explanation.

**Risk manager** — sets credit policy, monitors portfolio risk, approves exceptions outside policy. Not typically an application-level actor but shapes what fields and thresholds exist.

**Back-office processor** — executes the loan setup after acceptance: account opening, disbursement instruction, direct debit setup, document archiving. Their requirements explain why certain data points must be collected precisely (sort code format, IBAN, signatory authority).

---

## Front stage vs back stage

**Front stage (applicant-visible):**
- Pre-qualification form
- Application portal (KVK lookup, financial uploads, declarations)
- Status updates and notifications
- Document requests and reminders
- Credit decision communication
- Offer letter and acceptance
- Loan account dashboard

**Back stage (invisible to applicant):**
- Application routing and prioritisation
- KVK data enrichment (automated)
- BKR query (automated, logged)
- AML screening (automated + human review queue)
- Credit model scoring
- Document verification
- Credit committee workflow
- Offer generation (often from template system)
- Disbursement instruction

**Prototyping implication:** When prototyping a front-stage screen (e.g., the status page), mock the back-stage outputs realistically. Show what the applicant would actually see given plausible back-stage activity, not a generic "processing" state.

---

## Data handoffs between stages

**Pre-qualification → Application:** Eligibility check results, entered loan parameters, email/phone collected for account creation. The application pre-populates these — the applicant should not re-enter what they already provided.

**Application → Underwriting:** The complete application package: entity data (KVK, UBOs, signatories), loan request (amount, purpose, term), financial documents (uploaded files with metadata), declarations (signed, timestamped), consent records (what was shown, what was agreed, when). The handoff is a package, not a data stream — it must be complete before underwriting begins.

**Underwriting → Decision:** The credit memo — a structured summary of the underwriter's assessment. Key outputs: recommended decision, risk tier, pricing, conditions, exceptions noted, policy compliance confirmation.

**Decision → Offer:** The credit offer parameters (exact amount, rate, term, security required, conditions precedent, covenants). These flow from the decision memo into the offer letter template.

**Offer → Live loan:** Accepted offer, fulfilled conditions, signed documentation, disbursement instruction. These pass to core banking for account setup.

---

## Failure modes and recovery paths

**Incomplete application:** Applicant abandons mid-flow. Recovery: email reminder with direct link back to saved progress, show exactly where they left off, show what remains. In prototype: simulate an in-progress state with a returning-applicant journey.

**Document rejection:** Uploaded document is unreadable, wrong document type, or out of date. Recovery: specific per-document rejection reason, clear re-upload path, support contact offered. In prototype: show the document checklist with a rejected item and re-upload state.

**Additional information request:** Underwriter needs clarification. Recovery: notification to applicant with specific questions, structured response interface, RM loop-in if needed. This is a common pain point — mock it thoughtfully.

**Credit decline:** Application does not meet credit policy. Recovery: clear and specific decline reason (to extent permitted by regulation), cooling-off period information, appeal route if policy allows, alternative product suggestion if appropriate. See regulation.md for what a compliant decline notice must contain.

**Fraud flag:** AML screening returns a positive match or suspicious pattern. Recovery: application paused, compliance team notified, applicant receives neutral "additional review required" message — not the specific flag reason (operational security). In prototype: simulate with the manual-review-pending decision variant.

**Technical failure:** Document upload fails, KVK lookup unavailable, payment gateway timeout. Recovery: clear error message, retry option, manual fallback path. Never blame the user for a system failure.

---

## Dutch FSI service context

**DNB (De Nederlandsche Bank):** Prudential supervisor. Licensing, capital requirements, risk management standards. Their requirements shape what data lenders must collect, retain, and report. Lenders must be licensed under the Wft to offer credit.

**AFM (Autoriteit Financiële Markten):** Conduct supervisor. Fair treatment of clients, information quality, complaints handling. AFM's MiFID-equivalent conduct rules for business credit mean that information provided to applicants must be accurate, clear, and not misleading.

**KVK (Kamer van Koophandel):** The Dutch business registry. KVK number is the anchor identity for any business. KVK data includes: company name, legal form, registration date, registered address, SBI code (sector), directors, and UBO extract (from UBO register). KVK API is available for automated lookup. Data is public but UBO data has specific access rules.

**BKR (Bureau Krediet Registratie):** Credit bureau. For business credit: BKR registers business credit facilities above certain thresholds, defaults, and restructuring events. Querying BKR for business credit assessment is permitted but logged. Distinguish from consumer BKR — different register, different consent rules.

**Wwft (Wet ter voorkoming van witwassen en financieren van terrorisme):** AML law. Requires CDD for all business credit applicants: identity verification, UBO identification and verification, PEP screening, source of funds assessment for larger amounts.

---

## Service blueprinting conventions

When annotating service touchpoints in this project, use this structure:

- **Touchpoint:** the channel/interface the actor uses (web portal, email, phone, document)
- **Actor action:** what the actor does at this touchpoint
- **System action:** what automated processes run in response
- **Human backstage action:** what a staff member does (if any)
- **Data created/consumed:** what data flows in and out
- **Regulatory annotation:** which regulation governs this interaction
- **Failure mode:** what can go wrong and what the recovery path is

---

## Mocking service interactions in prototypes

**Simulating wait states:** Use `setTimeout` to simulate decision latency. A 2-second wait with a progress indicator is more realistic than an instant result. For document processing, show a multi-stage progress: "Receiving document → Scanning → Validating format → Added to application."

**Simulating decision latency:** Credit decisions in real systems take seconds (automated) to days (manual review). In prototypes, choose a specific scenario and mock it consistently. Document the chosen scenario in the prototype README.

**Human-in-the-loop steps:** Mock these as status updates. The applicant sees "Your application is being reviewed by our credit team. Expected: within 1 business day." Don't try to simulate the back-office interface in a front-stage prototype — reference it by description.

**External system integrations:** KVK lookup, iDIN identity verification, open banking consent — these are external systems that the prototype must simulate. Build realistic mock responses that show what the data looks like when returned successfully and what the error state looks like.

---

## What constitutes a meaningful prototype of a service touchpoint

A meaningful prototype must:
1. Use realistic mock data, not lorem ipsum
2. Show at least the primary happy path and one failure/edge path
3. Reflect the actual information architecture (no placeholder sections)
4. Represent the correct actor (RM-facing and applicant-facing have different density, vocabulary, and interaction patterns)
5. Be anchored to a specific regulatory constraint (see regulation.md)
6. Be testable with a real user in a 30-minute session

A prototype that is not testable is not a prototype — it is a mockup. If it cannot be navigated to reveal decisions about flow and content, build the navigation before adding fidelity.
