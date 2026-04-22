# Regulation — Dutch Business Lending Prototypes

## EU-level regulation

### Capital Requirements Regulation (CRR)
The CRR (575/2013, amended by CRR2/CRR3) governs capital that banks must hold against credit exposures. For SME lending, the key design implication is the **SME supporting factor**: exposures to SMEs below €2.5M receive a capital reduction of approximately 23.81%, incentivising banks to lend to smaller businesses. This affects product eligibility thresholds and pricing tiers — in prototypes, the €2.5M exposure threshold is a meaningful segmentation point (below it, different pricing and process apply).

### Anti-Money Laundering Directive (AMLD6)
AMLD6 is implemented in the Netherlands via the Wwft (see below). Key design implications:
- **Customer Due Diligence (CDD)** must be completed before credit is extended. In UX terms: KYC information collection must happen during the application, not after.
- **UBO identification**: Any legal entity applying for credit must identify its Ultimate Beneficial Owners (individuals who own or control >25%). For prototypes, the UBO declaration flow must collect: name, date of birth, nationality, country of residence, BSN (for Dutch nationals, with appropriate data handling notice), percentage ownership, nature of control.
- **PEP screening**: Applicants and UBOs must be screened against Politically Exposed Persons lists. This is a back-stage action; the front-stage implication is a potential "additional review required" state.
- **Enhanced Due Diligence (EDD)** applies for: high-risk sectors (see AFM guidance), complex ownership structures, politically exposed persons, high-value transactions. EDD triggers additional document requests and human review — prototype this as a branch in the flow.

### GDPR
**Data minimisation:** Only collect data that is strictly necessary for the lending decision. Every field in an application form must have a legal basis (contract necessity, legal obligation, or consent). In Dutch business lending, most financial data is collected under contract necessity (you need it to assess the loan).

**Purpose limitation:** Data collected for credit assessment cannot be repurposed for marketing without separate consent. In prototypes, this means the consent flow must distinguish between "processing your application" (legal basis: contract necessity) and "sending you product updates" (legal basis: consent).

**Right to explanation for automated decisions:** Under GDPR Article 22, data subjects have the right not to be subject to solely automated decisions that produce legal effects. For credit decisions, this means: automated decline notifications must offer the applicant the right to request human review, and the lender must be able to explain the key factors in the decision. In prototypes, the decline notification must include a "request human review" pathway and a plain-language explanation of the decision factors.

**Retention rules:** Credit application data must be retained for the duration of the credit relationship plus a minimum period (typically 7 years under Dutch tax law, longer if regulated records apply). This does not typically affect prototype UX, but data processing notices must state the retention period accurately.

**Data Processing Notice (verwerkingsovereenkomst):** Must be shown before any personal data is collected. In prototypes, mock a GDPR-compliant notice that specifies: controller identity, purpose of processing, legal basis, data categories, retention period, data subject rights (access, erasure, portability, objection), DPO contact, right to lodge a complaint with AP (Autoriteit Persoonsgegevens).

### EU AI Act
Lending decision support tools are classified as **high-risk AI systems** under Annex III of the EU AI Act. This has practical implications from 2025 onwards:
- Credit scoring models used in lending decisions must be registered in the EU AI Act database
- Lenders must conduct a fundamental rights impact assessment
- Decision outputs must be explainable and subject to human oversight
- In prototypes: any automated credit decision screen must indicate that a human can review the decision, and must be able to show "what factors influenced this decision" (even if mocked)

### PSD2 — Open Banking
PSD2 allows lenders to request access to an applicant's bank account data (with consent) to assess creditworthiness. Design implications:
- **Consent flow must be explicit**: the applicant must understand what data will be accessed (e.g., 12 months of transaction history), from which account(s), and for what purpose (credit assessment only).
- **Friction is intentional**: PSD2 consent involves the applicant re-authenticating with their bank. Do not try to eliminate this step — it is required.
- **Data quality varies**: Open banking data is often incomplete, mis-categorised, or delayed. Design for graceful degradation (if open banking data is unavailable, fall back to uploaded bank statements).
- Mock open banking consent as a distinct step in the application with a clear handoff to the bank and return confirmation.

### Consumer Credit Directive vs Business Credit
The EU Consumer Credit Directive (2023/2225) applies to **consumers** only. Business credit above €75,000 is explicitly excluded from CCD protections. This means:
- No mandatory cooling-off period for business borrowers (though good practice to offer one)
- No APR disclosure obligation under CCD (though FSMA/AFM conduct rules require clear pricing information)
- No right of early repayment with statutory compensation limits (terms are negotiated)
- In prototypes: do not apply consumer credit disclosure patterns to business lending flows. The information requirements are different.

---

## Netherlands-specific regulation

### DNB prudential supervision
DNB licences and supervises credit institutions. A lender must hold a banking licence or credit institution licence to offer credit to businesses. Alternative lenders (non-banks) can offer credit but must be registered with DNB and comply with relevant capital and conduct requirements. In prototypes: always show the lender as an appropriately licensed entity (include mock DNB registration number in footer, link to AFM register).

### AFM conduct supervision
AFM supervises conduct: how financial products are sold, how information is provided, and how complaints are handled. Key conduct obligations for business lending:
- **Information obligations:** Product information must be clear, accurate, and not misleading. Pre-contractual information must include all material terms.
- **Suitability assessment:** For business credit, the lender must assess whether the product is appropriate for the applicant's needs and financial situation. This shapes the loan purpose and financial information fields.
- **Complaints handling:** A clear complaints procedure must be communicated. In prototype footers, include a link to mock complaints procedure and AFM register.

### Wet op het financieel toezicht (Wft)
The Wft is the primary Dutch financial services law. Parts relevant to lending:
- Article 2:60: prohibition on offering credit without a licence
- Section 4.2: information provision requirements (pre-contractual, contractual)
- Section 6.3: complaints handling requirements
In prototypes: data processing notices and footer information should reference Wft compliance. The lender identity shown in mock prototypes should be a licensed entity or clearly marked as a prototype only.

### KVK (Kamer van Koophandel)
KVK is the Dutch Chamber of Commerce. Every business is registered here. KVK number is 8 digits. KVK data available via API includes:
- **Company name** (handelsnaam) and legal name (statutaire naam)
- **Legal form** (rechtsvorm): BV, NV, VOF, eenmanszaak, stichting, etc.
- **Registration date** (oprichtingsdatum) — used for "years in business" calculation
- **Registered address** (vestigingsadres) — auto-fill in application
- **SBI code** — sector classification (Standard Business Activities code), used for sector risk assessment and exclusion lists
- **Directors** (bestuurders) — names and roles, used for signatory authority
- **Authorised representatives** (gevolmachtigden) — relevant for loan signing authority

**KVK limitations for credit purposes:** KVK data is not real-time (updates lag by days), UBO data requires a separate UBO register query, financial information is not held by KVK (must be obtained from applicant or Kamer accounts filing).

In prototypes, mock KVK API responses with realistic Dutch business data. KVK numbers in mock data should be in the format XXXXXXXX (8 digits). Common SBI codes to know: 4711 (supermarkets), 4120 (residential construction), 6920 (accounting), 5610 (restaurants), 2512 (metalwork), 6201 (software development).

### BKR (Bureau Krediet Registratie)
BKR registers credit facilities for both consumers and businesses.

**Business credit BKR:** Business credit facilities above €5,000 held by sole traders (eenmanszaken) and certain partnerships may be registered on the personal BKR of the owner/partners, because these are personal liabilities. For BVs and other legal entities with limited liability, business credit is registered separately.

**What is registered:** Facility type, limit, outstanding balance, payment behaviour (including arrears — A-codes, H-codes, 3-codes), defaults, and restructuring events.

**Query rules for business credit:** Querying BKR for credit assessment of a business owner is permitted under the credit exception to GDPR (necessary for entering into a credit contract). The query must be logged and can be communicated to the applicant on request. Always inform applicants that a BKR query will be conducted.

**Data quality note:** BKR data may lag by up to 30 days. A recent default may not yet be registered. A recently settled account may still show as outstanding. Credit decisions should never rely solely on BKR.

In prototypes: mock BKR results as one of three states: clean (no registrations), notification (one or more A-codes — late payments), or negative (2-code or 3-code — default). The credit decision should visibly reflect BKR status.

### Wwft (Wet ter voorkoming van witwassen en financieren van terrorisme)
Dutch AML law, implementing AMLD. Applies to all credit institutions and most alternative lenders.

**CDD requirements in practice:**
- Identify the customer (KVK lookup + director identity verification)
- Verify the customer (copy of identity document, or iDIN verification for natural persons)
- Identify and verify UBOs (>25% ownership, or senior managing official if no such UBO)
- Understand the customer's business and the nature/purpose of the credit request
- Perform enhanced due diligence for higher-risk situations

**Risk-based approach:** The intensity of CDD is proportional to the assessed money laundering risk. Low risk (established Dutch BV, transparent structure, normal sector) → standard CDD. Higher risk (complex structure, high-risk sector, large amount, unfamiliar geography) → enhanced CDD with additional documentation.

**In prototypes:** Include a UBO declaration step in the application. Model the UBO declaration form after the actual UBO register form requirements. Show the enhanced CDD branch as a prototype path (triggered by risk factors in mock data).

### Code Verantwoord Bankieren
The voluntary conduct code for Dutch banks. Key principles relevant to lending UX:
- **Fair treatment:** Loan terms must be clear and understandable. Fees must be disclosed fully upfront.
- **Avoiding over-indebtedness:** Banks must assess repayment capacity genuinely and not extend credit where repayment is not plausible.
- **Responsible pricing:** Pricing should reflect actual risk, not exploit information asymmetry.
In prototypes: pricing must look plausible and not exploitative. Clearly show total cost of credit, not just monthly payment.

### MKB Financiering charter
Voluntary standards for alternative SME lenders. Key obligations:
- Transparent pricing (AERC — Annual Effective Rate of Credit — must be disclosed)
- Clear fee disclosure before application
- Minimum 14-day offer validity
- Complaints procedure
- No hidden early repayment charges
In prototypes for alternative lenders: apply these standards. Show AERC prominently alongside interest rate.

---

## Prototyping implications

### Required vs optional fields
**Always required in Dutch business lending:**
- KVK number (legal entity verification anchor)
- Loan amount, purpose, and term (contract necessity)
- Applicant name and contact details
- Authorised signatory identity
- UBO declaration (Wwft obligation)
- Consent to BKR query (must be explicit, logged)
- Acknowledgement of data processing notice (GDPR)

**Required for certain loan sizes or types:**
- Annual accounts: required for term loans > €100K (often the last 2–3 years)
- Bank statements: required for working capital assessment (typically 6–12 months)
- Interim figures: if annual accounts are > 6 months old
- Business plan: for start-ups or expansion finance
- Property valuation: if real estate is offered as collateral
- Personal guarantee: if required, must have explicit informed consent

**Optional / good practice:**
- Accountant details (speeds up document verification)
- Existing banking relationships (helps with pricing and cross-sell)
- Preferred disbursement account

### Disclosures before data collection begins
Before collecting any personal or business data, show:
1. Who is collecting the data (lender name, registration number)
2. What data will be collected
3. Why it is collected (purposes and legal bases)
4. What happens to it (processing activities, third parties — BKR, KVK, iDIN)
5. Applicant rights
6. Confirmation that a BKR query will be conducted (if applicable)

### Legally compliant credit decline notification
A compliant decline notice must include:
- Clear statement that the application has not been approved
- The principal reason(s) for the decline (to the extent disclosable — AML-related declines may not give specific reasons)
- Whether an automated decision was involved and the right to request human review (GDPR Article 22)
- Information about any external data source used (e.g., "Our decision was informed by a BKR query conducted on [date]" — required under GDPR Article 13/14)
- Cooling-off period before reapplication (if applicable per credit policy)
- Complaints procedure reference
- Contact details for queries

### Mocking a GDPR-compliant data processing notice
The notice must be:
- Shown before data collection begins (not buried at the end)
- Readable (plain language, not legal boilerplate in 8pt type)
- Layered if long (summary first, full text available on expand)
- Explicitly consented to for any processing beyond contract necessity
- Version-stamped (v1.2, effective date) so the audit trail shows which version the applicant saw

### Human review step vs automated decision
**Automated decision permitted** for: standard applications within policy parameters, small-ticket lending (<€75K), where the model output is a recommendation reviewed by RM before communication.

**Human review required** for: any application outside standard policy, any application flagged by AML screening, any applicant who requests human review of an automated decision (GDPR right), applications above certain size thresholds (varies by lender policy, typically €500K+).

In prototypes: show the automated decision path as the primary flow, but always include the "request human review" option on any automated decision screen. Show the human review pending state as a realistic waiting state with specific timeframe.

### Compliant UBO identification flow
1. Explain why UBO information is required (Wwft obligation) — must be before the form
2. Collect for each UBO: full name, date of birth, nationality, country of residence, BSN (if Dutch), ownership percentage, nature of control (direct ownership / indirect ownership / other control)
3. Ask: does any UBO own 25%+ directly or indirectly?
4. If ownership structure is complex (multiple holding layers), allow for description of structure
5. If no natural person holds 25%+, identify the senior managing official (bestuurder) as the pseudo-UBO under Wwft
6. Declaration: applicant confirms the information is accurate and complete to the best of their knowledge, understands that providing false information is a criminal offence
7. Upload supporting evidence: extract from UBO register (for legal entities), copy of identity document (for natural persons not already iDIN-verified)
